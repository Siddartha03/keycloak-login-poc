import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import AppRoute from "./AppRoute";
import "./App.css";

function App() {
  const url = "https://dev-idp.techademy.com";
  const initOptions = {
    checkLoginIframe: false,
  };

  const keycloakClient = new Keycloak({ url: url, clientId: "test-poc-99", realm: "test-poc-99" });

  const tokenLogger = (k) => {
    if (k) {
      localStorage.setItem("access_token", k.token);
      localStorage.setItem("refresh_token", k.refreshToken);
      localStorage.setItem("id_token", k.idToken);
    }
  };

  return (
    <div className="App">
      <ReactKeycloakProvider
        initOptions={initOptions}
        authClient={keycloakClient}
        onEvent={() => {}}
        onTokens={tokenLogger}
      >
        <AppRoute />
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;
