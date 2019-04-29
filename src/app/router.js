// import external modules
import React, {Component, Suspense, lazy} from 'react';
import {Router as BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Spinner from '../components/spinner/spinner';

// import internal(own) modules
import MainLayoutRoutes from '../layouts/routes/mainRoutes';
import FullPageLayoutRoute from '../layouts/routes/fullpageRoutes';
import ErrorLayoutRoute from '../layouts/routes/errorRoutes';

import history from '../redux/storeConfig/history';

// Main Layout
const LazyBrokerDashboard = lazy(() => import('../containers/dashboard'));
const LazyProfile = lazy(() => import('../containers/profile'));
const LazyLogin = lazy(() => import('../containers/login'));
const LazyRegister = lazy(() => import('../containers/register'));


// Error Pages
const LazyErrorPage = lazy(() => import('../views/pages/error'));


class Router extends Component {

  render() {
    return (
      // Set the directory path if you are deplying in sub-folder
      <BrowserRouter basename="/" history={history} >
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect
                to={{
                  pathname: '/dashboard'
                }}
              />
            )}
            {...this.props}
          >
          </Route>
          <FullPageLayoutRoute
            exact
            path="/signin"
            render={(matchprops) => (
              <Suspense fallback={<Spinner/>}>
                <LazyLogin {...matchprops} />
              </Suspense>
            )}
          />
          <FullPageLayoutRoute
            exact
            path="/register"
            render={(matchprops) => (
              <Suspense fallback={<Spinner/>}>
                <LazyRegister {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/dashboard"
            render={(matchprops) => (
              <Suspense fallback={<Spinner/>}>
                <LazyBrokerDashboard {...matchprops} />
              </Suspense>
            )}
            {...this.props}
          />
          <MainLayoutRoutes
            exact
            path="/profile"
            render={(matchprops) => (
              <Suspense fallback={<Spinner/>}>
                <LazyProfile {...matchprops} />
              </Suspense>
            )}
            {...this.props}
          />
          <ErrorLayoutRoute
            exact
            path="/pages/error"
            render={(matchprops) => (
              <Suspense fallback={<Spinner/>}>
                <LazyErrorPage {...matchprops} />
              </Suspense>
            )}
          />

          <ErrorLayoutRoute
            render={(matchprops) => (
              <Suspense fallback={<Spinner/>}>
                <LazyErrorPage {...matchprops} />
              </Suspense>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
