import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = (): JSX.Element => {
  return (
    <AppBar component="header" position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6">Fishing reel utils</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
