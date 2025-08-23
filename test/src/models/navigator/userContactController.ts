import { v5 as uuidv5 } from 'uuid';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { resRevert } from '@/utils/transform';
import userCenterUserContactControllerService from '@/services/userCenterUserContactControllerService';
import ucAdvancedQueryControllerService from '@/services/ucAdvancedQueryControllerService';
import userCenterUserGeneralInfoControllerService from '@/services/userCenterUserGeneralInfoControllerService';

export default {
  namespace: 'userContactController',

  state: {
    title: '',
    contactList: [],
  },

  effects: {
    *getUserInfo(_, { call, put, select }) {
      const userId = yield select((state) => state.user.currentUser?.userId);
      const initParams = new FormData();
      initParams.append('userId', userId);
      const response = yield call(
        userCenterUserGeneralInfoControllerService.queryByUserId,
        initParams
      );
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            title: response.resultData.title,
          },
        });
      }
    },
    *get(_, { call, put }) {
      const response = yield call(ucAdvancedQueryControllerService.contactsQuery);
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            contactList: response.resultData || [],
          },
        });
      }
      return response;
    },
    *getByName({ payload }, { call, put }) {
      const { userName } = payload;
      const formData = objectToFormData({
        userName,
      });
      const response = yield call(userCenterUserContactControllerService.getByName, formData);

      // const errors = validateSync(
      //   plainToClassFromExist(RulePaginationList(), resRevert(response))
      // );

      // if (!errors.length) {
      yield put({
        type: 'save',
        payload: {
          [`getByName_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
          getByName: resRevert(response || {}),
        },
      });
      // } else {
      //   TODO 错误怎么抛的更容易看
      //   console.log(errors);
      // }

      return response;
    },
    *changeContactListByUserId({ payload }: any, { select, put }: any) {
      const { userId, status } = payload;
      const contactList = yield select(
        (state: any) => state.userContactController?.contactList || []
      );

      let newContactList = [];

      if (lodash.size(contactList) && lodash.isArray(contactList)) {
        newContactList = lodash.map(contactList, (item) => ({
          ...item,
          status: item.userId === userId ? status : item.status,
        }));
      }

      yield put({
        type: 'save',
        payload: {
          contactList: newContactList,
        },
      });
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
