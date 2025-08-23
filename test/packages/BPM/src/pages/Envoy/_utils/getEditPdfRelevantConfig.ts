const transformTextAreaFrameStyle = (element) => {
  if (!element || !element?.style) {
    return element;
  }
  const hasText = element.textContent.trim().length > 0;
  element.style.width = '100%';
  if (!hasText) {
    element.style.height = '100px';
  }
  element.style.position = 'relative';
  element.style.border = '2px dashed var(--primary-color)';
  return element;
};
const ckEditorConfig = {
  toolbar: [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'removeFormat',
    'break',
    'alignment',
    'blockQuote',
    'indent',
    'outdent',
    'undo',
    'redo',
    'insertTable',
    'fontSize', // 添加字体大小选项
    'bulletedList',
    'numberedList',
  ],
  language: 'en',
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties', // 添加单元格属性工具
      'tableProperties', // 添加表格属性工具
    ],
    tableProperties: {
      // defaultProperties: {
      //   borderStyle: 'dashed',
      //   borderColor: '#000',
      //   borderWidth: '3px',
      //   alignment: 'left',
      // },
      borderColors: [
        {
          color: 'rgb(232, 119, 34)',
          label: 'FWD Orange',
        },
        {
          color: 'rgb(24, 48, 40)',
          label: 'FWD Dark Green',
        },
        {
          color: 'rgb(219, 223, 225)',
          label: 'FWD Grey',
        },
        {
          color: 'rgb(0, 0, 0)',
          label: 'FWD Dark',
        },
        {
          color: 'rgb(255, 255, 255)',
          label: 'FWD White',
        },
      ],
      backgroundColors: [
        {
          color: 'rgb(232, 119, 34)',
          label: 'FWD Orange',
        },
        {
          color: 'rgb(24, 48, 40)',
          label: 'FWD Dark Green',
        },
        {
          color: 'rgb(219, 223, 225)',
          label: 'FWD Grey',
        },
        {
          color: 'rgb(0, 0, 0)',
          label: 'FWD Dark',
        },
        {
          color: 'rgb(255, 255, 255)',
          label: 'FWD White',
        },
      ],
    },
    tableCellProperties: {
      // defaultProperties: {
      //   verticalAlignment: 'middle', // 默认垂直方向对齐方式
      //   backgroundColor: '#ffffff', // 默认背景色
      // },
      borderColors: [
        {
          color: 'rgb(232, 119, 34)',
          label: 'FWD Orange',
        },
        {
          color: 'rgb(24, 48, 40)',
          label: 'FWD Dark Green',
        },
        {
          color: 'rgb(219, 223, 225)',
          label: 'FWD Grey',
        },
        {
          color: 'rgb(0, 0, 0)',
          label: 'FWD Dark',
        },
        {
          color: 'rgb(255, 255, 255)',
          label: 'FWD White',
        },
      ],
      backgroundColors: [
        {
          color: 'rgb(232, 119, 34)',
          label: 'FWD Orange',
        },
        {
          color: 'rgb(24, 48, 40)',
          label: 'FWD Dark Green',
        },
        {
          color: 'rgb(219, 223, 225)',
          label: 'FWD Grey',
        },
        {
          color: 'rgb(0, 0, 0)',
          label: 'FWD Dark',
        },
        {
          color: 'rgb(255, 255, 255)',
          label: 'FWD White',
        },
      ],
    },
  },
  fontSize: {
    options: ['tiny', 'small', 'default', 'big', 'huge'], // 配置字体大小选项
  },
};

export { transformTextAreaFrameStyle, ckEditorConfig };
