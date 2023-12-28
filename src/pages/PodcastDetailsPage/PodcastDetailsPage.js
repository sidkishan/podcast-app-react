import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/CommonComponents/header/Header";
import { toast } from "react-toastify";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import Button from "../../components/CommonComponents/button/Button";
import { auth } from "../../firebase";
import EpisodeDetails from "../../components/CommonComponents/EpisodeDetails";
import AudioPlayer from "../../components/CommonComponents/AudioPlayer";
import Loader from "../../components/CommonComponents/Loader";
const PodcastDetailsPage = () => {
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");
  const navigate = useNavigate();
  // audio file state: lifting the state up
  const [isPlaying, setIsPlaying] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        toast.error("Error fetching episodes!");
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);
  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log("doc data", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
        //toast.success("podcast details fetched!");
      } else {
        //console.log("no such podcast!");
        toast.error("no such podcast!");
        navigate("/podcasts");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div style={{ paddingBottom: "100px" }}>
      <Header />
      <div
        className="input-wrapper"
        style={{
          marginTop: "0",
          alignItems: "start",
        }}
      >
        {podcast.id && (
          <>
            <div className="hello">
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <Button
                  width={"320px"}
                  text="Create Episode"
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} alt="podcast-banner" />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1
              className="podcast-title-heading"
              style={{ marginBottom: "15px", marginLeft: "5px" }}
            >
              Episodes
            </h1>
            {episodes.length > 0 ? (
              <ol style={{ margin: "0 35px", padding: "0" }}>
                {episodes.map((epi, index) => (
                  <li style={{ margin: "0", padding: "0" }} key={index}>
                    <EpisodeDetails
                      title={epi.title}
                      description={epi.description}
                      audioFile={epi.audioFile}
                      onClick={(file) => {
                        setPlayingFile(file);
                        setIsPlaying(!isPlaying);
                      }}
                    />
                  </li>
                ))}
              </ol>
            ) : (
              "No episodes found!"
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer
          audioSrc={playingFile}
          image={podcast.displayImage}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
};
export default PodcastDetailsPage;
