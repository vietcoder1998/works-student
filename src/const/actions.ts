export const REDUX = {
  AUTHEN: {
    FAIL_AUTHEN: "FAIL_AUTHEN",
    EXACT_AUTHEN: "EXACT_AUTHEN",
  },

  ANNOUNCEMENTS: {
    GET_ANNOUNCEMENTS: "GET_ANNOUNCEMENTS",
    GET_ANNOUNCEMENT_DETAIL: "GET_ANNOUNCEMENT_DETAIL",
  },

  EMPLOYER_DETAIL: {
    GET_EMPLOYER_DETAIL: "GET_EMPLOYER_DETAIL",
  },
  EMPLOYER_MORE_JOB: {
    GET_EMPLOYER_MORE_JOB: "EMPLOYER_MORE_JOB",
    SET_LOADING_MORE_JOB: "SET_LOADING_MORE_JOB",
  },
  SIMILAR_JOB: {
    GET_SIMILAR_JOB: "GET_SIMILAR_JOB",
    SET_LOADING_SIMILAR_JOB: "SET_LOADING_SIMILAR_JOB",
  },
  EVENT: {
    START: "CHECK_EVENT_STATUS",
    DETAIL: "GET_EVENT",
    JOB: {
      HOT: "GET_EVENT_HOT_JOBS",
      HOT_LOADING: "SET_LOADING_EVENT_HOT_JOB",
      NORMAL: "GET_EVENT_NORMAL_JOBS",
      ALL: "GET_EVENT_ALL_JOBS",
      DETAIL: "GET_EVENT_JOB_DETAIL",
      SAVE: "SAVE_EVENT_JOB",
      BRANCH: 'GET_LIST_BRANCH_JOB',
      SEARCH: 'GET_JOBS_RESULTS',
    },
    EMPLOYER: {
      ALL: "GET_ALL_EMPLOYER",
      TOP: "GET_TOP_EMPLOYER",
      BANNER: 'GET_BANNER_EMPLOYER',
      MORE_JOB: 'GET_EMPLOYER_MORE_JOB',
    },
  },
  HIGH_LIGHT: {
    GET_HIGH_LIGHT_JOB: "GET_HIGH_LIGHT_JOB",
    SET_LOADING_HIGH_LIGHT_JOB: "SET_LOADING_HIGH_LIGHT_JOB",
  },
  IN_DAY: {
    GET_IN_DAY_JOB: "GET_IN_DAY_JOB",
  },
  HOT_JOB: {
    GET_HOT_JOB: "GET_HOT_JOB",
    SET_LOADING_HOT_JOB: "SET_LOADING_HOT_JOB",
  },
  ALL_JOB: {
    GET_ALL_JOB: "GET_ALL_JOB",
    SET_LOADING_ALL_JOB: "SET_LOADING_ALL_JOB",
  },
  JOB_DETAIL: {
    GET_JOB_DETAIL: "GET_JOB_DETAIL",
  },
  JOB_RESULT: {
    GET_JOB_RESULT: "GET_JOB_RESULT",
    SEARCH_JOB_DTO: "SEARCH_JOB_DTO",
    SET_FILTER_JOB_TYPE: "SET_FILTER_JOB_TYPE",
    SET_FILTER_LIST_SHIFT: "SET_FILTER_LIST_SHIFT",
    SET_FILTER_LIST_DAY: "SET_FILTER_LIST_DAY",
    SET_FILTER_AREA: "SET_FILTER_AREA",
    SET_FILTER_JOBNAME: "SET_FILTER_JOBNAME",
    SET_LOADING_RESULT: "SET_LOADING_RESULT",
    SET_FILTER: "SET_FILTER",
  },
  SAVED_JOB: {
    GET_SAVED_JOB: "GET_SAVED_JOB",
    SET_LOADING_SAVE_JOB: "SET_LOADING_SAVE_JOB",
  },
  HISTORY_APPLY: {
    GET_HISTORY_APPLY: "GET_HISTORY_APPLY",
    SET_LOADING_HISTORY_APPLY: "SET_LOADING_HISTORY_APPLY",
  },
  MAP: {
    SET_MAP_STATE: "SET_MAP_STATE",
  },
  MOBILE_STATE: {
    SET_MOBILE_STATE: "SET_MOBILE_STATE",
  },
  NOTI: {
    GET_NOTI: "GET_NOTI",
  },
  PERSON_INFO: {
    GET_PERSON_INFO: "PERSONAL_INFO",
  },
  POPUP: {
    OPEN_POPUP: "OPEN_POPUP",
    CLOSE_POPUP: "CLOSE_POPUP",
  },
  SIDE_BAR: {
    OPEN_SIDE_BAR: "OPEN_SIDE_BAR",
    CLOSE_SIDE_BAR: "CLOSE_SIDE_BAR",
  },
  CHAT_ROOM: {
    SET_CHAT_ROOM: "SET_CHAT_ROOM",
  },

  JOB_NAMES: {
    GET_JOB_NAMES: "GET_JOB_NAMES",
  },
  JOB_GROUPS: {
    GET_JOB_GROUPS: "GET_JOB_GROUPS",
  },
  REGIONS: {
    GET_REGIONS: "GET_REGIONS",
  },
};

