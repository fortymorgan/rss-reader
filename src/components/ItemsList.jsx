import React from 'react';

const ListItem = props => (
  <li className="list-group-item">
    <a href={props.item.link} className="list-group-item-action flex-column align-items-start" rel="noopener noreferrer" target="_blank">
      <h5 className="mb-1">{props.item.title}</h5>
      <p className="mb-1">{props.item.description}</p>
    </a>
  </li>
);

const ItemsList = props => (
  <ul className="list-group">
    {props.itemsList.map(item => <ListItem key={item.link} item={item}/>)}
  </ul>
);

export default ItemsList;
