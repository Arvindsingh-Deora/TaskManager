// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Task title is required'],
//       trim: true,
//     },
//     priority: {
//       type: String,
//       required: [true, 'Task priority is required'],
//       enum: ['1', '2', '3', '4', '5'], // Assuming priority ranges from 1 (low) to 5 (high)
//     },
//     status: {
//       type: String,
//       required: [true, 'Task status is required'],
//       enum: ['Pending', 'Completed'],
//       default: 'Pending',
//     },
//     startTime: {
//       type: Date,
//       required: [true, 'Start time is required'],
//     },
//     endTime: {
//       type: Date,
//       validate: {
//         validator: function (value) {
//           return !value || value >= this.startTime; // Validate that endTime >= startTime
//         },
//         message: 'End time must be greater than or equal to start time',
//       },
//     },
//     totalTime: {
//       type: Number, // Store total time in minutes
//       default: 0,
//     },
//   },
//   { timestamps: true } // Automatically add createdAt and updatedAt fields
// );

// // Middleware to calculate `totalTime` before saving
// TaskSchema.pre('save', function (next) {
//   if (this.startTime && this.endTime) {
//     const diff = new Date(this.endTime) - new Date(this.startTime);
//     this.totalTime = Math.max(Math.round(diff / 1000 / 60), 0); // Convert to minutes and ensure non-negative
//   }
//   next();
// });

// // Middleware to update `totalTime` on task updates
// TaskSchema.pre('findOneAndUpdate', function (next) {
//   const update = this.getUpdate();

//   if (update.startTime && update.endTime) {
//     const diff = new Date(update.endTime) - new Date(update.startTime);
//     update.totalTime = Math.max(Math.round(diff / 1000 / 60), 0); // Convert to minutes and ensure non-negative
//     this.setUpdate(update);
//   }
//   next();
// });

// module.exports = mongoose.model('Task', TaskSchema);






// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   priority: { type: String, required: true },
//   status: { type: String, enum: ['Pending', 'Completed'], required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: false },
// });

// module.exports = mongoose.model('Task', TaskSchema);





// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'finished'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Task', TaskSchema);
