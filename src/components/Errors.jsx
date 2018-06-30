import React from 'react';

export default class Errors extends React.Component {
  onClose = error => () => {
    const { deleteError } = this.props;
    deleteError(error);
  }

  render() {
    const { errors } = this.props;

    return errors.map(error => (
      <div key={error}>
        Error while downloading {error}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.onClose(error)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    ));
  }
}
