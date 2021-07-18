import React, { useState } from 'react';
import { Stage } from '@inlet/react-pixi';
import MainMenu from './MainMenu';
import Splash from './components/Splash';

const App = () => {
  const [renderSplash, setRenderSplash] = useState<boolean>(true);

  const splashComplete = () => {
    setRenderSplash(false);
  }

  const startGame = () => {
    console.log('start game');
  }

  const exitGame = () => {
    console.log('exit');
  }

  const renderScreen = () => {
    return renderSplash ? <Splash onComplete={splashComplete} /> : <MainMenu startGame={startGame} exitGame={exitGame}/>
  }

  return (
    <div className="App">
      <Stage width={800} height={600}>
        {renderScreen()}
    </Stage>
    </div>
  );
}

export default App;
