import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import './index.scss';
import { Principal } from "@dfinity/principal";

//tis is hardcoded user_ID , if live deploy need to link own principal
//TODO: need to deploy canister , login flow
const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
export default CURRENT_USER_ID;

const init = async () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

init();