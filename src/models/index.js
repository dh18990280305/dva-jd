import apis from '../services'

export default {

  namespace: 'index',

  state: {
    listsGater: {},
    isFirstLoad: true,
		type: 1
  },

  subscriptions: {
    setup({ dispatch, history }) {
    }
  },

  effects: {
    *lists({ payload }, { call, put }) {
      const res = yield apis.searchShop(payload.keyword,payload.page)
      yield put({ type: 'setList',res: res.data.data })
      yield put({ type: 'loadinged' })
    },
  },

  reducers: {
    setList(state, { res = {} }) {
      return { ...state,listsGater: res}
    },
    loadinged(state){
      return {...state,isFirstLoad: false }
    }
  },

};
