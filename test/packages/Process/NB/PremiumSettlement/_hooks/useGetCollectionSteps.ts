import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import { useMemo } from 'react';
import PremiumProcessType from 'process/NB/PremiumSettlement/Enum/premiumProcessType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ProcessStatusType from 'process/NB/PremiumSettlement/Enum/processStatusType';
export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const initCollectionStatus = lodash.get(businessData, 'policyList[0].collectionStatus', null);
  const initCreateReceiptStatus = lodash.get(
    businessData,
    'policyList[0].createReceiptStatus',
    null
  );
  const initPremiumMatch = lodash.get(businessData, 'policyList[0].premiumMatch', null);
  const title = {
    Collect: formatMessageApi({
      Dropdown_POL_CollectStatus: 'Collect',
    }),
    CreateReceipt: formatMessageApi({
      Dropdown_POL_CollectStatus: 'CreateReceipt',
    }),
    PremiumMatch: formatMessageApi({
      Dropdown_POL_CollectStatus: 'PremiumMatch',
    }),
  };
  let StepGroup = [
    {
      title: title.Collect,
      description: formatMessageApi({
        Dropdown_POL_CollectStatus: 'Inprogress',
      }),
      status: ProcessStatusType.Process,
    },
    {
      title: title.CreateReceipt,
      description: null,
      status: ProcessStatusType.Wait,
    },
    {
      title: title.PremiumMatch,
      description: null,
      status: ProcessStatusType.Wait,
    },
  ];
  // const initCollectionStatus = PremiumProcessType.IntegrationFailed
  // const initCreateReceiptStatus = PremiumProcessType.Completed
  // const initPremiumMatch = PremiumProcessType.Completed

  return useMemo(() => {
    // 1
    if (initCollectionStatus === null || initCollectionStatus === PremiumProcessType.InProgress) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps
      StepGroup = [
        {
          title: title.Collect,
          description: formatMessageApi({
            Dropdown_POL_CollectStatus: 'Inprogress',
          }),
          status: ProcessStatusType.Process,
        },
        {
          title: title.CreateReceipt,
          description: null,
          status: ProcessStatusType.Wait,
        },
        {
          title: title.PremiumMatch,
          description: null,
          status: ProcessStatusType.Wait,
        },
      ];
    }

    // 2
    if (initCollectionStatus === PremiumProcessType.IntegrationFailed) {
      StepGroup = [
        {
          title: title.Collect,
          description: formatMessageApi({
            Dropdown_POL_CollectStatus: 'integrationFailed',
          }),
          icon: 'exclamation',
          status: ProcessStatusType.Error,
        },
        {
          title: title.CreateReceipt,
          description: null,
          status: ProcessStatusType.Wait,
        },
        {
          title: title.PremiumMatch,
          description: null,
          status: ProcessStatusType.Wait,
        },
      ];
    }

    // 3
    if (
      initCollectionStatus === PremiumProcessType.Completed &&
      (initCreateReceiptStatus === null ||
        initCreateReceiptStatus === PremiumProcessType.InProgress)
    ) {
      StepGroup = [
        {
          title: title.Collect,
          description: null,
          status: ProcessStatusType.Finish,
        },
        {
          title: title.CreateReceipt,
          description: formatMessageApi({
            Dropdown_POL_CollectStatus: 'Inprogress',
          }),
          status: ProcessStatusType.Process,
        },
        {
          title: title.PremiumMatch,
          description: null,
          status: ProcessStatusType.Wait,
        },
      ];
    }

    // 4
    if (
      initCollectionStatus === PremiumProcessType.Completed &&
      initCreateReceiptStatus === PremiumProcessType.IntegrationFailed
    ) {
      StepGroup = [
        {
          title: title.Collect,
          description: null,
          status: ProcessStatusType.Finish,
        },
        {
          title: title.CreateReceipt,
          description: formatMessageApi({
            Dropdown_POL_CollectStatus: 'Integration failed',
          }),
          icon: 'exclamation',
          status: ProcessStatusType.Error,
        },
        {
          title: title.PremiumMatch,
          description: null,
          status: ProcessStatusType.Wait,
        },
      ];
    }

    // 5
    if (
      initCollectionStatus === PremiumProcessType.Completed &&
      initCreateReceiptStatus === PremiumProcessType.Completed &&
      (!initPremiumMatch || initPremiumMatch === PremiumProcessType.InProgress)
    ) {
      StepGroup = [
        {
          description: null,
          title: title.Collect,
          status: ProcessStatusType.Finish,
        },
        {
          description: null,
          title: title.CreateReceipt,
          status: ProcessStatusType.Finish,
        },
        {
          title: title.PremiumMatch,
          description: formatMessageApi({
            Dropdown_POL_CollectStatus: 'InProgress',
          }),
          status: ProcessStatusType.Process,
        },
      ];
    }

    // 6
    if (
      initCollectionStatus === PremiumProcessType.Completed &&
      initCreateReceiptStatus === PremiumProcessType.Completed &&
      initPremiumMatch === PremiumProcessType.IntegrationFailed
    ) {
      StepGroup = [
        {
          description: null,
          title: title.Collect,
          status: ProcessStatusType.Finish,
        },
        {
          description: null,
          title: title.CreateReceipt,
          status: ProcessStatusType.Finish,
        },
        {
          title: title.PremiumMatch,
          description: formatMessageApi({
            Dropdown_POL_CollectStatus: 'integrationFailed',
          }),
          icon: 'exclamation',
          status: ProcessStatusType.Error,
        },
      ];
    }

    // 7
    if (
      initCollectionStatus === PremiumProcessType.Completed &&
      initCreateReceiptStatus === PremiumProcessType.Completed &&
      initPremiumMatch === PremiumProcessType.Completed
    ) {
      StepGroup = [
        {
          description: null,
          title: title.Collect,
          status: ProcessStatusType.Finish,
        },
        {
          description: null,
          title: title.CreateReceipt,
          status: ProcessStatusType.Finish,
        },
        {
          description: null,
          title: title.PremiumMatch,
          status: ProcessStatusType.Finish,
        },
      ];
    }
    return StepGroup;
  }, [initCollectionStatus, initCreateReceiptStatus, initPremiumMatch]);
};
