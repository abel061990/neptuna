import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dropzone from 'react-dropzone';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import querystring from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import axiosCancel from 'axios-cancel';
import { Progress } from 'semantic-ui-react';
import { Tab,Table } from 'semantic-ui-react';
import { Dropdown,Label,Form,Input } from 'semantic-ui-react';
import { style } from 'glamor';
import {ProgressIndeterminate} from './utils';
import amber from '@material-ui/core/colors/amber';
import Griddle from 'griddle-react';
require("./fattable/fattable.js")
//require("./fattable/fattable.css")

//var table=new fattable.SyncTableModel();
//var Griddle = require('griddle-react');


axiosCancel(axios, {
  debug: false // default
});
//var request = require('superagent');
var apiBaseUrl = "/project/upload/file";

function sleep(m){
            var start= new Date().getTime();
            for (var i=0;i<1e7;i++){
                if((new Date().getTime()-start)>m){break;}
            }
}
var options = [
                  { key: 'defaultPath', text: 'Chemin par défaut',value:'Chemin par défaut'},
                  { key: 'userPath', text: 'Préciser un chemin',value:'Préciser un chemin'}
                ]









export class UploadScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      filesPreview:[],
      filesToBeSent:[],
      progress:0,
      active:'',
      visible:'show',
      color:'green',
      disable:false,
      displayDiv1:'show',
      displayDiv2:'none',
      printcount:10,
      userPath:'none',
      schema:0,
      table:[],
      col:[]


    }
    this.onDrop=this.onDrop.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.Click=this.Click.bind(this);
    this.onHover=this.onHover.bind(this);
    this.handleChoose=this.handleChoose.bind(this);
    this.deleteFile=this.deleteFile.bind(this);
    this.abortAxios=this.abortAxios.bind(this)

  }

  componentDidMount(){



  }
