import React from "react"

export default function Score(props) {
    return (
        <div className="scoreboard--score">
            <p className="scoreboard--score-name">{props.name}</p>
            <p>{props.score}</p>
        </div>
    )
}