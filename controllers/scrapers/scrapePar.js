app.post("/api/scrape", function (req, res) {
  // console.log("scraping", req.body.url);
  console.log("scraping");
  // let url = "https://www.parinc.com/Products/ACHIEVEMENT-DEVELOPMENT";
  let url = req.body.url
  let cat = req.body.cat
  async function scrapePage(url) {
    process.setMaxListeners(Infinity);
    console.log("here1");
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "1.png" });
    await page.waitForSelector(".col-md-4", {
      visible: true,
    });
    await page.screenshot({ path: "2.png" });
    const data = await page.evaluate(() => {
      const elements = document.querySelectorAll(".col-md-4 a");
      const urls = Array.from(elements).map((v) => v.href);
      return urls;
    });
    scrapeSinglePage(data);
    // console.log(data, "data")
  }
  scrapePage(url);
  // scrapeSinglePage()

  async function scrapeSinglePage(data) {
    // let link = 'https://www.parinc.com/Products/Pkey/516';
    // const selector = "#dnn_ctr1373_ProductDisplay_lblPurpose";
    data.forEach( (link) => {
      axios.get(link).then(function (response) {
        var $ = cheerio.load(response.data);
          let title = $('#dnn_ctr1373_ProductDisplay_lblProductName').text()
          let abbrev =$('#dnn_ctr1373_ProductDisplay_lblProuductAcronym').text()
            let description = $('#details > p').text()
            let category = cat
            let author = $('#dnn_ctr1373_ProductDisplay_lblProductAuthors').text()
            let age_range = $('#dnn_ctr1373_ProductDisplay_lblAgeRange').text()
            let comp_time = $('#dnn_ctr1373_ProductDisplay_lblAdminTime').text()
           let qual_level =$('.qualLevel').text() 
           let admin = $('#dnn_ctr1373_ProductDisplay_lblFormat').text()  

           console.log(title)

        //         var $ = cheerio.load(response.data);
        
        //     let title = $('.program-details__name').text()

        db('par_tests')
                .insert([
                  {
                  title,
                  abbrev,
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
