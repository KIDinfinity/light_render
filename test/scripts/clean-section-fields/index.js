const path = require('path');
const exec = require("child_process").exec;

const cleanFields = () => {
  const removeTSFilesCommand = `rm packages/Process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/**/Fields/*.ts`;
  const removeTSXFielsCommand = `rm packages/Process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/**/Fields/*.tsx`;
  exec(removeTSFilesCommand, async (error, stdout) => {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
  }});
  exec(removeTSXFielsCommand, async (error, stdout) => {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
  }});
}

module.exports = { cleanFields }
