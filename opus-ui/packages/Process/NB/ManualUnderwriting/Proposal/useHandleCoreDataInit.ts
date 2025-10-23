import { useContext } from 'react';
import useProposalBizData from 'process/NB/ManualUnderwriting/_hooks/useProposalBizData';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm from 'bpm/pages/OWBEntrance';
import context from 'bpm/pages/OWBEntrance/Context/context';
import useUpdateErrors from './useUpdateErrors';
import useLoadFieldsCustomerTypeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadFieldsCustomerTypeConfig';
import useLoadProductionConfigByContractType from 'process/NB/ManualUnderwriting/_hooks/useLoadProductionConfigByContractType';
import useSetInitialBusinessData from 'process/NB/ManualUnderwriting/_hooks/useSetInitialBusinessData';
import useLoadDefaultCurrentAddressConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadDefaultCurrentAddressConfig';
import useGetNationality from 'process/NB/ManualUnderwriting/_hooks/useGetNationality';
import useLoadRegionalDefaultValueList from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValueList';
import useLoadRegionalDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useLoadRegionalDefaultValue';
import useLoadAddressList from 'process/NB/ManualUnderwriting/_hooks/useLoadAddressList';
import useLoadIdDisplayConfigList from 'process/NB/ManualUnderwriting/_hooks/useLoadIdDisplayConfigList';
import useLoadPolicyLevelFecRiskMsg from 'process/NB/ManualUnderwriting/_hooks/useLoadPolicyLevelFecRiskMsg';

export default ({ originBizData, taskDetail, businessData }: any) => {
  useProposalBizData({ businessData });
  useLoadAddressList({
    businessData,
  });
  useLoadPolicyLevelFecRiskMsg({ businessData });
  useGetNationality();
  useLoadRegionalDefaultValueList();
  useLoadIdDisplayConfigList();
  const { dispatch: bpmDispatch } = useContext(context);
  useUpdateErrors({ bpmDispatch });
  useLoadProductionConfigByContractType();
  useSetInitialBusinessData({ businessData: originBizData });
  useLoadDefaultCurrentAddressConfig();

  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: `${businessData?.caseCategory}_BP_NB_ACT004`,
  });

  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: `${businessData?.caseCategory}_BP_NB_ACT004_disable_condition`,
  });
  useLoadRegionalDefaultValue({ codeType: 'NonIndicatorFatca' });
  useLoadRegionalDefaultValue({ codeType: 'SPECIAL_MANDATORY_FIELD_ROLE' });
  bpm.setTitle(
    formatMessageApi({
      activity: taskDetail.taskDefKey,
    })
  );
};
