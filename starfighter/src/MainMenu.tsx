import React from 'react';
import { Container, Sprite, Text } from '@inlet/react-pixi';
import logo from './assets/logo.png';
import Meteorit from './components/Meteroid';
import MenuButton from './components/MenuButton';

const MainMenu = () => {

    const startGame = () => {
        console.log('start game');
    }

    const renderThankYou = () => {
        console.log('Thank you');
    }

    return (
        <Container>
            <Meteorit />
            <Meteorit />
            <Sprite image={logo} x={100} y={100} scale={{ x: 3, y: 3 }} position={[300, 10]} />
            <MenuButton
                text="GAME1"
                positionX={300}
                positionY={100}
                onClick={startGame} />
            <MenuButton
                text="GAME2"
                positionX={300}
                positionY={200}
                onClick={startGame} />
            <MenuButton
                text="GAME3"
                positionX={300}
                positionY={300}
                onClick={startGame} />
            <MenuButton
                text="EXIT"
                positionX={300}
                positionY={400}
                onClick={renderThankYou} />
        </Container>
    )

}

export default MainMenu;