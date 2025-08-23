import React from 'react';
import { Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetExclusionColumns from 'process/NB/ManualUnderwriting/_hooks/useGetExclusionColumns';
import useGetPolicyLevelExclutionList from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyLevelExclutionList';
import useDeletePolicyLevelExclusionCallback from 'process/NB/ManualUnderwriting/_hooks/useDeletePolicyLevelExclusionCallback';
import useAddPolicyLevelExclusionCallback from 'process/NB/ManualUnderwriting/_hooks/useAddPolicyLevelExclusionCallback';
import ExclusionSection from './ExclusionSection';
import styles from './index.less';

const Exclusion = ({ record }: any) => {
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const exclusionColumns = useGetExclusionColumns();
  const finalExclusionColumns = lodash.filter(
    exclusionColumns,
    (item: any) => item?.id !== 'productName'
  );
  const productCode = lodash.get(record, 'coreCode');
  const coverageId = lodash.get(record, 'id');
  const exclusionList: any = useGetPolicyLevelExclutionList();

  const removeExclusion = useDeletePolicyLevelExclusionCallback();

  const onExpander = useAddPolicyLevelExclusionCallback();

  return (
    <div
      className={classnames({
        [styles.wrap]: !lodash.isEmpty(exclusionList),
        [styles.noWrap]: lodash.isEmpty(exclusionList),
      })}
      data-id="Exclusion"
    >
      {!lodash.isEmpty(exclusionList) ? (
        <>
          <span className={styles.span}>Exclusion</span>
          <div className={styles.benefit}>
            <Row gutter={[16, 16]} className={styles.fie}>
              {lodash.map(finalExclusionColumns, (item, index) => (
                <Col key={index} span={item?.span}>
                  {item?.title}
                </Col>
              ))}
            </Row>
          </div>
        </>
      ) : null}
      {lodash.map(exclusionList, (item: any) => {
        const isCompulsory = item.compulsoryInd === 'Y';
        return (
          <div key={item?.id} className={styles.exclusionList}>
            <div className={styles.tag} />
            <div className={styles.exclusion}>
              <ExclusionSection
                editable={!isCompulsory}
                exclusionField={item}
                id={item?.id}
                coverageId={record?.id}
                productCode={productCode}
              />
            </div>
            {!taskNotEditable ? (
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
  );
};

export default Exclusion;
