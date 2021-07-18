import React, { useState } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import splash from '../assets/splash.png';

export interface SplashProps {
    onComplete: () => void;
}

const Splash = ({onComplete}:SplashProps) => {
    const [animationCounter, update] = useState<number>(0);
    const [fading, setFading] = useState(1);
    useTick((delta) => {
        if (fading >= 0) {
            if ( animationCounter > 200) {
                setFading(fading - 0.01);
            }
            update(animationCounter + 1);
        }
        else {
            onComplete();
        }
    })

    return (
        <Sprite scale={{ x: 1.5 , y: 1.5}} position={[0, 0]} image={splash} alpha={fading} />
    )
  }

  export default Splash;