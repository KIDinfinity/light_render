import React, { useMemo, useState } from 'react';
import { connect, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Button, Form, Select } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import useEnableSubmitBtn from 'bpm/pages/Information/_hooks/useEnableSubmitBtn';
import useGetCurrrentActivityCategory from 'bpm/pages/Information/_hooks/useGetCurrrentActivityCategory';
import Tabs from './Tabs';
import Content from './Content';
import EffectiveDate from './EffectiveDate';
import styles from './index.less';

function AddInformation(props: any) {
  const { form, item, isCapsule, dispatch, forms } = props;
  const [loading, setLoading] = useState(false);
  const ownCategoryReason = useSelector(
    ({ navigatorInformationController }: any) => navigatorInformationController.ownCategoryReason
  );
  const { addInformations } = useSelector(
    (state: any) => ({
      addInformations: state?.navigatorInformationController?.addInformations,
    }),
    shallowEqual
  );
  const businessCode = useSelector(({ processTask }: any) => processTask?.getTask?.businessCode);
  const currentActivity = useGetCurrrentActivityCategory({ item });
  const {
    showReasonDropdown = 0,
    showEffectivePeriod = 0,
    checkSpecialChar = 0,
    confirmMsg,
  }: any = lodash.pick(currentActivity, [
    'showReasonDropdown',
    'showEffectivePeriod',
    'confirmMsg',
    'checkSpecialChar',
  ]);
  const { getFieldDecorator } = form;
  const { typeCode, descriptionTypeCode }: any = ownCategoryReason;
  const { enableSubmitBtn, saveIfNull } = useEnableSubmitBtn({
    item,
  });
  async function handleSubmit() {
    await new Promise((res, rej) => {
      if (confirmMsg) {
        handleWarnMessageModal(
          [
            {
              content: formatMessageApi({
                Label_COM_WarningMessage: confirmMsg,
              }),
            },
          ],
          {
            okFn: () => res(true),
            cancelFn: () => rej(),
          }
        );
      } else {
        res(true);
      }
    });

    let validateSuccess = true;
    lodash.map(lodash.values(forms), (value: any) => {
      value.validateFields((errors: any) => {
        if (errors) {
          validateSuccess = false;
        }
      });
      return value;
    });
    if (validateSuccess) {
      const newAddInformations = lodash.filter(addInformations, (e: any) => e?.id !== item?.id);
      setLoading(true);
      const result = await dispatch({
        type: 'navigatorInformationController/submitInformation',
        payload: {
          id: item.id,
          businessCode,
          saveIfNull,
        },
      });
      setLoading(false);

      if (result) {
        await dispatch({
          type: 'navigatorInformationController/setAddInformations',
          payload: {
            record: newAddInformations,
          },
        });
      }
    }
  }
  async function handleChange(selectedItems: any) {
    await dispatch({
      type: 'navigatorInformationController/findDictionaryByTypeCode',
      payload: {
        typeCode: descriptionTypeCode,
        dictCode: lodash.first(lodash.split(selectedItems, '-')),
        id: item.id,
      },
    });
  }

  const uniqReasonList = useMemo(
    () => lodash.uniqBy(ownCategoryReason?.value, 'reasonCode'),
    [ownCategoryReason?.value]
  );
  const showNameList = ['Investigation'];
  const showNameOnlyFlag = lodash.includes(showNameList, ownCategoryReason?.fieldName);

  return (
    <div className={styles.addinformation}>
      <Form layout="vertical" hideRequiredMark>
        {showReasonDropdown === 1 ? (
          <div style={{ marginBottom: '12px' }}>
            <span>
              {formatMessageApi({ Label_Sider_Information: ownCategoryReason?.fieldName })}
            </span>
            <Form.Item style={{ flex: 1 }}>
              {getFieldDecorator(
                'reason',
                {}
              )(
                <Select showSearch onChange={handleChange}>
                  {!lodash.isEmpty(uniqReasonList) &&
                    lodash.map(uniqReasonList, (cate: any) => (
                      <Select.Option
                        value={`${cate?.reasonCode}-${formatMessageApi({
                          [typeCode]: cate?.reasonCode || ' ',
                        })}`}
                        key={cate?.reasonCode}
                        className={styles['reason-option']}
                      >
                        {showNameOnlyFlag
                          ? `${formatMessageApi({ [typeCode]: cate?.reasonCode })}`
                          : `${cate?.reasonCode}-${formatMessageApi({
                              [typeCode]: cate?.reasonCode || ' ',
                            })}`}
                      </Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          </div>
        ) : null}
        {showEffectivePeriod === 1 ? <EffectiveDate item={item} /> : null}
        <Tabs item={item} />
        {isCapsule && <Content item={item} checkSpecialChar={checkSpecialChar} />}
        <Form.Item className={styles.btnBox}>
          <Button
            onClick={handleSubmit}
            className={styles.btn}
            disabled={!enableSubmitBtn}
            loading={loading}
          >
            {formatMessageApi({
              Label_BIZ_Claim: 'form.save',
            })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(({ navigatorInformationController }: any) => {
  return {
    categroyReason: navigatorInformationController.ownCategoryReason,
    forms: lodash.get(navigatorInformationController, 'forms', {}),
  };
})(
  Form.create({
    mapPropsToFields: (props: any) => {
      const { item, categroyReason } = props;

      return formUtils.mapObjectToFields(item, {
        reason: (val: any) => {
          if (lodash.isEmpty(val)) {
            return val;
          }
          const { typeCode, value } = categroyReason;
          const cate = lodash.find(value, (reasonItem: any) => reasonItem.reasonCode === val);
          return `${cate?.reasonCode}-${formatMessageApi({
            [typeCode]: cate?.reasonCode || ' ',
          })}`;
        },
      });
    },
    onValuesChange(props, changedFields) {
      const { dispatch, item } = props;
      const updatedChangedFields = lodash.clone(changedFields);
      if (Object.hasOwn(updatedChangedFields, 'reason')) {
        const { reason } = updatedChangedFields;
        const reasonVal = formUtils.queryValue(reason);
        const reasonCode = lodash.first(lodash.split(reasonVal, '-'));
        updatedChangedFields.reason = Object.hasOwn(reason, 'value')
          ? { ...reason, value: reasonCode }
          : reasonCode;
      }
      dispatch({
        type: 'navigatorInformationController/addInformationChange',
        payload: {
          changedFields: updatedChangedFields,
          id: item.id,
        },
      });
    },
  })(AddInformation)
);
