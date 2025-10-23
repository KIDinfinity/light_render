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
import { ReactComponent as Filed } from 'packages/Opus/Modules/Document/_static/icon-Filed.svg';
import { ReactComponent as Del } from 'packages/Opus/Assets/icon-delete.svg';
import type { UploadFileModel, StateModel } from 'packages/Opus/Modules/Document/_dto/model';
import { EErrorResCodes } from 'packages/Opus/Modules/Document/_dto/enums';
import styles from 'packages/Opus/Modules/Document/Document/Modal/index.less';
import classNames from 'classnames';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { withContextData } from '@/components/_store';
import { NAMESPACE } from '../../activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

interface IuploadFilesStatus {
  state: string;
  docDataId: string;
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
  const { form, uploadFile, uploadFilesStatus } = props;
  const dispatch = useDispatch();
  const { dropdownConfigure, businessNo }: StateModel | any = useSelector(
    ({ dataEntry, loading, dictionaryController, processTask }: any) => ({
      dropdownConfigure: dataEntry.dropdownConfigure,
      //loading: loading.effects['documentManagement/submitUploadFiles'],
      uploading: dataEntry.uploading,
      fieldConfigure: dataEntry.fieldConfigure,
      businessNo: dataEntry?.caseInfo?.businessNo,
      clientObject: dataEntry.clientObject,
      Dropdown_CFG_DocumentType: lodash.get(
        dictionaryController,
        'Dropdown_DataEntry_DocumentType'
      ),
      dataEntry,
      processTask,
      dictionaryController,
    })
  );

  const dict = getDrowDownList('Dropdown_DataEntry_DocumentType');
  const FORMID = `${uuidv4()}_UploadDocuments`;

  useEffect(() => {
    registForm(form, FORMID, dispatch);
    return () => {
      unRegistForm(form, FORMID, dispatch);
    };
  }, []);

  const removeUploadFileCallback = () => {
    dispatch({
      type: `${NAMESPACE}/removeUploadedFile`,
      payload: { uploadFiles: [uploadFile] },
    });
  };

  const indexClass = form.getFieldValue('indexClass');
  const formCategory = form.getFieldValue('formCategory');
  const docTypeCode = form.getFieldValue('docTypeCode');

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
        type: `${NAMESPACE}/getClientList`,
        payload: { personalDocInd, applicationNo: businessNo },
      });
    }
  }, [personalDocInd]);

  const { documentFileId }: any = (() => {
    return {
      documentFileId: {
        labelId: 'document.label.docTypeCode',
        dicts: dict,
        disabled: false,
        //formName: 'documentFileId',
        formName: 'docTypeCode',
        form,
      },
    };
  })();

  const { code } = lodash.get(uploadFile, 'promptMessages', { type: null, code: null });
  const statusImage = uploadFilesStatus?.[uploadFile?.fileId];

  return (
    <div className={classNames(styles.fileUpload, 'uploadWarp')}>
      <Tooltip title={formatMessageApi({ Label_COM_ErrorMessage: code })}>
        <div
          className={classNames(styles.filedName, {
            [styles.isFail]:
              uploadFile?.isFail ||
              ((statusImage?.status === 'done' || statusImage?.status === 'error') &&
                (!statusImage?.docDataId ||
                  statusImage?.docDataId === EErrorResCodes.uploadFailed)),
          })}
        >
          <Icon component={Filed} />
          <span>{uploadFile?.name && form.getFieldValue('name')}</span>
        </div>
      </Tooltip>

      <Row justify="space-between" gutter={[16, 16]} className={styles.fieldWarp}>
        {documentFileId && (
          <Col span={10}>
            <FormItemSelect
              {...documentFileId}
              labelId={formatMessageApi({ Label_COM_Opus: 'DocumentFormName' })}
              required={true}
              errorTooltip={true}
            />
          </Col>
        )}
        <Col span={1}>
          <Icon component={Del} className={styles.delete} onClick={removeUploadFileCallback} />
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
          type: `${NAMESPACE}/saveDocumentInfo`,
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
        type: `${NAMESPACE}/saveDocumentInfo`,
        payload: { documentInfo: changedFields, uploadFile },
      });
    }
  },
})(withContextData(File));

export default connect(({ dataEntry }: any) => ({
  dropdownConfigure: dataEntry.dropdownConfigure,
}))(FormWrapped);
