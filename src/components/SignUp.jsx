import React from "react"
import LeaderboardButton from "./LeaderboardButton"


export default function SignUp(props) {
    return (
        <div className="form-wrapper">
            <form className="form">
                <h1 className="form-h1">Sign Up</h1>
                <label htmlFor="name">Name:</label>
                <input 
                    id="name" 
                    className="form-input"
                    name="name"            
                    onChange={() => {props.updateSignUpInputs(event, props.setterFn)}}
                    value={props.nameValue}
                    placeholder="enter name" 
                    
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    id="password"
                    className="form-input"
                    type="password"
                    name="password"
                    onChange={() => {props.updateSignUpInputs(event, props.setterFn)}}
                    value={props.passwordValue}
                    placeholder="enter password"
                    
                    
                />
                
                <label htmlFor="password-confirm">Confirm Password:</label>
                
                <input 
                    id="password-confirm"
                    className="form-input"
                    type="password"
                    name="passwordConfirm"
                    onChange={() => {props.updateSignUpInputs(event, props.setterFn)}}
                    value={props.passwordConfirmValue}
                    placeholder="confirm password"
                />
                
                <p className="form-p">
                    Already have an account?
                    &nbsp;
                    <span onClick={props.switchFormScreen}>
                        <a>Sign In</a>
                    </span>
                </p>
                
                <p className="error-p"></p>

                <button className="form-submit" onClick={props.signUpSubmit}>Sign Up</button>
                
                <div className="leaderboardButton-container">
                    <LeaderboardButton handleClick={props.toggleLeaderboard} />              
                </div>
                
                
            </form>
        </div>
    )
}