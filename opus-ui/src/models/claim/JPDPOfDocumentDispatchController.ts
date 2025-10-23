import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findDictionariesByTypeCode } from '@/services/miscDictionaryControllerService';

export default {
  namespace: 'JPDPOfDocumentDispatchController',

  state: {
    forms: {},
    submited: false,
    documentTypes: [],
    businessData: {},
  },

  effects: {
    /**
     * 记载封筒书类和必要书类
     * 只有language 为ja_JP时接口才会返回数据
     */
    *loadDocumentTypes(action, { call, put, select }) {
      const response = yield call(
        findDictionariesByTypeCode,
        objectToFormData({
          typeCode: 'documentType_all',
        })
      );
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isArray(response.resultData)
      ) {
        const documentTypes = lodash.get(response, 'resultData');

        const documentTypesKey = lodash.map(documentTypes, (item: any) => item.dictCode);
        yield put.resolve({
          type: 'dictionaryController/getListDocsByGroupCode',
          payload: {
            groupCodes: documentTypesKey,
          },
        });
        const newDocumentList = yield select((state: any) =>
          lodash.pick(state.dictionaryController, documentTypesKey)
        );
        lodash.forEach(documentTypes, (item: any) => {
          lodash.set(item, 'dicts', newDocumentList[item?.dictCode]);
        });
        yield put({
          type: 'saveDocumentTypes',
          payload: {
            documentTypes,
          },
        });
      }
    },
    *getBusinessData(_, { select }) {
      const businessData = yield select((state: any) =>
        lodash.get(state, 'JPDPOfDocumentDispatchController.businessData')
      );
      return businessData;
    },
    *validateFields(_, { select, put }) {
      const forms = yield select((state) => state?.JPDPOfDocumentDispatchController?.forms);
      yield put({
        type: 'setSubmited',
        payload: {
          submited: true,
        },
      });
      const errors = yield formUtils.validateFormsAndGetErrors({
        forms: Object.values(forms),
        force: true,
      });
      return errors;
    },
  },

  reducers: {
    saveDocumentTypes(state, action) {
      const documentTypes = lodash.get(action, 'payload.documentTypes');
      return {
        ...state,
        documentTypes,
      };
    },
    saveBusinessData(state, action) {
      const businessData = action.payload;
      return {
        ...state,
        businessData: {
          ...businessData,
          dispatchDocs: lodash.map(
            lodash.get(businessData, 'dispatchDocs'),
            (item: any, idx: number) => ({
              idx,
              ...item,
            })
          ),
        },
      };
    },
    registerForm(state, action) {
      const { forms } = state;
      const { form, formId } = action.payload;
      const orginForms = formUtils.registerForm(forms, form, formId);

      return {
        ...state,
        forms: orginForms,
      };
    },
    unRegisterForm(state, action) {
      const { forms } = state;
      const { form, formId } = action.payload;
      const orginForms = formUtils.unRegisterForm(forms, form, formId);

      return {
        ...state,
        forms: orginForms,
      };
    },
    updateDocument(
      state,
      {
        payload,
      }: {
        payload: {
          value: string[];
        };
      }
    ) {
      const { value } = payload;
      const businessData = lodash.cloneDeep(state.businessData);
      const dispatchDocs = lodash.get(businessData, 'dispatchDocs');
      lodash.forEach(dispatchDocs, (item: any) => {
        if (lodash.includes(value, item?.idx)) {
          lodash.set(item, 'checked', true);
        } else {
          lodash.set(item, 'checked', false);
        }
      });
      lodash.set(businessData, 'dispatchDocs', dispatchDocs);
      return {
        ...state,
        businessData,
      };
    },
    setSubmited(state, action) {
      const submited = lodash.get(action, 'payload.submited', false);
      return {
        ...state,
        submited,
      };
    },
    clearjPDPProcessData(state) {
      return {
        ...state,
        forms: {},
        submited: false,
        documentTypes: [],
        businessData: {},
      };
    },
  },
};
