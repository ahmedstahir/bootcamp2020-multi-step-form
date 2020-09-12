import React from 'react';
import Grid from '@material-ui/core/Grid';
import HeaderBar from './components/HeaderBar'
import MainBody from './components/MainBody'
import 'typeface-roboto';

function App() {
  return (
    <Grid container spacing={0} xs={12}>
        <Grid item xs={12}>
              <HeaderBar />
              <MainBody />
        </Grid>
    </Grid>
  );
}

export default App;
