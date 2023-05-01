import React from "react"
import Score from "./Score"
import king from "../images/king.png"
import back from "../images/back.png"

export default function Scoreboard(props) {
    // public scope 'scoresElements'
    const scoresElementsPublic = []
    
    // create an array to store localStorage scores 'playerStats'
    const playerStats = JSON.parse(localStorage.getItem("scores")) || []






    // Look for any duplicate names in playerStats
    
    // loop over playerStats 
        // check a if a player name has been found more than once in the array
            // using a for loop and comparing the current iterated item 
            // with the curent mapped item to see if their names match
            // if there is a match, increment matched variable by one
                // matched variable lives 
            // if matched variable equals two then go to next stage of comparing the two and choosing the better score?

    // let matchCounter = 0

    // For each player, loop over all the players and check for a match
    // for (let eachPlayer = 0; eachPlayer < playerStats.length; eachPlayer++ ) {

    //     for (let i = 0; i < playerStats.length; i++) {
  
    //         if (playerStats[eachPlayer].name == playerStats[i].name) {
    //             matchCounter++
    
    //             playerStats[eachPlayer] = {
    //                 ...playerStats[eachPlayer],
    //                 matched: matchCounter
    //             }
    //         }
    
            
            
    //     } 

    //     // reset matchCounter for next player
    //     matchCounter = 0

    // }
    
  

    
    // set player stat to have a property called "match"
        // if match found increment it by 1
        // const match = 0;
            // if match found, match++
            //playerStat.match = match



            
    
    // checking if playerStats exists in local storage first
    
    if (playerStats.length > 0) {
        
    // create an array with just the score numbers 'scoresArray'
    const scoresArray = playerStats.map( stat => {
        return stat.seconds
    })
    
    // order scores from lowest to highest
    scoresArray.sort( (a, b) => {
        return a - b
    })
    
 
    
    // create a new array, storing sorted scoresArray
    const rankedScoresArray = scoresArray
        
     // create an empty array 'rankedPlayers'
    const rankedPlayers = []
    
    
    // Find playerStats[0].score in rankedScoresArray (map/filter over)
        // For each player stat, find the same score in the rankedScoresArray.
        // when found log it out to console.
        
    
    // create an array 
    // search playerStats score in rankedScoresArray
    // push the found index to indexOfArray
    // do this as many times as there are items in the playerStats array
    // e.g. "find 39 in rankedScoresArray and return the index of that found number"
     
     const indexOfArray = []
     for (let i = 0; i < playerStats.length; i++) {
         indexOfArray.push(
             rankedScoresArray.indexOf(
                playerStats[i].seconds)
            )
     }
    
    // place playerStats[0].score at grabbed index in rankedPlayers
        // push playerStat to an index set by indexOfArray in the rankedPlayers array
        // "push to an index of array"
        // arr.splice(index, 0, item);
        
        for (let i = 0; i < playerStats.length; i++) {
            rankedPlayers.splice(indexOfArray[i], 0, playerStats[i])
        }
        
        // Rendering ranked scores to leader board...       
                
        // have a Score component
            // have a scoresElements array which 
                // maps over rankedPlayers 
                    // returns a new score component 
                        // passing in name and score as props

            const scoresElementsLocal = rankedPlayers.map( (player, index) => {
                return <Score
                key={index}
                name={player.name}
                score={player.seconds}
                />
            })    
            
            scoresElementsPublic.push(...scoresElementsLocal)
            
            
            
                  
            // scoresElementsPublic
            
            // scoresElements = [...scoresElementsPrivate]
            
            //  this array is what will be returned from the Scoreboard component.
        // which receives props to fill in name and score
        
    
    }
    
     else {
        console.log("stats do not exist")
    }
    
  
    
    
    return (
        <div className="scoreboard--wrapper">
            <h1>Leaderboard</h1>
            <p>(seconds)</p>
            <div className="scoreboard--scores-container">
            <img src={king} className="king-icon" alt="" />
            {scoresElementsPublic}
            </div>
            
            <button className="scoreboard--return-btn" onClick={props.toggleLeaderboard} >
                <img 
                    src={back}
                />
            </button>
            
            
        </div>
    )
}