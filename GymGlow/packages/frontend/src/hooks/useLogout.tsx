import useTokens from "./useTokens.ts";
import axios from "../api/axios.ts";
import {API} from "../utils/endpoints.ts";
import {useNavigate} from "react-router-dom";


const useLogout = () => {
    const navigate = useNavigate();
    const {setAccess, setGotRefresh} = useTokens();

    async function logout()
    {
        try
        {
            await axios.delete(
                 API.AUTH.LOGOUT,
                 {withCredentials: true}
             );
            setAccess('');
            setGotRefresh(false);
            navigate('/');  // Explicit redirect
        }
        catch (e)
        {
            console.error(e);
        }
    }

    return logout;
};

export default useLogout;
