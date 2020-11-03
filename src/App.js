import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <Layout>
      <Route path="/checkout" component={Checkout} />
      <Route path="/" exact component={BurgerBuilder} />
    </Layout>
  );
}

export default App;
