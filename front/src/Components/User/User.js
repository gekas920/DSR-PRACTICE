import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import './UserStyles.css'
import Fab from "@material-ui/core/Fab";
import * as crud from '../Requests/requests'

const styleInput = {
    width:'400px',
    height: '40px',
    fontFamily: 'Arial, monospace',
    fontWeight: 'bold',
    marginTop: '30px'
};




const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    fab: {
        marginTop:'5px',
        margin: theme.spacing(1),
    },
}));



class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login:'gekas9000',
            password:'qwerty',
            email:'test@test',
            name:'Evgeny',
            phone:'89204610789',
            date:'1999-12-23',
            value:'',
            disabled:true,
            show:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
    }

    handleChange = name => event => {
        this.setState({ ...this.state.value, [name]: event.target.value });
    };

    Inputs(props,value){
        return(
            <TextField
                disabled={this.state.disabled}
                value={value}
                id={props}
                label={props}
                className={styles.textField}
                onChange={this.handleChange(props)}
                margin="normal"
                style={styleInput}
            />
        )
    }

    handleClick(){
        this.setState(prevState => ({
            disabled: !prevState.disabled
        }));
    }

    applyChanges(){
        if (!this.state.disabled){
            this.setState({show:true});
        }
        else {
            this.setState({show:false});
        }
    }


    render() {
        let inputs = <div>
            {this.Inputs('login',this.state.login)}
            {this.Inputs('password',this.state.password)}
            {this.Inputs('email',this.state.email)}
            {this.Inputs('name',this.state.name)}
            {this.Inputs('phone',this.state.phone)}
            {this.Inputs('date',this.state.date)}
            <p className="transition" style={this.state.show ? {}:{display: 'none'}}>You must close redactor first</p>
            <Fab variant="extended" aria-label="Delete" className={styles.fab}
                 style={Object.assign({},styleInput,{backgroundColor:'#ffd432',height: '50px'})} onClick={this.handleClick}>
                Open/Close redactor
            </Fab>
            <Fab variant="extended" aria-label="Delete" className={styles.fab}
                 style={Object.assign({},styleInput,{backgroundColor:'#ffd432',height: '50px'})} onClick={this.applyChanges}>
                Apply changes
            </Fab>
        </div>;
        return(
            <div>
                <h1 className="info">User information</h1>
                <Grid container justify="center" alignItems="center" style={{width:'400px',margin:'0 auto'}}>
                    {inputs}
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(User);