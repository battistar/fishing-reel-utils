import { Box, Typography } from '@mui/material';

const BUILD_YEAR = 2023;
const CURRENT_YEAR = new Date().getFullYear();

const Footer = (): JSX.Element => {
  let date;
  if (BUILD_YEAR !== CURRENT_YEAR) {
    date = `${BUILD_YEAR} - ${CURRENT_YEAR}`;
  } else {
    date = `${CURRENT_YEAR}`;
  }

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        p: 1,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.common.white,
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Typography variant="body2">© {date} Samuele Battistella</Typography>
    </Box>
  );
};

export default Footer;
