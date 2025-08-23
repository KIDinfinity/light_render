import React, { useMemo } from 'react';

import { useSelector } from 'dva';
import { FormAntCard } from 'basic/components/Form';
import classNames from 'classnames';
import { tenant, Region } from '@/components/Tenant';
import Incident, { SectionTitle } from 'process/Components/BussinessControls/Incident';
import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
}

const Add = (props: IProps) => {
  const incidentList =
    useSelector(
      ({ [props.NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
    ) || [];

  const show = useMemo(() => {
    return tenant.region({
      [Region.TH]: () => {
        return incidentList.length === 1;
      },
      notMatch: true,
    });
  }, [incidentList]);

  return (
    <>
      {show && props.editable && (
        <FormAntCard>
          <div className={classNames(styles.header, styles.add)}>
            <div className={styles.title}>
              <SectionTitle suffix={` No. ${Number(incidentList?.length) + 1}`} />
            </div>
            <div className={styles.section}>
              <Incident.SectionAdd {...props} />
            </div>
          </div>
        </FormAntCard>
      )}
    </>
  );
};

export default Add;
