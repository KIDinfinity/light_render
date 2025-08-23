import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Tooltip, Icon } from 'antd';
import lodash from 'lodash';
import { connect } from 'dva';
import { tenant } from '@/components/Tenant';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { FormItemInput, formUtils } from 'basic/components/Form';
import ExpandedRow from '../Detail/ExpandedRow';
import PatchItemModal from '../PatchItemModal';

import styles from './index.less';

function PatchModal({
  form,
  visible,
  setVisible,
  type = 'add',
  dispatch,
  tempDataPatch,
  gitAccount,
  loading,
}: any) {
  const [itemVisible, setItemVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [selfType, setSelfType] = useState('add');
  const [selectItem, setSelectItem] = useState([]);
  const [comfirm, setComfirm] = useState(false);
  const disabled = tenant.activeProfile() !== 'presit';

  const ref: any = useRef();

  const onOk = () => {
    if (disabled) {
      setComfirm(false);
      setVisible(false);
      return;
    }

    form.validateFields({ force: true }, async (error: any) => {
      setComfirm(true);
      if (error || lodash.isEmpty(tempDataPatch.patch?.patchItems)) {
        ref?.current?.hideLoading?.();
        return;
      }
      const result = await dispatch({
        type: 'sqlController/updateChildPatch',
        payload: {
          dataPatch: tempDataPatch.patch,
          createTime: new Date().getTime(),
          creator: gitAccount.username,
        },
      });
      setVisible(false);
      setComfirm(false);
      await dispatch({
        type: 'sqlController/initPatch',
      });
      if (!result) {
        return;
      }
      await dispatch({
        type: 'sqlController/getPatchList',
      });
    });
  };

  const onDelete = () => {
    const newpatchItems = lodash.differenceWith(
      tempDataPatch?.patch?.patchItems,
      selectItem,
      lodash.isEqual
    );
    dispatch({
      type: 'sqlController/savePatch',
      payload: {
        changedFields: {
          patchItems: newpatchItems,
        },
      },
    });
  };
  return (
    <>
      <ModalWarnMessage
        ref={ref}
        visible={visible}
        width={1200}
        onCancel={() => {
          setComfirm(false);
          setVisible(false);
        }}
        onOk={onOk}
        okText="OK"
        closable={false}
        className={styles.patchModal}
        cancelText="Cancel"
        hiddenExtraText
        confirmLoading={loading}
        cancelButtonProps={{ disabled: loading }}
        maskClosable={false}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        <Form>
          <Row type="flex" gutter={16}>
            <Col span={12}>
              <FormItemInput
                form={form}
                formName="patchName"
                disabled={type !== 'add' || disabled}
                labelId="Patch Name"
                required
              />
            </Col>
            <Col span={12}>
              <FormItemInput
                form={form}
                formName="jiraNum"
                labelId="Jira Num "
                required
                disabled={disabled}
              />
            </Col>
          </Row>
          <Row type="flex" gutter={16}>
            <Col span={24}>
              <FormItemInput
                form={form}
                formName="message"
                labelId="Message"
                required
                disabled={disabled}
              />
            </Col>
          </Row>
        </Form>
        {!disabled && (
          <div className={styles.button}>
            <div className={styles.buttonAlpha}>
              {comfirm && lodash.isEmpty(tempDataPatch.patch?.patchItems) && (
                <Tooltip title="At least one of Data Patch.">
                  <Icon component={ErrorSvg} className={styles.alphaIcon} />
                </Tooltip>
              )}
              <Button
                onClick={() => {
                  setItemVisible(true);
                  setSelfType('add');
                }}
                type="primary"
                icon="plus"
                disabled={loading}
              >
                Data Patch
              </Button>
            </div>

            <Button type="primary" icon="delete" onClick={onDelete} disabled={loading}>
              Data Patch
            </Button>
          </div>
        )}

        <ExpandedRow
          editable={true}
          data={tempDataPatch?.patch?.patchItems}
          setSelectItem={setSelectItem}
          setType={setSelfType}
          setIndex={setIndex}
          setVisible={setItemVisible}
        />
      </ModalWarnMessage>
      <PatchItemModal
        type={selfType}
        index={index}
        patchItems={tempDataPatch?.patch?.patchItems}
        visible={itemVisible}
        setVisible={setItemVisible}
      />
    </>
  );
}

export default connect(({ sqlController, loading }: any) => ({
  tempDataPatch: sqlController?.tempDataPatch,
  gitAccount: sqlController?.gitAccount,
  loading: loading.effects['sqlController/updateChildPatch'],
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      dispatch({ type: 'sqlController/savePatch', payload: { changedFields } });
    },
    mapPropsToFields(props: any) {
      const { tempDataPatch } = props;
      const { patch } = tempDataPatch;
      return formUtils.mapObjectToFields(patch);
    },
  })(PatchModal)
);
