import { styled, Typography } from '@mui/material';

const BUILD_YEAR = 2023;
const CURRENT_YEAR = new Date().getFullYear();

const CustomizedFooter = styled('footer')(
  ({ theme }) => `
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: ${theme.spacing(1)};
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.common.white};
    display: flex;
    justify-content: flex-start
`
);

const Footer = (): JSX.Element => {
  let date;
  if (BUILD_YEAR !== CURRENT_YEAR) {
    date = `${BUILD_YEAR} - ${CURRENT_YEAR}`;
  } else {
    date = `${CURRENT_YEAR}`;
  }

  return (
    <CustomizedFooter>
      <Typography variant="body2">© {date} Samuele Battistella</Typography>
    </CustomizedFooter>
  );
};

export default Footer;
