import React from "react"
const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

export default function Question(props) {
    
    const [clicked ,setClicked] = React.useState([false,false,false,false])
    
    const clickStyle = {backgroundColor:"#D6DBF5",border:"none"}
    const rightStyle ={ backgroundColor:"#94D7A2",border:"none"}
    const wrongStyle ={ backgroundColor:"#F8BCBC",border:"none"}
    const state = props.state
  
    
    return(
        <div >
            <h2 className="quest">{props.question}</h2>
            <div className="answers">
                <p 
                className="answer"   
                style={state==="questions"&&clicked[0]?clickStyle:state==="check"&&props.rightAnswers[0]?rightStyle:state==="check"&&clicked[0]?wrongStyle:{}} 
                onClick={() => {setClicked([true,false,false,false])
                                props.answered()
                                props.answers[0]===props.answer?props.check_correct():props.check_false()}}>
                    {renderHTML(props.answers[0])}
                </p>

                <p 
                className="answer"  
                style={state==="questions"&&clicked[1]?clickStyle:state==="check"&&props.rightAnswers[1]?rightStyle:state==="check"&&clicked[1]?wrongStyle:{}}  
                onClick={() => {setClicked([false,true,false,false])
                                props.answered()
                                props.answers[1]===props.answer?props.check_correct():props.check_false()}}>
                    {renderHTML(props.answers[1])}
                </p>

                <p className="answer"  
                style={state==="questions"&&clicked[2]?clickStyle:state==="check"&&props.rightAnswers[2]?rightStyle:state==="check"&&clicked[2]?wrongStyle:{}}  
                onClick={() => {setClicked([false,false,true,false])
                                props.answered()
                                props.answers[2]===props.answer?props.check_correct():props.check_false()}}>
                    {renderHTML(props.answers[2])}
                </p>

                <p className="answer"  
                style={state==="questions"&&clicked[3]?clickStyle:state==="check"&&props.rightAnswers[3]?rightStyle:state==="check"&&clicked[3]?wrongStyle:{}}  
                onClick={() => {setClicked([false,false,false,true])
                                props.answered()
                                props.answers[3]===props.answer?props.check_correct():props.check_false()}}>
                    {renderHTML(props.answers[3])}
                </p>

            </div>
            <div className="line"></div>
        </div>
    )
}