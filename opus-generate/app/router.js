/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/pdf/getPDF', controller.home.getPdfByUrl);
  router.post('/pdf/generatePDF', controller.home.getPdfByContent);
};
