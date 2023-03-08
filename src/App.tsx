import { useCallback, useState } from 'react';
import { Box, Container, createTheme, ThemeProvider } from '@mui/material';
import Form from 'components/Form';
import Header from 'components/Header';
import ResultBox, { ResultData, ResultType } from 'components/ResultBox';
import Footer from 'components/Footer';

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

  const handleSubmit = useCallback(
    (lineLength: number, lineSize: number, desiredLineLength: number | null, desiredLineSize: number | null): void => {
      if (desiredLineSize) {
        const length = getLineLength(lineLength, lineSize, desiredLineSize);

        setResult({
          type: ResultType.Length,
          lineLingth: length,
          lineSize: desiredLineSize,
        });
      }

      if (desiredLineLength) {
        const size = getLineSize(lineLength, lineSize, desiredLineLength);

        setResult({
          type: ResultType.Size,
          lineLingth: desiredLineLength,
          lineSize: size,
        });
      }
    },
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Container component="main" maxWidth="sm" sx={{ flex: 1 }}>
          <Form onSubmit={handleSubmit} />
          <ResultBox result={result} />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
