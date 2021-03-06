import React from 'react';
import PropTypes from 'prop-types';
import './item-list.css';

const ItemList = (props) => {
  const { data, onItemSelected, children: renderContent } = props;
  const items = data.map((item) => {
    const { id } = item;
    const content = renderContent(item); // Вывод информации внутри li списка

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {content}
      </li>
    );
  });
  return <ul className="item-list list-group">{items}</ul>;
};

ItemList.defaultProps = {
  onItemSelected: () => {},
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired,
};

export default ItemList;
