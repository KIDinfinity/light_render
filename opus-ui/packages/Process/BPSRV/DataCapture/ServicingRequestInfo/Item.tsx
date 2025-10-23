import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = ({ form, id, index }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/servicingRequestInfoRemove`,
      payload: {
        id,
      },
    });
  };

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/servicingRequestInfoInit`,
      payload: {
        id,
      },
    });

    return () => {
      dispatch({
        type: `${NAMESPACE}/servicingRequestInfoClear`,
        payload: {
          id,
        },
      });
    };
  }, [servicingInit]);

  return (
    <FormBorderCard
      marginBottom
      button={{
        visiable: editable,
        callback: handleDelete,
      }}
    >
      <Section form={form} editable={editable} section="ServicingRequestInfo">
        <Fields.TransactionTypeCode index={index} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    transcationType: modelnamepsace.entities?.transactionTypesMap?.[id],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'servicingRequestInfoUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'servicingRequestInfoUpdate',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { transcationType } = props;

      return formUtils.mapObjectToFields(transcationType);
    },
  })(Item)
);
