import React from 'react';
import './App.css';
import Pages from './Pages';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { getPersistor } from './store/Store'; // Adjust the import path
import store from './store/Store'; // Adjust the import path

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={getPersistor()}>
        <div>
          <Pages />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
