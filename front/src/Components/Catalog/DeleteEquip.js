import React from 'react'
import './Dialog.css'
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import * as crud from '../Requests/requests';
import Fab from '@material-ui/core/Fab';
import CustomizedSnackbars from "../User/SuccessSnack";


const useStyles = makeStyles(theme=>({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const butt = {
    marginTop:'30px',
    backgroundColor: '#ffd432',
    width: '300px',
    marginBottom:'20px'
};

const InputStyle ={
    minWidth: '300px',
};

class DeleteEquip extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
    }

    handleChange(event){
        this.setState({
            value:event.target.value,
            emptyField:'',
            found:false
        })
    }


    handleClick(){
        crud.update('/findEquip',{name:this.state.value})
            .then(result=>{
                if(result.data !== 'Not found'){
                    this.setState({
                        done:true
                    })
                }
            });
    }

    applyChanges(){
        crud.update('/removeEquip',{name:this.state.value})
            .then(result=>{
                console.log(result);
            })
    }

    render() {
        return(
            <div className='diag' style={{minHeight:'200px'}}>
                <h1>Delete Equip</h1>
                <div className={useStyles.root}>
                    <div>
                        <TextField
                            label="Find equip"
                            defaultValue={this.state.owner}
                            className={useStyles.textField}
                            margin="normal"
                            style={InputStyle}
                            variant="outlined"
                            onChange={this.handleChange}
                        />
                        <IconButton size='medium' className={useStyles.iconButton} aria-label="Search"
                                    style={{
                                        marginTop:'20px',
                                        transform:'scale(1.2)',
                                        marginLeft: '5px',
                                        color : '#2cc6ff'
                                    }}
                                    onClick={this.handleClick}
                        >
                            <SearchIcon style={{color:'black'}}/>
                        </IconButton>
                        {this.state.found && <p style={{
                            fontSize:'20px',
                            color:'black',
                            display:'block'
                        }}>
                            Not found
                        </p>}
                        <Fab variant="extended"
                             aria-label="Delete"
                             disabled={!this.state.done}
                             className={useStyles.fab}
                             onClick={this.applyChanges}
                             style={butt}>
                            Delete
                        </Fab>
                    </div>
                <CustomizedSnackbars open = {this.state.open}/>
                </div>
            </div>
        )
    }
}


export default DeleteEquip;