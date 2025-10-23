import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Validator } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { NAMESPACE } from '../activity.config';
import Add from './Add';
import Item from './Item';

const List = () => {

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);

  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.claimProcessData?.incidentList
  );

  return (
    <>
      {Validator.VLD_000051(incidentList, submited) && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({
            Label_COM_WarningMessage: 'ERR_000070',
          })}
        />
      )}
      {
        lodash.isArray(incidentList) && lodash.size(incidentList) ? (
          lodash.map(incidentList, (item, index) => (
            <Item key={item} incidentId={item} total={incidentList.length} index={index} />
          ))
        ) :  editable? <Add /> : <Empty />
      }
    </>)
};

export default List;
