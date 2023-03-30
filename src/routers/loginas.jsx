import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../helpers/config";
import { saveLogin } from "../helpers/localStorage";

function LoginAs() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    axios
      .post(`${baseUrl()}/users/login_as/`, {
        token: token,
      })
      .then((response) => {
        console.log("response", response.data);
        saveLogin(response.data.data);
        navigate("/new-reports");
      })
      .catch((data) => {
        navigate("/login");
      });
  }, []);

  return <Outlet />;
}

export default LoginAs;
