import { useState } from "react";
import useTokens from "../hooks/useTokens.ts";
import cuteCoffeePic from '../assets/cute-coffee.jpg';

const ExpiredRefresh = () => {
    const [show, setShow] = useState(true);
    const {setAccess} = useTokens();

    const handleLogout = () => {
        setAccess('');
        setShow(false);
    };

    if (!show) return null;

    return (
        <>
            <div
                className="modal show d-block"
                style={{ zIndex: 2000 }}
                role="dialog"
                tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Your session has expired.</h5>
                        </div>
                        <div className="modal-body">
                            <p>Please sign in again</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleLogout} className="btn btn-secondary">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal-backdrop fade show"
                style={{
                    opacity: 1,
                    backgroundColor: 'rgba(255, 204, 129, 1)',
                    // Uncomment the below lines to add a background image
                    backgroundImage: `url(${cuteCoffeePic})`,
                    backgroundSize: '50%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
            </div>
        </>
    );
};

export default ExpiredRefresh;
