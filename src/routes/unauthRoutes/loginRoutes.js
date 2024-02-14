import LoginPage from "pages/authenticationPages/LoginPage";

const loginRoutes = [
  {
    path: ":company_domain/login",
    component: LoginPage,
  },
];

export default loginRoutes;
