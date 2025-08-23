import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Search } from '@/components/TableSearch';
import mapprops from '@/utils/mapprops';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { getSearchItem } from '../Utils/FormUtils';
import { ShowSearchIdx } from '../Utils/Constant';
import type { SearchComponentProps } from '../Utils/Typings';
import styles from './index.less';

interface ComponetProps {
  form: FormComponentProps;
  onFormReset: Function;
}

function ConfigurationSearch(props: ComponetProps) {
  const [search, setSearch] = useState({});
  const dispatch: Dispatch = useDispatch();
  const { form } = props;
  const searchComponentList: SearchComponentProps[] = useSelector((state: any) => state.configurationCenter.functionData.searchComponentList);
  const searchDefault: any = useSelector((state: any) => state.configurationCenter.searchDefault);
  const { params } = searchDefault;
  const onFormReset = async (e: any) => {
    search.props.form.resetFields();
    search.props.setSortOrders?.([]);
    search.props.handleSearch(e, {
      pagination: {
        page: 1,
      },
      sortOrders: [],
    });
    await dispatch({
      type: 'configurationCenter/resetSearch',
    });

  };

  const searchProps = {
    ...props,
    onFormReset: (e: any) => {
      onFormReset(e);
    },
    ref: (inst: any) => {
      setSearch(inst)
    },
  };

  return (
    <div className={styles.searchForm}>
      <Search {...searchProps}>
        {lodash.map(searchComponentList, (item, idx: number) => (
          <Search.Item key={idx} simple={idx < ShowSearchIdx}>
            {() => mapprops(getSearchItem([item], params), { form })}
          </Search.Item>
        ))}
      </Search>
    </div>
  );

}
export default ConfigurationSearch;
