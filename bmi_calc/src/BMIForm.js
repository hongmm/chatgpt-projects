import React, { useState, useEffect } from 'react';

const BMIForm = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (bmi < 18.5) {
      setMessage('You are underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setMessage('You are normal weight');
    } else if (bmi >= 25 && bmi < 30) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  }, [bmi]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </label>
        <br />
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate BMI</button>
      </form>
      <p>BMI: {bmi}</p>
      <p>{message}</p>
    </div>
  );
};

export default BMIForm;
