import { v4 as uuid4 }  from 'uuid';
import { notification } from 'antd';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import userCenterUserPersonalInfoControllerService from '@/services/userCenterUserPersonalInfoControllerService';
import userCenterUserOrganizationControllerService from '@/services/userCenterUserOrganizationControllerService';
import userCenterUserCertificateControllerService from '@/services/userCenterUserCertificateControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { userPersonInfo, organizationList, userCertificateList, newCertificateTable } = payload;
  const userId = yield select((state) => state.user.currentUser?.userId);

  let newUserPersonInfo = formUtils.cleanValidateData(userPersonInfo);
  const newOrganizationList = formUtils.cleanValidateData(organizationList);

  if (lodash.isEmpty(newUserPersonInfo)) {
    const response = yield call(userCenterUserPersonalInfoControllerService.findByUserId, {
      userId,
    });
    if (response?.success && lodash.isPlainObject(response.resultData)) {
      newUserPersonInfo = response.resultData;
    }
  }
  // 个人信息和组织信息
  if (!newUserPersonInfo?.userId) {
    newUserPersonInfo.userId = userId;
  }

  const personResponse = yield call(
    userCenterUserPersonalInfoControllerService.updateByUserId,
    newUserPersonInfo
  );
  const organizationResponse = yield call(
    userCenterUserOrganizationControllerService.update,
    newOrganizationList
  );

  // 证书信息
  let newCertificateTableList;

  const deleteCertificateResponse = yield call(
    userCenterUserCertificateControllerService.deleteByUserId,
    objectToFormData({ userId })
  );
  if (!deleteCertificateResponse?.success) {
    notification.error({
      message: formatMessageApi({ Label_BIZ_Claim: 'ERR_00app.usermanagement.submit.error' }),
    });

    return deleteCertificateResponse;
  }

  if (
    newCertificateTable?.certificateType?.value &&
    newCertificateTable?.certificateName?.value &&
    newCertificateTable?.certificateResult?.value &&
    newCertificateTable?.obtainingDate?.value
  ) {
    const len = userCertificateList.length;
    const newCertificateItem = {
      ...newCertificateTable,
      id: uuid4(),
      userId,
      positionOrder: len === 0 ? 0 : userCertificateList[len - 1].positionOrder + 1,
    };
    newCertificateTableList = lodash.concat(userCertificateList, newCertificateItem);
  } else {
    newCertificateTableList = lodash.sortBy(userCertificateList, (item) => item.positionOrder);
  }
  const newCertificateFormTable = formUtils.cleanValidateData(newCertificateTableList);

  // 如果有数据的才调添加的接口
  if (newCertificateFormTable.length > 0) {
    const userCertificateResponse = yield call(
      userCenterUserCertificateControllerService.insert,
      newCertificateFormTable
    );
    if (lodash.isPlainObject(userCertificateResponse) && userCertificateResponse.success) {
      yield put({
        type: 'getCertificateList',
      });
      yield put({
        type: 'deleteCertificateOfAddForm',
      });
    } else {
      return userCertificateResponse;
    }
  }

  return personResponse && organizationResponse;
}
