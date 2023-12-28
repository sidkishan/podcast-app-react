import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  } else if (!user || error) {
    //toast.error("Please login first!!!");
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoutes;
