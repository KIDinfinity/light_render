import React, { useState } from 'react';
import lodash from 'lodash';
import EnvoyInput from '../EnvoyInput';
import { connect } from 'dva';
import { Form, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { FormItemTextArea, FormItemSelectPlus } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleSearchMedicalProviderCallback from 'bpm/pages/Envoy/hooks/useHandleSearchMedicalProviderCallback';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import styles from './MemoTextAreaForm.less';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import classnames from 'classnames';
import SubTypeCode from './fields/SubTypeCode';
import MapComponent from '../MapComponent';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';

const MemoTextAreaForm = ({
  form,
  idx,
  disabled,
  showMemoRemark,
  errorInfo,
  data,
  fieldsRequired,
  displayConfig,
}: any) => {
  const memoConfigArr = getSortModuleArr(displayConfig);

  const memoDescErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_memoDesc`
  );
  const memoRemarkErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`
  );
  const remark = formUtils.queryValue(
    data?.pendingMemoList?.[idx]?.pendingMemoSubInfoList?.[0]?.subRemark
  );
  const [savedText, saveText] = useState(remark || '');
  const [input, setInput] = useState(
    data.pendingMemoList[`${idx}`]?.pendingMemoSubInfoList?.[0]?.subRemark || ''
  );
  const medicalError = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_medicalProviderCode`
  );
  const handleSearch = useHandleSearchMedicalProviderCallback();

  const pendingDescriptionType = displayConfig?.pendingDescription?.type;

  const buttonActive = input !== savedText;

  return (
    <div className={styles.flex}>
      {tenant.isTH() && (
        <EnvoyInput title={formatMessageApi({ Label_Sider_Envoy: 'pendingDesc' })}>
          {memoDescErrorMessage?.length ? <LabelTip title={memoDescErrorMessage} /> : null}

          <FormItemTextArea
            form={form}
            className={styles.textarea}
            placeholder={formatMessageApi({
              Label_Sider_Envoy: 'MemoDetailPromptText',
            })}
            formName={`pendingMemoList{${idx}}_memoDesc`}
            maxLength={468}
            disabled={disabled}
            required={fieldsRequired?.memoDesc}
            row={1}
            autoSize={true}
          />
        </EnvoyInput>
      )}

      {displayConfig?.medicalProvider && (
        <EnvoyInput
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.hospitalDetail.search.hospital-name',
          })}
        >
          <>
            {medicalError?.length ? <LabelTip title={medicalError} /> : null}
            <FormItemSelectPlus
              form={form}
              formName={`pendingMemoList{${idx}}_medicalProviderCode`}
              disabled={disabled}
              optionShowType="name"
              setVisible={() => {}}
              searchCustom={handleSearch}
              required={fieldsRequired?.medicalProviderCode}
            />
          </>
        </EnvoyInput>
      )}

      {pendingDescriptionType === 'SubTypeCode' && (
        <SubTypeCode
          idx={idx}
          disabled={disabled}
          data={data}
          form={form}
          fieldsRequired={fieldsRequired}
          errorInfo={errorInfo}
        />
      )}

      {showMemoRemark && (
        <EnvoyInput title={formatMessageApi({ Label_COM_General: 'Remark' })}>
          <div className={styles.row}>
            {memoRemarkErrorMessage?.length ? <LabelTip title={memoRemarkErrorMessage} /> : null}
            <FormItemTextArea
              className={styles.textarea}
              form={form}
              placeholder={formatMessageApi({ Label_COM_General: 'Remark' })}
              formName={`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`}
              maxLength={468}
              disabled={disabled}
              required={fieldsRequired?.memoRemark}
              row={1}
              autoSize={true}
              onType={setInput}
            />
            <>
              <Icon
                type="check"
                className={classnames(styles.IconGap, { [styles.inactive]: !buttonActive })}
                onClick={() => buttonActive && saveText(remark)}
              />
              <Icon
                type="close"
                className={classnames(styles.IconGap, { [styles.inactive]: !buttonActive })}
                onClick={() => {
                  if (!buttonActive) return;
                  setInput(savedText);
                  form.setFieldsValue({
                    [`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`]: savedText,
                  });
                }}
              />
            </>
          </div>
        </EnvoyInput>
      )}
      {memoConfigArr.map((item: any) => {
        const Component = MapComponent[item?.moduleName];
        return Component ? (
          <Component
            data={data}
            key={data.id}
            item={item}
            editable={item?.editable}
            custom={item?.custom}
            required={item?.required}
            type="reason"
            className={styles.inputWrap}
          />
        ) : null;
      })}
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { data, dispatch } = props;
      const name = lodash.keys(changedFields)?.[0];
      const value = formUtils.queryValue(changedFields[name]);

      const names = name.includes('medicalProviderCode') ? { names: [name] } : {};

      if (!name.includes('subTypeCode')) {
        const action = name.includes('memoDesc')
          ? 'saveReasonMemoDesc'
          : name.includes('medicalProviderCode')
            ? 'saveReasonMemoCode'
            : 'saveReasonMemoRemark';

        dispatch({
          type: `envoyController/${action}`,
          payload: {
            groupId: data?.groupId,
            dataId: data?.id,
            name,
            value,
            ...names,
          },
        });

        dispatch({
          type: 'envoyController/validateFields',
          payload: {
            dataId: data?.groupId,
          },
        });
      }
    },

    mapPropsToFields(props: any) {
      const { idx, data } = props;
      const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
      const obj = formUtils.mapObjectToFields({
        [`pendingMemoList{${idx}}_memoDesc`]: formatMessageApi({
          DropDown_ENV_PendingMemoDescription: pendingMemoList[`${idx}`]?.memoDesc,
        }),
        [`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`]:
          pendingMemoList[`${idx}`]?.pendingMemoSubInfoList?.[0]?.subRemark,
        [`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subTypeCode`]:
          pendingMemoList[`${idx}`]?.pendingMemoSubInfoList?.[0]?.subTypeCode,
        [`pendingMemoList{${idx}}_medicalProviderCode`]:
          pendingMemoList[`${idx}`]?.medicalProviderCode,
      });

      return obj;
    },
  })(MemoTextAreaForm)
);
