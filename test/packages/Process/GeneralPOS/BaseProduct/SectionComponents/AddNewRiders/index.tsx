import React, { useEffect } from 'react';
import lodash from 'lodash';
import CustomisationCol from 'basic/components/CustomisationCol';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector, useDispatch } from 'dva';
import CoverageList from './CoverageList';
import styles from './index.less';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import CommonAddModal from './CommonAddModal';
import AddNewRidersHeader from './AddNewRidersHeader';
import classnames from 'classnames';
import CoverageTotal from './CoverageTotal';
import ButtonList from './ButtonList';
import { localConfig } from './Section/CoverageSection';

const TableColumn = ({ sectionConfig }: any) => {
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
    <div className={styles.product}>
      <div className={styles.fieDecision}>
        {lodash.map(columnList, (item, index) => (
          <CustomisationCol
            key={index}
            span={item?.span}
            order={item?.order}
            padding={4}
            sclale={0.88}
          >
            {formatMessageApi({
              [item?.typeCode]: [item?.dictCode],
            })}
          </CustomisationCol>
        ))}
      </div>
    </div>
  );
};

const AddNewRiders = ({ transactionId }: any) => {
  const dispatch = useDispatch();
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getPlanProductConfig`,
    });
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
    section: 'AddNewRiders-Coverage',
  });

  return (
    <div>
      <AddNewRidersHeader transactionId={transactionId} />
      <div className={classnames(styles.addNewRidersBox)}>
        <div className={styles.coverageContainer}>
          <TableColumn sectionConfig={sectionConfig} />
          <div className={styles.coverageWarp}>
            <div className={styles.coverageList}>
              <CoverageList transactionId={transactionId} />
            </div>
            <div className={classnames(styles.newRiders, styles.coverageContainer)}>
              <div className={styles.title}>
                New Riders
                <ButtonList transactionId={transactionId} />
              </div>
              <TableColumn sectionConfig={sectionConfig} />
              <CoverageList transactionId={transactionId} readyOnly={false} />
            </div>
          </div>
        </div>
        <div className={styles.coverageContainer}>
          <div className={styles.product}>
            <CoverageTotal transactionId={transactionId} />
          </div>
        </div>
        <CommonAddModal transactionId={transactionId} />
      </div>
    </div>
  );
};

export default AddNewRiders;
