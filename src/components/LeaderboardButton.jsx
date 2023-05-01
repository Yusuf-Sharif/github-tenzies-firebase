import React from "react"
import winner from "../images/winner.png"


export default function LeaderboardButton(props) {
    const styles = {
        // backgroundColor: props.gameScreen ? "#fff" : "#fff",
        border: props.gameScreen ? "1px solid #FAF9F6" : "none",
        boxShadow: props.gameScreen ? "0 0 10px 4px #5035FF" : "",
        marginLeft: props.gameScreen ? "30px" : "",
        marginTop: props.gameScreen ? "20px" : "",
        marginBottom: "0px",
        width: props.gameScreen ? "70px" : "70px"
    }
    
    return (
        <div  onClick={props.handleClick}>
            <img  style={styles} className="leaderboardButton--icon" src={winner} />
        </div>
    )
}