import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import querystring from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import { Container,Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';


class ConnectorDiv extends React.Component{

                constructor(props) {
                super(props);
                this.state={
                            Projects:[]
                            };

                }




    render(){

            return(

                    <div className="container">
                        <div className="row">

                            <div className="col-3">
                                <div className="panel">
                                    <i style={{marginRight:"10px"}} className="fas fa-database"></i>
                                    <span className="sourceType">Sql</span><br/>
                                        <a href="#" style={{paddingLeft:"30px"}}>
                                        <img src={require("./connectorIcon/mysql.png")}/>
                                        </a>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="panel">
                                    <i style={{marginRight:"10px"}} className="fas fa-file"></i>
                                    <span className="sourceType">Nosql</span>
                                </div>

                            </div>
                            <div className="col-3">
                                <div className="panel">
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="panel">
                                </div>
                            </div>


                        </div>
                        <div className="row">


                        </div>

                    </div>



            );


    }


}

ReactDOM.render(<ConnectorDiv/>,document.getElementById("connection"))