import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from "@auth0/auth0-react";
import { LonerProvider } from "./context/LonerContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-o21ltppnv8mg4h0i.us.auth0.com"
      clientId="r6fQcx2claGCxWdyOzxHAPjv66eJYn1f"
      useRefreshTokens={true}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <LonerProvider>
        <App />
      </LonerProvider>        
    </Auth0Provider>
  </React.StrictMode>
)
