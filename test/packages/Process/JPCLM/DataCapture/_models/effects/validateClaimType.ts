import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  treatmentListValidate,
  procedureListValidate,
  otherProcedureListValidate,
  ServiceListValidate,
} from '@/utils/validations';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { denormalizeClaimData } from '../../utils/normalizrUtils';

const validateMessages = ({ promptMessages, code, messageCode, contentList, incidentNo }: any) => {
  return promptMessages.push({
    code,
    content: formatMessageApi(
      {
        Label_COM_Message: messageCode,
      },
      contentList.join(','),
      incidentNo
    ),
  });
};

export default function* validateClaimType(_: any, { select }: any) {
  const { claimProcessData, claimEntities, submited, claimType } = yield select((state: any) => ({
    claimProcessData: state.JPCLMOfDataCapture.claimProcessData,
    claimEntities: state.JPCLMOfDataCapture.claimEntities,
    submited: state.formCommonController.submited,
    claimType: state.dictionaryController.ClaimType,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const promptMessages: any = [];
  lodash.map(claimData.incidentList, (incidentItem: any) => {
    const validateTreatment = treatmentListValidate({ incidentItem, submited, claimEntities });
    const validateProcedure = procedureListValidate({ incidentItem, submited, claimEntities });
    const validateOtherProcedure = otherProcedureListValidate({
      incidentItem,
      submited,
      claimEntities,
    });
    const validateService = ServiceListValidate({ incidentItem, submited, claimEntities });
    const validateOneList: any = [];
    const validateTwoList: any = [];
    const sectionListMap = [
      validateTreatment,
      validateProcedure,
      validateOtherProcedure,
      validateService,
    ];

    lodash.forEach(sectionListMap, (item: any) => {
      validateOneList.push(item?.validateOne);
      validateTwoList.push(item?.validateTwo);
    });

    const validateOneContentList = lodash
      .chain(validateOneList)
      .filter((item: any) => item.value)
      .map((item: any) => {
        return lodash.map(claimType, (value: any) => {
          if (value.dictCode === item.sectionType) {
            return value.dictName;
          }
        });
      })
      .flatten()
      .compact()
      .uniq()
      .value();

    const validateTwoContentList = lodash
      .chain(validateTwoList)
      .filter((item: any) => item?.value)
      .map((item: any) => item?.sectionTitle)
      .compact()
      .uniq()
      .value();

    if (!lodash.isEmpty(validateOneContentList)) {
      const outHP = lodash.filter(validateOneContentList, (el: any) => el !== '入院');
      if (!lodash.isEmpty(outHP)) {
        validateMessages({
          promptMessages,
          contentList: outHP,
          messageCode: 'MSG_000451',
          code: `${incidentItem.id}claimType`,
          incidentNo: incidentItem.incidentNo,
        });
      }
      if (validateOneContentList.includes('入院')) {
        promptMessages.push({
          code: `${incidentItem.id}claimType`,
          content: formatMessageApi(
            {
              Label_COM_Message: 'MSG_000520',
            },
            incidentItem.incidentNo
          ),
        });
      }
    }
    if (!lodash.isEmpty(validateTwoContentList)) {
      validateMessages({
        promptMessages,
        contentList: validateTwoContentList,
        messageCode: 'MSG_000452',
        code: `${incidentItem.id}sectionName`,
        incidentNo: incidentItem.incidentNo,
      });
    }
  });

  return promptMessages;
}
