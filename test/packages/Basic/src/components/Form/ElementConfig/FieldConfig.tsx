import React from 'react';
import lodash from 'lodash';
import GetConfig from './GetConfig';

const FieldElementConfig = ({ section, field, config, children }: any) => {
  const fieldConfig: any = lodash.find(
    config,
    (item: any) =>
      section &&
      item?.section?.toLowerCase() === section?.toLowerCase() &&
      field &&
      item?.field?.toLowerCase() === field?.toLowerCase()
  );

  return (
    <>
      {
        /* {[Visible.Yes, Visible.Conditional].includes(fieldConfig?.['field-props']?.visible) && */
        React.cloneElement(children, {
          section,
          field,
          fieldType: lodash.get(fieldConfig, 'fieldType', 'Text'),
          config: lodash.isPlainObject(fieldConfig?.['field-props'])
            ? fieldConfig?.['field-props']
            : {},
        })
      }
    </>
  );
};

FieldElementConfig.displayName = 'FieldElementConfig';

export default ({ section, field, fieldType, config, children }: any) => {
  return (
    <GetConfig config={config}>
      <FieldElementConfig section={section} field={field} fieldType={fieldType}>
        {children}
      </FieldElementConfig>
    </GetConfig>
  );
};
