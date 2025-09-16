import { createContext, useState } from 'react';

type TokenContextType = {
    access: string;
    setAccess: React.Dispatch<React.SetStateAction<string>>;
    refresh: string;
    setRefresh: React.Dispatch<React.SetStateAction<string>>;
};

export const TokenContext = createContext<TokenContextType>({
    access: '',
    setAccess: () => {},    // You can keep empty functions here as placeholders
    refresh: '',
    setRefresh: () => {},
});

const TokenContextProvider : React.FC<React.PropsWithChildren<{}>> = ({ children }) =>
{
    const [access, setAccess] = useState('');
    const [refresh, setRefresh] = useState('');

    return (
        <TokenContext.Provider value={{access, setAccess, refresh, setRefresh}}>
            {children}
        </TokenContext.Provider>)
}

export default TokenContextProvider;