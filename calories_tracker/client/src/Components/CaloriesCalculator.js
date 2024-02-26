import React from "react";
import NutrientsInfo from "./NutrientsInfo";
import ("../Styles/CaloriesCalculatorStyle.css")

class CaloriesCalculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            foodConsumed: '',
            Quantity: ''
        }

        this.handleFoodConsumedChange = this.handleFoodConsumedChange.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
    }
    
    handleFoodConsumedChange(e){
        this.setState({foodConsumed: e.target.value})
    }

    handleQuantityChange(e){
        this.setState({Quantity: e.target.value})
    }


    render(){
        return (
            <div className="caloriesCalculator">
                <h3 className="calorieGoalHeader">Calories goal for the day: {this.props.caloriesGoal}</h3>

                <label className = "foodConsumed">
                    Food consumed: 
                    <input type="text" value={this.state.foodConsumed} onChange={this.handleFoodConsumedChange} />
                </label>

                <label className = "quantity">
                    Quantity: 
                    <input type="text" value={this.state.quantity} onChange={this.handleQuantityChange} />
                </label>
                <NutrientsInfo TotalCaloriesGoal = {this.props.caloriesGoal} FoodItem = {this.state.foodConsumed} Quantity = {this.state.Quantity}/>
                
            </div>
        )
    }
}

export default CaloriesCalculator;