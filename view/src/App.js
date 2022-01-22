import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home';
import ProductList from './pages/product-list/product-list';
import ProductDetails from './pages/product-details/product-details';
import Cart from './pages/cart/cart';
import Checkout from './pages/checkout/checkout';
import TnCPage from './pages/static-pages/tnc';
import PrivacyPolicyPage from './pages/static-pages/privacy-policy';
import TechincalErrorPage from './pages/static-pages/error';
import Account from './pages/account/account';
import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import AdminPanel from './pages/admin-panel/admin-panel';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Signika',
      'sans-serif'
    ].join(','),
},});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <div className="container">
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/shop" component={ProductList} />
                <Route exact path="/product" component={ProductDetails} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/tnc" component={TnCPage} />
                <Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
                <Route exact path="/error" component={TechincalErrorPage} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/admin-panel" component={AdminPanel} />
                <Route exact path="/" component={Home} />
            </Switch>
          </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
