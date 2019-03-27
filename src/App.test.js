import React from 'react';
import App from './App';

import { render, fireEvent,getAllByTestId, getByTestId, cleanup } from 'react-testing-library';

describe('App test suite', () => {
  const wrapper = render(<App />)
  const { getByText, getByTestId } = wrapper;

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('generates number when the generate number button is clicked', () => {
    const generateNumberButton = getByText('Generate Numbers');
    const numbersListSection = getByTestId('number-list-section');
    fireEvent.click(generateNumberButton);

    expect(numbersListSection).toBeTruthy();
  });

  it('shows the maximum number when the max button is clicked', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const maxButton = getByText('max');
    const number = getByTestId('number');
    fireEvent.click(maxButton);

    expect(number).toBeTruthy();
  });

  it('shows the minimum number when the min button is clicked', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const minButton = getByText('min');
    const number = getByTestId('number');
    fireEvent.click(minButton);

    expect(number).toBeTruthy();
  });

  it('sorts numbers when the select value is changed to ascending', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const numbersListSection = getByTestId('number-list-section');

    const selectDropdown = getByTestId('select');
    fireEvent.change(selectDropdown, { target: { value: 'ascending' }})

    expect(numbersListSection).toBeTruthy();
  });

  it('sorts numbers when the select value is changed to descending', () => {
    const generateNumberButton = getByText('Generate Numbers');
    fireEvent.click(generateNumberButton);
    const numbersListSection = getByTestId('number-list-section');

    const selectDropdown = getByTestId('select');
    fireEvent.change(selectDropdown, { target: { value: 'descending' }})

    expect(numbersListSection).toBeTruthy();
  });
});
