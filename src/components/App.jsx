import React from 'react';
import InputFormContainer from '../containers/InputForm';
import FeedsList from '../containers/FeedsList';
import ErrorsContainer from '../containers/Errors';

const App = () => (
  <div className="jumbotron">
    <h1 className="display-4">RSS reader</h1>
    <InputFormContainer />
    <hr className="my-4" />
    <ErrorsContainer />
    <FeedsList />
  </div>
);

export default App;
