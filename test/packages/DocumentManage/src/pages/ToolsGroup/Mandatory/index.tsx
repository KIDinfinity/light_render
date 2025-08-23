import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { DocumentModel, ToolsRenderDataModel, StateModel } from '../../_dto/model';
import { EToolModules } from '../../_dto/enums';
import DocLayout from '../../_components/DocLayout';
import MandatoryItem from './MandatoryItem';
import WaiveMandatoryCheck from './WaiveMandatoryCheck';
import styles from './styles.less';
import { handleDocMandatory } from '../../_functions';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';

interface IProps {
  documentList?: DocumentModel[];
  docMandatoryList?: string[];
}

export interface IMandatory extends FunctionComponent<IProps> {
  toolsRenderData?: ToolsRenderDataModel | ToolsRenderDataModel[];
}

const Mandatory: IMandatory = () => {
  const dispatch = useDispatch();
  const { documentList } = useGetData();
  const { dropdownConfigure, caseInfo, docMandatoryList }: StateModel | any = useSelector(
    ({ documentManagement }: any) => ({
      caseInfo: documentManagement.caseInfo,
      dropdownConfigure: documentManagement.dropdownConfigure,
      docMandatoryList: documentManagement.docMandatoryList,
    })
  );
  const { processInstanceId, inquiryBusinessNo } = caseInfo || {};

  useEffect(() => {
    if (processInstanceId) {
      console.log(caseInfo);
      dispatch({
        type: 'documentManagement/getDocuments',
        payload: { caseNo: processInstanceId, inquiryBusinessNo },
      });
      dispatch({
        type: 'documentManagement/getDocMandatoryChecking',
        payload: { caseNo: processInstanceId },
      });
    }
  }, [caseInfo]);

  return (
    <div className={styles.docMandatory}>
      <DocLayout>
        <DocLayout.DocTitle>
          <div className={styles.docMandatoryTitle}>
            {formatMessageApi({ Label_COM_Document: 'document.mandatory.title' })}
          </div>
        </DocLayout.DocTitle>
        {docMandatoryList?.length ? (
          <>
            {lodash
              .chain(handleDocMandatory(documentList, dropdownConfigure, docMandatoryList))
              .map(({ mandatory, isExistMandatory }, index) => (
                <MandatoryItem
                  mandatoryItem={mandatory}
                  existCurDocument={isExistMandatory}
                  key={`${mandatory}-${index}`}
                />
              ))
              .value()}
            <WaiveMandatoryCheck />
          </>
        ) : (
          <Empty />
        )}
      </DocLayout>
    </div>
  );
};

// 定义注册到Tools组件的数据
Mandatory.toolsRenderData = {
  toolId: EToolModules.mandatory,
};

export default Mandatory;
