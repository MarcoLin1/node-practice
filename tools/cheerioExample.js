const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://goodinfo.tw/tw/ShowK_Chart.asp?STOCK_ID=2330&CHT_CAT2=DATE';
const arr = []

axios.get(url)
  .then((response) => {
    // 使用Cheerio解析HTML
    const $ = cheerio.load(response.data);

    // 找到表格並選擇其中的tbody
    const tableBody = $('#tblPriceDetail tbody');

    // 迭代每一行
    tableBody.find('tr').each((index, row) => {
      // 使用Cheerio選擇每一行的td元素
      const columns = $(row).find('td');

      // 提取所需資料
      const date = columns.eq(0).text().trim();
      const changePercent = columns.eq(6).text().trim();
      const closingPrice = columns.eq(4).text().trim();
      const tradingVolume = columns.eq(8).text().trim();
      const institutionalTrading = columns.eq(12).text().trim();

      if (institutionalTrading !== '' && date !== '交易日期') {
        arr.push({
          '交易日期': date,
          '漲跌(%)': changePercent,
          '收盤價': closingPrice,
          '成交張數': tradingVolume,
          '法人買賣超(張)': institutionalTrading
        })
      }
    })
    console.log(arr)
  })
  .catch(error => {
    console.log('無法取得網頁內容', error)
  })
