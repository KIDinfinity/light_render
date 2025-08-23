import React from 'react';
import List from './List';

const Questions = ({ questions }: any) => {
  return <List questions={questions} />;
};

Questions.displayName = 'questions';

export default Questions;
