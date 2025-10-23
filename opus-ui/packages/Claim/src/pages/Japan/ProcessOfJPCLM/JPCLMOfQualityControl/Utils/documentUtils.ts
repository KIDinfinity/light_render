import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { DocumentStatus, DocumentCategory, CategoryLower, Category } from '../Enum';

class DocumentUtils {
  McReport = [
    CategoryLower.DiagnosisReport,
    CategoryLower.DeathReport,
    CategoryLower.HospitalizationReport,
    CategoryLower.TreatmentReport,
    CategoryLower.OtherDiagnosisReport,
  ];

  isNotEmpty = (target: any) => target !== null && target !== '' && target !== undefined;

  // 诊断书到着日书类判别
  isMcReport = (documentTypeCode: string) =>
    DocumentCategory[documentTypeCode] &&
    lodash.includes(this.McReport, lodash.toLower(DocumentCategory[documentTypeCode]));

  // 是否请求书
  isRequestForm = (documentTypeCode: string) =>
    lodash.toLower(DocumentCategory[documentTypeCode]) === CategoryLower.RequestForm;

  // 是否年金
  isAnnuityForm = (documentTypeCode: string) =>
    lodash.toLower(DocumentCategory[documentTypeCode]) === CategoryLower.AnnuityForm;

  // 是否所有书类到着
  isAllReceived = (bpoFormDataList: any) =>
    lodash.every(
      Object.values(bpoFormDataList),
      (doc: any) => lodash.toLower(doc.documentStatus) === DocumentStatus.R
    );

  // 请求番号层级日期判别
  isAllFormListReceived = (formList: any[]) =>
    lodash.every(formList, (el) => formUtils.queryValue(el.lastFormReceiveDate));

  isShowError = (formList: any[]) =>
    lodash.some(formList, (el) => lodash.get(el, 'lastFormReceiveDate.errors'));

  // 获取
  getFormArrivalDate = ({ formData }: any) => {
    const { documentTypeCode = '' } = formData;
    if (lodash.toLower(DocumentCategory[documentTypeCode]) !== CategoryLower.RequestForm) return {};

    const { receivedDate, agencyAcceptanceDate, counterAcceptanceSign } = formData;
    const dates = [receivedDate, agencyAcceptanceDate, counterAcceptanceSign]
      .map((date) => (formUtils.queryValue(date) ? +new Date(formUtils.queryValue(date)) : null))
      .filter((date) => !!date);
    return {
      // @ts-ignore
      applicationFromArrivalDate: dates.length
        ? moment(Math.min(...dates))
            .startOf('day')
            .format()
        : null,
    };
  };

  // claimType 格式转换， 清除空数组
  formatFormData = ({ formDataList, clearEmptyArray = false }: any) =>
    lodash.keys(formDataList).reduce((formDataMap, current) => {
      const newItem = clearEmptyArray
        ? this.clearEmptyArray(formDataList[current])
        : formDataList[current];
      const { documentTypeCode, claimType } = newItem.formData;
      const isRequesForm = this.isRequestForm(documentTypeCode);
      const claimTypeValue = formUtils.queryValue(claimType);
      return {
        ...formDataMap,
        [current]:
          isRequesForm && lodash.isArray(claimTypeValue) && !lodash.isEmpty(claimTypeValue)
            ? {
                ...newItem,
                formData: {
                  ...newItem.formData,
                  claimType: claimTypeValue.join(','),
                },
              }
            : newItem,
      };
    }, {});

  // 清楚空的数组
  clearEmptyArray = (item: any) => ({
    ...item,
    formData: lodash.keys(item.formData).reduce(
      (formDataMap, current) => ({
        ...formDataMap,
        [current]: lodash.isArray(item.formData[current])
          ? lodash.filter(item.formData[current], (el) =>
              lodash.isObject(el) ? lodash.keys(el).length !== 1 : true
            )
          : item.formData[current],
      }),
      {}
    ),
  });

  // 获取用户手动改状态的书类
  getDocInfoList = (claimProcessData: any) => {
    const bpoDocumentDataList = lodash.get(
      claimProcessData,
      'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList',
      []
    );
    const docInfoList = lodash
      .chain(bpoDocumentDataList)
      .filter((doc: any) => !!doc.isChangeStausByUser)
      .map((doc: any) => ({
        docId: doc.bpmDocumentId,
        content: JSON.stringify(doc),
      }))
      .value();
    return !lodash.isEmpty(docInfoList) ? docInfoList : false;
  };

  // 获取书类的氏名
  getNameArray = (source: any, documentId: string) =>
    lodash
      .chain(source)
      .filter((item, key: string) => {
        const { formData } = item;
        return (
          key !== documentId && lodash.has(Category, DocumentCategory[formData.documentTypeCode])
        );
      })
      .map((item) =>
        formUtils.queryValue(
          lodash.get(item, 'formData.injuredName') || lodash.get(item, 'formData.insuredName')
        )
      )
      .value();
}

export const {
  isNotEmpty,
  isMcReport,
  isRequestForm,
  isAnnuityForm,
  isAllReceived,
  isAllFormListReceived,
  isShowError,
  getFormArrivalDate,
  formatFormData,
  clearEmptyArray,
  getDocInfoList,
  getNameArray,
} = new DocumentUtils();
