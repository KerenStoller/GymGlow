import { createContext, useState, useMemo } from 'react';
import ExpiredRefresh from "../components/Token/ExpiredRefreshModal.tsx";

type TokenContextType = {
    accessToken: string;
    setAccess: React.Dispatch<React.SetStateAction<string>>;
    gotRefresh: boolean;
    setGotRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TokenContext = createContext<TokenContextType>({
    accessToken: '',
    setAccess: () => {},    // You can keep empty functions here as placeholders
    gotRefresh: false,
    setGotRefresh: () => {},
});

const TokenContextProvider : React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [accessToken, setAccess] = useState('');
    const [gotRefresh, setGotRefresh] = useState(false);

    const contextValue = useMemo(() => ({
        accessToken,
        setAccess,
        gotRefresh,
        setGotRefresh,
    }), [accessToken, gotRefresh]);

    return (
        <TokenContext.Provider value={contextValue}>
            {!gotRefresh && accessToken !== '' && <ExpiredRefresh />}
            {children}
        </TokenContext.Provider>)
}

export default TokenContextProvider;