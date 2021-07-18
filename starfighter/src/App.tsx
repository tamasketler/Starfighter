import React, { useState } from 'react';
import { Stage, Sprite } from '@inlet/react-pixi';
import MainMenu from './MainMenu';
import splash from './assets/splash.png';

const App = () => {
  const [renderSplash, setRenderSplash] = useState<boolean>(true);

  setTimeout(() => {
    setRenderSplash(false);
  }, 2000)

  const renderScreen = () => {
    return renderSplash ? <Sprite scale={{ x: 1.5 , y: 1.5}} position={[0, 0]} image={splash} /> : <MainMenu />
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
