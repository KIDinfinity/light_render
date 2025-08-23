import React, { useEffect } from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import FieldList from './FieldList';

const SearchForm = ({ form, setForm, dashboardSearchFieldList, searchDatas }: any) => {
  useEffect(() => {
    form && setForm(form);
  }, []);

  return (
    <Form>
      <FieldList
        form={form}
        dashboardSearchFieldList={dashboardSearchFieldList}
        searchDatas={searchDatas}
      />
    </Form>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dashboardCode, dispatch } = props;
      dispatch({
        type: 'dashboardController/saveSearchDatas',
        payload: {
          dashboardCode,
          changedFields: {
            ...changedFields,
            defaultCondition: 'N',
          },
        },
      });
    },
    mapPropsToFields(props: any) {
      const { searchDatas }: any = props;
      return formUtils.mapObjectToFields({ ...searchDatas });
    },
  })(SearchForm)
);
