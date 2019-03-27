import React, { useState } from 'react';

import generatePhoneNumber from './generatePhoneNumber';

import numbers from './numbers.json';

const GenerateInputField = ({ handleChange }) => (
  <div className="gen-input-section">
    <input
      className="gen-input"
      placeholder="how many numbers, default is 25, max is 5000"
      type="number"
      onChange={event => handleChange(event.target.value)}
    />
  </div>
);

const ActionSection = ({ amountOfNumbers, generateNumber }) => (
  <div className="action-section">
    <button
      className="input gen-numbers"
      onClick={() => generateNumber(amountOfNumbers || 25)}>
      Generate Numbers
    </button>
    <a className="input download-numbers" href={`data:text/plain;charset=utf-8,${numbers.allNumbers}`}  download="numbers.txt">
      <button>download numbers</button>
    </a>
  </div>
);

const NumberListActions = ({ findMax, findMin, sort }) => (
  <div className="number-list-action-section">
    <div className="sort-action">
      <label className="sort-label">sort: </label>
      <select onChange={sort} data-testid="select">
        <option value="">select order</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </div>
    <div className="max-btn-section">
      <button onClick={findMax}>max</button>
    </div>
    <div className="min-btn-section">
      <button onClick={findMin}>min</button>
    </div>
  </div>
);

const NumberList = ({ numbers }) => (
  <div className="number-list" data-testid="number-list-section">
    {numbers.map(number => (
      <div className="number" data-testid="number" key={number}>
        {number}
      </div>
    ))}
  </div>
);

const GenerateNumbers = () => {
  const [allNumbers, setAllNumbers] = useState({ order: '', numbers: [] });
  const [amountOfNumbers, setAmountOfNumbers] = useState(0);

  const generateNumber = amount => {
    let totalNumbers = [];
    const newAmount = amount < 5000 ? amount : 5000;
    for (let i = 0; i < newAmount; i = i + 1) {
      totalNumbers = [...totalNumbers, `0${generatePhoneNumber()}`];
    }
    numbers.allNumbers = totalNumbers;
    setAllNumbers({ numbers: totalNumbers });
  };

  const findMax = () => {
    let max = numbers.allNumbers[0];
    numbers.allNumbers.forEach((number) => {
      max = number > max ? number : max;
    })
    setAllNumbers({ numbers: [max] });
  }

  const findMin = () => {
    let min = numbers.allNumbers[0];
    numbers.allNumbers.forEach((number) => {
      min = number < min ? number : min;
    })
    setAllNumbers({ numbers: [min] });
  }

  const sort = ({ target: { value }}) => {
    let newArrangement = numbers.allNumbers;
    const newOrder = value || '';
    if (value === 'ascending') {
      newArrangement = numbers.allNumbers.sort((a, b) => a - b);
    }
    if (value === 'descending') {
      newArrangement = numbers.allNumbers.sort((a, b) => b - a);
    }
    setAllNumbers({ order: newOrder, numbers: newArrangement });
  }

  return (
    <div className="generate-number-section">
      <GenerateInputField handleChange={setAmountOfNumbers} />
      <ActionSection
        amountOfNumbers={amountOfNumbers}
        generateNumber={generateNumber}
      />
      {allNumbers.numbers.length > 0 && <NumberListActions findMax={findMax} findMin={findMin} sort={sort} />}
      <NumberList numbers={allNumbers.numbers} />
    </div>
  );
};

export default GenerateNumbers;
