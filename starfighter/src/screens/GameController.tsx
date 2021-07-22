import { Container, useTick, Sprite, _ReactPixi } from '@inlet/react-pixi';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Enemy from '../components/Enemy';
import Background from '../components/ParallaxBackground';
import Player, { PlayerProps } from '../components/Player';
import Missile from '../components/Projectile';
import Explosion from '../components/Explosion';
//import Bump from 'pixi-plugin-bump';

type KeyStates = {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    fire:boolean;
}

const playerSpeed = 5;

export interface ControllerProps {
    endGame: () => void;
}

const GameController = ({ endGame }: ControllerProps) => {
    const [enemyCounter, setEnemyCounter] = useState(0);
    const [idCounter, setCounter] = useState(1);
    const [keyState, setKeyState] = useState<KeyStates>({up: false, down: false ,left: false, right: false, fire: false})
    const [player, setPlayer] = useState<PlayerProps>({x: 50, y: 295});
    const [projectiles, setProjectiles] = useState<JSX.Element[]>([]);
    const [enemies, setEnemies] = useState<JSX.Element[]>([]);
    const [explosions, setExplosions] = useState<JSX.Element[]>([]);
    //const bump = new Bump();

    const playerShip = <Player {...player}/>;

    const renderMissile = () => {
        return <Missile key={idCounter} startX={player.x} startY={player.y} />;
    }

    const renderEnemy = () => {
        return <Enemy key={enemyCounter} />;
    }

    const renderExplosion = (x: number | undefined, y: number | undefined) => {
        return x !== undefined && y !== undefined ? <Explosion key={enemyCounter} x={x} y={y} /> : <div/>
    }

    const destroyEnemy = (enemy: JSX.Element) => {
        const destroyable = enemy as _ReactPixi.ISprite;
        setEnemies(enemies.filter(item => item.key !== enemy.key));
        setExplosions(explosions.concat(renderExplosion(destroyable.x, destroyable.y)));
    }

    // Collosion is not working unfortunately because of package versions

    // const rectsIntersect = (a:_ReactPixi.ISprite, b:_ReactPixi.ISprite) => {
    //     const aBox = a._bounds?.getRectangle();
    //     const bBox = b._bounds?.getRectangle();

    //     if (aBox !== undefined && bBox !== undefined) {
    //         return aBox.x + aBox.width > bBox.x &&
    //             aBox.x < bBox.x + bBox.width &&
    //             aBox.y + aBox.height > bBox.y &&
    //             aBox.y < bBox.y + bBox.height;
    //     }
    //     else {
    //         throw new Error('intersect error');
    //     }
    // }

    // const hit = (a: JSX.Element, b:JSX.Element[]) => {
    //     const main = a as _ReactPixi.ISprite;
    //     b.forEach(item => {
    //         if (bump.hitTestRectangle(main, item as _ReactPixi.ISprite, true)){
    //             return true;
    //         }
    //     });
    //     return false;
    // }

    // const testEnemyHit = () => {
    //     enemies.forEach(enemy => {
    //         if (hit(enemy, projectiles)) {
    //             destroyEnemy(enemy);
    //         }
    //     })
    // }

    // const testPlayerHit = () => {
    //     if (hit(playerShip, enemies)) {
    //         endGame();
    //     }
    // }

    useTick(() => {
        // testPlayerHit();
        // testEnemyHit();

        if (enemyCounter % 200 === 0) {
            setEnemies(enemies.concat(renderEnemy()));
        }
        if (keyState.up) {
            setPlayer({x: player.x, y:player.y-playerSpeed });
        }
        if (keyState.down) {
            setPlayer({x: player.x, y:player.y+playerSpeed });
        }
        if (keyState.right) {
            setPlayer({x: player.x+playerSpeed, y:player.y });
        }
        if (keyState.left) {
            setPlayer({x: player.x-playerSpeed, y:player.y });
        }
        if (keyState.fire) {
            setProjectiles(projectiles.concat(renderMissile()));
            setKeyState({...keyState,  fire:false});
            setCounter(idCounter+1);
        }
        setEnemyCounter(enemyCounter+1);
    })

    const keyDown = (e: KeyboardEvent) => {
        e.stopPropagation();
        e.preventDefault()
        switch(e.key) {
            case 'ArrowUp':
                console.log('up');
                setKeyState({...keyState,  up:true})
                break;
            case 'ArrowDown':
                console.log('down');
                setKeyState({...keyState,  down:true})
                break;
            case 'ArrowRight':
                console.log('r');
                setKeyState({...keyState,  right:true})
                break;
            case 'ArrowLeft':
                console.log('l');
                setKeyState({...keyState,  left:true})
                break;
            case ' ':
                console.log('space');
                setKeyState({...keyState,  fire:true})
                break;
            default:
                console.log('No function assigned to that key');
        }
    }

    const keyUp = (e: KeyboardEvent) => {
        e.stopPropagation();
        e.preventDefault()
        switch(e.key) {
            case 'ArrowUp':
                setKeyState({...keyState,  up:false});
                break;
            case 'ArrowDown':
                setKeyState({...keyState,  down:false});
                break;
            case 'ArrowRight':
                setKeyState({...keyState,  right:false});
                break;
            case 'ArrowLeft':
                setKeyState({...keyState,  left:false});
                break;
            case ' ':
                setKeyState({...keyState,  fire:false})
                break;
            default:
        }
    }

    const keyDownListener = keyDown;
    const keyUpListener = keyUp;

    useEffect(() => {
        window.addEventListener("keydown", keyDownListener);
        window.addEventListener("keyup", keyUpListener);
    },[])

    return (
        <Container>
            <Background/>
            {playerShip}
            {projectiles}
            {enemies}
        </Container>
    )
}

export default GameController;
