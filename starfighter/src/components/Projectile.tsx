import React, { useState } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';
import rocket from '../assets/rocket.png';

export interface MissileProps {
    startX: number,
    startY: number,
}

export interface MotionProps {
  x: number,
  y: number,
}

const Missile = ({startX, startY}: MissileProps) => {
    const [isVisible, setVisible] = useState<boolean>(true);
    const speed = 5;
    const [motion, update] = useState<MotionProps>({x: startX, y:startY});
    useTick(() => {
      if (motion.x > 850) {
        setVisible(false);
      } else {
        update({x: motion.x+speed, y:motion.y});
      }
    })
    return (
         <Sprite visible={isVisible} zIndex={1} image={rocket} rotation={1.5} scale={{ x: 0.5, y: 0.5}} {...motion} />
    )
  }

  export default Missile;