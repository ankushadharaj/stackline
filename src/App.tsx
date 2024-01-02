import React from 'react';
import { Provider } from 'react-redux';

import ProductSalesDetails  from './Pages/ProductSalesDetails/ProductSalesDetails';
import { store } from './ReduxStore/rootReducer';

import './App.css';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <ProductSalesDetails />
      </Provider>
    </div>
  );
}

export default App;
