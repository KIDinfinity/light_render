import React from 'react';
import lodash from 'lodash';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetContactInfoTableData from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoTableData';
import useGetContactInfoTableLabel from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoTableLabel';
import { localConfig } from './Section';
import { tenant, Region } from '@/components/Tenant';
import styles from './ReadOnlyContactTable.less';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';
const section = 'ContactInfo-Table';

export default ({ id }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const data = useGetDataBySection({
    section,
    id,
    config,
  });
  const label = useGetContactInfoTableLabel({ data });
  const tableData = useGetContactInfoTableData({ id, config });
  return (
    <>
      {!lodash.isEmpty(tableData) && (
        <div
          className={classNames({
            [styles.contactTable]: tenant.region() !== Region.ID,
            [styles.contactTableID]: tenant.region() === Region.ID,
          })}
        >
          <div className={styles.label}>
            {lodash.map(label, (item) => (
              <div>{formUtils.queryValue(item)}</div>
            ))}
          </div>
          <div className={styles.fie}>
            {!lodash.isEmpty(label) &&
              lodash.map(tableData, (item) => (
                <div className={styles.row}>
                  <div>{formUtils.queryValue(item?.contactType)}</div>
                  {/* {tenant.region() === Region.ID && <div>{item?.countryCode}</div>} */}
                  <div>{formUtils.queryValue(item?.contactNo)}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
