import { getFeedsList, toLocalStorage } from './storage';

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

  clearItemsToRender() {
    this.toRender.items = [];
  }

  clearErrors() {
    this.errors = [];
  }

  addToFeedsList(url) {
    this.feedsList.push({ url });
    toLocalStorage('feeds', this.feedsList);
  }

  addFeedToRender(url) {
    this.toRender.feeds.push({ url });
  }

  addItemsToRender(items) {
    this.toRender.items.push(...items);
  }

  checkRenderedItems() {
    this.rendered.items.push(...this.toRender.items);
    this.clearItemsToRender();
  }

  updateFeedsList(feedsList) {
    this.feedsList = feedsList;
    toLocalStorage('feeds', this.feedsList);
  }

  checkError(url) {
    this.errors.push(url);
  }

  checkRenderedFeed(feed) {
    this.rendered.feeds.push(feed);
  }
}
