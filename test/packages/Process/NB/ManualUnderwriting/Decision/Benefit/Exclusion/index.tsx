import React, { useMemo } from 'react';
import { Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetExclusionColumns from 'process/NB/ManualUnderwriting/_hooks/useGetExclusionColumns';
import useGetBenefitLevelExclusion from 'process/NB/ManualUnderwriting/_hooks/useGetBenefitLevelExclusion';
import useHandleDeleteBenefitLevelExclusionCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteBenefitLevelExclusionCallback';
import useBenefitExclusionExpanderCallback from 'process/NB/ManualUnderwriting/_hooks/useBenefitExclusionExpanderCallback';
import useGetSustainabilityCaseCheckStatus from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';
import ExclusionSection from './ExclusionSection';
import styles from './index.less';

const Exclusion = ({ record }: any) => {
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const exclusionColumns = useGetExclusionColumns();
  const finalExclusionColumns = useMemo(() => {
    return lodash.filter(exclusionColumns, (item: any) => item?.id !== 'productName');
  }, [exclusionColumns]);

  const productCode = useMemo(() => {
    return lodash.get(record, 'coreCode');
  }, [record]);
  const coverageId = useMemo(() => {
    return lodash.get(record, 'id');
  }, [record]);
  const exclusionList: any = useGetBenefitLevelExclusion({ coverageId });
  const removeExclusion = useHandleDeleteBenefitLevelExclusionCallback();
  const onExpander = useBenefitExclusionExpanderCallback();
  const { editableOfSustainability = true } = useGetSustainabilityCaseCheckStatus();

  return (
    !lodash.isEmpty(exclusionList) && (
      <div
        className={classnames({
          [styles.wrap]: !lodash.isEmpty(exclusionList),
          [styles.noWrap]: lodash.isEmpty(exclusionList),
        })}
        data-id="Exclusion"
      >
        <div className={styles.header}>Exclusion</div>
        <div className={styles.content}>
          <div className={styles.benefit}>
            <Row gutter={[16, 16]} className={styles.fie}>
              {lodash.map(finalExclusionColumns, (item, index) => (
                <Col key={index} span={item?.span}>
                  {item?.title}
                </Col>
              ))}
            </Row>
          </div>
          {lodash.map(exclusionList, (item: any) => {
            const isCompulsory = item.compulsoryInd === 'Y';
            return (
              <div key={item?.id} className={styles.exclusionList}>
                <div className={styles.exclusion}>
                  <ExclusionSection
                    editable={!isCompulsory}
                    exclusionField={item}
                    id={item?.id}
                    coverageId={record?.id}
                    productCode={productCode}
                    editableOfSustainability={editableOfSustainability}
                  />
                </div>
                {!taskNotEditable && editableOfSustainability ? (
                  <div className={styles.btnWrap}>
                    {!isCompulsory && (
                      <div
                        className={styles.icon}
                        onClick={() => removeExclusion(item?.id, coverageId)}
                      >
                        <Icon type="close" />
                      </div>
                    )}
                    {item?.id === exclusionList[exclusionList?.length - 1]?.id ? (
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

export default Exclusion;
