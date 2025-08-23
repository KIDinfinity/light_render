const fontFamily = `'FWDCircularTTBook', Helvetica, Arial, Calibri, 'PingFang SC', 'Microsoft Yahei', Meiryo, sans-serif`;
const fontFamilyOpus =
  "'FWDCircularTTBook', Calibri, Helvetica, Arial,, 'PingFang SC', 'Microsoft Yahei', Meiryo, sans-serif";

const theme = {
  'test-bundle': '0.0.1',
  'font-family': fontFamily,
  // 'font-size-base': '1rem',

  'form-item-margin-bottom': '4px',

  'control-padding-horizontal': '8px',

  'border-radius-base': '4px',

  'outline-color': 'transparent',
  'outline-width': '0px',

  'input-bg': 'transparent',
  'input-disabled-bg': 'transparent',
  'input-height-base': '24px',
  'input-height-lg': '32px',
  'input-height-sm': '16px',

  'select-background': 'transparent',

  'table-header-bg': 'transparent',
  'table-header-sort-bg': 'transparent',

  'pagination-font-family': fontFamily,

  'collapse-header-bg': 'transparent',
  'collapse-content-bg': 'transparent',
  'collapse-header-padding': '0px',
  'collapse-header-padding-extra': '0px',
  'collapse-content-padding': '0px',

  'avatar-bg': 'none',
};

const orange = {
  1: '#fff9f0',
  2: '#ffe8c9',
  3: '#ffd3a1',
  4: '#ffbb78',
  5: '#f59b4c',
  6: '#e87722',
};

const green = {
  1: '#42aac2',
  2: '#42aac2',
  3: '#42aac2',
  4: '#42aac2',
  5: '#42aac2',
  6: '#42aac2',
};

const light = {
  1: '#D88223',
  2: '#D88223',
  3: '#D88223',
  4: '#D88223',
  5: '#D88223',
  6: '#D88223',
};

const black = {
  apple: '#f5f5f7',
  100: 'rgba(0, 0 , 0, 100%)',
  85: 'rgba(0, 0, 0, 85%)',
  65: 'rgba(0, 0, 0, 65%)',
  45: 'rgba(0, 0, 0, 45%)',
  25: 'rgba(0, 0, 0, 25%)',
  15: 'rgba(0, 0, 0, 15%)',
  9: 'rgba(0, 0, 0, 9%)',
  4: 'rgba(0, 0, 0, 4%)',
  2: 'rgba(0, 0, 0, 2%)',
};

const white = {
  apple: '#f5f5f7',
  100: 'rgba(0, 0 , 0, 100%)',
  85: 'rgba(255, 255, 255, 85%)',
  65: 'rgba(255, 255, 255, 65%)',
  45: 'rgba(255, 255, 255, 45%)',
  25: 'rgba(255, 255, 255, 25%)',
  15: 'rgba(255, 255, 255, 15%)',
  9: 'rgba(255, 255, 255, 9%)',
  4: 'rgba(255, 255, 255, 4%)',
  2: 'rgba(255, 255, 255, 2%)',
};

