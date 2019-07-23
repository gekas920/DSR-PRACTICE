import React from 'react'
import './Dialog.css'
import {makeStyles} from '@material-ui/core/styles';
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
    marginTop:'10px',
    backgroundColor: '#ffd432'
};

const InputStyle ={
    minWidth: '300px',
};


class PickUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.content.id,
            name:props.content.name,
            owner:props.content.owner,
            availability:props.content.availability,
            lastOwner:props.content.lastOwner,
            description:props.content.description
        };
        this.sendData = this.sendData.bind(this);
    }


    sendData(){
        this.setState({
            availability:false
        })
    }


    render() {
        const available = this.state.availability ? 'available' : 'not available';
        const fields = <div>
            <TextField
                label="Owner"
                defaultValue={this.state.owner}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Last Owner"
                defaultValue={this.state.lastOwner}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Availability"
                defaultValue={available}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                style={InputStyle}
                variant="outlined"
            />
            <TextField
                label="Description"
                multiline
                defaultValue={this.state.description}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                style={InputStyle}
                variant="outlined"
            />
        </div>;
        return(
            <div className="diag">
                <h1 className='name'>{this.state.name}</h1>
                {fields}
                <Fab  disabled={!this.state.availability} onClick={this.sendData} variant="extended" aria-label="Delete" className={useStyles.fab} style={butt}>
                    Pick up
                </Fab>
            </div>
        )
    }
}


export default PickUp;