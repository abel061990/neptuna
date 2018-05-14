import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
//import {csrftoken} from '../djangotoken';
import DjangoCSRFToken from './djangocrsftoken';
//axios.defaults.headers.common['X-CSRF-Token'] = {csrftoken};
import querystring from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



const btnstyl={width:"100%",borderRadius:"0px",backgroundColor:"#669999",
            color:"#fff",border:"1px solid #669999",
            fontFamily:"Source Sans Pro"};

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        /*value:"",*/
        type:"",
        placeholder:"",
        classe:""

    }   ;
    //this.handleChange = this.handleChange.bind(this);
  }
  /*handleChange(e){
        this.setState({value:e.target.value});
        }*/
  render() {
    return (
    <div className="field">
      <input id={this.props.id} value={this.props.value} onChange={this.props.onChange} className={this.props.classe} type={this.props.type} placeholder={this.props.placeholder}/>
    </div>
    );
  }
}


class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        classe:"",
        type:"",
        value: null,
        placeholder:"",
        style:{},
        onClick:""
    }   ;

  }
  render() {
    return (
    <div className="field">
      <input /*onClick={this.props.onClick}*/ value={this.props.value} className={this.props.classe} type={this.props.type} placeholder={this.props.placeholder} style={this.props.style}/>
    </div>
    );
  }
}
class Form extends React.Component{
          constructor(props){
                super(props);
                this.state={
                    url:"",
                    classep:"",
                    msg:"",
                    username:"",
                    password:""
                };
                this.handleSubmit=this.handleSubmit.bind(this);
                this.handleChange=this.handleChange.bind(this);
                this.senddata=this.senddata.bind(this)
          }
          async senddata(){

                    var target=window.location.href.split("/login?next=");

                    await axios.post('/auth/',querystring.stringify({
                            username: this.state.username,
                            password: this.state.password
                          }))
                          .then(function (response) {

                            window.location.replace(target[0]+target[1])
                          })
                          .catch(function (error) {

                            ReactDOM.render(<Form cls="input is-danger" classep="help is-danger" msg="Nom d'utilisateur ou mot de passe incorrect" url="/auth/"/>,document.getElementById("formcontainer"));

                          });
                          }
          handleSubmit(e){
                        e.preventDefault();

                        //this.setState({fieldval=});
                        this.senddata();


                }

          handleChange(e){
                if (e.target.id=="username"){this.setState({username:e.target.value});}
                else{this.setState({password:e.target.value});}
                    }

          /*getval(e){
                    return(e.target.value);
          }*/
          render(){
                return(
                    <form onSubmit={this.handleSubmit} method="post" action={this.props.url}>
                        <DjangoCSRFToken />
                        <Input id="username" classe={this.props.cls} value={this.state.username} onChange={this.handleChange}  type="text" placeholder="Nom d'utilisateur"/>
                        <Input id="password" classe={this.props.cls}  value={this.state.password} onChange={this.handleChange}  type="password" placeholder="Mot de passe" />
                        <Button classe="button" type="submit" value="connexion" style={btnstyl}/>
                        <p style={{fontSize:"11px"}} className={this.props.classep}>{this.props.msg}</p>
                    </form>

                );

          }


}


/*ReactDOM.render(<Input  type="text" placeholder="Nom d'utilisateur"/>,document.getElementById("username"));
onClick={handleClick}
ReactDOM.render(<Input type="password" placeholder="Mot de passe" />,document.getElementById("password"));
ReactDOM.render(<Button onClick={handleClick} classe="button" type="submit" value="connexion" style={btnstyl}
/>,document.getElementById("button"));*/
ReactDOM.render(<Form cls="input" url="/auth/"/>,document.getElementById("formcontainer"));
export default Form