export const REDUX_SAGA = {
  EMPLOYER_DETAIL: {
    GET_EMPLOYER_DETAIL: "GET_EMPLOYER_DETAIL_DATA",
  },
  EMPLOYER_MORE_JOB: {
    GET_EMPLOYER_MORE_JOB: "GET_EMPLOYER_MORE_JOB_DATA",
  },
  SIMILAR_JOB: {
    GET_SIMILAR_JOB: "GET_SIMILAR_JOB_DATA",
  },
  HIGH_LIGHT: {
    GET_HIGH_LIGHT_DATA: "GET_HIGH_LIGHT_DATA",
  },
  EVENT: {
    DETAIL: "GET_EVENT_DATA",
    JOB: {
      HOT: "GET_EVENT_HOT_JOBS_DATA",
      HOT_LOADING: "SET_LOADING_EVENT_HOT_JOB_DATA",
      NORMAL: "GET_EVENT_NORMAL_JOBS_DATA",
      ALL: "GET_EVENT_ALL_JOBS_DATA",
      DETAIL: "GET_EVENT_JOB_DETAIL_DATA",
      SAVE: "SAVE_EVENT_JOB_DATA",
      BRANCH: 'GET_LIST_BRANCH_JOB_DATA',
      SEARCH: 'GET_JOBS_RESULTS_DATA',
    },
    EMPLOYER: {
      ALL: "GET_ALL_EMPLOYER_DATA",
      TOP: "GET_TOP_EMPLOYER_DATA",
      BANNER: 'GET_BANNER_EMPLOYER_DATA',
      MORE_JOB: 'GET_EMPLOYER_MORE_JOB_DATA'
    },
  },
  IN_DAY: {
    GET_IN_DAY_JOB: "GET_IN_DAY_JOB_DATA",
  },
  HOT_JOB: {
    GET_HOT_JOB: "GET_HOT_JOB_DATA",
  },
  ALL_JOB: {
    GET_ALL_JOB: "GET_ALL_JOB_DATA",
  },
  JOB_DETAIL: {
    GET_JOB_DETAIL: "GET_JOB_DETAI_DATA",
  },
  JOB_RESULT: {
    GET_JOB_RESULT: "GET_JOB_RESULT_DATA",
  },
  SAVED_JOB: {
    GET_SAVED_JOB: "GET_SAVED_JOB_DATA",
  },
  HISTORY_APPLY: {
    GET_HISTORY_APPLY: "GET_HISTORY_APPLY_DATA",
  },

  NOTI: {
    GET_NOTI: "GET_NOTI_DATA",
  },
  PERSON_INFO: {
    GET_PERSON_INFO: "PERSONAL_INFO_DATA",
  },
  JOB_NAMES: {
    GET_JOB_NAMES: "GET_JOB_NAMES_DATA",
  },
  JOB_GROUPS: {
    GET_JOB_GROUPS: "GET_JOB_GROUPS_DATA",
  },
  REGIONS: {
    GET_REGIONS: "GET_REGIONS_DATA",
  },
  ANNOUNCEMENTS: {
    GET_ANNOUNCEMENTS: "GET_ANNOUNCEMENTS_DATA",
    GET_ANNOUNCEMENT_DETAIL: "GET_ANNOUNCEMENT_DETAIL_DATA",
  },
};
