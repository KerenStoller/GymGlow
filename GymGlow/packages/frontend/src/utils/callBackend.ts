import {redirect} from "react-router";
import {API} from "./endpoints.ts";

export async function callBackend(url: string, fetchBody: RequestInit, setErrorMsg: (msg: string) => void)
{
    try
    {
        const response = await fetch(url, fetchBody);
        console.log("first fetchBody: ", fetchBody);
        if(!response.ok)
        {
            const err = await response.json();
            if (response.status === 401)    // expired token
            {
                if(err.detail === 'Token has expired')
                {
                    if(!await refreshToken())
                    {
                        localStorage.removeItem("token");
                        localStorage.removeItem("refresh_token");
                        throw redirect('/');
                    }

                    const newHeaders = new Headers(fetchBody.headers || {});
                    newHeaders.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
                    const newFetchBody = {
                        ...fetchBody,
                        headers: newHeaders
                    };

                    console.log("new fetchBody: ", newFetchBody);
                    return await callBackend(url, newFetchBody, setErrorMsg);
                }
                else
                {
                    setErrorMsg(err.detail || 'Unauthorized');
                }
                return;
            }
            else if (response.status === 400 || response.status === 403 || response.status === 409)
            {
                setErrorMsg(err.detail || 'Action failed');
                return;
            }
            else if (response.status === 404)
            {
                throw new Error('endpoint not found');
            }
            else
            {
                throw err;
            }
        }

        return response;
    }
    catch (e)
    {
        setErrorMsg('Action failed');
    }
}

async function refreshToken()
{
    const url = `${API.AUTH.REFRESH}?token=${localStorage.getItem("refresh_token")}`;
    const fetchBody = {method: 'GET',}

    // TODO: add explanation for redirect, maybe modal

    try
    {
        const response = await fetch(url, fetchBody);
        if(response.status === 401)
        {
            return false;
        }
        else if(response.ok)
        {
            try
            {
                const resData = await response.json();
                localStorage.setItem("token", resData.access_token);
                return true;
            }
            catch(e)
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    catch(err)
    {
        return false;
    }
}