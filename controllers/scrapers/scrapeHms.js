app.post("/api/scrape", function (req, res) {
    console.log("scraping", req.body.url);
    let url = req.body.url;
    axios.get('https://www.hmhco.com/classroom-solutions').then(function (response) {
  
      var $ = cheerio.load(response.data);
  // let types = []
        // console.log(category)
        $(".a-z-filter__program-link").each(function(i, value) {
          // console.log("We are here")
        // let category = $(this).parents('.collection-details').siblings().text().trim();
        let link = $(value).attr('href')
        let searchUrl = 'https://www.hmhco.com/' + link
        // console.log(category, i)
  
        // console.log(link)
  
        getDetails = (searchUrl) => {
          axios.get(searchUrl).then(function (response) {
            // console.log(searchUrl)
            var $ = cheerio.load(response.data);
        // let titleCode = $('.header-info > h1').text()
      //  console.log(category)
        let title = $('.program-header__title').text()
        let author = 'HMH'
        let admin=''
        let qual_level=''
        let comp_time =''
        let short_description = $('.sub-section-intro__heading:first-of-type').text()
        let description = $('.blog-rich-text:first-of-type p').text()
        let age_range = $('.program-header__tag:first-of-type').text() 
        let subject = $('.program-header__tag:nth-child(2)').text() 
        let link = searchUrl
    console.log(title)
          db('hmh_tests')
            .insert([
              {
              title,
              // category,
              author,
              description,
              short_description,
              subject,
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
        getDetails(searchUrl)
          })
            })
  
  
  
  
      })