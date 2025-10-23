import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { VLD_000051 } from '@/utils/validations';
import SectionTitle from 'claim/components/SectionTitle';

interface IProps {
  NAMESPACE: string;
}
const LYDCTitle = ({ NAMESPACE }: IProps) => {
  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);

  return (
    <>
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
        })}
      />
      {VLD_000051(incidentList, submited) && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({
            Label_COM_WarningMessage: 'ERR_000070',
          })}
        />
      )}
    </>
  );
};

export default LYDCTitle;
