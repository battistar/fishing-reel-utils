import React, { useState } from 'react';
import { Button, Divider, InputAdornment, Stack, TextField } from '@mui/material';
import { Replay as ReplayIcon, Calculate as CalculateIcon } from '@mui/icons-material';
import FormData from 'models/FormData';

const formDataInitialState = {
  lineLength: '',
  lineSize: '',
  desiredLineLength: '',
  desiredLineSize: '',
};

const validateInput = (input: string): boolean => {
  const regex = /^$|^\d{1,3}([.,]\d{0,3})?$/;

  if (regex.test(input)) {
    return true;
  }

  return false;
};

interface FormProps {
  onSubmit: (formData: FormData) => void;
}

const Form = (props: FormProps): JSX.Element => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    props.onSubmit(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
  };

  const handleResetClick = (): void => {
    setFormData(formDataInitialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Line length"
          placeholder="E.g. 250"
          helperText="Line length reported on fishing reel spool"
          InputProps={{
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
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
          name="desiredLineLength"
          value={formData.desiredLineLength}
          onChange={handleChange}
        />
        <Divider>OR</Divider>
        <TextField
          label="Desired line size"
          placeholder="E.g. 0.18"
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
          name="desiredLineSize"
          value={formData.desiredLineSize}
          onChange={handleChange}
        />
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            startIcon={<ReplayIcon />}
            color="secondary"
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
    </form>
  );
};

export default Form;
