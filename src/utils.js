import React from "react"

function renderErrorMsg(errorMsg) {
    
    document.getElementsByClassName("error-p")[0].textContent = errorMsg
    
    // set a p element's display to block 
    document.getElementsByClassName("error-p")[0].style.display = "block";

    // 
    document.getElementsByClassName("error-p")[0].style.color = "red";
    document.getElementsByClassName("error-p")[0].style.marginTop = "0px";
    document.getElementsByClassName("error-p")[0].style.marginBottom = "10px";
    document.getElementsByClassName("error-p")[0].style.alignSelf = "center";



}

export {renderErrorMsg}