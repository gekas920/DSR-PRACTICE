import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './UserStyles.css'
import Fab from "@material-ui/core/Fab";
import * as crud from '../Requests/requests'
import CustomizedSnackbars from "./SuccessSnack";
import {Redirect} from "react-router";


const styleInput = {
    width:'400px',
    height: '40px',
    fontFamily: 'Arial, monospace',
    fontWeight: 'bold',
    marginTop: '30px'
};

const PaperStyle={
    paddingTop:'30px',
    width:'700px',
    margin:'0 auto',
    height:'800px'
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
    root: {
        padding: theme.spacing(3, 2),
    },

}));



class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id :props.info.id,
            email:props.info.email,
            name:props.info.name,
            phone:props.info.phone,
            date:props.info.date,
            picture:'',
            value:'',
            disabled:true,
            show:false,
            open: false,
            validToken:true,
            vertical: 'bottom',
            horizontal: 'left'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    // componentDidMount() {
    //     crud.update('/getPic',{
    //         id:this.state.id
    //     })
    //         .then(result=>{
    //             console.log(result);
    //             this.setState({
    //                 picture : result.data
    //             })
    //         })
    // }

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

    handleClose() {
       this.setState( {open: false });
    }


    applyChanges(){
        this.setState({
            disabled:true,
            open:true
        });
        const info = {
            id:this.state.id,
            email:this.state.email,
            name:this.state.name,
            phone:this.state.phone,
            date:this.state.date
        };
        this.props.updateData(info);
        crud.update('/updateUserInfo',info)
            .then(result=>{
                // if(typeof result.data !== 'undefined'){
                //     localStorage.removeItem('token');
                //     localStorage.removeItem('info');
                //     this.setState({
                //         validToken:false
                //     })
                // }
            });
        setTimeout(() => {
            this.setState({open: false});
        }, 1500)
    }


    render() {
        let inputs = <div>
            <div>
                {this.state.picture}
            </div>
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
            <CustomizedSnackbars open = {this.state.open}/>
        </div>;
        if(!this.state.validToken){
            return <Redirect to='/'/>
        }
        return(
            <div>
                <Paper className={styles.root} style={PaperStyle}>
                <h1 className="info">User information</h1>
                <Grid container justify="center" alignItems="center" style={{width:'400px',margin:'0 auto'}}>
                    {inputs}
                </Grid>
                </Paper>
            </div>
        )
    }
}



export default User