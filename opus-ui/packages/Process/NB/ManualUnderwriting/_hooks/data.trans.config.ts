import { tenant, Region } from '@/components/Tenant';

export const transConfig = (() => {
  return {
    zipCode: 'addressList.[0].zipCode',
    deleted: 'deleted',
    maritalStatus: 'customerMrgStatus',
    promotionsBy: 'consentsList[0].promotionsBy',
    specify: 'consentsList[0].specify',
    consentProcessing: 'consentsList[0].consentProcessing',
    agreement: 'consentsList[0].agreement',
    entityPolicyOwnerName: 'name',
    entityName: 'customerEnSurname',
    companyRegistrationNoOld: 'companyRegistrationOldNo',
    additionalIdentificationType: 'otherIdType',
    additionalIdentificationNumber: 'otherIdNumber',
    entityPOBusinessAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'fullAddress',
    },
    businessAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'fullAddress',
    },
    businessAddress1: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'address1',
    },
    businessAddress2: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'address2',
    },
    businessAddress3: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'address3',
    },
    businessAddress4: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'address4',
    },
    businessAddress5: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'address5',
    },
    businessAddress6: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'address6',
    },
    businessAddress7: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'country',
    },
    entityPolicyOwnerBusinessAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'country',
    },
    businessZipCode: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'B',
      },
      targetParam: 'zipCode',
    },
    residentialAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'fullAddress',
    },
    identityAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'I',
      },
      targetParam: 'fullAddress',
    },
    identityZipCode: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'I',
      },
      targetParam: 'zipCode',
    },
    residentialAddress1: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'address1',
    },
    residentialAddress2: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'address2',
    },
    residentialAddress3: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'address3',
    },
    residentialAddress4: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'address4',
    },
    residentialAddress5: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'address5',
    },
    residentialAddress6: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'address6',
    },
    residentialAddress7: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'country',
    },
    residentialZipCode: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'R',
      },
      targetParam: 'zipCode',
    },
    communicationLane: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'communicationLane',
        paramValue: 'Y',
      },
      targetParam: 'addrType',
    },
    emailAddress1: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address1',
    },
    emailAddress2: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address2',
    },
    emailAddress3: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address3',
    },
    emailAddress4: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address4',
    },
    emailAddress5: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address5',
    },
    emailAddress6: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address6',
    },
    emailAddress7: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'E',
      },
      targetParam: 'address7',
    },
    permanentAddress1: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address1',
    },
    permanentAddress2: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address2',
    },
    permanentAddress3: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address3',
    },
    permanentAddress4: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address4',
    },
    permanentAddress5: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address5',
    },
    permanentAddress6: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address6',
    },
    permanentAddress7: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: {
        paramKey: 'addrType',
        paramValue: 'N',
      },
      targetParam: 'address7',
    },
    fullAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'fullAddress',
      touched: true
    },
    usResidenceAddress: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'fullAddress',
      touched: true
    },
    usResidenceAddress1: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address1',
    },
    usResidenceAddress2: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address2',
    },
    usResidenceAddress3: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address3',
    },
    usResidenceAddress4: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address4',
    },
    usResidenceAddress5: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address5',
    },
    usResidenceAddress6: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address6',
    },
    usResidenceAddress7: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'address7',
    },
    usResidenceZipCode: {
      baseSource: 'addressList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'addrType',
          paramValue: 'US',
          operator: 'includes',
        },
        {
          paramKey: 'country',
          paramValue: 'USA',
          operator: 'includes',
        },
      ],
      targetParam: 'zipCode',
    },
    phoneNoReadOnly: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'contactSeqNum',
          paramValue: [1],
          operator: 'includes',
        },
      ],
      targetParam: 'contactNo',
      mapchange: false,
    },
    country: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'contactSeqNum',
          paramValue: [1],
          operator: 'includes',
        },
      ],
      targetParam: 'countryCode',
    },
    secondaryContactNo: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        // {
        //   paramKey: 'contactSeqNum',
        //   paramValue: [1],
        //   operator: 'notIncludes',
        // },
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'contactNo',
    },
    SecondaryIdentityType: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['S'],
          operator: 'includes',
        },
        {
          paramKey: 'ctfType',
          paramValue: ['TN', 'PA'],
          operator: 'notIncludes',
        },
      ],
      targetParam: 'ctfType',
    },
    SecondaryIdentityNo: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['S'],
          operator: 'includes',
        },
        {
          paramKey: 'ctfType',
          paramValue: ['TN', 'PA'],
          operator: 'notIncludes',
        },
      ],
      targetParam: 'ctfId',
      touched: true
    },
    ctfId: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'ctfType',
          paramValue: ['TN', 'SS', 'GS'],
          operator: 'includes',
        },
        {
          paramKey: 'ctfCountryCode',
          operator: 'includes',
          paramValue: ['USA'],
        },
      ],
      targetParam: 'ctfId',
      touched: true
    },
    SecondaryIdentityExpiryDate: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['S'],
          operator: 'includes',
        },
        {
          paramKey: 'ctfType',
          paramValue: ['TN', 'PA'],
          operator: 'notIncludes',
        },
      ],
      targetParam: 'ctfExpireDate',
    },
    contactNo: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'contactNo',
    },
    countryName: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'countryName',
    },
    countryCode: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'countryCode',
    },
    areaCode: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'areaCode',
    },
    secondaryContactCountry: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        // {
        //   paramKey: 'contactSeqNum',
        //   paramValue: [1],
        //   operator: 'notIncludes',
        // },
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'countryCode',
    },
    secondaryContactType: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        // {
        //   paramKey: 'contactSeqNum',
        //   paramValue: [1],
        //   operator: 'notIncludes',
        // },
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'contactType',
    },
    contactType: {
      baseSource: 'contactInfoList',
      dataSoureType: 'array',
      dataDisplay: 'matchMore',
      matchRule: [
        {
          paramKey: 'contactType',
          paramValue: ['HM', 'OF', 'FX', 'MB'],
          operator: 'includes',
        },
      ],
      targetParam: 'contactType',
    },
    identityType: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['P'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfType',
    },

    identityNo: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['P'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfId',
    },
    npwp: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'ctfCountryCode',
          paramValue: ['RI'],
          operator: 'includes',
        },
        {
          paramKey: 'ctfType',
          paramValue: ['TN'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfId',
      touched: true,
    },
    ctfPlace: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['P'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfPlace',
    },
    ctfCountryCode: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['P'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfCountryCode',
    },
    expiryDate: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['P'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfExpireDate',
    },
    ctfStartDate: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['P'],
          operator: 'includes',
        },
      ],
      targetParam: 'ctfStartDate',
    },
    tinsssgsis: {
      // baseSourceField: 'usTaxFlag',
      // baseSourceFieldValue: 'N',
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: tenant.region({
        [Region.PH]: [
          {
            paramKey: 'ctfType',
            paramValue: ['TN', 'SS', 'GS'],
            operator: 'includes',
          },
          {
            paramKey: 'type',
            paramValue: ['S'],
            operator: 'includes',
          },
          {
            paramKey: 'ctfCountryCode',
            paramValue: ['RP'],
            operator: 'includes',
          },
        ],
        notMatch: [
          {
            paramKey: 'ctfType',
            paramValue: ['TN', 'SS', 'GS'],
            operator: 'includes',
          },
          {
            paramKey: 'type',
            paramValue: ['S'],
            operator: 'includes',
          },
        ],
      }),
      targetParam: 'ctfType',
    },
    tinsssgsisNo: {
      // baseSourceField: 'usTaxFlag',
      // baseSourceFieldValue: 'N',
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: tenant.region({
        [Region.PH]: [
          {
            paramKey: 'ctfType',
            paramValue: ['TN', 'SS', 'GS'],
            operator: 'includes',
          },
          {
            paramKey: 'type',
            paramValue: ['S'],
            operator: 'includes',
          },
          {
            paramKey: 'ctfCountryCode',
            paramValue: ['RP'],
            operator: 'includes',
          },
        ],
        notMatch: [
          {
            paramKey: 'ctfType',
            paramValue: ['TN', 'SS', 'GS'],
            operator: 'includes',
          },
          {
            paramKey: 'type',
            paramValue: ['S'],
            operator: 'includes',
          },
        ],
      }),
      targetParam: 'ctfId',
    },
    usTn: {
      // baseSourceField: 'usTaxFlag',
      // baseSourceFieldValue: 'Y',
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: tenant.region({
        [Region.PH]: [
          {
            paramKey: 'ctfType',
            paramValue: ['TN', 'SS', 'GS'],
            operator: 'includes',
          },
          {
            paramKey: 'type',
            paramValue: ['S'],
            operator: 'includes',
          },
          {
            paramKey: 'ctfCountryCode',
            paramValue: ['USA'],
            operator: 'includes',
          },
        ],
        notMatch: [
          {
            paramKey: 'ctfType',
            paramValue: ['TN', 'SS', 'GS'],
            operator: 'includes',
          },
          {
            paramKey: 'type',
            paramValue: ['S'],
            operator: 'includes',
          },
        ],
      }),
      targetParam: 'ctfId',
      touched: true
    },
    noTin: {
      baseSource: 'crtInfoList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'type',
          paramValue: ['S'],
          operator: 'includes',
        },
      ],
      targetParam: 'noTin',
    },
    withdrawalTerm: {
      baseSource: 'coverageList',
      dataSoureType: 'array',
      matchRule: [
        {
          paramKey: 'isMain',
          paramValue: ['Y'],
          operator: 'includes',
        },
      ],
      targetParam: 'withdrawalTerm',
    },
  };
})();

