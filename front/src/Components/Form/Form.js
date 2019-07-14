import React from 'react'
import './Form.css'
import {Redirect} from "react-router-dom";
import * as crud from '../Requests/requests'
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from "@material-ui/styles";


function Input({text,type,onChange}) {
    return(
        <input type={type ? type : text} className="input-form" placeholder = {text} id = {text} onChange={onChange}/>
    )
}

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
            conf:true,
            send:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.accessConfirm = this.accessConfirm.bind(this);

    }

    accessConfirm(){
        this.setState({
            login: document.getElementById('login').value,
            password: document.getElementById('password').value,
            send:true
        },function () {
            const info = {
                login:this.state.login,
                password:this.state.password
            };
            crud.update('/login',info);
        });
    }


    handleChange(){
        this.setState({
            password:document.getElementById('password').value,
            confirm:document.getElementById('confirm').value
        },function () {
            if(this.state.password !== this.state.confirm){
                document.getElementById('confirm').classList.add('back');
            }
            else {
                document.getElementById('confirm').classList.remove('back');
            }
        });
    }



    handleClick(){
        if(this.state.visibility){
            this.setState({
                login:'',
                password:'',
                email:'',
                name:'',
                phone:'',
                date:'',
                visibility:false
            })
        }
        else {
            if(this.state.password === this.state.confirm){
                this.setState({
                    login:document.getElementById('login').value,
                    email:document.getElementById('email').value,
                    name:document.getElementById('name').value,
                    phone:document.getElementById('phone').value,
                    date:document.getElementById('date').value,
                    visibility:true,
                    conf:true,
                    send:true
                },function () {
                    crud.create('/',this.state);
                });
            }
            else {
                this.setState({
                    conf:false
                })
            }
        }

    }


    render() {
        const inputs = [<Input text='confirm' onChange={this.handleChange}/>,<Input text="email"/>,<Input text="name"/>,<Input text="phone" type='phone'/>
        ,<Input text="date"/>,<Input type='file'/>];
        if(this.state.send){
            return (
                <Redirect to="/home"/>
            )
        }
        else return(
            <div>
                <cont className="form-block">
                    <logo>SuperApp</logo>
                    <Input text = 'login'/>
                    <Input text = 'password' type='password' onChange={this.handleChange}/>
                    <login style = {this.state.visibility ? {display:'flex'} : {display:'none'}} onClick = {this.accessConfirm}>Login</login>
                    <other style = {!this.state.visibility ? {display:'block'} : {display:'none'}}>{inputs}</other>
                    <wrong style = {!this.state.conf ? {display:'block'} : {display:'none'}}>Incorrect passwords</wrong>
                    <sign onClick = {this.handleClick}>Sign In</sign>
                </cont>
            </div>)
    }
}


export default  withStyles(style)(Form)


