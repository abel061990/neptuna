import React from "react";
import ReactDOM from "react-dom";

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        classe:"",
        type:"",
        value: null,
        placeholder:"",
        style:{}
    }   ;
  }
  render() {
    return (
      <input className={this.props.classe} type={this.props.type} placeholder={this.props.placeholder}/>
    );
  }
}
ReactDOM.render(<Input classe="input" type="text" placeholder="Nom utilisateur"/>,document.getElementById("username"));
export default Input