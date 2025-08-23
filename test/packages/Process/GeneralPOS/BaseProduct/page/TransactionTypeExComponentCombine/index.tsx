import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import CheckList from '../../SectionComponents/Checklist';
import { tenant } from '@/components/Tenant';
import { safeParseUtil } from '@/utils/utils';
import { vagueEqual, addKey } from '../../../common/utils';
import lodash from 'lodash';

export default function index() {
  const UIConfig = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.UIConfig);
  const processData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const transactionTypesMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
  );
  const { activityKey, caseCategory, submissionChannel } = formUtils.cleanValidateData(
    processData || {}
  );

  const regionCode = tenant.region();
  const transactionIds = lodash.keys(transactionTypesMap);
  const transactionTypeCodes = lodash
    .values(transactionTypesMap)
    .map((item) => formUtils.queryValue(item?.transactionTypeCode));
  const transactionIdsOnlyKey = transactionIds?.join('-');
  const transactionTypeCodesOnlyKey = transactionTypeCodes?.join('-');
  const newConfig = useMemo(() => {
    const newUIconfig: any = {};
    const result = {};
    transactionTypeCodes.forEach((transactionTypeCode) => {
      newUIconfig[transactionTypeCode] = {};
      (UIConfig || []).forEach((item: any) => {
        if (
          vagueEqual([
            [item.regionCode, regionCode],
            [item.caseCategory, caseCategory],
            [item.activityKey, activityKey],
            [item.submissionChannel, submissionChannel],
            [item.transactionTypeCode, transactionTypeCode],
          ])
        ) {
          addKey(
            newUIconfig[transactionTypeCode],
            { ...item, remark: safeParseUtil(item.remarkJson || '') },
            5
          );
        } else if (
          vagueEqual([
            [item.caseCategory, caseCategory],
            [item.activityKey, activityKey],
            [item.submissionChannel, submissionChannel],
            [item.transactionTypeCode, transactionTypeCode],
          ])
        ) {
          addKey(
            newUIconfig[transactionTypeCode],
            { ...item, remark: safeParseUtil(item.remarkJson || '') },
            4
          );
        } else if (
          vagueEqual([
            [item.caseCategory, caseCategory],
            [item.submissionChannel, submissionChannel],
            [item.transactionTypeCode, transactionTypeCode],
          ])
        ) {
          addKey(
            newUIconfig[transactionTypeCode],
            { ...item, remark: safeParseUtil(item.remarkJson || '') },
            3
          );
        } else if (
          vagueEqual([
            [item.submissionChannel, submissionChannel],
            [item.transactionTypeCode, transactionTypeCode],
          ])
        ) {
          addKey(
            newUIconfig[transactionTypeCode],
            { ...item, remark: safeParseUtil(item.remarkJson || '') },
            2
          );
        } else if (
          vagueEqual([[item.transactionTypeCode, transactionTypeCode]]) &&
          lodash.isEmpty(item.submissionChannel)
        ) {
          addKey(
            newUIconfig[transactionTypeCode],
            { ...item, remark: safeParseUtil(item.remarkJson || '') },
            1
          );
        } else if (
          vagueEqual([[item.submissionChannel, submissionChannel]]) &&
          lodash.isEmpty(item.transactionTypeCode)
        ) {
          addKey(
            newUIconfig[transactionTypeCode],
            { ...item, remark: safeParseUtil(item.remarkJson || '') },
            1
          );
        }
      });

      lodash.toPairs(newUIconfig[transactionTypeCode]).forEach(([key, value]) => {
        const remark = value?.remark;
        if (result[key]) {
          if (lodash.isArray(remark)) {
            result[key] = [...result[key], ...remark];
          } else if (lodash.isObject(remark)) {
            result[key] = { ...result[key], ...remark };
          }
        } else {
          result[key] = remark;
        }
      });
    });
    // checklist 去重，按照字母排序
    if (!lodash.isEmpty(result?.checkList)) {
      result.checkList = lodash
        .chain(
          lodash.map(result?.checkList, (item) => {
            if (lodash.isObject(item)) {
              return item;
            }
            return { checkCode: item };
          })
        )
        .uniqBy('checkCode')
        .sortBy('checkCode')
        .value();
    }
    return result;
  }, [
    activityKey,
    caseCategory,
    submissionChannel,
    UIConfig,
    transactionIdsOnlyKey,
    transactionTypeCodesOnlyKey,
  ]);

  return (
    <div className={styles.exComponent}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.w100)}>
          {!lodash.isEmpty(newConfig?.checkList) && (
            <div className={styles.w100}>
              <CheckList
                doubleTransaction={true}
                transactionId={transactionIds?.[0]}
                remark={newConfig?.checkList}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
