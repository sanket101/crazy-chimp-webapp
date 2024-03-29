import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
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
import RefundReturnCancellationPolicyPage from './pages/static-pages/refund-return-cancellation-policy';
import Account from './pages/account/account';
import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import AdminPanel from './pages/admin-panel/admin-panel';
import Gallery from './pages/gallery/gallery';
import ResetPassword from './pages/reset-password/reset-password';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Signika',
      'sans-serif'
    ].join(','),
},});

const App = () => {

  const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
  );

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
                <Route exact path="/gallery" component={Gallery} />
                <Route exact path="/return-policy" component={RefundReturnCancellationPolicyPage} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/" component={Home} />
            </Switch>
          </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
