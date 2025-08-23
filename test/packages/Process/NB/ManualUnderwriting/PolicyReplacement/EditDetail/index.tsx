import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { Icon, Button } from 'antd';
import classnames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import ShowFlag from 'process/NB/ManualUnderwriting/Enum/ShowFlag';
import useGetShowReplacementTableEdit from 'process/NB/ManualUnderwriting/_hooks/useGetShowReplacementTableEdit';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import PolicyReplacementHeader from '../PolicyReplacement-Header/Edit';
import EditFirstField from '../PolicyReplacement-Field/PolicyReplacementFirstField';
import EditLastField from '../PolicyReplacement-Field/PolicyReplacementLastField';
import EditTable from '../PolicyReplacement-Table/Edit';
import styles from './index.less';

const Detail = ({ config }: any) => {
  const regionCode = tenant.region();
  const dispatch = useDispatch();
  const businessData = useSelector((state: any) => state?.manualUnderwriting?.businessData);
  const showReplacementTable = useGetShowReplacementTableEdit();
  const replacementInfoList = lodash.get(businessData, 'policyList[0].replacementInfoList', []);
  const gsIndicator = lodash.get(businessData, 'policyList[0].gsIndicator');
  const policyReplacementFlag = formUtils.queryValue(
    lodash.get(businessData, 'policyList[0].policyReplacementFlag')
  );
  const showFlag = !!lodash.toString(policyReplacementFlag);
  const [expendStatus, setExpendStatus] = useState(policyReplacementFlag === ShowFlag.Yes);
  const policyReplacementData = { policyReplacementFlag };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getDropdownList`,
    });
  }, []);

  useEffect(() => {
    if (policyReplacementFlag === ShowFlag.Yes) {
      setExpendStatus(true);
    }
  }, [policyReplacementFlag]);

  const handleAddPolicy = () => {
    setExpendStatus(true);
    dispatch({
      type: `${NAMESPACE}/addPolicyTableRow`,
    });
    dispatch({
      type: `${NAMESPACE}/setPolicyReplacementData`,
      payload: {
        changedFields: {
          policyReplacementFlag: 'Y',
        },
      },
    });
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.titleinfo}>
        <div className={classnames(styles.head, { [styles.hidden]: expendStatus })}>
          <div className={styles.titleWrap}>
            <span className={styles.title}>
              {formatMessageApi({ Label_BIZ_Policy: 'ReplacementofPolicy' })}
            </span>
            <span className={styles.info}>
              <PolicyReplacementHeader
                setExpendStatus={setExpendStatus}
                data={policyReplacementData}
              />
            </span>
            {showFlag && (
              <div className={styles.actions}>
                <Icon
                  type={!expendStatus ? 'down' : 'up'}
                  onClick={() => showFlag && setExpendStatus(!expendStatus)}
                />
              </div>
            )}
          </div>
          {showReplacementTable && (
            <Button onClick={handleAddPolicy} disabled={replacementInfoList?.length === 10}>
              Add Policy
            </Button>
          )}
        </div>
      </div>
      {expendStatus && showFlag ? (
        <div className={styles.content}>
          {regionCode !== Region.KH && (
            <div className={styles.editField}>
              <EditFirstField config={config} data={lodash.get(businessData, 'policyList[0]')} />
            </div>
          )}
          {showReplacementTable && <EditTable config={config} />}
          {regionCode !== Region.KH && (
            <div className={styles.editField}>
              <EditLastField
                config={config}
                data={lodash.get(businessData, 'policyList[0].replacementInfoList[0]')}
              />
              {regionCode === Region.MY && gsIndicator === 'GIO' && (
                <Col span={24} className={styles.GIOStatement}>
                  {formatMessageApi({ Label_BIZ_Policy: 'GIOStatement' })}
                </Col>
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
