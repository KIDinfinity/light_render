import React from 'react';
import { useSelector } from 'dva';
import { FormAntCard, Visible, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './Item';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

import { localSectionConfig } from './Section';

const ChangeOfEmail = ({ config, id }: any) => {
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
        <div className={styles.email}>
          <FormAntCard
            title={formatMessageApi({
              Label_BIZ_SRV: 'emailChange',
            })}
          >
            <Item id={id} />
          </FormAntCard>
        </div>
      )}
    </>
  );
};

export default ChangeOfEmail;
