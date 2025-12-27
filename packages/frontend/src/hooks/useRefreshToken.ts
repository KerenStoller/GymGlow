import axios from "../api/axios.ts";
import useTokens from "./useTokens.ts";
import {API} from "../utils/endpoints.ts";

export const useRefreshToken = () => {
    const {setAccess, setGotRefresh} = useTokens();

    return async function refresh()
    {
        try
        {
             const response = await axios.get(
                 API.AUTH.REFRESH,
                 {withCredentials: true}
             );
            setAccess(response.data.access_token);
            return response.data.access_token;
        }
        catch (error)
        {
            setGotRefresh(false);
            throw error;
        }
    }
}