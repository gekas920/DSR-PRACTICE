import React from 'react'
import './Form.css'
import {Redirect} from "react-router-dom";
import * as crud from '../Requests/requests'
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from "@material-ui/styles";
import Fab from '@material-ui/core/Fab';


const styles = {
    width: '200px',
    height: '40px',
    backgroundColor:'#ffd432',
    fontFamily: 'Arial, monospace',
    fontWeight: 'bold',
    marginTop: '30px'
};

const classes = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));





const style = makeStyles(theme=>({
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));


class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login:'',
            password:'',
            confirm:'',
            email:'',
            name:'',
            phone:'',
            date:'',
            visibility:true,
            send:false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.accessConfirm = this.accessConfirm.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.phoneChange = this.phoneChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
        this.isEqual = this.isEqual.bind(this);

    }

    isEqual(){
        return this.state.password === this.state.confirm
    }

    accessConfirm() {
        const user = {
            login:this.state.login,
            password:this.state.password
        };
        crud.update('/login',user).catch(err=>{
            localStorage.removeItem('token');
        });
        this.setState({send:true});
    }



    handleClick(){
        if(this.state.visibility){
            this.setState({
                visibility:false
            })
        }
        else {
            crud.create('/',this.state).then(result=>{
                localStorage.setItem('token',result.data);
                console.log(result);
            });
            this.setState({send:true});
        }
    }


    render() {
        const inputs = <div>
            <input placeholder='confirm' onChange={this.confirmChange} type='password' value={this.state.confirm}
                   className={this.isEqual() ? 'input-form' : 'input-form-back'}/>
            <input placeholder="email"  onChange={this.emailChange} value={this.state.email} />
            <input placeholder="name"  onChange={this.nameChange} value={this.state.name}/>
            <input placeholder="phone" onChange={this.phoneChange} value={this.state.phone}/>
            <input placeholder="date" onChange={this.dateChange} value={this.state.date} type='date'/>
            <input type='file' placeholder="file"/>
        </div>;
        if(this.state.send){
            return (
                <Redirect to="/home"/>
            )
        }
        else return(
            <div>
                <div className="form-block">
                    <div className="logo">SuperApp</div>
                    <input placeholder = 'login' onChange={this.loginChange} value={this.state.login}/>
                    <input placeholder = 'password' type='password' onChange={this.passwordChange} value={this.state.password}/>
                    <div className = 'short' id = 'shorts'>password too short</div>
                    <Fab variant="extended" aria-label="Delete" className={classes.fab}
                         style={Object.assign({},styles,this.state.visibility ? {textAlign:'center'} : {display:'none'})} onClick={this.accessConfirm}>
                        Login
                    </Fab>
                    <div style = {!this.state.visibility ? {display:'block'} : {display:'none'}}>{inputs}</div>
                    <Fab variant="extended" aria-label="Delete" className={classes.fab} style={styles} onClick={this.handleClick}>
                        Sign in
                    </Fab>
                </div>
            </div>)
    }
    passwordChange(event) {
        this.setState({password: event.target.value});
    }
    loginChange(event) {
        this.setState({login: event.target.value});
    }
    emailChange(event) {
        this.setState({email: event.target.value});
    }
    phoneChange(event) {
        this.setState({phone: event.target.value});
    }
    nameChange(event) {
        this.setState({name: event.target.value});
    }
    dateChange(event) {
        this.setState({date: event.target.value});
    }
    confirmChange(event){
        this.setState({confirm:event.target.value});
    }
}

//<div style = {!this.state.conf ? {display:'block'} : {display:'none'}}>Incorrect passwords</div>


export default withStyles(style)(Form)

