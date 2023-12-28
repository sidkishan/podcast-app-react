import "./components/CommonComponents/button/Button.css";
import { useEffect } from "react";
import ProfilePage from "./pages/Profile/Profile";
import SignupPage from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./Slices/userSlice";
import PrivateRoutes from "./components/CommonComponents/PrivateRoutes";
import CreateAPodcastPage from "./pages/createAPodcastPage/CreateAPodcastPage";
import Podcasts from "./pages/PodcastsPage/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetailsPage/PodcastDetailsPage";
import CreateAnEpisode from "./pages/CreateAnEpisode/CreateAnEpisode";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  //PRIVATE ROUTES LOGIC
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-a-podcast" element={<CreateAPodcastPage />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisode />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
