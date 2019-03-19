import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddTrip from './components/add-credentials/AddTrip';
import Profiles from './components/profiles/Profiles';
import Groups from './components/groups/Groups';
import Group from './components/group/Group';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import personPost from './components/post/PersonPost';
import NotFound from './components/not-found/NotFound';
import personfeed from './components/posts/PersonPosts';
import Forgot from './components/dashboard/Forgot';
import EditTrip from './components/dashboard/EditTrip';
import Trip from './components/dashboard/Trip';
import './App.css';
import myProfile from './components/profile/myProfile';
import About from './components/profile/About';
import Trips from './components/profile/Trips';
import Wall from './components/profile/Wall';
import GroupWall from './components/group/Wall';
import GroupAbout from './components/group/About';
import GroupSettings from './components/group/GroupSettings';
import Calendar from './components/group/Calendar';
import GroupTrips from './components/group/Trips';
import CreateGroup from './components/create-group/CreateGroup';
import EditGroup from './components/group/EditGroup';
import GroupsLanding from './components/groups/GroupsLanding';
import SearchP from './components/search/searchP';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
/*
<Switch>
                <PrivateRoute exact path="/personfeed:handle" component={personfeed} />
              </Switch>
*/
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="main-container container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/group/:handle" component={Group} />
              
              <Switch>
                <PrivateRoute exact path="/personfeed/:handle" component={personfeed} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/edit-group/:handle" component={EditGroup} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/post/:handle/:id" component={personPost}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groups-landing" component={GroupsLanding} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/searchP/:searchString" component={SearchP}/>
              </Switch>

              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/create-group" component={CreateGroup} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/my-profile" component={myProfile} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/about/:handle" component={About} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupabout/:handle" component={GroupAbout} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupsettings/:handle" component={GroupSettings} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/trips/:handle" component={Trips} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/grouptrips/:handle" component={GroupTrips} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/wall/:handle" component={Wall} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupwall/:handle" component={GroupWall} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/groupCalendar/:handle" component={Calendar} />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-trip"
                  component={AddTrip}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/EditTrip" component={EditTrip} />
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/Trip" component={Trip} />
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/Forgot" component={Forgot} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
