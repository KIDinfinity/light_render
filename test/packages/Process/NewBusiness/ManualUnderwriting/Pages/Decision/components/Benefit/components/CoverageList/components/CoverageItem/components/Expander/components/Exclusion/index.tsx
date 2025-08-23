import React, { useMemo, useCallback } from 'react';
import { Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetExclusionColumns from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/PolicyLevelDecision/components/Exclusion/_hooks/useGetExclusionColumns';
import useGetBenefitLevelExclusion from './_hooks/useGetBenefitLevelExclusion';
import ExclusionSection from './ExclusionSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetDisabledByCoverageField from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDisabledByCoverageField';
import styles from './index.less';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

const Exclusion = ({ record }: any) => {
  const dispatch = useDispatch();
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
  const removeExclusion = useCallback(
    (id: any, coverageItemId: any) => {
      dispatch({
        type: `${NAMESPACE}/deleteBenefitLevelExclusionItem`,
        payload: {
          id,
          coverageItemId,
        },
      });
      dispatch({
        type: `${NAMESPACE}/supplyUwDecisionEditInd`,
      });
    },
    [dispatch]
  );
  const onExpander = useCallback(
    (coverageItem: any) => {
      const { id } = coverageItem;
      dispatch({
        type: `${NAMESPACE}/addBenefitLevelExclusion`,
        payload: {
          coverageId: id,
        },
      });
    },
    [dispatch]
  );

  const { editableOfSustainability = true } = useGetSustainabilityCaseCheckStatus();
  const editExclusionDisabled = useGetDisabledByCoverageField({
    id: coverageId,
    dataBasicField: 'exclusionEditInd',
    dataBasicFieldValue: 'N',
  });
  return (
    !lodash.isEmpty(exclusionList) && (
      <div
        className={classnames({
          [styles.wrap]: !lodash.isEmpty(exclusionList),
          [styles.noWrap]: lodash.isEmpty(exclusionList),
        })}
        data-id="Exclusion"
      >
        <div className={styles.header}>{formatMessageApi({ Label_BIZ_policy: 'Exclusion' })}</div>
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
                    editable={!isCompulsory && !editExclusionDisabled}
                    coverageId={coverageId}
                    exclusionField={item}
                    id={item?.id}
                    productCode={productCode}
                    editableOfSustainability={editableOfSustainability}
                  />
                </div>
                {!taskNotEditable && editableOfSustainability && !editExclusionDisabled ? (
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
