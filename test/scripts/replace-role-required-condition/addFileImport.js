const addFileImport =({ content }) => {
  if (/const\s+requiredConditions\s+=\s+true/.test(content)) {
    const result = content.replace(/import\s+React\s+from\s+'react';/, "import React from 'react';\nimport useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole'")
    return result
  }
  return content
}

module.exports = { addFileImport }
