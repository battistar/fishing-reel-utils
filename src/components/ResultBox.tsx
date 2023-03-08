import { IconButton, Snackbar, Stack, Tooltip, Typography } from '@mui/material';
import { ContentCopy as CopyIcon, Share as ShareIcon, Close as CloseIcon } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';

export enum ResultType {
  Length,
  Size,
}

export interface ResultData {
  type: ResultType;
  lineLingth: number;
  lineSize: number;
}

const ResultBox = ({ result }: { result: ResultData }): JSX.Element => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const lineLength = result.lineLingth.toFixed(0);
  const lineSize = result.lineSize.toFixed(3);

  const handleCopyClick = useCallback((): void => {
    navigator.clipboard.writeText(`${lineLength} m - ${lineSize} ⌀`);

    setOpenSnackbar(true);
  }, [lineLength, lineSize]);

  const handleShareClick = useCallback(async (): Promise<void> => {
    if (navigator.share) {
      const data = {
        title: 'Fishing Reel Utils',
        text: `Your fishing reel spool can contain ${lineLength} m of line size ${lineSize} ⌀. Check other results on https://battistar.github.io/fishing-reel-utils/`,
      };

      try {
        await navigator.share(data);
      } catch (error) {
        console.error('Sharing failed', error);
      }
    } else {
      console.warn(`Your system doesn't support sharing.`);
    }
  }, [lineLength, lineSize]);

  const handleCloseSnackbar = useCallback((event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8,
        }}
      >
        {result.type === ResultType.Size ? (
          <Stack alignItems="center">
            <Typography variant="h6" component="span">{`${lineLength} m`}</Typography>
            <Typography variant="h4" component="span">
              {`${lineSize} ⌀`}
            </Typography>
          </Stack>
        ) : (
          <Stack alignItems="center">
            <Typography variant="h6" component="span">{`${lineSize} ⌀`}</Typography>
            <Typography variant="h4" component="span">
              {`${lineLength} m`}
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

export default ResultBox;
