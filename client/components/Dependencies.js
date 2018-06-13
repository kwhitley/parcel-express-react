import React from 'react';
import { Grid } from 'semantic-ui-react';

export default ({ deps, devDeps }) =>
  <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column>
        <ul>
          {
            deps && Object.keys(deps).map(k => (
              <li key={k}>{ k }: { deps[k] }</li>
            ))
          }
        </ul>
      </Grid.Column>
    </Grid.Row>
  </Grid>
