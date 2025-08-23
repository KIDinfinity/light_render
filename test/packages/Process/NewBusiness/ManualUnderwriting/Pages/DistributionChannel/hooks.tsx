import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import AgentType from 'process/NewBusiness/Enum/AgentType';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import DistributionChannelDisplayMethod from 'process/NewBusiness/Enum/DistributionChannelDisplayMethod';
import useGetDistributionChannelDisplayMethod from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetDistributionChannelDisplayMethod';

interface IDistributionChannel {
  bankStaffList: any[];
  campaignList: any[];
  bankChannelList: any[];
  branchCodeList: any[];
  agentChannelCode: null | string;
  distributionChannelList: Record<string, any>;
}

const getAgentTypeOrder = (agentType?: string) => {
  const AgentTypeOrderMap: Record<string, number> = {
    P: 1,
    S: 2,
    C: 3,
  };
  if (agentType) {
    if (AgentTypeOrderMap[agentType]) {
      return AgentTypeOrderMap[agentType];
    }
    return 0;
  }
  return 0;
};
const DistributionChannelModalDataPath = `${NAMESPACE}.modalData.distributionChannel`;
const DistributionChannelShowDataPath = `${NAMESPACE}.processData.agentList`;

export const useDistributionChannelData = () =>
  useSelector(
    (state) => lodash.get(state, DistributionChannelModalDataPath) as IDistributionChannel
  );
const useBanChannelList = () =>
  useSelector((state) => lodash.get(state, `${DistributionChannelModalDataPath}.bankChannelList`));
const useBankStaffList = () =>
  useSelector((state) => lodash.get(state, `${DistributionChannelModalDataPath}.bankStaffList`));
const useCampaignList = () =>
  useSelector((state) => lodash.get(state, `${DistributionChannelModalDataPath}.campaignList`));
const useBranchCodeList = () =>
  useSelector((state) => lodash.get(state, `${DistributionChannelModalDataPath}.branchCodeList`));
const useDistributionChannelList = () =>
  useSelector((state) =>
    lodash.get(state, `${DistributionChannelModalDataPath}.distributionChannelList`)
  );
const useServicingBranchList = () =>
  useSelector((state) =>
    lodash.get(state, `${DistributionChannelModalDataPath}.servicingBranchList`)
  );
export const useAgentList = () => {
  const list: {
    agentType: string;
    agentChannelCode: string;
    sourceOfBusinessCode: string;
    agentSubChannelCode: string;
  }[] = useSelector((state) => lodash.get(state, DistributionChannelShowDataPath, []));
  return useMemo(() => {
    return list
      .filter(
        (item: {
          agentType: string;
          agentChannelCode: string;
          sourceOfBusinessCode: string;
          agentSubChannelCode: string;
        }) => item.agentType === AgentType.Commission || item.agentType === AgentType.Primary
      )
      .sort((a, b) => {
        return getAgentTypeOrder(a?.agentType) - getAgentTypeOrder(b?.agentType);
      });
  }, [list]);
};

export const useTaskIdentifier = () => {
  const task = useSelector<any>((state) => state?.processTask?.getTask) as any;
  return useMemo(() => {
    return {
      businessNo: task?.businessNo,
      caseNo: task?.caseNo,
      taskId: task?.taskId,
    };
  }, [task?.businessNo, task?.caseNo, task?.taskId]);
};

export const useCampaignDicts = () => {
  const campaignList = useCampaignList();

  return useMemo(() => {
    return lodash.map(campaignList, (item: any) => {
      const dictName = lodash.chain(item).values().join('-').value();
      return {
        ...item,
        dictName,
      };
    }) as { dictName: string; dictCode: string }[];
  }, [campaignList]);
};

export const useBankChannelDicts = () => {
  const bankChannelList = useBanChannelList();

  return useMemo(() => {
    return lodash
      .map(bankChannelList, (item: any) => {
        const dictName = lodash.get(item, 'bankName');
        const dictCode = lodash.get(item, 'bankCode');
        return {
          dictName,
          dictCode,
        };
      })
      .filter((item: any) => !lodash.isEmpty(item.dictName));
  }, [bankChannelList]);
};

export const useAllBranchDicts = () => {
  const branchCodeList = useBranchCodeList();

  return useMemo(() => {
    return lodash
      .map(branchCodeList, (item: any) => {
        const dictName = lodash.get(item, 'branchName');
        const dictCode = lodash.get(item, 'branchCode');
        return {
          dictName,
          dictCode,
        };
      })
      .filter((item: any) => !lodash.isEmpty(item.dictName));
  }, [branchCodeList]);
};

export const useBankStaffNoDictsByAgentNo = (agentNo: string) => {
  const bankStaffList = useBankStaffList();

  return useMemo(() => {
    const bankStaff = bankStaffList?.[agentNo];
    return bankStaff?.bankList?.map((item: any) => {
      return {
        dictCode: item.bankStaffNo,
        dictName: item.bankStaffNo + '-' + item.bankStaffRefName,
      };
    });
  }, [agentNo, bankStaffList]);
};
export const useBranchStaffNoDictsByBankNo = (bankNo: string) => {
  const branchCodeList = useBranchCodeList();

  return useMemo(() => {
    return lodash
      .filter(branchCodeList, (item: any) => item.bankCode === bankNo)
      .map((item: any) => {
        return {
          dictCode: item.branchCode,
          dictName: item.branchName,
        };
      });
  }, [bankNo, branchCodeList]);
};

