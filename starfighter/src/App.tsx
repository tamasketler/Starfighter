import React, { useState } from 'react';
import { Stage } from '@inlet/react-pixi';
import MainMenu from './screens/MainMenu';
import Splash from './components/Splash';
import GameController from './screens/GameController';

const App = () => {
  const splashComplete = () => {
    setElements([<MainMenu startGame={startGame} exitGame={exitGame}/>])
  }
  const [elements, setElements] = useState<JSX.Element[]>([<Splash onComplete={splashComplete} />]);
  
  const startGame = () => {
    setElements([<GameController />])
  }

  const exitGame = () => {
    console.log('exit');
  }

  return (
    <div className="App">
      <Stage width={800} height={600}>
        {elements}
    </Stage>
    </div>
  );
}

export default App;
