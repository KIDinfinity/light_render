import React from 'react';
import { formUtils, FormTitleCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { ClaimType } from 'claim/enum';
import styles from './index.less';

interface IProps {
  children: any;
  treatmentItem: any;
}
const LTEntrance = ({ treatmentItem, children }: IProps) => {
  const treatmentTypeOP = formUtils.queryValue(treatmentItem?.treatmentType) === ClaimType.OPD;
  const therapiesType = formUtils.queryValue(treatmentItem?.therapiesType);
  return (
    <div className={styles.dpEntrance}>
      <FormTitleCard
        className={styles.title}
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'Therapies',
            })}
            {treatmentTypeOP && therapiesType && (
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi({
                  Label_COM_WarningMessage: 'MSG_000517',
                })}
              />
            )}
          </>
        }
      >
        {children}
      </FormTitleCard>
    </div>
  );
};

export default LTEntrance;
