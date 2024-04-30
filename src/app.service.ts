import { Injectable } from '@nestjs/common';
import { Browser } from 'puppeteer-core';

const chrome = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')

@Injectable()
export class AppService {
  async getHello() {
    const isProd = process.env.NODE_ENV === 'production'

    let browser: Browser

    if (isProd) {
      browser = await puppeteer.launch({
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath(),
        headless: 'new',
        ignoreHTTPSErrors: true
      })
    } else {
      browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      })

      await browser.newPage()
    }

    const page = await browser.newPage()
    await page.setViewport({ width: 600, height: 600 })

    await page.goto('https://example.com/');
    const data = await await page.title();
    return data
  }
}
