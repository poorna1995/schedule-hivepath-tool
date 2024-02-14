import adminRoutes from "./adminRoutes";

const authAppRoutes = [adminRoutes];

const authRoutes = authAppRoutes.flat();

export default authRoutes;
