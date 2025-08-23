import React from 'react';
import lodash from 'lodash';
import { history } from 'umi';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Button, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SS, SSKey } from '@/utils/cache';
import { formUtils } from 'basic/components/Form';
import useRenderModelPosition from '../../_hooks/useRenderModelPosition';
import useHandleSaveCustomization from '../../_hooks/useHandleSaveCustomization';
import styles from './Tabs.less';
import classnames from 'classnames';

export default ({
  model,
  switchLi = [
    {
      name: 'basicInfo',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.usermanagement.basicInfo.basic-info',
      }),
    },
    {
      name: 'permission',
      title: formatMessageApi({
        Label_COM_General: 'Permission',
      }),
    },
    {
      name: 'customization',
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.usermanagement.customization.title',
      }),
    },
  ],
}) => {
  const dispatch = useDispatch();
  const handleClick = (item: any, idx: any) => {
    dispatch({
      type: 'userManagement/changeSwitch',
      payload: {
        switchIdx: idx,
        name: item.name,
      },
    });
    SS.setItem(SSKey.UserManagement_Tab, item.name);
    history.replace(`/navigator/user/management/${item.name}`);
  };
  const {
    isShowPermission,
    getUserManagement,
    originUserManagement,
    userCertificateList,
    originUserCertificateList,
    newCertificateTable,
    isShowAddForm,
    activeMode,
    originActiveMode,
    activeLanguage,
    originActiveLanguage,
    activeTheme,
    originActiveTheme,
    selectedFolder,
    originSelectedFolder,
    loadingSave,
    isRequired,
    forms,
  }: any = useSelector(
    (state: any) => ({
      switchIdx: state.userManagement.switchIdx,
      isShowCustomization: state.userManagement.isShow.isShowCustomization,
      isShowPermission: state.userManagement.isShow.isShowPermission,
      isShowBasic: state.userManagement.isShow.isShowBasic,
      isRequired: state.userManagement.isRequired,
      getUserManagement: state.userManagement.getUserManagement,
      originUserManagement: state.userManagement.originUserManagement,
      userCertificateList: state.userManagement.getUserManagement.userCertificateList,
      originUserCertificateList: state.userManagement.getUserManagement.originUserCertificateList,
      newCertificateTable: state.userManagement.newCertificateTable,
      isShowAddForm: state.userManagement.isShowAddForm,
      forms: state.userManagement.forms,
      activeMode: state.mode.activeMode,
      originActiveMode: state.mode.originActiveMode,
      activeLanguage: state.language.activeLanguage,
      originActiveLanguage: state.language.originActiveLanguage,
      activeTheme: state.theme.activeTheme,
      originActiveTheme: state.theme.originActiveTheme,
      selectedFolder: state.taskFolder.selectedFolder,
      originSelectedFolder: state.taskFolder.originSelectedFolder,
      loadingSave: state.loading.effects['userManagement/saveUserManagementBasicInfo'],
    }),
    shallowEqual
  );

  const renderModelPosition = useRenderModelPosition(model);
  const handleSaveCustomization = useHandleSaveCustomization(model);

  const getUserManagementList = lodash.map(
    formUtils.cleanValidateData(getUserManagement.userPersonInfo),
    (item) => lodash.toString(item)
  );
  const originUserManagementList = lodash.map(
    formUtils.cleanValidateData(originUserManagement.userPersonInfo),
    (item) => lodash.toString(item)
  );

  const skillTypeList = getUserManagement?.skillSet?.skillTypeList;
  const originSkillTypeList = originUserManagement?.skillSet?.skillTypeList;

  const isShowUserCertificateList = lodash.isEmpty(userCertificateList)
    ? lodash.isEqual(userCertificateList, originUserCertificateList)
    : isShowAddForm || lodash.isEqual(userCertificateList, originUserCertificateList);

  const userPersonInfo = lodash.get(getUserManagement, 'userPersonInfo');
  let validate = true;
  lodash.some(userPersonInfo, (item) => {
    if (!lodash.isEmpty(item?.errors)) {
      validate = false;
    }
  });

  const disabled =
    (lodash.isEqual(getUserManagementList, originUserManagementList) &&
      lodash.isEqual(skillTypeList, originSkillTypeList) &&
      isShowUserCertificateList &&
      Object.keys(newCertificateTable).length < 4 &&
      activeMode === originActiveMode &&
      activeLanguage === originActiveLanguage &&
      activeTheme === originActiveTheme &&
      lodash.isEqual(selectedFolder, originSelectedFolder)) ||
    !validate;
  const handleSaveBaseInfo = async () => {
    const submitData = { ...getUserManagement };
    let validateSuccess = true;

    lodash.map(lodash.values(forms), (form) => {
      form.validateFields((errors: any) => {
        if (errors) {
          validateSuccess = false;
        }
      });

      return form;
    });

    if (validateSuccess) {
      const response = await dispatch({
        type: 'userManagement/saveUserManagementBasicInfo',
        payload: {
          ...submitData,
          newCertificateTable,
          isRequired,
        },
      });

      if (response?.success) {
        notification.success({
          message: formatMessageApi({ Label_BIZ_Claim: 'app.usermanagement.submit.success' }),
        });
      } else {
        notification.error({
          message: formatMessageApi({ Label_BIZ_Claim: 'app.usermanagement.submit.error' }),
        });
      }
    }
  };
  return (
    <div className={styles.menu}>
      <div className={styles.title}>{formatMessageApi({ Label_COM_General: 'User' })}</div>
      <ul>
        {lodash.map(switchLi, (item: any, index: any) => (
          <li
            key={item.name}
            onClick={() => {
              handleClick(item, index);
            }}
            className={renderModelPosition === index ? styles.active : ''}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {!isShowPermission && (
        <Button
          type="primary"
          icon="save"
          className={classnames(styles.saveButton, 'guidance-theme-five')}
          loading={loadingSave}
          onClick={
            (model && model.toLowerCase() === 'basicinfo') || lodash.isNil(model)
              ? handleSaveBaseInfo
              : handleSaveCustomization
          }
          disabled={disabled}
        >
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.hander.save',
          })}
        </Button>
      )}
    </div>
  );
};
