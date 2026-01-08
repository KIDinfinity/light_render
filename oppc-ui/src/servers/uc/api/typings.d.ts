declare namespace API {
  type AutoRuleTaskVO = {
    processInstanceId?: string;
    taskId?: string;
    caseCategory?: string;
    activityKey?: string;
    taskDefinitionKey?: string;
    assignee?: string;
    status?: string;
  };

  type CacheableOperationVO = {
    cacheName?: string;
    key?: string;
    cacheManager?: string;
    ignoreRegion?: boolean;
    cacheNullResult?: boolean;
  };

  type CallerConfig = {
    forwardUrl?: string;
    requestDataPath?: string;
    forwardMethod?: string;
    prefixUrl?: string;
    requestUrl?: string;
    httpMethod?: string;
    headerFromMdc?: string[];
    headerConfig?: Record;
    forwardAllMdcHeader?: boolean;
    responseClassType?: string;
    loopObjectPath?: string;
    machineConfigPath?: string;
    catchException?: boolean;
    restTemplateConfig?: RestTemplateConfig;
    loopType?: string;
    criteria?: QueryConfig[];
    retryTimes?: number;
    machineConfigKeys?: string[];
    convertFormat?: string;
  };

  type CallerLogInfo = {
    requestUrl?: string;
    requestMethod?: HttpMethod;
    httpHeaders?: {
      host?: {
        hostString?: string;
        address?: {
          hostAddress?: string;
          address?: string[];
          hostName?: string;
          linkLocalAddress?: boolean;
          multicastAddress?: boolean;
          anyLocalAddress?: boolean;
          loopbackAddress?: boolean;
          siteLocalAddress?: boolean;
          mcglobal?: boolean;
          mcnodeLocal?: boolean;
          mclinkLocal?: boolean;
          mcsiteLocal?: boolean;
          mcorgLocal?: boolean;
          canonicalHostName?: string;
        };
        port?: number;
        unresolved?: boolean;
        hostName?: string;
      };
      empty?: boolean;
      location?: string;
      all?: Record;
      lastModified?: number;
      date?: number;
      contentLength?: number;
      origin?: string;
      range?: HttpRange[];
      allow?: HttpMethod[];
      acceptCharset?: string[];
      cacheControl?: string;
      contentLanguage?: {
        language?: string;
        displayName?: string;
        country?: string;
        variant?: string;
        script?: string;
        unicodeLocaleAttributes?: string[];
        unicodeLocaleKeys?: string[];
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: string[];
        iso3Language?: string;
        iso3Country?: string;
      };
      etag?: string;
      contentDisposition?: ContentDisposition;
      acceptLanguage?: { range?: string; weight?: number }[];
      basicAuth?: string;
      accept?: MediaType[];
      acceptLanguageAsLocales?: {
        language?: string;
        displayName?: string;
        country?: string;
        variant?: string;
        script?: string;
        unicodeLocaleAttributes?: string[];
        unicodeLocaleKeys?: string[];
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: string[];
        iso3Language?: string;
        iso3Country?: string;
      }[];
      acceptPatch?: MediaType[];
      accessControlAllowCredentials?: boolean;
      accessControlAllowHeaders?: string[];
      accessControlAllowMethods?: HttpMethod[];
      accessControlAllowOrigin?: string;
      accessControlExposeHeaders?: string[];
      accessControlMaxAge?: number;
      accessControlRequestHeaders?: string[];
      accessControlRequestMethod?: HttpMethod;
      bearerAuth?: string;
      connection?: string[];
      expires?: number;
      ifMatch?: string[];
      ifNoneMatch?: string[];
      ifUnmodifiedSince?: number;
      pragma?: string;
      upgrade?: string;
      vary?: string[];
      ifModifiedSince?: number;
      contentType?: MediaType;
    };
    requestData?: Record;
    callId?: string;
    responseEntity?: string;
    callTime?: number;
    returnTime?: number;
    duration?: number;
    transId?: string;
    feignResponseData?: Record;
    exceptionMessage?: string;
  };

  type callParams = {
    function: string;
    operation: string;
  };

  type CfgLogLevelVO = {
    serviceName?: string;
    logName?: string;
    logLevel?: string;
    logExtendName?: string;
    logExtendConfig?: LogExtendConfigVO;
  };

  type CfgOrganizationHomepageDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    organizationCode?: string;
    configCategory?: string;
    configValue?: string;
  };

  type CfgUserFunctionalRelationshipVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    regionCode?: string;
    companyCode?: string;
    relationshipCode?: string;
    relatedUserId?: string;
    relatedUserName?: string;
  };

  type CompareConfig = {
    actualObjectPath?: string;
    expectObjectPath?: string;
    groupByFieldList?: string[];
    fieldJoinStr?: string;
    ignoreFieldConfigList?: IgnoreFieldConfig[];
  };

  type configUploadParams = {
    collectionName: string;
  };

  type ContentDisposition = {
    type?: string;
    name?: string;
    filename?: string;
    charset?: string;
    size?: number;
    creationDate?: string;
    modificationDate?: string;
    readDate?: string;
    attachment?: boolean;
    formData?: boolean;
    inline?: boolean;
  };

  type createIndexParams = {
    indexKey: string;
  };

  type CustomizationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    language?: string;
    dateFormat?: string;
    site?: string;
    theme?: string;
    defaultMode?: string;
    taskFolders?: string[];
    allLanguage?: string[];
    allTheme?: string[];
    allDefaultMode?: string[];
    allTaskFolders?: string[];
    enableGuideFlag?: string;
    finishGuideFlag?: string;
    guideControlInfo?: string;
  };

  type delete2Params = {
    id: string;
  };

  type delete3Params = {
    userId: string;
  };

  type deleteByUserIdParams = {
    userId: string;
  };

  type discardUserLeaveRequestDetailParams = {
    userId: string;
    leaveRequestStatus: string;
  };

  type EncoderConfig = {
    algorithm?: string;
    secretKey?: string;
  };

  type FieldConfig = {
    sourceObject?: Record;
    formula?: Record;
    sourceField?: string;
    targetField?: string;
    messageCode?: string;
    messageArgList?: string[];
    metaData?: string;
    convertCode?: string;
    convertFormat?: string;
    groupByValueField?: string;
    groupByFieldList?: string[];
    dataType?: string;
    objectPath?: string;
    criteria?: QueryConfig[];
    objectCriteria?: QueryConfig[];
    sourceFieldList?: string[];
    replacePrefix?: string;
    replaceSuffix?: string;
    needCompare?: boolean;
    compareResultPath?: string;
    tryReplaceNullField?: string;
    transferTo?: string;
    criteriaPath?: string;
    requestDataPath?: string;
    encoderConfig?: EncoderConfig;
  };

  type findCustomizationByUserIdParams = {
    userId?: string;
  };

  type findMaxTaskVolumeParams = {
    domain: string;
    claimNo: string;
  };

  type findMicroInfoByUserIdParams = {
    userId: string;
  };

  type findOrganizationByUserIdParams = {
    userId: string;
  };

  type findOrganizationModuleParams = {
    regionCode: string;
    businessCode: string;
  };

  type findSkillSetByUserIdParams = {
    userId: string;
  };

  type findTreeByUserIdParams = {
    userId: string;
  };

  type findUserOrganizationByUserIdParams = {
    userId: string;
  };

  type get1Params = {
    userId: string;
  };

  type getByUserIdParams = {
    userId: string;
  };

  type getLogConfigCacheParams = {
    logName: string;
  };

  type getMachineConfigParams = {
    configKey: string;
  };

  type getParams = {
    userId: string;
  };

  type getPasswordParams = {
    userId: string;
  };

  type getRelatedUser1Params = {
    companyCode?: string;
    userId?: string;
    relationshipCode?: string;
  };

  type getRelatedUserParams = {
    companyCode?: string;
    userId?: string;
    relationshipCode?: string;
  };

  type getUserContactsByUserNameParams = {
    userName: string;
  };

  type getUserDraftLeaveRequestParams = {
    userId: string;
  };

  type getUserGeneralInfoByIdParams = {
    userId: string;
  };

  type getUserGeneralInformationByUserId1Params = {
    userId: string;
  };

  type getUserGeneralInformationByUserIdParams = {
    userId: string;
  };

  type getUserLanguageByUserIdParams = {
    userId: string;
  };

  type getUserLeaveRequestByCaseNoParams = {
    caseNo: string;
  };

  type HttpHost = {
    schemeName?: string;
    address?: {
      hostAddress?: string;
      address?: string[];
      hostName?: string;
      linkLocalAddress?: boolean;
      multicastAddress?: boolean;
      anyLocalAddress?: boolean;
      loopbackAddress?: boolean;
      siteLocalAddress?: boolean;
      mcglobal?: boolean;
      mcnodeLocal?: boolean;
      mclinkLocal?: boolean;
      mcsiteLocal?: boolean;
      mcorgLocal?: boolean;
      canonicalHostName?: string;
    };
    port?: number;
    hostName?: string;
  };

  type HttpMethod = true;

  type HttpRange = true;

  type HttpRoute = {
    targetHost?: HttpHost;
    localAddress?: {
      hostAddress?: string;
      address?: string[];
      hostName?: string;
      linkLocalAddress?: boolean;
      multicastAddress?: boolean;
      anyLocalAddress?: boolean;
      loopbackAddress?: boolean;
      siteLocalAddress?: boolean;
      mcglobal?: boolean;
      mcnodeLocal?: boolean;
      mclinkLocal?: boolean;
      mcsiteLocal?: boolean;
      mcorgLocal?: boolean;
      canonicalHostName?: string;
    };
    tunnelled?: boolean;
    layered?: boolean;
    secure?: boolean;
    localSocketAddress?: {
      hostString?: string;
      address?: {
        hostAddress?: string;
        address?: string[];
        hostName?: string;
        linkLocalAddress?: boolean;
        multicastAddress?: boolean;
        anyLocalAddress?: boolean;
        loopbackAddress?: boolean;
        siteLocalAddress?: boolean;
        mcglobal?: boolean;
        mcnodeLocal?: boolean;
        mclinkLocal?: boolean;
        mcsiteLocal?: boolean;
        mcorgLocal?: boolean;
        canonicalHostName?: string;
      };
      port?: number;
      unresolved?: boolean;
      hostName?: string;
    };
    proxyHost?: HttpHost;
    hopCount?: number;
    tunnelType?: 'PLAIN' | 'TUNNELLED';
    layerType?: 'PLAIN' | 'LAYERED';
  };

  type IgnoreFieldConfig = {
    ignoreFieldKeyList?: string[];
    ignoreType?: string;
    criteria?: QueryConfig[];
  };

  type LeaveInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseNo?: string;
    sortOrder?: number;
    startTime?: string;
    endTime?: string;
    reason?: string;
    discarded?: number;
    userId?: string;
    leaveType?: string;
    leaveLength?: string;
    userName?: string;
    caseCategory?: string;
    status?: string;
    actualLeaveWorkDay?: number;
    userLeaveRequestId?: string;
    userLeaveRequestDetailExtraId?: string;
    businessCode?: string;
  };

  type LeaveOverviewQO = {
    userId?: string;
    organizationCode?: string;
    leaveDate?: string;
    businessCode?: string;
  };

  type LeaveRequestUserInfoVO = {
    userId?: string;
    userName?: string;
    subordinate?: boolean;
  };

  type listUserInfoByRoleCode1Params = {
    roleCode: string;
  };

  type listUserInfoByRoleCodeParams = {
    roleCode: string;
  };

  type lockedAccountByUserIdParams = {
    userId: string;
    locked: number;
  };

  type LogDataConfigVO = {
    discardFieldList?: string[];
    fieldLengthLimit?: number;
    lengthLimit?: number;
    skipEntityField?: boolean;
  };

  type LogExtendConfigVO = {
    skipLog?: boolean;
    requestLogConfig?: LogDataConfigVO;
    responseLogConfig?: LogDataConfigVO;
  };

  type LogLevelVO = {
    logLevel?: string;
    logNameList?: string[];
    serviceNameList?: string[];
  };

  type MachineConfig = {
    get_id?: string;
    configKey?: string;
    processList?: ProcessConfig[];
    description?: string;
    currentVersion?: number;
    newVersion?: number;
    skipNullProcess?: boolean;
  };

  type MaskLogConfig = {
    masking?: boolean;
    maskFields?: string[];
    maskLoggerNames?: string[];
  };

  type MediaType = {
    type?: string;
    subtype?: string;
    parameters?: Record;
    qualityValue?: number;
    charset?: string;
    concrete?: boolean;
    wildcardType?: boolean;
    wildcardSubtype?: boolean;
    subtypeSuffix?: string;
  };

  type MemberTaskDTO = {
    userId?: string;
    userName?: string;
    todoTaskCount?: number;
  };

  type MessageVO = {
    code?: string;
    content?: string;
    type?: string;
    metaData?: Record;
    application?: string;
  };

  type MongoConfig = {
    collectionName?: string;
    saveDataFieldPath?: string;
    idFieldPath?: string;
    uri?: string;
    queryConfigList?: QueryConfig[];
    updateConfigList?: UpdateConfig[];
    queryKeyList?: string[];
    upsertKeyList?: string[];
    backUpCollectionName?: string;
  };

  type MysqlConfig = {
    daoName?: string;
    className?: string;
    paramFieldPath?: string;
    batchOperator?: string;
    queryConfigList?: QueryConfig[];
    tableName?: string;
    backupTableName?: string;
    dataType?: string;
    excludeFieldList?: string[];
    sqlSentence?: string;
  };

  type ObjectCompareResult = {
    equalFieldList?: string[];
    failFieldList?: string[];
    lackFieldList?: string[];
    abundantFieldList?: string[];
    existDiff?: boolean;
  };

  type OrganizationActivityDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    caseCategory?: string;
    activity?: string;
    organizationCode?: string;
  };

  type OrganizationDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    organizationCode?: string;
    organizationName?: string;
    parentOrganizationCode?: string;
    organizationLevel?: string;
    organizationDesc?: string;
    owner?: string;
    type?: string;
    effectiveDate?: string;
    expiredDate?: string;
    priority?: number;
    children?: OrganizationDO[];
    activityList?: OrganizationActivityDO[];
    ownerFlag?: string;
  };

  type OrganizationMicroVO = {
    organizationCode?: string;
    organizationName?: string;
    owner?: string;
  };

  type OrganizationModuleDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    regionCode?: string;
    businessCode?: string;
    moduleId?: string;
    organizationCode?: string;
  };

  type OrganizationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    organizationCode?: string;
    organizationName?: string;
    parentOrganizationCode?: string;
    organizationLevel?: string;
    organizationDesc?: string;
    owner?: string;
    type?: string;
    effectiveDate?: string;
    expiredDate?: string;
    priority?: number;
    children?: OrganizationDO[];
    activityList?: OrganizationActivityDO[];
    ownerFlag?: string;
  };

  type Page = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: Record[];
    firstResult?: number;
  };

  type PageLeaveInfoDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: LeaveInfoDO[];
    firstResult?: number;
  };

  type PageOrganizationDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: OrganizationDO[];
    firstResult?: number;
  };

  type PageUserGeneralInfoDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: UserGeneralInfoDO[];
    firstResult?: number;
  };

  type PageUserInquiryDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: UserInquiryDO[];
    firstResult?: number;
  };

  type PageUserPersonalInfoDO = {
    totalPage?: number;
    pageSize?: number;
    currentPage?: number;
    sortName?: string;
    sortOrder?: string;
    total?: number;
    startPage?: number;
    offset?: number;
    params?: Record;
    rows?: UserPersonalInfoDO[];
    firstResult?: number;
  };

  type PersonalLeaveRequestResultVO = {
    caseNo?: string;
    sortOrder?: number;
    startTime?: string;
    endTime?: string;
    reason?: string;
    user?: UserGeneralInformationVO;
  };

  type PersonalLeaveRequestSearchArgVO = {
    caseNo?: string;
    userId?: string;
    date?: string;
    status?: string;
    sortOrder?: number;
  };

  type PocRequest = {
    machineConfig?: MachineConfig;
    expectedObject?: Record;
    inputData?: Record;
  };

  type PocResponse = {
    outputData?: Record;
    expectCompareResult?: ObjectCompareResult;
  };

  type PoolStats = {
    leased?: number;
    pending?: number;
    available?: number;
    max?: number;
  };

  type ProcessConfig = {
    processCode?: string;
    dynamicKeys?: string[];
    fieldConfigList?: FieldConfig[];
    mongoConfig?: MongoConfig;
    mysqlConfig?: MysqlConfig;
    callerConfig?: CallerConfig;
    saveContextPath?: string;
    order?: number;
    returnObjectPath?: string;
    conditionConfigList?: QueryConfig[];
    description?: string;
    saveHeaderPath?: string;
    compareConfig?: CompareConfig;
    convertCode?: string;
  };

  type PromptMessage = {
    code?: string;
    type?: string;
    content?: string;
    messageCode?: string;
    applicationName?: string;
    metaData?: Record;
  };

  type queryByUserIdParams = {
    userId: string;
  };

  type QueryConfig = {
    type?: string;
    where?: string;
    valueFieldPath?: string;
    criteriaOperator?: string;
    dataType?: string;
    anyMatch?: string;
    listAnyMatch?: string;
  };

  type queryLoggerParams = {
    apiTraceId: string;
  };

  type resetPasswordParams = {
    userId: string;
    password: string;
  };

  type ResourceCountQO = {
    organizationCodeList?: string[];
    currentTime?: string;
    businessCode?: string;
  };

  type ResponseVOVoid = {
    apiTraceId?: string;
    success?: boolean;
    status?: string;
    responseData?: Record;
    messageList?: MessageVO[];
  };

  type RestTemplateConfig = {
    proxyServer?: string;
    connectTimeout?: number;
    readTimeout?: number;
    retryTimes?: number;
  };

  type ResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOBigDecimal = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: number;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCfgOrganizationHomepageDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgOrganizationHomepageDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOConcurrentHashMapStringLogExtendConfigVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOCustomizationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CustomizationVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOIntegerArray = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: number[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListCfgOrganizationHomepageDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: CfgOrganizationHomepageDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListLeaveInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: LeaveInfoDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListLeaveRequestUserInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: LeaveRequestUserInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListMemberTaskDTO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: MemberTaskDTO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListOrganizationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OrganizationDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListOrganizationModuleDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OrganizationModuleDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListOrganizationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OrganizationVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListRuleCommonRpcFactInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: RuleCommonRpcFactInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListTeamLeaveRequestResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: TeamLeaveRequestResultVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserCertificateDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserCertificateDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserClassifiedLeaveRequestInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserClassifiedLeaveRequestInfoVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserContacts = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserContacts[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserGeneralInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGeneralInfoDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserInquiryDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserInquiryDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOListUserSkillSetVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserSkillSetVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapObjectObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOMapStringString = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOObject = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type ResultVOOrganizationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OrganizationDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageLeaveInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageLeaveInfoDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageOrganizationDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageOrganizationDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageUserGeneralInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageUserGeneralInfoDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageUserInquiryDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageUserInquiryDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPageUserPersonalInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PageUserPersonalInfoDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOPersonalLeaveRequestResultVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: PersonalLeaveRequestResultVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOSetOrganizationMicroVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: OrganizationMicroVO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOSetUserGeneralInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGeneralInfoDO[];
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserGeneralInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGeneralInfoDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserGeneralInformationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGeneralInformationVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserGeneralInfoVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserGeneralInfoVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserLeaveRequestVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserLeaveRequestVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserOrganizationVO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserOrganizationVO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserPersonalInfoDO = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserPersonalInfoDO;
    promptMessages?: PromptMessage[];
  };

  type ResultVOUserTenantInfo = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: UserTenantInfo;
    promptMessages?: PromptMessage[];
  };

  type ResultVOVoid = {
    success?: boolean;
    type?: string;
    warnData?: Record;
    resultData?: Record;
    promptMessages?: PromptMessage[];
  };

  type RuleCommonRpcFactInfoVO = {
    objClassType?: string;
    objJsonContent?: string;
  };

  type TeamLeaveRequestResultVO = {
    date?: string;
    teamUserLeaveRequestInfoVOList?: TeamUserLeaveRequestInfoVO[];
  };

  type TeamLeaveRequestSearchArgVO = {
    users?: UserGeneralInformationVO[];
    statuses?: string[];
    beginDate?: string;
    endDate?: string;
  };

  type TeamUserLeaveRequestInfoVO = {
    userId?: string;
    userName?: string;
    status?: string;
    caseNo?: string;
  };

  type UpdateConfig = {
    key?: string;
    valueFieldPath?: string;
  };

  type UserAutoRuleFactInfoInquiryVO = {
    domain?: string;
    userAutoRuleVO?: UserAutoRuleVO;
  };

  type UserAutoRuleVO = {
    taskList?: AutoRuleTaskVO[];
    userId?: string;
    ruleOperationType?: string;
  };

  type UserCertificateDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    certificateType?: string;
    certificateName?: string;
    certificateResult?: string;
    obtainingDate?: string;
    description?: string;
    positionOrder?: number;
  };

  type UserClassifiedLeaveRequestInfoVO = {
    status?: string;
    detailVOS?: UserLeaveRequestDetailVO[];
  };

  type UserContacts = {
    userId?: string;
    userAvatar?: string;
    userName?: string;
    gender?: string;
    title?: string;
    status?: number;
    accountStatus?: number;
    chatRoom?: string;
  };

  type UserGeneralInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    userName?: string;
    status?: number;
    accountStatus?: number;
    effectiveDate?: string;
    fundPoint?: number;
    employmentDate?: string;
    title?: string;
    extNo?: string;
    chatRoom?: string;
    operationSupport?: string;
    mentor?: string;
    userDepartment?: string;
    userChannel?: string;
    businessCode?: string;
    autoRefreshSession?: string;
  };

  type UserGeneralInformationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    userName?: string;
    status?: number;
    accountStatus?: number;
    effectiveDate?: string;
    fundPoint?: number;
    employmentDate?: string;
    title?: string;
    extNo?: string;
    chatRoom?: string;
    operationSupport?: string;
    mentor?: string;
    userDepartment?: string;
    userChannel?: string;
    businessCode?: string;
    autoRefreshSession?: string;
    statusName?: string;
  };

  type UserGeneralInfoVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    userName?: string;
    status?: number;
    accountStatus?: number;
    effectiveDate?: string;
    fundPoint?: number;
    employmentDate?: string;
    title?: string;
    extNo?: string;
    chatRoom?: string;
    operationSupport?: string;
    mentor?: string;
    userDepartment?: string;
    userChannel?: string;
    businessCode?: string;
    autoRefreshSession?: string;
    companyCode?: string[];
  };

  type UserInquiryDO = {
    id?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    gender?: string;
    birthday?: string;
    status?: number;
    employmentDate?: string;
    mailAddress?: string;
    extNo?: string;
    phoneNo?: string;
    title?: string;
    directSupervisor?: string;
    organizationCode?: string;
    organizationName?: string;
    roleNames?: string;
  };

  type UserLeaveRequestDetailVO = {
    caseNo?: string;
    sortOrder?: number;
    startTime?: string;
    endTime?: string;
    reason?: string;
    users?: UserGeneralInformationVO[];
  };

  type UserLeaveRequestInfoQueryVO = {
    userId?: string;
    statuses?: string[];
    startTime?: string;
    endTime?: string;
  };

  type UserLeaveRequestNavigatorVO = {
    caseNo?: string;
    businessData?: UserLeaveRequestVO;
  };

  type UserLeaveRequestVO = {
    userId?: string;
    caseNo?: string;
    currentTaskId?: string;
    caseCategory?: string;
    status?: string;
    details?: UserLeaveRequestDetailVO[];
  };

  type UserLoginDetailDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    userName?: string;
    loginStatus?: number;
    loginDetail?: string;
  };

  type UserLogInOutNotifictionVO = {
    userId?: string;
    userLogin?: boolean;
  };

  type UserLogInOutNotifyVO = {
    sessionId?: string;
    userId?: string;
    action?: string;
    region?: string;
    tenant?: string;
    timeStamp?: string;
  };

  type UserMaintenanceGroupInfoVO = {
    groupCode?: string;
  };

  type UserMaintenanceUserInfoVO = {
    userId?: string;
    userName?: string;
    userStatus?: string;
    businessUnit?: string;
  };

  type UserMaintenanceVO = {
    businessCode?: string;
    userInfo?: UserMaintenanceUserInfoVO;
    groupInfo?: UserMaintenanceGroupInfoVO[];
    requestType?: string;
    requestBy?: string;
  };

  type UserOrganizationDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    organizationCode?: string;
    position?: string;
    positionLevel?: string;
    title?: string;
    titleLevel?: string;
    workingYear?: string;
    directSupervisor?: string;
    educationLevel?: string;
    faxNumber?: string;
    landLinePhone?: string;
  };

  type UserOrganizationVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    organizationCode?: string;
    position?: string;
    positionLevel?: string;
    title?: string;
    titleLevel?: string;
    workingYear?: string;
    directSupervisor?: string;
    educationLevel?: string;
    faxNumber?: string;
    landLinePhone?: string;
    organizationDOList?: OrganizationDO[];
  };

  type UserPersonalInfoDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId: string;
    firstName: string;
    lastName: string;
    englishName?: string;
    birthday?: string;
    gender?: string;
    maritalStatus: string;
    identityType: string;
    identityNo: string;
    phoneNo: string;
    emergencyContactPerson: string;
    relationship: string;
    emergencyContactNo: string;
    homeAddress?: string;
    mailAddress?: string;
    userAvatar?: string;
  };

  type UserSecurityDO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    password?: string;
    expirationDate?: string;
    errorCount?: number;
    locked?: number;
  };

  type UserSecurityVO = {
    userId?: string;
    password?: string;
    newPassword?: string;
  };

  type UserSkillSetVO = {
    id?: string;
    creator?: string;
    gmtCreate?: string;
    modifier?: string;
    gmtModified?: string;
    deleted?: number;
    transId?: string;
    userId?: string;
    skillCode?: string;
    skillLevel?: string;
    score?: string;
    description?: string;
    skillType?: string;
  };

  type UserTenantInfo = {
    userId?: string;
    tenant?: string;
    region?: string;
  };
}
