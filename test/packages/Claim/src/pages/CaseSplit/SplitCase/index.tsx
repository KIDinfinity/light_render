import type { FC } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { Row, Col, Form } from 'antd';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ClaimRadio from '../_components/radio/ClaimRadio';
import type { FormComponentProps } from 'antd/lib/form';
import type { ConnectedProps } from 'react-redux';
import { useDispatch } from 'dva';
import { connect } from 'dva';
import type { WrappedFormUtils } from 'antd/lib/form/Form';
import { formUtils } from 'basic/components/Form';
import { DataContext } from '@/components/_store';

const StoreWrap = connect(({ caseSplitController, caseSplitCaseController }: any) => ({
  config: caseSplitController.config,
  ...caseSplitCaseController,
}));
interface ExposeProps {
  key?: string;
}
type StoreWrapProps = ConnectedProps<typeof StoreWrap>;
type SplitCaseProps = FormComponentProps & StoreWrapProps & ExposeProps;

const FormWrap = Form.create<SplitCaseProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      dispatch({
        type: 'caseSplitCaseController/updateSplitCaseInfo',
        payload: {
          changedFields,
        },
      });
    }
  },
  mapPropsToFields(props: any) {
    const { remark } = props;
    return formUtils.mapObjectToFields(remark);
  },
});
const useFormRegister = (formId: string, form: WrappedFormUtils<any>) => {
  const dispatch = useDispatch();
  const context = useContext(DataContext);

  const registerForm = () => {
    if (formId) {
      setTimeout(() => {
        dispatch({
          type: 'formCommonController/registerForm',
          payload: {
            form,
            formId,
          },
        });
        dispatch({
          type: 'caseSplitCaseController/resetSplitCaseInfo',
          payload: {
            originalCaseNo: context.taskDetail.caseNo,
          },
        });
      }, 0);
    }
  };

  const unRegisterForm = () => {
    if (formId) {
      setTimeout(() => {
        dispatch({
          type: 'formCommonController/unRegisterForm',
          payload: {
            form,
            formId,
          },
        });
      }, 0);
    }
  };
  useEffect(() => {
    registerForm();
    return () => unRegisterForm();
  }, []);
};
const SplitCase: FC<SplitCaseProps> = ({ form }) => {
  useFormRegister('SplitCase_Case', form);

  return (
    <div className="split_content">
      <Form>
        <Row type="flex" gutter={32} justify="space-between">
          <Col className="split_content_lf" span={12}>
            <div className="modal_split_case_title">
              <div className="title_case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'venus-split_current-case',
                })}
              </div>
              <div className="case_remark">
                <FormItemInput
                  form={form}
                  required
                  formName="originalRemark"
                  maxLength={240}
                  labelId="venus-split_split-remark"
                />
              </div>
            </div>
          </Col>
          <Col className="split_content_rt" span={12}>
            <div className="modal_split_case_title">
              <div className="title_case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'venus-split_new-case',
                })}
              </div>
              <div className="case_remark">
                <FormItemInput
                  form={form}
                  required
                  formName="newRemark"
                  maxLength={240}
                  labelId="venus-split_split-remark"
                />
              </div>
            </div>
            <ClaimRadio />
            <div className="scroll_container scroll_rt">
              <div className="modal_split_case_title">
                <div className="case_remark">
                  <FormItemInput
                    form={form}
                    required
                    formName="businessNo"
                    maxLength={240}
                    labelId="BusinessNo"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StoreWrap(FormWrap(SplitCase));
