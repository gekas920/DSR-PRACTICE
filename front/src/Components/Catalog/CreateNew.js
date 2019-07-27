import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import './Dialog.css'
import * as crud from '../Requests/requests'
import CustomizedSnackbars from "../User/SuccessSnack";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const InputStyle ={
    minWidth: '300px',
};

const butt = {
    width:'250px',
    marginBottom: '20px',
    marginTop:'20px',
    backgroundColor: '#ffd432'
};

class CreateNew extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            description:'',
            disabled:false,
            exist:false,
            correct:false,
            open:false
        };
        this.createEquip = this.createEquip.bind(this);
        this.nameField = this.nameField.bind(this);
        this.descField = this.descField.bind(this);
    }

    createEquip(){
        const equipBody = {
          name:this.state.name,
          owner:'-----',
          lastOwner:'-----',
          description:this.state.description
        };
        if(equipBody.name && equipBody.description){
            crud.create('/createEquip',equipBody)
                .then(result=>{
                    if(result.data !== 'Already Exist') {
                        this.setState({
                            disabled: true,
                            open: true
                        });
                        setTimeout(() => {
                            this.setState({open: false});
                        }, 1500);
                    }
                    else {
                        this.setState({
                            exist:true,
                        })
                    }
                });
        }
        else {
            this.setState({
                correct:true
            })
        }
    }

    nameField(event){
        this.setState({
            name:event.target.value,
            exist:false,
            correct:false
        })
    }

    descField(event){
        this.setState({
            description:event.target.value,
            exist:false,
            correct:false
        })
    }

    render() {
        const fields = <div>
            <TextField
                label="Name"
                className={useStyles.textField}
                margin="normal"
                style={InputStyle}
                variant="outlined"
                onChange={this.nameField}
            />
            <TextField
                label="Description"
                multiline
                className={useStyles.textField}
                margin="normal"
                style={InputStyle}
                variant="outlined"
                onChange={this.descField}
            />
        </div>;
        return(
            <div className="diag">
                <h1 className='name'>Create new</h1>
            {fields}
                <p style={this.state.exist ? {color:'black'}:{display:'none'}}>Already Exist</p>
                <p style={this.state.correct ? {color:'black'}:{display:'none'}}>Empty Field</p>
                <Fab variant="extended" aria-label="Delete" className={useStyles.fab}
                     disabled={this.state.disabled}
                     style={butt} onClick={this.createEquip}>
                    Create
                </Fab>
                <CustomizedSnackbars open = {this.state.open}/>
            </div>
        )
    }
}


export default CreateNew