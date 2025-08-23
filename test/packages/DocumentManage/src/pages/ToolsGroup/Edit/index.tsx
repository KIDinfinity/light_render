import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { v4 as uuid }  from 'uuid';
import { Form, Button } from 'antd';
import { withContextData } from '@/components/_store';
import { messageModal } from '@/utils/commonMessage';
import { useDispatch, useSelector, connect } from 'dva';
import DataLayout from '@/components/DataLayout';
import type { IFormRegistProps} from '@/components/FormRegistComponent';
import { registForm, unRegistForm } from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { hasChanges, fieldsGenerator } from '../../_functions';
import DocLayout from '../../_components/DocLayout';
import FieldsRender from '../../_components/FieldsRender';
import { EToolModules } from '../../_dto/enums';
import type { DocumentModel, ToolsDataModel, StateModel } from '../../_dto/model';

import styles from './styles.less';

const FORMID = uuid();

export interface IEdit extends IFormRegistProps {
  documentItem?: DocumentModel;
  selectedDocId?: string;
  toolsData?: ToolsDataModel;
  documentEdit?: DocumentModel;
  loading?: boolean;
  withData?: any;
}

const { DataWrap } = DataLayout;

const Edit: FunctionComponent<IEdit> = ({
  documentItem,
  documentEdit,
  form,
  loading,
  withData = {},
}) => {
  const {
    toolsData = {},
    selectedDocId,
    dropdownConfigure,
    fieldConfigure,
    dragging,
  }: StateModel | any = useSelector(({ documentManagement }: any) => ({
    selectedDocId: documentManagement.selectedDocId,
    toolsData: documentManagement.toolsData,
    dropdownConfigure: documentManagement.dropdownConfigure,
    fieldConfigure: documentManagement.fieldConfigure,
    dragging: documentManagement.dragging,
  }));
  const dispatch = useDispatch();
  const { selected } = toolsData?.[EToolModules.edit] || {};
  const editable = !!selectedDocId && selected && !loading;
  let transparentModal: any = null;

  const onModalScroll = (e: any) => {
    const { wheelDelta } = e;
    const {
      documentRef: { current: documentScroll },
    } = withData;
    documentScroll.scrollTop -= wheelDelta;
  };

  const domInserted = () => {
    transparentModal = document.querySelector('.transparentModalMark');
    // eslint-disable-next-line no-unused-expressions
    transparentModal && transparentModal.addEventListener('mousewheel', onModalScroll);
  };

  useEffect(() => {
    registForm(form, FORMID, dispatch);

    const body = document.querySelector('body');
    // eslint-disable-next-line no-unused-expressions
    body && body.addEventListener('DOMNodeInserted', domInserted);

    // 检查联动下拉的值，将配置中的数据同步到当前document
    // checkLinkageFields();
    return () => {
      unRegistForm(form, FORMID, dispatch);
      // eslint-disable-next-line no-unused-expressions
      body && body.removeEventListener('DOMNodeInserted', domInserted);
      // eslint-disable-next-line no-unused-expressions
      transparentModal && transparentModal.removeEventListener('mousewheel', onModalScroll);
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: 'documentManagement/saveDocumentEdit',
      payload: { documentEdit: documentItem },
    });
  }, [documentItem]);

  const handleCancel = () => {
    if (hasChanges(documentItem, formUtils.cleanValidateData(documentEdit))) {
      messageModal(
        {
          typeCode: 'Label_COM_WarningMessage',
          dictCode: 'WRN_000027',
        },
        {
          okFn: () => {
            dispatch({
              type: 'documentManagement/saveDocumentEdit',
              payload: { documentEdit: documentItem },
            });
            dispatch({
              type: 'documentManagement/selectToolItem',
              payload: { toolId: EToolModules.edit },
            });
          },
          cancelFn: () => {},
        }
      );
    } else {
      dispatch({
        type: 'documentManagement/selectToolItem',
        payload: { toolId: EToolModules.edit },
      });
    }

    if (dragging) {
      dispatch({
        type: 'documentManagement/updateDragStatus',
        payload: {
          dragging: false,
        },
      });
    }
  };

  const handleSave = () => {
    const validateTask = new Promise((resolve) => {
      form.validateFields({ force: true }, (errors: any) => {
        if (errors && lodash.isObject(errors)) {
          resolve(lodash.values(errors).map((item: any) => item.errors));
        } else {
          resolve([]);
        }
      });
    });

    validateTask.then((result) => {
      if (!lodash.get(result, 'length')) {
        dispatch({
          type: 'documentManagement/submitUpdateDocument',
        });
      }
    });
  };

  const indexClass = form.getFieldValue('indexClass');
  const formCategory = form.getFieldValue('formCategory');
  const docTypeCode = form.getFieldValue('docTypeCode');

  const fields = fieldConfigure[EToolModules.edit];
  let result = fieldsGenerator(fields, { indexClass, formCategory, dropdownConfigure, form });
  const personalDocInd = lodash.find(
    dropdownConfigure,
    (item) =>
      item.indexClass === indexClass &&
      item.formCategory === formCategory &&
      item.docTypeCode === docTypeCode
  )?.personalDocInd;
  if (!(personalDocInd !== 'NA' && personalDocInd !== null)) {
    result = result.filter((item) => item.formName !== 'clientId');
  }
  return (
    <>
      <DocLayout className={styles.isEditting} selected>
        <FieldsRender fields={result} />
        <DataWrap className={styles.editSaveBtnWrap}>
          <Button
            className={styles.editSaveButton}
            loading={loading}
            type="primary"
            onClick={handleSave}
          >
            {formatMessageApi({ Label_BPM_Button: 'document.update' })}
          </Button>
        </DataWrap>
      </DocLayout>
      <div className={styles.mask} onClick={handleCancel} />
    </>
  );
};

const FormWrapped = Form.create<IEdit>({
  mapPropsToFields(props) {
    const { documentEdit }: any = props;
    return formUtils.mapObjectToFields(documentEdit, {
      receivedDate: (value: any) => (value ? moment(value) : null),
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;

    if (lodash.isFunction(dispatch)) {
      dispatch({
        type: 'documentManagement/saveDocumentEdit',
        payload: { documentEdit: changedFields },
      });
    }
  },
})(withContextData(Edit));

export default connect(({ documentManagement, loading }: any) => ({
  documentEdit: documentManagement.documentEdit,
  loading: loading.effects['documentManagement/submitUpdateDocument'],
}))(FormWrapped);
