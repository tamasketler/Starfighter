import React, { useState } from 'react';
import { Sprite, useTick, Container } from '@inlet/react-pixi';
import background from '../assets/spacebg.jpg';

export interface BackGroundProps {
  x: number
}

const maxW = 800;

const Background = () => {
    const speed = 1;
    const [first, updateFirst] = useState<BackGroundProps>({x: 0});
    const [second, updateSecond] = useState<BackGroundProps>({x: maxW});
    useTick(() => {
      if (second.x < 0) {
        updateFirst({x: 0});
        updateSecond({x: maxW});
      } else {
        updateFirst({x: first.x-speed});
        updateSecond({x: second.x-speed});
      }
    })
    return (
        <Container zIndex={0}>
         <Sprite image={background} scale={{ x: 1, y: 1}} {...first} y={0} />
         <Sprite image={background} scale={{ x: 1, y: 1}} {...second} y={0} />
        </Container>
      
    )
  }

  export default Background;