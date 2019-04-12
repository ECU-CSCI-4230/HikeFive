import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  SEARCH_HANDLES
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Search Profiles
export const searchProfiles = query => dispatch => {
  { console.log(query) }
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/${query}`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};


// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Trip
export const addTrip = (tripData, history) => dispatch => {
  axios
    .post('/api/profile/trips', tripData)
    .then(res => history.push('/EditTrip'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add the match data
export const addMatchData = (matchData, history) => dispatch => {
  axios
    .post(`/api/profile/matchData`, matchData)
    .then(res => history.push(`/matches`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Trip
export const deleteTrip = id => dispatch => {
  axios
    .delete(`/api/profile/trips/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPCombo - Travel, Camp, and Climb
export const matchPCombo = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPCombo', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPTC - Travel and Camp
export const matchPTC = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPTravelCamp', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPTCL - Travel and Climb
export const matchPTCL = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPTravelClimb', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPT - Travel
export const matchPT = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPTravel', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPCC - Camp and Climb
export const matchPCC = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPCampClimb', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPC- Camp
export const matchPC = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPCamp', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchPCL - Climb
export const matchPCL = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchPClimb', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// matchProfiles
export const matchProfiles = matchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/group/matchP', {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
