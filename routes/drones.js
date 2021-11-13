const DroneModel = require("../models/Drone.model");

const express = require('express');
const router = express.Router();

// require the Drone model here

router.get('/', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here

});


router.get('/drones/list', (req, res, next) => {
  DroneModel.find()
  .then((drones) => {
  
  res.render("drones/list.hbs", {drones});
  })
  
  .catch(() => {
    console.log('There is no drone in our page.')
    next('Drone list not found.')
  })
});



router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form.hbs')

});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  console.log(  req.body )
  const {name, propellers, maxSpeed } = req.body
  DroneModel.create({name, propellers, maxSpeed})
      .then(() => {
          
          res.redirect('/')
      })
      .catch(() => {
          next('Drone creation failed')
      })

});



router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  
  const {droneId} = req.params

  DroneModel.findById(droneId)
      .then((drone) => {
          res.render('drones/update-form.hbs', {drone})
      })
      
      .catch(() => {
          next('Not seeing the drone')
      })

});

router.post('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body
  const {droneId} = req.params

 DroneModel.findByIdAndUpdate(droneId, {name, propellers, maxSpeed})
      .then(() => {
          res.redirect('/')
      })
      .catch(() => {
          next('Drone not updated')
      })

});

router.post('/drones/:droneId/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const {droneId} = req.params 
  DroneModel.findByIdAndRemove(droneId)
  .then(() => {
      res.redirect('/')
  })
  .catch(() => {
      next('Drone not deleted')
  })
});

module.exports = router;
