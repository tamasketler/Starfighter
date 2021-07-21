import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import ship from '../assets/spaceship.png';

export interface PlayerProps {
    x: number;
    y: number;
}

const Player = ({x, y}: PlayerProps) => {    
    return (
      <Sprite
        zIndex={1}
        x={x}
        y={y}
        image={ship}
        anchor={0.5}
        rotation={1.58}
        scale={{ x: 1, y: 1}}
      />
    )
  }

  export default Player;