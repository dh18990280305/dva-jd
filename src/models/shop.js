import apis from '../services'

export default {

  namespace: 'shop',

  state: {
    classify: [],   //分类
    classFlList: {}, //分类列表
    active: 0, //默认选中
    page: 1,
    pageSize: 15,
    firstLoading: true, //首次加载
    moreLoading: true,  //加载更多
  },

  subscriptions: {
    setup({ dispatch, history }) {
    }
  },

  effects: {
    //获取分类
    *getClassify({ payload }, { put }) {
      const res = yield apis.getCateGory()
      yield put({ type: 'getFlLists' })
      yield put({ type: 'saveClassify',payload: res.data.data })
    },
    //获取分类下商品列表
    *getFlLists({ payload }, { put,select }){
      const state = yield select(_=>_.shop)
      let active = {
        id: state.classify[state.active].id,
        size: state.pageSize,
        page:state.page
      }
      if(payload instanceof Object){
        active.id = payload.id
        state.active = payload.index
        state.classFlList = {}
        active.page = state.page = 1
      }else if(typeof(payload) === 'string'){
        active.page = state.page += 1
      }
      let res = yield apis.getCateGoryList(active.id,active.size,active.page)
      yield put({ type: 'setFlList',payload: res.data.data })
    }
  },

  reducers: {
    saveClassify(state, { payload = {} }) {
      return { ...state, classify: payload}
    },
    setFlList(state,{ payload = {} }){
      //首次加载完毕关闭loading
      state.firstLoading && (state.firstLoading = false)
      if(state.classFlList && state.classFlList.result){
        return {
          ...state,
          classFlList: {
            ...payload,
            result: [...state.classFlList.result,...payload.result]
          }
        }
      }else{
        return {
          ...state,
          classFlList: payload
        }
      }
    }
  }
}
