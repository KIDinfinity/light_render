import { v5 as uuidv5 } from 'uuid';
// import { plainToClassFromExist } from 'class-transformer';
// import { validateSync } from 'class-validator';
import { resRevert } from '@/utils/transform';
import bpmBusinessProcessService from '@/services/bpmBusinessProcessService';
// TODO 匹配对应的请求和响应dto
// import { RulePaginationList, Rule } from '@/../dto/rule.ts';

export default {
  namespace: 'bizProcess',

  state: {},

  effects: {
    *findBizProcess({ payload }, { call, put }) {
      const response = yield call(bpmBusinessProcessService.findBizProcess, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findBizProcess_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *update({ payload }, { call, put }) {
      const response = yield call(bpmBusinessProcessService.update, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`update_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *findFavorite({ payload }, { call, put }) {
      const response = yield call(bpmBusinessProcessService.findFavorite, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findFavorite_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
