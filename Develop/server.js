const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const db = require("./models");

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


db.Workout.create({ name: ""})
  .then(dbWorkout => { 
    console.log(dbWorkout);
  })
  .catch(({ message }) => { 
    console.log(message);
  });


app.post("/", ({ body }, res) => { 
  db.exercise.create(body)
  .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id} }, { new: true }))
  .then(dbWorkout => { 
    res.json(dbWorkout);
  })
  .catch(err => { 
    res.json(err);
  })
})


app.get('/exercise', (req, res) => { 
  res.redirect('exercise.html');
});


app.get('/exercise/:id', (req, res) => { 
  res.redirect('exercise.html');
});


app.get('/stats', (req, res) => { 
  res.redirect('stats.html');
});


app.get('/api/workouts', (req, res) => { 
  db.Workout.find()
  .then(results => res.json(results))
});


app.post('/api/workouts', (req, res) => { 
  db.Workout.create({})
  .then(dbWorkout => { 
    res.json(dbWorkout);
  })
  .catch(err => { 
    res.json(err);
  });

})

app.put('/api/workouts/:id', (req, res) => { 
  db.Workout.findByIdAndUpdate(req.params.id, {$push:{exercises:req.body}},{new: true, runValidators:true})
  .then(dbWorkout => { 
    console.log(dbWorkout)
    res.json(dbWorkout);
  })
  .catch(err => { 
    res.json(err);
  });
})


app.get('/api/workouts/range', (req, res) => { 
  db.Workout.find({})
  .then(dbWorkout => { 
    res.json(dbWorkout);
  })
  .catch(err => { 
    res.json(err);
  })
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });