import React, {useRef, useState, useEffect} from "react";




export default function FormStart (props){
    const [formData, setFormData] = useState(
        {
            questNumber: 5,
            catagoryNumber: "",
            questDifficulty: "",
            questType: ""
        }
    )

    function handleChange(event) {
        const {name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

    }    
    function decodeHtmlCharCodes(str) { 
        return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
          return String.fromCharCode(charCode);
        });
      }
      

    function saveConfig (){
        let questionsArray = []
        let answersArray = []
        fetch(`https://opentdb.com/api.php?amount=${formData.questNumber}&category=${formData.catagoryNumber}&difficulty=${formData.questDifficulty}&type=${formData.questType}`)
                .then(res => res.json())
                .then(data => {
                    data.results.map((quest)=>{
                        quest.incorrect_answers.push(quest.correct_answer)
                        let answer = quest.incorrect_answers.map((incorrect_answer)=>{
                           return {id: crypto.randomUUID(), incorrect_answer: incorrect_answer,  isSelected: false}
                        })
                       let answerArr = answer.sort().reverse()
                       let obj = {
                            id: crypto.randomUUID(),
                            category: quest.category,
                            difficulty: quest.difficulty,
                            question: decodeHtmlCharCodes(quest.question),
                            answers: answerArr,
                            correct_answer: quest.correct_answer,
                       }
                       questionsArray.push(obj)
                       answersArray.push(answerArr)
                    })
                })
                props.setQuestions(questionsArray)
                props.setAnswers(answersArray)

    }
    useEffect(saveConfig, [formData])
    
   
//data.results     
    return(

        <div className="container">
            <h1 className="gameTitle">Quizzical</h1>
            <p className="gameDescription">Awnser all question right to win!!</p>
            <form className="formContainer">
                <label className="formLabel" >Choose The Number of Questions:
                    <input
                        className="formInput"
                        type="number"
                        min={5}
                        max={50}
                        value={formData.questNumber}
                        onChange={handleChange}
                        name="questNumber"
                    >
                    </input>
                </label>
                <label className="formLabel">Select Category:
                    <select
                        className="formInput"
                        value={formData.catagoryNumber}
                        onChange={handleChange}
                        name="catagoryNumber"
                    >
                        <option value="any">Any Knowledge </option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">Politics</option>
                        <option value="24">Art</option>
                        <option value="25">Celebrities</option>
                        <option value="26">Animals</option>
                        <option value="27">Vehicles</option>
                        <option value="28">Entertainment: Comics</option>
                        <option value="29">Science: Gadgets</option>
                        <option value="30">Entertainment: Japanese Anime & Manga</option>
                        <option value="31">Entertainment: Cartoon & Animations</option>
                    </select>
                </label>
                <label className="formLabel">Select Difficulty:
                    <select
                        className="formInput"
                        value={formData.questDifficulty}
                        onChange={handleChange}
                        name="questDifficulty"
                    >
                        <option value="any">Any Difficulty </option>
                        <option value="easy">Easy</option> 
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label className="formLabel">Select Type:
                    <select
                        className="formInput"
                        value={formData.questType}
                        onChange={handleChange}
                        name="questType"
                    >
                        <option value="any">Any Type </option>
                        <option value="multiple">Multiple Choices</option>
                        <option value="boolean">True and False</option>
                    </select>
                </label>
            </form>
            <button className="beingButton" onClick={() => props.setShowQuestions(true)}>Begin Quiz</button>
        </div> 
    )
}