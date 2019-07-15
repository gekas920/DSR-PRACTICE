import React from 'react'


class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    UNSAFE_componentWillMount() {

    }

    render() {
        return(
            <div>
                <h1>User Info</h1>
            </div>
        )
    }
}


export default User