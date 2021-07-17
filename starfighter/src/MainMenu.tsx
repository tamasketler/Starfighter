import { Container, Sprite, Text } from '@inlet/react-pixi';
import React from 'react';

const MainMenu = () => {
    const startGame = () => {
        console.log('start game');
    }

    return (
        <Container>
            <Sprite image="./assets/logo.jpg" x={100} y={100} position={[350, 450]} />
            <Text onClick={startGame} >GAME1</Text>
            <Text onClick={startGame} >GAME2</Text>
            <Text onClick={startGame} >GAME3</Text>
            <Text onClick={startGame} >EXIT</Text>
        </Container>
    )

}

export default MainMenu;