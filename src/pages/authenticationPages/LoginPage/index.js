import { Checkbox, FormControlLabel } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PasswordInput from "components/common/Inputs/PasswordInput";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import EmailInput from "components/common/Inputs/EmailInput";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { AUTH_SERVICES } from "constants/API_URLS";
import { signInSuccess } from "store/user/userSlice";
import { useCookies } from "react-cookie";
import AuthenticationLayout from "Layouts/AuthenticationLayout";

// import signinImage from "assets/svg/auth-pages/signin.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    maxWidth: "600px",
    height: "100%",
    width: "100%",
    margin: "auto",
    marginLeft: "10%",
    marginTop: "9%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
  },
  label: {
    fontWeight: theme.typography.fontWeightBold,
    color: "black",
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  socialAuth: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  logInButton: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
}));
const LoginPage = () => {
  const { company_domain } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { company_base_name } = useSelector((state) => state.companyInfo);
  const [rememberMe, setRememberMe] = useState(false);
  const [cookies, setCookie] = useCookies(["huid", "htoken"]);

  const [loading, setLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();

  const data = {
    email: email,
    password: password,
    domain: company_domain,
  };

  const handleCheckbox = () => {
    setRememberMe(true);
  };
  useEffect(() => {
    if (currentUser) navigate(`/${company_domain}/dashboard`);
  }, [currentUser]);

  const handleLogin = (e) => {
    // setLoading(true);
    e.preventDefault();
    // fetch authentication
    authFetch(AUTH_SERVICES.LOGIN, data)
      .then((json) => {
        console.log(json);
        if (json.status === "success") {
          enqueueSnackbar(json.message, {
            variant: "success",
          });

          const USER_UID = json.user_data.user_id;
          const HUToken = json.user_data.login_token;

          setCookie("huid", USER_UID, {
            path: "/",
            domain: process.env.NODE_ENV === "production" && ".hivepath.io",
          });
          setCookie("htoken", HUToken, { path: "/" });

          dispatch(signInSuccess({ ...json.user_data }));

          // setLoading(false);
        } else {
          enqueueSnackbar(json.message, {
            variant: "error",
          });
        }
      })
      .catch((error) => console.log("error: ", error));
  };
  return (
    <AuthenticationLayout
      title="Login | Hivepath"
      backgroundTitle={`Welcome to ${company_base_name}`}
      // imgSrc={signinImage}
    >
      <div className={classes.container}>
        <div style={{ marginBottom: "24px" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: "28px",
              marginBottom: "40px",
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Log in to continue
          </Typography>

          <form onSubmit={handleLogin} style={{ marginBottom: "24px" }}>
            <EmailInput email={email} setEmail={setEmail} required />
            <PasswordInput
              isLoginPage
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                style={{ fontSize: "16px" }}
                control={
                  <Checkbox
                    color="primary"
                    value={rememberMe}
                    onChange={handleCheckbox}
                    icon={<MdCheckBoxOutlineBlank fontSize="16px" />}
                    checkedIcon={<MdCheckBox fontSize="16px" />}
                  />
                }
                label={"Remember me"}
              />
            </div>
            <div
              style={{ textAlign: "center" }}
              className={classes.logInButton}
            >
              <PrimaryButton
                type="submit"
                title="Log In"
                disabled={loading}
                loading={loading}
                // style={{ opacity: "0.5" }}
              />
            </div>
          </form>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default LoginPage;
