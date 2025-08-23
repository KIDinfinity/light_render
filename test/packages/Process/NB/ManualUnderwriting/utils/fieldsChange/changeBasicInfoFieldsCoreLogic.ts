import { produce }  from 'immer';
import lodash from 'lodash';
import {
  transConfigs,
  extraDataSrouce,
} from 'process/NB/ManualUnderwriting/_hooks/data.trans.config';
import { formUtils } from 'basic/components/Form';
import { v4 as uuid } from 'uuid';
import { tenant, Region } from '@/components/Tenant';
import { nationality_link } from '../../_models/links';

export default ({ changedFields, id, businessData }: any) => {
  const nextState = produce(businessData, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    lodash
      .chain(changedFields)
      .entries()
      .forEach((item) => {
        const [key, value] = item;
        if (
          lodash.some(
            transConfigs,
            (transConfig) =>
              lodash.has(transConfig, key) && lodash.get(transConfig, `${key}.mapchange`) !== false
          )
        ) {
          lodash.forEach(transConfigs, (transConfig) => {
            const sourcePath = lodash.get(transConfig, key);
            if (lodash.isString(sourcePath)) {
              lodash.set(
                draftState,
                `policyList[0].clientInfoList.[${index}].${sourcePath}`,
                value
              );
            }
            if (lodash.isPlainObject(sourcePath)) {
              const { baseSource, dataSoureType, matchRule, targetParam, touched } = lodash.pick(
                sourcePath,
                ['baseSource', 'dataSoureType', 'targetParam', 'matchRule', 'touched']
              );
              if (dataSoureType === 'array') {
                const dataSource = lodash
                  .chain(draftState)
                  .get(`policyList[0].clientInfoList.[${index}].${baseSource}`, [])
                  .value();
                const dataItemIndex = (() => {
                  if (lodash.isPlainObject(matchRule)) {
                    return lodash.findIndex(dataSource, (dataItem: any) => {
                      return (
                        formUtils.queryValue(lodash.get(dataItem, matchRule?.paramKey)) ===
                        matchRule?.paramValue
                      );
                    });
                  }

                  if (lodash.isArray(matchRule)) {
                    return lodash.findIndex(dataSource, (dataItem: any) => {
                      return lodash.every(matchRule, (rule) => {
                        if (rule.operator === 'includes') {
                          return lodash.includes(
                            rule?.paramValue,
                            formUtils.queryValue(lodash.get(dataItem, rule?.paramKey))
                          );
                        }
                        return !lodash.includes(
                          rule?.paramValue,
                          formUtils.queryValue(lodash.get(dataItem, rule?.paramKey))
                        );
                      });
                    });
                  }
                })();
                if (dataItemIndex === -1) {
                  if (touched) {
                    if (!value?.touched) {
                      return;
                    }
                  }

                  const dataIndex = lodash.max([dataItemIndex, dataSource?.length || 0]);

                  lodash.set(
                    draftState,
                    `policyList[0].clientInfoList.[${index}].${baseSource}[${dataIndex}].${targetParam}`,
                    value
                  );
                  lodash.set(
                    draftState,
                    `policyList[0].clientInfoList.[${index}].${baseSource}[${dataIndex}].id`,
                    uuid()
                  );
                  if (lodash.isPlainObject(matchRule)) {
                    lodash.set(
                      draftState,
                      `policyList[0].clientInfoList.[${index}].${baseSource}[${dataIndex}].${matchRule?.paramKey}`,
                      matchRule?.paramValue
                    );
                  }
                  if (lodash.isArray(matchRule)) {
                    lodash.forEach(matchRule, (rule: any) => {
                      if (lodash.isString(rule?.paramValue)) {
                        lodash.set(
                          draftState,
                          `policyList[0].clientInfoList.[${index}].${baseSource}[${dataIndex}].${rule?.paramKey}`,
                          rule?.paramValue
                        );
                      }
                      if (lodash.isArray(rule?.paramValue)) {
                        if (rule?.operator === 'includes') {
                          lodash.set(
                            draftState,
                            `policyList[0].clientInfoList.[${index}].${baseSource}[${dataIndex}].${rule?.paramKey}`,
                            lodash.first(rule?.paramValue)
                          );
                        }
                        if (rule?.operator === 'notIncludes') {
                          lodash.set(
                            draftState,
                            `policyList[0].clientInfoList.[${index}].${baseSource}[${dataIndex}].${rule?.paramKey}`,
                            null
                          );
                        }
                        lodash.set(
                          draftState,
                          `policyList[0].clientInfoList.[${index}].${key}`,
                          value
                        );
                      }
                    });
                  }
                } else if (lodash.isNumber(dataItemIndex) && dataItemIndex > -1) {
                  lodash.set(
                    draftState,
                    `policyList[0].clientInfoList.[${index}].${baseSource}[${dataItemIndex}].${targetParam}`,
                    value
                  );
                }
              }
            }
          });
          return;
        }
        if (lodash.has(extraDataSrouce, key)) {
          const sourcePath = lodash.get(extraDataSrouce, key);
          lodash.set(draftState, `${sourcePath}`, value);
          return;
        }
        lodash.set(draftState, `policyList[0].clientInfoList.[${index}].${key}`, value);
      })
      .value();

    if (lodash.has(changedFields, 'ctfCountryCode')) {
      const findIndex = lodash.findIndex(
        draftState.policyList[0].clientInfoList[index].crtInfoList,
        (el: any) => el.clientId === id
      );
      lodash.set(
        draftState,
        `policyList[0].clientInfoList.[${index}].crtInfoList[${findIndex}].ctfPlace`,
        ''
      );
    }
    if (lodash.has(changedFields, 'noTin')) {
      const noTin = formUtils.queryValue(changedFields?.noTin);
      const findIndex = lodash.findIndex(
        draftState.policyList[0].clientInfoList[index].crtInfoList,
        (el: any) => el.clientId === id
      );
      lodash.set(
        draftState,
        `policyList[0].clientInfoList.[${index}].crtInfoList[${findIndex}].noTin`,
        noTin
      );
    }
    if (lodash.has(changedFields, 'ctfPlace')) {
      const ctfPlace = formUtils.queryValue(changedFields?.ctfPlace);
      const findIndex = lodash.findIndex(
        draftState.policyList[0].clientInfoList[index].crtInfoList,
        (el: any) => el.clientId === id
      );
      lodash.set(
        draftState,
        `policyList[0].clientInfoList.[${index}].crtInfoList[${findIndex}].ctfPlace`,
        ctfPlace
      );
    }

    if (Region.ID === tenant.region() && lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'natureOfBusiness')) {
        lodash.set(draftState, `policyList[0].clientInfoList.[${index}].occupationCode`, null);
        lodash.set(draftState, `policyList[0].clientInfoList.[${index}].occupationClass`, null);
        lodash.set(draftState, `policyList[0].clientInfoList.[${index}].occupationSector`, null);
      }
    }

    if (
      lodash.has(changedFields, 'industryAffiliation1') &&
      formUtils.queryValue(changedFields?.industryAffiliation1) !== 'Y'
    ) {
      lodash.set(draftState, `policyList[0].clientInfoList.[${index}].exactAffiliation1`, null);
    }
    if (
      lodash.has(changedFields, 'industryAffiliation2') &&
      formUtils.queryValue(changedFields?.industryAffiliation2) !== 'Y'
    ) {
      lodash.set(draftState, `policyList[0].clientInfoList.[${index}].exactAffiliation2`, null);
    }
    nationality_link({ draftState, changedFields, index });
    // changedFields中的nationality是MYS(malasian)，malaysianpr改为N
    if (
      lodash.size(changedFields) === 1 &&
      lodash.has(changedFields, 'nationality') &&
      formUtils.queryValue(changedFields?.nationality) === 'MYS'
    ) {
      lodash.set(draftState, `policyList[0].clientInfoList.[${index}].malaysianPR`, 'N');
    }

    if (
      lodash.size(changedFields) === 1 &&
      lodash.has(changedFields, 'occupationCode') &&
      Region.MY === tenant.region()
    ) {
      lodash.set(draftState, `policyList[0].clientInfoList.[${index}].occupationGroup`, null);
      lodash.set(draftState, `policyList[0].clientInfoList.[${index}].occupationClass`, null);
    }
  });

  return {
    ...nextState,
  };
};
