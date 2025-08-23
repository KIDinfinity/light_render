import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import FieldList from './FieldList';
import { FormRegister } from 'basic/components/Form';

const SearchForm = ({ form, dashboardSearchFieldList, searchDatas, dashboardCode }: any) => {
  return (
    <FormRegister namespace="dashboardController" formId={dashboardCode} form={form}>
      <Form>
        <FieldList
          form={form}
          dashboardSearchFieldList={dashboardSearchFieldList}
          searchDatas={searchDatas}
        />
      </Form>
    </FormRegister>
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
          changedFields,
        },
      });
    },
    mapPropsToFields(props: any) {
      const { searchDatas }: any = props;
      return formUtils.mapObjectToFields({ ...searchDatas });
    },
  })(SearchForm)
);
