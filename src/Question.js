import React,{useState} from "react"
import { preProcessFile } from "typescript"

export default function Question (props){
  const [selected, setSelected] = useState(true)

  function changingColor (event){
    if(selected){
      setSelected(prevSelected => !prevSelected)
      event.target.className = "selectedStyle"
    }else{
      event.target.className = "answers"
      setSelected(prevSelected => !prevSelected)
    }
    return
  }

  
    

  let questionElement = props.questions.map(quest => 
         <div key={quest.id} className="questionContainer">
            <div className="questionHeader" >
              <small>Category - {quest.category}</small>
              <small>Difficulty - {quest.difficulty}</small>
            </div>
          <h5 className="question">{quest.question}</h5>
          <ul className="asnwersContainer">
            {
              quest.answers.map(answer =>{
                return <div onClick={changingColor}   key={answer.id}  >
                          <li
                            id={answer.id}
                            className="answers"
                            >{answer.incorrect_answer}
                            </li>
                        </div> 
                         
               })
            }
          </ul>
         </div>     
    
  )
  return (
      <>
        <div>{questionElement}</div>
      </>  
    )
}
