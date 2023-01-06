import { useState } from "react";

const Display = ({counter}) => <div>{counter}</div>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>The app is used by pressing the buttons</div>
    )
  }
  return (
    <div>Button press history: {allClicks.join(' ')}</div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'));
    setLeft(left + 1);
  }

  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'));
    setRight(right + 1);
  }

  return (
    <div>
      <Display counter={left} />
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      <Display counter={right} />
      <History allClicks={allClicks} />
    </div>
  )
};

export default App;
