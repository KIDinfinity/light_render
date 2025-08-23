/**
 * 获取payable修改数据
 * 1.获取需要对比的数据对象
 * 2.组装对比的字段
 * 3.diff算法对比
 * 4.合并之前reassement过的改动(这个方法只在点击reassement的时候出发)
 */

import lodash from 'lodash';
import { diff } from 'json-diff';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { mapToPayableListMap } from 'process/Utils/benefitCategoryUtils';
import { NAMESPACE } from '../../activity.config';

// 基础配置
const configs = {
  // 数据组装
  contrast: {
    // 原始数据
    datas: {
      basic: mapToPayableListMap,
      JP: {
        [eBenefitCategory.T]: 'otherProcedurePayableListMap',
        [eBenefitCategory.CIC]: 'otherProcedurePayableListMap',
        [eBenefitCategory.MIC]: 'claimIncidentPayableListMap',
      },
      assessObjectIdKeys: {
        [eBenefitCategory.Cashless]: 'treatmentId',
        [eBenefitCategory.Aipa]: 'treatmentId',
        [eBenefitCategory.Reimbursement]: 'serviceItemId',
        [eBenefitCategory.S]: 'procedureId',
        [eBenefitCategory.T]: 'otherProcedureId',
        [eBenefitCategory.Crisis]: 'otherProcedureId',
        [eBenefitCategory.CIC]: 'otherProcedureId',
        [eBenefitCategory.MIC]: 'incidentId',
      },
    },
    // 匹配的filed
    fileds: {
      basic: [
        'assessObjectId',
        // 'assessorOverrideCalculationDays',
        'benefitCategory',
        'benefitItemCode',
        'benefitTypeCode',
        // 去掉这个是因为需要在claimPayable里面拿
        // 'claimDecision',
        'claimNo',
        'coverageKey',
        'incidentId',
        'policyCurrency',
        'policyId',
        'productCode',
        'productPlan',
        'treatmentId',
      ],
      extra: {
        [eBenefitCategory.Cashless]: [
          'hospitalizationFlg',
          'hospitalizationSequentialNo',
          'policyYear',
        ],
        [eBenefitCategory.S]: ['assessorOverrideMultiple'],
        [eBenefitCategory.T]: ['assessorOverrideMultiple'],
      },
      getPayableDay: ({ item }: any) => {
        const dayKey = tenant.region({
          [Region.JP]: 'assessorOverrideDays',
          notMatch: 'payableDays',
        });

        return item[dayKey];
      },
      getPayableAmount: ({ key, item }: any) => {
        // 只有这两种类型需要
        return key === eBenefitCategory.S || key === eBenefitCategory.T
          ? {
              assessorOverrideAmount: item.assessorOverrideAmount,
            }
          : {};
      },
      getAssessorOverrideTimes: ({ item }: any) => {
        const assessorOverrideTimes = tenant.region({
          [Region.JP]: 'assessorOverrideTimes',
          notMatch: 'assessorOverrideTimes',
        });
        const treatmentTimes = tenant.region({
          [Region.JP]: 'treatmentTimes',
          notMatch: 'treatmentTimes',
        });
        return item[assessorOverrideTimes] || item[treatmentTimes];
      },
    },
  },
};
// 操作类型
enum OperationType {
  Delete = 'E',
  AddModify = 'I',
}

/**
 * 1./2.获取对比数据(TODO:这里应该说明如何获取)
 */
