import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Validator } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import SectionTitle from 'claim/components/SectionTitle';
import Add from './Add';
import Item from './Item';

const List = () => {

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);

  const incidentList = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.incidentList
  );

  return (
    <>
      <SectionTitle
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
        })}
      />
      {Validator.VLD_000051(incidentList, submited) && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({
            Label_COM_WarningMessage: 'ERR_000070',
          })}
        />
      )}
      {lodash.isArray(incidentList) && lodash.size(incidentList) ? (
        lodash.map(incidentList, (item) => (
          <Item key={item} incidentId={item} total={incidentList.length} />
        ))
      ) : (
        <Empty />
      )}
      {editable && (<Add />)}
    </>)
};

export default List;
