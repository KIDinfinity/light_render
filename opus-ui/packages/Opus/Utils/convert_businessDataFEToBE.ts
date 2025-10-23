import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
function accMul(num1, num2) {
  let m = 0;
  const s1 = num1.toString(),
    s2 = num2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}

const isValidateDataWithSingleValue = (target) => {
  if (
    lodash.isPlainObject(target) &&
    lodash.has(target, 'name') &&
    lodash.has(target, 'value') &&
    (lodash.has(target, 'validating') ||
      lodash.has(target, 'dirty') ||
      lodash.has(target, 'touched'))
  ) {
    return true;
  }
  return false;
};
const filterSetWithValidate = (obj, path, value) => {
  const targetValue = value?.value;
  //有用户操作，且value为undefined || null，将undefined正常set进去
  //其余情况null或undefined按照之前逻辑不会set进去
  if (lodash.isUndefined(targetValue) || lodash.isNull(targetValue)) {
    if (value?.touched) {
      lodash.set(obj, path, targetValue);
      return;
    }
  } else {
    lodash.set(obj, path, targetValue);
  }
};
const filterSet = (obj, path, value) => {
  if (isValidateDataWithSingleValue(value)) {
    filterSetWithValidate(obj, path, value);
    return;
  }
  if (!lodash.isNull(value) && !lodash.isUndefined(value)) {
    if ((lodash.isArray(value) || lodash.isObject(value)) && lodash.isEmpty(value)) {
      return;
    }
    lodash.set(obj, path, value);
  }
};
const defaultGet = (obj, path, defaultValue = undefined) => {
  const value = lodash.get(obj, path, defaultValue);
  const cleanValue = formUtils.queryValue(value);
  if (
    (lodash.isNull(cleanValue) || lodash.isUndefined(cleanValue)) &&
    !lodash.isUndefined(defaultValue)
  ) {
    if (isValidateDataWithSingleValue(value)) {
      return value;
    }
    return defaultValue;
  }
  return cleanValue ? cleanValue : value;
};

const cleanValidateGet = (obj, path, defaultValue = undefined) => {
  const defaultGetValue = defaultGet(obj, path, defaultValue);
  return formUtils.queryValue(defaultGetValue);
};

const newIsEmpty = (data) => {
  const cleanValue = formUtils.queryValue(data);
  if (lodash.isNumber(cleanValue)) {
    return false;
  }
  return lodash.isEmpty(cleanValue);
};
const newIsEmptyStr = (data) => {
  const cleanValue = formUtils.queryValue(data);
  if (cleanValue === '') {
    return false;
  }
  return lodash.isEmpty(cleanValue);
};

