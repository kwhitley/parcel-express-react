import { fromJS, Record, List } from 'immutable'

// initial state for reducer
export const Group = new Record({
  id: undefined,
  path: ['Assets', 'Region 1', 'Pumps'],
  name: 'New Group',
  parent: undefined,
  tags: new List()
})

// initial state for reducer
export const Tag = new Record({
  id: undefined,
  name: 'New Tag',
})

export const GroupedTag = new Record({
  id: undefined,
  name: 'New Grouped Tag'
})

// initial state for reducer
export default {
  Group, Tag, GroupedTag
}
