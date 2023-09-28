import { useEffect, useState } from "react";
import "./index.css";

const EmploymentTypeItem = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const { typeItem, checkboxSelectedFun, checkboxUnselectedFun } = props;
  const { id, label } = typeItem;

  useEffect(() => {
    sendValueToQuery();
    //eslint-disable-next-line
  }, [isSelected]);

  const sendValueToQuery = () => {
    if (isSelected) {
      checkboxSelectedFun(id);
    } else {
      checkboxUnselectedFun(id);
    }
  };

  const toggleTheSelected = () => {
    setIsSelected(!isSelected);
  };

  return (
    <li className="employment-type-list-item">
      <input
        type="checkbox"
        id={id}
        className="employment-type-checkbox"
        onChange={toggleTheSelected}
        checked={isSelected}
        value={id}
      />
      <label className="employment-type-label" htmlFor={id}>
        {label}
      </label>
    </li>
  );
};

export default EmploymentTypeItem;
