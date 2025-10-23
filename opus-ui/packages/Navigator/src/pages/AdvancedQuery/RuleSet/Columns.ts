import lodash, { toUpper } from 'lodash';
import moment from 'moment';

import { filterConfig } from '@/utils/configUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { sorts } from '../TitleMap';

const name = 'user';
export default (orders: any, config: any, saveSort: any) => {
  // const { handleScale } = resizeWindowHook();

  const width = 130;
  // # TODO
  const params = [
    {
      fieldName: 'Rule Set ID',
      id: 'venus_claim.ruleEngine.ruleSetId',
      dataIndex: 'ruleSetId',
      key: 'ruleSetId',
      sorter: true,
      defaultSortOrder: orders?.ruleSetId?.sortOrder,
      width,
      render: (text) => text || '-',
    },
    {
      fieldName: 'Rule Set Name',
      id: 'venus_claim.ruleEngine.ruleSetName',
      dataIndex: 'ruleSetName',
      key: 'ruleSetName',
      sorter: true,
      defaultSortOrder: orders?.ruleSetName?.sortOrder,
      width,
      render: (text) => text || '-',
    },
    {
      fieldName: 'Module',
      id: 'venus_claim.ruleEngine.module',
      dataIndex: 'moduleCode',
      key: 'moduleCode',
      sorter: true,
      defaultSortOrder: orders?.moduleCode?.sortOrder,
      width,
      render: (text) => text || '-',
    },
    {
      fieldName: 'Rule Set Type',
      title: formatMessageApi({
        Label_RUL_RuleEngine: 'RuleSetType',
      }),
      dataIndex: 'ruleSetType',
      key: 'ruleSetType',
      sorter: true,
      defaultSortOrder: orders?.ruleSetType?.sortOrder,
      width,
      render: (text) => {
        return formatMessageApi({ Dropdown_RUL_RuleSetType: text }) || '-';
      },
    },
    {
      fieldName: 'Effective Date',
      id: 'venus_claim.ruleEngine.effectiveDate',
      key: 'effectiveDate',
      dataIndex: 'effectiveDate',
      defaultSortOrder: orders?.effectiveDate?.sortOrder,
      width: width * 0.9,
      render: (text) => {
        return text ? moment(text).format('L') : '-';
      },
    },
    {
      fieldName: 'Expired Date',
      id: 'venus_claim.ruleEngine.expiredDate',
      key: 'expiredDate',
      dataIndex: 'expiredDate',
      defaultSortOrder: orders?.expiredDate?.sortOrder,
      width: width * 0.9,
      render: (text) => {
        return text ? moment(text).format('L') : '-';
      },
    },
    {
      fieldName: 'Expected Publish Date',
      id: 'venus_claim.ruleEngine.expectedPublishDate',
      key: 'expectedPublishDate',
      dataIndex: 'expectedPublishDate',
      defaultSortOrder: orders?.expectedPublishDate?.sortOrder,
      width: width * 0.9,
      render: (text) => {
        return text ? moment(text).format('L') : '-';
      },
    },
    {
      fieldName: 'Actual Publish Time',
      id: 'venus_claim.ruleEngine.actualPublishTime',
      key: 'actualPublishTime',
      dataIndex: 'actualPublishTime',
      defaultSortOrder: orders?.actualPublishTime?.sortOrder,
      width: width * 0.9,
      render: (text) => {
        return text ? moment(text).format('L') : '-';
      },
    },
  ];

  const columns = filterConfig(config, params);

  return lodash.map(columns, (el: any) => {
    const tempParams = params.find((ele) => toUpper(ele.fieldName) === toUpper(el.fieldName));
    let sortOrder = tempParams?.defaultSortOrder || orders?.[tempParams.dataIndex]?.sortOrder;
    if (tempParams?.dataIndex === saveSort.sortName) {
      sortOrder = sorts[saveSort.sortOrder];
    }
    return {
      title:
        tempParams.title ||
        formatMessageApi({
          Label_BIZ_Claim: tempParams.id,
        }),
      dataIndex: tempParams.dataIndex,
      key: tempParams.key || tempParams.dataIndex,
      sorter: el.sortable,
      sortOrder,
      render: tempParams.render,
      width: tempParams.width,
    };
  });
};
