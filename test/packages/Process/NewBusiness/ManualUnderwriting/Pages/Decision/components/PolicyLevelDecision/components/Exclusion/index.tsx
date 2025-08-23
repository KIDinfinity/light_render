import React, { useCallback } from 'react';
import { Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetExclusionColumns from './_hooks/useGetExclusionColumns';
import ExclusionSection from './ExclusionSection';
import styles from './index.less';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const Exclusion = ({ record }: any) => {
  const dispatch = useDispatch();
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
  const exclusionList: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyExclusionList,
      shallowEqual
    ) || [];

  const removeExclusion = useCallback(
    (id: any) => {
      dispatch({
        type: `${NAMESPACE}/deletePolicyLevelExclusion`,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const onExpander = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/addPolicyLevelExclusion`,
    });
  }, [dispatch]);

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
