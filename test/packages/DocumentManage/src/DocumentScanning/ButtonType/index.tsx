import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { useSelector, useDispatch, connect } from 'dva';
import styles from './index.less';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { formUtils } from 'basic/components/Form';

const ButtonType = ({ form, type }: any) => {
  const dispatch = useDispatch();
  const submited = useSelector((state: any) => state.formCommonController.submited);
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const handleChange = (e: any) => {
    dispatch({
      type: 'documentScanningController/saveButtonType',
      payload: {
        type: e.target.value,
      },
    });
  };
  return (
    <div className={styles.container}>
      <Section
        form={form}
        section="ButtonType"
        editable={!taskNotEditable}
        handleChange={handleChange}
      >
        <Fields.Pending />
        {<Fields.New />}
      </Section>
      {submited && !type && (
        <ErrorTooltipManual
          // @tsignore
          manualErrorMessage={formatMessageApi({
            Label_COM_Message: 'MSG_000416',
          })}
        />
      )}
    </div>
  );
};
export default connect(({ formCommonController, documentScanningController }: any) => ({
  validating: formCommonController.validating,
  type: documentScanningController.claimProcessData?.type,
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { type } = props;
      return formUtils.mapObjectToFields({ new: type, pending: type });
    },
  })(ButtonType)
);
