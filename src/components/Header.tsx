import { AppBar, styled, Toolbar, Typography } from '@mui/material';

const CustomizedHeader = styled('header')(
  ({ theme }) => `
  margin-bottom: ${theme.spacing(2)};
`
);

const Header = (): JSX.Element => {
  return (
    <CustomizedHeader>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fishing reel utils</Typography>
        </Toolbar>
      </AppBar>
    </CustomizedHeader>
  );
};

export default Header;
