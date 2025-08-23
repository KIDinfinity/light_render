import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash, { isEmpty } from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import getClientName from '../../_utils/getClientName';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { formUtils } from 'basic/components/Form';
import { Region } from '@/components/Tenant/constants';
import { tenant } from '@/components/Tenant';
import { filterShowReplacementInfo } from './utils';

export const useReplacementFirstInfo = () => {
  const value = useSelector(
    ({ [NAMESPACE]: namespaceModel }: any) =>
      namespaceModel?.processData?.policyReplacement?.replacementFirstInfo
  );
  return useMemo(() => {
    return formUtils.objectQueryValue(value) as any;
  }, [value]);
};
export const useOriginPolicyReplacementFlag = () => {
  const value = useSelector(
    ({ [NAMESPACE]: namespaceModel }: any) =>
      namespaceModel?.processData?.policyReplacement?.policyReplacementFlag
  );
  return useMemo(() => {
    return formUtils.queryValue(value) as any;
  }, [value]);
};
export const usePolicyReplacementFlag = () => {
  const firstInfo = useReplacementFirstInfo();
  const originPolicyReplacementFlag = useOriginPolicyReplacementFlag();

  return useMemo(() => {
    if (isEmpty(firstInfo)) {
      return originPolicyReplacementFlag;
    }
    const flag = lodash.some(
      formUtils.formatFlattenValue(formUtils.cleanValidateData(firstInfo)),
      (value) => value === 'Y'
    )
      ? 'Y'
      : 'N';
    return flag;
  }, [firstInfo, originPolicyReplacementFlag]);
};
export const useReplacementLastInfo = () => {
  const value = useSelector(
    ({ [NAMESPACE]: namespaceModel }: any) =>
      namespaceModel?.processData?.policyReplacement?.replacementLastInfo
  );
  return useMemo(() => {
    return formUtils.objectQueryValue(value);
  }, [value]);
};
export const useReplacementInfoList = () => {
  const value = useSelector(
    ({ [NAMESPACE]: namespaceModel }: any) =>
      namespaceModel?.processData?.policyReplacement?.replacementInfoList
  );
  return useMemo(() => {
    return (
      value
        ?.map((item: any) => formUtils.objectQueryValue(item))
        ?.filter(filterShowReplacementInfo) || []
    );
  }, [value]);
};
export const useShowGsIndicator = () => {
  const regionCode = tenant.region();
  const value = useSelector(
    ({ [NAMESPACE]: namespaceModel }: any) =>
      namespaceModel?.processData?.policyReplacement?.gsIndicator
  );
  return useMemo(() => {
    return regionCode === Region.MY && formUtils.queryValue(value) === 'GIO';
  }, [regionCode, value]);
};
export const useShowReplacementTable = () => {
  const replacementFirstInfo = useReplacementFirstInfo();
  const originPolicyReplacementFlag = useOriginPolicyReplacementFlag();
  return useMemo(() => {
    if (isEmpty(replacementFirstInfo)) {
      return originPolicyReplacementFlag === 'Y';
    }
    return lodash.some(
      formUtils.formatFlattenValue(formUtils.cleanValidateData(replacementFirstInfo)),
      (value) => value === 'Y'
    );
  }, [originPolicyReplacementFlag, replacementFirstInfo]);
};
export const useReplacementInfoDefaultClientName = () => {
  const localDicts = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.clientNameDicts,
    shallowEqual
  );
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.entities?.clientMap,
    shallowEqual
  );
  const sectionConfig = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig: {},
  });
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.cfgRegionalDefaultValueList
  );
  return useMemo(() => {
    return lodash.map(localDicts, (dictItem: any) => {
      const clientInfo = lodash.find(
        clientMap,
        (client: any) => client?.customerSeqNo === dictItem?.dictCode
      );
      if (!clientInfo) {
        return dictItem;
      }
      const clientName = (() => {
        return getClientName({
          sectionConfig,
          clientInfo,
          cfgRegionalDefaultValueList,
          isDefault: true,
        });
      })();
      return {
        dictCode: dictItem?.dictCode,
        dictName: clientName || null,
      };
    });
  }, [localDicts, clientMap, sectionConfig, cfgRegionalDefaultValueList]);
};
