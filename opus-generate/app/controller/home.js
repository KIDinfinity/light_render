const { Controller } = require('egg');
const { ErrorRes } = require('../res-model/index');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg1';
  }

  /**
   * 生成PDFby Url
   * @param url {string} 链接
   * @return
   */
  async getPdfByUrl() {
    try {
      const { ctx, service } = this;
      const { url } = ctx.request.query;

      if (!url) {
        this.ctx.body = new ErrorRes({ error: 1, message: ' 缺少url' });
        return;
      }
      const pdf = await service.pdf.buildPdfByUrl(url);
      ctx.logger.info('pdf');
      ctx.res.setHeader('Content-Type', 'application/pdf');
      ctx.res.setHeader('Content-Length', pdf.length);
      ctx.body = pdf;
    } catch (error) {
      this.ctx.body = new ErrorRes({
        errno: 2,
        message: '生成失败',
        data: error,
      });
    }
  }

  /**
   * 生成PDFby content
   * @param content {string} html字符串
   */
  async getPdfByContent() {
    try {
      const { ctx, service } = this;
      const { content } = ctx.request.body;
      if (!content) {
        return (this.ctx.body = new ErrorRes({
          error: 1,
          message: ' 缺少content',
        }));
      }
      const pdf = await service.pdf.buildPdfByContent(content);
      ctx.logger.info('pdf');
      ctx.res.setHeader('Content-Type', 'application/pdf;');
      ctx.res.setHeader('Content-Length', pdf.length);
      ctx.res.setHeader('Content-Disposition', 'attachment; filename=test.pdf');
      ctx.body = pdf;
    } catch (error) {
      console.warn(error);
      this.ctx.body = new ErrorRes(
        {
          errno: 2,
          message: '生成失败',
          data: error,
        },
        error
      );
    }
  }
}

module.exports = HomeController;
