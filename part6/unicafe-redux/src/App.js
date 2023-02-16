import { addVote } from "./reducers/counterReducer";
import { useSelector, useDispatch } from "react-redux";
import Votes from "./components/Votes";

export default function App() {
  const dispatch = useDispatch();
  const votes = useSelector((state) => state);

  function vote(type) {
    dispatch(addVote(type));
  }

  return (
    <div>
      <h1>Unicafe-redux</h1>
      <h2>Votes</h2>
      <div>
        <Votes votes={votes} />
      </div>
      <h2>Vote</h2>
      <button onClick={(e) => vote("GOOD")}>good</button>
      <button onClick={(e) => vote("OK")}>ok</button>
      <button onClick={(e) => vote("BAD")}>bad</button>
      <button onClick={(e) => vote("ZERO")}>reset stats</button>
    </div>
  );
}