const getContrastData = ({ processData }: any) => {
  const {
    claimEntities = {},
    claimProcessData: { claimPolicyPayableList = [] },
  } = processData || {};

  const { datas, fileds } = configs.contrast;

  const Maps = {
    ...datas.basic,
    ...(tenant.region() === Region.JP ? datas.JP : {}),
  };

  return lodash
    .chain(Maps)
    .keys()
    .reduce((map: any, key: any) => {
      return {
        ...map,
        ...(lodash
          .chain(claimEntities[Maps[key]] || {})
          .values()
          .reduce((maps1: any, item: any) => {
            const claimpayableItem = claimEntities?.claimPayableListMap?.[item?.payableId] || {};

            if (claimpayableItem.benefitCategory === key) {
              const newItem = formUtils.cleanValidateData({
                ...lodash.pick(item, [...fileds.basic]),
                ...(lodash
                  .chain(fileds.extra[key] || [])
                  .reduce((itemMaps: any, el: any) => {
                    return {
                      ...itemMaps,
                      [el]: item[el],
                    };
                  }, {})
                  .value() || {}),

                ...lodash.pick(claimpayableItem, [
                  'claimDecision',
                  'deductibleAmount',
                  'benefitCategory',
                  'coverageKey',
                  'productPlan',
                  'policyCurrency',
                ]),
                ncdFlag:
                  lodash
                    .chain(claimPolicyPayableList)
                    .find(({ policyNo }) => policyNo === claimpayableItem.policyNo)
                    .get('ncdFlag')
                    .value() || null,
                policyId: claimpayableItem.policyNo,
                assessObjectId:
                  item?.[datas.assessObjectIdKeys?.[claimpayableItem?.benefitCategory]],
                assessorOverrideCalculationDays: fileds.getPayableDay({ item }),
                assessorOverrideTimes: fileds.getAssessorOverrideTimes({ item }),
                ...fileds.getPayableAmount({ key, item }),
              });

              return {
                ...maps1,
                ...{
                  [item.id]: lodash.mapValues(newItem, (valueItem: any) => {
                    return lodash.isNil(valueItem) ? '' : valueItem;
                  }),
                },
              };
            } else {
              return maps1;
            }
          }, {})
          .value() || {}),
      };
    }, {})
    .value();
};

/**
 * 3.diff算法对比
 */
const getDiffList = (oldDatas: any, newDatas: any) => {
  const diffJson = diff(oldDatas, newDatas);
  if (!diffJson) return [];

  const group = { D: 'deny', N: 'deny', A: 'approve', E: 'approve', P: 'approve' };

  return lodash
    .chain(diffJson || {})
    .keys()
    .reduce((list: any, key: any) => {
      const data = lodash.pick(diffJson[key], [
        'incidentId',
        'assessObjectId',
        'policyId',
        'productCode',
        'benefitTypeCode',
        'benefitItemCode',
        'policyYear',
      ]);
      // 新增/删除
      if (
        (lodash.includes(key, '__added') || lodash.includes(key, '__deleted')) &&
        !lodash.find(list, { ...data })
      ) {
        return [
          ...list,
          {
            ...diffJson[key],
            operation: lodash.includes(key, '__added')
              ? OperationType.AddModify
              : OperationType.Delete,
          },
        ];
      }

      /**
       * 修改
       * 1. 只修改claimDecision并且属于相同的组,不添加
       * 2. 只修改claimDecision并且属于不同的组,添加
       * 3. 修改其他字段添加两条数据(OperationType.Delete/OperationType.AddModify)
       */
      const claimDecisionObject = diffJson[key]?.claimDecision || {};

      if (lodash.size(diffJson[key]) === 1 && !lodash.isEmpty(claimDecisionObject)) {
        return group?.[claimDecisionObject.__old] === group?.[claimDecisionObject?.__new]
          ? [...list]
          : [
              ...list,

              {
                ...newDatas[key],
                operation: OperationType.AddModify,
              },
            ];
      }

      const changeProduct =
        lodash
          .chain(diffJson[key])
          .keys()
          .filter((el: any) =>
            lodash.includes(['productCode', 'benefitTypeCode', 'benefitItemCode'], el)
          )
          .value() || [];

      return lodash.isEmpty(changeProduct)
        ? [
            ...list,
            {
              ...newDatas[key],
              operation: OperationType.AddModify,
            },
          ]
        : [
            ...list,
            {
              ...oldDatas[key],
              operation: OperationType.Delete,
            },
            {
              ...newDatas[key],
              operation: OperationType.AddModify,
            },
          ];
    }, [])
    .value();
};

export default function* getExpectDecisionList(_: any, { select }: any) {
  // @ts-ignore
  const originClaimProcessData: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.originClaimProcessData
  );
  // @ts-ignore
  const currentClaimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace
  );

  const origionContrastData = getContrastData({
    processData: originClaimProcessData,
  });
  const changeContrastData = getContrastData({
    processData: currentClaimProcessData,
  });
  const diffArr = getDiffList(origionContrastData, changeContrastData);

  return (
    lodash
      .chain(diffArr)
      .reduce((hasChange: boolean, item: any) => {
        if (lodash.keys(item).length > 1 && !!item?.ncdFlag) {
          return true;
        }
        return hasChange;
      }, false)
      .value() || false
  );
}
