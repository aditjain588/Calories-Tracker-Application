import React from "react";
import CaloriesCalculator from './CaloriesCalculator';
import ("../Styles/CaloriesGoalStyle.css")

class CaloriesGoal extends React.Component{
    constructor(props){
        super(props)
        this.state = {totalCaloriesGoal: 0,
                      error: '',
                      caloriesGoalVisible: true}

        this.handleTotalCaloriesChange = this.handleTotalCaloriesChange.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }

    handleTotalCaloriesChange = (e) => {
        this.setState({totalCaloriesGoal: e.target.value})
    }
    
    handleNext = (e) => {
        e.preventDefault()

        // render an error on UI calories are 0
        if(this.state.totalCaloriesGoal === 0){
            this.setState({error: 'Calories needs to be more then 0'})
        }
        else{
            this.setState({caloriesGoalVisible: false})
        }
        
    }

    render(){

        // After calories are entered and are more then 0, render CaloriesCalculator.js compoenent
        if(!this.state.caloriesGoalVisible){
            return (
                <CaloriesCalculator caloriesGoal={this.state.totalCaloriesGoal}/>
            )
        }
        return (
            <div>
                <h2 className="welcomeHeader">Welcome {this.props.username}</h2>
                <label className="caloriesGoalLabel">
                    Enter total calories goal for the day: 
                    <input  className = "totalCaloriesGoal" type="number" value={this.state.totalCaloriesGoal} onChange={this.handleTotalCaloriesChange} />
                </label>
                <br/>
                <input type="submit" value="Click to go to calorie calculator" className = "calorieGoalSubmitBtn" onClick={this.handleNext}/>
                {this.state.error !== '' ? (<p className="totalCaloriesError">{this.state.error}</p>): null}
            </div>
        )
    }
}

export default CaloriesGoal;