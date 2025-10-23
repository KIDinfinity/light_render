import React, { useState, useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  FormItemSelectPlus,
  Rule,
  formUtils
} from 'basic/components/Form';
import { searchServiceItemByPage } from '@/services/claimServiceItemInformationControllerService';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';

const localFieldConfig = {
  atomGroupCode: 'HK_CLM_CTG001.HK_CLM_ACT001',
  caseCategory: 'HK_CLM_CTG001',
  activityCode: 'HK_CLM_ACT001',
  section: 'Service',
  field: 'serviceItem',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.item',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  invoiceId,
  claimTypeList,
  incidentId,
  treatmentId
}: any) => {
  const [disabledDictCodes, setDisabledDictCodes] = useState([]);
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {
        codes: [value],
        invoiceId,
        incidentId,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');

  const repeatableServiceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList || []
  );

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );

  const notRepeatableCodeList = useMemo(
    () =>
      getNotRepeatableCodes({
        repeatableServiceItemList,
        invoiceId,
        serviceItemListMap,
      }),
    [repeatableServiceItemList, serviceItemListMap]
  );

  const roomType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => formUtils.queryValue(modelnamepsace.claimEntities.treatmentListMap?.[treatmentId]?.roomType)
  )

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          labelType={config.label?.type || fieldProps.label.type}
          onSelectCallback={onSelect}
          searchName="serviceItem"
          dropdownCode="claim_dict001"
          optionShowType="both"
          otherParams={{ claimTypeList }}
          customUrl={searchServiceItemByPage}
          disabledDictCodes={disabledDictCodes}
          callBackSetDataList={(list = []) => {
            const newDisabledDictCodes: any = lodash
              .chain(list)
              .filter(
                (el: any) =>
                (el.repeatable !== 'Y' && notRepeatableCodeList.includes(el.dictCode)) ||
                ((roomType === 'OU' || roomType === 'CS') && el.dictCode === '10.2.0')
              )
              .reduce((arr: any, item: any) => {
                return [...arr, item.dictCode];
              }, [])
              .value();

            setDisabledDictCodes(newDisabledDictCodes);
          }}
        />
      </Col>
    )
  );
};

const ServiceItem = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  invoiceId,
  claimTypeList,
  incidentId,
  treatmentId
}: any) => (
  <Authority>
      <FormItem
        field={field} config={config} incidentId={incidentId}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        invoiceId={invoiceId}
        claimTypeList={claimTypeList}
        treatmentId={treatmentId}
      />
  </Authority>
);

ServiceItem.displayName = 'ServiceItem';

export default ServiceItem;
