import { Region, tenant } from '@/components/Tenant';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { ReactComponent as ChartBarIcon } from 'opus/Assets/icon-chart-bar.svg';
import AgentType from 'opus/NewBusiness/Enum/AgentType';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetSectionConfigWithCondition from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';
import React from 'react';
import { v4 as uuid } from 'uuid';
import AgentQuestionnaireButton from '../../_components/AgentQuestionnaire/Button';
import useJudgeHasQuestionnaire from '../../_components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';
import AgentQuestionnaire from '../../_components/AgentQuestionnaire/Index';
import ExpandableCard from '../../_components/ExpandableCard';
import { OptionType } from '../../_enum';
import Edit from './Edit';
import {
  useAgentChannelCodeShow,
  useAgentList,
  useAllBranchDicts,
  useBankChannelDicts,
  useDistributionChannelShowList,
} from './hooks';
import styles from './index.less';
import Show from './Show';
import localConfig from './_config/DistributionChannelField';

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
  return (
    <>
      <ExpandableCard
        title="Distribution Channel"
        icon={ChartBarIcon}
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
