import { useDispatch } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(updateFilter(event.target.value))
  };

  return (
    <div className="filter">
      Filter: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
