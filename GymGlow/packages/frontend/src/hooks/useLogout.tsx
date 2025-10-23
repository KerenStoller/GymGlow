import useTokens from "./useTokens.ts";
import axios from "../api/axios.ts";
import {API} from "../utils/endpoints.ts";


const useLogout = () => {
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
        }
        catch (e)
        {
            console.error(e);
        }
    }

    return logout;
};

export default useLogout;
