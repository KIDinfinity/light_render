import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'dva';
import { Icon, Form, Col, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DocumentScanning/activity.config';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import { registForm, unRegistForm } from '@/components/FormRegistComponent';
import { ReactComponent as Filed } from 'opus/Assets/icon-Filed.svg';
import fieldsGenerator from '../functions/fieldsGenerator';
import type { UploadFileModel, StateModel } from '../_dto/model';
import { EToolModules } from '../_dto/enums';
import classNames from 'classnames';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { FormItemDatePicker, formUtils } from 'basic/components/Form';
import moment from 'moment';
import { withContextData } from '@/components/_store';
import { Region, tenant } from '@/components/Tenant';
import styles from './index.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

export interface IFile extends IFormRegistProps {
  uploadFile?: UploadFileModel;
  selectedDocId?: string;
  withData?: any;
  disabled?: boolean;
  isScanning?: boolean;
  removeUploadFile?: (any) => void;
  progressing?: boolean;
  dropdownConfigure?: any;
  ocrResultList?: any;
}

const File: FunctionComponent<IFile> = (props: IFile) => {
  const { form, uploadFile, disabled = false, ocrResultList } = props;
  const dispatch = useDispatch();
  const { dropdownConfigure, fieldConfigure }: StateModel | any = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => ({
      dropdownConfigure: modelnamepsace.dropdownConfigure,
      fieldConfigure: modelnamepsace.fieldConfigure,
    })
  );

  const FORMID = `${uuidv4()}_DocumentScanning_UploadDocuments`;

  useEffect(() => {
    registForm(form, FORMID, dispatch);
    return () => {
      unRegistForm(form, FORMID, dispatch);
    };
  }, []);

  const removeUploadFileCallback = () => {
    dispatch({
      type: `${NAMESPACE}/removeUploadDocumentsModalUploadFiles`,
      payload: {
        id: uploadFile?.id,
      },
    });
  };

  const fields = fieldConfigure[EToolModules.upload];
  const result = fieldsGenerator(fields, {
    dropdownConfigure,
    disabled,
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

  const format = (() => {
    return tenant.region({
      [Region.JP]: 'YYYY/MM/DD HH:mm:ss',
      notMatch: 'DD/MM/YYYY HH:mm:ss',
    });
  })();

  const error = ocrResultList?.promptMessages?.map((item) =>
    item.code !== 'MSG_COM_WRN'
      ? formatMessageApi({
          Label_COM_ErrorMessage: item?.content || 'Error',
        })
      : void 0
  );

  return (
    <div className={classNames(styles.fileUpload, 'uploadWarp')}>
      <Tooltip title={error?.length && error}>
        <div className={classNames(styles.filedName, { [styles.isFail]: error?.length })}>
          <Icon component={Filed} />
          <span>{uploadFile?.name && form.getFieldValue('name')}</span>
        </div>
      </Tooltip>
      <Row justify="space-between" gutter={[16, 16]} className={styles.fieldWarp}>
        {documentFileId && (
          <Col span={16}>
            <FormItemSelect
              {...documentFileId}
              labelId={formatMessageApi({
                Label_COM_Opus: 'DocumentFormName',
              })}
              required={true}
              getPopupContainer={() => document.querySelector('.uploadWarp') || document.body}
              errorTooltip={true}
              form={form}
            />
          </Col>
        )}
        {receivedDateField && (
          <Col span={7}>
            <FormItemDatePicker
              {...receivedDateField}
              labelId={formatMessageApi({
                Label_COM_Opus: 'ReceiveDateTime',
              })}
              format={format}
              required={true}
              showToday={false}
              errorTooltip={true}
              showTime
              form={form}
            />
          </Col>
        )}
        <Col span={1}>
          <DeleteButton
            type="delete"
            className={styles.delete}
            handleDelete={removeUploadFileCallback}
          />
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
    const { dispatch, uploadFile } = props;

    if (lodash.isFunction(dispatch)) {
      dispatch({
        type: 'documentScanningController/saveFormData',
        target: `${NAMESPACE}/updateUploadDocumentsModalUploadFiles`,
        payload: {
          id: uploadFile?.id,
          updateData: changedFields,
        },
      });
    }
  },
})(withContextData(File));

export default connect(({ documentManagement }: any) => ({
  dropdownConfigure: documentManagement.dropdownConfigure,
}))(FormWrapped);
