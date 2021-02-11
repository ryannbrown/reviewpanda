app.post("/api/scrape", function (req, res) {
  console.log("scraping", req.body.url);
  let url = req.body.url;
  axios.get('https://storefront.mhs.com/collections/education').then(function (response) {

    var $ = cheerio.load(response.data);
// let types = []
      // console.log(category)
      $(".learn-more-button").each(function(i, value) {
      let category = $(this).parents('.collection-details').siblings().text().trim();
      let link = $(value).attr('href')
      let searchUrl = 'https://storefront.mhs.com' + link
      console.log(category, i)

      getDetails = (searchUrl, category) => {
        axios.get(searchUrl).then(function (response) {
          // console.log(searchUrl, category)
          var $ = cheerio.load(response.data);
      let abbrev = $('.header-info > h1').text()
    //  console.log(category)
      let title = $('.header-info > h3').text()
      let author = $('.header-info > p').text()
      let description = $('.description-content > p').text()
      let short_description = $('.collection-tagline > h2').text()
      let age_range = $('.quick-reference-heading:contains("Age") + .quick-reference-items > p').first().text()
      let admin = $('.quick-reference-heading:contains("Administration Type") + .quick-reference-items > p').first().text()
      let comp_time= $('.quick-reference-heading:contains("Administration Time") + .quick-reference-items > p').first().text()
      let qual_level = $('.quick-reference-heading:contains("Qualification Level") + .quick-reference-items > p').first().text()
      let link = searchUrl

  console.log(abbrev);
        db('mhs_tests')
          .insert([
            {
            title,
            abbrev,
            category,
            author,
            description,
            short_description,
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

      }
      getDetails(searchUrl, category)
        })
          })




    })
