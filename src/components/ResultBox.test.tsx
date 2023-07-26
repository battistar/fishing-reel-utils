import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultBox, { ResultType } from './ResultBox';
import * as reactDeviceDetect from 'react-device-detect';

test('renders result box by size', () => {
  render(<ResultBox result={{ type: ResultType.Size, lineLingth: 0, lineSize: 0 }} />);

  const lineLengthLabelElement = screen.getByText('0 m');
  expect(lineLengthLabelElement).toBeInTheDocument();
  expect(lineLengthLabelElement).toHaveStyle({ 'font-size': '1.25rem' });

  const lineSizeLabelElement = screen.getByText('0.000 ⌀');
  expect(lineSizeLabelElement).toBeInTheDocument();
  expect(lineSizeLabelElement).toHaveStyle({ 'font-size': '2.125rem' });

  const copyButtonElement = screen.getByLabelText('Copy');
  expect(copyButtonElement).toBeInTheDocument();
});

test('renders result box by length', () => {
  render(<ResultBox result={{ type: ResultType.Length, lineLingth: 0, lineSize: 0 }} />);

  const lineLengthLabelElement = screen.getByText('0 m');
  expect(lineLengthLabelElement).toBeInTheDocument();
  expect(lineLengthLabelElement).toHaveStyle({ 'font-size': '2.125rem' });

  const lineSizeLabelElement = screen.getByText('0.000 ⌀');
  expect(lineSizeLabelElement).toBeInTheDocument();
  expect(lineSizeLabelElement).toHaveStyle({ 'font-size': '1.25rem' });

  const copyButtonElement = screen.getByLabelText('Copy');
  expect(copyButtonElement).toBeInTheDocument();
});

test('copies result to clipboard', async () => {
  const user = userEvent.setup();

  render(<ResultBox result={{ type: ResultType.Length, lineLingth: 200, lineSize: 0.2 }} />);

  const copyButtonElement = screen.getByLabelText('Copy');
  await user.click(copyButtonElement);
  const clipboardText = await navigator.clipboard.readText();
  expect(clipboardText).toBe('200 m - 0.200 ⌀');

  const snackbarElement = screen.getByText('Result copied to clipboard');
  expect(snackbarElement).toBeInTheDocument();
});

test('checks share button exists in mobile version', async () => {
  Object.defineProperty(reactDeviceDetect, 'isMobile', { get: () => true });

  render(<ResultBox result={{ type: ResultType.Length, lineLingth: 200, lineSize: 0.2 }} />);

  const shareButtonElement = screen.getByLabelText('Share');
  expect(shareButtonElement).toBeInTheDocument();
});
