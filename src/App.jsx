import { useEffect, useState } from 'react'
import IntroPage from './components/IntroPage'
import Question from './components/Question'
import Answer from './components/Answer'


function App() {
  const [state, setState] = useState("intro")
  const [data, setData] = useState([])
  const [questions, setQuestions] = useState([])
  const [rounds, setRounds] = useState(0)
  

  useEffect(() => {
  // declare the async data fetching function
  const fetchData = async () => {
    // get the data from the api
    const response = await fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple');
    // convert the data to json
    const json = await response.json();

    // set state with the result
    setData(json.results);
  }

  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);;
}, [rounds])

useEffect( () => {
  setQuestions(data.map(quest => ({
    question: quest.question,
    correct_answer: quest.correct_answer,
    answers: shuffle([...quest.incorrect_answers, quest.correct_answer]).map(answer => ({
      value: answer,
      isSelected: false,
      isCorrect: answer == quest.correct_answer
    })),
    
  })))
},[data])

console.log(questions)

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  function shuffle(arr) {
    return arr.sort((a,b) => 0.5 - Math.random())
  }
  function selectAnswer(firstIndex,secondIndex) {
    setQuestions(oldQuestions => oldQuestions.map((quest, index) => index!== firstIndex ? quest
                                                    :{...quest,
                                                      answers: quest.answers.map((answer, index) => index!== secondIndex ? {...answer,isSelected: false}
                                                                                                                        :{...answer, isSelected: ! answer.isSelected})}))
  }

  function renderQuestion(quest) {
    const questIndex=questions.indexOf(quest)
    return( 
    <div className='question'>
      <Question 
                  question={decodeHtml(quest.question)}
                  />
      <div className='answers' >
        {quest.answers.map((answer,index) => {
        const style = answer.isCorrect ? {backgroundColor: "#94D7A2",border:"none"}
                      :answer.isSelected && ! answer.isCorrect ? {backgroundColor: "#F8BCBC",opacity: "0.5"}:{opacity: "0.5"}
        
       
        
                      return <Answer 
                                          answer={decodeHtml(answer.value)}
                                          isSelected={answer.isSelected}
                                          style={state=="checkAnswers"?style:{}}
                                          isCorrect={answer.isCorrect}
                                          handleClick={() =>selectAnswer(questIndex,index)}
                                          
                                          
                                          />})}
      </div>
    </div>)
  }

  function start(){
    
    setState("questions")
    
  }

  function playNewGame() {
    setRounds(oldRounds => oldRounds +1)
    start()
  }

  function check(){
    document.body.classList.add("check")
    setState("checkAnswers")
  }

   function calculateCorrectAnswers() {
          return questions.filter(quest => quest.answers.filter(answer => answer.isCorrect&&answer.isSelected).length>0).length
        }


  return (
    
    <>
      {state=="intro"? <IntroPage
                           handleClick={start}/> 
          : <div className='questions--page'>
            {questions.map(quest => renderQuestion(quest))}
            {state=="questions" && <button className='check-btn' onClick={check}>Check answers</button>}
            {state=="checkAnswers" && <div className='footer'><h2 className='score'>You scored {calculateCorrectAnswers()}/5 correct answers </h2><button className='play-btn' onClick={playNewGame}>play again</button></div>}
            </div>
            
          }
      
    </>
  )
}

export default App
