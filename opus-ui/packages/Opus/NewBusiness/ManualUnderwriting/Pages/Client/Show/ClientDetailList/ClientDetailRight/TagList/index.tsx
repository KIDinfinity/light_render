import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Tooltip } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import BooleanEnum from 'basic/enum/BooleanEnum';
import { ReactComponent as WarningIcon } from 'process/assets/warning.svg';

import styles from './index.less';

export default ({ clientId }: any) => {
  const riskIndicatorConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.riskIndicatorConfigList,
    shallowEqual
  );
  const businessDataRiskIndicatorConfigList: any = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.riskIndicatorConfigList,
    shallowEqual
  );
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );

  const tagList = useMemo(() => {
    return lodash
      .chain(businessDataRiskIndicatorConfigList)
      .filter((item) =>
        lodash.some(customerRole, (roleItem) => lodash.includes(item.customerRoleList, roleItem))
      )
      .map((item) => {
        const targetRisk = lodash.find(riskIndicatorConfigList, {
          clientId,
          riskFactorCode: item.riskFactorCode,
        });
        const targetProp = lodash.pick(targetRisk, ['status', 'fecRiskMsg', 'riskScore']);
        const itemProp = lodash.pick(item, ['id', 'linkTo', 'orderNo', 'riskFactorCode']);
        return { ...targetProp, ...itemProp };
      })
      .orderBy('orderNo')
      .value();
  }, [businessDataRiskIndicatorConfigList, riskIndicatorConfigList, customerRole]);

  const handleSkipToLink = ({ status, linkTo }: any) => {
    if (status === BooleanEnum.Yes && linkTo) {
      window.open(linkTo, '_blank');
    }
  };

  return lodash.size(tagList) > 0 ? (
    <div className={styles.tagList}>
      <div className={styles.icon}>
        <WarningIcon />
      </div>
      <div className={styles.tags}>
        {lodash.map(tagList, (item, index) => {
          return (
            <span
              key={index}
              className={classnames({
                [styles.tag]: true,
                [styles.notMatch]: item.status !== BooleanEnum.Yes,
                [styles.match]: item.status === BooleanEnum.Yes,
              })}
              onClick={() => handleSkipToLink({ status: item.status, linkTo: item.linkTo })}
            >
              <Tooltip placement="topLeft" title={item?.riskScore}>
                <span className={styles.label}>
                  {formatMessageApi({
                    Dropdown_IND_RiskIndicator: item.riskFactorCode,
                  })}
                </span>
              </Tooltip>
            </span>
          );
        })}
      </div>
    </div>
  ) : null;
};
