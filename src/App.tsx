import { useState } from 'react';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import Form from 'components/Form';
import FormData from 'models/FormData';
import Header from 'components/Header';
import ResultData, { ResultType } from 'models/ResultData';
import Result from 'components/Result';
import Footer from 'components/Footer';

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
  const [result, setResult] = useState<ResultData>({
    type: ResultType.Size,
    lineLingth: 0,
    lineSize: 0,
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#009688',
      },
    },
  });

  const handleSubmit = (formData: FormData): void => {
    const lineLength = parseInput(formData.lineLength);
    const lineSize = parseInput(formData.lineSize);
    const desiredLineLength = parseInput(formData.desiredLineLength);
    const desiredLineSize = parseInput(formData.desiredLineSize);

    if (isNaN(desiredLineLength)) {
      const length = getLineLength(lineLength, lineSize, desiredLineSize);

      setResult({
        type: ResultType.Length,
        lineLingth: length,
        lineSize: desiredLineSize,
      });
    }

    if (isNaN(desiredLineSize)) {
      const size = getLineSize(lineLength, lineSize, desiredLineLength);

      setResult({
        type: ResultType.Size,
        lineLingth: desiredLineLength,
        lineSize: size,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <Container maxWidth="sm">
          <Form onSubmit={handleSubmit} />
          <Result result={result} />
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
