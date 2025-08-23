import { File } from 'documentManage/pages/ToolsGroup/Upload/File';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import type { IFile } from 'documentManage/pages/ToolsGroup/Upload/File';
import moment from 'moment';
import { connect } from 'dva';
import { withContextData } from '@/components/_store';

const FormWrapped = Form.create<IFile>({
  mapPropsToFields(props) {
    const { uploadFile } = props;
    return formUtils.mapObjectToFields(uploadFile, {
      receivedDate: (value: any) => (value ? moment(value) : null),
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, uploadFile, sectionIndex } = props;
    dispatch({
      type: 'batchDocumentScanningController/saveEntry',
      target: 'saveDocumentInfo',
      payload: {
        sectionIndex,
        documentInfo: changedFields,
        uploadFile,
      },
    });
  },
})(withContextData(File));

export default connect()(FormWrapped);
