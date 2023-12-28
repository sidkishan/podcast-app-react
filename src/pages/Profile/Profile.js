import Button from "../../components/CommonComponents/button/Button";
import Header from "../../components/CommonComponents/header/Header";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Loader from "../../components/CommonComponents/Loader";
const ProfilePage = () => {
  //try {
  const userData = useSelector((state) => state.user.user);
  //} catch (e) {
  //console.log("Error getting user data: ", e);
  //}
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("user logged out!");
        //user variable will be null and private route will navigate to signup page automatically
        //no need to navigate to signup page explicitely
      })
      .catch((e) => {
        //sign out error
        toast.error(e.message);
      });
  };
  if (!userData) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Profile Page</h1>
        <div className="user-details">
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Token: {userData.uid}</p>
        </div>

        <div className="profile-page-btn">
          <Button text={"Logout"} onClick={handleLogout} disabled={false} />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
