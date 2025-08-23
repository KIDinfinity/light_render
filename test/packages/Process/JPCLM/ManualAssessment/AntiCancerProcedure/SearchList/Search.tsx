import React from 'react';
import { Form, Button } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemDatePicker, FormItemInput, formUtils } from 'basic/components/Form';

import styles from './index.less';

interface IProps {
  showSearch: boolean;
  editable: boolean;
  form: any;
  dispatch: any;
  payableData: any;
  therapeuticDate: any;
}

const Search = ({ dispatch, payableData, form, showSearch }: IProps) => {
  const handleReset = async () => {
    form.resetFields();
    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveSearchListParams',  //清空已保存的搜索字段
      payload: {
        changedFields: [],
      },
    });
    await dispatch({
      type: 'JPCLMOfClaimAssessment/getDrugsDetailList',//请求数据
      payload: {
        currentPage:1,
      }
    });
  };
  return (
    <>
      {showSearch ? (
        <div className={styles.Search}>
          <div className={styles.filters}>
          <FormItemDatePicker
              form={form}
              formName={'effectiveDate'}
              labelId={formatMessageApi({
                Label_COM_ConfigurationCenter: 'configurationCenter.effectiveDate',
              })}
            />
            <FormItemDatePicker
              form={form}
              formName={'expireDate'}
              labelId={formatMessageApi({
                Label_COM_ConfigurationCenter: 'configurationCenter.expireDate',
              })}
            />
              <FormItemInput
                form={form}
                formName={'drugName'}
                labelId={'configurationCenter.drugName'}
                labelTypeCode={'Label_COM_ConfigurationCenter'}
              />
              <FormItemInput
                form={form}
                formName={'genericName'}
                labelId={'configurationCenter.genericName'}
                labelTypeCode={'Label_COM_ConfigurationCenter'}
              />
              <FormItemInput
                form={form}
                formName={'brandName'}
                labelId={'configurationCenter.brandName'}
                labelTypeCode={'Label_COM_ConfigurationCenter'}
              />
          </div>
          <div className={styles.buttonGroup}>
            <Button
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'JPCLMOfClaimAssessment/getDrugsDetailList',
                  payload:{
                    searchState:true,
                  }
                });
              }}
              className={classnames(styles.btn, styles.btnSubmit)}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.search' })}
            </Button>
            <Button
              onClick={() => {
                handleReset();
              }}
              className={classnames(styles.btn, styles.btnReset)}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default connect((state: any) => ({
  validating: state?.formCommonController.validating,
  filterParams: state?.JPCLMOfClaimAssessment?.serialClaim?.filterParams,
  payableData: state?.JPCLMOfClaimAssessment?.serialClaim?.payableData,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/saveSearchListParams',  //onChange时保存搜索字段
        payload: {
          changedFields: formUtils.cleanValidateData(changedFields),
        },
      });
    },
    mapPropsToFields(props: any) {
      const { filterParams } = props;

      return formUtils.mapObjectToFields(filterParams);
    },
  })(Search)
);
