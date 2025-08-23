const { exec } = require("child_process");

const addHookUsing = ({ content, path }) => {
  if (/import\s+useGetRequiredByRole/.test(content)) {
    if (/const\s+requiredConditions\s+=\s+true/.test(content)) {
      const result = content?.replace(/const\s+requiredConditions\s+=\s+true;/, `const requiredConditions = true;\n  const requiredByRole = useGetRequiredByRole({
        requiredConditions,
        config,
        localConfig: fieldConfig,
      });`)
      return result
    }
    const s = `const requiredConditions = Rule(config['field-props']['required-condition'], form, '');`
    const s2 = ` const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');`
    const reg1 = /const\s+requiredConditions\s+=\s+Rule\(config\['field-props'\]\['required-condition'\],\s+form,\s+''\);/
    const reg2 = /const\s+requiredConditions\s+=\s+RuleByForm\(fieldProps\['required-condition'\],\s+form,\s+''\);/
    if (reg1.test(content)) {
      const result = content?.replace(/const\s+requiredConditions\s+=\s+true;/, `${s}\n  const requiredByRole = useGetRequiredByRole({
        requiredConditions,
        config,
        localConfig: fieldConfig,
      });`)
      return result
    }
    if (reg2.test(content)) {
      const result = content?.replace(/const\s+requiredConditions\s+=\s+true;/, `${s2}\n  const requiredByRole = useGetRequiredByRole({
        requiredConditions,
        config,
        localConfig: fieldConfig,
      });`)
      return result
    }
  }

  if (!/const\s+requiredConditions\s+=\s+true/.test(content)) {
    console.log('hello here', path)
    exec(`echo ${path} >> ./specialFieldRequired.log`)

  }
  return content
}

module.exports = { addHookUsing }
