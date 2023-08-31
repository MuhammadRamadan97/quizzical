export default function IntroPage(props) {
    return(
        <div className="intro--page">
            <h1 className="intro--title">Quizzical</h1>
            <h3 className="intro--subtitle">test your general informations</h3>
            <button className="start-btn" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}