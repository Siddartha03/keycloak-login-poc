import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const AppRoute = () => {
  const { keycloak, initialized } = useKeycloak();

  const redirectToLogin = () => {
    // const localUsername = JSON.parse(localStorage.get("keycloakUsername"));
    keycloak.login({});
  };

  if (initialized && !keycloak?.authenticated) {
    return <>{redirectToLogin()}</>;
  }
  return <RouterProvider router={router} />;
};

export default AppRoute;
