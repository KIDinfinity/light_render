import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Button, Form } from 'antd';
import classNames from 'classnames';
import FormLayout from 'basic/components/Form/FormLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormItemInput, formUtils } from 'basic/components/Form';

import { messageModal } from '@/utils/commonMessage';
import json from '../../Utils/FormLayout.json';
import { namespace } from '../../_models';

import styles from './index.less';

const Search = ({ form, taskNotEditable, searchParams = {}, dispatch, loading }) => {
  const handleSearch = () => {
    const cleanData = formUtils.formatFlattenValue(formUtils.cleanValidateData(searchParams));
    if (Object.values(cleanData).every((param) => !param)) {
      messageModal({
        code: 'VLD_000376',
        typeCode: 'Label_COM_ErrorMessage',
        dictCode: 'MSG_000393',
      });
      return;
    }

    dispatch({
      type: `${namespace}/getSearchCaseList`,
      payload: { searchParams: cleanData },
    });
  };

  const handleReset = async () => {
    await dispatch({
      type: `${namespace}/saveSearchParams`,
      payload: {
        changedFields: {
          insuredNames: '', // 被保人
          policies: '', // 保单号，多个逗号隔开
          claimNos: '',
          processInstanceId: '',
        },
      },
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.unknownDocumentBase.task.search.title',
        })}
      </div>
      <div className={styles.content}>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemInput
              form={form}
              formName="claimNos"
              disabled={taskNotEditable}
              labelId="BusinessNo"
            />
            <FormItemInput
              form={form}
              formName="processInstanceId"
              disabled={taskNotEditable}
              labelId="app.navigator.task-detail-of-data-capture.label.case-no"
            />
            <FormItemInput
              form={form}
              formName="policies"
              labelId="venus_claim.label.policyNo"
              disabled={taskNotEditable}
            />
            <FormItemInput
              form={form}
              formName="insuredNames"
              labelId="venus_claim.label.insuredName"
              disabled={taskNotEditable}
            />
          </FormLayout>
        </Form>
        <div className={styles.searchWrap}>
          <div className={classNames(styles.common, styles.search)} onClick={handleSearch}>
            <Button type="primary" disabled={taskNotEditable || loading}>
              {formatMessageApi({
                Label_BPM_Button: 'venus_claim.button.search',
              })}
            </Button>
          </div>
          <div className={classNames(styles.common, styles.reset)} onClick={handleReset}>
            <Button disabled={taskNotEditable}>
              {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ UnknownDocumentBaseController, claimEditable, loading }: any) => ({
  searchParams: UnknownDocumentBaseController?.searchParams,
  init: lodash.get(UnknownDocumentBaseController, 'init', true),
  taskNotEditable: claimEditable.taskNotEditable,
  loading: loading.effects[`UnknownDocumentBaseController/getSearchCaseList`],
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;

      dispatch({
        type: `${namespace}/saveSearchParams`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { searchParams } = props;

      return formUtils.mapObjectToFields({ ...searchParams });
    },
  })(Search)
);
