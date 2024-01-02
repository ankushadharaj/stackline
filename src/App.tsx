import React from 'react';
import { Provider } from 'react-redux';

import ProductSalesDetails  from './Pages/ProductSalesDetails/ProductSalesDetails';
import Header from './Components/Header/Header';
import { store } from './ReduxStore/rootReducer';

import './App.css';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Header />
          <ProductSalesDetails />
      </Provider>
    </div>
  );
}

export default App;
