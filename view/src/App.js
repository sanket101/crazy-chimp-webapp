import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home';
import ProductList from './pages/product-list/product-list';
import ProductDetails from './pages/product-details/product-details';
import Cart from './pages/cart/cart';
import Checkout from './pages/checkout/checkout';
import './App.css';


function App() {
  return (
    <Router>
        <div className="container">
          <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/shop" component={ProductList} />
              <Route exact path="/product" component={ProductDetails} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/" component={Home} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
