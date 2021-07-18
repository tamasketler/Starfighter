import { TextStyle } from 'pixi.js';
import React, { useState } from 'react';
import { Container, Text } from '@inlet/react-pixi';

export interface MenuButtonProps {
    text: string;
    positionX: number;
    positionY: number;
    onClick: () => void;
}

const MenuButton = ({text, positionX, positionY, onClick }: MenuButtonProps) => {
    const [mouseOver, setMouseOver] = useState<boolean>();

    const onMouseOver = () => {
        setMouseOver(true);
    }

    const mouseOut = () => {
        setMouseOver(false);
    }

    const getStyle = () => {
        return mouseOver ? new TextStyle({ fill: ['#e6f02b'] }) : new TextStyle({ fill: ['#ffffff'] })
    }

    return (
        <Container x={100} y={50} position={[positionX, positionY]} interactive={true} click={onClick} mouseover={onMouseOver} mouseout={mouseOut}  >
            <Text
                text={text}
                style={getStyle()} />
        </Container>
    )
}

export default MenuButton;