import React, { Component } from 'react';
import ErrorButton from '../error-button/error-button';
import './item-details.css';

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

class ItemDetails extends Component {
  constructor() {
    super();

    this.state = {
      item: null,
      loading: true,
      image: null,
    };
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({ loading: true });

    getData(itemId).then((item) => {
      this.setState({ item, loading: false, image: getImageUrl(item) });
    });
  }

  render() {
    const { item, image } = this.state;

    if (!item) {
      return <span>Select a person from a list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="item" />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

export default ItemDetails;
