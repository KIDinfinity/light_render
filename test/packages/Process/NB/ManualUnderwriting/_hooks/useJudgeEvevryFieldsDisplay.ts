import { useMemo, useContext } from 'react';
import useGetFieldsCustomerTypeConfig from 'basic/hooks/useGetFieldsCustomerTypeConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import getApplicableByRoleList from 'process/NB/ManualUnderwriting/utils/getApplicableByRoleList';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import useGetAuthorisedSignatoryClientInfo from 'process/NB/ManualUnderwriting/_hooks/useGetAuthorisedSignatoryClientInfo';
import lodash from 'lodash';
import Context from 'basic/components/Elements/Context';
import sections from 'process/NB/ManualUnderwriting/basicClientSections.config';
import calcLinesWithFieldsConfig from 'process/NB/ManualUnderwriting/utils/calcLinesWithFieldsConfig';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

type IProps = {
  id: string;
  expand: string;
};

export default ({ id, expand }: IProps) => {
  const { state, caseCategory } = useContext(Context);
  const clientDetailList = useGetClientDetailList();
  const current: any = lodash.find(clientDetailList, (i: any) => i.id === id);
  const atomConfig = useGetFieldsCustomerTypeConfig({
    atomGroupCode: `${caseCategory}_BP_NB_ACT004`,
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const roleList = current?.roleList;
  const customerType = useGetCustomerType(current);
  const pageAtomConfig = useMemo(() => {
    return lodash.get(state, 'pageAtomConfig', []);
  }, [state]);
  const haveSubCard = useGetAuthorisedSignatoryClientInfo();
  const isEmpty = useMemo(() => {
    if (haveSubCard) {
      return false;
    }
    const fields = lodash
      .chain(pageAtomConfig)
      .filter((item: any) => lodash.includes(sections, item.section))
      .filter((item) => {
        return item.field;
      })
      .filter((item) => {
        return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible'));
      })
      .map((item: any) => {
        let configItem = getApplicableByRoleList({
          customerType,
          atomConfig,
          roleList,
          fieldConfig: item,
        });
        configItem = getApplicableByDisableCondidtions({
          fieldConfig: configItem,
          condition: 'mw',
          disableFieldsConditions,
        });
        return configItem;
      })
      .value();
    const totalLines = calcLinesWithFieldsConfig({ fieldsConfig: fields, expand });
    return totalLines <= 7;
  }, [
    atomConfig,
    disableFieldsConditions,
    roleList,
    disableFieldsConditions,
    customerType,
    pageAtomConfig,
    expand,
  ]);
  return isEmpty;
};
