import "./index.css";

const EmploymentTypeItem = (props) => {
  const { typeItem } = props;
  const { id, label } = typeItem;

  return (
    <li className="employment-type-list-item">
      <input type="checkbox" id={id} className="employment-type-checkbox" />
      <label className="employment-type-label" htmlFor={id}>
        {label}
      </label>
    </li>
  );
};

export default EmploymentTypeItem;
