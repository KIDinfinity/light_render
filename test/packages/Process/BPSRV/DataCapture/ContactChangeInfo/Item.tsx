import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = ({ form, id }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const clientContact =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.processData?.policyInfo?.clientContact
    ) || {};

  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  const OnRecover = (e: any) => {
    dispatch({
      type: `${NAMESPACE}/contactChangeInfoRecover`,
      payload: {
        id,
        recoverItem: e,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/contactChangeInfoUpdate`,
      payload: {
        changedFields: {},
        id,
      },
    });
  }, [servicingInit]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/contactChangeInfoInit`,
      payload: {
        id,
      },
    });

    return () => {
      dispatch({
        type: `${NAMESPACE}/contactChangeInfoClear`,
        payload: {
          id,
        },
      });
    };
  }, []);

  return (
    <Section form={form} editable={editable} section="ContactChangeInfo">
      <Fields.Email recoverObj={clientContact} OnRecover={OnRecover} />
      <Fields.HomeNo recoverObj={clientContact} OnRecover={OnRecover} />
      <Fields.PhoneNo recoverObj={clientContact} OnRecover={OnRecover} id={id} />
      <Fields.WorkNo recoverObj={clientContact} OnRecover={OnRecover} />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    contactInfo: modelnamepsace.entities?.transactionTypesMap?.[id]?.contactInfo,
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
              target: 'contactChangeInfoUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'contactChangeInfoUpdate',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { contactInfo } = props;

      return formUtils.mapObjectToFields(contactInfo);
    },
  })(Item)
);
