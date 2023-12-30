import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  if (loading) {
    return <Loader />;
  } else if (!user || error) {
    //navigate("/");
    toast.error("Please login first!!!", {
      toastId: "success1", //for avoiding multiple same error messages
    });
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoutes;
