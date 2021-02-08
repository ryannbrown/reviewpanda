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
 
    // await page.select('#ctl00_MPContentAll_MPContent_vProductList_ddlPageSize', '50')
     await page.screenshot({ path: "2.png" });
      const data = await page.evaluate(() => {
        const elements = document.querySelectorAll(".treenav-item a");
        const urls = Array.from(elements).map((v) => v.href);
        return urls;
      });
      scrapeSinglePage(data);
      console.log(data, "data")
    }
    scrapePage(url);
    // scrapeSinglePage()
  
    async function scrapeSinglePage(data) {
        console.log('single page')
      // let link = 'https://www.parinc.com/Products/Pkey/516';
      // const selector = "#dnn_ctr1373_ProductDisplay_lblPurpose";
      data.forEach( (link) => {
        axios.get(link).then(function (response) {
          var $ = cheerio.load(response.data);
            let title = $('#product-title').text()
            console.log(title)
            //   let description = $('#details > p').text()
            //   let category = cat
            //   let author = $('#dnn_ctr1373_ProductDisplay_lblProductAuthors').text()
            //   let age_range = $('#dnn_ctr1373_ProductDisplay_lblAgeRange').text()
            //   let comp_time = $('#dnn_ctr1373_ProductDisplay_lblHAdminTime').text()
            //  let qual_level =$('.qualLevel').text() 
            //  let admin = $('#dnn_ctr1373_ProductDisplay_lblFormat').text()  
  
          //         var $ = cheerio.load(response.data);
          
          //     let title = $('.program-details__name').text()
  
        //   db('par_tests')
        //           .insert([
        //             {
        //             title,
        //             author,
        //             category,
        //             description,
        //             age_range,
        //             qual_level,
        //             comp_time,
        //             admin,
        //             // forms,
        //             // scores_interpretation,
        //             link
        //           }
        //              ])
                  // .then(res.send("POST request to the homepage"))
                //   .catch(err => console.log("err: ", err))
                    })
                    })
                  }
                })
