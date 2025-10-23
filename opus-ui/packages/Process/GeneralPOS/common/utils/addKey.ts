export default (newUIconfig, item, power) => {
  if (
    !newUIconfig[item.sectionType] ||
    (newUIconfig[item.sectionType] && newUIconfig[item.sectionType].power < power)
  ) {
    newUIconfig[item.sectionType] = { ...item, power };
  }
};
