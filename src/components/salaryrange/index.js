import "./index.css";

const SalaryRangeItem = (props) => {
  const { packageItem, salaryRangeItemSelectedFun } = props;
  const { id, label } = packageItem;

  const changeToSelectedSalary = () => {
    salaryRangeItemSelectedFun(id);
  };

  return (
    <li className="salary-range-list-item">
      <input
        type="radio"
        id={id}
        className="salary-range-radio"
        name="salary"
        onChange={changeToSelectedSalary}
        value={id}
      />
      <label className="salary-range-label" htmlFor={id}>
        {label}
      </label>
    </li>
  );
};

export default SalaryRangeItem;
