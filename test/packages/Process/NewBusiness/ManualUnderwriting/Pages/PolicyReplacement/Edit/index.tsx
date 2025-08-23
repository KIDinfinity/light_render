import React, { useMemo } from 'react';
import { Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import styles from './index.less';
import PolicyReplacementFirstInfo from './PolicyReplacementInfo/PolicyReplacementFirstInfo';
import PolicyReplacementLastInfo from './PolicyReplacementInfo/PolicyReplacementLastInfo';
import PolicyReplacementTable from './PolicyReplacementTable';
import useModalData from 'process/NewBusiness/ManualUnderwriting/_hooks/useModalData';
import { formUtils } from 'basic/components/Form';
import lodash, { isEmpty } from 'lodash';
import { useOriginPolicyReplacementFlag } from '../hooks';

const Detail = () => {
  const regionCode = tenant.region();
  const { gsIndicator, replacementInfoList, replacementFirstInfo, replacementLastInfo } =
    useModalData()?.policyReplacement || {};
  const originPolicyReplacementFlag = useOriginPolicyReplacementFlag();

  const showReplacementTable = useMemo(() => {
    if (isEmpty(replacementFirstInfo)) {
      return originPolicyReplacementFlag === 'Y';
    }
    return lodash.some(
      formUtils.formatFlattenValue(formUtils.cleanValidateData(replacementFirstInfo)),
      (value) => value === 'Y'
    );
  }, [originPolicyReplacementFlag, replacementFirstInfo]);

  const showInfo = regionCode !== Region.KH;

  const showGIOStatement = regionCode === Region.MY && gsIndicator === 'GIO';

  return (
    <div className={styles.content}>
      {showInfo && (
        <div className={styles.editField}>
          <PolicyReplacementFirstInfo data={replacementFirstInfo} />
        </div>
      )}
      {showReplacementTable && <PolicyReplacementTable data={replacementInfoList} />}
      {showInfo && (
        <div className={styles.editField}>
          <PolicyReplacementLastInfo data={replacementLastInfo} />
          {showGIOStatement && (
            <Col span={24} className={styles.GIOStatement}>
              {formatMessageApi({ Label_BIZ_Policy: 'GIOStatement' })}
            </Col>
          )}
        </div>
      )}
    </div>
  );
};

export default Detail;
