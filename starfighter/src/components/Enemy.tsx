import React, { useState } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import enemy from '../assets/enemy.png';

export interface MotionProps {
  x: number,
  y: number,
}

const getRandomMax = (max: number) => {
    return Math.floor(Math.random() * max) + 1;
  }

const Enemy = () => {
    const [isVisible, setVisible] = useState<boolean>(true);
    const speed = 1;
    const [motion, update] = useState<MotionProps>({x: 800, y:getRandomMax(550)});

    const getDirection = () => {
        return getRandomMax(2) === 1 ? motion.y+speed : motion.y-speed;
    }

    useTick(() => {
      if (motion.x < 0) {
        setVisible(false);
      } else {
        update({ x: motion.x-speed, y: getDirection() });
      }
    })
    return (
         <Sprite  visible={isVisible} zIndex={1} image={enemy} scale={{ x: 0.8, y: 0.8}} {...motion} />
    )
  }

  export default Enemy;