import React from 'react';

const ListContext = React.createContext()

export const ListConsumer = ListContext.Consumer;

export class ListProvider extends React.Component {
  state = {
    items: [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
      { id: 4, name: 'cat' },
    ]
  }

  addItem = () => {
    let { items } = this.state;
    let nextID = (Math.max(0, ...items.map(i => i.id))) + 1;
    console.log('adding item');
    this.setState({
      items: [...items, { id: nextID, name: 'new item' }]
    });
  }

  removeItem = (id) => {
    console.log('removing', id);
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    });
  }

  render() {
    console.log('render')
    return (
      <ListContext.Provider
        value={ Object.assign(this.state, this) }>
        { this.props.children }
      </ListContext.Provider>
    )
  }
}

export default ListContext;
