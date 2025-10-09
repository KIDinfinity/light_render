const puppeteer = require('puppeteer');
const Service = require('egg').Service;
const cheerio = require('cheerio');
const he = require('he');

class PDFService extends Service {
  // @ts-ignore
  config = {
    headless: true,
    args: [
      '--no-sandbox',
      '--enable-font-antialiasing',
      '--disable-font-subpixel-positioning',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
    ],
  };

  /**
   * 根据url生成PDF
   */
  async buildPdfByUrl(url) {
    // 启动无头浏览器
    const browser = await puppeteer.launch(this.config);
    try {
      // new一个Tab
      const page = await browser.newPage();
      // 设置窗口大小
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      // 跳转页面
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 0,
      });
      // 返回PDF Buffer
      const pdfBuffer = await page.pdf({
        // headerTemplate,
        // footerTemplate,
        margin: {
          top: 50,
          bottom: 50,
          left: 0,
          right: 0,
        },
        displayHeaderFooter: false,
        printBackground: true,
      });
      this.ctx.logger.info('pdfBuffer');
      return pdfBuffer;
    } catch (e) {
      throw e;
    } finally {
      browser.close();
    }
  }

  /**
   * 根据html content生成PDF
   */
  async buildPdfByContent(content) {
    const browser = await puppeteer.launch(this.config);
    try {
      const page = await browser.newPage();

      // 设置窗口大小
      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      const transBase64 = require('../utils/transBase64')?.transBase64;
      const path = require('path');
      const appRoot = path.resolve(__dirname, '../../');
      const fonts = [
        {
          path: path.resolve(
            appRoot,
            'app/public/fonts/FWDCircularTT-Book.ttf'
          ),
          name: 'FWD Circular TT Book',
        },
        {
          path: path.resolve(
            appRoot,
            'app/public/fonts/FWDCircularTT-Bold.ttf'
          ),
          name: 'FWD Circular TT Bold',
        },
      ];

      // 动态嵌入字体
      let cssOutput = '';
      fonts.forEach((font) => {
        cssOutput += transBase64(font.path, font.name);
      });
      const fontStyle = `<style>${cssOutput} body { font-family: 'FWD Circular TT Book'; }</style>`;

      // 将字体插入到 HTML 的 <head> 中
      const finalContent = content.replace(/<head>/i, `<head>${fontStyle}`);

      // 使用 cheerio 解析 HTML
      const $ = cheerio.load(finalContent);

      // 提取 headerComponent 的 HTML 内容
      const rawHeaderHtml = $('#headerComponent').html() || '';
      const cleanHeaderHtml = he.decode(rawHeaderHtml);

      // 构造 headerTemplate
      const headerTemplate = `
      <style>
        .pdf-header {
          font-size: 10pt;
          width: 100%;
          padding: 8px 0;
          text-align: right;
          margin: 0 auto;
          font-family: 'FWD Circular TT Book';
        }
      </style>
      <div class="pdf-header">
        ${cleanHeaderHtml}
      </div>
    `;
      console.log('======================');
      console.log(headerTemplate);
      console.log('======================');

      // 去掉 headerComponent，避免内容页重复出现
      $('#headerComponent').remove();

      // 重新设置处理过的 HTML
      await page.setContent($.html(), {
        waitUntil: 'networkidle0',
      });

      // 输出 PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: 80, // 页眉高度
          bottom: 50,
          left: 30,
          right: 30,
        },
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate: `<span></span>`,
        printBackground: true,
      });

      this.ctx.logger.info('PDF generated successfully');
      return pdfBuffer;
    } catch (e) {
      this.ctx.logger.error('PDF generation failed', e);
      throw e;
    } finally {
      await browser.close();
    }
  }
}

module.exports = PDFService;
