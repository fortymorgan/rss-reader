import React from 'react';
import ItemsList from './ItemsList.jsx';

const Feed = (props) => {
  const { feed, items, remove } = props;

  const { title, id } = feed;

  return (
    <div className="card">
      <div className="card-header" id={`heading${id}`} data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="true" aria-controls={`collapse${id}`}>
        {title}
        <button type="button" className="close" onClick={remove}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id={`collapse${id}`} className="collapse" aria-labelledby={`heading${id}`} data-parent="#accordion">
        <div className="card-body">
          <ItemsList itemsList={items} />
        </div>
      </div>
    </div>
  );
};

export default class FeedsList extends React.Component {
  onRemove = id => () => {
    const { removeFeed } = this.props;
    removeFeed(id);
  }

  render() {
    const { feedsList, itemsList } = this.props;
    return (
      <div className="accordion" id="accordion">
        {feedsList.map(feed =>
          <Feed
            key={feed.id}
            feed={feed}
            remove={this.onRemove(feed.id)}
            items={itemsList.filter(item => item.feedId === feed.id)}
          />)}
      </div>
    );
  }
}
