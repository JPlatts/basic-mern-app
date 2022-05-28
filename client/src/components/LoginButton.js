import React from 'react'; // get the React object from the react module

class LoginButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        }
    }
    login = (e) => {
        this.setState({isAuthenticated:true});
    }
    logout = (e) => {
        this.setState({isAuthenticated:false});
    }

    render() {
        let loginButton =  <button className='btn btn-primary' onClick={(e) => this.login(e)}> Log In</button>;
        let logoutButton =  <button className='btn btn-primary' onClick={(e) => this.logout(e)} > Log Out</button>;
        return this.state.isAuthenticated ? logoutButton : loginButton;
    }
}

export default LoginButton;