import { useState } from 'react';
import { Container } from '@mui/material';
import Form from 'components/Form';
import FormData from 'models/FormData';

const parseInput = (input: string): number => {
  const normalizedInput = input.replace(',', '.');

  return parseFloat(normalizedInput);
};

const getLineSize = (lineLength: number, lineSize: number, desiredLineLength: number): number => {
  return lineSize * Math.sqrt(lineLength / desiredLineLength);
};

const getLineLength = (lineLength: number, lineSize: number, desiredLineSize: number): number => {
  return Math.pow(lineSize / desiredLineSize, 2) * lineLength;
};

const App = (): JSX.Element => {
  const [result, setResult] = useState('');

  const handleSubmit = (formData: FormData): void => {
    const lineLength = parseInput(formData.lineLength);
    const lineSize = parseInput(formData.lineSize);
    const desiredLineLength = parseInput(formData.desiredLineLength);
    const desiredLineSize = parseInput(formData.desiredLineSize);

    if (isNaN(desiredLineLength)) {
      setResult(`${getLineLength(lineLength, lineSize, desiredLineSize).toFixed(3)} m`);
    }

    if (isNaN(desiredLineSize)) {
      setResult(`${getLineSize(lineLength, lineSize, desiredLineLength).toFixed(3)} ⌀`);
    }
  };

  console.log(result);

  return (
    <Container maxWidth="sm">
      <Form onSubmit={handleSubmit} />
    </Container>
  );
};

export default App;
