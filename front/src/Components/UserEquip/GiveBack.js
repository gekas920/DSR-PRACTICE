import React from "react";
import * as crud from "../Requests/requests";
import CustomizedSnackbars from "../User/SuccessSnack";
import {makeStyles} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

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
    marginBottom: '20px',
    backgroundColor: '#ffd432'
};

const InputStyle ={
    minWidth: '300px',
};




class GiveBack extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            UserId:this.props.info.UserId,
            name:this.props.info.name,
            description:this.props.info.description,
            open:false,
            done:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.giveBack = this.giveBack.bind(this);
    }



    handleChange = name => event => {
        this.setState({
            ...this.state.value,
            [name]: event.target.value,
            withoutChanges:false,
            incorrect:false
        });
    };

    giveBack(){
        const info = {
            name:this.state.name,
            UserId: this.state.UserId
        };
        crud.update('/giveBackEquip',info);
        this.setState({
            done:true,
            open:true
        });
        setTimeout(() => {
            this.setState({open: false});
        }, 1500)
    }


    render() {
        const fields = <div>
            <TextField
                label="Name"
                defaultValue={this.state.name}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true
                }}
                style={InputStyle}
                onChange={this.handleChange('name')}
                variant="outlined"
            />
            <TextField
                label="Description"
                multiline
                defaultValue={this.state.description}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true
                }}
                onChange={this.handleChange('description')}
                style={InputStyle}
                variant="outlined"
            />
        </div>;
        return(
            <div className="diag">
                <h1 className='name'>Equip info</h1>
                {fields}
                <Fab  onClick={this.giveBack}
                      disabled={this.state.done}
                      variant="extended"
                      aria-label="Delete" className={useStyles.fab}
                      style={Object.assign({},butt,{marginTop:'15px'})}>
                    Give back
                </Fab>
                <CustomizedSnackbars open = {this.state.open}/>
            </div>
        )
    }
}


export default GiveBack