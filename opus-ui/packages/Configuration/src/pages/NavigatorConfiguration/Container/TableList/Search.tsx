import React from 'react';
import mapprops from '@/utils/mapprops';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { getSearchItem } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import type { SearchComponentProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { Form, Spin } from 'antd';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import { getSearchComponent } from '../../Utils/getFormatField';

interface ComponentProps {
  form: FormComponentProps;
  searchDefault: any;
}

function SearchA(props: ComponentProps) {
  const searchComponentList: SearchComponentProps[] = useSelector(
    (state: any) => state.configurationController.functionData.searchComponentList
  );
  const functionLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/getFunction']
  );
  const { searchDefault, form } = props;
  const params = lodash.get(searchDefault, 'params', {});
  const newSearch = getSearchComponent(searchComponentList);

  return (
    <div className={styles.searchForm}>
      {functionLoading ? (
        <div className={styles.emptyBox}>
          <Spin />
        </div>
      ) : (
        <Form layout="vertical">{mapprops(getSearchItem(newSearch, params), { form })}</Form>
      )}
    </div>
  );
}

export default connect(({ configurationController, loading }: any) => ({
  searchComponentList: configurationController.functionData.searchComponentList,
  searchDefaultTemp: configurationController.searchDefaultTemp,
  functionCode: configurationController?.functionData?.functionCode,
  functionLoading: loading.effects['configurationController/getFunction'],
}))(
  Form.create({
    onFieldsChange(props: any, changedValues) {
      const { searchDefaultTemp, functionCode, dispatch } = props;
      dispatch({
        type: 'configurationController/saveSearchDefaultTemp',
        payload: {
          searchDefaultTemp: {
            ...searchDefaultTemp,
            [functionCode]: {
              ...(searchDefaultTemp?.functionCode || {}),
              ...changedValues,
            },
          },
        },
      });
    },
    mapPropsToFields(props) {
      const { searchDefaultTemp, functionCode } = props;
      return formUtils.mapObjectToFields({ ...(searchDefaultTemp?.[functionCode] || {}) }, {});
    },
  })(SearchA)
);
