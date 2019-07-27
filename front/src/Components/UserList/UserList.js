import React from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import * as crud from '../Requests/requests'
import Dialog from "@material-ui/core/Dialog";
import UserInfo from "./UserInfo";


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email'},
                { title: 'Phone', field: 'phone'},
                { title: 'Date', field:'date'},
                {title:'Admin',field:'admin',type:'boolean'}
            ],
            data: [],
            current:{},
            open:false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        crud.get('/showAllUsers').then(result=>{
            this.setState({
                data:result.data
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
        crud.get('/showAllUsers').then(result=>{
            this.setState({
                data:result.data
            })
        })
    };
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Grid container justify="center">
                    <MaterialTable
                        style={{width:'70%'}}
                        title="User list"
                        columns={this.state.columns}
                        data={this.state.data}
                        onRowClick={this.handleClickOpen}
                    />
                </Grid>
                <Dialog open={this.state.open} onClose={this.handleClose} ><UserInfo content = {this.state.current}/></Dialog>
            </div>
        );
    }
}

export default UserList