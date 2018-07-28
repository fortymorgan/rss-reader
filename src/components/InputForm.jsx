import React from 'react';
import cn from 'classnames';
import { reduxForm, Field } from 'redux-form';
import isInputValid from '../validator';

class InputForm extends React.Component {
  onAdd = (values) => {
    const { validInput, addNewFeed, nextId } = this.props;

    return validInput && addNewFeed(values.feed, nextId);
  }

  onInput = (e) => {
    console.log(e);
    const { validateInput, rejectInput, feedsList } = this.props;

    if (isInputValid(e.target.value, feedsList)) {
      validateInput();
    } else {
      rejectInput();
    }
  }

  onExample = (e) => {
    e.preventDefault();
    const {
      changeInput,
      feedsList,
      validateInput,
      rejectInput,
    } = this.props;
    changeInput(e.target.href);

    if (isInputValid(e.target.href, feedsList)) {
      validateInput();
    } else {
      rejectInput();
    }
  }

  render() {
    const { validInput, submitting, dirty } = this.props;
    const inputClassName = cn({
      'form-control': true,
      'is-invalid': !validInput && dirty,
    });

    return (
      <form onSubmit={this.props.handleSubmit(this.onAdd)}>
        <div className="form-group">
          <Field type="text" name="feed" component="input" className={inputClassName} onChange={this.onInput} placeholder="Add new RSS feed URL here..." autoFocus />
        </div>
        <p>Enter URL with RSS feed, for example <a className="example" href="http://rss.cnn.com/rss/edition.rss" data-toggle="tooltip" data-placement="right" title="Click to add to input" onClick={this.onExample}>http://rss.cnn.com/rss/edition.rss</a></p>
        <button type="submit" className="btn btn-primary" disabled={submitting}>Add</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'feed',
})(InputForm);
