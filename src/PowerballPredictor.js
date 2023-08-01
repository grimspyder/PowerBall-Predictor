import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PowerballPredictor.css';

const PowerballPredictor = () => {
  const [dream, setDream] = useState('');
  const [name, setName] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [error, setError] = useState(null);

  const calculateDreamPrediction = () => {
    const dreamLength = dream.length;
    const nameLength = name.length;

    // Check for divide by zero error
    if (nameLength === 0) {
      return null;
    }

    // Return the calculated Dream Prediction
    return dreamLength / nameLength;
  };

  const generateLuckyNumbers = () => {
    const dreamPrediction = calculateDreamPrediction();
    if (dreamPrediction === null) {
      setError('Invalid inputs! Cannot divide by zero.');
      return;
    }

    try {
      let mainNumbers = [];

      // Instead of generating all at once, generate and check for uniqueness
      while (mainNumbers.length < 5) {
        let num = Math.floor(Math.random() * 69) + 1;
        num = Math.floor(num + dreamPrediction) % 70;
        if (!mainNumbers.includes(num)) {
          mainNumbers.push(num);
        }
      }

      let powerballNumber = Math.floor(Math.random() * 26) + 1;
      powerballNumber = (Math.floor(powerballNumber + dreamPrediction) % 27); 

      setGeneratedNumbers({
        mainNumbers,
        powerballNumber
      });
      setError(null);
    } catch (error) {
      console.error('Error generating lucky numbers:', error);
      setGeneratedNumbers([]);
      setError('Error generating lucky numbers. Please try again.');
    }
  };

  return (
    <div>
      
      <Container>
      <Row>
        <Col><h1>Powerball Predictor</h1></Col>
      </Row>
      <Row> 
        <Col><textarea
        className='name-box'
        type="text" 
        placeholder="Enter your name..." 
        value={name} 
        onChange={(e) => setName(e.target.value)}/>
      </Col>
        <Col><textarea 
        className='dream-box'
        type="text" 
        placeholder="Enter your dream..." 
        value={dream}       
        onChange={(e) => {
          setDream(e.target.value);
          // Make the textarea resize to fit content
          e.target.style.height = 'inherit';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        style={{overflow: 'hidden'}}
      />
      </Col>
        </Row>        
    </Container>
      
     
      

      <button onClick={generateLuckyNumbers}>Generate Lucky Numbers</button>
      {error && <p className="error">{error}</p>}
      {generatedNumbers.mainNumbers && generatedNumbers.mainNumbers.length > 0 && (
        <div className="numbers-box">
          <h2>Generated Lucky Numbers:</h2>
          <p>Main Numbers: {generatedNumbers.mainNumbers.join(', ')}</p>
          <p>Powerball Number: {generatedNumbers.powerballNumber}</p>
        </div>
      )}
    </div>
  );
};

export default PowerballPredictor;