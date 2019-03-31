import axios from 'axios';

import {
    GET_ERRORS,
    GET_GROUPS,
    GET_MATCH,

} from '/types';



// Create Match Form 
export const createMatch = (matchData, history) => dispatch => {
    axios
        .post('/api/match', matchData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//NEED TO ADD FUNCTION TO DELETE A MATCH FORM HERE


//Get Form for current user
export const getForm = handle => dispatch => {
    dispatch(setFormLoading());
    axios
        .get(`/api/match/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_MATCH,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_MATCH,
                payload: null
            })
        );
};

//Get all Matches for current user
export const getMatches = data => dispatch => {
    dispatch(setFormLoading());
    axios
        .get(`/api/match/findUsers`, {
            params: {
                skillMin: data.skillMin,
                skillMax: data.skillMax,
                travel: data.travel,
                destination: data.destination,
                camp: data.camp,
                climb: data.climber
            }
        })
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_USERS,
                payload: null
            })
        );
};