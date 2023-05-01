import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { useStopwatch } from "react-timer-hook";
import Name from "./components/Name"
import userDetails from "./userDetails"
import SignUp from "./components/SignUp"
import Scoreboard from "./components/Scoreboard"
import LeaderboardButton from "./components/LeaderboardButton"
import { renderErrorMsg } from "./utils"


import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database"

import useWindowSize from 'react-use/lib/useWindowSize'



// Feature - Scoreboard to show player with the fastest win.

// Start off by saving score entries to localStorage
// to an array which can be used as the data in the scoreboard page.

    

export default function App() {
    const { width, height } = useWindowSize()







// Firebase start

    const firebaseConfig = {

        apiKey: "AIzaSyC4yHPa66Giif5nvtebZN_8ghZApYvFYMc",
      
        authDomain: "tenzies-dcaf9.firebaseapp.com",
      
        databaseURL: "https://tenzies-dcaf9-default-rtdb.europe-west1.firebasedatabase.app",
      
        projectId: "tenzies-dcaf9",
      
        storageBucket: "tenzies-dcaf9.appspot.com",
      
        messagingSenderId: "1005073406504",
      
        appId: "1:1005073406504:web:2de69302005e442a3f331d"
      
      };
      
      
      // Initialize Firebase
      
      const app = initializeApp(firebaseConfig);
      
      // 
      // 
      // 
      
      
      const data = ["name", "age"]
      
      
      // writing to firebase
      const database = getDatabase(app);
      

    
      
    //   get(ref(database, "dummy"))
    //   .then( snapshot => {
    //     console.log(snapshot.val())
    //   })
      



// Firebase end


   
    
    // Feature - Scoreboard to show player with the fastest win.
    
    const [showLeaderboard, setShowLeaderboard] = React.useState(false)
    

    // Downloading the array and displaying it.
    // Not filtering it etc. That filtering and match-checking is done when uploading

    function toggleLeaderboard() {
        console.log("clicked")

        get(ref(database, "scores"))
        .then( snapshot => {

            let data = snapshot.val()
            if (data) {
                setScores(data)
            } 
                else {
                    setScores([])
                }

            setShowLeaderboard( prevState => !prevState)

            
        })

        
    }
    

     
        // initialise a state variable's value to LS or an empty array (if LS doesnt exist)
        // const [scores, setScores] = React.useState( JSON.parse(localStorage.getItem("scores")) || [])

        const [scores, setScores] = React.useState([]) 
        console.log(scores)



        // create  uploadScores variable and set it to false.
        const [uploadScores, setUploadScores] = React.useState(false)

        const [shouldUpdateScores, setShouldUpdateScores] = React.useState(false)

       

        if (uploadScores) {
            set(ref(database, 'scores'), scores); 
            setUploadScores(false)
        }

        // if uploadScores = true
            // then uploadScores
            // set uploadScores to false

        // When setScores is done, set uploadScores to true
            // then, on component refresh, scores will upload with updated scores.



        // Initial update of scores using latest data from firebase db
        
        React.useEffect( () => {

            console.log("executing react useEffect")
                let data = []
                get(ref(database, "scores"))
                .then( snapshot => {
                data = snapshot.val()
                
                if (data){
                    setScores(data)
                }
                })

        }, [])



            


        // React.useEffect( () => {

    //  set(ref(database, 'scores'), [""]);   

        // }, [scores])

        // set(ref(database, 'scores'), [{name: "dummy", seconds: 0}]); 
        // set(ref(database, 'scores'), [""]); 
        

        const [showNameComponent, setShowNameComponent] = React.useState(false)
        const [showSignUpComponent, setShowSignUpComponent] = React.useState(false)
        
        const [userDetailsFound, setUserDetailsFound] = React.useState(() => {
            return JSON.parse(localStorage.getItem("loggedInUser"))
            })
            
            
            // parse userName to be displayed in gamescreen
           const user = JSON.parse(localStorage.getItem("loggedInUser")) || "Name"
           
           
           
        function displayGameScreen() {
            setUserDetailsFound(true)
            setShowSignUpComponent(false)
        }
    

        function downloadLatestScores() {
            
            let data = []
                get(ref(database, "scores"))
                .then( snapshot => {
                data = snapshot.val()
                
                if (data){
                    setScores(data)
                    setShouldUpdateScores(true)
                } else {
                    setShouldUpdateScores(true)
                }
                })


        }

        
        // If user details are not found, then display SignIn Component
        
        React.useEffect( () => {
         if (!userDetailsFound) {
            setShowNameComponent(true) 
         }  
        
        }, [])
            
        const [signInInputs, setSignInInputs] = React.useState({
            name: "",
            password: ""
        })
        
        const [signUpDetails, setSignUpDetails] = React.useState({
            name: "",
            password: "",
            passwordConfirm: ""
        })
        
        const userDetails = {
            name: "Yusuf", 
            password: "1234"
        }
        

        function signOut() {
        
            localStorage.removeItem("loggedInUser")
            
            // delete input values in form
            setSignInInputs({
                name: "",
                password: ""
            })

            setSignUpDetails({
                name: "",
                password: "",
                passwordConfirm: ""
            })

            console.log(signInInputs)


            // display sign in screen
            setUserDetailsFound(false)
            
            // reset game
            resetGame()
            
            
        }
        
         
         
        // Switches between displaying SignIn and SignUp components.
        function switchFormScreen() {
            setShowNameComponent(prevState => !prevState)
            setShowSignUpComponent(prevState => !prevState)
        }
        
        function signUpSubmit(event) {
            event.preventDefault()
            
            // check to see if name valid
            // then check to see if passwords match
            // and if passwords are greater than 2 letters
            
            const name = signUpDetails.name

            const passwordsMatch = signUpDetails.password == signUpDetails.passwordConfirm ?
            true :
            false
            
            const passwordLongEnough = signUpDetails.password.length > 2 ?
            true :
            false

            if (name.length > 1) {
                if(passwordsMatch) {
                    if (passwordLongEnough) {
                        
                        console.log("Account created! 🎉")
                    // then push to localStorage
                        localStorage.setItem("loggedInUser", JSON.stringify({
                            name: signUpDetails.name,
                            password: signUpDetails.password 
                        }))
                        
                        
                    // then add this user to "accounts" item in localStorage
                    const newAccount = {
                        name: signUpDetails.name,
                        password: signUpDetails.password  
                    }
                    
                        // if localstorage "accounts" exists, then add in its prev values, 
                        // otherwise create "accounts" from scratch
                    
                    if (localStorage.getItem("accounts")) {
                        console.log("'accounts' found!")
                        const parsedLocalStorage = JSON.parse(localStorage.getItem("accounts"))
                        const newAccounts = [
                        ...parsedLocalStorage,
                        newAccount
                        ]
                                                
                        localStorage.setItem("accounts", JSON.stringify(newAccounts))
                        
                    
                    } else {
                        console.log("'accounts' not found, creating 'accounts'...")
                        localStorage.setItem("accounts", JSON.stringify(
                            [
                                newAccount
                            ]
                        ))
                    }
                    
                    // Displaying game screen
                    displayGameScreen()
                    
                        
                        
                        
                    } else {
                        console.log("error: password is not long enough")
                        renderErrorMsg("Error: password is not long enough")
                    }
                } else {
                    console.log("error: passwords do not match")
                    renderErrorMsg("Error: passwords do not match")
                }
                
            } else {
                console.log("error: name is not long enough")
                renderErrorMsg("Error: name is not long enough")
            }
        
        }
        
        
        const [name, setName] = React.useState("")
        
        function updateInputs(event, setterFn) {
            const { name, value } = event.target
            setterFn( prevValues => {
                return {
                    ...prevValues,
                    [name]: value
                }
            })
        }
        
    
        
        function updateNameState(event) {
            const { value } = event.target
            setName(value)
        }
        
        function toggleNameComponentOff(e) {
            e.preventDefault()
            
            // Checking to see if entered name is valid
                // name.length > 1 ? setShowNameComponent(false)
                // : console.log("Error: name is not long enough")
            
            
            // Checking to see if details match userDetails
                const accounts = JSON.parse(localStorage.getItem("accounts")) || []
                
                const matchingAccount = accounts.filter( account => {
                    return account.name == signInInputs.name
                })
            
                if (matchingAccount.length > 0) {
                    
                    
                    // does signInInputs.password match password on record?
                    if (signInInputs.password == matchingAccount[0].password) {
                        console.log("passwords match!")
                        
                        
                        // set loggedInUser in LS
                    localStorage.setItem("loggedInUser", JSON.stringify({
                            name: signInInputs.name,
                            password: signInInputs.password 
                        }))
                    
                    // Display game screen
                    displayGameScreen()
                    
                    
                    } else {
                        console.log("error: passwords do not match!")
                        renderErrorMsg("Error: passwords do not match!")
                    }
                    
                    
                    
                    
                } else {
                    console.log("name not found")
                    renderErrorMsg("Error: name not found")
                }
       
            
        }
        

        
        // Syncing local storage with latest version of scores array
	    localStorage.setItem("scores", JSON.stringify(scores))        
        
     //  push score at end of game to an array 
     // set that array as an item in localStorage
        // at end of game, push latest score to end of array 
            // setScore( prevScore => {
            //     return [...prevScore, {seconds}]
            // }) 
            // console log this array at the start and end of game to test if array was updated correctly. Array should be empty at start of game, and have one entry at end of game.
            
        // and set the array in LS
        
     // check if item is being pushed to LS by logging LS out after each game win.
    
    
    
    
     const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

    

   if (shouldUpdateScores) {
            setShouldUpdateScores(false)
            updateScores()
        }

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [firstRoll, setFirstRoll] = React.useState(true)



           




    
    function startTimer() {
         // Start timer
            if(firstRoll) {
                console.log(scores)
                start()
                setFirstRoll(false)
                console.log("Timer started")
            } 
    }
    
    
    function updateScores() {
        //  setScores( prevScores => [...prevScores, {name: user.name, seconds}] )

         // Only look for a name match is scores array is greater than 1 

        let foundNameMatchArray = []


         if (scores.length > 0) {
         foundNameMatchArray = scores.filter( score => {
            return user.name == score.name
        }) 
           
    }
    else {
        console.log("scores.length is not greater than 1")
    }
        // console.log("foundNameMatchArray:")
        // console.log(foundNameMatchArray)

        if (minutes == 0) {
            if ( foundNameMatchArray.length > 0) {
                
                // grab a hold of the seconds and store that in an array
    
                const foundNameMatchSecondsArray = foundNameMatchArray.map( score => {
                    return score.seconds
                })
    
                // Is current seconds Lower than the seconds found?
                
                // if they were lower
                    // then update scores array with current seconds 
                if (seconds < foundNameMatchSecondsArray[0]) {
                    // get the index of user.name object
                    
                    // const index = scores.indexOf(user.name)
                    const index = scores.map(score => score.name).indexOf(user.name)
    
                    
    
                    setScores( prevState => {
                        
    
                        return [
                            ...prevState,
                            prevState[index].seconds = seconds 
                        ]
    
                    })
                }
    
    
            }
    
            // "There is no existing matching name in the array, so 
            // just push the score as a completely new entry"
            else {

                console.log("Name match not found")
                setScores( prevState => {
                    console.log("updating scores via the else statement")

                    return [
                        ...prevState,
                        {name: user.name, seconds}
                    ]
                })
            }
        }

        
        setUploadScores(true);
        

        // just push the object (to Scoreboard scores array) whose score is the highest out of all of them :)
            

            // console.log("foundNameMatchSecondsArray:")
            // console.log(foundNameMatchSecondsArray)

            // // find the lowest number in the array (best score)

            // const lowestSeconds = Math.min(...foundNameMatchSecondsArray)

            // console.log("lowestSeconds")
            // console.log(lowestSeconds)

            // // find that number in the foundNameArray and 

            //     const foundNameArrayBestScore = foundNameMatchArray.filter( score => {
            //         return score.seconds == lowestSeconds
            //     })

            //     console.log(foundNameArrayBestScore)

            //     // I simply update the scores array with my better score
            //         setScores( prevState => {
            //             return {
            //                 ...prevState, 
            //                 [user.name]: lowestSeconds  
            //             }
            //         })

    }
    

    // React.useEffect( () => {
    //                   // check if name already exists on scorebaord
    //             // filter through the scores array and only return the objects that have a name matching logged in player
                    
    //                 // Im going to have at least one match (the game just played)

                            
    
    //                     // else 
    //                         // grab the .seconds property in this filtered array and compare it with seconds variable (score of game just played)
    //                             // if seconds variable is less than (better than) .seconds property value, then update this name's score in the scores array
    // }, [scores])



    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log(`Your time in seconds: ${seconds}`)
            pause()
            
            
            // update score array
            downloadLatestScores()


  


            
            
            
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function bounce(div){
        div.classList.add("bounce");
        setTimeout(function() {
          div.classList.remove("bounce");
        }, 50);
      };    
    
    function rollDice() {
        if(!tenzies) {
            // Bounce effect
               
                 /// map over each die,
                   // if isHeld is true, call the function bounce to that die.
           
                   dice.map( (die, index) => {
                       if (!die.isHeld) {
                           bounce(document.getElementsByClassName("die-face")[index])
                           console.log("Shud work")
                       }
                        else {
                            console.log("ERRRRRR")
                        }
                   })
               
               // Closing Bounce effect

            setTimeout( () => {

                setDice(oldDice => oldDice.map(die => {
                    return die.isHeld ? 
                        die :
                        generateNewDie()
                }))
                
            }, 50)      


            
        } else {
            resetGame()
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    function resetGame() {
        setTenzies(false)
        setDice(allNewDice())
        
        // resetting timer
        setFirstRoll(true)
        reset({}, false)
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => { 
                holdDice(die.id)
                startTimer()
                }}
        />
    ))
    
    return (
        <div>
            {tenzies && <Confetti/>}
            {showLeaderboard ? 
                <Scoreboard 
                    toggleLeaderboard={toggleLeaderboard}
                    scores={scores}
                />
                :               
                !userDetailsFound && showSignUpComponent == false ?
                <Name 
                    handleClick={toggleNameComponentOff}
                    updateSignInInputs={updateInputs}
                    setterFn={setSignInInputs}
                    value={signInInputs.name}
                    passwordValue={signInInputs.password}
                    switchFormScreen={switchFormScreen}
                    toggleLeaderboard={toggleLeaderboard}
                    />
                    
                    :
                    
                    showSignUpComponent ? 
                    <SignUp 
                        switchFormScreen={switchFormScreen}
                        updateSignUpInputs={updateInputs}
                        setterFn={setSignUpDetails}
                        nameValue={signUpDetails.name}    
                        passwordValue={signUpDetails.password} 
                        passwordConfirmValue={signUpDetails.passwordConfirm}
                        signUpSubmit={signUpSubmit}     
                        toggleLeaderboard={toggleLeaderboard}      
                    />
                    
                    :
                <main>
                    <h1 className="title">Tenzies</h1>
                    <p className="main--greeting">
                        Welcome,
                        &nbsp;
                        <span className="main--username">{user.name}</span>
                        <span className="main--signout-btn" onClick={signOut}>Sign Out</span>
                    </p>
                    
                    <p className="instructions">Roll until all dice are the same.<br/> 
                    Click each die to freeze it at its current value between rolls.</p>

                    <h3 className="main--timer">Your time: <span className={isRunning ? "main--seconds" : ""}>{minutes}m {seconds}s</span></h3>

                    <div className="dice-container">
                        {diceElements}
                    </div>
                    <button 
                        className="roll-dice" 
                        onClick={() => {
                            rollDice()
                            startTimer()
                        }}
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>            

                    <div className="leaderboardButton-container">
                        <LeaderboardButton gameScreen={true} handleClick={toggleLeaderboard} /> 
                    </div>       
                
                </main>
                }
        </div>
    )
}