import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useMemo } from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';

import { getAuth } from '@/auth/Utils';
import { useDispatch, useSelector } from 'dva';
import { Provider } from '@/components/_store';
import { EToolModules, EFieldFlagName } from '../_dto/enums';
import type { CaseInfoModel, ToolsDataModel } from '../_dto/model';
import { ReactComponent as Upload } from '../_static/icon-Upload.svg';
import { ReactComponent as OpenAll } from '../_static/icon-OpenAll.svg';
import { ReactComponent as ReIndex } from '../_static/icon-ReIndex.svg';
import { ReactComponent as Download } from '../_static/icon-Download.svg';
import { ReactComponent as ClearSelection } from '../_static/icon-ClearSelection.svg';
import { ReactComponent as SelectAll } from '../_static/icon-SelectAll.svg';
import { downloadDocStreamUrl } from 'process/Document/View/config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import DocumentList from './DocumentList';
import ToolsGroup from '../ToolsGroup';
import { callReducer, actions, useGetDocumentList } from '../_hooks';
import UploadModal from './Modal/uploadModal';
import EditModal from './Modal/editModal';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import { findConfigsByFlagName } from '../_functions';
import styles from './styles.less';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';
import classNames from 'classnames';
import { openTitleFrame } from 'opus/Utils';

interface ICaseInfo {
  caseInfo?: CaseInfoModel;
  toolsData?: ToolsDataModel;
  documentList?: any;
}

const { FORCEUPDATE } = actions;

