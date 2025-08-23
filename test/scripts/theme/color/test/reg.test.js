const { classBlockReg, colorReg, colorValueReg } = require('../reg');

describe('class block test', () => {
  // const classBlockReg = /(&?\s?[\.|:][a-z|A-Z|\-]{1,})(\s\{\n(.){1,})/sg;
  // const classBlockReg = /(&?[.|:][a-z|A-Z|\-]{1,})(\s\{[\n|.]{1,})/sg
  test('test1', () => {

    const content = `.ant-checkbox-wrapper {
      border: 1px solid @dimgray-28;

      .ant-checkbox {
        display: none;
      }

      &.ant-checkbox-wrapper-checked {
        color: @sandybrown-22;
        border-color: @sandybrown-22;
      }

      &.ant-checkbox-wrapper-disabled {
        border: 1px solid @white-25 !important;
      }
    }`;
    expect(classBlockReg.test(content)).toBe(true);
  })
  test('test2', () => {
    content = `  .btnOpt {
      position: absolute;
      top: 10px;
      z-index: @z-index-1;
      width: 27px;
      height: 24px;
      font-size: 16px;
      line-height: 24px;
      background: @darkslategray-52;
      &.btnOptPre {
        left: -1px;
        text-align: left;
      }
      &.btnOptNext {
        right: -1px;
        text-align: right;
      }
    }`
    expect(classBlockReg.test(content)).toBe(true);
  })
  test('split code block', () => {
    const codeBlock =`@import (reference) '~@/themes/variables.less';

    .tabBar {
      position: relative;
      width: 94%;
      margin: 0 auto;
      overflow: hidden;
      &.hide {
        .btnOpt {
          display: none;
        }
        .main {
          .ctn:first-child .ctn-t::before,
          .ctn:last-child .ctn-t::after {
            background-color: transparent;
          }
        }
      }
      .btnOpt {
        position: absolute;
        top: 10px;
        z-index: @z-index-1;
        width: 27px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        background: @darkslategray-52;
        &.btnOptPre {
          left: -1px;
          text-align: left;
        }
        &.btnOptNext {
          right: -1px;
          text-align: right;
        }
      }
      .main {
        position: relative;
        display: flex;
        flex: 1;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;
        margin: 10px auto;
        transition: all 0.5s ease-in-out;
        .ctn {
          flex: 1;
          min-width: 25%;
          text-align: center;
          .ctn-t {
            position: relative;
            display: flex;
            & > .anticon {
              position: absolute;
              top: -4px;
              left: 50%;
              z-index: @z-index-1;
            }
          }
          .ctn-t::before,
          .ctn-t::after {
            display: block;
            flex: 1;
            height: 2px;
            margin-top: 12px;
            background-color: var(--bg-color-8);
            content: '';
          }
        }
      }
    }
    `;
    const matchResult = codeBlock.match(classBlockReg);
    console.log(matchResult, 'matchResult')
  })
  test('split code block 2', () => {
    const codeBlock = `@import (reference) '~@/themes/variables.less';

    .actionContainer {
      display: flex;
      justify-content: center;
      overflow-x: hidden;
      overflow-y: auto;
      .btn {
        background: none;
        border: solid 1px @dimgray-28;
        border-radius: 16px;
        &:hover {
          color: var(--p-components-SelectGroup-index-c-actionContainer-btn);
          background: var(--primary-color-light);
          border: 1px solid var(--primary-color-light);
        }
      }
    }
    .applicationListContainer {
      list-style-type: none;
      li {
        display: block;
        margin: 4px 0;
      }
      .containerText {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        line-height: 1.5;
        background: @dimgray-28;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        :global {
          .ant-input-number {
            width: 32px;
            margin: 0 4px;
            padding: 0;
            input {
              padding: 0;
              text-align: center;
            }
          }
        }
      }
      .containerTextOpt {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
      }
      .containerComment {
        border: solid 1px @white-15;
        border-radius: 0;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }
    .noMargin {
      margin: 0;
      .applicationListContainer {
        margin: 0;
        li {
          &:first-child {
            margin: 0 0 4px 0;
          }
        }
      }
    }
    `
    const matchResult = codeBlock.match(classBlockReg);
    // console.log(matchResult, 'matchResult2');
    // console.log('matchResult length', matchResult.length);
  })
  test('test 5', () => {
    const code = ` @import (reference) '~@/themes/variables.less';

    .bg{
      margin-bottom: 12px;
      padding: 0 8px 16px;
      background-color: @black-49;
      border-radius: 4px;
      .policy{
        .policyno{
          padding: 6px 0;
          font-size: 16px;
        }
      }
    }`
    expect(classBlockReg.test(code)).toBe(true);
  })
  test('split code block 2', () => {
    const code = `@import (reference) '~@/themes/variables.less';

    .currentReasonGroup {
      position: relative;
      margin-bottom: 12px;
      overflow: hidden;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      .groupHeader {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        padding: 12px 0 12px 16px;
        background-color: @darkslategray-38;
        border-left: 4px solid var(--bg-color-8);
        cursor: pointer;
        .status {
          width: 110px;
          padding-right: 8px;
          text-align: center;
        }
        &.active {
          border-left-color: var(--primary-color);
        }
        &.activeBg {
          background-color: @darkslategray-52;
        }
      }
      .del {
        position: absolute;
        top: 0;
        right: 0;
        color: var(p-pages-Envoy-EnvoyList-c-del);
        &:active {
          color: var(p-pages-Envoy-EnvoyList-c-del);
        }
      }
      .btnGroup {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        padding: 0 16px;
        :global {
          .ant-btn {
            width: 32%;
            margin-left: 2%;
            &:first-child {
              margin: 0;
            }
          }
        }
      }
      .del {
        position: absolute;
        top: 0;
        right: 0;
        color: var(p-pages-Envoy-EnvoyList-c-del);
        &:active {
          color: var(p-pages-Envoy-EnvoyList-c-del);
        }
      }
      :global {
        .ant-collapse {
          border: none;
          & > .ant-collapse-item {
            background: var(--bpm-envoy-group-bg-color);
            &.ant-collapse-no-arrow > .ant-collapse-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-left: 0;
            }
            & > .ant-collapse-content {
              padding: 4px 0 10px;
              overflow: hidden;
              background: var(--bpm-envoy-group-bg-color);
              .ant-tabs {
                overflow: unset;
              }
              .ant-tabs-tab {
                padding-top: 8px;
                padding-bottom: 8px;
              }
              .channelInfoInput {
                .ant-input {
                  height: 32px;
                  border: 1px solid var(--bpm-information-item-border-color);
                  border-radius: 4px;
                }
                .requireIcon {
                  color: var(--primary-color-light);
                }
              }
            }
          }
          .notDetailTip {
            padding: 4px 16px;
          }
        }
      }
    }
    `;
    const result = code.matchAll(new RegExp(classBlockReg, 'g'));
    console.log('split', result);
  })
})
// const reg = /(background)|(color)/;
// const reg = /(background|background-color|border|border-color|color)(:\s)(\w{0,}\s\d\w{0,}\s)?(@[a-z|A-Z|\-|\d]{1,};)/i;
describe('colorReg test', () => {
  // const colorReg = /(border-?left|right|top|bottom?)|(background-?color?)/i
  // beforEach(( )=> {
  //   reg = colorReg
  // })
  // const colorReg = /(background|border-color|color|border)(:\s)(solid\s\d+px\s?)(@[a-z|A-Z|\-]{1,};)/g;
  // const colorReg = /(background|background-color|border|border-color|color)(:\s)(solid\s\dpx\s)?(@[a-z|A-Z|\-|\d]{1,};)/g;
  // const reg = /(background)|(color)/ig;
  test('colorReg border', () => {
    const code = `  .containerComment {
      border: solid 1px @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(code)).toBe(true);
  })
  test('colorReg border split', () => {
    const code = `  .containerComment {
      border: solid 1px @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    const codeSplited = code.split(colorReg);
    console.log(codeSplited, 'codeSplited')
    // expect(colorReg.test(code)).toBe(true);
  })
  test('colorReg test border-color', () => {
    const code = `  .containerComment {
      border-color: @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(code)).toBe(true);
  })
  test('colorReg test background-color', () => {
    const code = `  .containerComment {
      background-color: @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(code)).toBe(true);
  })
  test('colorReg test background', () => {
    const code = `  .containerComment {
      background: @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(code)).toBe(true);
  })
  test('colorReg test color', () => {
    const colorCode = `  .containerComment {
      color: @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(colorCode)).toBe(true);
  })
  test('colorReg test background', () => {
    const bgCode = `  .containerComment {
      background: @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(bgCode)).toBe(true);
  })
  test('colorReg test border left color', () => {
    const bgCode = `  .containerComment {
      border-left-color: @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(bgCode)).toBe(true);
  })
  test('colorReg test border left', () => {
    const bgCode = `  .containerComment {
      border-left: 8px solid @gray-21;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
    expect(colorReg.test(bgCode)).toBe(true);
  })
  test('color reg code split', () => {
    const colorReg = /(border-left|border-right|border-top|border-bottom|background-color|border|color|background)(:\s[\w|\d]{0,}\s?[\d|\w]{0,}?\s?)(@[a-z|A-Z|\-|\d]{1,};)/;
    const code = `.textarea {
      &:global(.ant-input) {
        border: solid 1px @white-15;`;
    const result  = code.split(colorReg);
    expect(result).toEqual([
      '.textarea {\n      &:global(.ant-input) {\n        ',
      'border',
      ': solid 1px ',
      '@white-15;',
      ''
    ]);
  })
})


describe('colorValueReg test', () => {
  // const colorValueReg = /@[a-z|A-Z|\s|\-|\d]{1,};/;
  test('test 1', () => {
    const code = `  .containerComment {
      border: solid 1px @white-15;
      border-radius: 0;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;`;
      expect(colorValueReg.test(code)).toBe(true);
  });
  test('test 2', () => {
    const code = `.HeaderData{
      position: relative;
      color: var(--p-PosHistory-PolicyList-item-c-alter);
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -6px;
        width: 2px;
        background-color: @chocolate-27;
        content: '';
      }
    }`;
    expect(colorValueReg.test(code)).toBe(true)
  })
})
