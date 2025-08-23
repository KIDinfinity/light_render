import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const Item = ({ form, id }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const servicingInit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.servicingInit
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/addressChangeInfoUpdate`,
      payload: {
        changedFields: {},
        id,
      },
    });
  }, [servicingInit]);

  useEffect(() => {
    return () => {
      dispatch({
        type: `${NAMESPACE}/addressChangeInfoClear`,
        payload: {
          id,
        },
      });
    };
  }, []);

  return (
    <Section form={form} editable={editable} section="AddressChangeInfo">
      <Fields.AddressLine1 />
      <Fields.AddressLine2 />
      <Fields.AddressLine3 id={id} />
      <Fields.AddressLine4 id={id} />
      <Fields.AddressLine5 id={id} />
      <Fields.CountryCode />
      <Fields.CurrentAddress />
      <Fields.ZipCode id={id} />
      <Fields.AddressType />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { id }: any) => ({
    validating: formCommonController.validating,
    policyAddr: modelnamepsace.entities?.transactionTypesMap?.[id]?.policyAddr,
    policyAddress: modelnamepsace.processData?.policyInfo?.policyAddress,
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
              target: 'addressChangeInfoUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'addressChangeInfoUpdate',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { policyAddr, policyAddress } = props;

      const address = {
        addressLine1: policyAddress?.addressLine1,
        addressLine2: policyAddress?.addressLine2,
        addressLine3: policyAddress?.addressLine3,
        addressLine4: policyAddress?.addressLine4,
        addressLine5: policyAddress?.addressLine5,
        zipCode: policyAddress?.zipCode,
        countryCode: formatMessageApi({
          Dropdown_CFG_Country: policyAddress?.countryCode,
        }),
      };

      return formUtils.mapObjectToFields({
        ...policyAddr,
        currentAddress: lodash.compact(Object.values(address)).join(' '),
      });
    },
  })(Item)
);
