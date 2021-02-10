app.post("/api/scrape", function (req, res) {
  // console.log("scraping", req.body.url);
  console.log("scraping");
  // let url = "https://www.parinc.com/Products/ACHIEVEMENT-DEVELOPMENT";
  let url = req.body.url
  // let url = 'https://www.proedinc.com/'
  let cat = req.body.cat
  async function scrapePage(url) {
    process.setMaxListeners(Infinity);
    console.log("here at", url);
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "1.png" });
  //   await page.waitForSelector("div.treenav-menu", {
  //     visible: true,
  //   });
  //   await page.select('#telCountryInput', 'my-value')
var lastPageNumber = 3
// const results = []
await page.waitForSelector("select#ctl00_MPContentAll_MPContent_vProductList_ddlPageSize", {
visible: true,
});
await page.select('select#ctl00_MPContentAll_MPContent_vProductList_ddlPageSize', '50')
await page.waitForSelector(".list-item-title a", {
visible: true,
});

  for (let index = 0; index < lastPageNumber; index++) {
    console.log("lets go")
    await page.screenshot({ path: `${index}.png` });
    // await page.waitForSelector("input#ctl00_MPContentAll_MPContent_vProductList_ctrPaging1_imgNext", {
    //   visible: true,
    // });
    await page.waitForSelector(".list-item-title a", {
      visible: true,
    });
  
    let data = await page.evaluate(() => {
      const elements = document.querySelectorAll(".list-item-title a");
      const urls = Array.from(elements).map((v) => v.href);
      return urls;
    });
    // console.log(results, "data", index)
    console.log("time to click")
    scrapeSinglePage(data, cat);
    // if ($('#ctl00_MPContentAll_MPContent_vProductList_ctrPaging1_imgNext').length) {
      await page.click('#ctl00_MPContentAll_MPContent_vProductList_ctrPaging1_imgNext');
    // }
  }      

    // const data = await page.evaluate(() => {
    //   const elements = document.querySelectorAll(".list-item-title a");
    //   const urls = Array.from(elements).map((v) => v.href);
    //   return urls;
    // });
 
    // console.log(data, "data")
  }
  scrapePage(url);
  // scrapeSinglePage()

  async function scrapeSinglePage(data, cat) {
      console.log('single page')
    // let link = 'https://www.parinc.com/Products/Pkey/516';
    // const selector = "#dnn_ctr1373_ProductDisplay_lblPurpose";
    data.forEach( (link) => {
      axios.get(link).then(function (response) {
        var $ = cheerio.load(response.data);
          let title = $('#product-title').text()
          let author =$('#product-byline').text()
          let category = cat;
          // let comp_time = ''
          // let admin = ''
          // ------------- just adding everything in these 3 columns -------
          var age_range = $(`#product-content-description strong:contains("Ages") + em`).text()
          if (!age_range.length > 0) {
            var age_range = $(`#product-content-description p:contains("Ages")`).text()
            // var description = $('#product-content-description p:nth-of-type(2)').text()
            // age_range = age_range.split(':')
          }
          var comp_time = $(`#product-content-description strong:contains("Testing Time") + em`).text()
          if (!comp_time.length > 0) {
            var comp_time = $(`#product-content-description p:contains("Testing Time")`).text()
            // var description = $('#product-content-description p:nth-of-type(2)').text()
            // age_range = age_range.split(':')
          }
          var admin = $(`#product-content-description strong:contains("Administration") + em`).text()
          if (!admin.length > 0) {
            var admin = $(`#product-content-description p:contains("Administration")`).text()
            // var description = $('#product-content-description p:nth-of-type(2)').text()
            // age_range = age_range.split(':')
          }

             // ------------- end of section -------


          var description = $('#product-content-description p:nth-of-type(3)').text()
          if (description.length < 100) {
            var description = $('#product-content-description p:nth-of-type(2)').text()

            if (description.length < 100) {
              var description = ''
            }
          }
          let qual_level = $(`#product-fields label:contains("Test Level") + span`).text()

         
          console.log(title)

        db('pro_tests')
                .insert([
                  {
                  title,
                  author,
                  category,
                  description,
                  age_range,
                  qual_level,
                  comp_time,
                  admin,
                  // forms,
                  // scores_interpretation,
                  link
                }
                   ])
                // .then(res.send("POST request to the homepage"))
                .catch(err => console.log("err: ", err))
                  })
                  })
                }
              })