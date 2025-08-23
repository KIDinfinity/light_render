import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Visible, formUtils } from 'basic/components/Form';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localSectionConfig, localConfig, SectionTable } from './Section';
import { useSelector, useDispatch } from 'dva';
import TotalSection from './TotalSection';
import classNames from 'classnames';

const PartialWithdrawal = ({ transactionId, config, form }: any) => {
  const dispatch = useDispatch();
  const sectionProps: any = localSectionConfig['section-props'];

  const partialWithdrawalFundList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.partialWithdrawalFundList
  );
  const visibleConditions = true;

  const dataSource = useMemo(() => {
    return lodash.uniq(
      partialWithdrawalFundList?.map((item) => formUtils.queryValue(item.fundCode))
    );
  }, [partialWithdrawalFundList]);

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={styles.partialWithdrawlForTotalInfo}>
          <SectionTable
            form={form}
            section="PartialWithdrawlForTotal"
            config={localConfig}
            dataSource={dataSource}
            className={styles.hiddencolor}
            classNameHeader={styles.selfTableHeader}
            numberShowRight
          >
            <Item transactionId={transactionId} />
          </SectionTable>
          <div className={classNames(styles.addFund)}>
            <TotalSection transactionId={transactionId} />
          </div>
        </div>
      )}
    </>
  );
};

export default PartialWithdrawal;
