import { getFeedsList } from './storage';

export default class State {
  constructor() {
    this.feedsList = getFeedsList();
    this.validInput = false;
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

  clearFeedsList() {
    this.feedsList = [];
  }
}
