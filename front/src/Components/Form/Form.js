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
        const token = localStorage.getItem('token');
        this.state = {
            login:'',
            password:'',
            confirm:'',
            email:'',
            name:'',
            phone:'',
            date:'',
            visibility:true,
            incorrectPass:false,
            incorrectData:false,
            incorrectField:false,
            exist:false,
            hasToken:!!token,
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
        crud.update('/login',user).then(result=>{
            switch (result.data) {
                case 'Incorrect password':
                    this.setState({
                        incorrectPass:true
                    });
                    break;
                case 'Incorrect login':
                    this.setState({
                        incorrectData:true
                    });
                    break;
                default:
                    localStorage.setItem('token',result.data);
                    this.setState({hasToken:true});
                    break;
            }
        })
            .catch(err=>{
                localStorage.removeItem('token');
                this.setState({hasToken:false});
            })
    }




    handleClick(){
        if(this.state.visibility){
            this.setState({
                visibility:false,
                incorrectPass:false,
                incorrectData:false

            })
        }
        else {

             const data = {
               login:this.state.login,
               password:this.state.password,
               email:this.state.email,
               name:this.state.name,
               phone:this.state.phone,
               date:this.state.date
             };


             crud.create('/',data).then(result=>{
                 switch (result.data) {
                     case 'Incorrect data':
                         this.setState({
                            incorrectField:true
                         });
                         break;
                      case 'Already exist':
                          this.setState({
                             exist:true
                          });
                          break;
                     default:
                         localStorage.setItem('token',result.data);
                         this.setState({hasToken:true});
                         break;
                 }
            });

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
        if(this.state.hasToken){
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
                    <p style={this.state.incorrectPass ? {display:'block'} :{display:'none'}}>Incorrect password</p>
                    <p style={this.state.incorrectData ? {display:'block'} :{display:'none'}}>Incorrect data</p>
                    <div className = 'short' id = 'shorts'>password too short</div>
                    <Fab variant="extended" aria-label="Delete" className={classes.fab}
                         style={Object.assign({},styles,this.state.visibility ? {textAlign:'center'} : {display:'none'})} onClick={this.accessConfirm}>
                        Login
                    </Fab>
                    <div style = {!this.state.visibility ? {display:'block'} : {display:'none'}}>{inputs}</div>
                    <p style={this.state.incorrectField ? {display:'block'} :{display:'none'}}>Incorrect field</p>
                    <p style={this.state.exist ? {display:'block'} :{display:'none'}}>User already exist.</p>
                    <Fab variant="extended" aria-label="Delete" className={classes.fab} style={styles} onClick={this.handleClick}>
                        Sign in
                    </Fab>
                </div>
            </div>)
    }
    passwordChange(event) {
        this.setState({
            password: event.target.value,
            incorrectPass:false,
            incorrectData:false,
           incorrectField:false,
            exist:false,
        });
    }
    loginChange(event) {
        this.setState({
            login: event.target.value,
            incorrectPass:false,
            incorrectData:false,
           incorrectField:false,
            exist:false,
        });
    }
    emailChange(event) {
        this.setState({
            email: event.target.value,
            incorrectPass:false,
            incorrectData:false,
           incorrectField:false,
            exist:false
        });
    }
    phoneChange(event) {
        this.setState({
            phone: event.target.value,
            incorrectPass:false,
            incorrectData:false,
           incorrectField:false,
            exist:false
        });
    }
    nameChange(event) {
        this.setState({
            name: event.target.value,
            incorrectPass:false,
            incorrectData:false,
           incorrectField:false,
            exist:false
        });
    }
    dateChange(event) {
        this.setState({
            date: event.target.value,
            incorrectPass:false,
            incorrectData:false,
           incorrectField:false,
            exist:false
        });
    }
    confirmChange(event){
        this.setState({
            confirm:event.target.value,
            incorrectPass:false,
            incorrectData:false,
            incorrectField:false,
            exist:false
        });
    }
}

//<div style = {!this.state.conf ? {display:'block'} : {display:'none'}}>Incorrect passwords</div>


export default withStyles(style)(Form)

