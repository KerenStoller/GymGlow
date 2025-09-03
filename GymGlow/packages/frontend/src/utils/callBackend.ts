export async function callBackend(url: string, fetchBody: RequestInit, setErrorMsg: (msg: string) => void)
    {
        try
        {
            const response = await fetch(url, fetchBody);

            if(!response.ok)
            {
                const err = await response.json().catch(() => ({}));
                if (response.status === 401)    // expired token
                {
                    //TODO: refresh token
                    if(err.detail === 'Token has expired')
                    {
                        setErrorMsg('Session expired, please log in again');
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