import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import ItemsList from './ItemsList.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.collapsed = true;
  }

  render() {
    const { feed, items, remove } = this.props;

    const { title, id } = feed;

    return (
      <div className="card" id={`card${id}`} ref={(div) => { this.card = div; }}>
        <div className="card-header" id={`heading${id}`} data-toggle="collapse" data-target={`#collapse${id}`} aria-expanded="true" aria-controls={`collapse${id}`}>
          {this.collapsed ?
            <FontAwesomeIcon icon="chevron-down" /> :
            <FontAwesomeIcon icon="chevron-up" />
          }
          <span className="pl-3">{title}</span>
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
  }

  componentDidMount() {
    const { feed: { id } } = this.props;

    $(`#card${id}`).on('show.bs.collapse', () => { this.collapsed = false; });
    $(`#card${id}`).on('hide.bs.collapse', () => { this.collapsed = true; });
  }
}

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
