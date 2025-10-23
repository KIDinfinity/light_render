import lodash from 'lodash';

function accMul(num1, num2) {
  let m = 0,
    s1 = num1.toString(),
    s2 = num2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}

const filterSet = (obj, path, value) => {
  if (!lodash.isNull(value) && !lodash.isUndefined(value)) {
    if ((lodash.isArray(value) || lodash.isObject(value)) && lodash.isEmpty(value)) {
      return;
    }
    lodash.set(obj, path, value);
  }
};
const defaultGet = (obj, path, defaultValue) => {
  const value = lodash.get(obj, path, defaultValue);
  if ((lodash.isNull(value) || lodash.isUndefined(value)) && !lodash.isUndefined(defaultValue)) {
    return defaultValue;
  }
  return value;
};

const newIsEmpty = (data) => {
  if (lodash.isNumber(data)) {
    return false;
  }
  return lodash.isEmpty(data);
};

function convert_clientBEToFESingle(data, region) {
  const temp = {};
  const convertResult = {};
  const origin = lodash.cloneDeep(data);

  // 兼容test
  filterSet(convertResult, 'authorizedSignatory', {});
  //
  filterSet(
    origin,
    'requestData.crtInfoList',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) => lodash.toString(item?.deleted) !== '1'
    )
  );
  filterSet(
    origin,
    'requestData.crsInfoList',
    lodash.filter(
      origin?.requestData?.crsInfoList,
      (item) => lodash.toString(item?.deleted) !== '1'
    )
  );
  const getDeletedContactInfoList = lodash.filter(
    origin?.requestData?.contactInfoList,
    (item) => lodash.toString(item?.deleted) !== '1'
  );

  lodash.set(origin, 'requestData.contactInfoList', getDeletedContactInfoList);
  filterSet(
    origin,
    'requestData.addressList',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.deleted) !== '1'
    )
  );
  //
  filterSet(
    temp,
    'list.addressListC',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.addrType) === 'C'
    )
  );
  filterSet(
    temp,
    'list.addressListB',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.addrType) === 'B'
    )
  );
  filterSet(
    temp,
    'list.addressListR',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.addrType) === 'R'
    )
  );
  filterSet(
    temp,
    'list.addressListI',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.addrType) === 'I'
    )
  );
  filterSet(
    temp,
    'list.addressListY',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.communicationLane) === 'Y'
    )
  );
  filterSet(
    temp,
    'list.addressListE',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.addrType) === 'E'
    )
  );
  filterSet(
    temp,
    'list.addressListUSAndUSA',
    lodash.filter(
      origin?.requestData?.addressList,
      (item) => lodash.toString(item?.addrType) === 'US' && lodash.toString(item?.country) === 'USA'
    )
  );
  filterSet(
    temp,
    'list.contactInfoListSeqNumIncludes1',
    lodash.filter(
      origin?.requestData?.contactInfoList,
      (item) => lodash.toString(item?.contactSeqNum) === '1'
    )
  );
  filterSet(
    temp,
    'list.contactInfoListByContactType',
    lodash.filter(origin?.requestData?.contactInfoList, (item) =>
      ['HM', 'OF', 'FX', 'MB'].includes(item?.contactType)
    )
  );
  filterSet(
    temp,
    'list.crtInfoListByTypeAndCtfType',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) => item?.type === 'S' && !['TN', 'PA', 'SS', 'GS'].includes(item?.ctfType)
    )
  );
  filterSet(
    temp,
    'list.crtInfoListByTypeAndCtfType',
    lodash.filter(
      temp?.list?.crtInfoListByTypeAndCtfType,
      (item) => region === 'ID' || region === 'TH'
    )
  );
  filterSet(
    temp,
    'list.crtInfoListcrfType_TNSSGS_Type_S_CtfCountryCode_ne_USA',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) =>
        lodash.toString(item?.type) === 'S' &&
        lodash.toString(item?.ctfCountryCode) !== 'USA' &&
        ['TN', 'SS', 'GS'].includes(item?.ctfType)
    )
  );
  filterSet(
    temp,
    'list.crtInfoListcrfType_TNSSGS_Type_S_CtfCountryCode_USA',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) =>
        lodash.toString(item?.type) === 'S' &&
        lodash.toString(item?.ctfCountryCode) === 'USA' &&
        ['TN', 'SS', 'GS'].includes(item?.ctfType)
    )
  );
  filterSet(
    temp,
    'list.crtInfoListByType_P',
    lodash.filter(origin?.requestData?.crtInfoList, (item) => lodash.toString(item?.type) === 'P')
  );
  filterSet(
    temp,
    'list.crtInfoListByTypeAndCtfCountryCode2',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) =>
        lodash.toString(item?.type) === 'S' &&
        lodash.toString(item?.ctfCountryCode) === 'RI' &&
        lodash.toString(item?.ctfType) === 'TN'
    )
  );
  filterSet(
    temp,
    'list.crtInfoList_S_TN',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) => lodash.toString(item?.type) === 'S' && lodash.toString(item?.ctfType) === 'TN'
    )
  );
  /** jira MDLTH-3225 */
  filterSet(
    temp,
    'list.crtInfoListcrfType_GC',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) => lodash.toString(item?.ctfType) === 'GC'
    )
  );
  filterSet(
    temp,
    'list.crtInfoListcrfType_TN_CtfCountryCode_USA',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) =>
        lodash.toString(item?.ctfType) === 'TN' && lodash.toString(item?.ctfCountryCode) === 'USA'
    )
  );
  filterSet(
    temp,
    'list.crtInfoListcrfType_TN',
    lodash.filter(
      origin?.requestData?.crtInfoList,
      (item) => lodash.toString(item?.ctfType) === 'TN'
    )
  );
  //
  if (newIsEmpty(temp?.list?.addressListUSAndUSA)) {
    filterSet(
      temp,
      'list.addressListUSAndUSA',
      lodash.filter(
        origin?.requestData?.addressList,
        (item) => lodash.toString(item?.country) === 'USA'
      )
    );
  }
  //
  filterSet(
    temp,
    'requestData.roleList',
    lodash.filter(origin?.requestData?.roleList, (item) => lodash.toString(item?.deleted) !== '1')
  );
  //
  filterSet(convertResult, 'roleList', defaultGet(temp, 'requestData.roleList'));
  filterSet(convertResult, 'isInterestMhit', defaultGet(origin, 'requestData.isInterestMhit'));
  filterSet(convertResult, 'clientDecision', defaultGet(origin, 'requestData.clientDecision'));
  filterSet(
    convertResult,
    'otherInfo.currentMibCodeList',
    defaultGet(origin, 'requestData.currentMibCodeList')
  );
  filterSet(convertResult, 'otherInfo.mibCodeList', defaultGet(origin, 'requestData.mibCodeList'));
  filterSet(convertResult, 'customerSeqNo', defaultGet(convertResult, 'roleList[0].customerSeqNo'));
  filterSet(convertResult, 'fatca', defaultGet(origin, 'requestData.fatca'));
  filterSet(
    convertResult,
    'annualIncomeCurrency',
    defaultGet(origin, 'requestData.annualIncomeCurrency')
  );
  filterSet(convertResult, 'smartClientId', defaultGet(origin, 'requestData.smartClientId'));
  filterSet(
    convertResult,
    'personalInfo.relationshipWithBeneficiary',
    defaultGet(origin, 'requestData.relationshipWithBeneficiary')
  );
  filterSet(convertResult, 'personalInfo.firstName', defaultGet(origin, 'requestData.firstName'));
  filterSet(convertResult, 'personalInfo.kyc', defaultGet(origin, 'requestData.kyc'));
  filterSet(convertResult, 'syncSuccessfully', defaultGet(origin, 'requestData.syncSuccessfully'));
  filterSet(convertResult, 'personalInfo.kycRemark', defaultGet(origin, 'requestData.kycRemark'));
  filterSet(
    convertResult,
    'personalInfo.customerAge',
    defaultGet(origin, 'requestData.customerAge')
  );
  filterSet(convertResult, 'personalInfo.race', defaultGet(origin, 'requestData.race'));
  filterSet(
    convertResult,
    'personalInfo.companyRegistrationNumber',
    defaultGet(origin, 'requestData.companyRegistrationNumber')
  );
  filterSet(
    convertResult,
    'personalInfo.relationOfProposer',
    defaultGet(origin, 'requestData.relationOfProposer')
  );
  filterSet(
    convertResult,
    'personalInfo.relationOfInsured',
    defaultGet(origin, 'requestData.relationOfInsured')
  );
  filterSet(convertResult, 'id', defaultGet(origin, 'requestData.id'));
  filterSet(
    convertResult,
    'cardIssuerCountry',
    defaultGet(origin, 'requestData.cardIssuerCountry')
  );
  filterSet(convertResult, 'crtInfoList', defaultGet(origin, 'requestData.crtInfoList'));
  filterSet(
    convertResult,
    'personalInfo.customerRole',
    defaultGet(convertResult, 'roleList', []).map((item) => item?.customerRole)
  );
  filterSet(convertResult, 'newClientFlag', defaultGet(origin, 'requestData.newClientFlag'));
  filterSet(
    convertResult,
    'personalInfo.customerType',
    defaultGet(origin, 'requestData.customerType')
  );
  filterSet(convertResult, 'personalInfo.ethnic', defaultGet(origin, 'requestData.ethnic'));
  filterSet(convertResult, 'enquiryId', defaultGet(origin, 'requestData.enquiryId'));
  filterSet(convertResult, 'ccrClientId', defaultGet(origin, 'requestData.ccrClientId'));
  filterSet(
    convertResult,
    'checkAmlCloseCase',
    defaultGet(origin, 'requestData.checkAmlCloseCase')
  );
  filterSet(convertResult, 'laClientId', defaultGet(origin, 'requestData.laClientId'));
  filterSet(
    convertResult,
    'personalInfo.customerEnFirstName',
    defaultGet(origin, 'requestData.customerEnFirstName')
  );
  filterSet(convertResult, 'personalInfo.trusteeId', defaultGet(origin, 'requestData.trusteeId'));
  filterSet(convertResult, 'personalInfo.name', defaultGet(origin, 'requestData.name'));
  filterSet(
    convertResult,
    'personalInfo.preferredName',
    defaultGet(origin, 'requestData.preferredName')
  );
  filterSet(
    convertResult,
    'personalInfo.ctfStartDate',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfStartDate')
  );
  filterSet(
    convertResult,
    'personalInfo.expiryDate',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfExpireDate')
  );
  filterSet(
    convertResult,
    'personalInfo.customerEnName',
    defaultGet(origin, 'requestData.customerEnName')
  );
  filterSet(convertResult, 'personalInfo.share', defaultGet(origin, 'requestData.share'));
  filterSet(
    convertResult,
    'personalInfo.beneficiaryType',
    defaultGet(origin, 'requestData.beneficiaryType')
  );
  filterSet(
    convertResult,
    'personalInfo.identityType',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfType')
  );
  filterSet(
    convertResult,
    'personalInfo.tinsssgsis',
    defaultGet(temp, 'list.crtInfoListcrfType_TNSSGS_Type_S_CtfCountryCode_ne_USA[0].ctfType')
  );
  filterSet(
    convertResult,
    'personalInfo.tinsssgsisNo',
    defaultGet(temp, 'list.crtInfoListcrfType_TNSSGS_Type_S_CtfCountryCode_ne_USA[0].ctfId')
  );
  filterSet(convertResult, 'personalInfo.surname', defaultGet(origin, 'requestData.surname'));
  filterSet(convertResult, 'personalInfo.middleName', defaultGet(origin, 'requestData.middleName'));
  filterSet(
    convertResult,
    'personalInfo.ctfType',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfType')
  );
  filterSet(
    convertResult,
    'personalInfo.customerEnMiddleName',
    defaultGet(origin, 'requestData.customerEnMiddleName')
  );
  filterSet(convertResult, 'personalInfo.title', defaultGet(origin, 'requestData.title'));
  filterSet(
    convertResult,
    'personalInfo.extensionName',
    defaultGet(origin, 'requestData.extensionName')
  );
  filterSet(
    convertResult,
    'personalInfo.SecondaryIdentityExpiryDate',
    defaultGet(temp, 'list.crtInfoListByTypeAndCtfType[0].ctfExpireDate')
  );
  filterSet(
    convertResult,
    'personalInfo.isOcrIdCard',
    defaultGet(origin, 'requestData.isOcrIdCard')
  );
  filterSet(
    convertResult,
    'personalInfo.trusteeName',
    defaultGet(origin, 'requestData.trusteeName')
  );
  filterSet(
    convertResult,
    'personalInfo.customerisedTitle',
    defaultGet(origin, 'requestData.customerisedTitle')
  );
  filterSet(
    convertResult,
    'personalInfo.dateOfBirth',
    defaultGet(origin, 'requestData.dateOfBirth')
  );
  filterSet(convertResult, 'personalInfo.gender', defaultGet(origin, 'requestData.gender'));
  filterSet(convertResult, 'personalInfo.bmi', defaultGet(origin, 'requestData.bmi'));
  filterSet(convertResult, 'personalInfo.religion', defaultGet(origin, 'requestData.religion'));
  filterSet(
    convertResult,
    'personalInfo.countryCode',
    defaultGet(temp, 'list.contactInfoListByContactType[0].countryCode')
  );
  filterSet(
    convertResult,
    'personalInfo.SecondaryIdentityNo',
    defaultGet(temp, 'list.crtInfoListByTypeAndCtfType[0].ctfId')
  );
  filterSet(
    convertResult,
    'personalInfo.customerMrgStatus',
    defaultGet(origin, 'requestData.customerMrgStatus')
  );
  filterSet(
    convertResult,
    'personalInfo.identityNo',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfId')
  );
  filterSet(
    convertResult,
    'personalInfo.beneficiarySeqNum',
    defaultGet(origin, 'requestData.beneficiarySeqNum')
  );
  filterSet(
    convertResult,
    'personalInfo.npwp',
    defaultGet(temp, 'list.crtInfoListByTypeAndCtfCountryCode2[0].ctfId')
  );
  filterSet(
    convertResult,
    'personalInfo.entityPolicyOwnerName',
    defaultGet(origin, 'requestData.name')
  );
  filterSet(
    convertResult,
    'personalInfo.additionalIdentificationType',
    defaultGet(origin, 'requestData.otherIdType')
  );
  filterSet(
    convertResult,
    'personalInfo.companyRegistrationNoOld',
    defaultGet(origin, 'requestData.companyRegistrationOldNo')
  );
  filterSet(
    convertResult,
    'personalInfo.SecondaryIdentityType',
    defaultGet(temp, 'list.crtInfoListByTypeAndCtfType[0].ctfType')
  );
  filterSet(
    convertResult,
    'personalInfo.smokingHabit',
    defaultGet(origin, 'requestData.smokingHabit')
  );
  filterSet(
    convertResult,
    'personalInfo.customerEnExtensionName',
    defaultGet(origin, 'requestData.customerEnExtensionName')
  );
  filterSet(
    convertResult,
    'personalInfo.customerEnSurname',
    defaultGet(origin, 'requestData.customerEnSurname')
  );
  filterSet(
    convertResult,
    'personalInfo.designation',
    defaultGet(origin, 'requestData.designation')
  );
  filterSet(
    convertResult,
    'personalInfo.dateOfRegistration',
    defaultGet(origin, 'requestData.dateOfRegistration')
  );
  filterSet(
    convertResult,
    'personalInfo.dateOfIncorporation',
    defaultGet(origin, 'requestData.dateOfIncorporation')
  );
  filterSet(
    convertResult,
    'personalInfo.countryOfIncorporation',
    defaultGet(origin, 'requestData.countryOfIncorporation')
  );
  filterSet(
    convertResult,
    'personalInfo.additionalIdentificationNumber',
    defaultGet(origin, 'requestData.otherIdNumber')
  );
  filterSet(
    convertResult,
    'personalInfo.motherMaidenName',
    defaultGet(origin, 'requestData.motherMaidenName')
  );
  filterSet(convertResult, 'personalInfo.weight', defaultGet(origin, 'requestData.weight'));
  filterSet(convertResult, 'personalInfo.height', defaultGet(origin, 'requestData.height'));
  filterSet(convertResult, 'personalInfo.pepFlag', defaultGet(origin, 'requestData.pepFlag'));
  filterSet(
    convertResult,
    'personalInfo.pepAssoicateFlag',
    defaultGet(origin, 'requestData.pepAssoicateFlag')
  );
  filterSet(
    convertResult,
    'personalInfo.relationshipToPep',
    defaultGet(origin, 'requestData.relationshipToPep')
  );
  filterSet(
    convertResult,
    'personalInfo.bankruptcyFlag',
    defaultGet(origin, 'requestData.bankruptcyFlag')
  );
  filterSet(
    convertResult,
    'personalInfo.bankruptcyDate',
    defaultGet(origin, 'requestData.bankruptcyDate')
  );
  filterSet(
    convertResult,
    'personalInfo.fatcaDropdownValue',
    defaultGet(origin, 'requestData.fatcaDropdownValue')
  );
  filterSet(convertResult, 'personalInfo.fatcaDate', defaultGet(origin, 'requestData.fatcaDate'));
  filterSet(
    convertResult,
    'personalInfo.childRelationshipType',
    defaultGet(origin, 'requestData.childRelationshipType')
  );
  filterSet(convertResult, 'nationalityInfo', {});
  filterSet(
    convertResult,
    'nationalityInfo.ctfPlace',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfPlace')
  );
  filterSet(
    convertResult,
    'nationalityInfo.ctfCountryCode',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfCountryCode')
  );
  filterSet(convertResult, 'newCrs', defaultGet(origin, 'requestData.newCrs'));
  filterSet(convertResult, 'newFatca', defaultGet(origin, 'requestData.newFatca'));
  filterSet(convertResult, 'usFatcaPerson', defaultGet(origin, 'requestData.usFatcaPerson'));
  filterSet(convertResult, 'countryWorkPlace', defaultGet(origin, 'requestData.countryWorkPlace'));
  // ubo info
  filterSet(convertResult, 'companyLegalForm', defaultGet(origin, 'requestData.companyLegalForm'));

  filterSet(
    convertResult,
    'provinceWorkPlace',
    defaultGet(origin, 'requestData.provinceWorkPlace')
  );
  filterSet(
    convertResult,
    'firstRegisterDate',
    defaultGet(origin, 'requestData.firstRegisterDate')
  );
  filterSet(convertResult, 'signDate', defaultGet(origin, 'requestData.signDate'));
  //
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress',
    defaultGet(temp, 'list.addressListUSAndUSA[0].fullAddress')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress7',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address7')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress3',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address3')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress6',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address6')
  );
  filterSet(
    convertResult,
    'nationalityInfo.nationality3',
    defaultGet(origin, 'requestData.nationality3')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress4',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address4')
  );
  filterSet(
    convertResult,
    'nationalityInfo.nationality',
    defaultGet(origin, 'requestData.nationality')
  );
  filterSet(
    convertResult,
    'nationalityInfo.ctfPlace',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfPlace')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceZipCode',
    defaultGet(temp, 'list.addressListUSAndUSA[0].zipCode')
  );
  filterSet(
    convertResult,
    'nationalityInfo.fullAddress',
    defaultGet(temp, 'list.addressListUSAndUSA[0].fullAddress')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress5',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address5')
  );
  filterSet(convertResult, 'nationalityInfo.usaFlag', defaultGet(origin, 'requestData.usaFlag'));
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress1',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address1')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress',
    defaultGet(temp, 'list.addressListUSAndUSA[0].fullAddress')
  );
  filterSet(
    convertResult,
    'nationalityInfo.greenCard',
    defaultGet(origin, 'requestData.greenCard')
  );
  filterSet(
    convertResult,
    'nationalityInfo.usResidenceAddress2',
    defaultGet(temp, 'list.addressListUSAndUSA[0].address2')
  );
  filterSet(
    convertResult,
    'nationalityInfo.countryOfResident',
    defaultGet(origin, 'requestData.countryOfResident')
  );
  filterSet(
    convertResult,
    'nationalityInfo.passportGreenCardNo',
    defaultGet(origin, 'requestData.passportGreenCardNo')
  );
  filterSet(
    convertResult,
    'nationalityInfo.nationality2',
    defaultGet(origin, 'requestData.nationality2')
  );
  filterSet(
    convertResult,
    'nationalityInfo.ctfCountryCode',
    defaultGet(temp, 'list.crtInfoListByType_P[0].ctfCountryCode')
  );
  filterSet(
    convertResult,
    'nationalityInfo.malaysianPR',
    defaultGet(origin, 'requestData.malaysianPR')
  );
  filterSet(convertResult, 'personalInfo.titleOfPep', defaultGet(origin, 'requestData.titleOfPep'));
  //
  filterSet(
    convertResult,
    'financialInfo.indisiaReason',
    defaultGet(origin, 'requestData.indisiaReason')
  );
  filterSet(
    convertResult,
    'financialInfo.annualPremEquivalent',
    defaultGet(origin, 'requestData.annualPremEquivalent')
  );
  filterSet(
    convertResult,
    'financialInfo.monthlyIncomeRange',
    defaultGet(origin, 'requestData.monthlyIncomeRange')
  );
  filterSet(
    convertResult,
    'financialInfo.annualIncome',
    defaultGet(origin, 'requestData.annualIncome')
  );
  filterSet(
    convertResult,
    'financialInfo.sourceOfWealth',
    defaultGet(origin, 'requestData.sourceOfWealth')
  );
  filterSet(
    convertResult,
    'financialInfo.monthlyIncome',
    defaultGet(origin, 'requestData.monthlyIncome')
  );
  filterSet(
    convertResult,
    'financialInfo.annualIncomeCurrency',
    defaultGet(origin, 'requestData.annualIncomeCurrency')
  );
  filterSet(
    convertResult,
    'financialInfo.incomeRange',
    defaultGet(origin, 'requestData.incomeRange')
  );
  filterSet(convertResult, 'financialInfo.usTaxFlag', defaultGet(origin, 'requestData.usTaxFlag'));
  filterSet(
    convertResult,
    'financialInfo.otherSource',
    defaultGet(origin, 'requestData.otherSource')
  );
  filterSet(
    convertResult,
    'financialInfo.sourceOfFund',
    defaultGet(origin, 'requestData.sourceOfFund')
  );
  filterSet(convertResult, 'financialInfo.tsarPI', defaultGet(origin, 'requestData.tsarPI'));
  filterSet(convertResult, 'financialInfo.tsarPH', defaultGet(origin, 'requestData.tsarPH'));
  filterSet(
    convertResult,
    'financialInfo.noTin',
    defaultGet(temp, 'list.crtInfoList_S_TN[0].noTin')
  );
  filterSet(
    convertResult,
    'financialInfo.ctfId',
    defaultGet(temp, 'list.crtInfoListcrfType_TNSSGS_Type_S_CtfCountryCode_USA[0].ctfId')
  );
  //
  filterSet(convertResult, 'contactInfoKH', {});
  filterSet(convertResult, 'contactInfoKH.email', defaultGet(origin, 'requestData.email'));
  filterSet(convertResult, 'contactInfoKH.whatsApp', defaultGet(origin, 'requestData.whatsApp'));
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress6',
    defaultGet(temp, 'list.addressListR[0].address6')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress7',
    defaultGet(temp, 'list.addressListR[0].country')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress7',
    defaultGet(temp, 'list.addressListB[0].country')
  );
  filterSet(convertResult, 'contactInfoKH.address3', defaultGet(origin, 'requestData.address3'));
  filterSet(convertResult, 'contactInfoKH.language', defaultGet(origin, 'requestData.language'));
  filterSet(
    convertResult,
    'contactInfoKH.entityPOBusinessAddress',
    defaultGet(temp, 'list.addressListB[0].fullAddress')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress2',
    defaultGet(temp, 'list.addressListR[0].address2')
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      contactType: item?.contactType,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      countryCode: item?.countryCode,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      areaCode: item?.areaCode,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      contactSeqNum: item?.contactSeqNum,
    }))
  );
  filterSet(convertResult, 'contactInfoKH.telegram', defaultGet(origin, 'requestData.telegram'));
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      id: item?.id,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      addrType: item?.addrType,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      address1: item?.address1,
      fullAddress: item?.fullAddress || convertResult?.addressInfoList?.[index]?.fullAddress,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      address2: item?.address2,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      address3: item?.address3,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      address4: item?.address4,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      address5: item?.address5,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      address6: item?.address6,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      country: item?.country,
    }))
  );
  filterSet(
    convertResult,
    'addressInfoList',
    defaultGet(origin, 'requestData.addressList', []).map((item, index) => ({
      ...convertResult?.addressInfoList?.[index],
      zipCode: item?.zipCode,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoKH.workNumber',
    defaultGet(origin, 'requestData.workNumber')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress3',
    defaultGet(temp, 'list.addressListR[0].address3')
  );
  filterSet(
    convertResult,
    'contactInfoKH.homeNumber',
    defaultGet(origin, 'requestData.homeNumber')
  );
  filterSet(
    convertResult,
    'contactInfoKH.country',
    defaultGet(temp, 'list.contactInfoListSeqNumIncludes1[0].countryCode')
  );
  filterSet(
    convertResult,
    'contactInfoKH.countryCode',
    defaultGet(temp, 'list.contactInfoListByContactType[0].countryCode')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress6',
    defaultGet(temp, 'list.addressListB[0].address6')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress2',
    defaultGet(temp, 'list.addressListB[0].address2')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress',
    defaultGet(temp, 'list.addressListB[0].fullAddress')
  );
  filterSet(
    convertResult,
    'contactInfoKH.currentAddress',
    defaultGet(temp, 'list.addressListC[0].fullAddress')
  );
  filterSet(
    convertResult,
    'contactInfoKH.currentZipCode',
    defaultGet(temp, 'list.addressListC[0].zipCode')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress5',
    defaultGet(temp, 'list.addressListB[0].address5')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialZipCode',
    defaultGet(temp, 'list.addressListR[0].zipCode')
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      contactNo: item?.contactNo,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress1',
    defaultGet(temp, 'list.addressListB[0].address1')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress4',
    defaultGet(temp, 'list.addressListB[0].address4')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessZipCode',
    defaultGet(temp, 'list.addressListB[0].zipCode')
  );
  filterSet(
    convertResult,
    'contactInfoKH.secondaryContactNo',
    defaultGet(temp, 'list.contactInfoListByContactType[0].contactNo')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress4',
    defaultGet(temp, 'list.addressListR[0].address4')
  );
  filterSet(
    convertResult,
    'contactInfoKH.businessAddress3',
    defaultGet(temp, 'list.addressListB[0].address3')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress',
    defaultGet(temp, 'list.addressListR[0].fullAddress')
  );
  filterSet(
    convertResult,
    'contactInfoKH.communicationLane',
    defaultGet(temp, 'list.addressListY[0].addrType')
  );
  filterSet(convertResult, 'contactInfoKH.phoneNo', defaultGet(origin, 'requestData.phoneNo'));
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress1',
    defaultGet(temp, 'list.addressListR[0].address1')
  );
  filterSet(
    convertResult,
    'contactInfoKH.identityZipCode',
    defaultGet(temp, 'list.addressListI[0].zipCode')
  );
  filterSet(
    convertResult,
    'contactInfoKH.identityAddress',
    defaultGet(temp, 'list.addressListI[0].fullAddress')
  );
  filterSet(
    convertResult,
    'contactInfoKH.residentialAddress5',
    defaultGet(temp, 'list.addressListR[0].address5')
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      countryCode: item?.countryCode,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoKH.residedDurationInd',
    defaultGet(origin, 'requestData.residedDurationInd')
  );
  filterSet(
    convertResult,
    'contactInfoKH.entityPolicyOwnerBusinessAddress',
    defaultGet(temp, 'list.addressListB[0].country')
  );
  filterSet(
    convertResult,
    'contactInfoKH.phoneNoReadOnly',
    defaultGet(temp, 'list.contactInfoListSeqNumIncludes1[0].contactNo')
  );
  filterSet(
    convertResult,
    'contactInfoKH.correspondenceViaEmail',
    defaultGet(origin, 'requestData.correspondenceViaEmail')
  );
  filterSet(
    convertResult,
    'contactInfoKH.secondaryContactType',
    defaultGet(temp, 'list.contactInfoListByContactType[0].contactType')
  );
  filterSet(
    convertResult,
    'contactInfoKH.fullAddress',
    defaultGet(temp, 'list.addressListUSAndUSA[0].fullAddress')
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      countryName: item?.countryName,
    }))
  );
  filterSet(
    convertResult,
    'contactInfoList',
    defaultGet(temp, 'list.contactInfoListByContactType', []).map((item, index) => ({
      ...convertResult?.contactInfoList?.[index],
      id: item?.id,
    }))
  );
  //
  filterSet(convertResult, 'backgroundInfo', {});
  filterSet(
    convertResult,
    'backgroundInfo.exactAffiliation2List',
    defaultGet(origin, 'requestData.exactAffiliation2List')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupation',
    defaultGet(origin, 'requestData.occupation')
  );
  filterSet(convertResult, 'backgroundInfo.ckaFlag', defaultGet(origin, 'requestData.ckaFlag'));
  filterSet(
    convertResult,
    'backgroundInfo.nameOfBusinessEmployer',
    defaultGet(origin, 'requestData.nameOfBusinessEmployer')
  );
  filterSet(
    convertResult,
    'backgroundInfo.nameOfBusinessEmployer',
    defaultGet(origin, 'requestData.nameOfBusinessEmployer')
  );
  filterSet(
    convertResult,
    'backgroundInfo.industryAffiliation2',
    defaultGet(origin, 'requestData.industryAffiliation2')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationGroup',
    defaultGet(origin, 'requestData.occupationGroup')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationGroupSecondary',
    defaultGet(origin, 'requestData.occupationGroupSecondary')
  );
  filterSet(
    convertResult,
    'backgroundInfo.entityAffiliation',
    defaultGet(origin, 'requestData.entityAffiliation')
  );
  filterSet(
    convertResult,
    'backgroundInfo.exactAffiliation1',
    defaultGet(origin, 'requestData.exactAffiliation1')
  );
  filterSet(
    convertResult,
    'backgroundInfo.englishProficiency',
    defaultGet(origin, 'requestData.englishProficiency')
  );
  filterSet(
    convertResult,
    'backgroundInfo.exactAffiliation1List',
    defaultGet(origin, 'requestData.exactAffiliation1List')
  );
  filterSet(
    convertResult,
    'backgroundInfo.positionDescription',
    defaultGet(origin, 'requestData.positionDescription')
  );
  filterSet(
    convertResult,
    'backgroundInfo.natureOfBusiness',
    defaultGet(origin, 'requestData.natureOfBusiness')
  );
  filterSet(
    convertResult,
    'backgroundInfo.natureOfBusinessSecondary',
    defaultGet(origin, 'requestData.natureOfBusinessSecondary')
  );
  filterSet(convertResult, 'backgroundInfo.position', defaultGet(origin, 'requestData.position'));
  filterSet(
    convertResult,
    'backgroundInfo.employmentStatus',
    defaultGet(origin, 'requestData.employmentStatus')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationClass',
    defaultGet(origin, 'requestData.occupationClass')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationClassSecondary',
    defaultGet(origin, 'requestData.occupationClassSecondary')
  );
  filterSet(
    convertResult,
    'backgroundInfo.addRccOccupationClass',
    defaultGet(origin, 'requestData.addRccOccupationClass')
  );
  filterSet(
    convertResult,
    'backgroundInfo.paOccupationClass',
    defaultGet(origin, 'requestData.paOccupationClass')
  );
  filterSet(
    convertResult,
    'backgroundInfo.addRccOccupationClassSecondary',
    defaultGet(origin, 'requestData.addRccOccupationClassSecondary')
  );
  filterSet(
    convertResult,
    'backgroundInfo.paOccupationClassSecondary',
    defaultGet(origin, 'requestData.paOccupationClassSecondary')
  );
  filterSet(convertResult, 'backgroundInfo.unitsName', defaultGet(origin, 'requestData.unitsName'));
  filterSet(
    convertResult,
    'backgroundInfo.occupationSector',
    defaultGet(origin, 'requestData.occupationSector')
  );
  filterSet(
    convertResult,
    'backgroundInfo.companyName',
    defaultGet(origin, 'requestData.companyName')
  );
  filterSet(
    convertResult,
    'backgroundInfo.industryAffiliation1',
    defaultGet(origin, 'requestData.industryAffiliation1')
  );
  filterSet(
    convertResult,
    'backgroundInfo.educationCode',
    defaultGet(origin, 'requestData.educationCode')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationSubGroup',
    defaultGet(origin, 'requestData.occupationSubGroup')
  );
  filterSet(
    convertResult,
    'backgroundInfo.exactAffiliation2',
    defaultGet(origin, 'requestData.exactAffiliation2')
  );
  filterSet(
    convertResult,
    'backgroundInfo.nonIncomeEarnerType',
    defaultGet(origin, 'requestData.nonIncomeEarnerType')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationCode',
    defaultGet(origin, 'requestData.occupationCode')
  );
  filterSet(
    convertResult,
    'backgroundInfo.occupationSecondary',
    defaultGet(origin, 'requestData.occupationSecondary')
  );
  filterSet(
    convertResult,
    'backgroundInfo.annualIncomeCurrency',
    defaultGet(origin, 'requestData.annualIncomeCurrency')
  );
  filterSet(
    convertResult,
    'backgroundInfo.annualIncomeCurrencySecondary',
    defaultGet(origin, 'requestData.annualIncomeCurrency')
  );
  filterSet(convertResult, 'backgroundInfo.staffId', defaultGet(origin, 'requestData.staffId'));
  filterSet(
    convertResult,
    'backgroundInfo.annualIncome',
    defaultGet(origin, 'requestData.annualIncome')
  );
  filterSet(
    convertResult,
    'backgroundInfo.secondaryAnnualIncome',
    defaultGet(origin, 'requestData.secondaryAnnualIncome')
  );
  filterSet(
    convertResult,
    'backgroundInfo.holdingPercentage',
    defaultGet(origin, 'requestData.holdingPercentage')
  );

  filterSet(
    convertResult,
    'authorizedSignatory.authorizedRepresentative',
    defaultGet(origin, 'requestData.authorizedRepresentative')
  );
  filterSet(
    convertResult,
    'authorizedSignatory.representativeIdType',
    defaultGet(origin, 'requestData.representativeIdType')
  );
  filterSet(
    convertResult,
    'authorizedSignatory.representativeIdNo',
    defaultGet(origin, 'requestData.representativeIdNo')
  );
  filterSet(
    convertResult,
    'authorizedSignatory.representativeIdExpiryDate',
    defaultGet(origin, 'requestData.representativeIdExpiryDate')
  );
  filterSet(
    convertResult,
    'authorizedSignatory.representativePosition',
    defaultGet(origin, 'requestData.representativePosition')
  );
  filterSet(
    convertResult,
    'otherInfo.passionSurvey',
    defaultGet(origin, 'requestData.passionSurvey')
  );
  filterSet(
    convertResult,
    'otherInfo.otherPassionSurvey',
    defaultGet(origin, 'requestData.otherPassionSurvey')
  );
  filterSet(
    convertResult,
    'otherInfo.otherContract',
    defaultGet(origin, 'requestData.otherContract')
  );
  filterSet(
    convertResult,
    'otherInfo.numberOfPoliciesOrClaimsInOtherComp',
    defaultGet(origin, 'requestData.numberOfPoliciesOrClaimsInOtherComp')
  );
  filterSet(
    convertResult,
    'otherInfo.numberOfOtherCompany',
    defaultGet(origin, 'requestData.numberOfOtherCompany')
  );
  filterSet(convertResult, 'otherInfo.ocrFlag', defaultGet(origin, 'requestData.ocrFlag'));
  filterSet(convertResult, 'otherInfo.rbaScore', defaultGet(origin, 'requestData.rbaScore'));
  filterSet(
    convertResult,
    'otherInfo.vulnerableCustomerTag',
    defaultGet(origin, 'requestData.vulnerableCustomerTag')
  );
  filterSet(
    convertResult,
    'otherInfo.vulnerableCustomerOption',
    defaultGet(origin, 'requestData.vulnerableCustomerOption')
  );
  filterSet(
    convertResult,
    'otherInfo.consentProcessing',
    defaultGet(origin, 'requestData.consentsList[0].consentProcessing')
  );
  filterSet(
    convertResult,
    'otherInfo.agreement',
    defaultGet(origin, 'requestData.consentsList[0].agreement')
  );
  filterSet(
    convertResult,
    'otherInfo.promotionsBy',
    defaultGet(origin, 'requestData.consentsList[0].promotionsBy')
  );
  filterSet(
    convertResult,
    'otherInfo.specify',
    defaultGet(origin, 'requestData.consentsList[0].specify')
  );
  filterSet(
    convertResult,
    'otherInfo.legalRepresentativeUuids',
    defaultGet(origin, 'requestData.legalRepresentativeUuids')
  );
  //
  filterSet(
    temp,
    'list.clientId_coverageInsuredList',
    lodash.filter(
      origin?.requestData?.coverageInsuredList,
      (item) =>
        lodash.toString(origin?.requestData?.id) === lodash.toString(item?.clientId) &&
        lodash.toString(item?.unionInsuredSeqNum) !== ''
    )
  );
  //
  filterSet(
    temp,
    'list.clientId_coverageInsuredList',
    lodash.map(temp?.list?.clientId_coverageInsuredList, (item) => ({
      ...item,
      unionInsuredSeqNum: lodash.toNumber(item?.unionInsuredSeqNum),
    }))
  );
  //
  filterSet(
    temp,
    'list.unionInsuredSeqNum_1_coverageInsuredList',
    lodash.filter(temp?.list?.clientId_coverageInsuredList, (item) => item?.unionInsuredSeqNum >= 1)
  );
  //
  if (newIsEmpty(temp?.list?.unionInsuredSeqNum_1_coverageInsuredList)) {
    filterSet(convertResult, 'isJointLifeClient', true);
  }
  if (
    lodash.isNull(temp?.list?.unionInsuredSeqNum_1_coverageInsuredList) ||
    newIsEmpty(temp?.list?.unionInsuredSeqNum_1_coverageInsuredList)
  ) {
    filterSet(convertResult, 'isJointLifeClient', false);
  }
  //
  filterSet(convertResult, 'isJointLifeClient', !!convertResult?.isJointLifeClient);
  //
  if (region === 'ID' && !newIsEmpty(convertResult?.financialInfo?.monthlyIncome)) {
    filterSet(
      convertResult,
      'financialInfo.monthlyIncome',
      accMul(lodash.toNumber(convertResult?.financialInfo?.monthlyIncome), 0.000001)
    );
  }

  if (region === 'ID' && !newIsEmpty(convertResult?.financialInfo?.annualIncome)) {
    filterSet(
      convertResult,
      'financialInfo.annualIncome',
      accMul(lodash.toNumber(convertResult?.financialInfo?.annualIncome), 0.000001)
    );
  }
  // jira MDLTH-3225
  filterSet(
    convertResult,
    'personalInfo.lifelongIndicator',
    defaultGet(temp, 'list.crtInfoListByType_P[0].lifelongIndicator')
  );
  filterSet(
    convertResult,
    'fatcaInfo.greenCardId',
    defaultGet(temp, 'list.crtInfoListcrfType_GC[0].ctfId')
  );
  filterSet(
    convertResult,
    'fatcaInfo.greenCardExpireDate',
    defaultGet(temp, 'list.crtInfoListcrfType_GC[0].ctfExpireDate')
  );
  filterSet(
    convertResult,
    'fatcaInfo.ctfId',
    defaultGet(temp, 'list.crtInfoListcrfType_TN_CtfCountryCode_USA[0].ctfId')
  );
  filterSet(
    convertResult,
    'fatcaInfo.ctfExpireDate',
    defaultGet(temp, 'list.crtInfoListcrfType_TN_CtfCountryCode_USA[0].ctfExpireDate')
  );
  // jira MDLTH-3007 start
  filterSet(convertResult, 'riskIndicator.alertId', defaultGet(origin, 'requestData.alertId'));
  filterSet(
    convertResult,
    'riskIndicator.crrAlertId',
    defaultGet(origin, 'requestData.crrAlertId')
  );
  filterSet(
    convertResult,
    'riskIndicator.fecRiskMsg',
    defaultGet(origin, 'requestData.riskIndicatorList', [])?.find(
      (item) => item.riskFactorCode === 'AML'
    )?.fecRiskMsg
  );
  filterSet(
    convertResult,
    'riskIndicator.riskLevel',
    defaultGet(origin, 'requestData.riskIndicatorList', [])?.find(
      (item) => item.riskFactorCode === 'CRR'
    )?.riskLevel
  );
  // jira MDLTH-3007 end
  return convertResult;
}

