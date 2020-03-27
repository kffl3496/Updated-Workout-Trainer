const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [{
            type: {
                type: String,
                trim: true,
                require: "Please enter a type!"
            },
            name: {
                type: String,
                trim: true,
                require: "Please enter a name!"
            },
            weight: {
                types: Number
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            duration: {
                type: Number,
                required:"Please enter the exercise length!"
            },
            distance: {
                type: Number
            }    
        }
    ]
},
    {
        toJSON: {
        virtuals: true
    }
}
);

WorkoutSchema.virtual("totalDuration").get(function(){
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});


const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;

////////////////////////////
// type: String,
// name: String,
// distance: Number,
// duration: Number,
// weight: Number,
// sets: Number,
// reps: Number