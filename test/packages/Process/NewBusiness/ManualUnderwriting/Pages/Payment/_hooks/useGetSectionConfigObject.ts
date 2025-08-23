import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import PaymentOption from 'process/NewBusiness/ManualUnderwriting/_enum/PaymentOption';
import PayType from 'process/NewBusiness/Enum/PayType';

const paymentAmountFieldConfig = {
  section: 'PaymentSlipInformation-Field',
  field: 'chequeAmount',
  fieldType: 'Number',
  'field-props': {
    expand: 'Y',
    visible: 'Y',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentAmount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

const paymentBankedInDateFieldConfig = {
  section: 'PaymentSlipInformation-Field',
  field: 'chequeDate',
  fieldType: 'Date',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentBackedInDate',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-rules': [],
  },
};

const paymentSlipCurrencyFieldConfig = {
  section: 'PaymentSlipInformation-Field',
  field: 'chequeCurrency',
  fieldType: 'Text',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentSlipCurrency',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

const paymentSlipForMultipleApplicationFieldConfig = {
  section: 'PaymentSlipInformation-Field',
  field: 'chequeForMultipleApplication',
  fieldType: 'Text',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentSlipForMultipleApplication',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

const paymentSlipTransactionNoFieldConfig = {
  section: 'PaymentSlipInformation-Field',
  field: 'chequeNo',
  fieldType: 'Text',
  'field-props': {
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PaymentSlipTransactionNo',
    },
    expand: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};
const PAYMENT_SLIP_CONFIG = {
  configs: [
    paymentSlipTransactionNoFieldConfig,
    paymentBankedInDateFieldConfig,
    paymentAmountFieldConfig,
    paymentSlipForMultipleApplicationFieldConfig,
    paymentSlipCurrencyFieldConfig,
  ],
  remote: true,
};

export default () => {
  const NAMESPACE = useGetNamespace();
  const paymentOption = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      lodash.get(modelNamespace, 'processData.planInfoData.paymentOption'),
    shallowEqual
  );
  const payType = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      lodash.get(modelNamespace, 'processData.planInfoData.payType'),
    shallowEqual
  );
  return useMemo(() => {
    if (payType === PayType.DirectTransfer) {
      return {
        section: 'DirectTransferInformation-Field',
        localConfig: {},
      };
    }
    switch (paymentOption) {
      case PaymentOption.PaymentSlip:
        return {
          section: 'PaymentSlipInformation-Field',
          localConfig: PAYMENT_SLIP_CONFIG,
        };
      default:
        return {
          section: 'ChequeInformation-Field',
          localConfig: {},
        };
    }
  }, [paymentOption, payType]);
};
