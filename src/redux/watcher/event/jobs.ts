import { EVENT_PUBLIC } from './../../../services/api/public.api';
import { EVENT_PRIVATE } from './../../../services/api/private.api';
import { IJobSearchFilter } from '../../../models/job-search';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';
import { PUBLIC_HOST, STUDENT_HOST } from '../../../environment/development';
import { noInfoHeader, authHeaders } from '../../../services/auth';
import { store } from '../../store';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { POST } from '../../../const/method';


function* getListHotJobData(action) {
    yield put({ type: REDUX.EVENT.JOB.HOT_LOADING, loading: true });
    let res = yield call(getHotJobData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.JOB.HOT, data });
    }
    yield put({ type: REDUX.EVENT.JOB.HOT_LOADING, loading: false });

}
function* getListJobData(action) {
    let res = yield call(getJobData, action);
    if (res) {
        let data = res.data;
        console.log(data)
        yield put({ type: REDUX.EVENT.JOB.NORMAL, data });
    }
}
function getHotJobData(action) {
    let data: IJobSearchFilter = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameIDs: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: {
            homePriority: 'TOP'
        }
    };
    let isAuthen = store.getState().AuthState.isAuthen;

    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? EVENT_PRIVATE.JOBS.HOME : EVENT_PUBLIC.JOBS.HOME),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 12,
            priority: 'TOP'
        },
        false
    );
    return res
}




function getJobData(action) {
    let data: IJobSearchFilter = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameIDs: null,
        branchIDs: [],
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: {
            homePriority: null
        }
    };

    if (localStorage.getItem('e_bid')) {
        data.branchIDs.push(parseInt(localStorage.getItem('e_bid')))
    }
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? EVENT_PRIVATE.JOBS.ACTIVE : EVENT_PUBLIC.JOBS.ACTIVE),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 12,
            priority: ''
        },
        false
    );
    return res
}


export function* EventHotJobWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.JOB.HOT, getListHotJobData)
}

export function* EventJobWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.JOB.NORMAL, getListJobData)
}