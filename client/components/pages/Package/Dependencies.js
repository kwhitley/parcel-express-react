import React from 'react'
import { Grid, Message } from 'semantic-ui-react'
import List from './List'

export default ({ deps, devDeps }) =>
  <Message positive>
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <List name="Dependencies" libs={deps} />
        </Grid.Column>
        <Grid.Column>
          <List name="Dev. Dependencies" libs={devDeps} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Message>
