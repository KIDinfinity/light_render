import { SourceSystem } from 'process/Enum';

const localFieldConfig = {
  section: 'PopUp.klipCaseInfo',
  field: 'notificationOfLossDate',
  'field-props': {
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'sourceSystem' },
          operator: '===',
          right: SourceSystem.Klip,
        },
      ],
    },
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_COM_ReportCenter',
      dictCode: 'notification_of_loss_date',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': [],
  },
};

export { localFieldConfig };
