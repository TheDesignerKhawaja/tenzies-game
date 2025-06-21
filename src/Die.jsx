export default function Die(props) {
    return (
        <button
            className="die-btn"
            style={{ background: props.isHeld ? "#FCF259" : "#FFF" }}
            onClick={() => props.holdFunction(props.id)}
            aria-description={`Die value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
        >
        {props.value}
        </button>
    )
}