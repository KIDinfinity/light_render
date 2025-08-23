import React from 'react';
import { useSelector } from 'dva';
import { FormAntCard, Visible, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import Item from './Item';
import { NAMESPACE } from '../activity.config';

import { localSectionConfig } from './Section';

const ContactChangeInfo = ({ config, id, className }: any) => {
  const sectionProps: any = localSectionConfig['section-props'];

  const transactionTypeCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.transactionTypeCode
  );

  const visibleConditions = formUtils.queryValue(transactionTypeCode) === 'SRV001';

  return (
    <>
      {((config?.visible || sectionProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || sectionProps.visible) === Visible.Yes) && (
        <div className={className}>
          <FormAntCard
            title={formatMessageApi({
              Label_BIZ_SRV: tenant.region({
                [Region.ID]: 'phoneNoChange',
                notMatch: 'ContactChange',
              }),
            })}
          >
            <Item id={id} />
          </FormAntCard>
        </div>
      )}
    </>
  );
};

export default ContactChangeInfo;
