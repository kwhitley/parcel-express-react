import React from 'react';
import { Grid } from 'semantic-ui-react';
import List from './List';
import { ListProvider } from './ListContext';

export default () =>
  <Grid>
    <Grid.Row>
      <Grid.Column width={4} textAlign="right">
        <ListProvider>
          <List />
        </ListProvider>
      </Grid.Column>
    </Grid.Row>
  </Grid>
