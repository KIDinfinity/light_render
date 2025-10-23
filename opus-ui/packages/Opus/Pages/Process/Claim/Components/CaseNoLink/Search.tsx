import React, { useState } from 'react';
import { Form, Button } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemSelect, formUtils } from 'basic/components/Form';

import styles from './index.less';

interface IProps {
  form: any;
  list: any[];
}

const Search = ({ list, form }: IProps) => {
  const getDicts = (key: string, typeCode = '', camelCase = false) => {
    return lodash.uniqBy(list, key).map((item) =>
      typeCode
        ? {
            dictCode: item[key],
            dictName: formatMessageApi({
              [typeCode]: camelCase ? lodash.camelCase(item[key]) : item[key],
            }),
          }
        : {
            dictCode: item[key],
            dictName: item[key],
          }
    );
  };

  return (
    <div className={styles.filters}>
      <FormItemSelect
        form={form}
        mode="multiple"
        dicts={getDicts('relationship', 'Label_CLM_Opus', true)}
        formName={'relationship'}
        labelId={'Relationship'}
        labelTypeCode={'Label_BIZ_Claim'}
      />
    </div>
  );
};

const SearchForm = Form.create<any>({
  onValuesChange(props, changedValues) {
    const { setSearchObj, searchObj } = props;
    setSearchObj({ ...searchObj, ...changedValues });
  },
  mapPropsToFields(props: any) {
    const { searchObj } = props;
    return formUtils.mapObjectToFields(searchObj);
  },
})(Search);

export default ({ updateSearchParams, list }: any) => {
  const [searchObj, setSearchObj] = useState({});

  return (
    <div className={styles.search}>
      <SearchForm setSearchObj={setSearchObj} searchObj={searchObj} list={list} />
      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          onClick={() => {
            updateSearchParams(searchObj);
          }}
          className={classnames(styles.btn, styles.btnSubmit)}
        >
          {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.search' })}
        </Button>
        <Button
          onClick={() => {
            setSearchObj({});
            updateSearchParams({});
          }}
          className={classnames(styles.btn, styles.btnReset)}
        >
          {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
        </Button>
      </div>
    </div>
  );
};
