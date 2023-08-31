export default function Answer(props) {

    return(
        
                <p className={`answer ${props.isSelected&&"selected"}`} style={props.style} onClick={props.handleClick}>{props.answer}</p>
                
            
    )
}