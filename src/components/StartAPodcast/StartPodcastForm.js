import { useState } from "react";
import Input from "../CommonComponents/Input/Input";
import Button from "../CommonComponents/button/Button";
import { toast } from "react-toastify";
import FileInput from "../CommonComponents/Input/FileInput";
import { storage, auth, db } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
const StartPodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (title && desc && displayImage && bannerImage) {
      //1. upload files and get downloadable links to show the pictures, use firebase storage
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage); //import from firebase storage
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        //1. upload files and get downloadable links to show the picture: for display image
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        //2. create a new doc in a new collection "podcasts" in firebase db
        const podcastData = {
          title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        //now redirect to podcast details page and use docRef in new page url
        toast.success("Podcast created!");
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error(e.message);
      }

      //3. save this new podcast episodes states in our podcasts
    } else {
      setLoading(false);
      toast.error("Hey! something is missing, enter data into all fields");
    }
  };
  const bannerImageHandler = (file) => {
    setBannerImage(file);
  };
  const displayImageHandler = (file) => {
    setDisplayImage(file);
  };
  return (
    <>
      <Input
        type={"text"}
        value={title}
        setState={setTitle}
        placeholder={"Podcast Title"}
        required={true}
      />
      <Input
        type={"email"}
        value={desc}
        setState={setDesc}
        placeholder={"Podcast Description"}
        required={true}
      />
      <FileInput
        text={"Upload banner image"}
        accept={"image/*"}
        id={"banner-image-input"}
        fileHandler={bannerImageHandler}
      />
      <FileInput
        text={"Upload display image"}
        accept={"image/*"}
        id={"display-image-input"}
        fileHandler={displayImageHandler}
      />
      <Button
        text={loading ? "loading..." : "Create Podcast"}
        onClick={handleSubmit}
        disabled={loading}
      />
    </>
  );
};
export default StartPodcastForm;
