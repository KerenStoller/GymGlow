import {useEffect} from "react"
import {axiosPrivate} from "../api/axios.ts";
import {useRefreshToken} from "./useRefreshToken.ts"
import useTokens from "../hooks/useTokens.ts";


export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken } = useTokens();

    useEffect(() =>
    {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config =>
            {
                if (!config.headers.Authorization)
                {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                return config;
            }, (error) => Promise.reject(error))

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) =>
            {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent)
                {
                    try
                    {
                        console.log("getting new access token!")
                        prevRequest.sent = true;
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    }
                    catch (error)
                    {
                        console.log("refresh token is expired!");
                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }

    }, [accessToken, refresh]);

    return axiosPrivate;
}