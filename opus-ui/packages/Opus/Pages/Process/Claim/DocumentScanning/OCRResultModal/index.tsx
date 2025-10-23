import { Modal, Button, Select, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DocumentScanning/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import moment from 'moment';
import fieldsGenerator from 'opus/Pages/Process/Claim/DocumentScanning/functions/fieldsGenerator';
import { EToolModules } from 'opus/Pages/Process/Claim/DocumentScanning/_dto/enums';

// default order map for ocr results
const orderArray = [
  formatMessageApi({ Label_OCR_Opus: 'docType' }),
  formatMessageApi({ Label_OCR_Opus: 'docTypeCode' }),
  formatMessageApi({ Label_OCR_Opus: 'inpatientPoints' }),
  formatMessageApi({ Label_OCR_Opus: 'dpcPoints' }),
  formatMessageApi({ Label_OCR_Opus: 'surgeryPoints' }),
  formatMessageApi({ Label_OCR_Opus: 'patientNameInDocument' }),
  formatMessageApi({ Label_OCR_Opus: 'admissionDate' }),
  formatMessageApi({ Label_OCR_Opus: 'dischargeDate' }),
  formatMessageApi({ Label_OCR_Opus: 'hospitalCode' }),
  formatMessageApi({ Label_OCR_Opus: 'hospitalName' }),
  `${formatMessageApi({ Label_OCR_Opus: 'diagnosisCode' })} - ${formatMessageApi({
    Label_OCR_Opus: 'diagnosisDescription',
  })}`,
  `${formatMessageApi({ Label_OCR_Opus: 'surgeryCode' })} - ${formatMessageApi({
    Label_OCR_Opus: 'surgeryDescription',
  })}`,
];

// table column
const columns = [
  {
    title: t('dataField'),
    dataIndex: 'fieldName',
  },
  {
    title: t('valueCaptured'),
    dataIndex: 'value',
  },
];

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// map object into table data
const dataMap = (Obj: any, { docTypeDict }: any): any[] => {
  const keys = lodash.compact(Object.keys(Obj)?.reverse() || []);

  if (lodash.isEmpty(keys)) return [];

  return keys.map((key: string) => {
    const currentObj = Obj?.[key];

    // for empty row case
    if (lodash.isNil(currentObj) || lodash.isEmpty(currentObj)) {
      return {
        fieldName: formatMessageApi({ Label_OCR_Opus: key }),
        value: '',
      };
    }

    // for nested object
    if (lodash.isPlainObject(currentObj)) {
      return dataMap(currentObj, { docTypeDict });
    }

    // for diagnosis and surgery array
    if (lodash.isArray(currentObj)) {
      if (lodash.isEmpty(currentObj)) return null;

      return lodash.reduce(
        currentObj,
        (prev, curr) => {
          const arrKey = Object?.keys(curr);

          const fieldName = arrKey
            .map((i) =>
              formatMessageApi({
                Label_OCR_Opus: `${key?.replace('List', '')}${capitalizeFirstLetter(i)}`,
              })
            )
            .join(' - ');

          const value = arrKey.map((i) => curr?.[i] || '--').join(' - ');

          prev?.push({
            fieldName,
            value,
          });

          return prev;
        },
        Array<any>([])
      );
    }

    // date object
    if (key.includes('Date')) {
      return {
        fieldName: formatMessageApi({ Label_OCR_Opus: key }),
        value: moment(Obj?.[key], true).format('YYYY/MM/DD') || '--',
      };
    }

    // doc type name value mapping
    if (key === 'docTypeCode') {
      return {
        fieldName: formatMessageApi({ Label_OCR_Opus: key }),
        value: lodash.find(docTypeDict, { docTypeCode: Obj?.docTypeCode })?.docName || '--',
      };
    }

    // file name value mapping
    if (key === 'fileName') {
      return null;
    }

    // regular display row
    return {
      fieldName: formatMessageApi({ Label_OCR_Opus: key }),
      value: Obj?.[key] || '--',
    };
  });
};

const OCRResultModal = () => {
  const dispatch = useDispatch();
  const [docIndex, setDocIndex] = useState<string | undefined>(); // current selected table

  const { claimProcessData, showOCRModal, dropdownConfigure, fieldConfigure } = useSelector(
    ({ [NAMESPACE]: modelNameSpace }: any) => ({
      claimProcessData: modelNameSpace.businessData?.claimProcessData,
      showOCRModal: modelNameSpace?.ocrResultModal?.visible,
      dropdownConfigure: modelNameSpace?.dropdownConfigure,
      fieldConfigure: modelNameSpace?.fieldConfigure,
    })
  );

  const documentFileId = lodash.find(
    fieldsGenerator(fieldConfigure?.[EToolModules.upload], {
      dropdownConfigure,
      disabled: false,
    }) || [],
    (item) => item.formName === 'docTypeCode'
  );

  const { ocrResultList: OCRResults, uploadFiles } = claimProcessData?.[0];

  const fileOptions = useMemo(() => {
    if (lodash.isEmpty(OCRResults)) return [];

    const filteredList = lodash.filter(OCRResults, (i: any) => !lodash.isNil(i) && i?.success);

    return filteredList.map((res, index) => {
      const { docDataId } = res;

      const targetFile = lodash.find(uploadFiles, { fileId: docDataId });

      return { index, label: targetFile?.name ?? docDataId, value: docDataId };
    });
  }, [OCRResults, uploadFiles]);

  const data = useMemo(() => {
    if (!docIndex) return [];

    const result = lodash.find(OCRResults, { docDataId: docIndex });

    if (lodash.isEmpty(result)) return [];

    const resultArr = lodash.flattenDeep(
      dataMap(result?.ocrResult, {
        docTypeDict: documentFileId?.dicts,
      }) || []
    );

    return lodash
      .compact(resultArr)
      .sort((a, b) => orderArray.indexOf(a?.fieldName) - orderArray.indexOf(b?.fieldName));
  }, [OCRResults, docIndex, documentFileId?.dicts]);

  // init selection
  useEffect(() => {
    if (!docIndex && data?.length === 0 && fileOptions?.length > 0) {
      setDocIndex(fileOptions[0].value);
    }
  }, [data?.length, docIndex, fileOptions]);

  const handleDocSelect = (value: string) => {
    setDocIndex(value);
  };

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/ocrResultVisible`,
    });
    setDocIndex(undefined);
  };

  return (
    <Modal
      title={t('OCRResult')}
      width={'60%'}
      centered
      visible={showOCRModal}
      forceRender={false}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {formatMessageApi({
            Label_BPM_Button: 'Close',
          })}
        </Button>,
      ]}
    >
      <div className={styles.warper}>
        <div className={styles.selectionWarper}>
          <p className={styles.label}>{formatMessageApi({ Label_BIZ_Claim: 'Document' })}</p>
          <span className={styles.selectorSpan}>
            <Select className={styles.selector} onChange={handleDocSelect} defaultValue={docIndex}>
              {fileOptions?.map((option: any) => (
                <Select.Option
                  key={option?.value}
                  value={option?.value}
                  title={option?.label}
                  label={option?.label}
                >
                  {option?.label}
                </Select.Option>
              ))}
            </Select>
          </span>
        </div>
        <div className={styles.dataWarper}>
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </div>
    </Modal>
  );
};

export default OCRResultModal;
