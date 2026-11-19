function Bouton(props) {
    console.log("props", props)
// function Bouton({handleClick, label, children}) {
    // console.log("PROPS", props.handleClick);
  // ici il peut y avoir du code
  return (
    <div>
      <button onClick={props.handleClick} >{props.label}</button>
      {props.children}
    </div>
  );
}

export default Bouton;


// Bouton(handleClick)