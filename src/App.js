import React from "react";
import Question from "./components/Question";
import {nanoid} from "nanoid";
import Confetti from "react-confetti"
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

function App() {
  const [state, setState] = React.useState("intro")
  const [newSet, setNewSet] = React.useState(false)
  const [questions,setQuestions] = React.useState([])
  
  const [score, setScore] = React.useState(0)
 
  


React.useEffect( 
       () => async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        const data = await res.json()
        
        console.log(data.results)
        setQuestions(data.results.map(result =>
             {
              let arr = shuffle([0,1,2,3])
              return{
            
             id:nanoid()
             ,question:renderHTML(result.question),
             answer:result.correct_answer,
             answer1:[...result.incorrect_answers,result.correct_answer][arr[0]],
             answer2:[...result.incorrect_answers,result.correct_answer][arr[1]],
             answer3:[...result.incorrect_answers,result.correct_answer][arr[2]],
             answer4:[...result.incorrect_answers,result.correct_answer][arr[3]],
             clicked:[false,false,false,false],
             answered:false,
             right:false
            }}
            ))
        

           
        
    },[newSet])

  function startNewQuiz(){
    
       setState("questions")
       setNewSet(newSet => !newSet)
    
  }

  function startQuiz() {
    setState("questions")
  }







 function check(){

  if(questions.filter(ques => ques.answered).length===5){
    setState("check")
    setScore(questions.filter(ques => ques.right).length)
    
  
  console.log("fuck you all!")
  }
   

 }

  const intro = <div className="intro">
      <h1 className="title">Quizzical</h1>
      <h3 className="descr">Test your informations </h3>
      <button className="start-btn" onClick={startQuiz}>Start quiz</button>
    </div>


  const questionsHtml = questions.map(ques =>{
     
     return (<Question
     id={ques.id}
     className="question"
     answer={ques.answer}
     answers={[ques.answer1,ques.answer2,ques.answer3,ques.answer4]}
     rightAnswers={[ques.answer1===ques.answer,ques.answer2===ques.answer,ques.answer3===ques.answer,ques.answer4===ques.answer]}
     state={state}
     key={ques.id}
     question={ques.question}
     answered={() => ques.answered=true}
     check_correct={() => ques.right=true}
     check_false={() => ques.right=false}
     
     
     
     />)})

      const questionsPage = <div className="questions">
        {questionsHtml}
        {state==="questions" &&<button className="btn" onClick={check}>check</button>}
        {state==="check" &&<div className="new_game"><p className="score">Score : {score}/5 {score>2?"شطورة يا دينا":"متعيطيش حاولى مرة كمان"}</p><button className="btn" onClick={startNewQuiz}>Start New Game</button>{score>2 && <Confetti />}</div>}
        </div>
    return (
    <div className="app">
      {state==="intro" &&intro}
      {(state==="questions"||state==="check") && questionsPage }
        
    </div>
  );
}

export default App;
