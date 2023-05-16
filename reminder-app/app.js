const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const schedule = require('node-schedule');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));


let tasks = [];

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tasks', function (req, res) {
  res.json(tasks);
});

app.post('/tasks', function (req, res) {
  const task = req.body;
  tasks.push(task);

  schedule.scheduleJob(new Date(task.time), function(){
    console.log('Task reminder:', task.name);
  });

  res.json(task);
});

app.listen(3000, function () {
  console.log('App listening on port 3000');
});




// const express = require('express');
// const app = express();
// const cors = require('cors');
// const schedule = require('node-schedule');

// app.use(cors());

// let tasks = [];

// document.getElementById('taskForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   let taskName = document.getElementById('taskName').value;
//   let taskTime = new Date(document.getElementById('taskTime').value);

//   tasks.push({ name: taskName, time: taskTime });

//   updateTaskList();
// });

// function updateTaskList() {
//   let taskListElement = document.getElementById('taskList');
//   taskListElement.innerHTML = '';

//   for(let task of tasks) {
//     let taskElement = document.createElement('div');
//     taskElement.textContent = `${task.name} - ${task.time.toLocaleString()}`;
//     taskListElement.appendChild(taskElement);
//   }
// }

// setInterval(function() {
//   let now = new Date();

//   for(let task of tasks) {
//     if(now >= task.time) {
//       alert(`Task reminder: ${task.name}`);
//     }
//   }

//   // Remove tasks that have been reminded
//   tasks = tasks.filter(task => now < task.time);
  
//   updateTaskList();
// }, 60000); // Check every minute

// app.use(express.json());

// app.get('/tasks', function (req, res) {
//   res.json(tasks);
// });

// app.post('/tasks', function (req, res) {
//   const task = req.body;
//   tasks.push(task);
  
//   schedule.scheduleJob(task.time, function(){
//     console.log('Task reminder:', task.name);
//   });
  
//   res.json(task);
// });


// app.listen(3000, function () {
//   console.log('App listening on port 3000');
// });
