import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';
import { filter, last } from 'lodash';
import type { IDictionary } from '@/dtos/dicts';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'claimTypeArray',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.claim-type',
    },
    mode: 'multiple',
    maxLength: 240,
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: 'ClaimType',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfClaimType = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          fieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const dictsOfClaimTypes = filter(
    dictsOfClaimType,
    (value: IDictionary) => value.dictCode !== 'DTH'
  );
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
  const relationshipWithInsured = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimProcessData?.claimant?.relationshipWithInsured
  );
  const handClaimTypeArray = (e: any) => {
    if (last(e) === 'WOP' && relationshipWithInsured !== 'O') {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000853',
            }),
          },
        ],
        {
          okFn: () => {
            dispatch({
              type: 'JPCLMOfDataCapture/claimantUpdate',
              payload: {
                changedFields: { relationshipWithInsured: 'O' },
                taskDetail,
              },
            });
          },
        }
      );
    }
  };
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        form={form}
        mode={fieldProps?.mode}
        disabled={!editable || config?.editable === Editable.No}
        dicts={dictsOfClaimTypes}
        required={config?.required === Required.Yes}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        onBlur={(e: any) => handClaimTypeArray(e)}
      />
    </Col>
  );
};

const ClaimTypeArray = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

ClaimTypeArray.displayName = 'ClaimTypeArray';

export default ClaimTypeArray;
