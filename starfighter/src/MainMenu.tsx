import React from 'react';
import { Container, Sprite } from '@inlet/react-pixi';
import logo from './assets/logo.png';
import background from './assets/menubg.jpg';
import Meteorit from './components/Meteroid';
import MenuButton from './components/MenuButton';

export interface MenuProps {
    startGame: () => void;
    exitGame: () => void;
}

const MainMenu = ({startGame, exitGame }: MenuProps) => {
    return (
        <Container>
            <Sprite scale={{ x: 1.5, y: 1.5 }} position={[0, 0]} image={background} />
            <Meteorit />
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
                onClick={exitGame} />
        </Container>
    )

}

export default MainMenu;