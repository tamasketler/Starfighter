import { Container, useTick, Sprite, _ReactPixi } from '@inlet/react-pixi';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Enemy from '../components/Enemy';
import Background from '../components/ParallaxBackground';
import Player, { PlayerProps } from '../components/Player';
import Missile from '../components/Projectile';
import * as PIXI from 'pixi.js';

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

    const playerShip = <Player {...player}/>;

    const hitTestRectangle = (r1:any, r2:any) => {

        //Define the variables we'll need to calculate
        let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
      
        //hit will determine whether there's a collision
        hit = false;
      
        //Find the center points of each sprite
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;
      
        //Find the half-widths and half-heights of each sprite
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;
      
        //Calculate the distance vector between the sprites
        vx = r1.centerX - r2.centerX;
        vy = r1.centerY - r2.centerY;
      
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        combinedHalfHeights = r1.halfHeight + r2.halfHeight;
      
        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
      
          //A collision might be occurring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {
      
            //There's definitely a collision happening
            hit = true;
          } else {
      
            //There's no collision on the y axis
            hit = false;
          }
        } else {
      
          //There's no collision on the x axis
          hit = false;
        }
      
        //`hit` will be either `true` or `false`
        return hit;
      };

    const renderMissile = () => {
        return <Missile key={idCounter} startX={player.x} startY={player.y} />;
    }

    const renderEnemy = () => {
        return <Enemy key={enemyCounter} />;
    }

    const testEnemyHit = () => {
        console.log('')
    }

    const testPlayerHit = () => {
        enemies.forEach(enemy => {
            if (hitTestRectangle(playerShip, enemy)) {
                endGame()
            }
        })
    }

    useTick(() => {
        testPlayerHit();

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
