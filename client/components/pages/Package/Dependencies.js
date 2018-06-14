import React from 'react'
import { Grid, Message } from 'semantic-ui-react'
import List from './List'

export default ({ deps, devDeps }) =>
  <Message>
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <List name="Dependencies" items={deps} />
        </Grid.Column>
        <Grid.Column>
          <List name="Dev. Dependencies" items={devDeps} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Message>
