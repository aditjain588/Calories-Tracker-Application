import React from "react"; 
import '../Styles/NutrientsInfoStyle.css'

class NutrientsInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            foodItem: this.props.FoodItem,
            quantity: this.props.Quantity,
            totalConsumedCalories: 0,
            CaloriesDisplay: '',
            errorMessage: '',
            ifError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchCall = this.fetchCall.bind(this)
        this.nutrientsInfoList = []
        this.totalConsumedCalories = 0
      }

      // Call to Edanum food api to get nutrition info of a food item entered by user
      fetchCall = async (that) => {
        let cal, carbs, protein, sugar = 0
        await fetch(`http://localhost:8080/getNutritionData/${this.props.FoodItem}/${this.props.Quantity}`)
         .then(response => {
             return response.json()
         })
         .then(data => {
            cal = JSON.parse(data.FoodCaloriesRoute).calories
            if(cal !== 0){
              carbs = JSON.parse(data.FoodCaloriesRoute).totalNutrients.CHOCDF.quantity
              protein = JSON.parse(data.FoodCaloriesRoute).totalNutrients.PROCNT.quantity
              sugar = JSON.parse(data.FoodCaloriesRoute).totalNutrients.SUGAR.quantity
            }  
         },
         (error) => {
             console.log("Error occured", error)
         })

         return {"cal": cal, "carbs": carbs, "protein": protein, "sugar": sugar}
      }

      handleSubmit = async () => {

        // render an error on UI if food item not provided
        if(this.props.FoodItem === ''){
          this.setState({
            ifError: true,
            errorMessage: "Food consumed cannot be empty"
          })
        }

        // render an error on UI if quantity not provided
        else if(this.props.Quantity === ''){
          this.setState({
            ifError: true,
            errorMessage: "Quantity cannot be empty"
          })
        }

        else{
            const nutrientInfoObj = await this.fetchCall(this)
            console.log(nutrientInfoObj)

            // render an error on UI if food item not found
            if(nutrientInfoObj.cal === 0){
              this.setState({
                ifError: true,
                errorMessage: "Food consumed not found, try again"
              })
              }

            else{
              this.setState({
                ifError: false,
                errorMessage: ''
              })

              // list for food items along with nutrition info, rendered on UI
              this.nutrientsInfoList.push({
                  foodItem: this.props.FoodItem,
                  quantity: this.props.Quantity,
                  calories: Math.ceil(nutrientInfoObj.cal),
                  carbohydrates: Math.ceil(nutrientInfoObj.carbs),
                  protein: Math.ceil(nutrientInfoObj.protein),
                  sugar: Math.ceil(nutrientInfoObj.sugar)
              })
      
              this.totalConsumedCalories = this.totalConsumedCalories + Math.ceil(nutrientInfoObj.cal)
              
              // Tell the user if he/she is ahead or behind his/her calories goal
              if(this.totalConsumedCalories > this.props.TotalCaloriesGoal){ 
                this.setState({
                  CaloriesDisplay: `You are ahead on your goal by ${this.totalConsumedCalories - this.props.TotalCaloriesGoal}`
                })
              }
              
              else{
                this.setState({
                  CaloriesDisplay: `You are behind on your goal by ${this.props.TotalCaloriesGoal - this.totalConsumedCalories}`
                })
              }  
            }
          }
            this.forceUpdate()
     }

    render(){ 
        return ( 
                <div>
                  <button type="submit" value="Submit" className = "foodConsumedSubmitBtn" onClick={this.handleSubmit}>Submit</button>
                  {this.state.ifError ? <p className="nutrientsInfoErrorMsg" >{this.state.errorMessage}</p> : null}
                  <table className="NutrientsTable">
                    <tbody>
                        <tr>
                        <th>Food Item</th>
                        <th>Quantity</th>
                        <th>Total Calories</th>
                        <th>Carbohydrates</th>
                        <th>Protein</th>
                        <th>Sugar</th>
                        <th></th>
                        <th></th>
                        </tr>
                        {this.nutrientsInfoList.map((val, key) => {
                        return (
                            <tr key={key}>
                            <td>{val.foodItem}</td>
                            <td>{val.quantity}</td>  
                            <td>{val.calories}</td>
                            <td>{val.carbohydrates}</td>
                            <td>{val.protein}</td>
                            <td>{val.sugar}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                  </table>
                  <div>
                    
                      <p>{this.state.CaloriesDisplay}</p>
                  </div>
                </div>
              );        
    }
}

export default NutrientsInfo;