import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter, //as Router,
  Routes,
  Route,
  useParams,
  useSearchParams,
} from "react-router-dom";
import unauthRoutes from "./routes/unauthRoutes";
import authRoutes from "./routes/authRoutes";
import NoMatchPath from "./components/NoMatch";
import { SnackbarProvider } from "notistack";
import CustomSuccessSnackbar from "components/common/Feedback/Snackbars/CustomSuccessSnackbar";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES, GENERAL_SERVICES } from "constants/API_URLS";
import {
  setCompanyInfo,
  updateCompanyInfo,
} from "store/compnay-info/companySlice";
import { useDispatch } from "react-redux";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import WithAuth from "hoc/withAuth";
import { useSelector } from "react-redux";

//   console.log(queryParams);
//   const company_domain = "amona";
//   const { domain } = useSelector((state) => state.user?.currentUser) || {};
//   const tempDomain = company_domain; //domain || "amona";
function App() {
  const company_domain = window.location.pathname.split("/")[1];
  const [noMatch, setNoMatch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const notistack = React.createRef();
  const dispatch = useDispatch();

  const fetchCompanyDetails = () => {
    setIsLoading(true);
    const requestData = {
      company_id: "",
      admin_id: "",
      domain: company_domain,
    };
    authFetch(ADMIN_SERVICES.FETCH_MASTER_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, result } = res;
        if (status === "success") {
          setNoMatch(false);
          dispatch(setCompanyInfo(result));
          fetchBranches(result.company_base_id);
        } else {
          console.log(res);
          setNoMatch(true);
        }
      })
      .catch((res) => {
        setNoMatch(true);
        setIsLoading(false);
        console.log(res);
      });
  };

  const fetchBranches = (company_base_id) => {
    setIsLoading(true);
    const requestData = {
      company_id: "",
      company_base_id: company_base_id,
      //   admin_id: user_id,
      //   domain: domain,
    };
    authFetch(GENERAL_SERVICES.FETCH_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, result, message } = res;
        console.log(res);
        if (status === "success") {
          const branches = result.filter((item) => item.company_name !== "");
          dispatch(updateCompanyInfo({ branches: branches }));
        } else {
          //   enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
      });
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  if (noMatch) {
    return <NoMatchPath />;
  }

  return (
    <div className="App">
      <LoadingBackdrop open={isLoading} />
      <SnackbarProvider
        autoHideDuration={3000}
        ref={notistack}
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        content={(key, message) => {
          return <CustomSuccessSnackbar id={key} message={message} />;
        }}
      >
        <BrowserRouter>
          <Routes>
            {unauthRoutes.map((route) => {
              const { path, component: Component } = route;
              return <Route path={path} key={path} element={<Component />} />;
            })}

            {authRoutes.map((route) => {
              const { path, component: Component } = route;
              return (
                <Route
                  path={path}
                  key={path}
                  element={
                    <WithAuth>
                      <Component />
                    </WithAuth>
                  }
                />
              );
            })}

            <Route path="*" element={<NoMatchPath />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
