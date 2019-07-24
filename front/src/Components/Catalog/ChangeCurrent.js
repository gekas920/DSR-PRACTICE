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

class ChangeCurrent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            updateName:'',
            updateDescription:'',
            found: false,
            done:false,
            emptyField:false,
            open:false,
            disabled:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.descChange = this.descChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
    }

    handleChange(event){
        this.setState({
            value:event.target.value,
            found:false
        })
    }

    descChange(event){
        this.setState({
            updateDescription:event.target.value,
            emptyField:false
        })
    }

    nameChange(event){
        this.setState({
            updateName:event.target.value,
            emptyField:false
        })
    }

    handleClick(){
        crud.update('/findEquip',{name:this.state.value})
            .then(result=>{
               if(result.data !== 'Not found'){
                   this.setState({
                       updateName:result.data.name,
                       updateDescription:result.data.description,
                       done:true,
                       emptyField:false,
                   })
               }
               else {
                   this.setState({
                       found:true,
                       emptyField:false
                   })
               }
            });
    }

    applyChanges(){
        if(this.state.updateName && this.state.updateDescription){
            crud.update('/updateEquip',{
                value:this.state.value,
                updateName:this.state.updateName,
                updateDescription:this.state.updateDescription,
            });
            this.setState({
                open:true,
                disabled:true
            });
            setTimeout(() => {
                this.setState({open: false});
            },1500);
        }
        else {
            this.setState({
                emptyField:true
            })
        }
    }

    render() {
        return(
            <div className='diag' style={{minHeight:'200px'}}>
                <h1>Change equipment</h1>
                <div className={useStyles.root}>
                    <div style={this.state.done ? {display:'none'} : {display: 'block'}}>
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
                    </div>
                    {this.state.done &&
                        <div>
                    <TextField
                        label="Name"
                        defaultValue={this.state.updateName}
                        className={useStyles.textField}
                        margin="normal"
                        style={InputStyle}
                        variant="outlined"
                        onChange={this.nameChange}
                    />
                    <TextField
                        label="Description"
                        defaultValue={this.state.updateDescription}
                        className={useStyles.textField}
                        margin="normal"
                        style={InputStyle}
                        variant="outlined"
                        onChange={this.descChange}
                        />
                            {this.state.emptyField && <p style={{
                                fontSize:'10px',
                                color:'black',
                                display:'block',
                            }}>
                                Empty Field
                            </p>}
                            <Fab variant="extended"
                                 aria-label="Delete"
                                 disabled={this.state.disabled}
                                 className={useStyles.fab}
                                 onClick={this.applyChanges}
                                 style={butt}>
                                Apply changes
                            </Fab>
                        </div>}
                </div>
                <CustomizedSnackbars open = {this.state.open}/>
            </div>
        )
    }
}


export default ChangeCurrent;