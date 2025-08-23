const { addLoadshImport } = require('../addLoadshImport');

describe('addLoadshImport', () => {
  test('lodash import not exist', () => {
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
    } from 'basic/components/Form';`
    const result = addLoadshImport({ content: originConent })
    expect(result).toEqual(`import lodash from 'lodash';\nimport React from 'react';
    import { Col } from 'antd';
    import {
      Authority,
      ElementConfig,
      Editable,
      FormItemInput,
      Required,
      Visible,
      Rule,
    } from 'basic/components/Form';`)
  })
  test('loadash import exit', () => {
    const originContent = `import lodash from 'lodash';
    import React from 'react';
    import { Col } from 'antd';
    import {
      Authority,
      ElementConfig,
      Editable,
      FormItemInput,
      Required,
      Visible,
      Rule,
    } from 'basic/components/Form';`
    const result = addLoadshImport({
      content: originContent
    })
    expect(result).toEqual(originContent)
  })
})
