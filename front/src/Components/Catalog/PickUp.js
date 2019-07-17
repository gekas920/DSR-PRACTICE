import React from 'react'
import * as crud from '../Requests/requests'
import './Dialog.css'
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


const butt = {
    disabled:'block',
    width:'250px',
    marginLeft:'70px',
    marginBottom: '20px',
    marginTop:'10px',
    backgroundColor: '#ffd432'
};


const chips = {
    borderStyle:'solid',
    borderWidth:'2px',
    borderColor:'#ffd432',
    backgroundColor:'#2cc6ff',
    fontSize:'15px',
    width:'150px',
    marginBottom:'3px',
    marginLeft: '5px'
};



class PickUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.content.id,
            name:props.content.name,
            owner:'',
            lastOwner:'',
            currentPrice:'',
            weight:'',
            width:'',
            height:'',
            availability:'',
            description:''
        };
        this.field = this.field.bind(this);
    }

    componentWillMount() {
        const par = this.state.name;
        crud.get('/equipmentPick',{params:{name:par}}).then(result=>{
            console.log(result);
            this.setState({
            owner:result.data.owner,
            lastOwner:result.data.lastOwner,
            currentPrice:result.data.currentPrice,
            weight:result.data.weight,
            width:result.data.width,
            height:result.data.height,
            description:result.data.description,
            availability:result.data.availability
        },function () {
            console.log(result);
        })})
    }

    field(info){
        const inf = this.state[info];
        switch (info) {
            case 'currentPrice':
                return(
                    <div className="elem">
                        <Chip color="primary"  label= 'Current price'
                              style ={chips}/>
                        <p className="infoStr">{inf} у.e</p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            case 'weight':
                return(
                    <div className="elem">
                        <Chip color="primary"  label='Weight'
                              style ={chips}/>
                        <p className="infoStr">{inf} mg</p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            case 'width':
                return(
                    <div className="elem">
                        <Chip color="primary"  label='Width'
                              style ={chips}/>
                        <p className="infoStr">{inf} cm</p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            case 'height':
                return(
                    <div className="elem">
                        <Chip color="primary"  label='Height'
                              style ={chips}/>
                        <p className="infoStr">{inf} cm</p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            case 'name':
                return(
                    <div className="elem">
                        <Chip color="primary"  label='Name'
                              style ={chips}/>
                        <p className="infoStr">{inf}</p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            case 'owner':
                return(
                    <div className="elem">
                        <Chip color="primary"  label='Owner'
                              style ={chips}/>
                        <p className="infoStr">{inf} </p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            case 'lastOwner':
                return(
                    <div className="elem">
                        <Chip color="primary"  label='Last Owner'
                              style ={chips}/>
                        <p className="infoStr">{inf} </p><br/>
                    </div>
                )
                // eslint-disable-next-line no-unreachable
                break;
            default:
                break;
        }
    }


    render() {
        console.log(this.state);
        return(
            <div className="diag">
                <h1 className='name'>{this.state.name}</h1>
                {this.field('name')}
                {this.field('owner')}
                {this.field('lastOwner')}
                {this.field('currentPrice')}
                {this.field('weight')}
                {this.field('width')}
                {this.field('height')}
                <Fab  disabled={!this.state.availability} variant="extended" aria-label="Delete" className={useStyles.fab} style={butt}>
                    Pick up
                </Fab>
            </div>
        )
    }
}


export default PickUp;