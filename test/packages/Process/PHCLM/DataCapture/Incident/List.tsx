import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { VLD_000051 } from '@/utils/validations';
import SectionTitle from 'claim/components/SectionTitle';
import ListItem from './ListItem';
import Add from './Add';

const List = () => {
  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div>
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
      {lodash.isArray(incidentList) &&
        incidentList.length > 0 &&
        incidentList.map((item, index) => (
          <ListItem key={item} total={incidentList.length} index={index} incidentId={item} />
        ))}
      {editable && <Add />}
    </div>
  );
};

export default List;
