import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";
const unauthAppRoutes = [userRoutes, loginRoutes];

const unauthRoutes = unauthAppRoutes.flat();

export default unauthRoutes;
