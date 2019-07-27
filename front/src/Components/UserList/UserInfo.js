import React from 'react'
import '../Catalog/Dialog.css'
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import * as crud from '../Requests/requests'


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


const butt = {
    width:'250px',
    marginBottom: '25px',
    marginTop:'25px',
    backgroundColor: '#ffd432'
};

const InputStyle ={
    minWidth: '300px',
};


class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.content.id,
            name:props.content.name,
            email:props.content.email,
            date:props.content.date,
            phone:props.content.phone,
            admin:props.content.admin,
            sendData:false,
            deleted:false,
            withoutChanges:true,
            incorrect:false
        };
        this.sendData = this.sendData.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            ...this.state.value,
            [name]: event.target.value,
            withoutChanges:false
        });
    };

    sendData(){
        if(this.state.email && this.state.name && this.state.date && this.state.phone){
            crud.update('/updateInfoByAdmin',this.state);
            this.setState({
                sendData:true
            })
        }
        else {
            this.setState({
                incorrect:true
            });
        }
    }

    deleteUser(){
        crud.update('/deleteUser',this.state);
        this.setState({
            deleted:true
        })
    }

    render() {
        const regular = this.state.admin ? 'admin' : '-----';
        const fields = <div>
            <TextField
                label="Name"
                value={this.state.name}
                className={useStyles.textField}
                margin="normal"
                onChange={this.handleChange('name')}
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Email"
                value={this.state.email}
                className={useStyles.textField}
                margin="normal"
                onChange={this.handleChange('email')}
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Phone"
                value={this.state.phone}
                className={useStyles.textField}
                onChange={this.handleChange('phone')}
                margin="normal"
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Date"
                value={this.state.date}
                className={useStyles.textField}
                margin="normal"
                onChange={this.handleChange('date')}
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Admin status"
                defaultValue={regular}
                className={useStyles.textField}
                margin="normal"
                inputProps={{
                    readOnly:true
                }}
                style={InputStyle}
                variant="outlined"
            />
        </div>;
        return(
            <div className="diag">
                <h1 className='name'>User info</h1>
                {fields}
                {this.state.incorrect &&
                    <p style={{color:'black'}}>Empty field</p>
                }
                <Fab  disabled={this.state.sendData || this.state.withoutChanges} onClick={this.sendData} variant="extended" aria-label="Delete" className={useStyles.fab} style={butt}>
                    Apply changes
                </Fab>
                <Fab  disabled={this.state.deleted || this.state.admin} onClick={this.deleteUser} variant="extended" aria-label="Delete" className={useStyles.fab}
                      style={Object.assign({},butt,{marginTop:'-5px'})}>
                    Delete
                </Fab>
            </div>
        )
    }

}


export default UserInfo;