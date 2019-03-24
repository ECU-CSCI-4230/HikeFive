import axios from 'axios';

import {
  GROUP_LOADING,
  GET_ERRORS,
  GET_GROUP,
  GET_GROUPS,
  CALENDAR_LOADING,
  GET_EVENT,
  SET_CURRENT_GROUP
} from './types';


// Get group by handle
export const getGroupByHandle = handle => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUP,
        payload: null
      })
    );
};

// Create Group 
//Getting a background error where the network connection is lost.
export const createGroup = (groupData, history) => dispatch => {
  //{console.log(groupData.handle)}
  axios
    .post('/api/group', groupData)
    .then(res =>
      //history.push('/feed')
      dispatch({
        type: GET_GROUP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Edit Group 
export const editGroup = (groupData, history) => dispatch => {
  axios
    .post('/api/group/edit', groupData)
    .then(res => history.push(`/groupsettings/${groupData.handle}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all groups
export const getGroups = () => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get('/api/group/all') 
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUPS,
        payload: null
      })
    );
};

// Add Trip
export const addTrip = (tripData, history) => dispatch => {
  {console.log(tripData.handle)}
  axios
    .post('/api/group/trips', tripData)
    .then(res => history.push('/dashboard'))
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
    .delete(`/api/group/trips/${id}`)
    .then(res =>
      dispatch({
        type: GET_GROUP,
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


// Search groups
export const searchGroups = query => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/search/${query}`) 
    .then(res =>
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUPS,
        payload: null
      })
    );
};



//Create a new event
export const addEvent = (eventData, history) => dispatch => {
  axios
      .post('/api/group/event', eventData)
      .then(res => history.push('/Dashboard'))
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );

};

//retrieve specific event
export const getEvent = (handle, event_id) => dispatch => {
  dispatch(setCalendarLoading());
  axios
      .get(`/api/group/event/${event_id}`)
      .then(res =>
          dispatch({
              type: GET_EVENT,
              payload: res.data
          })
      )
      .catch(err =>
          dispatch({
              type: GET_EVENT,
              payload: null
          })
      );
};


// Delete specific event
export const deleteEvent = event_id => dispatch => {
  axios
    .delete(`/api/group/event/${event_id}`)
    .then(res =>
      dispatch({
        type: GET_GROUP,
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


// Calendar Loading
export const setCalendarLoading = () => {
  return {
    type: CALENDAR_LOADING
  };
};



// Delete group
export const deleteGroup = (id, history) => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(`/api/group/${id}`)
      .then(res => history.push('/feed'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

