import { EVENT_PUBLIC } from './../../../../services/api/public.api';
import { EVENT_PRIVATE } from './../../../../services/api/private.api';
import { takeEvery, call, put} from 'redux-saga/effects';
import { _requestToServer } from '../../../../services/exec';
import { PUBLIC_HOST, STUDENT_HOST } from '../../../../environment/development';
import { noInfoHeader, authHeaders } from '../../../../services/auth';
import { store } from '../../../store/index';
import { REDUX_SAGA, REDUX } from '../../../../const/actions'
import { GET } from '../../../../const/method';

function* getEventJobDetailData(action) {
    let res = yield call(getJobDetail, action);
    if (res.data) {
        let data = res.data
        console.log(data)
        yield put({ type: REDUX.EVENT.JOB.DETAIL, data });
    }
}

// get JobDetailData
function getJobDetail(action) {
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        GET,
        null,
        (isAuthen ? EVENT_PRIVATE.JOBS.DETAIL.replace("{jid}", action.jobID) : EVENT_PUBLIC.JOBS.DETAIL.replace("{jid}", action.jobID)),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        false, false, true
    )

    return res;
}

export function* EventJobDetailWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.JOB.DETAIL, getEventJobDetailData);
}