const Document: FunctionComponent<ICaseInfo> = () => {
  const {
    selectedData: { selectedDocs },
    fieldConfigure,
    dropdownConfigure,
    viewActived,
  } = useSelector(({ documentManagement }: any) => ({
    selectedData: documentManagement.selectedData,
    fieldConfigure: documentManagement.fieldConfigure,
    dropdownConfigure: documentManagement.dropdownConfigure,
    viewActived: documentManagement.viewActived,
  }));
  const hasSelectedDocs = !!lodash.size(selectedDocs);
  const fields = fieldConfigure?.[EToolModules.view];
  const config = findConfigsByFlagName(fields, EFieldFlagName.groupByFlag);
  const { fieldName } = config;

  const [state, uDispatch] = callReducer({ force: false });
  const documentRef = useRef();
  const dispatch = useDispatch();
  const { documentList } = useGetData();
  const documenstList = useGetDocumentList({
    documentList,
    fieldConfigure,
    dropdownConfigure,
    fieldName,
    viewActived,
  });
  const commonAuthorityList =
    useSelector(({ authController }: any) => authController.commonAuthorityList) || [];

  const handleScrollTop = () => {
    if (documentRef.current) {
      // @ts-ignore
      documentRef.current.scrollTop = 0;
    }
  };
  const setUploadVisit = () => {
    dispatch({
      type: 'documentManagement/setUploadVisit',
      payload: {
        uploadVisit: true,
      },
    });
  };

  useEffect(() => {
    uDispatch({
      type: FORCEUPDATE,
      payload: {
        force: !state.force,
      },
    });
  }, [documentList]);

  const handleUnread = () => {
    const unReadDocIds: string[] = [];
    lodash.values(selectedDocs).forEach((documentItem) => {
      if (documentItem.unRead) {
        unReadDocIds.push(documentItem.docId);
      }
    });

    if (unReadDocIds.length) {
      dispatch({
        type: 'solutionRead/setReadItem',
        payload: { subjectIdList: unReadDocIds, subjectType: ESubjectType.DOC },
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpentabAll = async () => {
    handleUnread();

    lodash.values(selectedDocs).forEach((i) => {
      openTitleFrame(
        `${downloadDocStreamUrl}?imageId=${i.image}&name=${encodeURIComponent(i.name)}&mimeType=${
          i.mimeType
        }`,
        formatMessageApi({
          Dropdown_CFG_FormCategory: i?.formCategory,
        })
      );
    });

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: 'clear',
      },
    });
  };
  const handleDownloadAll = async () => {
    handleUnread();
    lodash.values(selectedDocs).forEach((documentItem) => {
      dispatch({
        type: 'documentManagement/downloadFile',
        payload: {
          data: documentItem,
        },
      });
    });

    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: 'clear',
      },
    });
  };

  const buttonList = useMemo(() => {
    const configs = [
      {
        title: t('upload'),
        icon: Upload,
        authKey: 'RS_BP_Button_DocMgm_Upload',
        handleClick: () => {
          setUploadVisit();
        },
        show: getAuth(commonAuthorityList, {
          authorityCode: 'RS_BP_Button_DocMgm_Upload',
        }),
      },
      {
        title: formatMessageApi({
          Label_BPM_Button: 'OpenAll',
        }),
        icon: OpenAll,
        authKey: '',
        handleClick: () => {
          handleOpentabAll();
        },
        show: hasSelectedDocs,
      },
      {
        title: formatMessageApi({
          Label_BPM_Button: 'ReIndex',
        }),
        icon: ReIndex,
        handleClick: () => {
          dispatch({
            type: `documentManagement/saveShowReIndex`,
            payload: {
              visible: true,
            },
          });
        },
        show:
          hasSelectedDocs &&
          getAuth(commonAuthorityList, {
            authorityCode: 'RS_BP_Button_DocMgm_ReIndex',
          }),
      },
      {
        title: t('download'),
        icon: Download,
        authKey: 'RS_BP_Button_DocMgm_Download',
        show:
          hasSelectedDocs &&
          getAuth(commonAuthorityList, {
            authorityCode: 'RS_BP_Button_DocMgm_Download',
          }),
        handleClick: () => {
          handleDownloadAll();
        },
      },
    ];

    return (
      lodash
        .chain(configs)
        .filter(({ show }: any) => !!show)
        .value() || []
    );
  }, [
    commonAuthorityList,
    hasSelectedDocs,
    setUploadVisit,
    handleOpentabAll,
    dispatch,
    handleDownloadAll,
  ]);

  const selectAll = (isClear: boolean) => {
    dispatch({
      type: 'documentManagement/changeSelectdData',
      payload: {
        type: isClear ? 'clear' : 'all',
        soureData: documenstList,
      },
    });
  };
  const selectedDocsLength = lodash.values(selectedDocs).length;
  const documentListLength = lodash
    .chain(documentList)
    .filter((item) => item.imageUploadStatus !== 'fail' && !item.voidFlag)
    .size()
    .value();

  return (
    <Provider data={{ handleScrollTop, documentRef }}>
      {documentListLength !== 0 && (
        <div className={classNames(styles.btn1, styles.btns)}>
          {selectedDocsLength === documentListLength ? (
            <span className={styles.select} onClick={() => selectAll(true)}>
              <Icon component={ClearSelection} />
              {t('clearSelection')}
            </span>
          ) : (
            <span className={styles.select} onClick={() => selectAll(false)}>
              <Icon component={SelectAll} />
              {t('selectAll')}
            </span>
          )}
          <span className={styles.flexSelect} />
        </div>
      )}

      <div className={styles.btns}>
        <span className={styles.flexSelect} />
        {lodash.map(buttonList, ({ title, icon, handleClick }: any) => (
          <span className={styles.select} onClick={() => handleClick && handleClick()}>
            <Icon component={icon} />
            {title}
          </span>
        ))}
      </div>
      <UploadModal />
      <EditModal />
      <div
        className={styles.documentWrap}
        ref={(ref) => {
          // @ts-ignore
          documentRef.current = ref;
        }}
      >
        <ToolsGroup.Tools.ToolInit moduleId={EToolModules.mandatory}>
          <ToolsGroup.Mandatory />
        </ToolsGroup.Tools.ToolInit>
        <ToolsGroup.Tools.ToolInit moduleId={EToolModules.upload}>
          <ToolsGroup.Upload />
        </ToolsGroup.Tools.ToolInit>
        <DocumentList />
      </div>
    </Provider>
  );
};

export default Document;
