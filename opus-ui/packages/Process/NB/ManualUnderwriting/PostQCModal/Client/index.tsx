import React from 'react';
import PageContainerClean from 'basic/components/Elements/PageContainerClean';
import useLoadFieldsCustomerTypeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsCustomerTypeConfig';
import ClientInfoList from 'process/NB/ManualUnderwriting/Client';

export default () => {
  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG003_BP_NB_ACT008',
  });
  return (
    <div>
      <PageContainerClean
        pageConfig={{
          caseCategory: 'BP_NB_CTG003',
          activityCode: 'BP_NB_ACT008',
        }}
      >
        <ClientInfoList mode="edit" />
      </PageContainerClean>
    </div>
  );
};
