import React, { useMemo } from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Modal as AntModal, Form, Button, Switch } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mapprops from '@/utils/mapprops';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import { getFieldItem } from '../Utils/FormUtils';
import { tranferResult } from '../Utils/Transfer';
import type { DataFieldProps, CurrentMenuProps } from '../Utils/Typings';
import { isVersionTab } from '../Utils/DataVersion';
import { updateCurrentField } from '../Utils/Handle';
import { showErrors, showSuccess } from '../Utils/Common';
import styles from './index.less';

interface ComponentProps extends FormComponentProps {
  form: WrappedFormUtils;
}

function AddEditModal({ form }: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const dataFieldList: DataFieldProps[] = useSelector(
    (state: any) => state.configurationCenter.functionData.dataFieldList
  );
  const showModal: boolean = useSelector((state: any) => state.configurationCenter.showModal);
  const modalType: string = useSelector((state: any) => state.configurationCenter.modalType);
  const currentMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationMenu.currentMenu
  );
  const confirmLoading: boolean = useSelector(
    (state: any) => state.configurationCenter.confirmLoading
  );
  const currentTab: string = useSelector((state: any) => state.configurationCenter.currentTab);
  const isShowImageField: boolean = useSelector(
    (state: any) => state.configurationCenter.isShowImageField
  );
  const { dataImageActive } = currentMenu;
  const disabled = tenant.activeProfile() !== 'presit';

  const onCancel = () => {
    dispatch({
      type: 'configurationCenter/hideModal',
    });
  };
  const onSwitchChange = async (checked: boolean) => {
    await dispatch({
      type: 'configurationCenter/changeImageField',
      payload: {
        isShowImageField: checked,
      },
    });
  };

  const successMessage = useMemo(() => {
    const isAdd = modalType === 'add';
    let message = '';
    if (isAdd && !dataImageActive) {
      message = 'configurationcenter.message.add.success';
    } else if (isAdd && dataImageActive) {
      message = 'configurationcenter.message.add.dataversion.success';
    } else if (!isAdd && !dataImageActive) {
      message = 'configurationcenter.message.update.success';
    } else if (!isAdd && dataImageActive) {
      message = 'configurationcenter.message.update.dataversion.success';
    }
    return formatMessageApi({
      Label_COM_WarningMessage: message,
    });
  }, [modalType, dataImageActive]);

  const onOk = async () => {
    form.validateFields(async (err: any, fieldsValue: any) => {
      if (err) {
        return;
      }
      const confirmDataPatch = await new Promise((r) => {
        if (disabled) {
          return r({ success: false });
        }
        dispatch({
          type: 'configurationCenter/setPromise',
          payload: {
            resolve: r,
          },
        });
      });

      const isAdd = modalType === 'add';
      await dispatch({
        type: 'configurationCenter/changeComfirmLoading',
        payload: {
          confirmLoading: true,
        },
      });
      const result = tranferResult(dataFieldList, { ...fieldsValue }, true);

      const response: any = await dispatch({
        type: `configurationOperation/${isAdd ? 'add' : 'update'}`,
        payload: {
          result,
          confirmDataPatch,
        },
      });
      if (!response || !response.success) {
        showErrors(response.promptMessages);

        dispatch({
          type: 'configurationCenter/changeComfirmLoading',
          payload: {
            confirmLoading: false,
          },
        });
      } else {
        showSuccess(successMessage);
        dispatch({
          type: 'configurationCenter/hideModal',
        });

        /**
         *  1. not in version control, refresh table
         *  2. inControl
         *    (1) update bussiness tab ， updateDataVersion
         *    (2) update version tab,  refresh dataImage table
         */

        if (!dataImageActive) {
          dispatch({
            type: 'configurationCenter/refreshResult',
          });
        }
        if (!isAdd && dataImageActive) {
          if (isVersionTab(currentTab)) {
            dispatch({
              type: 'configurationDataImage/refreshResult',
            });
          } else {
            dispatch({
              type: 'configurationDataImage/updateDataVersions',
              payload: {
                versionData: (response && response.resultData) || [],
              },
            });
          }
        }

        dispatch({
          type: 'configurationCenter/changeComfirmLoading',
          payload: {
            confirmLoading: false,
          },
        });
        form.resetFields();
      }
    });
  };

  const footer = (
    <div className={styles.footer}>
      <div className={styles.imageBox}>
        <span className={styles.showWord}>
          {formatMessageApi({
            Label_BIZ_Claim: 'configurationcenter.menu.Fun_Data_Image',
          })}
        </span>
        <Switch
          checkedChildren="show"
          unCheckedChildren="hide"
          onChange={onSwitchChange}
          checked={isShowImageField}
        />
      </div>
      <Button onClick={onCancel}>
        {formatMessageApi({
          Label_BIZ_Claim: 'form.cancel',
        })}
      </Button>
      <Button type="primary" loading={confirmLoading} onClick={onOk}>
        {formatMessageApi({
          Label_BIZ_Claim: 'form.confirm',
        })}
      </Button>
    </div>
  );

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7, pull: 1 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <AntModal
      title={formatMessageApi({
        Label_BIZ_Claim: modalType === 'add' ? 'form.add' : 'form.edit',
      })}
      visible={showModal}
      width={800}
      footer={footer}
      onCancel={onCancel}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      <Form {...formItemLayout}>{mapprops(getFieldItem(dataFieldList), { form })}</Form>
    </AntModal>
  );
}

export default connect(({ configurationCenter }: any) => ({
  dataFieldList: configurationCenter.functionData.dataFieldList,
  current: configurationCenter.current,
}))(
  Form.create({
    onFieldsChange(props: any, changedValues) {
      const { dataFieldList, dispatch, current } = props;
      const changeField = updateCurrentField(changedValues, dataFieldList);
      dispatch({
        type: 'configurationCenter/updateCurrent',
        payload: {
          current: {
            ...current,
            ...changeField,
            ...changedValues,
          },
          changedValues,
        },
      });
    },
    mapPropsToFields(props) {
      const { current, dataFieldList } = props;
      const result = tranferResult(dataFieldList, current);
      return formUtils.mapObjectToFields({ ...result }, {});
    },
  })(AddEditModal)
);
