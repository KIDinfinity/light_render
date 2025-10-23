import React from 'react';
import lodash from 'lodash';
import useGetSections from 'basic/components/Questionnaire/_hooks/useGetSections';
import styles from './index.less';
import Section from './Section';

const Sections = () => {
  const sections = useGetSections();
  return (
    <div className={styles.container}>
      {lodash.map(sections, (item: any, key) => {
        return <Section key={key} item={item} />;
      })}
    </div>
  );
};

Sections.displayName = 'Sections';

export default Sections;
