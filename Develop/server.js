const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const app = express();

const Schema = mongoose.Schema;
const db = require("./models");

app.use(logger("dev"));

// db.on("error", error => {
//     console.log("Database Error:", error);
// });

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true }); 

// const workoutModel = mongoose.model('Workout', workoutSchema);

////////////////

///////////////

db.Workout.create({ name: ""})
    .then(dbWorkout => {
        console.log(dbWorkout);
    })
    .catch(({ message }) => {
        console.log(message);
    });

app.post("/", ({ body }, res) => {
    db.exercise.create(body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err =>{
        res.json(err);
    });
});
app.get("/api/workouts", (req, res)=>{
    db.workout.find()
    .then(results => res.json(results))
})

app.get("/exercise", (req,res)=>{
    res.sendFile(path.json(__dirname, "./public/exercise.html"));
});

app.post("/api/workouts", (req, res)=>{
    db.workout.create({})
    .then(dbWorkout =>{
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
})

app.put("/api/workouts/:id",(req, res)=>{
    db.workout.findByIdAndUpdate(req.params.id, {$push: {exercises:req.body}}, {new:true, runValidators:true})
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err =>{
        res.json(err);
    });
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});
app.get("/api/workouts/range", (req, res)=>{
    db.workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err =>{
        res.json(err);
    });
})

app.listen(PORT, () =>{
    console.log("App running on port ${PORT}!");
});


////////////////////////////////////////////////OLD CODE

// const workoutSchema = new Schema({
//     type: String,
//     name: String,
//     distance: Number,
//     duration: Number,
//     weight: Number,
//     sets: Number,
//     reps: Number
// });

// const workout = new workoutModel();

// workout.type = 'cardio';
// workout.name = 'Alex';
// workout.distance = 1000;
// workout.duration = 2000;
// workout.sets = 100;
// workout.reps = 1000;
// workout.save();

// const workouts = workoutModel.find({type: 'cardio'});
// console.log('workouts', workouts);
// workoutModel.find((err, res) => {
//     console.log('workouts', res);
// });

// app.get('/', (req, res) => {

// });

// app.get('/exercise', (req, res) => {
//     res.redirect('exercise.html');
// });

// app.get('/exercise/:id', (req, res) => {
//     res.redirect('exercise.html');
// });

// app.get('/stats', (req, res) => {
//     res.redirect('stats.html');
// });

// app.get('/api/workouts', (req, res) => {
//     db.workouts.find().sort({'day': -1}).limit(1, (err, found) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('found', found );

//         found.forEach(x => {
//             const date = new Date(x.day);
//             console.log('x.id, x.date', x._id, date);
//         });

//         console.log('exercises', found[0].exercises);

//         const workout = new workoutModel();

//         workout.type = found[0].exercises.type;
//         workout.name = found[0].exercises.name;
//         workout.distance = found[0].exercises.distance;
//         workout.duration = found[0].exercises.duration;
//         workout.sets = found[0].exercises.sets;
//         workout.reps = found[0].exercises.reps;
//         res.json(workout);        

        // res.json(found[0].exercises);
    // });
    // workoutModel.find({}).sort({'day': -1}).limit(1).
    // console.log('data', data);
    // res.send(workoutModel.find({}).sort({'day': -1}).limit(1));
// });

// app.listen(PORT, () => {
//     console.log(`App running on port ${PORT}!`);
// });
  