import Button from "../button/Button";
import "./styles.css";
const EpisodeDetails = ({ title, description, audioFile, onClick }) => {
  return (
    <div className="episode-details" style={{ display: "block !important" }}>
      <h1 className="episode-heading">{title}</h1>
      <p>{description}</p>
      <Button
        text={"Play"}
        onClick={() => {
          onClick(audioFile);
        }}
        disabled={false}
        width={"120px"}
      />
    </div>
  );
};
export default EpisodeDetails;
