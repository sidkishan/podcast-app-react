import { Link } from "react-router-dom";
import "./styles.css";
import svgLogo from "./Vector.svg";
const PodcastCard = ({ id, title, displayImage }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img
          src={displayImage}
          alt="podcast-pic"
          className="podcast-card-img"
        />
        <div className="podcast-card-title">
          <p>{title}</p>
          <img src={svgLogo} alt="icon" />
        </div>
      </div>
    </Link>
  );
};
export default PodcastCard;
