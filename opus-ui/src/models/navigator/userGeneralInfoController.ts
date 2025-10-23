import { v5 as uuidv5 } from 'uuid';
// import { plainToClassFromExist } from 'class-transformer';
// import { validateSync } from 'class-validator';
import { resRevert } from '@/utils/transform';
import userCenterUserGeneralInfoControllerService from '@/services/userCenterUserGeneralInfoControllerService';
// TODO 匹配对应的请求和响应dto
// import { RulePaginationList, Rule } from '@/../dto/rule.ts';

export default {
  namespace: 'userGeneralInfoController',

  state: {},

  effects: {
    *addFundPoint({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.addFundPoint, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`addFundPoint_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          addFundPoint: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.remove, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`remove_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          remove: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *deleteBatch({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.deleteBatch, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`deleteBatch_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          deleteBatch: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *find({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.find, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`find_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          find: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *findAllUser({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.findAllUser, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findAllUser_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          findAllUser: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *findAllForAssigneeUser({ payload }, { call, put }) {
      const response = yield call(
        userCenterUserGeneralInfoControllerService.findAllForAssigneeUser,
        payload
      );

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findAllForAssigneeUser${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          findAllForAssigneeUser: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *findAllTitle({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.findAllTitle, payload);

      yield put({
        type: 'save',
        payload: {
          [`findAllTitle_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          findAllTitle: resRevert(response || {}),
        },
      });
      return response;
    },

    *findByUserId({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.findByUserId, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findByUserId_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          findByUserId: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *findByUserIdList({ payload }, { call, put }) {
      const response = yield call(
        userCenterUserGeneralInfoControllerService.findByUserIdList,
        payload
      );

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findByUserIdList_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          findByUserIdList: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *findUserOrderByEmploymentDate({ payload }, { call, put }) {
      const response = yield call(
        userCenterUserGeneralInfoControllerService.findUserOrderByEmploymentDate,
        payload
      );

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`findUserOrderByEmploymentDate_${uuidv5(
            JSON.stringify(payload),
            uuidv5.URL
          )}`]: resRevert(response || {}),
          findUserOrderByEmploymentDate: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *insert({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.insert, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`insert_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          insert: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *page({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.page, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`page_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          page: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *subtractFundPoint({ payload }, { call, put }) {
      const response = yield call(
        userCenterUserGeneralInfoControllerService.subtractFundPoint,
        payload
      );

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`subtractFundPoint_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          subtractFundPoint: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *update({ payload }, { call, put }) {
      const response = yield call(userCenterUserGeneralInfoControllerService.update, payload);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`update_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          update: resRevert(response || {}),
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
