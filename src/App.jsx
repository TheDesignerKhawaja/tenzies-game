import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti-boom"
import Die from "./Die"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rollsCount, setRollsCount] = useState(0)
    const rollBtn = useRef(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            rollBtn.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }


    function rollDice() {
        if (gameWon) {
            setDice(generateAllNewDice())
            setRollsCount(0)
        } else {
            setDice(prevDice => prevDice.map(die =>
                die.isHeld ? die : {
                    ...die,
                    value: Math.ceil(Math.random() * 6)
                }
            ))
            setRollsCount(prev => prev + 1)
        }
    }

    function holdDie(id) {
        setDice(prevDice => prevDice.map(die =>
            die.id === id ? { ...die, isHeld: !die.isHeld } : die
        ))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdFunction={holdDie}
        />
    ))

    return (
        <main>
            {gameWon &&
                <>
                    <Confetti mode="boom" />
                    <Confetti mode="fall" />
                </>
            }
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to play again.</p>}
            </div>

            <h1>Tenzies</h1>
            <p>Roll until all dice are same. Click each dice to freeze it at its current value between rolls.</p>

            <div className="dice-container">
                {diceElements}
            </div>

            <div className="footer">
                <button ref={rollBtn} className="roll-button" onClick={rollDice} aria-description={gameWon ? "Start new game" : "Roll dice"}>
                    {gameWon ? "New Game" : "Roll"}
                </button>

                <p className="rolls-counter">🎲 {rollsCount}</p>
            </div>
        </main>
    )
}