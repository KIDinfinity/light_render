import React, { useState } from 'react';
import { Form } from 'antd';
import { POSEntrance as Entrance } from 'bpm/pages/OWBEntrance';
import { formUtils, useFormState, scrollToError } from 'basic/components/Form';
import FormItem from './FormItem';
import styles from './index.less';

const Demo = ({ form }: any) => {
  const { state } = useFormState();
  const [showOld, setShowOld] = useState(false);
  return (
    <Entrance
      buttonList={[
        {
          buttonCode: 'submit',
          title: 'Validate',
          action: () => {
            form.validateFields({ force: true }, (errors: any) => {
              if (errors) {
                console.error('errors', errors);
              } else {
                console.log('success');
              }
            });
          },
        },
        {
          buttonCode: 'error',
          title: 'Scroll To Error',
          action: () => {
            console.log('erorRefs', state.errorRefs);
            scrollToError(state.errorRefs);
          },
        },
      ]}
      title="DEMO FormItem"
      headerInfoConfig={[]}
    >
      <div className={styles.container}>
        <Form layout="vertical">
          <FormItem.FormItemInput form={form} showOld={showOld} />
          <FormItem.FormItemNumber form={form} showOld={showOld} />
          <FormItem.FormItemSelect form={form} showOld={showOld} />
          <FormItem.FormItemTextArea form={form} showOld={showOld} />
          <FormItem.FormItemCurrency form={form} showOld={showOld} />
          <FormItem.FormItemAutoComplete form={form} showOld={showOld} />
          <FormItem.FormItemSelectAuto form={form} showOld={showOld} />
          <FormItem.FormItemSelectPlus form={form} showOld={showOld} />
          <FormItem.FormItemDatePicker form={form} showOld={showOld} />
          <FormItem.FormItemTimePicker form={form} showOld={showOld} />
          <FormItem.FormItemCheckbox form={form} showOld={showOld} />
          <FormItem.FormItemCheckboxGroup form={form} showOld={showOld} />
          <FormItem.FormItemPhone form={form} showOld={showOld} />
          <FormItem.FormItemRadioGroup form={form} showOld={showOld} />
          <FormItem.FormItemCascader form={form} showOld={showOld} />
          {/* <FormItem.FormItemDateSelect form={form} showOld={showOld} /> */}
          {/* <FormItem.FormItemNumberSelect form={form} showOld={showOld} /> */}
        </Form>
      </div>
    </Entrance>
  );
};

export default Form.create({
  onFieldsChange(props, changeFields) {
    console.log({ changeFields });
  },
  mapPropsToFields() {
    return formUtils.mapObjectToFields({
      FormItemNumber: 16.4,
    });
  },
})(({ form }: any) => {
  const [data, setData] = useState({
    // FormItemInput: {
    //   value: undefined,
    //   errors: [{ message: 'requreid', field: 'FormItemInput' }],
    // },
  });

  return <Demo data={data} setData={setData} form={form} />;
});
