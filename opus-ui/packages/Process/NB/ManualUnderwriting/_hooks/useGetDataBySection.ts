import { useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetFieldsCustomerTypeConfig from 'basic/hooks/useGetFieldsCustomerTypeConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import getApplicableByRoleList from 'process/NB/ManualUnderwriting/utils/getApplicableByRoleList';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import useGetRoleDisplayConfigCode from 'basic/components/Elements/hooks/useGetRoleDisplayConfigCode';
import { scaleByNumber } from '@/utils/utils';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

export default ({ id, config, extraDicts }: any) => {
  const clientDetailList = useGetClientDetailList();
  const current = lodash.find(clientDetailList, (i: any) => i.id === id);
  const roleDisplayConfigCode = useGetRoleDisplayConfigCode();
  const atomConfig = useGetFieldsCustomerTypeConfig({
    atomGroupCode: roleDisplayConfigCode,
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const roleList = current?.roleList;
  const customerType = useGetCustomerType(current);
  const data = useMemo(() => {
    return lodash
      .chain(config)
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
      .filter((item) => {
        return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible'));
      })
      .map((item) => {
        const key: string = lodash.get(item, 'field');

        const r = {
          key,
          label: formatMessageApi({
            [lodash.get(item, 'field-props.label.dictTypeCode')]: lodash.get(
              item,
              'field-props.label.dictCode'
            ),
          }),
          magnification: lodash.get(item, 'magnification'),
          expand: lodash.get(item, 'field-props.expand'),
          fieldType: lodash.get(item, 'fieldType'),
          dropdownTypeCode: lodash.get(item, 'field-props.x-dict.dictTypeCode'),
          order: lodash.get(item, 'field-props.x-layout.lg.order'),
          span: lodash.get(item, 'field-props.x-layout.lg.span'),
        };
        return r;
      })
      .orderBy(['order'])
      .map((item) => {
        const originData = lodash.get(current, item.key);
        let value = originData;

        if (item.fieldType === 'Dropdown') {
          if (lodash.isString(originData)) {
            value = (() => {
              if (lodash.has(extraDicts, item.key)) {
                return (
                  lodash
                    .chain(extraDicts)
                    .get(item.key)
                    .find((dictItem: any) => dictItem.dictCode === originData)
                    .get('dictName')
                    .value() || originData
                );
              }

              return formatMessageApi({
                [item.dropdownTypeCode]: originData,
              });
            })();
          }
          if (item?.key === 'promotionsBy') {
            value = lodash
              .chain(value)
              .split(',')
              .map((promotion: any) =>
                formatMessageApi({
                  Dropdown_COM_YN: promotion,
                })
              )
              .toString()
              .value();
          }
          if (lodash.isArray(originData)) {
            value = lodash
              .chain(originData)
              .map((valueItem) => {
                return (() => {
                  if (lodash.has(extraDicts, item.key)) {
                    return lodash
                      .chain(extraDicts)
                      .get(item.key)
                      .find((dictItem: any) => dictItem.dictCode === valueItem)
                      .get('dictName')
                      .value();
                  }
                  return formatMessageApi({
                    [item.dropdownTypeCode]: valueItem,
                  });
                })();
              })
              .join(',')
              .value();
          }
        }
        if (item.fieldType === 'Number') {
          value = scaleByNumber(item.magnification ?? 1, value ?? 0, true);
        }
        if (item.fieldType === 'Date') {
          value = !lodash.isNil(value) ? moment(originData).format('L') : null;
        }

        const result: any = {
          ...lodash.pick(item, ['expand', 'label', 'key', 'span', 'order']),
          value,
        };
        return result;
      })
      .value();
  }, [atomConfig, roleList, customerType, disableFieldsConditions, config, current, extraDicts]);

  return data;
};
