import {redirect} from "react-router";

export const createTokenLoader = () =>
{
    return async () =>
    {
        const token = localStorage.getItem('token');

        if (!token)
        {
            return redirect('/auth');
        }

        return token;
    }
}