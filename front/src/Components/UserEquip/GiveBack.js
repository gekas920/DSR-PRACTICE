import React from "react";
import * as crud from "../Requests/requests";
import CustomizedSnackbars from "../User/SuccessSnack";
import {makeStyles} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';


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
            picture:'',
            open:false,
            done:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.giveBack = this.giveBack.bind(this);
    }


    componentDidMount() {
        crud.get(`/getEquipPicture/${this.state.name}`,{ responseType: 'arraybuffer' })
            .then(result=>{
                try {
                    const base64 = btoa(
                        new Uint8Array(result.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.setState({ picture: "data:;base64," + base64 });
                }
                catch (e) {
                    this.setState({picture:''});
                }
            })
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
            <div className="diag1">
                {!this.state.picture &&
                <div className={useStyles.roots}>
                    <LinearProgress style={{backgroundColor:'#ffd432'}}/>
                    <LinearProgress style={{backgroundColor:'#ffd432'}}/>
                    <LinearProgress style={{backgroundColor:'#ffd432'}}/>
                </div>
                }
                <h1 className='name'>Equip info</h1>
                {this.state.picture &&
                <img src={this.state.picture} alt='equip' style={{
                    maxWidth: '200px',
                    maxHeight: '200px'
                }}/>
                }
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