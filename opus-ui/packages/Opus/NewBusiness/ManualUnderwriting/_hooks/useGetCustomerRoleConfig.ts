import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

/* CustomerRole配置 */
// section "CustomerRole-Field" 专门用来放role相关配置
const localSectionConfig = {
  section: 'CustomerRole-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
  },
};

// MY-FIB 默认配置
const localFieldConfigs = [
  {
    section: 'CustomerRole-Field',
    field: 'CUS001',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Insured',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$customerRoles', operator: 'not contains', right: 'CUS015' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS002',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'PolicyOwner',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS015' },
          { left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS002' },
        ],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS003',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Beneficiary',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$customerRoles', operator: 'not contains', right: 'CUS016' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS004',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Claimant',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS004' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS005',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Payor',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS005' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS006',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Payee',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: '===',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS006' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS007',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'BeneficiaryOwner',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS007' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS009',
    'field-props': {
      editable: 'Y',
      label: {
        dictCode: 'CoBorrower',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': null,
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS011',
    'field-props': {
      editable: 'N',
      label: {
        dictCode: 'AuthorisedSignatory',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
          { left: '$customerRoles', operator: 'contains', right: 'CUS011' },
        ],
      },
      'editable-condition': null,
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS012',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Witness',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '||',
        conditions: [
          { left: '$customerRoles', operator: 'contains', right: 'CUS012' },
          { left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS012' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS013',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'HealthFamilySharingMember',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
          { left: '$customerRoles', operator: 'contains', right: 'CUS013' },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [{ left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS013' }],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS015',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'LegalRepresentative',
      },
      expand: 'Y',
      required: 'N',
      // visible: 'C',
      visible: 'N',
      'visible-condition': {
        combine: '&&',
        conditions: [
          // { left: '$isOwnerOrInsuredJuvenile', operator: '===', right: true },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [
          {
            combine: '||',
            conditions: [
              { left: '$customerRoles', operator: 'not contains', right: 'CUS001' },
              { left: '$customerRoles', operator: 'not contains', right: 'CUS002' },
            ],
          },
          {
            combine: '&&',
            conditions: [
              { left: '$otherCustomerRoles', operator: 'not contains', right: 'CUS015' },
            ],
          },
        ],
      },
      'required-condition': null,
    },
  },
  {
    section: 'CustomerRole-Field',
    field: 'CUS016',
    'field-props': {
      editable: 'C',
      label: {
        dictCode: 'Trustee',
      },
      expand: 'Y',
      required: 'N',
      visible: 'C',
      'visible-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS011' },
          { left: '$customerRoles', operator: 'not contains', right: 'CUS012' },
          {
            left: '$customerType',
            operator: 'not contains',
            right: 'C',
          },
        ],
      },
      'editable-condition': {
        combine: '&&',
        conditions: [
          { left: '$customerRoles', operator: 'not contains', right: 'CUS003' },
          { left: '$roleCount', operator: '<', right: '6' },
        ],
      },
      'required-condition': null,
    },
  },
];

const CUSTOMER_ROLE_SECTION = 'CustomerRole-Field';
const LOCAL_CONFIG = {
  configs: [localSectionConfig, ...localFieldConfigs],
  remote: true,
};

export default () => {
  const config = useGetSectionAtomConfig({
    section: CUSTOMER_ROLE_SECTION,
    localConfig: LOCAL_CONFIG,
  });

  return useMemo(() => {
    return lodash.sortBy(config, ['field']);
  }, [config]);
};
