import Dashboard from "pages/adminPages/Dashboard";
import Services from "pages/adminPages/Services";
import Calendar from "pages/adminPages/Calendar";
import Settings from "pages/adminPages/Settings";

const adminRoutes = [
	{
		path: ":company_domain/dashboard",
		component: Dashboard,
	},
	{
		path: ":company_domain/services",
		component: Services,
	},
	{
		path: ":company_domain/calendar",
		component: Calendar,
	},
	{
		path: ":company_domain/settings",
		component: Settings,
	},
];

export default adminRoutes;
