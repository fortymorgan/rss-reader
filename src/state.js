import { getFeedsList, toLocalStorage } from './storage';
import { renderFeeds, renderUpdates, renderErrors } from './render';

export default class State {
  constructor() {
    this.feedsList = getFeedsList();
    this.validInput = false;
    this.errors = [];
    this.rendered = {
      feeds: [],
      items: [],
    };
    this.toRender = {
      feeds: getFeedsList(),
      items: [],
    };
  }

  clearFeedsToRender() {
    this.toRender.feeds = [];
  }

  addToFeedsList(url) {
    this.feedsList.push({ url });
    toLocalStorage('feeds', this.feedsList);
  }

  addFeedToRender(url) {
    this.toRender.feeds.push({ url });
  }

  updateFeedsList(feedsList) {
    this.feedsList = feedsList;
    toLocalStorage('feeds', this.feedsList);
  }

  checkError(feed) {
    this.errors.push(feed);
    renderErrors(this);
    this.errors = [];
  }

  checkRenderedFeed(feed) {
    this.rendered.feeds.push(feed);
  }

  getNewItems(itemsData) {
    const renderedTitles = this.rendered.items.map(renderedItem => renderedItem.title);
    return itemsData.filter(item => !renderedTitles.includes(item.title));
  }

  addItemsFromUpdate(items) {
    this.addItemsWithRender(items, renderUpdates);
  }

  addItemsFromFeed(items) {
    this.addItemsWithRender(items, renderFeeds);
  }

  addItemsWithRender(items, renderer) {
    this.toRender.items.push(...items);
    renderer(this);
    this.rendered.items.push(...this.toRender.items);
    this.toRender.items = [];
  }
}
