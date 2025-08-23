import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import navigatorCaseOperationControllerService from '@/services/navigatorCaseOperationControllerService';
import flattenJson from '@/utils/flattenJson';
import { formUtils } from 'basic/components/Form';
import { multiply } from '@/utils/precisionUtils';
import { saveClaimant } from 'claimBasicProduct/reducers';
import { CREATEINTERFACE } from '@/utils/claimConstant';

// const incidentItemId = uuidv4();

const setData = (state, action) => {
  const operation = lodash.get(action, 'payload.operation');

  const nextState = lodash.cloneDeep(state);
  let stateToChange = lodash.chain(nextState);

  lodash.forEach(operation, (v) => {
    const [v0, ...vRest] = v;
    stateToChange = stateToChange[`${v0}`](...vRest);
  });
  stateToChange = stateToChange.value();

  return nextState;
};

export default {
  namespace: 'JPCLMProcessController',

  state: {
    claimProcessData: {
      parentClaimNo: '', // 用于页面显示的claim no
      taskId: '', //  task id
      processInstanceId: '', // 案件番号
      agentRequest: '', // 代筆案内・代理人請求の状況
      medicalCertificateGuideline: '', // 診断書の案内
      submissionChannel: 'SFDC', // --送信チャネル，默认传'01'，代表SFDC
      submissionDate: moment().format(), // --受付日+受付時間
      caseCategory: 'JP_CLM_CTG01', // --案件カテゴリー，默认传'JP_CLM_CTG01',代表事故受付, 新流程
      claimNo: '', // 請求番号
      recipientAddress: '', // 発送先住所
      recipientName: '', // 発送先宛名
      recipientPostCode: '', // 発送先郵便番号
      id: uuidv4(),
      claimant: {
        // 報告者情報
        // address: '', // 住所
        // claimNo: '', // 請求番号
        claimant: '被保険者', // 報告者
        // dateOfBirthString: '', // 誕生日
        firstName: '相川奈那子', // 氏名
        // gender: '', // 性别
        id: uuidv4(),
        // phoneNo: '', // 電話番号
        // postCode: '', // 郵便番号
        relationshipWithInsured: '本人', // 申出者
      },
      incidentList: [
        // 事故
        {
          causeOfIncident: 'A', // 事故原因
          claimNo: '',
          claimType: 'IP', // 受付事案
          subType: '', // 依頼サブタイプ1
          injuredIndicator: '', // ケガ有無
          trafficAccidentCertificate: '', // 交通事故証明書有無
          diagnosisList: [
            // 診断
            {
              claimNo: '',
              // criticalIllness: 0, // 重大疾病指標
              // criticalIllnessName: '', // 重大疾病名前
              diagnosisName: '', // 傷病名
              diagnosisCode: '', // ICD10コード
              diagnosisNo: '', // 傷病コード
              // diagnosisType: '', // 診断タイプ
              id: uuidv4(),
            },
          ],
          id: uuidv4(),
          // identificationDateString: '', // 被害認定日付
          incidentDateString: moment().format(), // 事故日
          // incidentInDetail: '', // 事件の詳しい記述
          incidentNo: '001', // 事故号
          // incidentPlace: '', // 事故発生場所
          insuredType: '01', // 対象者
          // partOfBodyInjured: '', // 体の被害部分
          treatmentList: [
            // 治療
            {
              claimNo: '',
              dateOfAdmissionString: moment().format(), // 入院日
              dateOfConsultationString: '', // 問い合わせ日付
              dateOfDischargeString: moment().add(10, 'd').format(), // 退院日
              // department: '', // 治療分野
              // doctor: '', // 医者名前
              icu: 0, // 集中治療室
              icuFromDateString: null, // 開始日
              icuToDateString: null, // 終了日
              id: uuidv4(),
              medicalProvider: '日本大学病院', // 病院名
              procedureList: [
                // 内科／外科手術
                {
                  claimNo: '',
                  id: uuidv4(),
                  operationDateString: moment().format(), // 手術日
                  procedureCode: '', // 手術コード
                  procedureName: '', // -手術名
                  kjCode: '', // K/Jコード
                },
              ],
              treatmentNo: '001', // 治療号
              treatmentType: 'IP', // 治療タイプ
            },
          ],
          // waivedReason: '', // 保険料免除の事由
        },
      ],
      insured: {
        firstName: '相川奈那子', // 氏名
      },
      policyList: [
        // 契約書の情報
        {
          confirmed: 0, // 該当/非該当,0:非该当，1是该当
          external: 1, // 0表示从事故受付节点添加的；1表示create case时录入的
          id: uuidv4(),
          policyNo: '', // 証券番号
          policyCategory: 'SFDC',
        },
      ],
    },
    forms: {},
  },

  effects: {
    *create({ payload }, { call }) {
      const response = yield call(navigatorCaseOperationControllerService.create, {
        ...CREATEINTERFACE,
        businessData: payload,
        caseCategory: payload?.caseCategory,
        submissionDate: payload?.submissionDate,
        submissionChannel: payload?.submissionChannel,
      });

      return response;
    },
    *validateFields(_, { select }) {
      const forms = yield select((state) => state?.JPCLMProcessController?.forms);
      const errors = yield formUtils.validateFormsAndGetErrors({
        forms: lodash.values(forms),
        force: true,
      });
      return errors;
    },
  },

  reducers: {
    saveCaseInfo(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;
      let finalChangedFields = { ...changedFields };
      if (Object.keys(changedFields).length === 1) {
        if (lodash.has(changedFields, 'submissionDate')) {
          finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
            'submissionDate',
          ]);
        }
      }
      const finalData = {
        ...dataSource,
        ...finalChangedFields,
      };

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveInsured(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;

      const finalData = {
        ...dataSource,
        insured: {
          ...dataSource?.insured,
          ...changedFields,
        },
      };

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveAgentNotification(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;

      const finalData = {
        ...dataSource,
        ...changedFields,
      };
      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveReporterInfo(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;
      const finalData = {
        ...dataSource,
        ...changedFields,
      };
      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveClaimant: saveClaimant(),
    // saveClaimant(state, action) {
    //   const dataSource = lodash.cloneDeep(state.claimProcessData);
    //   const { changedFields } = action.payload;

    //   const finalData = {
    //     ...dataSource,
    //     claimant: {
    //       ...dataSource?.claimant,
    //       ...changedFields,
    //     },
    //   };

    //   return {
    //     ...state,
    //     claimProcessData: finalData,
    //   };
    // },
    addIncidentItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { addItem } = action.payload;

      dataSource.incidentList = [...dataSource.incidentList, addItem];

      return {
        ...state,
        claimProcessData: dataSource,
      };
    },
    removeIncidentItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { deleteItemId } = action.payload;

      dataSource.incidentList = lodash.filter(
        dataSource.incidentList,
        (item) => item.id !== deleteItemId
      );
      dataSource.claimPayableList = lodash.filter(
        dataSource.claimPayableList,
        (item) => item.incidentId !== deleteItemId
      );

      return {
        ...state,
        claimProcessData: dataSource,
      };
    },
    saveIncidentItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields, PARENTKEY, ITEMKEY, data } = action.payload;

      const result = formUtils.onFieldsChange(changedFields, PARENTKEY, ITEMKEY, data[ITEMKEY]);
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    addDiagnosisItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, addItem } = action.payload;

      const finalData = flattenJson.addObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        addItem,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    removeDiagnosisItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, deleteItemId } = action.payload;
      const finalData = flattenJson.deleteObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        deleteItemId,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },

    saveDiagnosisItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields, PARENTKEY, ITEMKEY, data } = action.payload;
      const finalChangedFields = { ...changedFields };

      if (lodash.has(changedFields, 'diagnosisCode')) {
        const diagnosisListData = lodash
          .chain(dataSource)
          .get('incidentList')
          .find({ id: data.id })
          .get('diagnosisList')
          .value();
        const diagnosis = diagnosisListData?.filter(
          (item) => formUtils.queryValue(item.diagnosisCode) === changedFields.diagnosisCode?.value
        );
        // 如果存在相同的项，则添加错误信息
        if (diagnosis && diagnosis.length > 1) {
          finalChangedFields.diagnosisCode.errors = [
            {
              message: 'Duplicate with existing item',
              field: 'diagnosisCode',
            },
          ];
        }
      }

      if (
        lodash.has(changedFields, 'criticalIllness') &&
        lodash.isBoolean(formUtils.queryValue(changedFields.criticalIllness))
      ) {
        finalChangedFields.criticalIllness = changedFields.criticalIllness.value ? 1 : 0;
        finalChangedFields.criticalIllnessName = '';
      }

      const result = formUtils.onFieldsChange(
        finalChangedFields,
        PARENTKEY,
        ITEMKEY,
        data[ITEMKEY]
      );
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    addTreatmentItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, addItem } = action.payload;

      const finalData = flattenJson.addObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        addItem,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    removeTreatmentItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, deleteItemId } = action.payload;
      const finalData = flattenJson.deleteObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        deleteItemId,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveTreatmentItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields, PARENTKEY, ITEMKEY, data } = action.payload;
      const finalChangedFields = { ...changedFields };

      if (Object.keys(changedFields).length === 1) {
        if (lodash.has(changedFields, 'treatmentType')) {
          const treatmentType = changedFields.treatmentType.value;
          if (treatmentType === 'IP') {
            finalChangedFields.dateOfAdmission = undefined;
            finalChangedFields.dateOfDischarge = undefined;
            finalChangedFields.dateOfConsultation = undefined;
          } else if (treatmentType === 'OP') {
            finalChangedFields.dateOfAdmission = undefined;
            finalChangedFields.dateOfDischarge = undefined;
            finalChangedFields.dateOfConsultation = undefined;
            finalChangedFields.icuFromDate = undefined;
            finalChangedFields.icuToDate = undefined;
            finalChangedFields.icu = 0;
          }
        }
        if (
          lodash.has(changedFields, 'icu') &&
          lodash.isBoolean(formUtils.queryValue(changedFields.icu))
        ) {
          finalChangedFields.icu.value = changedFields.icu.value ? 1 : 0;
          finalChangedFields.icuFromDate = undefined;
          finalChangedFields.icuToDate = undefined;
        }
      }

      const result = formUtils.onFieldsChange(
        finalChangedFields,
        PARENTKEY,
        ITEMKEY,
        data[ITEMKEY]
      );
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    addProcedureItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, addItem } = action.payload;

      const finalData = flattenJson.addObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        addItem,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    removeProcedureItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, deleteItemId } = action.payload;
      const finalData = flattenJson.deleteObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        deleteItemId,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveProcedureItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields, PARENTKEY, ITEMKEY, data, incidentId, treatmentId } = action.payload;
      const finalChangedFields = { ...changedFields };

      if (lodash.has(changedFields, 'procedureCode')) {
        const procedureListData = lodash
          .chain(dataSource)
          .get('incidentList')
          .find({ id: incidentId })
          .get('treatmentList')
          .find({ id: treatmentId })
          .get('procedureList')
          .value();
        const procedure = procedureListData?.filter(
          (item) => formUtils.queryValue(item.procedureCode) === changedFields.procedureCode?.value
        );
        // 如果存在相同的项，则添加错误信息
        if (procedure && procedure.length > 1) {
          finalChangedFields.procedureCode.errors = [
            {
              message: 'Duplicate with existing item',
              field: 'procedureCode',
            },
          ];
        }
      }

      const result = formUtils.onFieldsChange(
        finalChangedFields,
        PARENTKEY,
        ITEMKEY,
        data[ITEMKEY]
      );
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    addInvoiceItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, addItem } = action.payload;

      const finalData = flattenJson.addObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        addItem,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    removeInvoiceItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, deleteItemId } = action.payload;
      const finalData = flattenJson.deleteObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        deleteItemId,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveInvoiceItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields, PARENTKEY, ITEMKEY, data, incidentId, treatmentId } = action.payload;

      const finalChangedFields = { ...changedFields };

      if (lodash.has(finalChangedFields, 'invoiceNo')) {
        const invoiceListData = lodash
          .chain(dataSource)
          .get('incidentList')
          .find({ id: incidentId })
          .get('treatmentList')
          .find({ id: treatmentId })
          .get('procedureList')
          .value();

        const invoice = invoiceListData?.filter(
          (item) => formUtils.queryValue(item.invoiceNo) === changedFields.invoiceNo?.value
        );
        // 如果存在相同项，则报错
        if (invoice && invoice.length > 1) {
          finalChangedFields.invoiceNo.errors = [
            {
              message: 'Duplicate with existing item',
              field: 'invoiceNo',
            },
          ];
        }
      }
      const result = formUtils.onFieldsChange(
        finalChangedFields,
        PARENTKEY,
        ITEMKEY,
        data[ITEMKEY]
      );
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    addServiceItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, addItem } = action.payload;

      const finalData = flattenJson.addObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        addItem,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    removeServiceItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { parentIdKey, parentIdValue, parentArrayKey, deleteItemId } = action.payload;
      const finalData = flattenJson.deleteObjectByFlattenPath(dataSource, {
        parentIdKey,
        parentIdValue,
        parentArrayKey,
        deleteItemId,
      });

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveServiceItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const {
        changedFields,
        PARENTKEY,
        ITEMKEY,
        data,
        incidentId,
        treatmentId,
        invoiceId,
      } = action.payload;
      const edit = { ...data, ...changedFields };
      const finalChangedFields = { ...changedFields };

      if (lodash.has(changedFields, 'serviceItem')) {
        const serviceItemListData = lodash
          .chain(dataSource)
          .get('incidentList')
          .find({ id: incidentId })
          .get('treatmentList')
          .find({ id: treatmentId })
          .get('invoiceList')
          .find({ id: invoiceId })
          .get('serviceItemList')
          .value();

        const service = serviceItemListData?.filter(
          (item) => formUtils.queryValue(item.serviceItem) === changedFields.serviceItem?.value
        );
        // 如果存在相同的费用项，则置空费用项
        if (service && service.length > 1) {
          finalChangedFields.serviceItem.errors = [
            {
              message: 'This service item already exist.',
              field: 'serviceItem',
            },
          ];
        }
      }
      if (lodash.has(changedFields, 'expensePerUnit') || lodash.has(changedFields, 'unit')) {
        finalChangedFields.expense = {
          ...finalChangedFields.expense,
          value: multiply(
            formUtils.queryValue(edit?.expensePerUnit),
            formUtils.queryValue(edit?.unit)
          ),
          dirty: true,
          touched: true,
          name: 'expense',
        };
      }
      const result = formUtils.onFieldsChange(
        finalChangedFields,
        PARENTKEY,
        ITEMKEY,
        data[ITEMKEY]
      );
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
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
    addPolicyListItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { addItem } = action.payload;

      dataSource.policyList = [...dataSource.policyList, addItem];

      return {
        ...state,
        claimProcessData: dataSource,
      };
    },
    removePolicyListItem(state, action) {
      const nextState = setData(state, action);

      return nextState;
    },
    savePolicyListItem(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields, PARENTKEY, ITEMKEY, data } = action.payload;

      const result = formUtils.onFieldsChange(changedFields, PARENTKEY, ITEMKEY, data[ITEMKEY]);
      const finalData = flattenJson.saveFieldByFlattenPath(dataSource, result);

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveRecipient(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;
      const finalData = {
        ...dataSource,
        ...changedFields,
      };

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
  },
};
