import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { useSelector, useDispatch, connect } from 'dva';
import styles from './index.less';
import Section, { Fields } from './Section';
import classNames from 'classnames';
import { tenant, Region } from '@/components/Tenant';

const ButtonType = ({ form, type, className }: any) => {
  const dispatch = useDispatch();
  const submited = useSelector((state: any) => state.formCommonController.submited);
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);

  const handleChange = (e: any) => {
    dispatch({
      type: 'batchDocumentScanningController/saveButtonType',
      payload: {
        type: e.target.value,
      },
    });
  };

  return (
    <div className={classNames(styles.container, className)}>
      <Section
        form={form}
        section="ButtonType"
        editable={!taskNotEditable}
        handleChange={handleChange}
      >
        {tenant.region() !== Region.MY ? <Fields.New /> : <></>}
        <Fields.Pending />
      </Section>
      {submited && !type && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({
            Label_COM_Message: 'MSG_000416',
          })}
        />
      )}
    </div>
  );
};

export default connect(({ formCommonController, batchDocumentScanningController }: any) => ({
  validating: formCommonController.validating,
  type: batchDocumentScanningController.type,
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { type } = props;
      return formUtils.mapObjectToFields({ new: type, pending: type });
    },
  })(ButtonType)
);
