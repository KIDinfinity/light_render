import React, { useState } from 'react';
import lodash from 'lodash';
import { ReactComponent as TrashIcon } from 'opus/Assets/trash.svg';
import { useUpdateEffect } from 'ahooks';
import { useDispatch } from 'dva';
import { ReactComponent as BackgroundInfoIcon } from 'opus/Assets/background.svg';
import useGetSectionConfigWithRole from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';
import SectionHeader from 'opus/NewBusiness/ManualUnderwriting/_components/SectionHeader';
import FormSection from '../../_component/FormSection';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const SECONDARY_OCCUPATION_FIELDS = [
  'NatureOfBusinessSecondary',
  'OccupationClassSecondary',
  'OccupationGroupSecondary',
  'OccupationSecondary',
  'SecondaryAnnualIncome',
  'ADDRCCOccupationClassSecondary',
  'PAOccupationClassSecondary',
  'AnnualIncomeCurrencySecondary',
];

const localSectionConfig = {
  section: 'BackgroundInfo-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true,
  section: localSectionConfig.section,
};

const BusinessSection = ({
  form,
  editable,
  clientId,
  readOnly = true,
  spanMode,
  layoutName,
  condition,
}: any) => {
  const dispatch = useDispatch();
  const config = useGetSectionConfigWithRole({
    section: localSectionConfig.section,
    localConfig,
    clientId,
    condition,
  });

  const hasSecondOccupation = !!formUtils.queryValue(form.getFieldValue('occupationSecondary'));
  const [showSecondOccupation, setShowSecondOccupation] = useState(hasSecondOccupation);
  const displaySecondOccupation = (showSecondOccupation && !readOnly) || hasSecondOccupation;

  const commonFields = lodash.omit(Fields, SECONDARY_OCCUPATION_FIELDS);
  const secondaryOccupationFields = lodash.pick(Fields, SECONDARY_OCCUPATION_FIELDS);

  useUpdateEffect(() => {
    if (!showSecondOccupation) {
      dispatch({
        type: `${NAMESPACE}/saveBackgroundInfo`,
        payload: {
          changedFields: {
            occupationSecondary: '',
            occupationClassSecondary: '',
            occupationGroupSecondary: '',
            addRccOccupationClassSecondary: '',
            paOccupationClassSecondary: '',
            natureOfBusinessSecondary: '',
            secondaryAnnualIncome: 0,
          },
          id: clientId,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSecondOccupation]);

  return (
    <>
      <SectionHeader
        icon={<BackgroundInfoIcon />}
        addActions={
          condition === 'proposal'
            ? [
                {
                  buttonCode: 'add',
                  title: formatMessageApi({
                    Label_BPM_Button: 'AddOccupation',
                  }),
                  disabled: displaySecondOccupation,
                  action: () => setShowSecondOccupation(true),
                },
              ]
            : []
        }
      />
      <FormSection
        form={form}
        config={config}
        readOnly={readOnly}
        spanMode={spanMode}
        layoutName={layoutName}
        clientId={clientId}
        formId={`${localSectionConfig.section}-${clientId}`}
      >
        {lodash.map(commonFields, (field: any) =>
          React.createElement(field, {
            form,
            editable,
            section: localSectionConfig.section,
            id: clientId,
            key: field.displayName,
            readOnly,
          })
        )}
      </FormSection>
      {displaySecondOccupation && (
        <div className={styles.secondaryOccupationContainer}>
          {condition === 'proposal' && (
            <div className={styles.secondaryOccupationActions}>
              <div onClick={() => setShowSecondOccupation(false)}>
                <TrashIcon />
              </div>
            </div>
          )}
          <FormSection
            form={form}
            config={config}
            readOnly={readOnly}
            spanMode={spanMode}
            layoutName={layoutName}
            clientId={clientId}
            formId={`${localSectionConfig.section}-${clientId}`}
          >
            {lodash.map(secondaryOccupationFields, (field: any) =>
              React.createElement(field, {
                form,
                editable,
                section: localSectionConfig.section,
                id: clientId,
                key: field.displayName,
                readOnly,
              })
            )}
          </FormSection>
        </div>
      )}
    </>
  );
};

export { Fields, localConfig, FieldConfigs };
export default BusinessSection;
