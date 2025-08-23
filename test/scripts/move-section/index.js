const exec = require("child_process").exec;

const moveSection = ({ section, sectionConfigPath, sectionRenderPath }) => {
  const downloadPath = '~/Downloads';
  const command = `mv ${downloadPath}/Section.${section}.Config.tsx ${sectionConfigPath}`;
  const moveRenderCommand = `mv ${downloadPath}/Section.${section}.Render.tsx ${sectionRenderPath}`;
  exec(command, async (error, stdout) => {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
  }});
  exec(moveRenderCommand, async (error, stdout) => {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
  }});
}
module.exports = { moveSection }
