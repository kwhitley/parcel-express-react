import React from 'react'
import { Grid, Container, Sidebar, Segment, Menu, Card } from 'semantic-ui-react'
import GroupsNavigation from './GroupsNavigation'

const cards = Array(7).fill(0).map(i => ({ name: `Tag #${Math.random().toString().slice(0,6)}` }))

export const Groups = () => {
  return (
    <Grid divided>
      <Grid.Row>
        <Grid.Column width={4}>
          <GroupsNavigation />
        </Grid.Column>
        <Grid.Column width={12}>
          <Card.Group className="cards" itemsPerRow={3}>
            {
              cards.map(card =>
                <Card key={card.name} header={card.name} description={card.name} />
              )
            }
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Groups
