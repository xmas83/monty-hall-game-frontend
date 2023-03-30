import React, {useState} from 'react';
import '../style.css'

function Game() {
  const [userDoor, setUserDoor] = useState(1);
  const [switchDoor, setSwitchDoor] = useState(false);
  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    setUserDoor(parseInt(event.target.value));
  };

  const handleSwitch = (event) => {
    setSwitchDoor(event.target.checked);
  };

  const playGame = async () => {
    const response = await fetch(`http://localhost:8080/play?door=${userDoor}`);
    const data = await response.text();
    setResponse(data);
  };

  const getResult = async () => {
    const response = await fetch(`http://localhost:8080/result?door=${userDoor}&switch=${switchDoor}`);
    const data = await response.text();
    setResponse(data);
  };

  return (
    <div>
      <h1>Monty Hall Problem</h1>
      <p>Select a door:</p>
      <div>
        <label>
          <input type="radio" value="1" checked={userDoor === 1} onChange={handleChange}/>
          Door 1
        </label>
        <label>
          <input type="radio" value="2" checked={userDoor === 2} onChange={handleChange}/>
          Door 2
        </label>
        <label>
          <input type="radio" value="3" checked={userDoor === 3} onChange={handleChange}/>
          Door 3
        </label>
      </div>
      <br/>
      <label>
        <input type="checkbox" checked={switchDoor} onChange={handleSwitch}/>
        Switch Door
      </label>
      <br/>
      <br/>
      <button onClick={playGame}>Play</button>
      <button onClick={getResult}>Get Result</button>
      <br/>
      <br/>
      <p>{response}</p>
    </div>
  );
}

export default Game;
