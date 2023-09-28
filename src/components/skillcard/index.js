import "./index.css";

const SkillsCard = (props) => {
  const { skillDetails } = props;
  const { name, imageUrl } = skillDetails;

  return (
    <li className="skill-card-list-item col-12 col-sm-6 col-md-4 mt-4 mb-4 p-0">
      <div className="d-flex align-items-center mr-2">
        <img src={imageUrl} alt={name} className="skill-card-image" />
        <p className="skill-card-text">{name}</p>
      </div>
    </li>
  );
};

export default SkillsCard;
