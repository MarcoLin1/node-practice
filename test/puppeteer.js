const puppeteer = require('puppeteer-core')

const waitingTime = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

(async () => {
  // 如果已經有裝 chrome 的話可以直接指定安裝好的 chrome 路徑，這樣就不用再去安裝 puppeteer 的 chrome 節省 package 的大小
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false // 無外殼的 chrome，有更佳的效能
  })
  const page = await browser.newPage()

  // 測試 google 輸入 Hello World，點選搜尋結果播放影片
  // await page.goto('http://www.google.com')
  // await page.setViewport({
  //   width: 1400,
  //   height: 1000 
  // })
  // // 擷取畫面
  // // await page.screenshot({ path: 'google.png' })
  // await page.waitForSelector('#APjFqb')
  // await page.type('#APjFqb', 'Hello World')
  // await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b')
  // await waitingTime(500)
  
  // await page.click('a[href*="https://anime1.me/category/2019%E5%B9%B4%E5%A4%8F%E5%AD%A3/hello-world"]')
  // await waitingTime(500)

  // await page.click('#vjs-YXsFS > button')
  // await waitingTime(10000)

  await page.setViewport({
    width: 1600,
    height: 1000
  })
  await page.goto('https://rabbitfund-frontend.vercel.app/project/6481db2f77f0a16116c691de/info')
  await page.waitForSelector('#__nuxt > div > section > nav > div > div.hidden.items-center.gap-10 > div.flex.gap-6 > button.btn.btn-primary')
  await page.click('#__nuxt > div > section > nav > div > div.hidden.items-center.gap-10 > div.flex.gap-6 > button.btn.btn-primary')
  
  await page.waitForSelector('#email')
  await page.type('#email', 'marcolin123324@gmail.com')
  await page.type('#password', '123456789')
  await page.click('#__nuxt > div > section > section > div > div > form > button')
  // await browser.close()
})();