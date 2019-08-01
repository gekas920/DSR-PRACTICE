import React from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import * as crud from '../Requests/requests'
import Dialog from "@material-ui/core/Dialog";
import GiveBack from "./GiveBack";


class UserEquip extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
            ],
            data: [],
            current:{},
            open:false,
            user:this.props.id
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        crud.get(`/showUserEquip/${this.state.user}`).then(result => {
            if(!Array.isArray(result.data)){
                this.setState({
                    data:[result.data]
                })
            }
            else {
                this.setState({
                    data:result.data
                });
            }
        })
            .catch(err=>{
                localStorage.removeItem('token');
                localStorage.removeItem('info');
                this.setState({
                    hasToken:false
                })
            })
    }

    handleClickOpen = (event,rowData) => {
        this.setState({
            open: true,
            current:rowData
        })
    };



    handleClose = () => {
        this.setState({
            open: false,
        });
        crud.get(`/showUserEquip/${this.state.user}`).then(result => {
            if(!Array.isArray(result.data)){
                this.setState({
                    data:[result.data]
                })
            }
            else {
                this.setState({
                    data:result.data
                });
            }
        })
    };
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Grid container justify="center">
                    <MaterialTable
                        style={{width:'70%'}}
                        title="My equipment"
                        columns={this.state.columns}
                        data={this.state.data}
                        onRowClick={this.handleClickOpen}
                    />
                </Grid>
                <Dialog open={this.state.open} onClose={this.handleClose} ><GiveBack info = {this.state.current}/></Dialog>
            </div>
        );
    }
}

export default UserEquip