function convert_clientFEToBESingle(data, region) {
  const temp = {};
  let response = {};
  let currentAddressIdList = undefined;
  let currentContactIdList = undefined;
  const currentAddressInfoMap: any = {};
  let crtIdList = undefined;
  const origin = lodash.cloneDeep(data);
  //
  if (newIsEmpty(defaultGet(origin, 'requestData.clientInfo.id'))) {
    filterSet(temp, 'field.isNewClient', true);
  }
  //
  if (region === 'PH' || region === 'TH') {
    filterSet(temp, 'field.PH_TH_region', true);
  }
  if (region === 'ID' || region === 'TH') {
    filterSet(temp, 'field.ID_TH_region', true);
  }
  //
  filterSet(
    temp,
    'list.roleListDelete',
    lodash.filter(
      defaultGet(origin, 'requestData.clientInfo.roleList'),
      (item) =>
        !defaultGet(origin, 'requestData.personalInfo.customerRole', []).includes(
          item?.customerRole
        )
    )
  );
  if (
    !!!defaultGet(temp, 'field.isNewClient') ||
    lodash.isNull(defaultGet(temp, 'field.isNewClient'))
  ) {
    filterSet(
      temp,
      'list.customerRoleAdded',
      lodash.filter(
        defaultGet(origin, 'requestData.personalInfo.customerRole'),
        (item) =>
          lodash.isNull(item) ||
          !cleanValidateGet(origin, 'requestData.clientInfo.roleList', [])
            .map((roleitem) => formUtils.queryValue(roleitem?.customerRole))
            .includes(formUtils.queryValue(item))
      )
    );
  }

  //
  if (!!!temp?.field?.isNewClient) {
    response = lodash.cloneDeep(defaultGet(origin, 'requestData.clientInfo'));
  }
  if (
    !newIsEmpty(defaultGet(origin, 'requestData.contactInfoList')) ||
    lodash.isNull(defaultGet(origin, 'requestData.contactInfoList'))
  ) {
    filterSet(response, 'contactInfoList', defaultGet(origin, 'requestData.contactInfoList'));
  }
  filterSet(response, 'ccrClientId', defaultGet(origin, 'requestData.ccrClientId'));
  filterSet(response, 'laClientId', defaultGet(origin, 'requestData.laClientId'));
  filterSet(response, 'newClientFlag', defaultGet(origin, 'requestData.newClientFlag'));
  filterSet(response, 'crtInfoList', defaultGet(origin, 'requestData.crtInfoList'));
  filterSet(response, 'isInterestMhit', defaultGet(origin, 'requestData.isInterestMhit'));
  filterSet(response, 'customerType', defaultGet(origin, 'requestData.personalInfo.customerType'));
  filterSet(response, 'trusteeId', defaultGet(origin, 'requestData.personalInfo.trusteeId'));
  filterSet(response, 'ethnic', defaultGet(origin, 'requestData.personalInfo.ethnic'));
  filterSet(
    response,
    'relationOfProposer',
    defaultGet(origin, 'requestData.personalInfo.relationOfProposer')
  );
  filterSet(response, 'titleOfPep', defaultGet(origin, 'requestData.personalInfo.titleOfPep'));
  filterSet(
    response,
    'fatcaDropdownValue',
    defaultGet(origin, 'requestData.personalInfo.fatcaDropdownValue')
  );
  filterSet(response, 'fatcaDate', defaultGet(origin, 'requestData.personalInfo.fatcaDate'));
  filterSet(response, 'kyc', defaultGet(origin, 'requestData.personalInfo.kyc'));
  filterSet(response, 'kycRemark', defaultGet(origin, 'requestData.personalInfo.kycRemark'));
  filterSet(response, 'name', defaultGet(origin, 'requestData.personalInfo.entityPolicyOwnerName'));
  filterSet(
    response,
    'otherIdType',
    defaultGet(origin, 'requestData.personalInfo.additionalIdentificationType')
  );
  filterSet(
    response,
    'companyRegistrationNumber',
    defaultGet(origin, 'requestData.personalInfo.companyRegistrationNumber')
  );
  filterSet(response, 'title', defaultGet(origin, 'requestData.personalInfo.title'));
  filterSet(response, 'height', defaultGet(origin, 'requestData.personalInfo.height'));
  filterSet(response, 'weight', defaultGet(origin, 'requestData.personalInfo.weight'));
  filterSet(response, 'smokingHabit', defaultGet(origin, 'requestData.personalInfo.smokingHabit'));
  filterSet(response, 'dateOfBirth', defaultGet(origin, 'requestData.personalInfo.dateOfBirth'));
  filterSet(
    response,
    'customerMrgStatus',
    defaultGet(origin, 'requestData.personalInfo.customerMrgStatus')
  );
  filterSet(response, 'gender', defaultGet(origin, 'requestData.personalInfo.gender'));
  filterSet(response, 'bmi', defaultGet(origin, 'requestData.personalInfo.bmi'));
  filterSet(
    response,
    'customerEnFirstName',
    defaultGet(origin, 'requestData.personalInfo.customerEnFirstName')
  );
  filterSet(response, 'name', defaultGet(origin, 'requestData.personalInfo.name'));
  filterSet(
    response,
    'customerEnSurname',
    defaultGet(origin, 'requestData.personalInfo.customerEnSurname')
  );
  filterSet(
    response,
    'customerEnName',
    defaultGet(origin, 'requestData.personalInfo.customerEnName')
  );
  filterSet(response, 'customerAge', defaultGet(origin, 'requestData.personalInfo.customerAge'));
  filterSet(response, 'designation', defaultGet(origin, 'requestData.personalInfo.designation'));
  filterSet(
    response,
    'preferredName',
    defaultGet(origin, 'requestData.personalInfo.preferredName')
  );
  filterSet(response, 'share', defaultGet(origin, 'requestData.personalInfo.share'));
  filterSet(response, 'firstName', defaultGet(origin, 'requestData.personalInfo.firstName'));
  filterSet(response, 'surname', defaultGet(origin, 'requestData.personalInfo.surname'));
  filterSet(
    response,
    'beneficiaryType',
    defaultGet(origin, 'requestData.personalInfo.beneficiaryType')
  );
  filterSet(
    response,
    'beneficiarySeqNum',
    defaultGet(origin, 'requestData.personalInfo.beneficiarySeqNum')
  );
  filterSet(
    response,
    'customerEnMiddleName',
    defaultGet(origin, 'requestData.personalInfo.customerEnMiddleName')
  );
  filterSet(
    response,
    'customerEnExtensionName',
    defaultGet(origin, 'requestData.personalInfo.customerEnExtensionName')
  );
  filterSet(
    response,
    'customerisedTitle',
    defaultGet(origin, 'requestData.personalInfo.customerisedTitle')
  );
  filterSet(response, 'middleName', defaultGet(origin, 'requestData.personalInfo.middleName'));
  filterSet(
    response,
    'extensionName',
    defaultGet(origin, 'requestData.personalInfo.extensionName')
  );
  filterSet(response, 'trusteeName', defaultGet(origin, 'requestData.personalInfo.trusteeName'));
  filterSet(
    response,
    'companyRegistrationOldNo',
    defaultGet(origin, 'requestData.personalInfo.companyRegistrationNoOld')
  );
  filterSet(response, 'religion', defaultGet(origin, 'requestData.personalInfo.religion'));
  filterSet(
    response,
    'dateOfRegistration',
    defaultGet(origin, 'requestData.personalInfo.dateOfRegistration')
  );
  filterSet(
    response,
    'dateOfIncorporation',
    defaultGet(origin, 'requestData.personalInfo.dateOfIncorporation')
  );
  filterSet(
    response,
    'countryOfIncorporation',
    defaultGet(origin, 'requestData.personalInfo.countryOfIncorporation')
  );
  filterSet(response, 'isOcrIdCard', defaultGet(origin, 'requestData.personalInfo.isOcrIdCard'));
  filterSet(
    response,
    'otherIdNumber',
    defaultGet(origin, 'requestData.personalInfo.additionalIdentificationNumber')
  );
  filterSet(
    response,
    'relationOfInsured',
    defaultGet(origin, 'requestData.personalInfo.relationOfInsured')
  );
  filterSet(response, 'race', defaultGet(origin, 'requestData.personalInfo.race'));
  filterSet(
    response,
    'motherMaidenName',
    defaultGet(origin, 'requestData.personalInfo.motherMaidenName')
  );
  filterSet(response, 'identityNo', defaultGet(origin, 'requestData.personalInfo.identityNo'));
  filterSet(response, 'identityType', defaultGet(origin, 'requestData.personalInfo.ctfType'));
  filterSet(response, 'pepFlag', defaultGet(origin, 'requestData.personalInfo.pepFlag'));
  filterSet(
    response,
    'pepAssoicateFlag',
    defaultGet(origin, 'requestData.personalInfo.pepAssoicateFlag')
  );
  filterSet(
    response,
    'relationshipToPep',
    defaultGet(origin, 'requestData.personalInfo.relationshipToPep')
  );
  filterSet(
    response,
    'relationshipWithBeneficiary',
    defaultGet(origin, 'requestData.personalInfo.relationshipWithBeneficiary')
  );
  filterSet(
    response,
    'bankruptcyFlag',
    defaultGet(origin, 'requestData.personalInfo.bankruptcyFlag')
  );
  filterSet(response, 'syncSuccessfully', defaultGet(origin, 'requestData.syncSuccessfully'));
  filterSet(
    response,
    'bankruptcyDate',
    defaultGet(origin, 'requestData.personalInfo.bankruptcyDate')
  );
  filterSet(response, 'id', defaultGet(origin, 'requestData.id'));
  filterSet(response, 'newCrs', defaultGet(origin, 'requestData.newCrs'));
  filterSet(response, 'newFatca', defaultGet(origin, 'requestData.newFatca'));
  filterSet(response, 'usFatcaPerson', defaultGet(origin, 'requestData.usFatcaPerson'));
  filterSet(response, 'countryWorkPlace', defaultGet(origin, 'requestData.countryWorkPlace'));
  filterSet(response, 'provinceWorkPlace', defaultGet(origin, 'requestData.provinceWorkPlace'));
  filterSet(response, 'firstRegisterDate', defaultGet(origin, 'requestData.firstRegisterDate'));
  filterSet(response, 'signDate', defaultGet(origin, 'requestData.signDate'));
  filterSet(response, 'companyLegalForm', defaultGet(origin, 'requestData.companyLegalForm'));
  filterSet(temp, 'list.roleListOrigin', defaultGet(origin, 'requestData.clientInfo.roleList'));
  if (defaultGet(temp, 'field.isNewClient') === true) {
    filterSet(
      temp,
      'list.customerRoleAdded',
      cleanValidateGet(origin, 'requestData.personalInfo.customerRole')
    );
  }
  filterSet(
    temp,
    'list.roleListAdded',
    temp?.list?.customerRoleAdded?.map((item, index) => ({
      ...temp?.list?.roleListAdded?.[index],
      customerRole: formUtils.queryValue(item),
    }))
  );

  filterSet(temp, 'list.roleListResult[0]', defaultGet(temp, 'list.roleListOrigin'));
  filterSet(temp, 'list.roleListResult[1]', defaultGet(temp, 'list.roleListAdded'));
  filterSet(temp, 'field.notDelete', '0');
  filterSet(temp, 'field.isDelete', '1');
  //
  filterSet(temp, 'list.roleListResult', defaultGet(temp, 'list.roleListResult', []).flat());
  //
  filterSet(temp, 'field.notDelete', lodash.toNumber(defaultGet(temp, 'field.notDelete')));
  filterSet(temp, 'field.isDelete', lodash.toNumber(defaultGet(temp, 'field.isDelete')));
  //
  currentAddressIdList = defaultGet(origin, 'requestData.addressInfoList', []).map(
    (item) => item?.id
  );
  defaultGet(origin, 'requestData.addressInfoList', []).forEach((addr: any) => {
    currentAddressInfoMap[addr.id] = addr;
  });
  //
  if (!newIsEmpty(defaultGet(origin, 'requestData.clientInfo.addressList'))) {
    filterSet(
      response,
      'addressList',
      defaultGet(response, 'addressList').map((item) => {
        if (!currentAddressIdList.includes(item?.id)) {
          return {
            ...item,
            deleted: temp?.field.isDelete,
          };
        }

        return (
          item && {
            ...item,
            fullAddress: currentAddressInfoMap[item.id]?.fullAddress || item.fullAddress,
          }
        );
      })
    );
  }
  //
  currentContactIdList = defaultGet(origin, 'requestData.contactInfoList', []).map(
    (item) => item?.id
  );
  const allContactInfoList = lodash.uniqBy(
    lodash.concat(
      defaultGet(origin, 'requestData.contactInfoList', []),
      defaultGet(origin, 'requestData.clientInfo.contactInfoList', [])
    ),
    'id'
  );
  //
  if (!newIsEmpty(defaultGet(response, 'contactInfoList'))) {
    const getDeletedContactInfoList = allContactInfoList?.map((item) => {
      if (newIsEmpty(currentContactIdList) || !currentContactIdList.includes(item?.id)) {
        return {
          ...item,
          deleted: temp?.field.isDelete,
        };
      }
      return item;
    });
    filterSet(origin, 'requestData.clientInfo.contactInfoList', getDeletedContactInfoList);
  }

  //
  filterSet(
    response,
    'contactInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.clientInfo.contactInfoList', []))
  );
  //
  filterSet(
    temp,
    'list.roleListResult',
    defaultGet(temp, 'list.roleListResult', []).map((item) => {
      // 新增item的 deleted赋值0
      if (lodash.isNil(item.deleted)) {
        return {
          ...item,
          deleted: temp?.field.notDelete,
        };
      } else {
        return item;
      }
    })
  );
  filterSet(
    temp,
    'list.roleListResult',
    defaultGet(temp, 'list.roleListResult', []).map((item) => {
      if (lodash.find(temp?.list?.roleListDelete, { customerRole: item.customerRole })) {
        return { ...item, deleted: temp?.field.isDelete };
      }
      return item;
    })
  );
  //
  filterSet(response, 'roleList', defaultGet(temp, 'list.roleListResult'));
  //
  filterSet(
    response,
    'countryOfResident',
    defaultGet(origin, 'requestData.nationalityInfo.countryOfResident')
  );
  filterSet(
    response,
    'passportGreenCardNo',
    defaultGet(origin, 'requestData.nationalityInfo.passportGreenCardNo')
  );
  filterSet(
    response,
    'nationality2',
    defaultGet(origin, 'requestData.nationalityInfo.nationality2')
  );
  filterSet(
    response,
    'nationality3',
    defaultGet(origin, 'requestData.nationalityInfo.nationality3')
  );
  filterSet(response, 'nationality', defaultGet(origin, 'requestData.nationalityInfo.nationality'));
  filterSet(response, 'usaFlag', defaultGet(origin, 'requestData.nationalityInfo.usaFlag'));
  filterSet(response, 'greenCard', defaultGet(origin, 'requestData.nationalityInfo.greenCard'));
  filterSet(response, 'malaysianPR', defaultGet(origin, 'requestData.nationalityInfo.malaysianPR'));
  //
  filterSet(
    temp,
    'list.address_B',
    defaultGet(response, 'addressList', []).filter((item) =>
      lodash.toString(formUtils.queryValue(item?.addrType) === 'B')
    )
  );
  filterSet(
    temp,
    'list.address_R',
    defaultGet(response, 'addressList', []).filter((item) =>
      lodash.toString(formUtils.queryValue(item?.addrType) === 'R')
    )
  );
  filterSet(
    temp,
    'list.address_E',
    defaultGet(response, 'addressList', []).filter((item) =>
      lodash.toString(formUtils.queryValue(item?.addrType) === 'E')
    )
  );
  filterSet(
    temp,
    'list.address_N',
    defaultGet(response, 'addressList', []).filter((item) =>
      lodash.toString(formUtils.queryValue(item?.addrType) === 'N')
    )
  );
  filterSet(
    temp,
    'list.address_Y',
    defaultGet(response, 'addressList', []).filter((item) =>
      lodash.toString(formUtils.queryValue(item?.communicationLane) === 'Y')
    )
  );
  //
  const {
    SecondaryIdentityNo,
    SecondaryIdentityType,
    SecondaryIdentityExpiryDate,
    tinsssgsis,
    tinsssgsisNo,
  } = defaultGet(origin, 'requestData.personalInfo', {});
  filterSet(
    temp,
    'field.crtInfo_type_ctfType_combine',
    [SecondaryIdentityNo, SecondaryIdentityType, SecondaryIdentityExpiryDate].join('')
  );
  filterSet(temp, 'field.crtInfo_tinsssgsis_combine', [tinsssgsis, tinsssgsisNo].join(''));
  const { noTin, ctfCountryCode, ctfId } = defaultGet(origin, 'requestData.financialInfo', {});
  filterSet(temp, 'field.crtInfo_type_S_combine', [noTin].join(''));
  filterSet(temp, 'field.crtInfo_ctfType_TN_combine', [ctfCountryCode, ctfId].join(''));
  filterSet(temp, 'field.crtInfoListByCtfTypeAndCtfCountryCode_combine', [ctfId].join(''));
  const { ctfStartDate, expiryDate, identityType, identityNo } = defaultGet(
    origin,
    'requestData.personalInfo',
    {}
  );
  const {
    ctfCountryCode: nationalityInfoCtfCountryCode,
    ctfPlace,
    usResidenceAddress,
    fullAddress,
  } = defaultGet(origin, 'requestData.nationalityInfo', {});
  filterSet(
    temp,
    'field.crtInfo_type_P_combine',
    [
      ctfStartDate,
      expiryDate,
      identityType,
      identityNo,
      nationalityInfoCtfCountryCode,
      ctfPlace,
    ].join('')
  );
  filterSet(
    temp,
    'field.address_addrType_US_country_USA_combine',
    [usResidenceAddress, fullAddress].join('')
  );
  const { consentProcessing, agreement, promotionsBy, specify } = defaultGet(
    origin,
    'requestData.otherInfo',
    {}
  );
  filterSet(
    temp,
    'field.consent_field_combine',
    [consentProcessing, agreement, promotionsBy, specify].join('')
  );
  const {
    entityPOBusinessAddress,
    businessAddress,
    businessAddress1,
    businessAddress2,
    businessAddress3,
    businessAddress4,
    businessAddress5,
    businessAddress6,
    businessAddress7,
    entityPolicyOwnerBusinessAddress,
    businessZipCode,
    residentialAddress,
    residentialAddress1,
    residentialAddress2,
    residentialAddress3,
    residentialAddress4,
    residentialAddress5,
    residentialAddress6,
    residentialAddress7,
    emailAddress1,
    emailAddress2,
    emailAddress3,
    emailAddress4,
    emailAddress5,
    emailAddress6,
    emailAddress7,
    permanentAddress1,
    permanentAddress2,
    permanentAddress3,
    permanentAddress4,
    permanentAddress5,
    permanentAddress6,
    permanentAddress7,
    secondaryContactNo,
    countryName,
    phoneNoReadOnly,
    country,
  } = defaultGet(origin, 'requestData.contactInfoKH', {});

  filterSet(
    temp,
    'field.address_B_combine',
    [
      entityPOBusinessAddress,
      businessAddress,
      businessAddress1,
      businessAddress2,
      businessAddress3,
      businessAddress4,
      businessAddress5,
      businessAddress6,
      businessAddress7,
      entityPolicyOwnerBusinessAddress,
      businessZipCode,
    ].join('')
  );

  filterSet(
    temp,
    'field.address_R_combine',
    [
      residentialAddress,
      residentialAddress1,
      residentialAddress2,
      residentialAddress3,
      residentialAddress4,
      residentialAddress5,
      residentialAddress6,
      residentialAddress7,
    ].join('')
  );
  filterSet(
    temp,
    'field.address_E_combine',
    [
      emailAddress1,
      emailAddress2,
      emailAddress3,
      emailAddress4,
      emailAddress5,
      emailAddress6,
      emailAddress7,
    ].join('')
  );
  filterSet(
    temp,
    'field.address_N_combine',
    [
      permanentAddress1,
      permanentAddress2,
      permanentAddress3,
      permanentAddress4,
      permanentAddress5,
      permanentAddress6,
      businessAddress5,
      permanentAddress7,
    ].join('')
  );
  filterSet(temp, 'field.contactInfo_combine', [secondaryContactNo, countryName].join(''));
  filterSet(temp, 'field.contactInfo_contactSeqNum_combine', [phoneNoReadOnly, country].join(''));
  //
  filterSet(
    temp,
    'list.crtInfoList_PH_TH',
    defaultGet(response, 'crtInfoList', [])
      .filter((item) => lodash.toString(formUtils.queryValue(item?.type)) === 'S')
      .filter((item) =>
        ['TN', 'SS', 'GS'].includes(lodash.toString(formUtils.queryValue(item?.ctfType)))
      )
      .filter((item) => lodash.toString(formUtils.queryValue(item?.ctfCountryCode)) !== 'USA')
      .filter((item) => !!temp?.field.PH_TH_region)
  );
  //
  if (
    newIsEmpty(temp?.list?.crtInfoList_PH_TH) &&
    !newIsEmpty(defaultGet(temp, 'field.crtInfo_tinsssgsis_combine')) &&
    !!temp?.field.PH_TH_region
  ) {
    filterSet(temp, 'field.append_PH_TH_flag', true);
  }

  // filterSet(
  //   temp,
  //   'list.crtInfoList_PH_TH[0].ctfType',
  //   defaultGet(origin, 'requestData.personalInfo.tinsssgsis')
  // );
  // filterSet(
  //   temp,
  //   'list.crtInfoList_PH_TH[0].ctfId',
  //   defaultGet(origin, 'requestData.personalInfo.tinsssgsisNo')
  // );
  // if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_PH_TH[0].ctfCountryCode'))) {
  //   filterSet(temp, 'list.crtInfoList_PH_TH[0].ctfCountryCode', 'RP');
  // }
  // if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_PH_TH[0].ctfType'))) {
  //   filterSet(temp, 'list.crtInfoList_PH_TH[0].ctfType', 'TN');
  // }
  // if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_PH_TH[0].type'))) {
  //   filterSet(temp, 'list.crtInfoList_PH_TH[0].type', 'S');
  // }

  if (!!defaultGet(temp, 'field.append_PH_TH_flag')) {
    filterSet(
      response,
      'crtInfoList',
      [
        ...defaultGet(response, 'crtInfoList', []),
        defaultGet(temp, 'list.crtInfoList_PH_TH[0]'),
      ].filter((item) => !!item)
    );
  }

  //
  if (!newIsEmpty(defaultGet(origin, 'requestData.contactInfoList'))) {
    filterSet(
      response,
      'contactInfoList[0].whatsApp',
      defaultGet(origin, 'requestData.contactInfoKH.whatsApp')
    );
  }
  filterSet(response, 'language', defaultGet(origin, 'requestData.contactInfoKH.language'));
  if (!newIsEmpty(defaultGet(origin, 'requestData.contactInfoList'))) {
    filterSet(
      response,
      'contactInfoList[0].telegram',
      defaultGet(origin, 'requestData.contactInfoKH.telegram')
    );
  }
  filterSet(response, 'email', defaultGet(origin, 'requestData.contactInfoKH.email'));
  filterSet(response, 'phoneNo', defaultGet(origin, 'requestData.contactInfoKH.phoneNo'));
  filterSet(response, 'workNumber', defaultGet(origin, 'requestData.contactInfoKH.workNumber'));
  if (!newIsEmpty(defaultGet(origin, 'requestData.contactInfoList'))) {
    filterSet(
      response,
      'contactInfoList[0].residedDurationInd',
      defaultGet(origin, 'requestData.contactInfoKH.residedDurationInd')
    );
    filterSet(
      response,
      'contactInfoList[0].correspondenceViaEmail',
      defaultGet(origin, 'requestData.contactInfoKH.correspondenceViaEmail')
    );
    filterSet(
      response,
      'contactInfoList[0].currentZipCode',
      defaultGet(origin, 'requestData.contactInfoKH.currentZipCode')
    );
    filterSet(
      response,
      'contactInfoList[0].currentAddress',
      defaultGet(origin, 'requestData.contactInfoKH.currentAddress')
    );
  }
  filterSet(response, 'homeNumber', defaultGet(origin, 'requestData.contactInfoKH.homeNumber'));
  //
  filterSet(
    temp,
    'list.contactInfoListSeqNumIncludes1',
    defaultGet(response, 'contactInfoList', []).filter(
      (item) => lodash.toString(formUtils.queryValue(item?.contactSeqNum)) === '1'
    )
  );
  //
  if (!newIsEmpty(defaultGet(temp, 'field.append_seqNumIncludes1_flag'))) {
    if (newIsEmpty(defaultGet(temp, 'list.contactInfoListSeqNumIncludes1'))) {
      filterSet(temp, 'field.append_seqNumIncludes1_flag', true);
    }
    filterSet(temp, 'list.contactInfoListSeqNumIncludes1[0].contactSeqNum', '1');
    filterSet(
      temp,
      'list.contactInfoListSeqNumIncludes1[0].contactNo',
      defaultGet(origin, 'requestData.contactInfoKH.phoneNoReadOnly')
    );
    filterSet(
      temp,
      'list.contactInfoListSeqNumIncludes1[0].countryCode',
      defaultGet(origin, 'requestData.contactInfoKH.country')
    );
    if (!!defaultGet(temp, 'field.append_seqNumIncludes1_flag')) {
      filterSet(response, 'contactInfoList', [
        ...defaultGet(response, 'contactInfoList', []),
        defaultGet(temp, 'list.contactInfoListSeqNumIncludes1[0]'),
      ]);
    }
  }
  //
  //
  if (!newIsEmpty(defaultGet(temp, 'field.consent_field_combine'))) {
    if (newIsEmpty(response.consentsList)) {
      filterSet(temp, 'field.append_consent_flag', true);
    }
    filterSet(
      response,
      'consentsList[0].consentProcessing',
      defaultGet(origin, 'requestData.otherInfo.consentProcessing')
    );
    filterSet(
      response,
      'consentsList[0].agreement',
      defaultGet(origin, 'requestData.otherInfo.agreement')
    );
    filterSet(
      response,
      'consentsList[0].promotionsBy',
      defaultGet(origin, 'requestData.otherInfo.promotionsBy')
    );
    filterSet(
      response,
      'consentsList[0].specify',
      defaultGet(origin, 'requestData.otherInfo.specify')
    );
  }
  //
  filterSet(response, 'tsarPI', defaultGet(origin, 'requestData.financialInfo.tsarPI'));
  filterSet(response, 'tsarPH', defaultGet(origin, 'requestData.financialInfo.tsarPH'));
  filterSet(
    response,
    'annualIncome',
    defaultGet(origin, 'requestData.backgroundInfo.annualIncome')
  );
  filterSet(
    response,
    'secondaryAnnualIncome',
    defaultGet(origin, 'requestData.backgroundInfo.secondaryAnnualIncome')
  );
  filterSet(
    response,
    'annualIncomeCurrency',
    defaultGet(origin, 'requestData.backgroundInfo.annualIncomeCurrency')
  );
  filterSet(
    response,
    'sourceOfWealth',
    defaultGet(origin, 'requestData.financialInfo.sourceOfWealth')
  );
  filterSet(
    response,
    'monthlyIncome',
    defaultGet(origin, 'requestData.financialInfo.monthlyIncome')
  );
  filterSet(
    response,
    'annualIncomeCurrency',
    defaultGet(origin, 'requestData.financialInfo.annualIncomeCurrency')
  );
  filterSet(response, 'incomeRange', defaultGet(origin, 'requestData.financialInfo.incomeRange'));
  filterSet(response, 'usTaxFlag', defaultGet(origin, 'requestData.financialInfo.usTaxFlag'));
  filterSet(response, 'sourceOfFund', defaultGet(origin, 'requestData.financialInfo.sourceOfFund'));
  filterSet(response, 'otherSource', defaultGet(origin, 'requestData.financialInfo.otherSource'));
  filterSet(
    response,
    'monthlyIncomeRange',
    defaultGet(origin, 'requestData.financialInfo.monthlyIncomeRange')
  );
  filterSet(
    response,
    'indisiaReason',
    defaultGet(origin, 'requestData.financialInfo.indisiaReason')
  );
  filterSet(
    response,
    'annualPremEquivalent',
    defaultGet(origin, 'requestData.financialInfo.annualPremEquivalent')
  );
  //
  filterSet(
    response,
    'occupationCode',
    defaultGet(origin, 'requestData.backgroundInfo.occupationCode')
  );
  filterSet(
    response,
    'occupationSecondary',
    defaultGet(origin, 'requestData.backgroundInfo.occupationSecondary')
  );
  filterSet(response, 'position', defaultGet(origin, 'requestData.backgroundInfo.position'));
  filterSet(
    response,
    'positionDescription',
    defaultGet(origin, 'requestData.backgroundInfo.positionDescription')
  );
  filterSet(
    response,
    'englishProficiency',
    defaultGet(origin, 'requestData.backgroundInfo.englishProficiency')
  );
  filterSet(response, 'companyName', defaultGet(origin, 'requestData.backgroundInfo.companyName'));
  filterSet(
    response,
    'educationCode',
    defaultGet(origin, 'requestData.backgroundInfo.educationCode')
  );
  filterSet(
    response,
    'employmentStatus',
    defaultGet(origin, 'requestData.backgroundInfo.employmentStatus')
  );
  filterSet(
    response,
    'occupationClass',
    defaultGet(origin, 'requestData.backgroundInfo.occupationClass')
  );
  filterSet(
    response,
    'occupationClassSecondary',
    defaultGet(origin, 'requestData.backgroundInfo.occupationClassSecondary')
  );
  filterSet(
    response,
    'addRccOccupationClass',
    defaultGet(origin, 'requestData.backgroundInfo.addRccOccupationClass')
  );
  filterSet(
    response,
    'paOccupationClass',
    defaultGet(origin, 'requestData.backgroundInfo.paOccupationClass')
  );
  filterSet(
    response,
    'addRccOccupationClassSecondary',
    defaultGet(origin, 'requestData.backgroundInfo.addRccOccupationClassSecondary')
  );
  filterSet(
    response,
    'paOccupationClassSecondary',
    defaultGet(origin, 'requestData.backgroundInfo.paOccupationClassSecondary')
  );
  filterSet(response, 'unitsName', defaultGet(origin, 'requestData.backgroundInfo.unitsName'));
  filterSet(
    response,
    'natureOfBusiness',
    defaultGet(origin, 'requestData.backgroundInfo.natureOfBusiness')
  );
  filterSet(
    response,
    'natureOfBusinessSecondary',
    defaultGet(origin, 'requestData.backgroundInfo.natureOfBusinessSecondary')
  );
  filterSet(response, 'ckaFlag', defaultGet(origin, 'requestData.backgroundInfo.ckaFlag'));
  filterSet(
    response,
    'occupationGroup',
    defaultGet(origin, 'requestData.backgroundInfo.occupationGroup')
  );
  filterSet(
    response,
    'occupationGroupSecondary',
    defaultGet(origin, 'requestData.backgroundInfo.occupationGroupSecondary')
  );
  filterSet(
    response,
    'nameOfBusinessEmployer',
    defaultGet(origin, 'requestData.backgroundInfo.nameOfBusinessEmployer')
  );
  filterSet(response, 'occupation', defaultGet(origin, 'requestData.backgroundInfo.occupation'));
  filterSet(
    response,
    'occupationSector',
    defaultGet(origin, 'requestData.backgroundInfo.occupationSector')
  );
  filterSet(
    response,
    'nonIncomeEarnerType',
    defaultGet(origin, 'requestData.backgroundInfo.nonIncomeEarnerType')
  );
  filterSet(
    response,
    'industryAffiliation1',
    defaultGet(origin, 'requestData.backgroundInfo.industryAffiliation1')
  );
  filterSet(
    response,
    'exactAffiliation1',
    defaultGet(origin, 'requestData.backgroundInfo.exactAffiliation1')
  );
  filterSet(
    response,
    'industryAffiliation2',
    defaultGet(origin, 'requestData.backgroundInfo.industryAffiliation2')
  );
  filterSet(
    response,
    'exactAffiliation2',
    defaultGet(origin, 'requestData.backgroundInfo.exactAffiliation2')
  );
  filterSet(
    response,
    'entityAffiliation',
    defaultGet(origin, 'requestData.backgroundInfo.entityAffiliation')
  );
  filterSet(
    response,
    'occupationSubGroup',
    defaultGet(origin, 'requestData.backgroundInfo.occupationSubGroup')
  );
  filterSet(
    response,
    'exactAffiliation1List',
    defaultGet(origin, 'requestData.backgroundInfo.exactAffiliation1List')
  );
  filterSet(
    response,
    'exactAffiliation2List',
    defaultGet(origin, 'requestData.backgroundInfo.exactAffiliation2List')
  );
  filterSet(response, 'staffId', defaultGet(origin, 'requestData.backgroundInfo.staffId'));
  filterSet(
    response,
    'holdingPercentage',
    defaultGet(origin, 'requestData.backgroundInfo.holdingPercentage')
  );
  filterSet(
    response,
    'authorizedRepresentative',
    defaultGet(origin, 'requestData.authorizedSignatory.authorizedRepresentative')
  );
  filterSet(
    response,
    'representativeIdType',
    defaultGet(origin, 'requestData.authorizedSignatory.representativeIdType')
  );
  filterSet(
    response,
    'representativeIdExpiryDate',
    defaultGet(origin, 'requestData.authorizedSignatory.representativeIdExpiryDate')
  );
  filterSet(
    response,
    'representativeIdNo',
    defaultGet(origin, 'requestData.authorizedSignatory.representativeIdNo')
  );
  filterSet(
    response,
    'representativePosition',
    defaultGet(origin, 'requestData.authorizedSignatory.representativePosition')
  );
  //
  filterSet(response, 'passionSurvey', defaultGet(origin, 'requestData.otherInfo.passionSurvey'));
  filterSet(
    response,
    'currentMibCodeList',
    defaultGet(origin, 'requestData.otherInfo.currentMibCodeList')
  );
  filterSet(response, 'mibCodeList', defaultGet(origin, 'requestData.otherInfo.mibCodeList'));
  filterSet(
    response,
    'otherPassionSurvey',
    defaultGet(origin, 'requestData.otherInfo.otherPassionSurvey')
  );
  filterSet(response, 'rbaScore', defaultGet(origin, 'requestData.otherInfo.rbaScore'));
  filterSet(
    response,
    'vulnerableCustomerTag',
    defaultGet(origin, 'requestData.otherInfo.vulnerableCustomerTag')
  );
  filterSet(
    response,
    'vulnerableCustomerOption',
    defaultGet(origin, 'requestData.otherInfo.vulnerableCustomerOption')
  );
  filterSet(response, 'otherContract', defaultGet(origin, 'requestData.otherInfo.otherContract'));
  filterSet(
    response,
    'numberOfPoliciesOrClaimsInOtherComp',
    defaultGet(origin, 'requestData.otherInfo.numberOfPoliciesOrClaimsInOtherComp')
  );
  filterSet(
    response,
    'numberOfOtherCompany',
    defaultGet(origin, 'requestData.otherInfo.numberOfOtherCompany')
  );
  filterSet(response, 'ocrFlag', defaultGet(origin, 'requestData.otherInfo.ocrFlag'));
  filterSet(
    response,
    'legalRepresentativeUuids',
    defaultGet(origin, 'requestData.otherInfo.legalRepresentativeUuids')
  );
  //
  if (!newIsEmpty(defaultGet(temp, 'field.consent_field_combine'))) {
    if (newIsEmpty(response?.consentsList)) {
      filterSet(temp, 'field.append_consent_flag', true);
    }
    filterSet(
      response,
      'consentsList[0].consentProcessing',
      defaultGet(origin, 'requestData.otherInfo.consentProcessing')
    );
    filterSet(
      response,
      'consentsList[0].agreement',
      defaultGet(origin, 'requestData.otherInfo.agreement')
    );
    filterSet(
      response,
      'consentsList[0].promotionsBy',
      defaultGet(origin, 'requestData.otherInfo.promotionsBy')
    );
    filterSet(
      response,
      'consentsList[0].specify',
      defaultGet(origin, 'requestData.otherInfo.specify')
    );
  }
  //
  if (!newIsEmpty(defaultGet(origin, 'requestData.addressInfoList'))) {
    filterSet(
      temp,
      'map.addressInfoMap',
      defaultGet(origin, 'requestData.addressInfoList', []).reduce((r, c) => {
        r[c.id] = c;
        return r;
      }, {})
    );
  }
  //
  filterSet(
    temp,
    'list.addressInfoListDelete',
    defaultGet(response, 'addressList', []).filter(
      (item) =>
        !defaultGet(origin, 'requestData.addressInfoList', [])
          .map((addressItem) => addressItem?.id)
          .includes(item?.id)
    )
  );
  filterSet(
    temp,
    'list.addressInfoListAdded',
    defaultGet(origin, 'requestData.addressInfoList', []).filter(
      (item) =>
        !defaultGet(response, 'addressList', [])
          .map((addressItem) => addressItem?.id)
          .includes(item?.id)
    ) || isEmpty(response.addressList)
  );
  //
  filterSet(
    response,
    'addressList',
    defaultGet(response, 'addressList', []).map((item) => {
      if (
        defaultGet(temp, 'list.addressInfoListDelete', [])
          .map((addressItem) => addressItem?.id)
          .includes(item?.id)
      ) {
        return { ...item, deleted: temp?.field.isDelete };
      }
      return item;
    })
  );
  filterSet(
    response,
    'addressList',
    defaultGet(response, 'addressList', []).map((item) => {
      if (
        !defaultGet(temp, 'list.addressInfoListDelete', [])
          .map((addressItem) => addressItem?.id)
          .includes(item?.id) ||
        lodash.every(
          defaultGet(temp, 'list.addressInfoListDelete', []).map((addressItem) => addressItem?.id),
          (idItem) => lodash.isNull(idItem)
        )
      ) {
        return {
          ...item,
          addrType: temp?.map?.addressInfoMap?.[item?.id]?.addrType,
          address1: temp?.map?.addressInfoMap?.[item?.id]?.address1,
          address2: temp?.map?.addressInfoMap?.[item?.id]?.address2,
          address3: temp?.map?.addressInfoMap?.[item?.id]?.address3,
          address4: temp?.map?.addressInfoMap?.[item?.id]?.address4,
          address5: temp?.map?.addressInfoMap?.[item?.id]?.address5,
          address6: temp?.map?.addressInfoMap?.[item?.id]?.address6,
          fullAddress: temp?.map?.addressInfoMap?.[item?.id]?.fullAddress || item.fullAddress,
          country: temp?.map?.addressInfoMap?.[item?.id]?.country,
          zipCode: temp?.map?.addressInfoMap?.[item?.id]?.zipCode,
        };
      }
      return item;
    })
  );
  //
  if (!newIsEmpty(defaultGet(temp, 'list.addressInfoListAdded'))) {
    filterSet(temp, 'list.addressInfoListResult[0]', defaultGet(temp, 'list.addressInfoListAdded'));
  }
  if (!newIsEmpty(defaultGet(response, 'addressList'))) {
    filterSet(temp, 'list.addressInfoListResult[1]', defaultGet(response, 'addressList'));
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.addressInfoListResult',
    defaultGet(temp, 'list.addressInfoListResult', []).flat()
  );
  // CopyFieldConvertor
  if (!!!defaultGet(temp, 'field.isNewClient')) {
    filterSet(response, 'addressList', defaultGet(temp, 'list.addressInfoListResult', []));
  }
  if (!!defaultGet(temp, 'field.isNewClient')) {
    filterSet(response, 'addressList', defaultGet(origin, 'requestData.addressInfoList', []));
  }

  filterSet(
    response,
    'addressList',
    defaultGet(response, 'addressList', []).map((item) => {
      if (
        cleanValidateGet(origin, 'requestData.contactInfoKH.communicationLane') ===
        lodash.toString(formUtils.queryValue(item?.addrType))
      ) {
        return { ...item, communicationLane: 'Y' };
      }
      if (
        cleanValidateGet(origin, 'requestData.contactInfoKH.communicationLane') !==
        lodash.toString(formUtils.queryValue(item?.addrType))
      ) {
        return { ...item, communicationLane: 'N' };
      }
      return item;
    })
  );
  // ListRecordFilter
  filterSet(
    temp,
    'list.response.crtInfoListByTypeAndCtfType',
    defaultGet(response, 'crtInfoList', []).filter(
      (item) =>
        lodash.toString(formUtils.queryValue(item?.type)) === 'S' &&
        !['TN', 'PA', 'SS', 'GS'].includes(formUtils.queryValue(item?.ctfType)) &&
        !!cleanValidateGet(temp, 'field.ID_TH_region')
    )
  );
  // CopyFieldConvertor
  if (
    lodash.toString(
      cleanValidateGet(temp, 'field.crtInfo_type_ctfType_combine') !== '' &&
        !!cleanValidateGet(temp, 'field.ID_TH_region')
    )
  ) {
    if (newIsEmpty(defaultGet(temp, 'list.response.crtInfoListByTypeAndCtfType'))) {
      filterSet(temp, 'field.response.append_crtInfoList_type_ctfType_flag', true);
    }
    if (!newIsEmpty(defaultGet(origin, 'requestData.personalInfo.SecondaryIdentityNo'))) {
      filterSet(
        temp,
        'list.response.crtInfoListByTypeAndCtfType[0].ctfId',
        defaultGet(origin, 'requestData.personalInfo.SecondaryIdentityNo')
      );
    }
    if (!newIsEmpty(defaultGet(origin, 'requestData.personalInfo.SecondaryIdentityType'))) {
      filterSet(
        temp,
        'list.response.crtInfoListByTypeAndCtfType[0].ctfType',
        defaultGet(origin, 'requestData.personalInfo.SecondaryIdentityType')
      );
    }

    filterSet(
      temp,
      'list.response.crtInfoListByTypeAndCtfType[0].ctfExpireDate',
      defaultGet(origin, 'requestData.personalInfo.SecondaryIdentityExpiryDate')
    );

    if (newIsEmpty(defaultGet(origin, 'requestData.personalInfo.type'))) {
      filterSet(temp, 'list.response.crtInfoListByTypeAndCtfType[0].type', 'S');
    }
    if (!!defaultGet(temp, 'field.append_crtInfoList_type_ctfType_flag')) {
      filterSet(
        response,
        'crtInfoList',
        [
          ...defaultGet(response, 'crtInfoList', []),
          defaultGet(temp, 'list.response.crtInfoListByTypeAndCtfType[0]'),
        ].filter((item) => item)
      );
    }
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.crtInfoListByType_P',
    defaultGet(response, 'crtInfoList', []).filter(
      (item) => lodash.toString(formUtils.queryValue(item?.type)) === 'P'
    )
  );
  //
  if (newIsEmpty(defaultGet(temp, 'list.crtInfoListByType_P'))) {
    filterSet(temp, 'field.append_crtInfoList_type_P_flag', true);
  }
  if (region === 'VN') {
    filterSet(
      temp,
      'list.crtInfoListByType_P[0].ctfStartDate',
      defaultGet(origin, 'requestData.personalInfo.ctfStartDate')
    );
  }

  filterSet(
    temp,
    'list.crtInfoListByType_P[0].ctfExpireDate',
    defaultGet(origin, 'requestData.personalInfo.expiryDate')
  );
  filterSet(
    temp,
    'list.crtInfoListByType_P[0].ctfType',
    defaultGet(origin, 'requestData.personalInfo.identityType')
  );
  filterSet(
    temp,
    'list.crtInfoListByType_P[0].ctfPlace',
    defaultGet(origin, 'requestData.nationalityInfo.ctfPlace')
  );
  filterSet(
    temp,
    'list.crtInfoListByType_P[0].ctfCountryCode',
    defaultGet(origin, 'requestData.nationalityInfo.ctfCountryCode')
  );

  /** jira MDLTH-3225 */
  filterSet(
    temp,
    'list.crtInfoListByType_P[0].lifelongIndicator',
    defaultGet(origin, 'requestData.personalInfo.lifelongIndicator')
  );

  if (!newIsEmptyStr(defaultGet(origin, 'requestData.personalInfo.identityNo'))) {
    filterSet(
      temp,
      'list.crtInfoListByType_P[0].ctfId',
      defaultGet(origin, 'requestData.personalInfo.identityNo')
    );
  }
  if (newIsEmpty(defaultGet(temp, 'list.crtInfoListByType_P[0].type'))) {
    filterSet(temp, 'list.crtInfoListByType_P[0].type', 'P');
  }
  /** jira MDLTH-3225 end */
  if (!!defaultGet(temp, 'field.append_crtInfoList_type_P_flag')) {
    filterSet(
      response,
      'crtInfoList',
      [
        ...defaultGet(response, 'crtInfoList', []),
        defaultGet(temp, 'list.crtInfoListByType_P[0]'),
      ].filter((item) => !!item)
    );
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.crtInfoListByCtfTypeAndCtfCountryCode',
    defaultGet(response, 'crtInfoList', []).filter(
      (item) =>
        lodash.toString(formUtils.queryValue(item?.type)) === 'S' &&
        ['TN', 'SS', 'GS'].includes(formUtils.queryValue(item?.ctfType)) &&
        lodash.toString(formUtils.queryValue(item?.ctfCountryCode)) === 'USA' &&
        ['PH', 'VN', 'TH'].includes(region)
    )
  );
  // ReplaceValueInObjectConverter
  if (newIsEmpty(defaultGet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode'))) {
    filterSet(
      temp,
      'list.crtInfoListByCtfTypeAndCtfCountryCode',
      defaultGet(response, 'crtInfoList', []).filter(
        (item) =>
          lodash.toString(formUtils.queryValue(item?.type)) === 'S' &&
          ['TN', 'SS', 'GS'].includes(formUtils.queryValue(item?.ctfType)) &&
          !newIsEmpty(defaultGet(origin, 'requestData.financialInfo.ctfId')) &&
          ['PH', 'VN', 'TH'].includes(region)
      )
    );
  }
  // CopyFieldConvertor
  if (
    lodash.toString(
      cleanValidateGet(temp, 'field.crtInfoListByCtfTypeAndCtfCountryCode_combine')
    ) !== '' &&
    ['PH', 'VN', 'TH'].includes(region)
  ) {
    if (newIsEmpty(defaultGet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode'))) {
      filterSet(temp, 'field.append_crtInfoListByCtfTypeAndCtfCountryCode_flag', true);
    }
    if (!newIsEmpty(defaultGet(origin, 'requestData.financialInfo.ctfId'))) {
      filterSet(
        temp,
        'list.crtInfoListByCtfTypeAndCtfCountryCode[0].ctfId',
        defaultGet(origin, 'requestData.financialInfo.ctfId')
      );
    }
    if (
      lodash.toString(
        cleanValidateGet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode[0].ctfType')
      ) === ''
    ) {
      filterSet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode[0].ctfType', 'TN');
    }
    if (newIsEmpty(defaultGet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode[0].type'))) {
      filterSet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode[0].ctfType', 'S');
    }

    filterSet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode[0].ctfCountryCode', 'USA');

    if (!!defaultGet(temp, 'field.append_crtInfoListByCtfTypeAndCtfCountryCode_flag')) {
      filterSet(response, 'crtInfoList', [
        ...defaultGet(response, 'crtInfoList', []),
        defaultGet(temp, 'list.crtInfoListByCtfTypeAndCtfCountryCode[0]'),
      ]);
    }
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.address_addrType_US_country_USA',
    defaultGet(response, 'addressList', []).filter(
      (item) =>
        lodash.toString(formUtils.queryValue(item?.addrType)) === 'US' &&
        lodash.toString(formUtils.queryValue(item?.country)) === 'USA'
    )
  );
  // ListRecordFilter
  if (newIsEmpty(defaultGet(temp, 'list.address_addrType_US_country_USA'))) {
    filterSet(
      temp,
      'list.address_addrType_US_country_USA',
      defaultGet(response, 'addressList', []).filter(
        (item) => lodash.toString(formUtils.queryValue(item?.country)) === 'USA'
      )
    );
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.crtInfoList_RI_TN',
    defaultGet(response, 'crtInfoList', []).filter(
      (item) =>
        lodash.toString(formUtils.queryValue(item?.ctfCountryCode)) === 'RI' &&
        lodash.toString(formUtils.queryValue(item?.ctfType)) === 'TN' &&
        lodash.toString(formUtils.queryValue(item?.type)) === 'S'
    )
  );
  // CopyFieldConvertor
  if (!newIsEmpty(defaultGet(origin, 'requestData.personalInfo.npwp')) && region === 'ID') {
    if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_RI_TN'))) {
      filterSet(temp, 'field.append_crtInfoList_RI_TN_flag', true);
    }
    if (!newIsEmpty(defaultGet(origin, 'requestData.personalInfo.npwp'))) {
      filterSet(
        temp,
        'list.crtInfoList_RI_TN[0].ctfId',
        defaultGet(origin, 'requestData.personalInfo.npwp')
      );
    }
    if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_RI_TN[0].ctfType'))) {
      filterSet(temp, 'list.crtInfoList_RI_TN[0].ctfType', 'TN');
    }
    if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_RI_TN[0].type'))) {
      filterSet(temp, 'list.crtInfoList_RI_TN[0].type', 'S');
    }
    if (newIsEmpty(defaultGet(temp, 'list.crtInfoList_RI_TN[0].ctfCountryCode'))) {
      filterSet(temp, 'list.crtInfoList_RI_TN[0].ctfCountryCode', 'RI');
    }
    if (!!defaultGet(temp, 'field.append_crtInfoList_RI_TN_flag')) {
      filterSet(response, 'crtInfoList', [
        ...defaultGet(response, 'crtInfoList', []),
        defaultGet(temp, 'list.crtInfoList_RI_TN[0]'),
      ]);
    }
  }
  // CopyFieldConvertor
  if (!newIsEmpty(defaultGet(temp, 'field.address_addrType_US_country_USA_combine'))) {
    if (newIsEmpty(defaultGet(temp, 'list.address_addrType_US_country_USA'))) {
      filterSet(temp, 'field.append_address_addrType_US_country_USA_flag', true);
    }
    if (!lodash.isNull(defaultGet(origin, 'requestData.nationalityInfo.usResidenceAddress'))) {
      filterSet(
        temp,
        'list.address_addrType_US_country_USA[0].fullAddress',
        defaultGet(origin, 'requestData.nationalityInfo.usResidenceAddress')
      );
    }
    if (newIsEmpty(defaultGet(temp, 'list.address_addrType_US_country_USA[0].addrType'))) {
      filterSet(temp, 'list.address_addrType_US_country_USA[0].addrType', 'US');
    }
    if (newIsEmpty(defaultGet(temp, 'list.address_addrType_US_country_USA[0].country'))) {
      filterSet(temp, 'list.address_addrType_US_country_USA[0].country', 'USA');
    }
    if (!!defaultGet(temp, 'field.append_address_addrType_US_country_USA_flag')) {
      filterSet(response, 'addressList', [
        ...defaultGet(response, 'addressList', []),
        defaultGet(temp, 'list.address_addrType_US_country_USA[0]'),
      ]);
    }
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.response.crtInfoListByType_S',
    defaultGet(response, 'crtInfoList', []).filter(
      (item) =>
        lodash.toString(formUtils.queryValue(item?.type)) === 'S' &&
        lodash.toString(formUtils.queryValue(item?.ctfType)) === 'TN'
    )
  );

  // CopyFieldConvertor
  if (!newIsEmpty(defaultGet(temp, 'field.crtInfo_type_S_combine'))) {
    if (newIsEmpty(defaultGet(temp, 'list.response.crtInfoListByType_S'))) {
      filterSet(temp, 'field.append_crtInfoList_type_S_flag', true);
    }
    filterSet(
      temp,
      'list.response.crtInfoListByType_S[0].noTin',
      defaultGet(origin, 'requestData.financialInfo.noTin')
    );
    if (newIsEmpty(defaultGet(temp, 'list.response.crtInfoListByType_S[0].type'))) {
      filterSet(temp, 'list.response.crtInfoListByType_S[0].type', 'S');
    }
    if (!!defaultGet(temp, 'field.append_crtInfoList_type_S_flag')) {
      filterSet(response, 'crtInfoList', [
        ...defaultGet(response, 'crtInfoList', []),
        defaultGet(temp, 'list.response.crtInfoListByType_S[0]'),
      ]);
    }
  }
  // CopyFieldConvertor
  crtIdList = defaultGet(response, 'crtInfoList', []).map((item) => item?.id);
  // ReplaceValueInObjectConverter
  if (!newIsEmpty(response?.crtInfoList)) {
    filterSet(
      origin,
      'requestData.clientInfo.crtInfoList',
      defaultGet(origin, 'requestData.clientInfo.crtInfoList', []).map((item) => {
        if (newIsEmpty(crtIdList) || !crtIdList?.includes(item?.id)) {
          return { ...item, deleted: temp?.field.isDelete };
        }
        return item;
      })
    );

    filterSet(
      response,
      'crsInfoList',
      defaultGet(origin, 'requestData.clientInfo.crsInfoList', []).map((item) => {
        if (newIsEmpty(crtIdList) || !crtIdList?.includes(item?.id)) {
          return { ...item, deleted: temp?.field.isDelete };
        }
        return item;
      })
    );
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.crtInfoList',
    defaultGet(origin, 'requestData.clientInfo.crtInfoList', []).filter(
      (item) =>
        lodash.toString(formUtils.queryValue(item?.deleted)) ===
        lodash.toString(formUtils.queryValue(temp?.field.isDelete))
    )
  );

  filterSet(
    response,
    'crtInfoList',
    defaultGet(response, 'crtInfoList', []).map((item) => {
      if (lodash.toString(formUtils.queryValue(item?.ctfType)) === 'GC') {
        const extra = {};
        filterSet(extra, 'ctfId', defaultGet(origin, 'requestData.fatcaInfo.greenCardId'));
        filterSet(
          extra,
          'ctfExpireDate',
          defaultGet(origin, 'requestData.fatcaInfo.greenCardExpireDate')
        );
        return {
          ...item,
          ...extra,
        };
      }
      if (
        lodash.toString(formUtils.queryValue(item?.ctfType)) === 'TN' &&
        lodash.toString(formUtils.queryValue(item?.ctfCountryCode)) === 'USA'
      ) {
        const extra = {};
        filterSet(extra, 'ctfId', defaultGet(origin, 'requestData.fatcaInfo.ctfId'));
        filterSet(
          extra,
          'ctfExpireDate',
          defaultGet(origin, 'requestData.fatcaInfo.ctfExpireDate')
        );

        return {
          ...item,
          ...extra,
        };
      }
      return item;
    })
  );

  // CopyFieldConvertor
  filterSet(temp, 'list.finalCrtInfoList[1]', defaultGet(temp, 'list.crtInfoList'));
  filterSet(temp, 'list.finalCrtInfoList[0]', defaultGet(response, 'crtInfoList'));

  // ListRecordFilter
  filterSet(temp, 'list.finalCrtInfoList', defaultGet(temp, 'list.finalCrtInfoList', []).flat());

  const targetIndex = (response as any)?.crtInfoList?.findIndex((item: any) => item?.type === 'P');

  if (targetIndex !== undefined && ~targetIndex) {
    filterSet(
      response,
      `crtInfoList[${targetIndex}].ctfType`,
      defaultGet(origin, 'requestData.personalInfo.ctfType')
    );
  }

  // CopyFieldConvertor
  filterSet(response, 'crtInfoList', lodash.cloneDeep(defaultGet(temp, 'list.finalCrtInfoList')));

  // CombineFieldValueConvertor
  if (!lodash.isNull(formUtils.queryValue(response.monthlyIncome)) && region === 'ID') {
    filterSet(
      response,
      'monthlyIncome',
      lodash.toNumber(formUtils.queryValue(response.monthlyIncome)) * 1000000
    );
  }
  // CombineFieldValueConvertor
  if (!lodash.isNull(formUtils.queryValue(response.annualIncome)) && region === 'ID') {
    filterSet(
      response,
      'annualIncome',
      lodash.toNumber(formUtils.queryValue(response.annualIncome)) * 1000000
    );
  }
  return response;
}
function convert_businessDataFEToBE(data, region) {
  const temp = {};
  const result = {};
  let uwProposalBO = {};
  const convert = {};

  const origin = lodash.cloneDeep(data);
  // MandatoryFieldValidatorV2
  if (newIsEmpty(defaultGet(origin, 'requestData.originBusinessData.policyList'))) {
    return {
      success: false,
      type: 'validation_exception',
      warnData: {
        'x-error-nonce': 'x-error-nonce',
      },
      resultData: {
        'x-error-nonce': 'x-error-nonce',
      },
      promptMessages: [
        {
          code: 'originBusinessData Should Not Be Null',
          type: 'ERROR',
          content: 'originBusinessData Should Not Be Null',
          messageCode: null,
          applicationName: 'owb-general-object-transform',
          metaData: null,
        },
      ],
    };
  }
  // CopyFieldConvertor
  uwProposalBO = origin.requestData.originBusinessData;
  // MongoFindByIdRepository
  // ListRecordFilter
  filterSet(
    temp,
    'mainProductList',
    defaultGet(origin, 'requestData.coverageList', []).filter(
      (item) => lodash.toString(formUtils.queryValue(item?.isMain)) === 'Y'
    )
  );
  filterSet(
    temp,
    'payorClientList',
    defaultGet(origin, 'requestData.clientInfoList', []).filter(
      (item) => !newIsEmpty(item?.financialInfo?.reasonForPaying)
    )
  );
  // ReplaceValueInObjectConverter
  if (!newIsEmpty(temp.mainProductList)) {
    filterSet(
      temp,
      'mainProductList[0].coverageBenefitsList',
      defaultGet(temp, 'mainProductList[0].coverageBenefitsList', []).map((item) => {
        if (
          lodash.toString(formUtils.queryValue(item?.coverageId)) ===
          cleanValidateGet(temp, 'mainProductList[0].id')
        ) {
          return {
            ...item,
            premiumType: defaultGet(origin, 'requestData.planInfoData.premiumType'),
          };
        }
        return item;
      })
    );
    filterSet(
      origin,
      'requestData.coverageList',
      defaultGet(origin, 'requestData.coverageList', []).map((item) => {
        if (
          lodash.toString(formUtils.queryValue(item.id)) ===
          cleanValidateGet(temp, 'mainProductList[0].id')
        ) {
          return {
            ...item,
            coverageBenefitsList: defaultGet(temp, 'mainProductList[0].coverageBenefitsList'),
          };
        }
        return item;
      })
    );
  }
  // GroupToMapConvertor
  filterSet(
    temp,
    'map.businessDataClientInfoMap',
    defaultGet(uwProposalBO, 'policyList[0].clientInfoList', []).reduce((r, c) => {
      r[c.id] = c;
      return r;
    }, {})
  );
  // ReplaceValueInObjectConverter
  filterSet(
    origin,
    'requestData.clientInfoList',
    defaultGet(origin, 'requestData.clientInfoList', []).map((item) => {
      return { ...item, clientInfo: temp.map.businessDataClientInfoMap[item?.id] };
    })
  );
  // CopyFieldConvertor
  filterSet(
    temp,
    'currentClientIdList',
    defaultGet(origin, 'requestData.clientInfoList', []).map((item) => item?.id)
  );
  filterSet(
    temp,
    'currentReplacementIdList',
    defaultGet(origin, 'requestData.policyReplacement.replacementInfoList', []).map(
      (item) => item.id
    )
  );
  // ListRecordFilter
  filterSet(
    temp,
    'deletedClientInfoList',
    defaultGet(uwProposalBO, 'policyList[0].clientInfoList', []).filter(
      (item) => !temp.currentClientIdList?.includes(item?.id)
    )
  );
  filterSet(
    temp,
    'deletedReplacementInfoList',
    defaultGet(uwProposalBO, 'policyList[0].replacementInfoList', []).filter(
      (item) =>
        !temp.currentReplacementIdList?.includes(item.id) || newIsEmpty(temp.currentClientIdList)
    )
  );
  // CopyFieldConvertor
  filterSet(
    temp,
    'list.loopMachineRequestList',
    defaultGet(origin, 'requestData.clientInfoList', []).map((item) => ({ requestData: item }))
  );
  filterSet(
    temp,
    'list.crtInfoListcrfType_TN',
    lodash.filter(
      origin.requestData.crtInfoList,
      (item) => lodash.toString(formUtils.queryValue(item?.ctfType)) === 'TN'
    )
  );

  // LoopMachineCaller
  filterSet(
    temp,
    'list.loopMachineResponseList',
    defaultGet(temp, 'list.loopMachineRequestList').map((item) =>
      convert_clientFEToBESingle(item, region)
    )
  );
  // CopyFieldConvertor
  filterSet(convert, 'clientInfoList', defaultGet(temp, 'list.loopMachineResponseList'));
  filterSet(temp, 'policyList[0]', defaultGet(origin, 'requestData.planInfoData'));
  filterSet(temp, 'policyList[0].clientInfoList', defaultGet(convert, 'clientInfoList'));
  filterSet(temp, 'policyList[0].coverageList', defaultGet(origin, 'requestData.coverageList'));
  filterSet(
    temp,
    'policyList[0].paymentList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.paymentList'))
  );
  filterSet(temp, 'policyList[0].policyDecision', defaultGet(origin, 'requestData.policyDecision'));
  filterSet(
    temp,
    'policyList[0].premiumBreakdownBOList',
    defaultGet(origin, 'requestData.premiumBreakdownBOList')
  );
  filterSet(
    temp,
    'policyList[0].charityOrganizationList',
    defaultGet(origin, 'requestData.charityOrganizationList')
  );
  filterSet(temp, 'policyList[0].chequeInfoList', defaultGet(origin, 'requestData.chequeInfoList'));
  filterSet(temp, 'policyList[0].takeOverList', defaultGet(origin, 'requestData.takeOverList'));
  filterSet(
    temp,
    'policyList[0].uwPremiumStatusTrackList',
    defaultGet(uwProposalBO, 'policyList[0].uwPremiumStatusTrackList')
  );
  filterSet(
    temp,
    'policyList[0].premiumPaymentCfgList',
    defaultGet(uwProposalBO, 'policyList[0].premiumPaymentCfgList')
  );
  filterSet(result, 'businessData', lodash.cloneDeep(uwProposalBO));
  filterSet(result, 'businessData.policyList', defaultGet(temp, 'policyList'));
  filterSet(result, 'businessData.agentList', defaultGet(origin, 'requestData.agentList'));
  filterSet(
    result,
    'businessData.proposalDate',
    defaultGet(origin, 'requestData.planInfoData.proposalDate')
  );
  filterSet(
    result,
    'businessData.purposeOfInsurance',
    defaultGet(origin, 'requestData.planInfoData.purposeOfInsurance')
  );
  filterSet(
    result,
    'businessData.applicationSignedDate',
    defaultGet(origin, 'requestData.planInfoData.applicationSignedDate')
  );
  filterSet(
    result,
    'businessData.applicationPlaceOfSigning',
    defaultGet(origin, 'requestData.planInfoData.applicationPlaceOfSigning')
  );
  filterSet(
    result,
    'businessData.fillerPipIndicator',
    defaultGet(origin, 'requestData.planInfoData.fillerPipIndicator')
  );
  filterSet(
    result,
    'businessData.customerSubmitDate',
    defaultGet(origin, 'requestData.planInfoData.customerSubmitDate')
  );
  filterSet(
    result,
    'businessData.otherPurpose',
    defaultGet(origin, 'requestData.planInfoData.otherPurpose')
  );
  filterSet(
    result,
    'businessData.caseType',
    defaultGet(origin, 'requestData.planInfoData.caseType')
  );
  filterSet(
    result,
    'businessData.applyWaitingPeriod',
    defaultGet(origin, 'requestData.planInfoData.applyWaitingPeriod')
  );
  filterSet(result, 'businessData.facType', defaultGet(origin, 'requestData.planInfoData.facType'));
  filterSet(
    result,
    'businessData.eDocument',
    defaultGet(origin, 'requestData.planInfoData.eDocument')
  );
  filterSet(
    result,
    'businessData.preDefineDecision',
    defaultGet(origin, 'requestData.planInfoData.preDefineDecision')
  );
  filterSet(
    result,
    'businessData.possibleSusOptNames',
    defaultGet(origin, 'requestData.planInfoData.possibleSusOptNames')
  );
  filterSet(
    result,
    'businessData.submissionDate',
    defaultGet(origin, 'requestData.planInfoData.submissionDate')
  );
  filterSet(
    result,
    'businessData.communicationPreference',
    defaultGet(origin, 'requestData.planInfoData.communicationPreference')
  );
  filterSet(
    result,
    'businessData.isContinuePremiumPay',
    defaultGet(origin, 'requestData.planInfoData.isContinuePremiumPay')
  );
  filterSet(
    result,
    'businessData.sustainabilityOptions',
    defaultGet(origin, 'requestData.sustainabilityOptions')
  );
  filterSet(
    result,
    'businessData.possibleSusOptIdAndNameList',
    defaultGet(origin, 'requestData.possibleSusOptIdAndNameList')
  );
  filterSet(
    result,
    'businessData.customizeSusOptIdList',
    defaultGet(origin, 'requestData.customizeSusOptIdList')
  );
  // CopyFieldConvertor
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList',
    defaultGet(origin, 'requestData.policyAddressList')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].countryCode',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress7')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].addressLine6',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress6')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].addressLine5',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress5')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].addressLine4',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress4')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].addressLine3',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress3')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].addressLine2',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress2')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].addressLine1',
    defaultGet(origin, 'requestData.planInfoData.PolicyAddress1')
  );
  filterSet(
    result,
    'businessData.policyList[0].policyAddressList[0].zipCode',
    defaultGet(origin, 'requestData.planInfoData.PolicyZipCode')
  );
  filterSet(
    result,
    'businessData.policyList[0].reasonForPaying',
    defaultGet(temp, 'payorClientList[0].financialInfo.reasonForPaying')
  );
  // CopyFieldConvertor
  filterSet(temp, 'isDeleted', '1');
  // DataTypeConvertor
  filterSet(temp, 'isDeleted', lodash.toNumber(temp.isDeleted));
  // ReplaceValueInObjectConverter
  if (!newIsEmpty(temp.deletedReplacementInfoList)) {
    filterSet(
      temp,
      'deletedReplacementInfoList',
      defaultGet(temp, 'deletedReplacementInfoList', []).map((item) => ({
        ...item,
        deleted: temp.isDeleted,
      }))
    );
  }
  // CopyFieldConvertor
  filterSet(
    temp,
    'finalReplacementInfo[0]',
    defaultGet(origin, 'requestData.policyReplacement.replacementInfoList')
  );
  filterSet(temp, 'finalReplacementInfo[1]', defaultGet(temp, 'deletedReplacementInfoList'));
  // ListRecordFilter
  if (!newIsEmpty(defaultGet(temp, 'finalReplacementInfo'))) {
    filterSet(temp, 'finalReplacementInfo', defaultGet(temp, 'finalReplacementInfo').flat());
  }
  // CopyFieldConvertor
  if (!newIsEmpty(defaultGet(temp, 'finalReplacementInfo'))) {
    filterSet(
      result,
      'businessData.policyList[0].replacementInfoList',
      lodash.cloneDeep(defaultGet(temp, 'finalReplacementInfo'))
    );
  }
  // ListRecordFilter
  filterSet(
    temp,
    'list.coverageListY',
    defaultGet(origin, 'requestData.coverageList', []).filter(
      (item) => lodash.toString(formUtils.queryValue(item.isMain)) === 'Y'
    )
  );
  // CopyFieldConvertor
  filterSet(
    result,
    'businessData.policyList[0].policyReplacementFlag',
    defaultGet(origin, 'requestData.policyReplacement.policyReplacementFlag')
  );
  filterSet(
    result,
    'businessData.policyList[0].gsIndicator',
    defaultGet(origin, 'requestData.policyReplacement.gsIndicator')
  );
  filterSet(
    result,
    'businessData.policyList[0].replacementInfoList[0].comment',
    defaultGet(origin, 'requestData.policyReplacement.replacementLastInfo.comment')
  );
  filterSet(
    result,
    'businessData.policyList[0].replacementInfoList[0].partyInfluence',
    defaultGet(origin, 'requestData.policyReplacement.replacementLastInfo.partyInfluence')
  );
  filterSet(
    result,
    'businessData.policyList[0].replacementInfoList[0].satisfiedExplanation',
    defaultGet(origin, 'requestData.policyReplacement.replacementLastInfo.satisfiedExplanation')
  );
  filterSet(
    result,
    'businessData.policyList[0].replacementInfoList[0].extensionToExistingProduct',
    defaultGet(
      origin,
      'requestData.policyReplacement.replacementLastInfo.extensionToExistingProduct'
    )
  );
  filterSet(
    result,
    'businessData.policyList[0].paidByPolicyLoan',
    defaultGet(origin, 'requestData.policyReplacement.replacementFirstInfo.paidByPolicyLoan')
  );
  filterSet(
    result,
    'businessData.policyList[0].replaceInforce',
    defaultGet(origin, 'requestData.policyReplacement.replacementFirstInfo.replaceInforce')
  );
  filterSet(
    result,
    'businessData.policyList[0].inforcePolicy',
    defaultGet(origin, 'requestData.policyReplacement.replacementFirstInfo.inforcePolicy')
  );
  filterSet(
    result,
    'businessData.policyList[0].reinstatablePolicy',
    defaultGet(origin, 'requestData.policyReplacement.replacementFirstInfo.reinstatablePolicy')
  );
  filterSet(
    result,
    'businessData.policyList[0].replaceWithApplyFor',
    defaultGet(origin, 'requestData.policyReplacement.replacementFirstInfo.replaceWithApplyFor')
  );
  filterSet(
    result,
    'businessData.policyList[0].premiumTransferList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.premiumTransferList'))
  );
  filterSet(
    result,
    'businessData.policyList[0].initialInvestmentAnnualPremium',
    defaultGet(temp, 'list.coverageListY[0].initialInvestmentAnnualPremium')
  );
  // CopyFieldConvertor
  filterSet(
    result,
    'businessData.policyList[0].fundInfo.totalFundInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.fund.fundInfoList'))
  );
  filterSet(
    result,
    'businessData.policyList[0].fundInfo.autoRebalancingType',
    defaultGet(origin, 'requestData.fund.fundBaseInfo.autoRebalancingType')
  );
  filterSet(
    result,
    'businessData.policyList[0].fundInfo.autoRebalancingStatus',
    defaultGet(origin, 'requestData.fund.fundBaseInfo.autoRebalancingStatus')
  );
  filterSet(
    result,
    'businessData.policyList[0].fundInfo.portfolioId',
    defaultGet(origin, 'requestData.fund.fundBaseInfo.portfolioId')
  );
  filterSet(
    result,
    'businessData.policyList[0].fundInfo.portfolioType',
    defaultGet(origin, 'requestData.fund.fundBaseInfo.portfolioType')
  );
  filterSet(
    result,
    'businessData.policyList[0].fundInfo.ulReserveUnitDate',
    defaultGet(origin, 'requestData.fund.fundBaseInfo.ulReserveUnitDate')
  );
  // CopyFieldConvertor
  filterSet(
    result,
    'businessData.takeOverList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.takeOver.takeOverList'))
  );
  filterSet(
    result,
    'businessData.takeOverFlag',
    defaultGet(origin, 'requestData.takeOver.takeOverFlag')
  );
  // CopyFieldConvertor
  filterSet(
    result,
    'businessData.policyList[0].cardIssuerCountry',
    defaultGet(origin, 'requestData.paymentList[0].cardIssuerCountry')
  );
  filterSet(
    result,
    'businessData.policyList[0].paymentOption',
    defaultGet(origin, 'requestData.paymentList[0].paymentOption')
  );
  filterSet(
    result,
    'businessData.policyList[0].haveCreditCard',
    defaultGet(origin, 'requestData.paymentList[0].haveCreditCard')
  );
  filterSet(
    result,
    'businessData.policyList[0].paymentMethodType',
    defaultGet(origin, 'requestData.paymentList[0].paymentMethodType')
  );
  filterSet(
    result,
    'businessData.policyList[0].paymentMethodType',
    defaultGet(origin, 'requestData.paymentList[0].paymentMethodType')
  );
  filterSet(
    result,
    'businessData.policyList[0].premiumMethod',
    defaultGet(origin, 'requestData.paymentList[0].premiumMethod')
  );

  lodash.set(
    result,
    'businessData.policyList[0].mibInfoList',
    defaultGet(origin, 'requestData.mibInfoList')
  );
  lodash.set(result, 'businessData.fundMaker', defaultGet(origin, 'requestData.fundMaker'));
  lodash.set(result, 'businessData.fundChanged', defaultGet(origin, 'requestData.fundChanged'));
  // CopyFieldConvertor
  filterSet(
    result,
    'businessData.policyList[0].loanInfoList[0].loanDetailList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.loanDetailList'))
  );
  // ReplaceValueInObjectConverter
  if (!newIsEmpty(temp.deletedClientInfoList)) {
    filterSet(
      temp,
      'deletedClientInfoList',
      temp.deletedClientInfoList.map((item) => ({
        ...item,
        deleted: temp.isDeleted,
        crsInfoList: defaultGet(item, 'crsInfoList', []).map((crsItem) => ({
          ...crsItem,
          deleted: temp.isDeleted,
        })),
        crtInfoList: defaultGet(item, 'crtInfoList', []).map((crtItem) => ({
          ...crtItem,
          deleted: temp.isDeleted,
        })),
        addressList: defaultGet(item, 'addressList', []).map((addressItem) => ({
          ...addressItem,
          deleted: temp.isDeleted,
        })),
        tsarList: defaultGet(item, 'tsarList', []).map((tsarItem) => ({
          ...tsarItem,
          deleted: temp.isDeleted,
        })),
        riskIndicatorList: defaultGet(item, 'riskIndicatorList', []).map((riskItem) => ({
          ...riskItem,
          deleted: temp.isDeleted,
        })),
        identificationList: defaultGet(item, 'identificationList', []).map((identItem) => ({
          ...identItem,
          deleted: temp.isDeleted,
        })),
        roleList: defaultGet(item, 'roleList', []).map((roleItem) => ({
          ...roleItem,
          deleted: temp.isDeleted,
        })),
        ccrClientIdentificationList: defaultGet(item, 'ccrClientIdentificationList', []).map(
          (ccrItem) => ({ ...ccrItem, deleted: temp.isDeleted })
        ),
        AnswersBO: { ...item.AnswersBO, deleted: temp.isDeleted },
        consentsList: defaultGet(item, 'consentsList', []).map((consentItem) => ({
          ...consentItem,
          deleted: temp.isDeleted,
        })),
        assetsInfoList: defaultGet(item, 'assetsInfoList', []).map((assetItem) => ({
          ...assetItem,
          deleted: temp.isDeleted,
        })),
        atermisResult: { ...item.atermisResult, deleted: temp.isDeleted },
        clientDecision: { ...item.clientDecision, deleted: temp.isDeleted },
        earningsInfoList: defaultGet(item, 'earningsInfoList', []).map((earnItem) => ({
          ...earnItem,
          deleted: temp.isDeleted,
        })),
        liabilitiesInfoList: defaultGet(item, 'liabilitiesInfoList', []).map(
          (liabilitiesInfoItem) => ({ ...liabilitiesInfoItem, deleted: temp.isDeleted })
        ),
        questionList: defaultGet(item, 'questionList', []).map((questionItem) => ({
          ...questionItem,
          deleted: temp.isDeleted,
        })),
        uwmeHistory: { ...item.uwmeHistory, deleted: temp.isDeleted },
      }))
    );
  }
  // CopyFieldConvertor
  filterSet(
    temp,
    'finalClientInfo[0]',
    defaultGet(result, 'businessData.policyList[0].clientInfoList')
  );
  filterSet(temp, 'finalClientInfo[1]', defaultGet(temp, 'deletedClientInfoList'));
  // ListRecordFilter
  if (!newIsEmpty(defaultGet(temp, 'deletedClientInfoList'))) {
    filterSet(temp, 'finalClientInfo', defaultGet(temp, 'finalClientInfo').flat());
  }
  filterSet(
    temp,
    'coverageListIsMain',
    defaultGet(result, 'businessData.policyList[0].coverageList', []).filter(
      (item) => lodash.toString(formUtils.queryValue(item?.isMain)) === 'Y'
    )
  );
  // CopyFieldConvertor
  if (!newIsEmpty(temp.deletedClientInfoList)) {
    filterSet(
      result,
      'businessData.policyList[0].clientInfoList',
      lodash.cloneDeep(defaultGet(temp, 'finalClientInfo'))
    );
  }
  // CopyFieldConvertor
  filterSet(
    temp,
    'coverageListIsMain[0].withdrawalTerm',
    defaultGet(origin, 'requestData.planInfoData.withdrawalTerm')
  );
  // ListRecordFilter
  filterSet(
    result,
    'businessData.policyList[0].clientInfoList',
    lodash.sortBy(defaultGet(result, 'businessData.policyList[0].clientInfoList', []), [
      'customerSeqNo',
    ])
  );
  // FieldOperator
  if (lodash.has(result, 'businessData.policyList[0].mainCoverage')) {
    delete result.businessData.policyList[0].mainCoverage;
  }
  // ConstructReturnObjectConvertor

  return result;
}
export default convert_businessDataFEToBE;
