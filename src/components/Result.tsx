import { Box, IconButton, Snackbar, Stack, styled, Tooltip, Typography } from '@mui/material';
import { ContentCopy as CopyIcon, Share as ShareIcon, Close as CloseIcon } from '@mui/icons-material';
import ResultData, { ResultType } from 'models/ResultData';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

interface ResultProps {
  result: ResultData;
}

const StyledBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    justify-content: center; 
    align-items: center;
    padding: ${theme.spacing(8)} 0px;
`
);

const Result = (props: ResultProps): JSX.Element => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const lineLength = props.result.lineLingth.toFixed(3);
  const lineSize = props.result.lineSize.toFixed(3);

  const handleCopyClick = (): void => {
    navigator.clipboard.writeText(`${lineLength} mm - ${lineSize} ⌀`);

    setOpenSnackbar(true);
  };

  const handleShareClick = async (): Promise<void> => {
    if (navigator.share) {
      const data = {
        title: 'Fishing Reel Utils Web App',
        text: `Your fishing reel spool can contain ${lineLength} m of line sizes ${lineSize} ⌀`,
      };

      try {
        await navigator.share(data);
      } catch (error) {
        console.error('Sharing failed', error);
      }
    } else {
      console.warn(`Your system doesn't support sharing files.`);
    }
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <StyledBox>
        <Stack spacing={2}>
          {props.result.type === ResultType.Size ? (
            <Stack alignItems="center">
              <Typography variant="h6" component="span">{`${lineLength} mm`}</Typography>
              <Typography variant="h4" component="span">
                {`${lineSize} ⌀`}
              </Typography>
            </Stack>
          ) : (
            <Stack alignItems="center">
              <Typography variant="h6" component="span">{`${lineSize} ⌀`}</Typography>
              <Typography variant="h4" component="span">
                {`${lineLength} mm`}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="center">
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={handleCopyClick}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
            {isMobile && (
              <Tooltip title="Share" placement="top">
                <IconButton onClick={handleShareClick}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </StyledBox>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6_000}
        onClose={handleCloseSnackbar}
        message="Result copied to clipboard"
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default Result;
