const request = require('request');
const express = require('express')
const router = new express.Router()

const FoodCaloriesRoute = (foodItem, quantity, callback) => {
    const options = {
        method: 'GET',
        url: `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data`,
        qs: {ingr: `${quantity} ${foodItem}`},
        headers: {
          'X-RapidAPI-Key': 'e5f90df495msh8ef8b2e2f50b548p17f2f4jsn4663cc79a36e',
          'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
        }
      };
      
      request(options, function (error, response, body) {
          if (error){
            callback('Unable to connect', undefined)
          }
          else{
            callback(undefined, response.body)
          }
          console.log(body);
      });
}

router.get('/getNutritionData/:FoodItem/:Quantity', (req, res) => {
  FoodCaloriesRoute(req.params.FoodItem, req.params.Quantity, (err, nutritionData) => {
    if(err){
      return res.send({err})
    }
    res.send({FoodCaloriesRoute: nutritionData})
  })

})

module.exports = router;