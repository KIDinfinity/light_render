import React, { useState, useEffect } from 'react';
import { Form, Radio } from 'antd';
import { connect, useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CheckNtuType from 'process/NB/Enum/CheckNtuType';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Extendtodate = ({ form, editable }: any) => {
  return (
    <Section form={form} editable={editable} section="NTUinfo-Field">
      <Fields.Extendtodate />
    </Section>
  );
};

const Extendtodays = ({ form, editable }: any) => {
  return (
    <Section form={form} editable={editable} section="NTUinfo-Field">
      <Fields.Extendtodays />
    </Section>
  );
};

const ExtendRadioGroup = ({ form, setNtuForm }: any) => {
  const dispatch = useDispatch();
  const currentRadio = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ntuDataObject?.currentRadio
  );
  const [value, setValue] = useState(currentRadio);
  const onChange = (e: any) => {
    setValue(e.target.value);
    const clearFieldName = lodash
      .chain(CheckNtuType)
      .values()
      .find((item: any) => item !== e.target.value)
      .value();
    dispatch({
      type: `${NAMESPACE}/setNtuData`,
      payload: {
        changedFields: {
          [clearFieldName]: null,
          currentRadio: e.target.value,
        },
      },
    });
  };
  useEffect(() => {
    setNtuForm(form);
  }, []);
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={CheckNtuType.ExtendtoDate}>
        <Extendtodate form={form} editable={CheckNtuType.ExtendtoDate === value} />
      </Radio>
      <Radio value={CheckNtuType.ExtendtoDays}>
        <Extendtodays form={form} editable={CheckNtuType.ExtendtoDays === value} />
      </Radio>
    </Radio.Group>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  ntuDataObject: modelnamepsace.ntuDataObject,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setNtuData',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setNtuData',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { ntuDataObject } = props;
      return formUtils.mapObjectToFields(ntuDataObject);
    },
  })(ExtendRadioGroup)
);
