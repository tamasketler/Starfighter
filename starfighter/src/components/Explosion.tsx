import React, { useState } from 'react';
import { AnimatedSprite } from '@inlet/react-pixi';
import explosion1 from '../assets/explosion1.png';
import explosion2 from '../assets/explosion2.png';
import explosion3 from '../assets/explosion3.png';
import { Texture } from 'pixi.js';

export interface PlayerProps {
    x: number;
    y: number;
}

const Explosion = ({x, y}: PlayerProps) => {
    const textures: Texture[] = [Texture.from(explosion1),Texture.from(explosion2),Texture.from(explosion3)]
    const [isVisible, setVisible] = useState<boolean>(true);

    const onComplete = () => {
        setVisible(false);
    }

    return (
      <AnimatedSprite
        visible={isVisible}
        zIndex={1}
        x={x}
        y={y}
        textures={textures}
        anchor={0.5}
        scale={{ x: 1, y: 1}}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.1}
        loop={false}
        onComplete={onComplete}
      />
    )
  }

  export default Explosion;