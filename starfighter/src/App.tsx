import React, { useState } from 'react';
import { Stage } from '@inlet/react-pixi';
import MainMenu from './screens/MainMenu';
import Splash from './components/Splash';
import GameController from './screens/GameController';

const App = () => {
  const splashComplete = () => {
    setScreen(<MainMenu startGame={startGame} exitGame={exitGame}/>)
  }
  const [screen, setScreen] = useState<JSX.Element>(<Splash onComplete={splashComplete} />);
  
  const startGame = () => {
    setScreen(<GameController endGame={splashComplete} />)
  }

  const exitGame = () => {
    console.log('exit');
  }

  return (
    <div className="App">
      <Stage width={800} height={600}>
        {screen}
      </Stage>
    </div>
  );
}

export default App;
