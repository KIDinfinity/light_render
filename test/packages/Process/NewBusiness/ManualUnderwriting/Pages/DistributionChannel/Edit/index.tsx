import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import DistributionChannelInfo from './DistributionChannelInfo';
import { distributionChannelListSelector } from '../selectors';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';
import EditableTablePanel from 'process/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
import AgentType from 'process/NewBusiness/Enum/AgentType';
import { useGetSectionConfigWithCondition } from 'process/NewBusiness/ManualUnderwriting/_hooks';
import localConfig from '../_config/DistributionChannelField';
import lodash from 'lodash';
import useJudgeHasQuestionnaire from 'process/NewBusiness/ManualUnderwriting/_components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';

const DistributionChannelEdit = () => {
  const dispatch = useDispatch();
  const distributionChannelList = useSelector(distributionChannelListSelector);
  const sectionConfig = useGetSectionConfigWithCondition({
    section: 'DistributionChannel-Field',
    localConfig,
  });
  const showQuestionButton = useJudgeHasQuestionnaire();
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
  const deleteAgentItem = ({ id }: any) => {
    dispatch({
      type: `${NAMESPACE}/deleteDistributionChannel`,
      payload: {
        id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [id] },
    });
  };
  const disableAdd = useMemo(() => {
    return tenant.region({
      [Region.TH]: () => {
        return distributionChannelList?.length > 2;
      },
      notMatch: false,
    });
  }, [distributionChannelList]);

  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <EditableTablePanel
        disableHeader
        itemList={distributionChannelList}
        disableDeleteItem={(itemData) => itemData.agentType === AgentType.Primary}
        onDeleteItem={deleteAgentItem}
        disableAdd={disableAdd}
        itemRender={(itemData: any) => (
          <DistributionChannelInfo sectionConfig={filteredSectionConfig} itemData={itemData} />
        )}
      />
    </div>
  );
};

export default DistributionChannelEdit;
