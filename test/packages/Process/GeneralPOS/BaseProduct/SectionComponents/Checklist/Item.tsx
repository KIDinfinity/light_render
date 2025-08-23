import React, { useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import styles from './index.less';
import { formUtils, FormItemCheckbox, FormItemDatePicker } from 'basic/components/Form';
import lodash from 'lodash';
import { FormRegister } from 'basic/components/Form';
import { ChecklistVarMapEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import { combinName } from 'process/GeneralPOS/common/utils';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const CombineSection = ({ data, editable, form, policyInfo, ...res }) => {
  const checkboxItem = [];
  const dateItem = [];
  const { clientInfoList } = policyInfo || {};
  data.forEach((item) => {
    const varData = /^\$\{(.*)\}$/.exec(item?.attatchField)?.[1];
    checkboxItem.push(
      <div className={styles.checkCodeBox} key={item?.checkCode}>
        <FormRegister form={form}>
          <FormItemCheckbox
            disabled={!editable}
            labelId={item?.checkCode}
            labelTypeCode={'Dropdown_POS_Checklist'}
            formName={item?.checkCode}
            form={form}
            {...res}
          />
        </FormRegister>
        <span className={styles.varName}>
          {varData
            ? combinName(
                clientInfoList?.find(
                  (item) => item.clientId === policyInfo?.[ChecklistVarMapEnum?.[varData]]
                )
              )
            : item?.attatchField || ''}
        </span>
      </div>
    );

    const dataRequired = form.getFieldValue(item?.checkCode) || false;

    dateItem.push(
      item?.checkExpireDateFlag === 'Y' ? (
        <div key={`${item?.checkCode}-expiryDate`} className={styles.checklistItemExpiryDate}>
          <FormRegister form={form}>
            <FormItemDatePicker
              disabled={!editable}
              labelId={'ExpiryDate'}
              labelTypeCode={'Label_BIZ_Policy'}
              formName={`${item?.checkCode}-expiryDate`}
              form={form}
              required={dataRequired}
              isInline
              {...res}
            />
          </FormRegister>
        </div>
      ) : (
        <div className={styles.checklistItemExpiryDate} key={`${item?.checkCode}-expiryDate`} />
      )
    );
  });
  return (
    <div className={styles.checklist}>
      <div>{checkboxItem}</div>
      <div className={styles.expiryDate}>{dateItem}</div>
    </div>
  );
};

const Item = ({ form, remark, policyInfo }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Checklist);
  const render = useMemo(() => {
    return (
      <CombineSection
        editable={editable}
        form={form}
        remark={remark}
        data={
          remark?.map((item) => ({
            checkCode: item?.checkCode || item,
            ...(lodash.isObject(item) ? item : {}),
          })) || []
        }
        policyInfo={policyInfo}
      />
    );
  }, [remark, form, policyInfo]);
  return render;
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  checkList: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.checkList,
  UIConfigCheckList: modelnamepsace?.UIConfig?.checkList,
  policyInfo: modelnamepsace.processData?.policyInfo,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, transactionId, remark, doubleTransaction }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        const newChangedFields = lodash
          .chain(changedFields)
          .entries()
          .map(([key, value]) => {
            let tranValue = value.value;
            if (tranValue === 1) {
              tranValue = 'Y';
            }
            if (tranValue === 0) {
              tranValue = 'N';
            }
            return [key, { ...value, value: tranValue }];
          })
          .fromPairs()
          .value();

        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'checklistUpdate',
          payload: {
            changedFields: newChangedFields,
            transactionId,
            remark,
            doubleTransaction,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { checkList } = props;
      return formUtils.mapObjectToFields(
        checkList?.reduce((r, c) => {
          r[c.code] = formUtils.queryValue(c.value) === 'Y' ? 1 : 0;

          Object.keys(lodash.omit(c, [c.code, 'value'])).forEach((item) => {
            r[`${c.code}-${item}`] = c[item];
          });
          return r;
        }, {}) || {}
      );
    },
  })(Item)
);
