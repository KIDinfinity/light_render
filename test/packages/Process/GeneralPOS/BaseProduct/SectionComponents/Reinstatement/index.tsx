import React, { useEffect } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import CustomisationCol from 'basic/components/CustomisationCol';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector, useDispatch } from 'dva';
import CoverageList from './CoverageList';
import styles from './index.less';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import CommonAddModal from './CommonAddModal';
import ReinstatementHeader from './ReinstatementHeader';
import classnames from 'classnames';
import CoverageTotal from './CoverageTotal';
import { localConfig } from './Section/CoverageSection';

const Reinstatement = ({ transactionId }) => {
  const dispatch = useDispatch();
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getReinstatementExList`,
    });
  }, []);
  useEffect(() => {
    if (transactionId) {
      dispatch({
        type: `${NAMESPACE}/reinstatementInit`,
        payload: {
          transactionId,
          servicingInit,
        },
      });
    }
  }, [servicingInit]);

  const sectionConfig = useGetSectionAtomConfigByRemote({
    localConfig,
    section: 'Reinstatement-Coverage',
  });

  const columnList = lodash
    .chain(sectionConfig)
    .filter((item) => item?.field)
    .filter((item) => item?.['field-props']?.visible !== 'N')
    .map((item) => ({
      typeCode: item?.['field-props']?.label?.dictTypeCode,
      dictCode: item?.['field-props']?.label?.dictCode,
      span: item?.['field-props']?.['x-layout']?.lg?.span,
      order: item?.['field-props']?.['x-layout']?.lg?.order,
    }))
    .orderBy('order')
    .value();

  return (
    <div className={classNames(styles.uwDecisionSection, {})}>
      <div className={styles.sectionTitle}>
        {formatMessageApi({
          Label_BIZ_POS: 'UWDecision',
        })}
      </div>
      <ReinstatementHeader transactionId={transactionId} />
      <div className={classnames(styles.reinstatementBox)}>
        <div className={styles.coverageContainer}>
          <div className={styles.product}>
            <div className={styles.fieDecision}>
              {lodash.map(columnList, (item, index) => (
                <CustomisationCol sclale={0.96} key={index} span={item?.span} order={item?.order}>
                  {formatMessageApi({
                    [item?.typeCode]: [item?.dictCode],
                  })}
                </CustomisationCol>
              ))}
            </div>
          </div>
          <div className={styles.coverageList}>
            <CoverageList transactionId={transactionId} />
          </div>
          <div className={styles.product}>
            <CoverageTotal />
          </div>
        </div>
        <CommonAddModal transactionId={transactionId} />
      </div>
    </div>
  );
};

export default Reinstatement;
