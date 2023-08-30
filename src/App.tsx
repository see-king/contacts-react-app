import React from 'react';
import './App.scss';
import Main from './components/system/main';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </  Provider>
    </div>
  );
}

export default App;
