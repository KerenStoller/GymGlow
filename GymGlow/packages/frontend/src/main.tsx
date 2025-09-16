import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import TokenContextProvider from "../src/store/token-context.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TokenContextProvider>
          <RouterProvider router={router} />
      </TokenContextProvider>
  </StrictMode>,
)
