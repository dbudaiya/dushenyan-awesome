// 请求数据方法
import getDataSource from './service.js';

const HomeModel = {
  namespace: 'HomePage',
  state: {
    HomeSource: [],
  },
  reducers: {
    saveHomeData(state, { type, payload }) {
      console.log(payload);
      return { ...state, HomeSource: payload };
      //   console.log({ ...state, dataSource: payload });
    },
  },
  effects: {
    *getHomeData({ payload }, { call, put }) {
      const HomeData = yield call(getDataSource);
      //   console.log(HomeData);

      yield put({
        type: 'saveHomeData',
        payload: HomeData,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/home') {
          dispatch({
            type: 'getHomeData',
          });
        }
      });
    },
  },
};

export default HomeModel;