Click(e){
console.log(e.target);
        /*if(e.target.className.split(' ').includes('del')){

                this.setState({disable:true})
            }
        else{this.setState({disable:false})}*/

}
abortAxios(e){
const requestId=e.target.id;
axios.cancel(requestId);
this.setState({active:''})

}
async deleteFile(e){
    var file=e.target.id;
    await axios.post('/delete/file',querystring.stringify({filename:file}))
              .then((response)=> {
                    var files=this.state.filesToBeSent;
                    for(var i=0;i<files.length;i++){
                        if(files[i][0].name==file){
                            var idx=i;
                            break;
                        }

                        }
                    //console.log(idx,files);
                    files.splice(idx,1)
                    this.setState({filesToBeSent:[...files]});
                    if(files.length==0){this.setState({schema:0})}


              }).catch((error)=> {

                });


}
 onHover(e){


            if(e.target.className=="noOpen"){

            this.setState({disable:true})
            }
            else{

            this.setState({disable:false})
            }

 }
 handleChoose(e,data){

            if(data.value=='Préciser un chemin'){
                        options=[{ key: 'userPath', text: 'Préciser un chemin',value:'Préciser un chemin'},
                            { key: 'defaultPath', text: 'Chemin par défaut',value:'Chemin par défaut'}
                            ];
                        this.setState({userPath:'show'})
            }
            else{
            options=[{ key: 'defaultPath', text: 'Chemin par défaut',value:'Chemin par défaut'},
                            { key: 'userPath', text: 'Préciser un chemin',value:'Préciser un chemin'}];
            this.setState({userPath:'none'})
            }

 }

  async handleSubmit(){
  // console.log("handleClick",event);

    //var self = this;
    const Etat=this.state;

    let formData=new FormData();
    //if(Etat.filesToBeSent.length>0){
    formData.append(Etat.active[0].name,Etat.active[0]);
    const requestId =Etat.active[0].name ;


        //}


    await axios.post(apiBaseUrl,formData,{ headers: { 'Content-Type': 'multipart/form-data' },requestId: requestId,
                    onUploadProgress: (progressEvent)=> {
                              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                              this.setState((state)=>{
                                                    state.progress=percentCompleted;
                                                    state.disable=true;
                                                    return state
                                                    });

                              if(percentCompleted==100){
                                  this.setState({disable:false});
                                  const schema=this.state.schema;
                                  if(schema==0){this.setState({schema:1});}
                              }
                            }})
              .then((response)=> {
                if(this.state.color=='green'){
                    const f=this.state;
                  var filesToBeSent=f.filesToBeSent;
                    filesToBeSent=[f.active,...filesToBeSent];
                    this.setState({visible:'none',filesToBeSent:[...filesToBeSent],active:''})
                    const schema=this.state.schema;

                    if(schema==1){
                                    this.setState({schema:2,table:response.data.table,col:response.data.col});





                                    }


                    }

                /*var elt=this.refs;
                console.log(elt);
                elt.setAttribute('style','display:show');*/
               //this.setState({sizes:[response.data.size,...sizes]});

              }).catch((error)=> {
                this.setState({color:'red'});


                });


}
  onDrop(acceptedFiles, rejectedFiles) {
      // console.log('Accepted files: ', acceptedFiles[0].name);
       //const f=this.state;
      //var filesToBeSent=f.filesToBeSent;
      //if(filesToBeSent.length < this.state.printcount){
        //filesToBeSent=[acceptedFiles,...filesToBeSent];

        var filesPreview=[];
        /*for(var i in filesToBeSent){
          filesPreview=[<div className="noOpen" key={filesToBeSent[i][0].name}>
            {filesToBeSent[i][0].name}
            <div>
            <Progress percent={this.state.progress} progress size='small' color={this.state.color} />
            </div>
            <MuiThemeProvider>
            <a  href="#" style={{fontSize:"12px"}}></a>
            </MuiThemeProvider>
            </div>,
          ...filesPreview]
          state.filesToBeSent=[...filesToBeSent];
        }*/
        this.setState((state)=>{
                    state.active=acceptedFiles;
                    state.filesPreview=[...filesPreview];
                    state.visible="show";
                    return state;
                    },()=>{this.handleSubmit()});

        /*this.setState({filesToBeSent:[...filesToBeSent,...this.state.filesToBeSent],
        filesPreview:[...filesPreview,...this.state.filesPreview]},()=>{this.handleClick()});*/
      //}
      /*else{
        alert("Vous avez atteint la nombre limite de fichier à importer")
      }*/
   }





 render() {
 let filenamecontainerstyle=style({
 width:"100%",
 ":hover": {
  backgroundColor:'#B2DFDB'
}})
 const Files=this.state;
        const List=({visible='show'})=>(Files.filesToBeSent.map(el=>{

                if (el[0].size%(1024*1024*1024*1024*1024)!=el[0].size)
                        {var size=Math.round((el[0].size/(1000000000000000))*10)/10+'PB'}
                else if (el[0].size%(1024*1024*1024*1024)!=el[0].size)
                        {var size=Math.round((el[0].size/(1000000000000))*10)/10+'TB'}
                else if (el[0].size%(1024*1024*1024)!=el[0].size)
                        {var size=Math.round((el[0].size/(1000000000))*10)/10+'GB'}
                else if (el[0].size%(1024*1024)!=el[0].size)
                        {var size=Math.round((el[0].size/(1000000))*10)/10+'MB'}
                else{var size=Math.round((el[0].size/(1000))*10)/10+'KB'}

        return(
           <div className="noOpen" key={el[0].name}>

               <div className="row" {...filenamecontainerstyle}>
                    <div className='col-6'>
                        {el[0].name}
                    </div>
                    <div   className='col-6' style={{textAlign:"right",display:"show"}}>
                        <span style={{marginRight:"15px"}}>{size}</span>
                        <i id={el[0].name}
                            className="far fa-trash-alt del"
                            onClick={this.deleteFile}
                            style={{cursor:'pointer'}}>
                        </i>
                    </div>
               </div>
                <MuiThemeProvider>
                <a  href="#" style={{fontSize:"12px"}}></a>
                </MuiThemeProvider>

            </div>

            )
            }
            )
            );

const DropdownPath = () => (

    <Form.Field>
    <div style={{marginTop:"20px"}}>
      <Label pointing='below' style={{borderRadius:'0px'}}>Sauvegarde du fichier</Label>
    </div>
    <div>
      <Dropdown
      id="selec"
      selection
      options={options}
      defaultValue={options[0].value}
      onChange={this.handleChoose}
      style={{fontSize:'11px',borderRadius:'0px'}}
       />
    </div>
    <div style={{marginTop:"10px"}}>
      <Input style={{fontSize:"11px!important",borderRadius:"0px!important"}}
            id="path" style={{display:this.state.userPath}}
            type='text'
            placeholder='Chemin de sauvegarde' />
    </div>
    </Form.Field>
)



const panes = [
  { menuItem: 'Importer', render: () =>
  <Tab.Pane attached={false} style={{border:"0px",boxShadow:"0px 0px"}}>
          <div className="row" style={{width:"100%",padding:"20px"}}>
            <div className="col-7">
               <Dropzone onMouseOver={this.onHover}   disableClick={this.state.disable} onClick={this.Click} onDrop={this.onDrop}  style={{backgroundColor:"#f2f2f2",
               border:"4px dotted #ccc",height:"200px",cursor:"pointer",
                overflow:"auto"}} >
                    <div style={{fontSize:"11px",padding:"20px"}}>
                        Glisser et déposer vos fichiers ici, ou cliquer pour sélectionner les fichiers à télécharger.<br/>
                        Si vous importer plusieurs fichiers, assurez-vous qu'ils aient les mêmes colonnes
                    </div>

                    <div style={{fontSize:"12px",color:"#0277BD",padding:"20px"}}>
                        {this.state.active!='' ?(
                            <div className="noOpen" key={this.state.active[0].name}>

                               <div className="row">
                                    <div className='col-6'>
                                        {this.state.active[0].name}
                                    </div>
                                    <div   className='col-6' style={{textAlign:"right",display:"show"}}>

                                        <i id={this.state.active[0].name} className="fas fa-stop-circle fa-2x del" onClick={this.abortAxios}></i>
                                    </div>
                               </div>
                               <div className="row" style={{width:"100%"}}>
                                    <div className='col-12'>
                                    {this.state.progress!=100 ? (
                                        <Progress style={{display:this.state.visible}} percent={this.state.progress} progress size='small' color={this.state.color} />):(
                                        <div></div>)}
                                     </div>
                               </div>
                                <MuiThemeProvider>
                                <a  href="#" style={{fontSize:"12px"}}></a>
                                </MuiThemeProvider>

                            </div>):
                            (<div></div>)
                            }
                    </div>
               </Dropzone>

                <DropdownPath/>
            </div>
            <div className="col-5">
                {this.state.schema==1 ?(
                    <div>
                        <ProgressIndeterminate>

                        </ProgressIndeterminate>
                        <p style={{marginLeft:'50px'}}>Patientez...</p>
                    </div>):(<div></div>)
                }
                    <div style={{fontSize:"12px",color:"#0277BD",padding:"20px"}}>
                        <List/>
                    </div>
            </div>

           </div>
  </Tab.Pane> },





  { menuItem: 'Aperçu', render: () =>{
   const data=this.state.table;
   const col=this.state.col
   return(
  <Tab.Pane attached={false} style={{border:"0px",boxShadow:"0px 0px"}}>
        <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
          {col.map(el=>{

                <Table.HeaderCell>
                        {el}
                </Table.HeaderCell>
          })
          }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, (col) => (
            <Table.Row >
                {col.map(el=>{

                <Table.Cell>
                        {el}
                </Table.Cell>
          })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
  </Tab.Pane> )}},
  { menuItem: 'Configuration', render: () =>
  <Tab.Pane attached={false} style={{border:"0px",boxShadow:"0px 0px"}}>
  </Tab.Pane> },
]
 return (
 <div>
         <div style={{borderBottom:"1px solid #ccc",marginTop:"25px",height:"38px",padding:"12px"}}>
            <div className="row" style={{width:"100%"}}>
                <div className="col-7" style={{paddingLeft:"0px"}}>
                    <div style={{backgroundColor:"#FFC107",width:"48px",height:"38px",marginTop:"-12px",padding:"5px 6px 5px 11px"}}>
                        <i className="fas fa-upload fa-2x" >

                        </i>
                    </div>
                </div>
                <div className="col-5" style={{textAlign:"right"}}>
                        <div className="btn-group" style={{height:"28px",marginTop:"-10px"}}>
                            <input onChange={this.handleChange} style={{fontSize:"0.6em",width:"200px",backgroundColor:"#fff",textAlign:"center"}}
                        placeholder="Donner un nom à votre donnée"/>
                    <a href="#" className="btn" style={{borderRadius:"0px",backgroundColor:"#FBC02D",
                        border:"1px solid #ccc",fontSize:"12px",color:"#333"}}>
                        Créer
                    </a>
                </div>
                </div>
            </div>

         </div>
         <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>

 </div>
         )
 }
}