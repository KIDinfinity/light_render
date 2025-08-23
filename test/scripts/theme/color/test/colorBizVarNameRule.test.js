const { colorBizVarNameRule } = require('../colorBizVarNameRule')
const { colorReg } = require('../reg');

describe('colorBizVarNameRule', () => {
  test('rename code', () => {
    const fileContent = `@import (reference) '~@/themes/variables.less';

    .dateProcess {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 12px;
      .label {
        margin-right: 16px;
        white-space: nowrap;
      }
      .passDay {
        color: @white;
      }
      .padLR {
        padding: 0 2px;
      }
      .period {
        padding-right: 2px;
      }
      :global {
        .ant-progress-inner {
          background: var(--bg-color-8);
        }
      }
    }
    `;
    const code = `  .passDay {
      color: @white;`;
    const codeSplited = code.split(colorReg);
    const result = colorBizVarNameRule({
      codeSplited,
      path: '/Venus-UI/user/name.less',
      originFileContent: fileContent
    });
    expect(result).toEqual({
      change: [{ from: '@white;', to: '--p-user-name-c-passDay-t-color' }],
      content: [
        '  .passDay {\n      ',
        'color',
        ': ',
        'var(--p-user-name-c-passDay-t-color);',
        ''
      ]
    })
  })
});
