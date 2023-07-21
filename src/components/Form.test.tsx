import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('renders form', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const lineLengthInputElement = screen.getByLabelText('Line length');
  expect(lineLengthInputElement).toBeInTheDocument();
  expect(lineLengthInputElement).toBeEnabled();

  const lineSizeInputElement = screen.getByLabelText('Line size');
  expect(lineSizeInputElement).toBeInTheDocument();
  expect(lineSizeInputElement).toBeEnabled();

  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  expect(desiredLineLengthInputElement).toBeInTheDocument();
  expect(desiredLineLengthInputElement).toBeEnabled();

  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');
  expect(desiredLineSizeInputElement).toBeInTheDocument();
  expect(desiredLineSizeInputElement).toBeEnabled();

  const resetButtonElement = screen.getByText('Reset');
  expect(resetButtonElement).toBeInTheDocument();
  expect(resetButtonElement).toBeDisabled();

  const submitButtonElement = screen.getByText('Calculate');
  expect(submitButtonElement).toBeInTheDocument();
  expect(submitButtonElement).toBeDisabled();
});

test('validates input', () => {
  const validInputs = ['100,100', '100.111'];
  const invalidInputs = ['1000,100', '100.1000', 'abc'];

  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const lineLengthInputElement = screen.getByLabelText('Line length') as HTMLInputElement;
  const lineSizeInputElement = screen.getByLabelText('Line size') as HTMLInputElement;
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length') as HTMLInputElement;
  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size') as HTMLInputElement;

  for (const input of validInputs) {
    fireEvent.change(lineLengthInputElement, { target: { value: input } });
    expect(lineLengthInputElement.value).toBe(input);

    fireEvent.change(lineSizeInputElement, { target: { value: input } });
    expect(lineSizeInputElement.value).toBe(input);

    fireEvent.change(desiredLineLengthInputElement, { target: { value: input } });
    expect(desiredLineLengthInputElement.value).toBe(input);

    fireEvent.change(desiredLineSizeInputElement, { target: { value: input } });
    expect(desiredLineSizeInputElement.value).toBe(input);
  }

  for (const input of invalidInputs) {
    fireEvent.change(lineLengthInputElement, { target: { value: input } });
    expect(lineLengthInputElement.value).not.toBe(input);

    fireEvent.change(lineSizeInputElement, { target: { value: input } });
    expect(lineSizeInputElement.value).not.toBe(input);

    fireEvent.change(desiredLineLengthInputElement, { target: { value: input } });
    expect(desiredLineLengthInputElement.value).not.toBe(input);

    fireEvent.change(desiredLineSizeInputElement, { target: { value: input } });
    expect(desiredLineSizeInputElement.value).not.toBe(input);
  }
});

test('activates reset button', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const resetButtonElement = screen.getByText('Reset');

  const lineLengthInputElement = screen.getByLabelText('Line length');
  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  expect(resetButtonElement).toBeEnabled();
  fireEvent.change(lineLengthInputElement, { target: { value: '' } });
  expect(resetButtonElement).toBeDisabled();

  const lineSizeInputElement = screen.getByLabelText('Line size');
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  expect(resetButtonElement).toBeEnabled();
  fireEvent.change(lineSizeInputElement, { target: { value: '' } });
  expect(resetButtonElement).toBeDisabled();

  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '1' } });
  expect(resetButtonElement).toBeEnabled();
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '' } });
  expect(resetButtonElement).toBeDisabled();

  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');
  fireEvent.change(desiredLineSizeInputElement, { target: { value: '1' } });
  expect(resetButtonElement).toBeEnabled();
  fireEvent.change(desiredLineSizeInputElement, { target: { value: '' } });
  expect(resetButtonElement).toBeDisabled();
});

test('resets form', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const resetButtonElement = screen.getByText('Reset');

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');

  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineSizeInputElement, { target: { value: '1' } });

  fireEvent.click(resetButtonElement);

  expect(lineLengthInputElement).toHaveValue('');
  expect(lineSizeInputElement).toHaveValue('');
  expect(desiredLineLengthInputElement).toHaveValue('');
  expect(desiredLineSizeInputElement).toHaveValue('');
});

test('disabled desired line size input', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');

  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '1' } });

  expect(desiredLineSizeInputElement).toBeDisabled();
});

test('disabled desired line length input', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');

  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineSizeInputElement, { target: { value: '1' } });

  expect(desiredLineLengthInputElement).toBeDisabled();
});

test('activates calculate button', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const calculateButtonElement = screen.getByText('Calculate');

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');
  const desiredLineSizeInputElement = screen.getByLabelText('Desired line size');

  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '1' } });

  expect(calculateButtonElement).toBeEnabled();

  fireEvent.change(lineLengthInputElement, { target: { value: '' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '' } });
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '' } });

  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineSizeInputElement, { target: { value: '1' } });

  expect(calculateButtonElement).toBeEnabled();
});

test('submits form', () => {
  const onSubmit = jest.fn();
  render(<Form onSubmit={onSubmit} />);

  const calculateButtonElement = screen.getByText('Calculate');

  const lineLengthInputElement = screen.getByLabelText('Line length');
  const lineSizeInputElement = screen.getByLabelText('Line size');
  const desiredLineLengthInputElement = screen.getByLabelText('Desired line length');

  fireEvent.change(lineLengthInputElement, { target: { value: '1' } });
  fireEvent.change(lineSizeInputElement, { target: { value: '1' } });
  fireEvent.change(desiredLineLengthInputElement, { target: { value: '1' } });

  fireEvent.click(calculateButtonElement);

  expect(onSubmit).toBeCalled();
});
