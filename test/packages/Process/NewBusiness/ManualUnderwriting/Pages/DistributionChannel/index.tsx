import React, { useMemo } from 'react';

import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';

import Show from './Show';
import Edit from './Edit';
import styles from './index.less';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { v4 as uuid } from 'uuid';
import AgentType from 'process/NewBusiness/Enum/AgentType';
import useGetSectionConfigWithCondition from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';
import {
  useAgentChannelCodeShow,
  useAgentList,
  useAllBranchDicts,
  useBankChannelDicts,
  useDistributionChannelShowList,
} from './hooks';
import { OptionType } from '../../_enum';
import AgentQuestionnaire from '../../_components/AgentQuestionnaire/Index';
import AgentQuestionnaireButton from '../../_components/AgentQuestionnaire/Button';
import localConfig from './_config/DistributionChannelField';
import useJudgeHasQuestionnaire from '../../_components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';
import lodash from 'lodash';
import { Region, tenant } from '@/components/Tenant';

const DistributionChannel = () => {
  const dispatch = useDispatch();

  const agentChannelCode = useAgentChannelCodeShow();
  const distributionChannelList = useDistributionChannelShowList();
  const agentList = useAgentList();
  const bankChannelList = useBankChannelDicts();
  const branchCodeList = useAllBranchDicts();
  const showQuestionButton = useJudgeHasQuestionnaire();

  const sectionConfig = useGetSectionConfigWithCondition({
    section: 'DistributionChannel-Field',
    localConfig,
  });
  const filteredSectionConfig = lodash.filter(sectionConfig, (item) => {
    if (
      [
        'remark',
        'insuranceInforce',
        'paidByPolicyLoan',
        'signDate',
        'agentRelationship',
        'agentRelated',
      ].includes(item.field) &&
      tenant.region() === Region.PH &&
      showQuestionButton
    ) {
      return false;
    }
    return true;
  });

  const headerInfo = useMemo(() => {
    return agentChannelCode
      ? formatMessageApi({ Dropdown_POL_DistributionChannel: agentChannelCode })
      : null;
  }, [agentChannelCode]);
  return (
    <>
      <ExpandableCard
        title="Distribution Channel"
        info={headerInfo}
        headerActions={<AgentQuestionnaireButton />}
        errorBoundaryName="Distribution Channel"
        contentClassName={styles.wrap}
        editModalProps={{
          onAfterConfirm: async () => {
            await dispatch({
              type: `${NAMESPACE}/submitToProcessData`,
            });
            const result: boolean = await dispatch<any>({
              type: `${NAMESPACE}/submit`,
              payload: {
                type: OptionType.other,
                formKeys: ['DistributionChannel-Field'],
              },
            });
            return result;
          },
          onBeforeOpen: async () => {
            dispatch({
              type: `${NAMESPACE}/setModalDistributionChannelList`,
              payload: {
                distributionChannelList: [
                  ...agentList,
                  {
                    id: uuid(),
                    isLast: true,
                    agentType: AgentType.Commission,
                  },
                ],
              },
            });
            dispatch({
              type: `${NAMESPACE}/setAgentChannelCode`,
              payload: {
                agentChannelCode,
              },
            });

            dispatch({
              type: `${NAMESPACE}/updateBankStaffList`,
              payload: {
                agentList,
              },
            });
          },
          onBeforeBack: async () => {},
          children: <Edit />,
        }}
      >
        <Show
          distributionChannelList={distributionChannelList}
          sectionConfig={filteredSectionConfig}
          extraConfig={{
            bankNo: bankChannelList,
            servicingBranch: branchCodeList,
          }}
        />
      </ExpandableCard>
      <AgentQuestionnaire agentData={distributionChannelList[0]} />
    </>
  );
};

export default DistributionChannel;
