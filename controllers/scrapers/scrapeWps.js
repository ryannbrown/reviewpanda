app.post("/api/scrape", function (req, res) {
    // console.log("scraping", req.body.url);
    // let url = req.body.url;
    // let index = 6;
    for (var i = 1; i < 6; i++) {
        // let url = `https://www.wpspublish.com/profession-speech-language-pathology-slp?pagenumber=${i}`
        // let url = `https://www.wpspublish.com/profession-school-child-clinical-psychology?pagenumber=${i}`
        // let url = `https://www.wpspublish.com/profession-occupational-therapy-ot?pagenumber=${i}`
        // let url = `https://www.wpspublish.com/profession-neuropsychology?pagenumber=${i}`
        let url = `https://www.wpspublish.com/profession-adult-clinical-psychology?pagenumber=${i}`
        let category = 'Adult Clinical Psychology'
    axios.get(url).then(function (response) {
//         console.log("RUN ---------------------", i)
// console.log("search url", url)

      var $ = cheerio.load(response.data);
    
  // let types = []
        // console.log(category)
        $(".product-item__link").each(function(i, value) {
        // let category = $(this).parents('.collection-details').siblings().text().trim();
        let link = $(value).attr('href')
        let searchUrl = `https://www.wpspublish.com${link}`
    //    console.log(searchUrl, i)
  
        getDetails = (searchUrl) => {
          axios.get(searchUrl).then(function (response) {
            // console.log(searchUrl)
            var $ = cheerio.load(response.data);
        // let titleCode = $('.header-info > h1').text()
      //  console.log(category)

        let title = $('.product-card__info h1').text().trim();
        let abbrev =title.match(/\(([^)]+)\)/)[1]
        let author = $('.product-card__author span').text().trim();
        var description = $('.about__content .cbody').first().text().trim();
        if (!description.length) {
            var description = $('.about__content .body').first().text().trim();
            if (!description.length) {
                var description = $('.about__content h2 + p').first().text().trim(); 
            }
        }
        let benefits = $(`td.product-card__table-item-title:contains("Benefits") + td`).text().trim()
        let age_range = $(`td.product-card__table-item-title:contains("Ages") + td`).text().trim()
        let comp_time = $(`td.product-card__table-item-title:contains("Admin time") + td`).text().trim()
        let format = $(`td.product-card__table-item-title:contains("Format") + td`).text().trim()
        let scores = $(`td.product-card__table-item-title:contains("Scores") + td`).text().trim()
        let norms = $(`td.product-card__table-item-title:contains("Norms") + td`).text().trim()
        let publish_date = $(`td.product-card__table-item-title:contains("Publish Date") + td`).text().trim()
        let qual_level = $(`td.product-card__table-item-title:contains("Qualifications") + td`).contents().filter( function() {
            return this.nodeType==3;
        }).text().trim();
        let link = searchUrl;
console.log(abbrev)

      //  db('wps_tests')
      //       .insert([
      //         {
      //         title,
      //         category,
      //         benefits,
      //         author,
      //         format,
      //         scores,
      //         norms,
      //         publish_date,
      //      description,
      //         age_range,
      //         qual_level,
      //         comp_time,
      //       //   admin,
      //         // forms,
      //         // scores_interpretation,
      //         link
      //       }
      //          ])
            // .then(res.send("POST request to the homepage"))
            // .catch(err => console.log("err: ", err))


       
        // console.log(qual_level)

   
              })
  
            }
            getDetails(searchUrl, category)
            })
    })
}
      })
