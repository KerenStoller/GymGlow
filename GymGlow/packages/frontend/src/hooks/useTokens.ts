import {useContext} from "react";
import {TokenContext} from "../store/token-context.tsx";

const useTokens = () => {
    return useContext(TokenContext);
}

export default useTokens;