export const createTokenLoader = () =>
{
    return async () =>
    {
        const token = localStorage.getItem("token");

        if (!token)
        {
            window.location.href = "/";
        }

        return token;
    }
}

export const validateNoToken = () =>
{
    return async () =>
    {
        if (localStorage.getItem("token"))
        {
            window.location.href = "/home";
        }
    }
}