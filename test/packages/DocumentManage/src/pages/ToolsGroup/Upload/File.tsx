import type { FunctionComponent } from 'react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector, connect } from 'dva';
import { Icon, Form } from 'antd';
import { v4 as uuid }  from 'uuid';
import lodash from 'lodash';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import { registForm, unRegistForm } from '@/components/FormRegistComponent';
import DataLayout from '@/components/DataLayout';
import DocLayout from '../../_components/DocLayout';
import Progress from '../../_components/Progress';
import { fieldsGenerator, validators } from '../../_functions';
import type { UploadFileModel, StateModel } from '../../_dto/model';
import FieldsRender from '../../_components/FieldsRender';
import { EToolModules } from '../../_dto/enums';
import { limitFileSize } from './configs';
import styles from './styles.less';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { withContextData } from '@/components/_store';

export interface IFile extends IFormRegistProps {
  uploadFile?: UploadFileModel;
  selectedDocId?: string;
  withData?: any;
  disabled?: boolean;
  isScanning?: boolean;
  removeUploadFile?: (any) => void;
  progressing?: boolean;
}

const { DataWrap, DataItem } = DataLayout;

const File: FunctionComponent<IFile> = (props: IFile) => {
  const {
    form,
    uploadFile,
    withData,
    disabled = false,
    removeUploadFile,
    progressing = false,
  } = props;
  const dispatch = useDispatch();
  const {
    dropdownConfigure,
    uploading,
    eloading,
    fieldConfigure,
    businessNo,
    clientObject,
  }: StateModel | any = useSelector(({ documentManagement, loading }: any) => ({
    dropdownConfigure: documentManagement.dropdownConfigure,
    eloading: loading.effects['documentManagement/submitUploadFiles'],
    uploading: documentManagement.uploading,
    fieldConfigure: documentManagement.fieldConfigure,
    businessNo: documentManagement.caseInfo.businessNo,
    clientObject: documentManagement.clientObject,
  }));

  const FORMID = uuid();
  const {
    documentRef: { current: container },
  } = withData;

  const inputRef = useRef();

  const validateFile = async () => {
    return new Promise((resolve) => {
      form.validateFields(
        ['name'],
        {
          force: false,
          scroll: {
            // @ts-ignore
            source: inputRef.current,
            container,
            alignWithLeft: true,
            alignWithTop: true,
            offsetLeft: 10,
          },
        },
        (errors: any) => {
          if (errors && lodash.isObject(errors)) {
            resolve(lodash.values(errors).map((item: any) => item.errors));
          } else {
            resolve([]);
          }
        }
      );
    }).then((result) => {
      if (lodash.get(result, 'length')) {
        dispatch({
          type: 'documentManagement/saveUploadStatus',
          payload: {
            uploading: false,
          },
        });
        console.warn(`file size exceed:${result}`);
      }
    });
  };

  useEffect(() => {
    registForm(form, FORMID, dispatch);
    // 挂载后立即校验
    validateFile();

    return () => {
      unRegistForm(form, FORMID, dispatch);
    };
  }, []);

  const removeUploadFileCallback = () => {
    if (lodash.isFunction(removeUploadFile)) {
      removeUploadFile(uploadFile);
    } else {
      dispatch({
        type: 'documentManagement/removeUploadedFile',
        payload: {
          uploadFiles: [uploadFile],
        },
      });
    }
  };

  const indexClass = form.getFieldValue('indexClass');
  const formCategory = form.getFieldValue('formCategory');
  const docTypeCode = form.getFieldValue('docTypeCode');

  const { VLD_000310 } = validators;
  const personalDocInd = lodash.find(
    dropdownConfigure,
    (item) =>
      item.indexClass === indexClass &&
      item.formCategory === formCategory &&
      item.docTypeCode === docTypeCode
  )?.personalDocInd;

  useEffect(() => {
    if (personalDocInd !== undefined) {
      dispatch({
        type: 'documentManagement/getClientList',
        payload: {
          personalDocInd,
          applicationNo: businessNo,
        },
      });
    }
  }, [personalDocInd]);

  const InputName = (
    <div
      ref={(ref) => {
        // @ts-ignore
        inputRef.current = ref;
      }}
    >
      <FormItemInput
        form={form}
        formName="name"
        labelId=" "
        disabled={disabled}
        rules={[
          {
            validator: VLD_000310(uploadFile?.file?.size || 0, limitFileSize),
          },
        ]}
      />
    </div>
  );
  const DScompanyCode = useSelector(({ processTask }: any) => processTask.getTask.companyCode);
  const DMcompanyCode = useSelector(
    ({ documentManagement }: any) => documentManagement.caseInfo.companyCode
  );

  const fields = fieldConfigure[EToolModules.upload];
  const result = fieldsGenerator(fields, {
    indexClass,
    formCategory,
    dropdownConfigure,
    form,
    disabled,
    DScompanyCode,
    DMcompanyCode,
    clietList: clientObject?.[personalDocInd] || [],
    personalDocInd,
  });

  return (
    <div className={classNames(styles.fileUpload, 'card3BgColor')}>
      {!disabled && (
        <DataWrap className={styles.uploadFileCloseWrap}>
          <Icon
            type="close"
            className={styles.uploadFileClose}
            onClick={removeUploadFileCallback}
          />
        </DataWrap>
      )}
      <DocLayout className={styles.uploadFileDocument}>
        <FieldsRender fields={result} excludes={['name']} />
        <DataLayout className={styles.uploadProgressWrap}>
          <DataWrap span={2} className={styles.uploadFileIcon}>
            <Icon type="file-text" />
          </DataWrap>
          <DataWrap span={22}>
            <DataItem title={InputName} className={styles.progressWrap}>
              <Progress
                eloading={eloading}
                uploading={uploading}
                image={uploadFile?.image}
                progressing={progressing}
              />
            </DataItem>
          </DataWrap>
        </DataLayout>
      </DocLayout>
    </div>
  );
};

export { File };

const FormWrapped = Form.create<IFile>({
  mapPropsToFields(props) {
    const { uploadFile } = props;
    return formUtils.mapObjectToFields(uploadFile, {
      receivedDate: (value: any) => (value ? moment(value) : null),
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, uploadFile, isScanning = false } = props;

    if (lodash.isFunction(dispatch)) {
      if (isScanning) {
        dispatch({
          type: 'documentScanningController/saveFormData',
          target: 'documentManagement/saveDocumentInfo',
          payload: {
            //@ts-ignore
            id: uploadFile.id,
            changedFields,
            documentInfo: changedFields,
            uploadFile,
          },
        });
        return;
      }
      dispatch({
        type: 'documentManagement/saveDocumentInfo',
        payload: { documentInfo: changedFields, uploadFile },
      });
    }
  },
})(withContextData(File));

export default connect()(FormWrapped);
