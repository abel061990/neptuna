import React from "react";
import { connect } from "react-redux";
import {Icone} from './utils';

const mapStateToProps = state => {
  return { projects: state.projects };
};
const ConnectedList = ({ projects }) => (

    projects.map(el => (
                        <div key={el.id} style={{marginRight:"5px",marginTop:"15%",backgroundColor:"#fff",
                                width:"400px",border:"1px solid #ccc"}}>
                            <h5>{el.name}</h5>
                        <div style={{display:"flex"}}>
                            <Icone iconetype="fas fa-database fa-2x" style={{marginRight:"5px"}}/>

                        </div>

                        </div>

    ))


);
export const List = connect(mapStateToProps)(ConnectedList);