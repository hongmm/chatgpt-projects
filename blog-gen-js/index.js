document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let blogTopic = document.getElementById('blogTopic').value;
  
    fetch('http://localhost:3000/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: blogTopic})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  