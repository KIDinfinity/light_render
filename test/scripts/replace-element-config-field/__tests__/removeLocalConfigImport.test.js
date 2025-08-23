const  {removeLocalConfigImport} = require('../removeLocalConfigImport');

describe('removeLocalConfigImport', () => {
  test('remove localconfig import', () => {
    const content = `import React from 'react';
    import { Col } from 'antd';
    import { Authority, ElementConfig, Editable, FormItemInput, Required,   Visible, Rule } from 'basic/components/Form';
    import { localConfig as localSectionConfig } from '../index';
    import { fieldConfig } from './Accountholdername.config';`
    const result = removeLocalConfigImport({
      content
    });
    expect(result).toEqual(`import React from 'react';
    import { Col } from 'antd';
    import { Authority, ElementConfig, Editable, FormItemInput, Required,   Visible, Rule } from 'basic/components/Form';
    import { fieldConfig } from './Accountholdername.config';`)
  })
})
