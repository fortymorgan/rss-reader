import React from 'react';
import cn from 'classnames';
import { reduxForm, Field } from 'redux-form';
import isInputValid from '../validator';

class InputForm extends React.Component {
  validate = (value, list) => {
    const { validateInput, rejectInput } = this.props;

    if (isInputValid(value, list)) {
      validateInput();
    } else {
      rejectInput();
    }
  }

  onAdd = (values) => {
    const { validInput, addNewFeed, nextId } = this.props;

    return validInput && addNewFeed(values.feed, nextId);
  }

  onInput = (e) => {
    const { feedsList } = this.props;

    this.validate(e.target.value, feedsList);
  }

  onExample = (e) => {
    e.preventDefault();
    const { changeInput, feedsList } = this.props;
    changeInput(e.target.href);

    this.validate(e.target.href, feedsList);
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
