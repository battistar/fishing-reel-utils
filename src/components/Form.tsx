import React, { useCallback, useState } from 'react';
import { Button, Divider, InputAdornment, Stack, TextField } from '@mui/material';
import { Replay as ReplayIcon, Calculate as CalculateIcon } from '@mui/icons-material';

const validateInput = (input: string): boolean => {
  const regex = /^$|^\d{1,3}([.,]\d{0,3})?$/;

  if (regex.test(input)) {
    return true;
  }

  return false;
};

const parseInput = (input: string): number => {
  const normalizedInput = input.replace(',', '.');

  return parseFloat(normalizedInput);
};

interface FormProps {
  onSubmit: (
    lineLength: number,
    lineSize: number,
    desiredLineLength: number | null,
    desiredLineSize: number | null
  ) => void;
}

const Form = ({ onSubmit }: FormProps): JSX.Element => {
  const [formData, setFormData] = useState({
    lineLength: '',
    lineSize: '',
    desiredLineLength: '',
    desiredLineSize: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const lineLength = parseInput(formData.lineLength);
    const lineSize = parseInput(formData.lineSize);
    const desiredLineLength = parseInput(formData.desiredLineLength) || null;
    const desiredLineSize = parseInput(formData.desiredLineSize) || null;

    onSubmit(lineLength, lineSize, desiredLineLength, desiredLineSize);
  };

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    if (!validateInput(value)) {
      return;
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }, []);

  const handleResetClick = useCallback((): void => {
    setFormData({
      lineLength: '',
      lineSize: '',
      desiredLineLength: '',
      desiredLineSize: '',
    });
  }, []);

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <TextField
        label="Line length"
        placeholder="E.g. 250"
        helperText="Line length reported on fishing reel spool"
        InputProps={{
          endAdornment: <InputAdornment position="end">m</InputAdornment>,
        }}
        inputProps={{
          type: 'text',
          inputMode: 'decimal',
        }}
        name="lineLength"
        value={formData.lineLength}
        onChange={handleChange}
      />
      <TextField
        label="Line size"
        placeholder="E.g. 0.20"
        helperText="Line size reported on fishing reel spool"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
        inputProps={{
          type: 'text',
          inputMode: 'decimal',
        }}
        name="lineSize"
        value={formData.lineSize}
        onChange={handleChange}
      />
      <Divider />
      <TextField
        label="Desired line length"
        placeholder="E.g. 200"
        InputProps={{
          endAdornment: <InputAdornment position="end">m</InputAdornment>,
        }}
        inputProps={{
          type: 'text',
          inputMode: 'decimal',
        }}
        name="desiredLineLength"
        value={formData.desiredLineLength}
        onChange={handleChange}
        disabled={formData.lineLength !== '' && formData.lineSize !== '' && formData.desiredLineSize !== ''}
      />
      <Divider>OR</Divider>
      <TextField
        label="Desired line size"
        placeholder="E.g. 0.18"
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
        inputProps={{
          type: 'text',
          inputMode: 'decimal',
        }}
        name="desiredLineSize"
        value={formData.desiredLineSize}
        onChange={handleChange}
        disabled={formData.lineLength !== '' && formData.lineSize !== '' && formData.desiredLineLength !== ''}
      />
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="contained"
          startIcon={<ReplayIcon />}
          onClick={handleResetClick}
          disabled={
            formData.lineLength === '' &&
            formData.lineSize === '' &&
            formData.desiredLineLength === '' &&
            formData.desiredLineSize === ''
          }
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<CalculateIcon />}
          type="submit"
          disabled={
            formData.lineLength === '' ||
            formData.lineSize === '' ||
            (formData.desiredLineLength === '' && formData.desiredLineSize === '')
          }
        >
          Calculate
        </Button>
      </Stack>
    </Stack>
  );
};

export default Form;