function convert_businessDataBEToFE(data, region) {
  const temp = {};
  const responseData = {};
  const machineResult = [];
  const origin = lodash.cloneDeep(data);

  // 兼容test
  filterSet(responseData, 'policyReplacement.replacementFirstInfo', {});
  filterSet(responseData, 'policyReplacement.replacementLastInfo', {});
  filterSet(responseData, 'fund', {});
  filterSet(responseData, 'fund.fundBaseInfo', {});

  //
  filterSet(
    temp,
    'list.coverageListY',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.coverageList,
      (item) => lodash.toString(item?.isMain) === 'Y'
    )
  );
  filterSet(
    origin,
    'requestData.policyList[0].clientInfoList',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.clientInfoList,
      (item) => lodash.toString(item?.deleted) !== '1'
    ) || []
  );
  filterSet(
    origin,
    'requestData.policyList[0].replacementInfoList',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.replacementInfoList,
      (item) => lodash.toString(item?.deleted) !== '1'
    ) || []
  );

  filterSet(
    temp,
    'coverageBenefitsItemY',
    lodash.filter(
      temp?.list?.coverageListY?.[0]?.coverageBenefitsList,
      (item) =>
        lodash.toString(item?.coverageId) === lodash.toString(temp?.list?.coverageListY?.[0]?.id)
    )
  );

  filterSet(
    temp,
    'list.coverageListYId',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.coverageList,
      (item) =>
        lodash.toString(item?.isMain) === 'Y' &&
        lodash.toString(item?.id) === lodash.toString(origin?.requestData?.policyList?.[0]?.id)
    )
  );
  filterSet(
    temp,
    'list.coverageListRT',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.coverageList,
      (item) => lodash.toString(item?.productType) === 'RT'
    )
  );
  filterSet(
    temp,
    'list.uwPremiumStatusTrackList',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.uwPremiumStatusTrackList,
      (item) => lodash.toString(item?.receiptNo) !== ''
    )
  );

  //
  filterSet(
    temp,
    'list.uwProposalHealthFamilySharingList',
    lodash.filter(
      origin?.requestData?.policyList?.[0]?.coverageList,
      (item) => !lodash.isNull(item?.uwProposalHealthFamilySharing)
    )
  );
  //
  filterSet(
    temp,
    'list.loopMachineRequestList',
    lodash.map(origin?.requestData?.policyList?.[0]?.clientInfoList, (item) => ({ id: item?.id }))
  );
  filterSet(
    responseData,
    'planInfoData',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0]'))
  );
  filterSet(
    responseData,
    'planInfoData.proposalDate',
    defaultGet(origin, 'requestData.proposalDate')
  );
  filterSet(
    responseData,
    'planInfoData.purposeOfInsurance',
    defaultGet(origin, 'requestData.purposeOfInsurance')
  );
  filterSet(
    responseData,
    'planInfoData.applicationSignedDate',
    defaultGet(origin, 'requestData.applicationSignedDate')
  );
  filterSet(
    responseData,
    'planInfoData.applicationPlaceOfSigning',
    defaultGet(origin, 'requestData.applicationPlaceOfSigning')
  );
  filterSet(
    responseData,
    'planInfoData.fillerPipIndicator',
    defaultGet(origin, 'requestData.fillerPipIndicator')
  );
  filterSet(
    responseData,
    'planInfoData.communicationPreference',
    defaultGet(origin, 'requestData.communicationPreference')
  );
  filterSet(
    responseData,
    'planInfoData.customerSubmitDate',
    defaultGet(origin, 'requestData.customerSubmitDate')
  );
  filterSet(
    responseData,
    'planInfoData.otherPurpose',
    defaultGet(origin, 'requestData.otherPurpose')
  );
  filterSet(
    responseData,
    'planInfoData.applyWaitingPeriod',
    defaultGet(origin, 'requestData.applyWaitingPeriod')
  );
  filterSet(responseData, 'planInfoData.facType', defaultGet(origin, 'requestData.facType'));
  filterSet(responseData, 'planInfoData.eDocument', defaultGet(origin, 'requestData.eDocument'));
  filterSet(
    responseData,
    'planInfoData.isContinuePremiumPay',
    defaultGet(origin, 'requestData.isContinuePremiumPay')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyFullAddress',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].fullAddress')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyZipCode',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].zipCode')
  );
  filterSet(
    responseData,
    'planInfoData.basePremium',
    defaultGet(temp, 'list.coverageListRT[0].basePremium')
  );
  filterSet(
    responseData,
    'planInfoData.withdrawalTerm',
    defaultGet(temp, 'list.coverageListY[0].withdrawalTerm')
  );
  filterSet(
    temp,
    'list.coverageListY[0].initialInvestmentAnnualPremium',
    defaultGet(origin, 'requestData.policyList[0].initialInvestmentAnnualPremium')
  );
  filterSet(
    responseData,
    'planInfoData.proposalDate',
    defaultGet(origin, 'requestData.proposalDate')
  );
  filterSet(
    responseData,
    'planInfoData.proposalDate',
    defaultGet(origin, 'requestData.proposalDate')
  );
  filterSet(
    responseData,
    'planInfoData.submissionDate',
    defaultGet(origin, 'requestData.submissionDate')
  );
  filterSet(
    responseData,
    'planInfoData.possibleSusOptNames',
    defaultGet(origin, 'requestData.possibleSusOptNames')
  );
  filterSet(
    responseData,
    'planInfoData.preDefineDecision',
    defaultGet(origin, 'requestData.preDefineDecision')
  );
  filterSet(responseData, 'planInfoData.mainCoverage', defaultGet(temp, 'list.coverageListY[0]'));
  filterSet(responseData, 'planInfoData.caseType', defaultGet(origin, 'requestData.caseType'));
  filterSet(
    responseData,
    'planInfoData.PolicyAddress7',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].countryCode')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyAddress6',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].addressLine6')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyAddress5',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].addressLine5')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyAddress4',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].addressLine4')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyAddress3',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].addressLine3')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyAddress2',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].addressLine2')
  );
  filterSet(
    responseData,
    'planInfoData.PolicyAddress1',
    defaultGet(origin, 'requestData.policyList[0].policyAddressList[0].addressLine1')
  );
  filterSet(
    responseData,
    'planInfoData.firstPolicyFlag',
    defaultGet(
      temp,
      'uwProposalHealthFamilySharingList[0].uwProposalHealthFamilySharing.firstPolicyFlag'
    )
  );
  filterSet(
    responseData,
    'planInfoData.premiumType',
    defaultGet(temp, 'coverageBenefitsItemY[0].premiumType')
  );

  filterSet(responseData, 'caseCategory', defaultGet(origin, 'requestData.caseCategory'));
  filterSet(
    responseData,
    'sustainabilityOptions',
    defaultGet(origin, 'requestData.sustainabilityOptions')
  );
  filterSet(
    responseData,
    'possibleSusOptIdAndNameList',
    defaultGet(origin, 'requestData.possibleSusOptIdAndNameList')
  );
  filterSet(
    responseData,
    'customizeSusOptIdList',
    defaultGet(origin, 'requestData.customizeSusOptIdList')
  );
  filterSet(responseData, 'failCloseEnquiry', defaultGet(origin, 'requestData.failCloseEnquiry'));
  filterSet(responseData, 'policyId', defaultGet(origin, 'requestData.policyList[0].policyId'));
  filterSet(
    responseData,
    'policyStatus',
    defaultGet(origin, 'requestData.policyList[0].policyStatus')
  );
  filterSet(
    responseData,
    'laPolicyStatus',
    defaultGet(origin, 'requestData.policyList[0].laPolicyStatus')
  );
  filterSet(
    responseData,
    'cfgRegionalDefaultValueList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.cfgRegionalDefaultValueList'))
  );
  filterSet(
    responseData,
    'riskIndicatorConfigList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.riskIndicatorConfigList'))
  );
  filterSet(
    responseData,
    'cardIssuerCountry',
    defaultGet(origin, 'requestData.policyList[0].cardIssuerCountry')
  );

  //
  filterSet(
    responseData,
    'chequeInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].chequeInfoList'))
  );
  //
  filterSet(
    responseData,
    'charityOrganizationList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].charityOrganizationList'))
  );
  //
  filterSet(
    temp,
    'list.coverageListY',
    lodash.map(temp?.list?.coverageListY, (item) => ({
      ...item,
      initialInvestmentAnnualPremium: defaultGet(
        origin,
        'requestData.policyList[0].initialInvestmentAnnualPremium'
      ),
    }))
  );
  //
  filterSet(
    responseData,
    'coverageList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].coverageList'))
  );

  //
  filterSet(
    responseData,
    'fund.fundInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].fundInfo.totalFundInfoList'))
  );
  filterSet(
    responseData,
    'fund.fundBaseInfo.autoRebalancingStatus',
    defaultGet(origin, 'requestData.policyList[0].fundInfo.autoRebalancingStatus')
  );
  filterSet(
    responseData,
    'fund.fundBaseInfo.autoRebalancingType',
    defaultGet(origin, 'requestData.policyList[0].fundInfo.autoRebalancingType')
  );
  filterSet(
    responseData,
    'fund.fundBaseInfo.portfolioId',
    defaultGet(origin, 'requestData.policyList[0].fundInfo.portfolioId')
  );
  filterSet(
    responseData,
    'fund.fundBaseInfo.portfolioType',
    defaultGet(origin, 'requestData.policyList[0].fundInfo.portfolioType')
  );
  filterSet(
    responseData,
    'fund.fundBaseInfo.ulReserveUnitDate',
    defaultGet(origin, 'requestData.policyList[0].fundInfo.ulReserveUnitDate')
  );
  //
  filterSet(
    responseData,
    'agentList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.agentList'))
  );
  //
  filterSet(
    responseData,
    'clientInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].clientInfoList'))
  );
  //
  filterSet(
    responseData,
    'premiumPaymentCfgList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].premiumPaymentCfgList'))
  );
  //
  filterSet(
    responseData,
    'policyDecision',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].policyDecision'))
  );
  //
  filterSet(
    responseData,
    'policyExclusionList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].policyExclusionList'))
  );
  //
  filterSet(
    responseData,
    'premiumBreakdownBOList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].premiumBreakdownBOList'))
  );
  //
  filterSet(
    responseData,
    'loanDetailList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].loanInfoList[0].loanDetailList'))
  );
  //
  filterSet(
    responseData,
    'policyReplacement.policyReplacementFlag',
    defaultGet(origin, 'requestData.policyList[0].policyReplacementFlag')
  );
  filterSet(
    responseData,
    'policyReplacement.gsIndicator',
    defaultGet(origin, 'requestData.policyList[0].gsIndicator')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].replacementInfoList', []))
  );
  filterSet(
    responseData,
    'policyReplacement.replacementLastInfo.comment',
    defaultGet(origin, 'requestData.policyList[0].replacementInfoList[0].comment')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementLastInfo.partyInfluence',
    defaultGet(origin, 'requestData.policyList[0].replacementInfoList[0].partyInfluence')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementLastInfo.satisfiedExplanation',
    defaultGet(origin, 'requestData.policyList[0].replacementInfoList[0].satisfiedExplanation')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementLastInfo.extensionToExistingProduct',
    defaultGet(
      origin,
      'requestData.policyList[0].replacementInfoList[0].extensionToExistingProduct'
    )
  );
  filterSet(
    responseData,
    'policyReplacement.replacementFirstInfo.paidByPolicyLoan',
    defaultGet(origin, 'requestData.policyList[0].paidByPolicyLoan')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementFirstInfo.replaceInforce',
    defaultGet(origin, 'requestData.policyList[0].replaceInforce')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementFirstInfo.inforcePolicy',
    defaultGet(origin, 'requestData.policyList[0].inforcePolicy')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementFirstInfo.reinstatablePolicy',
    defaultGet(origin, 'requestData.policyList[0].reinstatablePolicy')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementFirstInfo.replaceWithApplyFor',
    defaultGet(origin, 'requestData.policyList[0].replaceWithApplyFor')
  );
  filterSet(
    responseData,
    'policyReplacement.replacementInfoList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].replacementInfoList'))
  );
  filterSet(
    responseData,
    'premiumTransferList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].premiumTransferList'))
  );
  //
  filterSet(responseData, 'takeOver', {});
  filterSet(
    responseData,
    'takeOver.takeOverList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.takeOverList'))
  );
  filterSet(responseData, 'takeOver.takeOverFlag', defaultGet(origin, 'requestData.takeOverFlag'));
  //
  filterSet(
    responseData,
    'policyAddressList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].policyAddressList'))
  );
  //
  if (lodash.has(responseData?.planInfoData, 'clientInfoList')) {
    delete responseData.planInfoData.clientInfoList;
  }
  if (lodash.has(responseData?.planInfoData, 'coverageList')) {
    delete responseData.planInfoData.coverageList;
  }
  if (lodash.has(responseData?.planInfoData, 'paymentList')) {
    delete responseData.planInfoData.paymentList;
  }
  if (lodash.has(responseData?.planInfoData, 'policyAddressList')) {
    delete responseData.planInfoData.policyAddressList;
  }
  if (lodash.has(responseData?.planInfoData, 'policyDecision')) {
    delete responseData.planInfoData.policyDecision;
  }
  if (lodash.has(responseData?.planInfoData, 'premiumBreakdownBOList')) {
    delete responseData.planInfoData.premiumBreakdownBOList;
  }
  if (lodash.has(responseData?.planInfoData, 'uwPremiumStatusTrackList')) {
    delete responseData.planInfoData.uwPremiumStatusTrackList;
  }
  if (lodash.has(responseData?.planInfoData, 'premiumPaymentCfgList')) {
    delete responseData.planInfoData.premiumPaymentCfgList;
  }
  if (lodash.has(responseData?.planInfoData, 'fundInfo')) {
    delete responseData.planInfoData.fundInfo;
  }
  //
  filterSet(
    responseData,
    'paymentList[0].paymentReferenceNo',
    lodash
      .get(temp, 'list.uwPremiumStatusTrackList', [])
      .map((item) => lodash.toString(item?.receiptNo))
      .join(',')
  );
  //
  filterSet(
    responseData,
    'paymentList',
    lodash.cloneDeep(defaultGet(origin, 'requestData.policyList[0].paymentList'))
  );
  filterSet(
    responseData,
    'paymentList[0].paidAmount',
    defaultGet(origin, 'requestData.policyList[0].paidAmount')
  );
  filterSet(
    responseData,
    'paymentList[0].paymentOption',
    defaultGet(origin, 'requestData.policyList[0].paymentOption')
  );
  filterSet(
    responseData,
    'paymentList[0].haveCreditCard',
    defaultGet(origin, 'requestData.policyList[0].haveCreditCard')
  );
  filterSet(
    responseData,
    'paymentList[0].policyInitialPremium',
    defaultGet(origin, 'requestData.policyList[0].policyInitialPremium')
  );
  filterSet(
    responseData,
    'paymentList[0].cardIssureCountry',
    defaultGet(origin, 'requestData.policyList[0].cardIssureCountry')
  );
  filterSet(
    responseData,
    'paymentList[0].paymentMethodType',
    defaultGet(origin, 'requestData.policyList[0].paymentMethodType')
  );
  filterSet(
    responseData,
    'paymentList[0].paymentMethod',
    defaultGet(origin, 'requestData.policyList[0].paymentMethodType')
  );
  filterSet(
    responseData,
    'paymentList[0].premiumMethod',
    defaultGet(origin, 'requestData.policyList[0].premiumMethod')
  );
  filterSet(
    responseData,
    'paymentList[0].paymentDate',
    defaultGet(origin, 'requestData.policyList[0].paymentList[0].dateOfDeduction')
  );
  filterSet(
    responseData,
    'paymentList[0].cardIssuerCountry',
    defaultGet(origin, 'requestData.policyList[0].cardIssuerCountry')
  );
  //
  filterSet(
    responseData,
    'currencyCode',
    defaultGet(origin, 'requestData.policyList[0].currencyCode')
  );

  filterSet(
    responseData,
    'mibInfoList',
    defaultGet(origin, 'requestData.policyList[0].mibInfoList', [])
  );
  //
  filterSet(
    temp,
    'map.clientMap',
    defaultGet(origin, 'requestData.policyList[0].clientInfoList', []).reduce((r, c) => {
      r[c.id] = c;
      return r;
    }, {})
  );
  //
  filterSet(
    temp,
    'list.loopMachineRequestList',
    defaultGet(temp, 'list.loopMachineRequestList', []).map((item) => ({
      ...item,
      requestData: temp?.map?.clientMap?.[item?.id],
    }))
  );

  temp?.list?.loopMachineRequestList?.forEach((item) => {
    machineResult.push(convert_clientBEToFESingle(item, region));
  });

  filterSet(
    responseData,
    'clientInfoList',
    machineResult.map((item, index) => item)
  );
  filterSet(responseData, 'applicationNo', defaultGet(origin, 'requestData.applicationNo'));

  filterSet(
    temp,
    'list.clientIsPayorNotPolicyOwner',
    defaultGet(responseData, 'clientInfoList', []).filter(
      (item) =>
        item?.personalInfo?.customerRole?.includes('CUS005') &&
        !item?.personalInfo?.customerRole?.includes('CUS002')
    )
  );

  //
  filterSet(
    temp,
    'list.clientIsPayorNotPolicyOwner[0].financialInfo.reasonForPaying',
    defaultGet(origin, 'requestData.policyList[0].reasonForPaying')
  );
  //
  filterSet(responseData, 'submissionDate', defaultGet(origin, 'requestData.submissionDate'));
  //
  filterSet(responseData, 'submissionChannel', defaultGet(origin, 'requestData.submissionChannel'));
  filterSet(responseData, 'fundMaker', defaultGet(origin, 'requestData.fundMaker'));

  return responseData;
}

export default convert_businessDataBEToFE;

export { convert_clientBEToFESingle };
