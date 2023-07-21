import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('calculates line size by desired line length', () => {
  render(<App />);

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  const calculateButtonElement = screen.getByText('Calculate');

  fireEvent.change(lineLengthInputElement, { target: { value: '250' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '0.20' } });
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '200' } });

  fireEvent.click(calculateButtonElement);

  expect(screen.getByText('200 m')).toBeInTheDocument();
  expect(screen.getByText('0.224 ⌀')).toBeInTheDocument();
});

test('calculates line size by desired line size', () => {
  render(<App />);

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');
  const calculateButtonElement = screen.getByText('Calculate');

  fireEvent.change(lineLengthInputElement, { target: { value: '250' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '0.20' } });
  fireEvent.change(desiredLineSizeInputElement, { target: { value: '0.18' } });

  fireEvent.click(calculateButtonElement);

  expect(screen.getByText('309 m')).toBeInTheDocument();
  expect(screen.getByText('0.180 ⌀')).toBeInTheDocument();
});
