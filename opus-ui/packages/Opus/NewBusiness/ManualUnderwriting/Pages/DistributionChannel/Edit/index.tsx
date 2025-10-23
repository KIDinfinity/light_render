import { Region, tenant } from '@/components/Tenant';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import EditableTablePanel from 'opus/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
import AgentType from 'opus/NewBusiness/Enum/AgentType';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useJudgeHasQuestionnaire from 'opus/NewBusiness/ManualUnderwriting/_components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';
import { useGetSectionConfigWithCondition } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import React, { useMemo } from 'react';
import { distributionChannelListSelector } from '../selectors';
import localConfig from '../_config/DistributionChannelField';
import DistributionChannelInfo from './DistributionChannelInfo';

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
