import Header from "../../components/CommonComponents/header/Header";
import StartPodcastForm from "../../components/StartAPodcast/StartPodcastForm";
import "../../";
const CreateAPodcastPage = () => {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Brand New Podcast</h1>
        <StartPodcastForm />
      </div>
    </div>
  );
};
export default CreateAPodcastPage;
