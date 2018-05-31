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
    ],
    nextID: 5
  }

  addItem = () => {
    let { items, nextID } = this.state;
    console.log('adding item');
    this.setState({
      items: [...items, { id: nextID, name: 'new item' }],
      nextID: nextID + 1
    });
  }

  removeItem = (id) => {
    console.log('removing', id);
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    });
  }

  render() {
    return (
      <ListContext.Provider
        value={{
          items: this.state.items,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}>
        { this.props.children }
      </ListContext.Provider>
    )
  }
}

export default ListContext;
