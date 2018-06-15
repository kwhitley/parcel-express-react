import { fromJS, Record } from 'immutable'
import { automap } from 'redux-automap'
import { createSelector } from 'reselect'
import { Group, Tag, GroupedTag } from './dashboards.models'

export const namespace = 'dashboards'

const getTags = state => state.get('tags')
const getGroups = state => state.get('groups')
const findTag = (state, id) => state
                                .get('tags')
                                .find(tag => tag.get('id') === id)
const findGroup = (state, id) => state
                                .get('groups')
                                .find(group => group.get('id') === id)
const getLastId = items => items.maxBy(i => i.get('id')).get('id')
const getLastTagID = createSelector(getTags, getLastId)
const getLastGroupID = createSelector(getGroups, getLastId)

export const selectors = {
  getTags, findTag
}

// initial state for reducer
export const initialState = fromJS({
  tags: [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' },
    { id: 4, name: 'cat' },
    { id: 5, name: 'miffles' },
    { id: 6, name: 'vlad' },
    { id: 7, name: 'baxter' },
  ],
  groups: [
    new Group({ id: 1, name: 'First Group' })
  ]
})

// define all action/reducer pairs here... add "type" attributes for
export const actionReducers = [
  {
    addGroup: (name, parent) => ({ type: 'list/ADD_GROUP', name, parent }),
    reducer: (state, action) => {
      let nextID = getLastGroupID(state) + 1

      return state.update('groups', groups => groups.push(
        new Group({ id: nextID, name: action.name, parent: action.parent })
      ))
    }
  },
  {
    addTagToGroup: (tagID, groupID) => ({ type: 'list/ADD_TAG_TO_GROUP', tagID, groupID }),
    reducer: (state, action) => {
      let tag = findTag(state, action.tagID)
      let matchedGroup = findGroup(state, action.groupID)

      console.log('matched tag', tag.toJS())
      console.log('matched group', matchedGroup.toJS())

      if (!tag) {
        throw new Error(`no tag found with id=${tagID}`, action)
        return state
      }

      if (!matchedGroup) {
        throw new Error(`no group found with id=${groupID}`, action)
        return state
      }

      return state
              .update('groups',
                groups => groups.map(
                  group => group === matchedGroup
                            ? group.update('tags', tags => tags.push(new GroupedTag({ id: tag.get('id'), name: tag.get('name') })))
                            : group
                )
              )
    }
  },
]

export default automap({ namespace, actionReducers, initialState, selectors })
