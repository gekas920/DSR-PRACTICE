import React from 'react'
import './Dialog.css'
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import * as crud from "../Requests/requests";
import CustomizedSnackbars from "../User/SuccessSnack";


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


class TakeEquip extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:props.UserId,
            id:props.content.id,
            name:props.content.name,
            owner:props.content.owner,
            availability:props.content.availability,
            lastOwner:props.content.lastOwner,
            description:props.content.description,
            admin:props.admin,
            open:false,
            done:false,
            value:props.content.name,
            withoutChanges:true,
            incorrect:false,
            doneApply:false
        };
        this.sendData = this.sendData.bind(this);
        this.removeEquip = this.removeEquip.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.applyChanges = this.applyChanges.bind(this);
    }


    applyChanges(){
        if(this.state.name && this.state.description){
            crud.update('/updateEquip',{
                value:this.state.value,
                updateName:this.state.name,
                updateDescription:this.state.description,
            });
            this.setState({
                open:true,
                doneApply:true
            });
            setTimeout(() => {
                this.setState({open: false});
            },1500);
        }
        else {
            this.setState({
                incorrect:true
            });
        }
    }

    handleChange = name => event => {
        this.setState({
            ...this.state.value,
            [name]: event.target.value,
            withoutChanges:false,
            incorrect:false
        });
    };

    removeEquip(){
        crud.remove(`/removeEquip/${this.state.name}`);
        this.setState({
            done:true,
            open:true
        });
        setTimeout(() => {
            this.setState({open: false});
        }, 1500)
    }

    sendData(){
        const info = {
            id:this.state.user,
            name:this.state.name
        };
        crud.update('/pickUpEquip',info);

        this.setState({
            availability:false,
            open:true
        });
        setTimeout(() => {
            this.setState({open: false});
        }, 1500)
    }


    render() {
        const available = this.state.availability ? 'available' : 'not available';
        const fields = <div>
            <TextField
                label="Name"
                defaultValue={this.state.name}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: !this.state.admin
                }}
                style={InputStyle}
                onChange={this.handleChange('name')}
                variant="outlined"
            />
            <TextField
                label="Owner"
                defaultValue={this.state.owner}
                className={useStyles.textField}
                margin="normal"
                InputProps={{
                    readOnly: true
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
                    readOnly: true
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
                    readOnly: true
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
                    readOnly: !this.state.admin
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
                {this.state.incorrect &&
                <p style={{color:'black'}}>Empty field</p>
                }
                <Fab  disabled={!this.state.availability || this.state.done} onClick={this.sendData}
                      variant="extended"
                      aria-label="Delete" className={useStyles.fab}
                      style={Object.assign({},butt,{marginTop:'15px'})}>
                    Take
                </Fab>
                {this.state.admin &&
                    <div>
                        <Fab  disabled={this.state.doneApply || this.state.withoutChanges} onClick={this.applyChanges} variant="extended" aria-label="Delete" className={useStyles.fab}
                              style={butt}>
                            Apply changes
                        </Fab>
                        <Fab  disabled={this.state.done} onClick={this.removeEquip} variant="extended" aria-label="Delete" className={useStyles.fab} style={butt}>
                            Delete
                        </Fab>
                    </div>
                }
                <CustomizedSnackbars open = {this.state.open}/>
            </div>
        )
    }
}


export default TakeEquip;