import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { errorMessageModal } from 'claim/pages/utils/popModel';
import { diff } from 'json-diff';

const VLD_000574 = (data: any, targetData: any) => {
  const ruleMap = [
    {
      fields: { causeOfIncident: 'string', incidentDate: 'date' },
      mapKey: 'incidentListMap',
    },
    {
      fields: { diagnosisType: 'string', diagnosisCode: 'string' },
      mapKey: 'diagnosisListMap',
    },
    {
      fields: { dateOfAdmission: 'date', dateOfDischarge: 'date' },
      mapKey: 'treatmentListMap',
    },
    {
      fields: { opTreatmentList: 'array' },
      mapKey: 'treatmentListMap',
      filterDatas: { diagnosisIdList: '', outpatientTreatmentDate: 'date' },
    },
    {
      fields: { hospitalizationFlg: 'string', hospitalizationSequentialNo: 'string' },
      mapKey: 'treatmentPayableListMap',
      options: (mapData: any, itemData: any) => {
        const payableId = itemData?.payableId;
        const { benefitCategory, benefitSubCategory } = lodash.pick(
          mapData?.claimPayableListMap?.[payableId],
          ['benefitCategory', 'benefitSubCategory']
        );
        if (benefitCategory === 'C' && benefitSubCategory !== 'OP') return true;
        return false;
      },
    },
  ];

  const format = (value: string, type: string, filterDatas: any) => {
    const handler = {
      string: () => (lodash.isNil(value) ? '' : lodash.toString(value)),
      date: () => {
        if (lodash.isNil(value) || value === '') {
          return null;
        }
        if (moment(value).isValid()) {
          return moment(value).format();
        }
        return value;
      },
      array: () => {
        return lodash
          .chain(value)
          .map((item: any) => {
            return !!filterDatas && !lodash.isEmpty(filterDatas)
              ? lodash.reduce(
                lodash.keys(filterDatas),
                (result, key) => {
                  return {
                    ...result,
                    [key]: format(item?.[key], filterDatas[key]),
                  };
                },
                {}
              )
              : item;
          })
          .value();
      },
      default: () => value,
    };
    return lodash.isFunction(handler?.[type]) ? handler?.[type]() : handler.default();
  };

  const packDataFn = (target: any) =>
    lodash
      .chain(ruleMap)
      .map((ruleItem) => {
        return lodash
          .chain(formUtils.cleanValidateData(target)?.[ruleItem?.mapKey])
          .map((item) => item)
          .filter(item => item.isAdjustment !== "Y")
          .orderBy('id')
          .map((mapItem) => {
            const keys = lodash.keys(ruleItem.fields);
            const filterDatas = ruleItem.filterDatas || [];
            const pickResult = lodash.pick(mapItem, keys);

            if (lodash.isFunction(ruleItem.options) && !ruleItem.options(target, mapItem)) {
              return '';
            }

            return lodash.reduce(
              keys,
              (result, item) => ({
                ...result,
                [item]: format(pickResult?.[item], ruleItem.fields[item], filterDatas),
              }),
              {}
            );
          })
          .compact()
          .value();
      })
      .value();

  const compareData = packDataFn(data);
  const compareTargetData = packDataFn(targetData);

  const result = diff(compareData, compareTargetData);

  return !!result;
};

export default function* validatorCase(action: any, { select }: any) {
  const data = yield select((state: any) => state.JPCLMOfClaimAssessment?.claimEntities);
  const targetData = yield select(
    (state: any) => state.claimCaseController?.comparedClaimCreateNormalizeData?.claimEntities
  );

  if (VLD_000574(data, targetData)) {
    return errorMessageModal([{ Label_COM_Message: 'MSG_000495' }], true);
  }
  return false;
}
