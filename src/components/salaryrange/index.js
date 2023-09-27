import "./index.css";

const SalaryRangeItem = (props) => {
  const { packageItem } = props;
  const { id, label } = packageItem;

  return (
    <li className="salary-range-list-item">
      <input
        type="radio"
        id={id}
        className="salary-range-radio"
        name="salary"
      />
      <label className="salary-range-label" htmlFor={id}>
        {label}
      </label>
    </li>
  );
};

export default SalaryRangeItem;
