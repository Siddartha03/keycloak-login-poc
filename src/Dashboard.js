import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const { keycloak } = useKeycloak();
  const [decodToken, setDecodToken] = useState("");
  const [decodIdToken, setDecodIdToken] = useState("");
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const id_token = localStorage.getItem("id_token");

  const handleLogout = (event) => {
    localStorage.clear();
    sessionStorage.clear();
    keycloak.logout();
    event.preventDefault();
  };

  const fetchDecodeCode = async () => {
    const res = await axios.get(
      "https://dev-idp.techademy.com/realms/test-poc-99/.well-known/openid-configuration"
    );
    console.log(res);
  };

  useEffect(() => {
    if (
      access_token &&
      access_token !== "undefined" &&
      access_token !== "null" &&
      id_token !== "undefined"
    ) {
      //   fetchDecodeCode();
      const decoded = jwtDecode(access_token);
      setDecodToken(decoded);
      const decodedId = jwtDecode(id_token);
      setDecodIdToken(decodedId);
    }
  }, [access_token, id_token]);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div
        style={{
          padding: "20px",
        }}
      >
        <h3>Access Token:</h3>
        <span>{access_token}</span>
        <h3>Refresh Token:</h3>
        <span>{refresh_token}</span>
        <h3>Id Token:</h3>
        <span>{id_token}</span>
      </div>

      <div
        style={{
          padding: "20px",
          margin: "20px",
          border: "1px solid black",
        }}
      >
        <h3>Decoded Access Token:</h3>
        <pre>{JSON.stringify(decodToken, null, 2)}</pre>
      </div>

      <div
        style={{
          padding: "20px",
          margin: "20px",
          border: "1px solid black",
        }}
      >
        <h3>Id Access Token:</h3>
        <pre>{JSON.stringify(decodIdToken, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;
