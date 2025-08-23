import { useSelector } from 'dva';
import IndexInformation from '../IndexInformation';
import useGetInsuredId from 'documentManage/pages/_hooks/useGetInsuredId';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import React from 'react';

const FormComponent = ({ taskDetail }) => {
  useGetInsuredId(taskDetail);
  const claimProcessData = useSelector(
    ({ batchDocumentScanningController }) => batchDocumentScanningController?.claimProcessData
  ) || [];
  return claimProcessData.map((_, index) => (
    <IndexInformation key={index} sectionIndex={index} />
  ))
};

export default (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <FormComponent />
  </CaseTaskDetail.Consumer>
);
