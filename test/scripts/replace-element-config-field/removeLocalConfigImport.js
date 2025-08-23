const removeLocalConfigImport = ({ content }) => {
  if (content.match(/localSectionConfig/)?.length === 1) {
    const result = content.replace(/import\s\{\slocalConfig\sas\slocalSectionConfig\s\}\sfrom\s'.*;\n/, '');
    console.log('rrrr', result);
    return result
  }
  return content
}

module.exports = { removeLocalConfigImport }
