import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import mapprops from '@/utils/mapprops';
import { getFieldItem } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import FormSection, { FormLayout } from 'basic/components/Form/FormSection';
import { Save } from 'configuration/components/Operators';
import styles from './index.less';

export default ({
  dataFieldList,
  sectionProps,
  isAdd,
  taskNotEditable,
  functionData,
  formData,
}: any) => {
  const { form } = sectionProps;
  const defaultLayout = {
    fieldLayout: {
      xs: { span: 6 },
      sm: { span: 6 },
      md: { span: 6 },
      lg: { span: 6 },
    },
  };

  return (
    <Form layout="vertical" className={styles.modalForm}>
      <FormSection {...sectionProps}>
        <>
          {lodash.map(dataFieldList, (item: any, key: number) => (
            <FormSection {...sectionProps} key={key} className={styles.container}>
              <FormLayout json={defaultLayout}>
                {mapprops(getFieldItem(item.dataFieldList), { form })}
              </FormLayout>
            </FormSection>
          ))}
          {isAdd && (
            <Save
              taskNotEditable={taskNotEditable}
              functionData={functionData}
              type="dataConfigurationController"
              formData={formData}
            />
          )}
        </>
      </FormSection>
    </Form>
  );
};
