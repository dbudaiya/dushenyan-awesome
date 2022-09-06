import { Effect, Reducer, Subscription } from 'umi';
import getSourceData from './service';
interface UserModelType {
  namespace: 'IndexPage';
  state: {
    Source:Object[]
  };
  effects: {
    getIndexData: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'IndexPage',

  state: {
    Source: [],
  },
  reducers: {
    // action :{type,payload}
    save(state, { type, payload }) {
      return { ...state, Source: payload };
    },
  },
  effects: {
    *getIndexData({ payload }, { call, put }) {
      const data = yield call(getSourceData);
      // 数据能成功得到
      console.log(data);
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'getIndexData',
          });
        }
      });
    },
  },
};

export default UserModel;
