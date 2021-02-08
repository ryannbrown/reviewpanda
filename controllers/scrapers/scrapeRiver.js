app.post("/api/scrape", function (req, res) {
  // console.log("scraping", req.body.url);
  console.log("scraping");
  let url = "https://www.riversideinsights.com/solutions";
  // let url = req.body.url
  // let cat = req.body.cat
  async function scrapePage(url) {
    process.setMaxListeners(Infinity);
    console.log("here1");
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "1.png" });
    await page.waitForSelector(".solutionCard", {
      visible: true,
    });
    await page.screenshot({ path: "2.png" });
    let data = await page.evaluate(() => {
      const elements = document.querySelectorAll("div.solutionCard a");
      const urls = Array.from(elements).map((v) => v.href);
      return urls;
    });
    scrapeSinglePage(data);
//      console.log(data, "data")
  }
  scrapePage(url);
  // scrapeSinglePage()

  async function scrapeSinglePage(data) {
    // let link = 'https://www.parinc.com/Products/Pkey/516';
    // const selector = "#dnn_ctr1373_ProductDisplay_lblPurpose";
    for (const link of data) {
        console.log("going to", link)
    process.setMaxListeners(Infinity);
    console.log("inside");
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(link);
    // await page.screenshot({ path: "3.png" });
    try {
    await page.waitForSelector(".banner-three-fourth", {
      visible: true,
    })
   } catch (error) {
      console.log("no selector present for", link)
    }

    let data = await page.evaluate(() => {
let title = document.querySelector(".banner-three-fourth h1").innerText;
     let description = document.querySelector(".custom-text-section p").innerText
// need to use Xpath below?

        const qualHandle = await page.$x("//*[@id='cms-page']/div/main/span/div/section/main/section[1]/div[2]/div[1]/p")

      const qual_level = await page.evaluate(asyncel => el.textContent, qualHandle[0])
console.log
      const qual_level = document.querySelector('.halfWidth p b:contains("Restriction Level") + ul li a').innerText;

      return {
        title, description, qual_level
      }
    })
console.log(data);
    // await page.screenshot({ path: "5.png" });
    // let singleData = await page.evaluate(() => {
    //   const titleEl = document.querySelectorAll(".banner-three-fourth h1");
    //   const titles = Array.from(titleEl).map((v) => v.textContent);
    //   const descriptionEl = document.querySelector(".custom-text-section p");
    //   const description = Array.from(descriptionEl).map((v) => v.textContent);
    //   return titles, description;
    // });
    // console.log(singleData)
    // scrapeSinglePage(data);
        //     let description = $('#details > p').text()
        //     let category = cat
        //     let author = $('#dnn_ctr1373_ProductDisplay_lblProductAuthors').text()
        //     let age_range = $('#dnn_ctr1373_ProductDisplay_lblAgeRange').text()
        //     let comp_time = $('#dnn_ctr1373_ProductDisplay_lblHAdminTime').text()
        //    let qual_level =$('.qualLevel').text() 
        //    let admin = $('#dnn_ctr1373_ProductDisplay_lblFormat').text()  

        // //         var $ = cheerio.load(response.data);
        
        // //     let title = $('.program-details__name').text()

        // db('par_tests')
        //         .insert([
        //           {
        //           title,
        //           author,
        //           category,
        //           description,
        //           age_range,
        //           qual_level,
        //           comp_time,
        //           admin,
        //           // forms,
        //           // scores_interpretation,
        //           link
        //         }
        //            ])
        //         // .then(res.send("POST request to the homepage"))
        //         .catch(err => console.log("err: ", err))
                
                  }
}
})