export const transConfigs = [
  transConfig,
  {
    identityNo: 'identityNo',
    identityType: 'identityType',
  },
];

export const extraDataSrouce = {
  reasonForPaying: 'policyList[0].reasonForPaying',
  quotationRefNo: 'policyList[0].relevanceCode',
  purposeOfInsurance: 'purposeOfInsurance',
  applicationSignedDate: 'applicationSignedDate',
  applicationPlaceOfSigning: 'applicationPlaceOfSigning',
  fillerPipIndicator: 'fillerPipIndicator',
  customerSubmitDate: 'customerSubmitDate',
  proposalDate: 'proposalDate',
  otherPurpose: 'otherPurpose',
  communicationPreference: 'communicationPreference',
  caseType: 'caseType',
  eWithdrawalStatus: 'policyList[0].eWithdrawalStatus',
  annualizedPrem: 'policyList[0].annualizedPrem',
  PolicyAddress7: 'policyList[0].policyAddressList[0].countryCode',
  PolicyAddress6: 'policyList[0].policyAddressList[0].addressLine6',
  PolicyAddress5: 'policyList[0].policyAddressList[0].addressLine5',
  PolicyAddress4: 'policyList[0].policyAddressList[0].addressLine4',
  PolicyAddress3: 'policyList[0].policyAddressList[0].addressLine3',
  PolicyAddress2: 'policyList[0].policyAddressList[0].addressLine2',
  PolicyAddress1: 'policyList[0].policyAddressList[0].addressLine1',
  PolicyZipCode: 'policyList[0].policyAddressList[0].zipCode',
  PolicyFullAddress: 'policyList[0].policyAddressList[0].fullAddress',
  applyWaitingPeriod: 'applyWaitingPeriod',
  firstPolicyFlag: 'policyList[0].uwProposalHealthFamilySharing.firstPolicyFlag',
  sharingGroupNumber: 'policyList[0].uwProposalHealthFamilySharing.sharingGroupNumber',
  eDocument: 'eDocument',
  icpDividendPayType: 'policyList[0].icpDividendPayType',
};
