import React from "react";
import CaloriesGoal from './CaloriesGoal';
import CreateAccount from "./CreateAccount";
import ("../Styles/LoginStyle.css")

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            ifError: false,
            loginPageVis: true,
            createAccPageVis: false
        }
        
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createHandler = this.createHandler.bind(this);
    }

    handleUsernameChange(e){
        this.setState({username: e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }

    createHandler(){
        this.setState({createAccPageVis: true,
                      loginPageVis: false})
    }
    
    handleSubmit(event){
        event.preventDefault()

        // render an error on UI if username not provided
        if(this.state.username.length === 0){
            this.setState({error: 'username not provided'})
            this.setState({ifError: true})
        }

        // render an error on UI if password not provided
        else if(this.state.password.length === 0){
            this.setState({error: 'password not provided'})
            this.setState({ifError: true})
        }

        // checks if the user exists in the database
        else{
                fetch('http://localhost:8080/users/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password
                })
                }).then ((res) => {
                    if(res.status === 400){
                        this.setState({loginPageVis: true,
                                        ifError: true,
                                        error: "No user found with provided credentials"
                                        })  
                    }
                    else if(res.status === 200){
                        this.setState({loginPageVis: false}) 
                    }
                })
                    
        }
    }

    render(){
        // If clicked on Create account button, render CreateAccount.js
        if(this.state.createAccPageVis && !this.state.loginPageVis){
            return (
                <CreateAccount />
            )
        }

        // if succesfull login take to CaloriesGoal.js component
        else if(!this.state.loginPageVis){
            return (
                <CaloriesGoal username = {this.state.username} />
            )
        }
        return(
            // Form for login page
            <form className="submitForm" onSubmit={this.handleSubmit}>
                <label className = "username">
                    Email:
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>

                <label className = "password">
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>

                <input type="submit" value="Submit" className = "submitButton"/>

                <button className = "createAccBtn" onClick = {this.createHandler}>Create account</button>
                {this.state.ifError ? (<p className="loginError">{this.state.error}</p>): null}
            </form>
        )
    }
}

export default Login;