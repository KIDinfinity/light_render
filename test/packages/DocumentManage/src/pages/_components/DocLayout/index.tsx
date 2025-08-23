import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { IDocTitle } from './DocTitle';
import DocTitle from './DocTitle';
import type { IDocField } from './DocField';
import DocField from './DocField';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';

import styles from './styles.less';
import { downloadDocStreamUrl } from 'process/Document/View/config';

interface IProps {
  className?: string;
  children?: ReactNode;
  onClick?: (e: any) => void;
  selected?: boolean;
  isAssinee: boolean;
  readData: any;
  documentItem: any;
}

interface DocItemComponent extends FunctionComponent<IProps> {
  DocTitle: FunctionComponent<IDocTitle>;
  DocField: FunctionComponent<IDocField>;
}

const DocLayout: DocItemComponent = ({
  className,
  selected,
  children,
  onClick,
  isAssinee,
  readData,
  documentItem,
  ...res
}) => {
  const extra = {};
  if (documentItem?.name && documentItem?.image && documentItem?.mimeType) {
    extra.href = `${downloadDocStreamUrl}?imageId=${documentItem?.image}&name=${encodeURIComponent(
      documentItem?.name
    )}&mimeType=${documentItem?.mimeType}`;
  }

  return (
    <a
      {...extra}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (onClick) onClick(e);
      }}
      className={classNames(
        styles.documentItem,
        className,
        documentItem?.mustRead && documentItem?.unRead && `${styles.documentItem}-mustRead`,
        !documentItem?.unRead && selected && `${styles.documentItem}-selected`
      )}
      {...res}
    >
      <Read
        type={EType.ITEM}
        subjectType={ESubjectType.DOC}
        id={documentItem?.docId}
        show={documentItem?.unRead}
        mustRead={documentItem?.mustRead || false}
        forbiClick={!isAssinee}
      >
        {children}
      </Read>
    </a>
  );
};

DocLayout.DocTitle = DocTitle;
DocLayout.DocField = DocField;

export default DocLayout;
