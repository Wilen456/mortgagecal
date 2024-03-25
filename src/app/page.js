'use client'
import React, { useState } from 'react';

export default function Home() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  function handleInputChange(event, type) {
    const value = event.target.value;
    if (type === 'principal') {
      setPrincipal(value);
    } else if (type === 'interestRate') {
      setInterestRate(value);
    } else if (type === 'loanTerm') {
      setLoanTerm(value);
    }
  }

  function handleCalculate() {
    // Validation checks
    if (!principal || principal <= 0) {
      alert('Please enter a positive principal amount.');
      return;
    }
    if (!interestRate || interestRate <= 0) {
      alert('Please enter a positive interest rate.');
      return;
    }
    if (!loanTerm || loanTerm <= 0) {
      alert('Please enter a positive loan term.');
      return;
    }

    const monthlyPayment = calculatePayment(principal, interestRate, loanTerm);
    alert(`Monthly Payment: ${monthlyPayment}`);
  }

  function calculatePayment(principal, yearlyInterestRate, termInYears) {
    const principalFloat = parseFloat(principal);
    const monthlyInterestRate = yearlyInterestRate / 100 / 12;
    const numberOfPayments = termInYears * 12;

    const monthlyPayment =
      principalFloat * monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    return monthlyPayment ? monthlyPayment.toFixed(2) : '0.00';
  }

  return (
    <div style={styles.container}>
      <div style={styles.calculatorContainer}>
        <input
          style={styles.input}
          type="number"
          min="0.01"
          value={principal}
          onChange={(e) => handleInputChange(e, 'principal')}
          placeholder="Principal Amount"
        />
        <input
          style={styles.input}
          type="number"
          min="0.01"
          value={interestRate}
          onChange={(e) => handleInputChange(e, 'interestRate')}
          placeholder="Interest Rate (annual %)"
        />
        <input
          style={styles.input}
          type="number"
          min="1"
          value={loanTerm}
          onChange={(e) => handleInputChange(e, 'loanTerm')}
          placeholder="Loan Term (in years)"
        />
        <button style={styles.button} onClick={handleCalculate}>Calculate</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  calculatorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: 'black', // Ensures text color is black
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  },
};

export const config = { runtime: 'client' };
