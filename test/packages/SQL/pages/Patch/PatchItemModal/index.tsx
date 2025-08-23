/* eslint-disable no-param-reassign */
/* eslint-disable require-atomic-updates */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Form, Row, Col, Upload, Icon, Tooltip } from 'antd';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import {
  FormItemInput,
  formUtils,
  FormItemSelect,
  FormItemRadioGroup,
} from 'basic/components/Form';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import Content from '../Content';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getFileMD5 from '../../../utils/getFileMD5';
import { PATCH_TYPE, PATCH_TYPE_NAME } from '../../../enum';
import styles from './index.less';

const { Dragger } = Upload;

function PatchItemModal({ index, patchItems = [], form, visible, setVisible, type = 'add' }: any) {
  const dispatch = useDispatch();
  const Region = useSelector(
    ({ dictionaryController }: any) => dictionaryController.DropDown_COM_Region
  );
  const loading = useSelector((state: any) => state.loading.effects['sqlController/uploadSQLFile']);
  const [inputSQL, setInputSQL] = useState('');
  const [comfirm, setComfirm] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const disabled = tenant.activeProfile() !== 'presit';

  const ref: any = useRef();

  const savePathFn = {
    add: (items: any, formData: any) => {
      return {
        patchItems: [...items, formData],
      };
    },
    update: (items: any, formData: any) => {
      const newPatchItem = lodash.cloneDeep(items);
      const item = { ...newPatchItem[index], ...formData };

      if (item.type === 'INPUT') {
        delete item.checksum;
      }

      if (item.type === 'IMPORT') {
        delete item.fileList;
        delete item.sql;
      }

      newPatchItem.splice(index, 1, item);
      return {
        patchItems: newPatchItem,
      };
    },
    INPUT: (formData: any) => {
      formData.sql = inputSQL;
      return formData;
    },
    IMPORT: async (formData: any) => {
      const checksum = await Promise.resolve(getFileMD5(formData.fileList[0].originFileObj));
      formData.checksum = checksum;
      return formData;
    },
  };

  const Environment = [
    { dictCode: 'presit', dictName: 'presit' },
    { dictCode: 'sit', dictName: 'sit' },
    { dictCode: 'uat', dictName: 'uat' },
    { dictCode: 'dev', dictName: 'dev' },
  ];

  const onOk = () => {
    if (disabled) {
      setComfirm(false);
      setVisible(false);
      return;
    }

    if (loading) {
      ref?.current?.hideLoading?.();
      return;
    }
    setComfirm(true);

    form.validateFields({ force: true }, async (error: any, values: any) => {
      if (error || (lodash.isEmpty(values?.fileList) && lodash.isEmpty(inputSQL))) {
        ref?.current?.hideLoading?.();
        return;
      }
      const formData = await savePathFn[values.type]?.(lodash.cloneDeep(values));

      const changedFields = savePathFn[type]?.(patchItems, formData);

      await dispatch({ type: 'sqlController/savePatch', payload: { changedFields } });

      setComfirm(false);
      setVisible(false);
    });
  };
  const fileError = form.getFieldError('fileList');
  const patchItemType = form.getFieldValue('type');

  const getValueFromEvent = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    if (e.fileList.length > 1) {
      return [e.fileList[0]];
    }

    if (e.fileList.length === 0) {
      return [];
    }

    const ext = e.file.name.match(/(?<=\.)([0-9a-zA-Z]+)$/gi)?.[0] || '';

    if (!/(sql)|(xml)|(zip)/i.test(ext)) {
      e.fileList.pop();
    }
    return e && e.fileList;
  };

  const draggerChange = async (e: any) => {
    const ext = e.file.name.match(/(?<=\.)([0-9a-zA-Z]+)$/gi)?.[0] || '';

    if (e.fileList.length > 1 || e.fileList.length === 0 || !/(sql)|(xml)|(zip)/i.test(ext)) {
      return;
    }

    const checksum = await getFileMD5(e.file);
    const result = await dispatch({
      type: 'sqlController/uploadSQLFile',
      payload: { file: e.file, checksum },
    });

    setUploadError('');

    if (!result) {
      setUploadError('Upload error!');
      form.setFieldsValue({ fileList: [] });
    }
  };

  useEffect(() => {
    async function t() {
      const result: string = await dispatch({
        type: 'sqlController/getFileToSQL',
        payload: { itemName: patchItems[index].itemFileName },
      });
      setInputSQL(result);
    }

    if (visible && type === 'update' && patchItems[index].type === 'INPUT') {
      setInputSQL(patchItems[index].sql);
    }

    if (visible && type === 'update' && patchItems[index]?.itemFileName) {
      t();
    }

    if (!visible) {
      setInputSQL('');
    }
  }, [visible]);

  return (
    <ModalWarnMessage
      ref={ref}
      visible={visible}
      width={800}
      onCancel={() => {
        setComfirm(false);
        setVisible(false);
      }}
      onOk={onOk}
      okText="OK"
      closable={false}
      className={styles.addModal}
      cancelText="Cancel"
      hiddenExtraText
      maskClosable={false}
      cancelButtonProps={{ disabled: loading }}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      <Form>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <FormItemInput
              form={form}
              formName="patchItemName"
              disabled={type !== 'add' || disabled}
              labelId="Patch Item Name"
              required
            />
          </Col>
          <Col span={12}>
            <FormItemInput
              form={form}
              formName="targetDataSource"
              labelId="Data Source"
              required
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <FormItemSelect
              mode="multiple"
              form={form}
              formName="environments"
              labelId="Environments"
              required
              dicts={Environment}
              disabled={disabled}
            />
          </Col>
          <Col span={12}>
            <FormItemSelect
              form={form}
              mode="multiple"
              formName="regions"
              labelId="Regions"
              required
              dicts={Region}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={16}>
          <Col span={24}>
            <div className={styles.buttonAlpha}>
              {comfirm &&
                lodash.isEmpty(form.getFieldValue('fileList')) &&
                lodash.isEmpty(inputSQL) && (
                  <Tooltip title="At least one of Data Patch.">
                    <Icon component={ErrorSvg} className={styles.alphaIcon} />
                  </Tooltip>
                )}
              <FormItemRadioGroup
                dicts={Object.values(PATCH_TYPE).map((el) => ({
                  dictCode: el,
                  dictName: PATCH_TYPE_NAME?.[el],
                }))}
                form={form}
                formName="type"
                labelId="Patch Item Type"
                required
                disabled={disabled || type === 'update'}
              />
            </div>
          </Col>
        </Row>
        {patchItemType === PATCH_TYPE.IMPORT &&
          form.getFieldDecorator('fileList', {
            valuePropName: 'fileList',
            getValueFromEvent,
            rules: [
              {
                required: true,
                message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
              },
            ],
          })(
            <Dragger
              disabled={loading || disabled}
              name="file"
              beforeUpload={() => {
                return false;
              }}
              onChange={draggerChange}
              accept=".sql,.xml,.zip"
            >
              <div className={styles.loadingBox}>
                {loading && <Icon type="loading" className={styles.loading} />}
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </div>

              {fileError && (
                <p className={styles.error}>
                  {formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })}
                </p>
              )}
              {uploadError && <p className={styles.error}>{uploadError}</p>}
            </Dragger>
          )}
        {patchItemType === PATCH_TYPE.INPUT && (
          <Content onChange={setInputSQL} disabled={disabled} value={inputSQL} />
        )}
      </Form>
    </ModalWarnMessage>
  );
}

export default Form.create({
  mapPropsToFields(props: any) {
    const { patchItems = [], index, type } = props;
    return formUtils.mapObjectToFields(
      type === 'add' ? {} : { ...patchItems?.[index], type: PATCH_TYPE.INPUT } || {}
    );
  },
})(PatchItemModal);
