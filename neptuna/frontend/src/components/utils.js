import React from "react";
import ReactDOM from "react-dom";
import { addproject } from "../js/actions/index";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress
            className={classes.progress}
            size={130}

            thickness={2}/>
    </div>
  );
}


const ProgressIndeterminate= withStyles(styles)(CircularIndeterminate);


class AlertDialog extends React.Component {
  state = {
    open: false,

  };

  handleClickOpen = (e) => {
    this.setState({ open: true });

  };

  handleClose = (e) => {
    if(e.target.innerText=="AGREE"){
            console.log("yes");
            this.props.supp(this.props.idx);
            this.setState({ open: false })
            }
    else{this.setState({ open: false })}
  };

  render() {
    return (
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
          <DialogTitle id="alert-dialog-title">{"Désirez-vous supprimer"} {this.props.name} {"?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}




class Icone extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      iconetype: "",
      title:"",
      style:{},
      toggle:"",
      target:"",
      onClick:""
    };
  }
  render() {

    return(<i onClick={this.props.onClick} className={this.props.iconetype} title={this.props.title} style={this.props.style}
             data-toggle={this.props.toggle} data-target={this.props.target}></i>);
  }
}


class ConnectForm extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    }

  render() {

    return (
      <form onSubmit={this.props.onSubmit} method="post" action="create/project">
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
                <div className="form-group">
                  <label>Nom:</label>
                  <input onChange={this.props.onChange} type="text" className="form-control" id="projectname"/>

                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea onChange={this.props.onChange} className="form-control" rows="5" id="description"></textarea>
                </div>
                <button onClick={this.props.onClick} style={{color:"#fff",backgroundColor:"#1d9d74"}} type="submit" className="btn">Créer</button>
            </div>
            <div className="col-md-1"></div>
        </div>
      </form>
    );
  }
}







export{Icone,ConnectForm,AlertDialog,ProgressIndeterminate}



