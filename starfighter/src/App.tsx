import React, { useState } from 'react';
import { Stage, Sprite } from '@inlet/react-pixi';
import MainMenu from './MainMenu';

const App = () => {
  const [renderSplash, setRenderSplash] = useState<boolean>(true);

  setTimeout(() => {
    setRenderSplash(false);
  }, 2000)

  const renderScreen = () => {
    renderSplash ? <Sprite image="./assets/splash.jpg" /> : <MainMenu />
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
