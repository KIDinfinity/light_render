import { removeElementConfigImport } from '../removeElementConfigImport';

describe('removeElementConfigImport', () => {
  test('remove import', () => {
    const originConent = `import React from 'react';
    import { Col } from 'antd';
    import {
      Authority,
      ElementConfig,
      Editable,
      FormItemInput,
      Required,
      Visible,
      Rule,
    } from 'basic/components/Form';`;
    const result = removeElementConfigImport({
      content: originConent
    });
    expect(result).toEqual(`import React from 'react';
    import { Col } from 'antd';
    import {
      Authority,
      Editable,
      FormItemInput,
      Required,
      Visible,
      Rule,
    } from 'basic/components/Form';`)
  })
})
