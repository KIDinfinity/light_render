import lodash from 'lodash';
import { transferSearchComponent } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getDropdown from './getDropdown';

export default ({ dashboardSearchFieldList = [], dropdownOptions }: any) =>
  transferSearchComponent({
    searchComponentList: lodash.map(dashboardSearchFieldList, (item: any) => ({
      ...item,
      fieldCaption: formatMessageApi({
        Label_COM_ReportCenter: item.fieldName,
      }),
      layout: 12,
      whereOperator: item.whereOperation,
      dropdownDatas: getDropdown({
        fieldName: item?.fieldName,
        dropdownOptions,
      }),
    })),
    description: false,
    dropdownList: [],
  }) || [];
