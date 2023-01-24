import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Header = (): JSX.Element => {
  return (
    <header>
      <Box sx={{ marginBottom: (theme) => theme.spacing(2) }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Fishing reel utils</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
