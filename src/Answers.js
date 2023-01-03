import React from "react"

export default function Answers (props){
 
    console.log(props.answers)    

  return (
    <ul className="asnwersContainer"> 
         <li 
            id={props.id}  
            className= {!props.isSelected ?  "answers" : "selectedStyle"}
        >
        {props.incorrect_answer}
        </li> 
    </ul>  
    )
}

// <ul className="asnwersContainer">
// {
//   quest.answers.map(answer =>{
//     return <li 
//               id={answer.id}
//               key={answer.id}  
//               onClick={selectedAnswers}
//               className= {!answer.isSelected ?  "answers" : "selectedStyle"}
//               >{answer.incorrect_answer}</li>
//    })
// }
// </ul>