import React, {useState} from "react"
import Question from "./Question"
import FormStart from "./FormStart"



export default function App(){
    const [showQuestions, setShowQuestions] = useState(false)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [checkAnswers, setcheckAnswers] = useState(false)

    function showAnswers () {
        setcheckAnswers(prevValue => !prevValue)
        alert("Thanks for playing, refresh for more questions")
    }
 
    let answerStyle = {
      display: "flex",
      flexDirection: "column"
    }
    let newAnswers = questions.map(quest => 
          <ul key={quest.id} className={!checkAnswers ? "correctAsnwersContainer" : answerStyle}>
            <li className="answers">{quest.correct_answer}</li>
          </ul>)


    return (
        <main>
          { 
            !showQuestions  
            ?
            <FormStart  
              setShowQuestions={setShowQuestions} 
              setQuestions={setQuestions}
              setAnswers={setAnswers}
              />      
          :
          <div className="questionContainer">
            <Question 
              questions={questions}
              setQuestions={setQuestions}
              answers={answers}
            />
            <button className="checkButton" onClick={showAnswers}>Check Answers</button> 
            <>
               <div>{newAnswers}</div>
            </>  
          </div>
          }
        </main>
    )
}

