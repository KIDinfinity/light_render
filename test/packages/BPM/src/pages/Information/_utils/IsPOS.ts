const IsPOS = (caseCategory: string) => {
  return ['BP_PAPER_CTG001', 'BP_POS_CTG001', 'BP_POS_CTG002', 'BP_POS_CTG003'].includes(
    caseCategory
  );
};

export default IsPOS;
