import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import { FormAntCard } from 'basic/components/Form';
import useGetDistributionChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannel';
import useGetPrimaryAgentChannel from 'process/NB/ManualUnderwriting/_hooks/useGetPrimaryAgentChannel';
import { localConfig } from './Section';
import styles from './index.less';
import QuestionnaireModal from 'process/NB/components/AgentQuestionnaire/Index';
import ShowButton from 'process/NB/components/AgentQuestionnaire/Button';
import useJudgeHasQuestionnaire from 'process/NB/components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { RuleByData } from 'basic/components/Form/Rule';
import useGetSectionConfigWithCondition from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const ReadOnly = ({ setExpendStatus, expendStatus }: any) => {
  const bankChannelList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankChannelList,
    shallowEqual
  );
  const branchCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.branchCodeList,
    shallowEqual
  );
  const data = useGetDistributionChannel();
  const channelCode = useGetPrimaryAgentChannel();
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

  const calculateVisibleConditionConfig = (sectionConfig: any, data: any) => {
    const newConfig = sectionConfig?.map((config: any) => {
      const filedProps = { ...config['field-props'] };
      let visible = filedProps?.visible;

      const visibleCondition = filedProps?.['visible-condition'];
      if (visible === 'C') {
        visible = RuleByData(visibleCondition, data) ? 'Y' : 'N';
      }
      if (config.field === 'bankStaffNo' && tenant.region() === Region.ID) {
        config.fieldType = 'Dropdown';
      }
      if (config.field === 'servicingBranch' && tenant.region() === Region.ID) {
        config.fieldType = 'Dropdown';
      }
      filedProps.visible = visible;
      return { ...config, ['field-props']: filedProps };
    });
    return newConfig;
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={classnames(styles.head, { [styles.hidden]: expendStatus })}>
          <div className={styles.headLeft}>
            <span className={styles.title}>Distribution Channel</span>
            {!lodash.isEmpty(data) && (
              <>
                <span className={styles.info}>
                  {formatMessageApi({ Dropdown_POL_DistributionChannel: channelCode })}
                </span>
                <div className={styles.actions}>
                  <Icon
                    type={!expendStatus ? 'down' : 'up'}
                    onClick={() => setExpendStatus(!expendStatus)}
                  />
                </div>
              </>
            )}
          </div>
          <ShowButton className={undefined} />
        </div>
        <div className={styles.card}>
          {lodash.map(data, (itemData: any) => {
            const config = calculateVisibleConditionConfig(filteredSectionConfig, itemData);
            const servicingBranch = [
              { dictCode: itemData.servicingBranch, dictName: itemData.servicingBranchDesc },
            ];
            const bankNoList = [
              {
                dictCode: itemData.bankStaffNo,
                dictName: `${itemData.bankStaffNo} - ${itemData.bankStaffRefName}`,
              },
            ];
            if (!lodash.isEmpty(itemData) && expendStatus)
              return (
                <div className={styles.cardItem} key={itemData.id}>
                  <FormAntCard>
                    <ConfigurableReadOnlySection
                      config={config}
                      data={itemData}
                      extraConfig={{
                        bankNo: bankChannelList,
                        servicingBranch,
                        bankStaffNo: bankNoList,
                      }}
                      multipleDropdown={['crossSelling']}
                    />
                  </FormAntCard>
                </div>
              );
          })}
        </div>
        <QuestionnaireModal agentData={data[0]} />
      </div>
    </>
  );
};

export default () => {
  return (
    <ExpandableContainer sectionId="distributionchannel">
      <ReadOnly />
    </ExpandableContainer>
  );
};
