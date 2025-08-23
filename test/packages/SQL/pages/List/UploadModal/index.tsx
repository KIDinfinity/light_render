import React, { useRef } from 'react';
import { Upload, Icon, Form } from 'antd';
import { useSelector, useDispatch } from 'dva';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// eslint-disable-next-line import/no-unresolved
import { FormItemCheckboxGroup, FormItemRadioGroup, FormItemSelect } from 'basic/components/Form';
import { FILE_TYPE } from '../../../enum';
import getFileExt from '../../../utils/getFileExt';
import styles from './index.less';

const { Dragger } = Upload;

const UploadModal = ({ form, visible, setVisible, search }: any) => {
  const dispatch = useDispatch();
  const dataSource = useSelector(({ sqlController }: any) => sqlController.dataSource);
  const Region = useSelector(
    ({ dictionaryController }: any) => dictionaryController.DropDown_COM_Region
  );
  const ref: any = useRef();
  const fileError = form.getFieldError('fileList');

  const onOk = () => {
    form.validateFields({ force: true }, async (errors: any, values: any) => {
      if (errors) {
        ref?.current?.hideLoading?.();
        return;
      }
      await dispatch({
        type: 'sqlController/addPageList',
        search,
        payload: {
          ...values,
        },
      });
      setVisible(false);
    });
  };

  return (
    <ModalWarnMessage
      ref={ref}
      visible={visible}
      width={600}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={onOk}
      okText="OK"
      closable={false}
      className={styles.uploadModal}
      cancelText="Cancel"
      hiddenExtraText
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
        {form.getFieldDecorator('fileList', {
          valuePropName: 'fileList',
          getValueFromEvent: (e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          },
          rules: [
            {
              required: true,
              message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
            },
          ],
        })(
          <Dragger
            name="file"
            multiple
            beforeUpload={() => {
              return false;
            }}
            onChange={({ file }: any) => {
              const ext = getFileExt(file?.name);
              if (ext) {
                form.setFields({
                  category: {
                    value: ext,
                    errors: [],
                  },
                });
              }
            }}
            accept=".sql,.xml,.zip"
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            {fileError && (
              <p className={styles.error}>
                {formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })}
              </p>
            )}
          </Dragger>
        )}
        <FormItemRadioGroup
          // required
          dicts={Object.values(FILE_TYPE).map((el) => ({ dictCode: el, dictName: el }))}
          form={form}
          dictName="dictCode"
          formName="category"
          labelId="Category"
        />
        <FormItemCheckboxGroup
          // required
          dicts={Region?.filter((el: any) => el.dictCode !== 'BS')}
          form={form}
          dictName="dictCode"
          formName="regions"
          labelId="Region"
        />
        <FormItemSelect
          required
          form={form}
          formName="dataSource"
          labelId="DataSource"
          dicts={dataSource}
        />
      </Form>
    </ModalWarnMessage>
  );
};

export default Form.create({})(UploadModal);
