const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const databaseUrl = 'workout';
const collections = ['workouts'];
const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const workoutSchema = new Schema({
    type: String,
    name: String,
    distance: Number,
    duration: Number,
    weight: Number,
    sets: Number,
    reps: Number
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

const workoutModel = mongoose.model('Workout', workoutSchema);


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

app.get('/', (req, res) => {

});

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
    db.workouts.find().sort({'day': -1}).limit(1, (err, found) => {
        if (err) {
            console.log(err);
        }
        console.log('found', found );

        found.forEach(x => {
            const date = new Date(x.day);
            console.log('x.id, x.date', x._id, date);
        });

        console.log('exercises', found[0].exercises);

        const workout = new workoutModel();

        workout.type = found[0].exercises.type;
        workout.name = found[0].exercises.name;
        workout.distance = found[0].exercises.distance;
        workout.duration = found[0].exercises.duration;
        workout.sets = found[0].exercises.sets;
        workout.reps = found[0].exercises.reps;
        res.json(workout);        

        // res.json(found[0].exercises);
    });
    // workoutModel.find({}).sort({'day': -1}).limit(1).
    // console.log('data', data);
    // res.send(workoutModel.find({}).sort({'day': -1}).limit(1));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
  