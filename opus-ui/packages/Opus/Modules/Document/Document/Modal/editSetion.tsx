import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { withContextData } from '@/components/_store';
import { useDispatch, useSelector, connect } from 'dva';
import type { IFormRegistProps} from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fieldsGenerator } from '../../_functions';
import { EToolModules } from '../../_dto/enums';
import type { DocumentModel, ToolsDataModel, StateModel } from '../../_dto/model';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import styles from './index.less';
import classNames from 'classnames';

export interface IEdit extends IFormRegistProps {
  documentItem?: DocumentModel;
  selectedDocId?: string;
  toolsData?: ToolsDataModel;
  documentEdit?: DocumentModel;
  loading?: boolean;
  withData?: any;
}

const Edit: FunctionComponent<IEdit> = ({ documentItem, form }) => {
  const { dropdownConfigure, fieldConfigure }: StateModel | any = useSelector(
    ({ documentManagement }: any) => ({
      dropdownConfigure: documentManagement.dropdownConfigure,
      fieldConfigure: documentManagement.fieldConfigure,
    })
  );
  const dispatch = useDispatch();
  // let transparentModal: any = null;

  // const onModalScroll = (e: any) => {
  //   const { wheelDelta } = e;
  //   const {
  //     documentRef: { current: documentScroll },
  //   } = withData;
  //   documentScroll.scrollTop -= wheelDelta;
  // };

  // const domInserted = () => {
  //   transparentModal = document.querySelector('.transparentModalMark');
  //   // eslint-disable-next-line no-unused-expressions
  //   transparentModal && transparentModal.addEventListener('mousewheel', onModalScroll);
  // };

  // useEffect(() => {
  //   registForm(form, FORMID, dispatch);

  //   const body = document.querySelector('body');
  //   // eslint-disable-next-line no-unused-expressions
  //   body && body.addEventListener('DOMNodeInserted', domInserted);

  //   // 检查联动下拉的值，将配置中的数据同步到当前document
  //   // checkLinkageFields();
  //   return () => {
  //     unRegistForm(form, FORMID, dispatch);
  //     // eslint-disable-next-line no-unused-expressions
  //     body && body.removeEventListener('DOMNodeInserted', domInserted);
  //     // eslint-disable-next-line no-unused-expressions
  //     transparentModal && transparentModal.removeEventListener('mousewheel', onModalScroll);
  //   };
  // }, []);

  useEffect(() => {
    dispatch({
      type: 'documentManagement/saveDocumentEdit',
      payload: { documentEdit: documentItem },
    });
  }, [documentItem]);

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
  const { documentFileId, nameField }: any = (() => {
    return {
      documentFileId: {
        ...lodash.find(result, (item) => item.formName === 'docTypeCode'),
        formName: 'documentFileId',
      },
      nameField: lodash.find(result, (item) => item.formName === 'name'),
    };
  })();

  return (
    <div className={classNames(styles.editWarp, 'docEditWarp')}>
      <FormItemInput
        {...nameField}
        labelId={formatMessageApi({
          Label_COM_Opus: 'documentFileName',
        })}
        required={false}
      />
      <FormItemSelect
        {...documentFileId}
        labelId={formatMessageApi({
          Label_COM_Opus: 'DocumentFormName',
        })}
        getPopupContainer={() => document.querySelector('.docEditWarp') || document.body}
        required={false}
      />
    </div>
  );
};

const FormWrapped = Form.create<IEdit>({
  mapPropsToFields(props) {
    const { documentEdit, dropdownConfigure }: any = props;
    const documentFileId = lodash
      .chain(dropdownConfigure)
      .find(
        (item) =>
          item.docTypeCode === documentEdit.docTypeCode &&
          item.externalDocTypeCode === documentEdit.externalDocTypeCode
      )
      .get('id')
      .value();
    return formUtils.mapObjectToFields({
      ...documentEdit,
      documentFileId,
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
  dropdownConfigure: documentManagement.dropdownConfigure,
  documentEdit: documentManagement.documentEdit,
  loading: loading.effects['documentManagement/submitUpdateDocument'],
}))(FormWrapped);
