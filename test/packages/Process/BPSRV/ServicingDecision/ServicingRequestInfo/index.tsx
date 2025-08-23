import React, { useMemo } from 'react';
import { FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import AddressChangeInfo from '../AddressChangeInfo';
import ApplytoPolicies from '../ApplytoPolicies';
import ContactChangeInfo from '../ContactChangeInfo';
import ChangeOfEmail from '../ChangeOfEmail';
import PaymentMode from '../PaymentMode';
import BeneficiaryChange from '../BeneficiaryChange';
import ChangeOfName from '../ChangeOfName';
import Item from './Item';
import Add from './Add';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

const ServicingRequestInfo = () => {
  const transactionTypes = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.transactionTypes
  );
  const editable = false;
  const region = tenant.region();
  const renderTrancation = useMemo(() => {
    const children = tenant.region({
      [Region.ID]: () => (id: string, index: number) => (
        <>
          <Item id={id} index={index} />
          <div className={styles.sectionBox}>
            <ContactChangeInfo id={id} className={styles.IDstyle} />
            <ChangeOfEmail id={id} />
          </div>
          <BeneficiaryChange id={id} />
          <ChangeOfName id={id} />
          <AddressChangeInfo id={id} />
          <PaymentMode id={id} />
          <ApplytoPolicies id={id} />
        </>
      ),
      notMatch: () => (id: string, index: number) => (
        <>
          <Item id={id} index={index} />
          <ContactChangeInfo id={id} />
          <AddressChangeInfo id={id} />
          <PaymentMode id={id} />
          <ApplytoPolicies id={id} />
        </>
      ),
    });
    return (
      <>
        {lodash.compact(transactionTypes).map((id: any, index) => (
          <div key={id} className={styles.transactionTypeSection}>
            {children(id, index)}
          </div>
        ))}
      </>
    );
  }, [transactionTypes, region]);

  return (
    <div className={styles.servicingRequestInfo}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_SRV: 'ServicingRequestInfo',
        })}
      >
        {renderTrancation}
        {editable && <Add />}
      </FormAntCard>
    </div>
  );
};

export default ServicingRequestInfo;
