import React from "react";
import CaloriesGoal from './CaloriesGoal';
import ("../Styles/CreateAccountStyle.css")

class CreateAccount extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: '',
            errorMessage: '',
            ifError: false,
            isCreateAccPageVis: true
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e){
        this.setState({name: e.target.value})
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }

    handleUsernameChange(e){
        this.setState({username: e.target.value})
    }

    handleConfirmPasswordChange(e){
        this.setState({confirmPassword: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()

        // render an error on UI if name not provided
        if(this.state.name.length === 0){
            this.setState({
                errorMessage: 'Name length cannot be 0',
                ifError: true
            })
        }

        // render an error on UI if username not provided
        else if(this.state.username.length === 0){
            this.setState({
                errorMessage: 'Username length cannot be 0',
                ifError: true
            })
        }

        // render an error on UI if password not provided
        else if(this.state.password.length < 7){
            this.setState({
                errorMessage: 'Password length cannot be less then 7',
                ifError: true
        })
        }

        // render an error on UI if password and confirm password do not match
        else if(this.state.password !== this.state.confirmPassword){
            this.setState({
                errorMessage: 'Password and confirm password does not match',
                ifError: true
            })
        }

        // Add the new user to database
        else{
            fetch('http://localhost:8080/users',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "name": this.state.name,
                    "username": this.state.username,
                    "password": this.state.password
                })
            })

            this.setState ({
                isCreateAccPageVis: false
            })
        }
    }

    render(){
        // After succesfull account creation render CaloriesGoal.js component
        if (!this.state.isCreateAccPageVis){
            return (
                <CaloriesGoal username = {this.state.username} />
            )
        }

        // form for account creation
        return (
            <form className="createAccForm" onSubmit={this.handleSubmit}>
                <label className = "name">
                    Name
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>

                <label className = "username">
                    Username
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                </label>

                <label className = "password">
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                
                <label className = "password">
                    Confirm password:
                    <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
                </label>

                
                <button className="createAccSubmitBtn" type="submit" onClick={this.handleSubmit}>Submit</button>
                {this.state.ifError ? (<p className="loginError">{this.state.errorMessage}</p>): null}
            </form>
        )
    }
}

export default CreateAccount