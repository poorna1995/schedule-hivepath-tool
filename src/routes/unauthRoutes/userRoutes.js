import SelectLocationPage from "pages/userPages/SelectLocationPage";
import SelectServicePage from "pages/userPages/SelectServicePage";
import SelectDatePage from "pages/userPages/SelectDatePage";
import ConfirmBookingPage from "pages/userPages/ConfirmBookingPage";

const userRoutes = [
  {
    path: ":company_domain/",
    component: SelectLocationPage,
  },
  {
    path: ":company_domain/add-services",
    component: SelectServicePage,
  },
  {
    path: ":company_domain/select-date",
    component: SelectDatePage,
  },
  {
    path: ":company_domain/confirm-booking",
    component: ConfirmBookingPage,
  },
];

export default userRoutes;
