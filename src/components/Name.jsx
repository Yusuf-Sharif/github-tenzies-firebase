import React from "react"
import LeaderboardButton from "./LeaderboardButton"
import { renderErrorMsg } from "../utils"
 

export default function Name(props) {
    return (
        <div className="form-wrapper">
            <form className="form"> 
            
                <h1 className="form-h1">Sign In</h1>
                
                <label htmlFor="name">Name:</label>
                <input 
                    id="name" 
                    className="form-input"
                    name="name"
                    onChange={() => {props.updateSignInInputs(event, props.setterFn)}} 
                    value={props.value}
                    placeholder="enter name" 
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    id="password"
                    className="form-input"
                    type="password"
                    name="password"
                    onChange={() => {props.updateSignInInputs(event, props.setterFn)}}
                    value={props.passwordValue}
                    />
                
                <p className="form-p">
                    Don't have an account?
                    &nbsp;
                    <span onClick={props.switchFormScreen}>
                        <a>Sign Up</a>
                    </span>
                </p>

                <p className="error-p"></p>

                <button className="form-submit" onClick={props.handleClick}>Play</button>
                
                <div className="leaderboardButton-container">
                    <LeaderboardButton handleClick={props.toggleLeaderboard} />                
                </div>
                
            </form>
        </div>
    )
}