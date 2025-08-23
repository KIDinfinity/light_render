import { v5 as uuidv5 } from 'uuid';
import { produce } from 'immer';
// import { plainToClassFromExist } from 'class-transformer';
// import { validateSync } from 'class-validator';
import { resRevert } from '@/utils/transform';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import miscBankInformationControllerService from '@/services/miscBankInformationControllerService';
import miscOccupationInformationControllerService from '@/services/miscOccupationInformationControllerService';
import claimMedicalProviderInformationControllerService from '@/services/claimMedicalProviderInformationControllerService';
import claimServiceItemInformationControllerService from '@/services/claimServiceItemInformationControllerService';
import claimSurgeryProcedureInformationControllerService from '@/services/claimSurgeryProcedureInformationControllerService';
import claimPartOfBodyInjuredInformationControllerService from '@/services/claimPartOfBodyInjuredInformationControllerService';
import claimDiagnosisInformationControllerService from '@/services/claimDiagnosisInformationControllerService';
import miscNationalityInformationControllerService from '@/services/miscNationalityInformationControllerService';
import { tenant } from '@/components/Tenant';
import { findDictionaryByTypeCode as findDictionaryByTypeCodeCache } from '@/utils/dictionary';
import { listDocsByGroupCode } from '@/services/docConfigControllerService';
import { miscCommonHierarchyLinkCommon } from '@/services/miscCommonHierarchyLinkControllerService';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default {
  namespace: 'dictionaryController',

  state: {
    hierarchyDicts: {},
    hierarchyDictsLoaded: {},
  },

  effects: {
    *find({ payload }: any, { call, put }: any) {
      const response = yield call(miscDictionaryControllerService.find, payload);

      yield put({
        type: 'save',
        payload: {
          [`find_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });

      return response;
    },
    *findDictionaryByTypeCode({ payload, signal = null }: any, { call, put }: any) {
      const language = tenant.getLocaleLang();
      const list = yield call(findDictionaryByTypeCodeCache, {
        language,
        typeCode: payload.get('typeCode'),
        signal,
      });
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        payload,
        { signal }
      );

      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            [`findDictionaryByTypeCode_${payload.get('typeCode')}`]: list,
          },
        });
      }

      return list;
    },
    *findDictionaryByTypeCodes({ payload }: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCodes,
        payload
      );

      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            ...response.resultData,
          },
        });
      }
      return response;
    },
    *findDictionaryByOccupationCode({ payload }: any, { call, put }: any) {
      const response = yield call(miscOccupationInformationControllerService.getName, payload);
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            [`findDictionaryByOccupationCode_${payload.get('code')}`]: response.resultData,
          },
        });
      }

      return response;
    },
    *page({ payload }: any, { call, put }: any) {
      const response = yield call(miscDictionaryControllerService.page, payload);
      yield put({
        type: 'save',
        payload: {
          [`page_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(response || {}),
        },
      });
      return response;
    },

    *nationalityDropdown({ payload }: any, { call, put }: any) {
      const response = yield call(miscNationalityInformationControllerService.nationality, payload);
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            nationalityDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *bankDropdown({ payload }: any, { call, put }: any) {
      const response = yield call(miscBankInformationControllerService.bank, payload);
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            bankDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *occupationDropdown({ payload }: any, { call, put }: any) {
      const response = yield call(miscOccupationInformationControllerService.occupation, payload);
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            occupationDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *partOfBodyInjuredDropdown(_: any, { call, put }: any) {
      const response = yield call(
        claimPartOfBodyInjuredInformationControllerService.partOfBodyInjuredByRegion,
        objectToFormData({ regionCode: tenant.region() })
      );
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            partOfBodyInjuredDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *diagnosisDropdown(_: any, { call, put }: any) {
      const response = yield call(
        claimDiagnosisInformationControllerService.diagnosisByRegionCode,
        objectToFormData({ regionCode: tenant.region() })
      );
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            diagnosisDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *medicalProviderDropdown(_: any, { call, put }: any) {
      const response = yield call(
        claimMedicalProviderInformationControllerService.medicalProviderByRegionCode,
        objectToFormData({ regionCode: tenant.region() })
      );
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            medicalProviderDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *surgeryProcedureDropdown(_: any, { call, put }: any) {
      const response = yield call(
        claimSurgeryProcedureInformationControllerService.surgeryProcedureByRegion,
        objectToFormData({ regionCode: tenant.region() })
      );
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            surgeryProcedureDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *serviceItemDropdown(_: any, { call, put }: any) {
      const response = yield call(
        claimServiceItemInformationControllerService.serviceItemByRegionCode,
        objectToFormData({ regionCode: tenant.region() })
      );
      if (lodash.get(response, 'success')) {
        yield put({
          type: 'save',
          payload: {
            serviceItemDropdown: resRevert(response || {}),
          },
        });
      }
    },
    *getListDocsByGroupCode({ payload }: any, { call, select, put }: any) {
      const { groupCodes } = payload;
      const dictionaryControllerState = yield select((state: any) => state.dictionaryController);
      const newGroupCodes = lodash.filter(
        groupCodes,
        (item: any) => !lodash.includes(lodash.keys(dictionaryControllerState), item)
      );
      if (!lodash.isArray(newGroupCodes) || newGroupCodes.length === 0) {
        return {};
      }
      const response = yield call(listDocsByGroupCode, groupCodes);
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isArray(response.resultData)
      ) {
        const dropdownCFGDocumentType = getDrowDownList('Dropdown_CFG_DocumentType');

        const listDocsByGroupCodeData = lodash.get(response, 'resultData', []);
        const docsObj = {};
        lodash.forEach(listDocsByGroupCodeData, (docsGroup: any) => {
          const docConfigList = docsGroup?.docConfigList;
          lodash.forEach(docConfigList, (docConfig: any) => {
            const i18nObj = lodash.find(
              dropdownCFGDocumentType,
              (item: any) => item?.dictCode === docConfig?.docTypeCode
            );
            lodash.set(docConfig, 'dictName', i18nObj?.dictName);
            lodash.set(docConfig, 'dictCode', i18nObj?.dictCode);
          });
          docsObj[docsGroup?.groupCode] = docConfigList;
        });
        yield put({
          type: 'save',
          payload: {
            ...docsObj,
          },
        });
        return docsObj;
      }
      return {};
    },
    *loadDictsByParentCode({ payload }: any, { call, put }: any) {
      const { parentCode, parentFieldName } = lodash.pick(payload, [
        'parentCode',
        'parentFieldName',
      ]);
      yield put.resolve({
        type: 'setHierarchyDictsLoaded',
        payload: {
          parentCode,
          parentFieldName,
          loaded: true,
        },
      });
      const response = yield call(miscCommonHierarchyLinkCommon, {
        parentCode,
        parentFieldName,
      });
      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success && lodash.isArray(resultData)) {
        yield put({
          type: 'setSubCodes',
          payload: {
            parentCode,
            parentFieldName,
            subDicts: lodash
              .chain(resultData)
              .filter((item) => {
                return item?.dictCode && item?.dictName;
              })
              .value(),
          },
        });
      } else {
        yield put.resolve({
          type: 'setHierarchyDictsLoaded',
          payload: {
            parentCode,
            parentFieldName,
            loaded: false,
          },
        });
      }
    },
  },

  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setHierarchyDictsLoaded(state: any, action: any) {
      const { parentCode, parentFieldName, loaded } = lodash.pick(action?.payload, [
        'parentCode',
        'parentFieldName',
        'loaded',
      ]);
      const nextState = produce(state, (draftState: any) => {
        if (!/[0-9]{1,}/g.test(parentCode)) {
          lodash.set(draftState, `hierarchyDictsLoaded.${parentFieldName}.${parentCode}`, loaded);
        }
      });
      return {
        ...nextState,
      };
    },
    setSubCodes(state: any, action: any) {
      const { parentCode, parentFieldName, subDicts } = lodash.pick(action?.payload, [
        'parentCode',
        'parentFieldName',
        'subDicts',
      ]);
      const nextState = produce(state, (draftState: any) => {
        lodash.set(draftState, `hierarchyDicts.${parentFieldName}.${parentCode}`, subDicts);
      });
      return { ...nextState };
    },
  },
};
