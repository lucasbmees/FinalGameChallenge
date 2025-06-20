import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from '../components/Button';
import './FishingScene.css';

const FISH_IMAGE_URL = 'peixe.png';
const GAME_DURATION = 30;
const FISH_COUNT = 4;

const createFish = (id, gameArea) => {
    const swimAreaTop = gameArea.height * 0.7; 
    const swimAreaHeight = gameArea.height * 0.3; 
    const fishHeight = 60;
    const amplitude = Math.random() * 8 + 4; 

    return {
        id,
        x: Math.random() * (gameArea.width - 100),
        baseY: swimAreaTop + Math.random() * (swimAreaHeight - fishHeight - amplitude * 2),
        speed: Math.random() * 1 + 0.5,
        direction: Math.random() > 0.5 ? 1 : -1,
        amplitude: amplitude,
        frequency: Math.random() * 0.02 + 0.01,
        verticalOffset: Math.random() * 1000,
        width: 80,
        height: fishHeight,
    };
};

const FishingScene = ({ changeScene }) => {
    const [fishes, setFishes] = useState([]);
    const [hookPosition, setHookPosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [gameOver, setGameOver] = useState(false);
    const gameAreaRef = useRef(null);
    const canCatchRef = useRef(true);
    const animationFrameId = useRef(null);

    useEffect(() => {
        if (gameAreaRef.current) {
            const area = gameAreaRef.current.getBoundingClientRect();
            const initialFishes = Array.from({ length: FISH_COUNT }, (_, i) => createFish(i, area));
            setFishes(initialFishes);
        }
    }, []);

    useEffect(() => {
        const gameLoop = (timestamp) => {
            if (gameAreaRef.current && !gameOver) {
                const area = gameAreaRef.current.getBoundingClientRect();
                setFishes(currentFishes =>
                    currentFishes.map(fish => {
                        // Movimento horizontal
                        let newX = fish.x + fish.speed * fish.direction;
                        let newDirection = fish.direction;

                        if (newX < 0 || newX > area.width - fish.width) {
                            newDirection *= -1;
                            newX = fish.x + fish.speed * newDirection;
                        }

                        const newY = fish.baseY + (Math.sin(timestamp * fish.frequency + fish.verticalOffset) * fish.amplitude);

                        return { ...fish, x: newX, y: newY, direction: newDirection };
                    })
                );
                animationFrameId.current = requestAnimationFrame(gameLoop);
            }
        };

        animationFrameId.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameOver]);


    useEffect(() => {
        if (gameOver) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [gameOver]);


    useEffect(() => {
        if (gameOver) {
            const currentFishStash = JSON.parse(localStorage.getItem('fishStash')) || 0;
            localStorage.setItem('fishStash', JSON.stringify(currentFishStash + score));
        }
    }, [gameOver, score]);


    const handleMouseMove = (e) => {
        if (gameOver || !gameAreaRef.current) return;
        const area = gameAreaRef.current.getBoundingClientRect();
        setHookPosition({ x: e.clientX - area.left, y: e.clientY - area.top });
    };


    const checkCatch = useCallback(() => {
        if (gameOver || !canCatchRef.current) return;

        const hookRect = { x: hookPosition.x, y: hookPosition.y, width: 40, height: 40 };

        let fishCaught = null;
        for (const fish of fishes) {
            if (
                hookRect.x < fish.x + fish.width &&
                hookRect.x + hookRect.width > fish.x &&
                hookRect.y < fish.y + fish.height &&
                hookRect.y + hookRect.height > fish.y
            ) {
                fishCaught = fish;
                break;
            }
        }
        
        if (fishCaught) {
            setScore(s => s + 1);
            canCatchRef.current = false;

            setFishes(prevFishes => prevFishes.filter(f => f.id !== fishCaught.id));
            
            setTimeout(() => {
                if (gameAreaRef.current) {
                    const area = gameAreaRef.current.getBoundingClientRect();
                    setFishes(prev => [...prev, createFish(fishCaught.id, area)]);
                }
                canCatchRef.current = true;
            }, 700);
        }
    }, [hookPosition, gameOver, fishes]);

    useEffect(() => {
        checkCatch();
    }, [hookPosition, checkCatch]);


    const restartGame = () => {
        if (!gameAreaRef.current) return;
        const area = gameAreaRef.current.getBoundingClientRect();
        setFishes(Array.from({ length: FISH_COUNT }, (_, i) => createFish(i, area)));
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setGameOver(false);
        canCatchRef.current = true;
    };


    return (
        <div className="fishing-scene-container" ref={gameAreaRef} onMouseMove={handleMouseMove}>
            {gameOver && (
                <div className="fishing-game-over-modal">
                    <h1>FIM DE JOGO!</h1>
                    <p>Você pescou {score} peixe(s)!</p>
                    <p>Eles foram adicionados ao seu inventário.</p>
                    <div className="fishing-modal-buttons">
                        <Button onClick={restartGame}>JOGAR NOVAMENTE</Button>
                        <Button onClick={() => changeScene('gameMenu')}>VOLTAR AO MENU</Button>
                    </div>
                </div>
            )}

            <div className="fishing-ui">
                <div className="ui-box">TEMPO: {timeLeft}s</div>
                <div className="ui-box">PEIXES: {score}</div>
            </div>
            <div className="fishing-instructions">Mova o mouse sobre os peixes para pescar!</div>
            
            <div className="fishing-line" style={{ left: `${hookPosition.x}px`, top: '0px', height: `${hookPosition.y}px` }}></div>
            <div className="hook" style={{ left: `${hookPosition.x - 20}px`, top: `${hookPosition.y - 20}px` }}></div>

            {fishes.map(fish => (
                <img
                    key={fish.id}
                    src={FISH_IMAGE_URL}
                    className="fish"
                    alt="Peixe"
                    style={{
                        transform: `translate(${fish.x}px, ${fish.y}px) scaleX(${fish.direction})`,
                    }}
                />
            ))}
        </div>
    );
};

export default FishingScene;