import React from 'react';
import { Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetDPRemarkColumns from 'process/NB/ManualUnderwriting/_hooks/useGetDPRemarkColumns';
import useGetDPRemark from 'process/NB/ManualUnderwriting/_hooks/useGetDPRemark';
import useHandleDeleteDPRemarkCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteDPRemarkCallback';
import useDPRemarkExpanderCallback from 'process/NB/ManualUnderwriting/_hooks/useDPRemarkExpanderCallback';
import useGetSustainabilityCaseCheckStatus from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';
import DPRemarkSection from './DPRemarkSection';
import styles from './index.less';

const DPRemark = ({ record }: any) => {
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const DPRemarkColumns = useGetDPRemarkColumns();

  const productCode = lodash.get(record, 'coreCode');
  const coverageId = lodash.get(record, 'id');
  const DPRemarkList: any = useGetDPRemark({ coverageId });
  const removeDPRemark = useHandleDeleteDPRemarkCallback();
  const onExpander = useDPRemarkExpanderCallback();
  const { editableOfSustainability = true } = useGetSustainabilityCaseCheckStatus();

  return (
    !lodash.isEmpty(DPRemarkList) && (
      <div
        className={classnames({
          [styles.wrap]: !lodash.isEmpty(DPRemarkList),
          [styles.noWrap]: lodash.isEmpty(DPRemarkList),
        })}
        data-id="PostponeDeclineRemark"
      >
        <div className={styles.header}>
          {formatMessageApi({ Label_BIZ_policy: 'PostponeDeclineRemark' })}
        </div>
        <div className={styles.content}>
          <div className={styles.benefit}>
            <Row gutter={[16, 16]} className={styles.fie}>
              {lodash.map(DPRemarkColumns, (item, index) => (
                <Col key={index} span={item?.span}>
                  {item?.title}
                </Col>
              ))}
            </Row>
          </div>
          {lodash.map(DPRemarkList, (item: any) => {
            return (
              <div key={item?.id} className={styles.DPRemarkList}>
                <div className={styles.DPRemark}>
                  <DPRemarkSection
                    DPRemarkField={item}
                    id={item?.id}
                    coverageId={record?.id}
                    productCode={productCode}
                    editableOfSustainability={editableOfSustainability}
                  />
                </div>
                {!taskNotEditable && editableOfSustainability ? (
                  <div className={styles.btnWrap}>
                    <div
                      className={styles.icon}
                      onClick={() => removeDPRemark(item?.id, coverageId)}
                    >
                      <Icon type="close" />
                    </div>
                    {item?.id === DPRemarkList[DPRemarkList?.length - 1]?.id ? (
                      <div className={styles.icon} onClick={() => onExpander(record)}>
                        <Icon type="plus" />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default DPRemark;