export default {
  theme: [
    {
      key: 'dark',
      theme: 'dark',
      fileName: 'dark.css',
      modifyVars: {
        ...theme,
        'primary-color': orange[6],
        'primary-2': orange[6],

        'component-background': '#222222',

        'border-color-base': white[15],
        'border-color-split': white[15],

        'text-color': white[65],
        'text-color-secondary': white[45],
        'disabled-color': white[25],
        'disabled-bg': '#4a4a4a',

        'heading-color': white[85],

        'success-color': '#52c41a',
        'warning-color': '#faad14',

        'badge-text-color': '#fff',

        'item-hover-bg': orange[6],
        'item-active-bg': orange[6],

        'link-hover-color': orange[6],

        'label-color': white[65],
        'input-color': '#fff',
        'label-required-color': orange[6],

        'input-placeholder-color': white[45],
        'select-item-selected-bg': orange[6],
        'tree-directory-selected-bg': orange[6],
        'time-picker-selected-bg': orange[6],

        'table-header-color': white[45],
        'table-header-sort-bg': 'transparent',
        'table-header-sort-active-bg': orange[6],
        'table-row-hover-bg': orange[6],
        'table-selected-row-bg': orange[6],
        'table-expanded-row-bg': 'transparent',
        'table-header-bg-sm': 'transparent',
      },
    },
    {
      key: 'light',
      theme: 'light',
      fileName: 'light.css',
      modifyVars: {
        ...theme,
        'primary-color': '#42aac2',

        'component-background': white.apple,

        'border-color-base': black[15],
        'border-color-split': black[15],

        'text-color': black[65],
        'text-color-secondary': black[45],
        'disabled-color': '#333333',
        // 'disabled-bg': '#4a4a4a',

        'heading-color': black[85],

        // 'success-color': '#52c41a',
        // 'warning-color': '#faad14',

        // 'badge-text-color': '#000',

        'item-hover-bg': green[3],
        'item-active-bg': green[3],

        'link-hover-color': green[6],

        'label-required-color': green[6],

        'input-placeholder-color': black[45],
        'select-item-selected-bg': green[3],
        'time-picker-selected-bg': green[3],

        'table-header-color': black[45],
        'table-header-sort-bg': 'transparent',
        'table-header-sort-active-bg': green[3],
        'table-row-hover-bg': green[3],
        'table-selected-row-bg': green[3],
        'table-expanded-row-bg': 'transparent',
        'table-header-bg-sm': 'transparent',
        'card-head-color': '#006269',
        'input-color': black[100],
        'highlight-color': '#e87722',
      },
    },

    {
      key: 'news',
      theme: 'news',
      fileName: 'news.css',
      modifyVars: {
        ...theme,
        'primary-color': '#F2A51F',

        'component-background': black.apple,

        'border-color-base': black[15],
        'border-color-split': black[15],

        'text-color': black[65],
        'text-color-secondary': black[45],
        'disabled-color': '#333333',
        // 'disabled-bg': '#4a4a4a',

        'heading-color': black[85],

        // 'success-color': '#52c41a',
        // 'warning-color': '#faad14',

        // 'badge-text-color': '#000',

        'item-hover-bg': light[3],
        'item-active-bg': light[3],

        'link-hover-color': light[6],

        'label-required-color': light[6],

        'input-placeholder-color': black[45],
        'select-item-selected-bg': light[3],
        'time-picker-selected-bg': light[3],

        'table-header-color': black[45],
        'table-header-sort-bg': 'transparent',
        'table-header-sort-active-bg': light[3],
        'table-row-hover-bg': light[3],
        'table-selected-row-bg': light[3],
        'table-expanded-row-bg': 'transparent',
        'table-header-bg-sm': 'transparent',
        'card-head-color': light[1],
        'input-color': black[100],
        'highlight-color': light[1],
      },
    },
    {
      key: 'opus',
      theme: 'opus',
      fileName: 'opus.css',
      modifyVars: {
        ...theme,
        'font-family': fontFamilyOpus,
        'pagination-font-family': fontFamilyOpus,
        'primary-color': '#E87722',

        'component-background': black.apple,

        'border-color-base': black[15],
        'border-color-split': black[15],

        'text-color': black[65],
        'text-color-secondary': black[45],
        'disabled-color': '#333333',
        // 'disabled-bg': '#4a4a4a',

        'heading-color': black[85],

        // 'success-color': '#52c41a',
        // 'warning-color': '#faad14',

        // 'badge-text-color': '#000',

        'item-hover-bg': light[3],
        'item-active-bg': light[3],

        'link-hover-color': light[6],

        'label-required-color': light[6],

        'input-placeholder-color': black[45],
        'select-item-selected-bg': light[3],
        'time-picker-selected-bg': light[3],

        'table-header-color': black[45],
        'table-header-sort-bg': 'transparent',
        'table-header-sort-active-bg': light[3],
        'table-row-hover-bg': light[3],
        'table-selected-row-bg': light[3],
        'table-expanded-row-bg': 'transparent',
        'table-header-bg-sm': 'transparent',
        'card-head-color': light[1],
        'input-color': black[100],
        'highlight-color': light[1],
      },
    },
  ],
  themePath: './src/themes'
};
