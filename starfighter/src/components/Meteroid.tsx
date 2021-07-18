import React, { useState } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import meteor from '../assets/meteor.png';

export interface MeteoritProps {
  x: number,
  y: number,
  rotation?: number,
}

const getRandomMax = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
}

const maxW = 799;
const maxH = 599;

const Meteorit = () => {
    const speed = getRandomMax(3);
    const [motion, update] = useState<MeteoritProps>({x: getRandomMax(maxW), y: getRandomMax(maxH), rotation: 0.1});
    useTick((delta) => {
      let rotation;
      if (motion.rotation !== undefined && delta !== undefined) {
        rotation = (motion.rotation + 0.1 * delta)
      }
      if (motion.y > 600) {
        update({ x: getRandomMax(maxW),  y: 1, rotation: 0.1 })
      } else {
        update({
          x: motion.x,
          y: motion.y+speed,
          rotation: rotation,
        })
      }
    })
    return (
      <Sprite
        image={meteor}
        anchor={0.5}
        scale={{ x: 0.7, y: 0.7}}
        {...motion}
      />
    )
  }

  export default Meteorit;