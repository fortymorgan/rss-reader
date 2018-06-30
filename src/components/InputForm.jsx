import React from 'react';
import cn from 'classnames';
import isInputValid from '../validator';

export default class InputForm extends React.Component {
  onAdd = (e) => {
    e.preventDefault();
    const { validInput, input, addNewFeed } = this.props;
    if (validInput) {
      addNewFeed(input);
    }
  }

  onInput = (e) => {
    const {
      changeInput,
      validateInput,
      rejectInput,
      feedsList,
    } = this.props;

    changeInput(e.target.value);

    if (isInputValid(e.target.value, feedsList)) {
      validateInput();
    } else {
      rejectInput();
    }
  }

  onExample = (e) => {
    e.preventDefault();
    const { changeInput, validateInput } = this.props;
    changeInput(e.target.href);
    validateInput();
  }

  render() {
    const { validInput, input } = this.props;
    const inputClassName = cn({
      'form-control': true,
      'is-invalid': !validInput && input !== '',
    });

    return (
      <form onSubmit={this.onAdd}>
        <div className="form-group">
          <input type="text" className={inputClassName} value={input} onChange={this.onInput} placeholder="Add new RSS feed URL here..." autoFocus />
        </div>
        <p>Enter URL with RSS feed, for example <a className="example" href="http://rss.cnn.com/rss/edition.rss" data-toggle="tooltip" data-placement="right" title="Click to add to input" onClick={this.onExample}>http://rss.cnn.com/rss/edition.rss</a></p>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}
