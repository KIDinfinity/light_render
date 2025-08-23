import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import type { ToolsRenderDataModel, StateModel } from '../../_dto/model';
import DocLayout from '../../_components/DocLayout';
import { getNameByCode } from '../../_functions';
import styles from './styles.less';
import ReceivedStatus from './ReceivedStatus';

interface IProps {
  mandatoryItem?: any;
  existCurDocument?: boolean;
}

export interface IMandatoryItem extends FunctionComponent<IProps> {
  toolsRenderData?: ToolsRenderDataModel | ToolsRenderDataModel[];
}

const MandatoryItem: IMandatoryItem = ({ mandatoryItem, existCurDocument }) => {
  const { docTypeCode } = mandatoryItem || {};
  const { dropdownConfigure }: StateModel = useSelector(({ documentManagement }: any) => ({
    dropdownConfigure: documentManagement.dropdownConfigure,
  }));

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={styles.docMandatoryItem}>
      <DocLayout.DocField>
        <ReceivedStatus className={styles.decisionIcon} status={existCurDocument} />
        {lodash.get(getNameByCode(dropdownConfigure, { docTypeCode }), 'docName')}
      </DocLayout.DocField>
    </div>
  );
};

export default MandatoryItem;
