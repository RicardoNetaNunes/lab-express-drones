const DroneModel = require("../models/Drone.model");

const express = require('express');
const router = express.Router();

// require the Drone model here

router.get('/', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
DroneModel.find()
.then((drones) => {

res.render("list.hbs", {drones});
})

.catch(() => {
  console.log('There is no drone in our page.')
  next('Drone list not found.')
})
});

router.get('/', (req, res, next) => {

DroneModel.find()
.then((drones) => {

res.render("list.hbs", {drones});
})

.catch(() => {
  console.log('There is no drone in our page.')
  next('Drone list not found.')
})
});


router.get('/drones/list', (req, res, next) => {
 
  res.render('drones/list.hbs')
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

router.get('/drone/:droneId', (req, res, next) => {
  const {droneId} = req.params

  DroneModel.findById(droneId)
      .then((drone) => {
          res.render('drones/update-form.hbs', {drone})
      })
      .catch(() => {
          next('Single drone fetch failed')
      })
  
});

router.get('/drones/:droneId/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  
  const {droneId} = req.params

  DroneModel.findById(droneId)
      .then((drone) => {
          res.render('/drones/update-form.hbs', {drone})
      })
      .catch(() => {
          next('Not catching drone')
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
          next('Drone not done')
      })

});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
