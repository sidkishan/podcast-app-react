import { useEffect, useState } from "react";
import Header from "../../components/CommonComponents/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../../Slices/podcastSlice";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../firebase";
import PodcastCard from "../../components/CommonComponents/PodcastCard/PodcastCard";
import "./styles.css";
import Input from "../../components/CommonComponents/Input/Input";
import Loader from "../../components/CommonComponents/Loader";
const Podcasts = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(searchText.trim().toLowerCase())
  );
  return (
    <div>
      <Header />
      <div
        className="input-wrapper"
        style={{ marginTop: "1.5rem", paddingBottom: "30px" }}
      >
        <h1>Discover amazing podcasts</h1>
        <Input
          type={"text"}
          value={searchText}
          setState={setSearchText}
          placeholder={"Search your favourite podcast here"}
          required={true}
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcasts.map((item) => (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            ))}
          </div>
        ) : (
          <p>no podcast found</p>
        )}
      </div>
    </div>
  );
};
export default Podcasts;
