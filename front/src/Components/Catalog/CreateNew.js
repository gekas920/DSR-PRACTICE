import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import './Dialog.css'

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
    marginTop:'10px',
    backgroundColor: '#ffd432'
};

class CreateNew extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            description:'',
            disabled:false
        };
        this.createEquip = this.createEquip.bind(this);
        this.nameField = this.nameField.bind(this);
        this.descField = this.descField.bind(this);
    }

    createEquip(){
        console.log(this.state);
        this.setState({
            disabled:true
        })
    }

    nameField(event){
        this.setState({
            name:event.target.value
        })
    }

    descField(event){
        this.setState({
            description:event.target.value
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
                <Fab variant="extended" aria-label="Delete" className={useStyles.fab}
                     disabled={this.state.disabled}
                     style={butt} onClick={this.createEquip}>
                    Create
                </Fab>
            </div>
        )
    }
}


export default CreateNew