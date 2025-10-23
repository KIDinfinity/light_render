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
  NAMESPACE: any;
}

const Search = ({ dispatch, form, NAMESPACE }: IProps) => {
  const handleReset = async () => {
    await dispatch({
      type: `${NAMESPACE}/saveSearchListParams`,
      payload: {
        clear: true,
      },
    });

    await dispatch({
      type: `${NAMESPACE}/getDrugsDetailList`,
      payload: {
        currentPage: 1,
      },
    });
  };
  return (
    <div className={styles.search}>
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
              type: `${NAMESPACE}/getDrugsDetailList`,
              payload: {
                searchState: true,
              },
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
  );
};

export default connect((state: any) => ({
  filterParams: state?.opusClaimDataCapture?.DrugsDetail?.filterParams,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, NAMESPACE } = props;
      dispatch({
        type: `${NAMESPACE}/saveSearchListParams`,
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
