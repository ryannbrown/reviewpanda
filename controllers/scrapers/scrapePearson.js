app.post("/api/scrape", function (req, res) {
  console.log("scraping", req.body.url);
  let url = req.body.url;
  axios.get('https://www.pearsonassessments.com/professional-assessments/products/products-by-acronym.html').then(function (response) {

    var $ = cheerio.load(response.data);

    $(".content-tile-text a").each(function(i, value) {
      let link = $(value).attr('href')
      let searchUrl = 'https://www.pearsonassessments.com' + link
      console.log(searchUrl)
      axios.get(searchUrl).then(function (response) {

        var $ = cheerio.load(response.data);

    let title = $('.program-details__name').text()
    let description = $('.program-details__def').first().text()
    let age_range = $(`dt.program-details__term.term\\=AGE_RANGE`).next('dd').text().trim()
    let qual_level = $(`.quals-badge`).text().trim()
    let comp_time = $(`dt.program-details__term.term\\=COMPLETION_TIME`).next('dd').text().trim()
    // let comp_time = $(`dt.program-details__term.term\\=COMPLETION_TIME`).next('dd').children().text().trim()
    let admin = $(`dt.program-details__term.term\\=ADMINISTRATION`).next('dd').text().trim()
    let forms = $(`dt.program-details__term.term\\=FORMS`).next('dd').text().trim()
    let scores_interpretation = $(`dt.program-details__term.term\\=SCORES_INTERPRETATION`).next('dd').children().text().trim()

      db('pearson_tests')
        .insert([
          {
          title,
          description,
          age_range,
          qual_level,
          comp_time,
          admin,
          forms,
          scores_interpretation,
          link
        }
           ])
        // .then(res.send("POST request to the homepage"))
        .catch(err => console.log("err: ", err))
          })
          })

        })
        })