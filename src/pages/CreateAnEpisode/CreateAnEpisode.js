import React, { useState } from "react";
import Header from "../../components/CommonComponents/header/Header";
import Input from "../../components/CommonComponents/Input/Input";
import FileInput from "../../components/CommonComponents/Input/FileInput";
import Button from "../../components/CommonComponents/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
function CreateAnEpisode() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const audioHandler = (file) => {
    setAudioFile(file);
  };
  const handleSubmit = async () => {
    setLoading(true);
    console.log(id);
    if (title && desc && audioFile && id) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title,
          description: desc,
          audioFile: audioUrl,
        };
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("episiode created succesfully");
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle(null);
        setDesc(null);
        setAudioFile(null);
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      toast.error("Please enter data into all fields!");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
        <Input
          state={title}
          setState={setTitle}
          placeholder="Title"
          type="text"
          required={true}
        />
        <Input
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          accept={"audio/*"}
          id={"audio-file-input"}
          fileHandler={audioHandler}
          text="Upload Audio File"
        />
        <Button
          text={loading ? "loading..." : "Create Episode"}
          disbled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateAnEpisode;