// showData
export const useDistributionChannelShowList = () => {
  const campaignList = useCampaignDicts();
  const agentList = useAgentList();

  return useMemo(() => {
    return lodash.map(agentList, (agent: any) => {
      const oldCampaignCode = lodash.get(agent, 'campaignCode');
      const crossSellingList = lodash.map(
        lodash.split(lodash.get(agent, 'crossSelling'), ','),
        (e) => {
          return formatMessageApi({
            Dropdown_COM_CrossSelling: e,
          });
        }
      );
      const bankStaffNo =
        agent?.bankStaffRefName && tenant.region() === Region.ID
          ? `${agent?.bankStaffNo}-${agent?.bankStaffRefName}`
          : agent?.bankStaffNo;

      const crossSelling = lodash.join(crossSellingList, ', ') || '';
      if (!lodash.isEmpty(oldCampaignCode)) {
        const campaignCode =
          lodash.get(
            lodash.find(campaignList, (item: any) => item.campaignCode === oldCampaignCode),
            'campaignName'
          ) || oldCampaignCode;
        return { ...agent, campaignCode, crossSelling };
      }
      return { ...agent, crossSelling, bankStaffNo };
    });
  }, [agentList, campaignList]);
};

export const useAgentChannelCodeShow = () => {
  const displayMethod = useGetDistributionChannelDisplayMethod();
  const agentList = useAgentList();

  return useMemo(() => {
    const agent = lodash
      .chain(agentList)
      .find((item) => item.agentType === AgentType.Primary)
      .value();

    if (!agent) return '';

    const { agentChannelCode, sourceOfBusinessCode, agentSubChannelCode } = agent;
    const showCode = {
      [DistributionChannelDisplayMethod.BS]: sourceOfBusinessCode,
      [DistributionChannelDisplayMethod.AS]: agentSubChannelCode,
      [DistributionChannelDisplayMethod.AC]: agentChannelCode,
      [DistributionChannelDisplayMethod.ACS]: agentSubChannelCode || agentChannelCode,
    };
    return showCode[displayMethod as keyof typeof showCode] ?? '';
  }, [agentList, displayMethod]);
};

export const useDefaultServicingBranchById = (id: string) => {
  const distributionChannelList = useDistributionChannelList();
  const bankStaffList = useBankStaffList();
  const { bankStaffNo, agentNo } = distributionChannelList?.[id];
  const bankList = bankStaffList?.[agentNo]?.bankList;
  return useMemo(() => {
    if (!bankList || !Array.isArray(bankList)) return null;
    return (
      bankList.find((item) => item.bankStaffNo === formUtils.queryValue(bankStaffNo))
        ?.servicingBranch || null
    );
  }, [bankList, bankStaffNo]);
};

export const useDefaultStaffNameBranchById = (id: string) => {
  const distributionChannelList = useDistributionChannelList();
  const bankStaffList = useBankStaffList();
  const { bankStaffNo, agentNo } = distributionChannelList?.[id];
  const bankList = bankStaffList?.[agentNo]?.bankList;
  return useMemo(() => {
    if (!bankList || !Array.isArray(bankList)) return null;
    return (
      bankList.find((item) => item.bankStaffNo === formUtils.queryValue(bankStaffNo))
        ?.bankStaffRefName || null
    );
  }, [bankList, bankStaffNo]);
};

export const useCommissionSplitPercentList = () => {
  const distributionChannelList = useDistributionChannelList();
  return useMemo(
    () =>
      lodash
        .chain(distributionChannelList)
        .map((item) => ({
          id: item.id,
          commissionSplitPercent: item.commissionSplitPercent,
        }))
        .value(),
    [distributionChannelList]
  );
};
export const useConfirmDistributionChannelList = () => {
  const distributionChannelList = useDistributionChannelList();
  return useMemo(() => {
    return {
      agentList: Object.values(distributionChannelList),
    };
  }, [distributionChannelList]);
};
export const useShowQuestionnaire = () => {
  const processData = useSelector(({ [NAMESPACE]: model }: any) => {
    return model.processData;
  }, shallowEqual);
  return useMemo(() => !lodash.isEmpty(processData), [processData]);
};

export const useServicingBranchListDictsByAgentNo = (agentNo: string) => {
  const servicingBranchList = useServicingBranchList();

  return useMemo(() => {
    const branchList = servicingBranchList?.[agentNo] ?? [];
    return lodash.map(branchList, (item) => {
      return {
        dictCode: item.branchId,
        dictName: item.branchName,
      };
    });
  }, [agentNo, servicingBranchList]);
};

export const useGetExtraConfig = (extraConfigData) => {
  const { distributionChannelList = [], extraConfig = {} } = extraConfigData;
  const isIDRegion = tenant.region() === Region.ID;
  const servicingBranchList = useServicingBranchList();
  return useMemo(() => {
    if (isIDRegion) {
      const list = distributionChannelList.reduce((pre, distributionItem) => {
        const agentNo = distributionItem.agentNo;
        const branchList = servicingBranchList?.[agentNo] ?? [];
        const dicts = lodash.map(branchList, (item) => {
          return {
            dictCode: item.branchId,
            dictName: item.branchName,
          };
        });
        return [...pre, ...dicts];
      }, []);
      return {
        ...extraConfig,
        servicingBranch: list,
      };
    } else {
      return extraConfig;
    }
  }, [servicingBranchList, distributionChannelList]);
};
