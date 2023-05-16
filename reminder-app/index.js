document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let taskName = document.getElementById('taskName').value;
    let taskTime = document.getElementById('taskTime').value;
  
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: taskName, time: taskTime })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      updateTaskList();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  
  function updateTaskList() {
    fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
      let taskListElement = document.getElementById('taskList');
      taskListElement.innerHTML = '';
  
      for(let task of tasks) {
        let taskElement = document.createElement('div');
        taskElement.textContent = `${task.name} - ${task.time.toLocaleString()}`;
        taskListElement.appendChild(taskElement);
      }
    });
  }
  
  updateTaskList();  // Call it once initially to display existing tasks
  