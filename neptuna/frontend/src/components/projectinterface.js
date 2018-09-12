import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
//import Icone from './utils';
import {Icone,ConnectForm} from './utils';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import querystring from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import { Container,Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
//import {Button as Styledbutton} from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var globalid;

class ProjectDiv extends React.Component{

                constructor(props) {
                super(props);
                this.state={open: false};

                }

         handleClickOpen = (e) => {
                    this.setState({ open: true });
                    globalid=e.target.id.split(':')[0];


                  };

                  handleClose = (e) => {

                    this.setState({ open: false })
                  };

         render(){

         return(<div key={this.props.id} id={this.props.id} style={{marginRight:"5px",marginTop:"10px",backgroundColor:"#fff",
                                    width:"300px",border:"1px solid #ccc",padding:"10px"}}>
                                    <div className="row">
                                        <div className="col-8">
                                            <h5>{this.props.name}</h5>
                                        </div>
                                        <div className="col-2" style={{textAlign:"right"}}>
                                            <Tooltip id="tooltip-icon" title={this.props.desc}>
                                                <i
                                                    style={{cursor:"pointer"}}
                                                    className="fas fa-info-circle">

                                                </i>
                                            </Tooltip>
                                        </div>
                                        <div className="col-2" style={{textAlign:"right"}}>
                                            <div>
                                                <i id={this.props.id+':i'} onClick={this.handleClickOpen} style={{cursor:"pointer"}}
                                                     className="far fa-trash-alt">
                                                 </i>
                                                <Dialog
                                                  open={this.state.open}
                                                  onClose={this.handleClose}
                                                  aria-labelledby="alert-dialog-title"
                                                  aria-describedby="alert-dialog-description"
                                                    >
                                                  <DialogTitle id="alert-dialog-title">{" "}</DialogTitle>
                                                  <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                           {"Désirez-vous supprimer"} {this.props.name} {"?"}
                                                    </DialogContentText>
                                                  </DialogContent>
                                                  <DialogActions>
                                                    <Button onClick={this.handleClose}>
                                                      Non
                                                    </Button>
                                                    <Button onClick={this.props.supp} color="danger" autoFocus>
                                                      Oui
                                                    </Button>
                                                  </DialogActions>
                                                </Dialog>
                                              </div>


                                        </div>
                                    </div>
                                    <div style={{display:"flex",flexWrap:"wrap",marginTop:"15px"}}>

                                    <div style={{marginRight:"20px",marginTop:"20px"}}>
                                        <a className="iconConteneur" href={this.props.id+'/dataset'} style={{display:"block",border:"1px solid #ccc",borderRadius:"4px",padding:"5px"}}>
                                            <Badge className="notification" badgeContent={this.props.data} color="primary" >
                                                <i className="fas fa-database fa-2x" style={{color:"#595959"}}>
                                                </i>
                                             </Badge>
                                        </a>

                                        <span style={{fontSize:"11px"}}>Données</span>
                                    </div>

                                    <div style={{marginRight:"20px",marginTop:"20px"}}>
                                        <a className="iconConteneur" href="#" style={{display:"block",textDecoration:"none",border:"1px solid #ccc",borderRadius:"4px",padding:"5px"}}>
                                             <Badge className="notification"  badgeContent={this.props.analyse} color="primary" >
                                                <i className="fas fa-cogs fa-2x" style={{color:"#595959"}}>
                                                </i>
                                             </Badge>
                                         </a>
                                         <span style={{fontSize:"11px"}}>Analyses</span>
                                     </div>

                                     <div style={{marginRight:"20px",marginTop:"20px"}}>
                                         <a className="iconConteneur" href="#" style={{display:"block",textDecoration:"none",border:"1px solid #ccc",borderRadius:"4px",padding:"5px"}}>
                                             <Badge className="notification"  badgeContent={this.props.model} color="primary">
                                                <i className="fas fa-cubes fa-2x" style={{color:"#595959"}}>
                                                </i>
                                             </Badge>
                                         </a>
                                         <span style={{fontSize:"11px"}}>Modèles</span>
                                     </div>

                                     <div style={{marginRight:"20px",marginTop:"20px"}}>
                                         <a className="iconConteneur" href="#" style={{display:"block",textDecoration:"none",border:"1px solid #ccc",borderRadius:"4px",padding:"5px"}}>
                                             <Badge className="notification"  badgeContent={this.props.notebook} color="primary" >
                                                <i className="fas fa-book fa-2x" style={{color:"#595959"}}>
                                                </i>
                                             </Badge>
                                         </a>
                                         <span style={{fontSize:"11px"}}>Notebook</span>
                                     </div>

                                     <div style={{marginRight:"20px",marginTop:"20px"}}>
                                         <a className="iconConteneur" href="#" style={{display:"block",textDecoration:"none",border:"1px solid #ccc",borderRadius:"4px",padding:"5px"}}>
                                             <Badge className="notification"  badgeContent={this.props.dashboard} color="primary">
                                                <i className="fas fa-tachometer-alt fa-2x" style={{color:"#595959"}}>
                                                </i>
                                             </Badge>
                                         </a>
                                         <span style={{fontSize:"11px"}}>Dashboard</span>
                                     </div>

                                     <div style={{marginRight:"20px",marginTop:"20px"}}>
                                         <a className="iconConteneur" href="#" style={{display:"block",textDecoration:"none",border:"1px solid #ccc",borderRadius:"4px",padding:"5px"}}>
                                             <Badge className="notification"  badgeContent={this.props.connector} color="primary">
                                                <i className="fas fa-link fa-2x" style={{color:"#595959"}}>
                                                </i>
                                             </Badge>
                                         </a>
                                         <span style={{fontSize:"11px"}}>Connector</span>
                                     </div>

                                    </div>

                                </div>)

         }




}

//const ProjectDiv=(projet)=>()


class ProjectList extends React.Component{
  constructor() {
    super();
    this.state = {
      projects:[],
      Idarr:[],
      name:"",
      id:"",
      description:"",

    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.deleteProject=this.deleteProject.bind(this);
    this.senddata=this.senddata.bind(this);
    this.deletedata=this.deletedata.bind(this)



    //this.senddata=this.senddata.bind(this)
  }
  async componentDidMount() {


      await axios.post('instantiate/projectcontainer')
                          .then((response)=> {

                            if(response.data.nb==0){
                                ReactDOM.render(
                                    <div>
                                        <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                            <input style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                            <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                                <i className="fas fa-search" style={{color:"#999999"}}></i>
                                            </button>
                                         </div>
                                         <div className="container">

                                          <div style={{marginTop:"15%"}} className="row">
                                            <div className="col-4">

                                            </div>
                                            <div style={{textAlign:"center"}} className="col-4">
                                                <h4 style={{fontWeight:"bold",color:"#8c8888"}}>Aucun projet existant, créer un projet</h4>
                                            </div>
                                            <div className="col-4">

                                            </div>
                                          </div>
                                         </div>
                                     </div>,
                                    document.getElementById("projectDivContainer"))
                                }

                            else{

                                        this.setState( (state) => {
                                            state.projects = [...response.data['proj'],
                                            ...state.projects];
                                            state.Idarr=[...response.data['idarray'],...state.Idarr];
                                            return state;
                                        });
                                        const proj=this.state;
                                        const List=()=>(proj.projects.map(el=>(

                                                    <ProjectDiv key={el.id} id={el.id} name={el.name} supp={this.deleteProject}
                                                    data={el.data} analyse={el.analyse} model={el.model} dashboard={el.dashboard}
                                                      notebook={el.notebook} connector={el.connector} desc={el.description}  />

                                            )));

                                        ReactDOM.render(
                                                        <div>
                                                            <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                                                <input onChange={this.handleSearch} style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                                                <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                                                    <i className="fas fa-search" style={{color:"#999999"}}></i>
                                                                </button>
                                                            </div>
                                                            <div style={{display:"flex",flexWrap:"wrap",marginTop:"50px"}}>

                                                                <List/>
                                                            </div>
                                                        </div>,
                                                        document.getElementById("projectDivContainer"))
                            }

                          });


      }
  deleteProject(){
                    const Icopy=[...this.state.Idarr];
                    const Pcopy=[...this.state.projects];
                    const index=Icopy.indexOf(globalid);
                    this.deletedata(index,Icopy[index],Pcopy[index]['name']);

  }



  handleChange(e){
                if (e.target.id=="projectname"){
                                        /*this.setState({username:e.target.value});*/
                                        var res = e.target.value.split(" ");
                                        var ID=res[0].toUpperCase();
                                        for(var i=1;i<res.length;i++){
                                        ID+='_'+res[i].toUpperCase()

                                        }
                                        this.setState({name:e.target.value});
                                        this.setState({id:ID});

                                        }

                else{this.setState({description:e.target.value});}
                    }
  handleSearch(e){
                    const proj=this.state;
                    var aux=[];
                    for(var i=0;i<proj.projects.length;i++){
                        const p=proj.projects[i];

                        if(p['name'].startsWith(e.target.value)){aux=[...aux,p]}
                    }
                    if(aux.length>0){
                                        const List=()=>(aux.map(el=>(

                                    <ProjectDiv key={el.id} id={el.id} name={el.name} supp={this.deleteProject}
                                    data={el.data} analyse={el.analyse} model={el.model} dashboard={el.dashboard}
                                      notebook={el.notebook} connector={el.connector} desc={el.description}  />

                            )));

                        ReactDOM.render(
                                        <div>
                                            <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                                <input onChange={this.handleSearch} style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                                <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                                    <i className="fas fa-search" style={{color:"#999999"}}></i>
                                                </button>
                                            </div>
                                            <div style={{display:"flex",flexWrap:"wrap",marginTop:"50px"}}>

                                                <List/>
                                            </div>
                                        </div>,
                                        document.getElementById("projectDivContainer"))

                    }
                    else{
                            const List=()=>(proj.projects.map(el=>(

                                    <ProjectDiv key={el.id} id={el.id} name={el.name} supp={this.deleteProject}
                                    data={el.data} analyse={el.analyse} model={el.model} dashboard={el.dashboard}
                                      notebook={el.notebook} connector={el.connector} desc={el.description}  />

                            )));

                        ReactDOM.render(
                                        <div>
                                            <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                                <input onChange={this.handleSearch} style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                                <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                                    <i className="fas fa-search" style={{color:"#999999"}}></i>
                                                </button>
                                            </div>
                                            <div style={{display:"flex",flexWrap:"wrap",marginTop:"50px"}}>

                                                <List/>
                                            </div>
                                        </div>,
                                        document.getElementById("projectDivContainer"))
                    }


  }

  async deletedata(index,cle,nom){

                await axios.post('/delete/project',querystring.stringify({
                            projectname: nom,
                            cle: cle

                }))
                .then((response)=> {



                    const Icopy=[...this.state.Idarr];
                    const Pcopy=[...this.state.projects];
                    Icopy.splice(index,1);
                    Pcopy.splice(index,1);

                    this.setState((state)=>{
                                        state.projects=[...Pcopy];
                                        state.Idarr=[...Icopy];
                                        return state;
                    });
                    const proj=this.state;


                        const List=()=>(proj.projects.map(el=>(

                                    <ProjectDiv key={el.id} id={el.id} name={el.name} supp={this.deleteProject}
                                    data={el.data} analyse={el.analyse} model={el.model} dashboard={el.dashboard}
                                      notebook={el.notebook} connector={el.connector} desc={el.description}  />

                            )));

                         if(Icopy.length>0){

                        ReactDOM.render(<div>
                                            <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                                <input onChange={this.handleSearch} style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                                <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                                    <i className="fas fa-search" style={{color:"#999999"}}></i>
                                                </button>
                                            </div>
                                            <div style={{display:"flex",flexWrap:"wrap",marginTop:"50px"}}>

                                                <List/>
                                            </div>
                                        </div>,
                                        document.getElementById("projectDivContainer"))}
                        else{ReactDOM.render(<div>
                                        <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                            <input onClick={this.handleSearch} style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                            <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                                <i className="fas fa-search" style={{color:"#999999"}}></i>
                                            </button>
                                         </div>
                                         <div className="container">

                                          <div style={{marginTop:"15%"}} className="row">
                                            <div className="col-4">

                                            </div>
                                            <div style={{textAlign:"center"}} className="col-4">
                                                <h4 style={{fontWeight:"bold",color:"#8c8888"}}>Aucun projet existant, créer un projet</h4>
                                            </div>
                                            <div className="col-4">

                                            </div>
                                          </div>
                                         </div>
                                     </div>,
                                document.getElementById("projectDivContainer"))}


                })
                .catch((error)=> {

                alert('Erreur')

                });


  }

  async senddata(Idx,nom,desc){

    await axios.post('/create/project',querystring.stringify({
            projectname: this.state.name,
            cle: this.state.id,
            desc:this.state.description
          }))
          .then((response)=> {

               this.setState( (state) => {
                                            state.projects = [{'name': nom, 'id': Idx, 'data': 0,'analyse': 0,
                                            'dashboard': 0, 'connector':0,'notebook': 0, 'model': 0,'description':desc},
                                            ...state.projects];
                                            state.Idarr=[Idx,...state.Idarr];
                                            return state;
                                        });
                const proj=this.state;

                const List=()=>(proj.projects.map(el=>(

                            <ProjectDiv key={el.id} id={el.id} name={el.name} supp={this.deleteProject}
                            data={el.data} analyse={el.analyse} model={el.model} dashboard={el.dashboard}
                              notebook={el.notebook} connector={el.connector} desc={el.description}  />

                    )));

                ReactDOM.render(
                                <div>
                                    <div className="btn-group" style={{height:"30px",marginLeft:"30%",marginTop:"80px"}}>
                                        <input onChange={this.handleSearch} style={{backgroundColor:"#fff",textAlign:"center"}} placeholder="Chercher par nom"/>
                                        <button className="btn" style={{backgroundColor:"#e6e6e6",border:"1px solid #ccc"}}>
                                            <i className="fas fa-search" style={{color:"#999999"}}></i>
                                        </button>
                                    </div>
                                    <div style={{display:"flex",flexWrap:"wrap",marginTop:"50px"}}>

                                        <List/>
                                    </div>
                                </div>,
                                document.getElementById("projectDivContainer"))

          })
          .catch((error)=> {

            alert('Erreur')

          });
          }


  handleSubmit(e){
                        e.preventDefault();

                        const nom=this.state.name;
                        const Idx=this.state.id;
                        const desc=this.state.description;

                        const aux=this.state;

                        if(aux.Idarr.includes(Idx)==true){
                                                    alert("Ce nom existe déjà!")
                            }

                        else{

                            this.senddata(Idx,nom,desc);

                        }
                    }



  render() {
    //const { articles } = this.state;
    //return <ul>{articles.map(el => <li key={el.id}>{el.title}</li>)}</ul>;
    return(<ModalPage onSubmit={this.handleSubmit} onChange={this.handleChange}/>)
  }
}


class ModalPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

     modal: false,
    };
    this.toggle = this.toggle.bind(this);



  }
toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  render() {
    return (
      <Container>
        <Icone onClick={this.toggle} iconetype="fas fa-plus-circle fa-2x" title="Créer un projet"  style={{cursor:"pointer",
                            color:"#1d9d74",marginLeft:"90%",marginTop:"25px"}}/>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            Créer un projet
          </ModalHeader>
          <ModalBody>
              <ConnectForm onSubmit={this.props.onSubmit} onChange={this.props.onChange} onClick={this.toggle}/>
          </ModalBody>

        </Modal>
      </Container>
    );
  }
}

ReactDOM.render(
                    <div>
                        <ProjectList/>



                    </div>,
                    document.getElementById("addprojet"))

/*ReactDOM.render(<Icone iconetype="fas fa-plus-circle fa-2x" title="Créer un projet"  style={{cursor:"pointer",
                            color:"#1d9d74",marginLeft:"90%",marginTop:"25px"}}
                            data-toggle="modal" data-target="#projectModal"/>,document.getElementById("addprojet"))*/






