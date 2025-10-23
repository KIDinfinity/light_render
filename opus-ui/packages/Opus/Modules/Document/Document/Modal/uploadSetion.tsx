import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'dva';
import { Icon, Form, Col, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import { registForm, unRegistForm } from '@/components/FormRegistComponent';
import { ReactComponent as Filed } from '../../_static/icon-Filed.svg';
import { ReactComponent as Del } from "packages/Opus/Assets/icon-delete.svg";
import { fieldsGenerator } from '../../_functions';
import type { UploadFileModel, StateModel } from '../../_dto/model';
import { EToolModules, EErrorResCodes } from '../../_dto/enums';
import styles from './index.less';
import classNames from 'classnames';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { FormItemDatePicker, formUtils } from 'basic/components/Form';
import moment from 'moment';
import { withContextData } from '@/components/_store';
import { Region, tenant } from '@/components/Tenant';

interface IuploadFilesStatus {
  state: string;
  image: string;
}
export interface IFile extends IFormRegistProps {
  uploadFile?: UploadFileModel;
  selectedDocId?: string;
  withData?: any;
  disabled?: boolean;
  isScanning?: boolean;
  removeUploadFile?: (any) => void;
  progressing?: boolean;
  dropdownConfigure?: any;
  uploadFilesStatus: IuploadFilesStatus;
}

const File: FunctionComponent<IFile> = (props: IFile) => {
  const {
    form,
    uploadFile,
    withData,
    disabled = false,
    progressing = false,
    uploadFilesStatus,
  } = props;
  const dispatch = useDispatch();
  const {
    dropdownConfigure,
    uploading,
    loading,
    fieldConfigure,
    businessNo,
    clientObject,
  }: StateModel | any = useSelector(({ documentManagement, loading }: any) => ({
    dropdownConfigure: documentManagement.dropdownConfigure,
    loading: loading.effects['documentManagement/submitUploadFiles'],
    uploading: documentManagement.uploading,
    fieldConfigure: documentManagement.fieldConfigure,
    businessNo: documentManagement.caseInfo.businessNo,
    clientObject: documentManagement.clientObject,
  }));
  
  const FORMID = `${uuidv4()}_UploadDocuments`;

  useEffect(() => {
    registForm(form, FORMID, dispatch);
    return () => {
      unRegistForm(form, FORMID, dispatch);
    };
  }, []);

  const removeUploadFileCallback = () => {
    dispatch({
      type: 'documentManagement/removeUploadedFile',
      payload: { uploadFiles: [uploadFile] },
    });
  };

  const indexClass = form.getFieldValue('indexClass');
  const formCategory = form.getFieldValue('formCategory');
  const docTypeCode = form.getFieldValue('docTypeCode');

  // const { VLD_000310 } = validators;
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
        payload: { personalDocInd, applicationNo: businessNo },
      });
    }
  }, [personalDocInd]);

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
  const { documentFileId, receivedDateField }: any = (() => {
    return {
      documentFileId: {
        ...lodash.find(result, (item) => item.formName === 'docTypeCode'),
        formName: 'documentFileId',
      },
      receivedDateField: lodash.find(result, (item) => item.formName === 'receivedDate'),
    };
  })();
  
  const { type, code } = lodash.get(uploadFile, 'promptMessages', { type: null, code: null });
  const format = (() => {
    return tenant.region({ [Region.JP]: 'YYYY/MM/DD HH:mm:ss', notMatch: 'DD/MM/YYYY HH:mm:ss' });
  })();
  const statusImage = uploadFilesStatus?.[uploadFile?.fileId];

  return (
    <div className={classNames(styles.fileUpload, 'uploadWarp')}>
      <Tooltip title={formatMessageApi({ Label_COM_ErrorMessage: code })}>
        <div
          className={classNames(styles.filedName, {
            [styles.isFail]:
              uploadFile?.isFail ||
              ((statusImage?.status === 'done' || statusImage?.status === 'error') &&
                (!statusImage?.image || statusImage?.image === EErrorResCodes.uploadFailed)),
          })}
        >
          <Icon component={Filed} />
          <span>{uploadFile?.name && form.getFieldValue('name')}</span>
          {/* {!disabled && (
          <DataWrap className={styles.uploadFileCloseWrap}>
            <Icon
              type="close"
              className={styles.uploadFileClose}
              onClick={removeUploadFileCallback}
            />
          </DataWrap>
        )} */}
        </div>
      </Tooltip>

      <Row justify="space-between" gutter={[16, 16]} className={styles.fieldWarp}>
        {documentFileId && (
          <Col span={16}>
            <FormItemSelect
              {...documentFileId}
              labelId={formatMessageApi({ Label_COM_Opus: 'DocumentFormName' })}
              required={true}
              getPopupContainer={() => document.querySelector('.uploadWarp') || document.body}
              errorTooltip={true}
            />
          </Col>
        )}
        {receivedDateField && (
          <Col span={7}>
            <FormItemDatePicker
              {...receivedDateField}
              labelId={formatMessageApi({ Label_COM_Opus: 'ReceiveDateTime' })}
              format={format}
              required={true}
              showToday={false}
              errorTooltip={true}
              showTime
            />
          </Col>
        )}
        <Col span={1}>
          <Icon component={Del}  className={styles.delete} onClick={removeUploadFileCallback} />
        </Col>
      </Row>
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

export default connect(({ documentManagement }: any) => ({
  dropdownConfigure: documentManagement.dropdownConfigure,
}))(FormWrapped);
