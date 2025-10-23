import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Col, Icon } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  Validator,
  Rule,
  FormItemAutoComplete,
  formUtils,
} from 'basic/components/Form';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { localFieldConfig } from './KlipClaimNo.config';
import styles from './index.less';
import { Action } from '@/components/AuditLog/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './KlipClaimNo.config';

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId, id }: any) => {
  const dispatch = useDispatch();
  const [reloading, setReloading] = useState(false);
  const fieldProps: any = localFieldConfig['field-props'];

  const caseNo = useSelector(({ processTask }: any) => processTask.getTask?.caseNo);
  const klipCaseInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.popupData?.klipCaseInfoList
  );
  const isEditable = Rule(fieldProps['editable-condition'], form, NAMESPACE);

  const Rules = {
    validateKlipClaimNo: Validator.VLD_001062(klipCaseInfoList, id),
  };

  const KLIPClaimNoList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.map(modelnamepsace?.KLIPClaimNoList, 'fieldValue')
  );
  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getKLIPClaimNo`,
      payload: {
        caseNo,
      },
    });
  }, [caseNo]);

  const visibleConditions = true;
  const editableConditions = !(isEditable || isRegisterMcs);
  const requiredConditions = true;
  const isVisible = useMemo(() => {
    const klipClaimNo = formUtils.queryValue(
      lodash.find(klipCaseInfoList, (item: any) => {
        return item.id === id;
      })?.klipClaimNo
    );
    if (klipClaimNo === '' || lodash.isNil(klipClaimNo)) {
      return true;
    }
    return false;
  }, [klipCaseInfoList]);
  const reloadingIcon = isVisible && editable && (
    <div
      className={styles.icon}
      onClick={async () => {
        if (reloading) return;
        setReloading(true);
        const businessData = await dispatch({
          type: `${NAMESPACE}/getDataForSubmit`,
          payload: {
            isPopup: true,
          }
        });
        await dispatch({
          type: `${NAMESPACE}/getLifeJClaimId`,
          payload: {
            id: id,
            businessData: businessData,
            incidentId: incidentId,
            policyNo: form.getFieldValue('policyId'),
          },
        });
        const sectionName = formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.label.incidentInformation',
        });
        const buttonName = formatMessageApi({
          Label_BIZ_Claim: 'KLIPCaseInfo',
        });
        const fieldName =
          config?.label?.dictTypeCode &&
          formatMessageApi({
            [config?.label?.dictTypeCode]: config?.label?.dictCode,
          });

        const refreshSource = `${sectionName} \\ ${buttonName} \\ ${fieldName}`;
        dispatch({
          type: 'auditLogController/logInformation',
          payload: {
            action: Action.Refresh,
            category: refreshSource || '',
          },
        });
        setReloading(false);
      }}
    >
      <Icon type="sync" spin={reloading} />
    </div>
  );
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.ChangeKlipClaimNo1}>
          <FormItemAutoComplete
            form={form}
            disabled={
              !editable ||
              (config?.editable === Editable.Conditions
                ? !editableConditions
                : config?.editable === Editable.Yes)
            }
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            dataSource={KLIPClaimNoList}
            onSearch={() => KLIPClaimNoList}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            name={config?.name}
            rules={lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            suffix={reloadingIcon}
          />
        </div>
      </Col>
    )
  );
};

const KlipClaimNo = ({ field, config, isShow, layout, form, editable, incidentId, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      id={id}
    />
  </Authority>
);

KlipClaimNo.displayName = 'KlipClaimNo';

export default KlipClaimNo;
