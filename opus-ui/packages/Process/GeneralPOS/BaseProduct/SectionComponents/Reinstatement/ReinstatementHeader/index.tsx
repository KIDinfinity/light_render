import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { Form, Button, Modal } from 'antd';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';
import styles from './index.less';
import { isDecision } from 'process/GeneralPOS/common/utils';

const Add = ({ form, transactionId, dispatch }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Reinstatement);
  const [initialLoading, setInitialLoading] = useState(false);

  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);
  const handleInitialVersion = () => {
    Modal.confirm({
      title: formatMessageApi({
        Label_BIZ_policy: 'initialVersion',
      }),
      content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001000' }),
      cancelText: 'Cancel',
      okText: 'Confirm',
      async onOk() {
        setInitialLoading(true);
        await dispatch({
          type: `${NAMESPACE}/reinstatementInitialVersion`,
          payload: { transactionId },
        });
        setInitialLoading(false);
      },
      onCancel() {},
    });
  };
  const handleOpenLoadingModal = () => {
    if (
      lodash.every(
        uwCoverageList,
        (item) =>
          formUtils.queryValue(item?.uwCoverageDecision?.decision) !==
          BenefitLevelDecisionEnum.NonStandard
      )
    ) {
      return handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            content:
              'No Non-standard benefit level decision exists, please change at least one of the them to Non-standard.',
          },
        ],
      });
    }

    dispatch({
      type: `${NAMESPACE}/saveCommonAddModal`,
      payload: {
        visible: true,
        type: 'loading',
      },
    });
  };

  const handleOpenExclusionModal = () => {
    if (
      lodash.every(
        uwCoverageList,
        (item) =>
          formUtils.queryValue(item?.uwCoverageDecision?.decision) !==
          BenefitLevelDecisionEnum.NonStandard
      )
    ) {
      return handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            content: formatMessageApi({ Label_COM_Message: 'MSG_000795' }),
          },
        ],
      });
    }

    dispatch({
      type: `${NAMESPACE}/saveCommonAddModal`,
      payload: {
        visible: true,
        type: 'exclusion',
      },
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.flex1}>
        <Section form={form} editable={editable} section="Reinstatement-UWPolicyDecision">
          <Fields.Decision transactionId={transactionId} />
        </Section>
      </div>
      {editable && isDecision({ caseCategory }) && (
        <div>
          <Button onClick={handleInitialVersion} loading={initialLoading}>
            {formatMessageApi({
              Label_BIZ_policy: 'initialVersion',
            })}
          </Button>
          <Button onClick={handleOpenLoadingModal}>
            {formatMessageApi({
              Label_BPM_Button: 'AddLoading',
            })}
          </Button>
          <Button onClick={handleOpenExclusionModal}>
            {formatMessageApi({
              Label_BPM_Button: 'Add Exclusion',
            })}
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    uwPolicyDecision:
      modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwPolicyDecision,
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'reinstatementUpdate',
              payload: {
                type: OperationTypeEnum.UPDATE,
                changedFields,
                transactionId,
                validating,
                updateKey: 'uwPolicyDecision',
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'reinstatementUpdate',
            payload: {
              type: OperationTypeEnum.UPDATE,
              changedFields,
              transactionId,
              validating,
              updateKey: 'uwPolicyDecision',
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      return formUtils.mapObjectToFields(props.uwPolicyDecision);
    },
  })(Add)
);
