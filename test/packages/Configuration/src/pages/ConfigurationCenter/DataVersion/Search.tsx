import React, { useState } from 'react';
import lodash from 'lodash';
import { Search } from '@/components/TableSearch';
import mapprops from '@/utils/mapprops';
import type { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import { getSearchItem } from '../Utils/FormUtils';
import { ShowSearchIdx } from '../Utils/Constant';
import type { SearchComponentProps, FunctionDataProps } from '../Utils/Typings';
import styles from '../TableList/index.less';

interface ComponetProps {
  searchComponentList: SearchComponentProps[];
  form: FormComponentProps;
  onFormReset: Function;
}

// todo match version update, update dataImageFunciton
function DataVersionSearch(props: ComponetProps) {
  const [search, setSearch] = useState({});
  const dispatch: Dispatch = useDispatch();
  const dataImageFunction: FunctionDataProps = useSelector((state: any) => state.configurationDataImage.dataImageFunction);
  const searchDefault: any = useSelector((state: any) => state.configurationDataImage.searchDefault);
  const {
    form,
  } = props;
  const { searchComponentList = [] }=dataImageFunction;
  const { params }=searchDefault


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
      type: 'configurationDataImage/resetSearch',
    });
  };

  const newSearch = searchComponentList.filter((el) => el.fieldName !== 'function_id');
  const searchProps = {
    ...props,
    onFormReset: (e: any) => {
      onFormReset(e);
    },
    ref: (inst: any) => {
      setSearch(inst) ;
    },
  };

  return (
    <div className={styles.searchForm}>
      <Search {...searchProps}>
        {lodash.map(newSearch, (item, idx: number) => (
          <Search.Item key={idx} simple={idx < ShowSearchIdx}>
            {() => mapprops(getSearchItem([item], params), { form })}
          </Search.Item>
        ))}
      </Search>
    </div>
  );

}
export default DataVersionSearch;
