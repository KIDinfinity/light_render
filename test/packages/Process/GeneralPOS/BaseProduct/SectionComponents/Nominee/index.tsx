import React, { useEffect } from 'react';
import lodash from 'lodash';
import Item from './Item';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';
import classNames from 'classnames';
import { localConfig, SectionTable } from './Section';
import TotalSection from './TotalSection';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useDispatch } from 'dva';
import { tenant } from '@/components/Tenant';

const Nominee = ({ transactionId }: any) => {
  const dispatch = useDispatch();
  const beneficiaryList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.beneficiaryList
  );
  const beneficiaryListData = formUtils.cleanValidateData(beneficiaryList);
  const beneficiaryTypeGroupBy = tenant.isTH()
    ? lodash.chain(beneficiaryListData).groupBy('beneficiaryType').value()
    : {};

  const resultSource = [
    {
      key: 'default',
      value: lodash.filter(beneficiaryListData, (beneficiaryItem) =>
        tenant.isTH()
          ? beneficiaryItem.beneficiaryType === 'DB' ||
            lodash.isEmpty(beneficiaryItem.beneficiaryType)
          : true
      ),
    },
  ];

  Object?.entries(beneficiaryTypeGroupBy)?.forEach(([key, value]) => {
    if (!(key === 'DB' || lodash.isEmpty(key) || key === 'undefined' || key === 'null')) {
      resultSource.push({ key, value });
    }
  });

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getDedupCheckKey`,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/nomineeInit`,
      payload: {
        transactionId,
      },
    });
  }, [transactionId]);
  return (
    <div className={styles.nominee}>
      {resultSource.map((item, index) => (
        <div key={item.key}>
          <SectionTable
            config={localConfig}
            section="Nominee"
            tableCollect={() => {}}
            dataSource={lodash.map(item.value, 'clientSeq')}
            className={styles.hiddencolor}
            classNameHeader={classNames({
              [styles.selfTableHeader]: true,
            })}
          >
            <Item transactionId={transactionId} />
          </SectionTable>
          <TotalSection
            isOther={!(item.key === 'default')}
            otherTypeTotal={lodash.sumBy(item?.value, (sumItem) =>
              formUtils.queryValue(sumItem.benefitPercentage)
            )}
          />
          {resultSource.length > 1 && index < resultSource.length - 1 && (
            <div className={styles.line} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Nominee;
