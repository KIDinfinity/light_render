import React, { useState } from 'react';
import { Form } from 'antd';
import { POSEntrance as Entrance } from 'bpm/pages/OWBEntrance';
import { useFormState, scrollToError } from 'basic/components/Form';
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
            scrollToError(state.errorRefs);
          },
        },
      ]}
      title="DEMO FormItem"
      headerInfoConfig={[]}
    >
      <div className={styles.container}>
        <Form layout="vertical">
          <FormItem.FormItemSelectPlus form={form} showOld={showOld} />
          <FormItem.FormItemSelectPlus form={form} showOld={showOld} />
          <FormItem.FormItemSelectPlus form={form} showOld={showOld} />
          <FormItem.FormItemSelectPlus form={form} showOld={showOld} />
        </Form>
      </div>
    </Entrance>
  );
};

export default Form.create({})(({ form }: any) => {
  const [data, setData] = useState({
    // FormItemInput: {
    //   value: undefined,
    //   errors: [{ message: 'requreid', field: 'FormItemInput' }],
    // },
  });

  return <Demo data={data} setData={setData} form={form} />;
});
