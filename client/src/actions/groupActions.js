import axios from 'axios';

import {
  GROUP_LOADING,
  GET_ERRORS,
  GET_GROUP,
  GET_GROUPS,
  CALENDAR_LOADING,
  GET_EVENT,
  SET_CURRENT_GROUP,
  ADD_MEMBER,
  GET_MEMBERS,
  MEMBER_LOADING
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
  axios
    .post('/api/group/trips', tripData)
    .then(res => history.push(`/groupsettings/${tripData.handle}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Event
export const addEvent = (eventData, history) => dispatch => {
  axios
      .post('/api/group/events', eventData)
      .then(res => history.push(`/groupsettings/${eventData.handle}`))
      .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );

};

// Delete Trip
export const deleteTrip = (group, id) => dispatch => {
  axios
    .delete(`/api/group/trips/${id}`, { params: { handle: group.handle } })
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


// Delete Event
export const deleteEvent = (group, id) => dispatch => {
  axios
    .delete(`/api/group/events/${id}`, { params: { handle: group.handle } })
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


// matchGCombo - Travel, Camp, and Climb
export const matchGCombo = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchCombo`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
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

// matchGTC - Travel and Camp
export const matchGTC = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchTravelCamp`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
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

// matchGTCL - Travel and Climb
export const matchGTCL = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchTravelClimb`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
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

// matchGT - Travel
export const matchGT = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchTravel`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax
      }
    }) 
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

// matchGCC - Camp and Climb
export const matchGCC = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchCampClimb`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
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

// matchGC- Camp
export const matchGC = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchCamp`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
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

// matchGCL - Climb
export const matchGCL = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/matchClimb`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
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

// matchGroups
export const matchGroups = matchData => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/match`, {
      params: {
        skillMin: matchData.skillMin, 
        skillMax: matchData.skillMax,
        country: matchData.country
      }
    }) 
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


/*

// retrieve specific event
export const getEvent = (event_id) => dispatch => {
  //console.log(event_id);
  dispatch(setCalendarLoading());
  axios
      .get('/api/group/events',{
        params:{
          eventid: event_id.eventid
        }
      })
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

*/


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

// group loading
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  };
};

// members loading
export const setMemberLoading = () => {
  return {
    type: MEMBER_LOADING
  };
};


// Add Members
export const addMember = (userID) => dispatch =>{
  axios
      .post(`/api/group/addmember`,userID)
      .catch(err =>
          dispatch({
              type: ADD_MEMBER,
              payload: null
          })
      );
};


// Get group members
export const getMembers = (pass) => dispatch => {
  dispatch(setMemberLoading());
  axios
    .post('/api/group/members',pass)
    .then(res =>{
      //console.log(res.data);
      dispatch({
        type: GET_MEMBERS,
        payload: res.data
      })}
    )
    .catch(err =>
      dispatch({
        type: GET_MEMBERS,
        payload: null
      })
    );
};

// Search belong groups
export const searchBelongGroups = query => dispatch => {
  dispatch(setGroupLoading());
  axios
    .get(`/api/group/groupBelong/${query}`)
    /*
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
    */
};
