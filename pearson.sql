
-- Pearson

Create table pearson_tests (id SERIAL, title varchar(250) UNIQUE, abbrev varchar(150), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))


select * from pearson_tests 
ORDER by id;


drop table pearson_tests

delete from pearson_tests where title = ''

-- local

-----------------------------------------------------

-- elephant db

Create table pearson_tests (id SERIAL, category varchar(250), title varchar(250) UNIQUE, abbrev varchar(150), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))



select * from pearson_tests


drop table pearson_tests

delete from pearson_tests where id = 2


\COPY pearson_tests(id,category, title, abbrev,description,age_range,qual_level, comp_time, admin, forms, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/pearsons_tests.csv' DELIMITER ',' CSV HEADER;




-- PAR INC

Create table par_tests (id SERIAL, title varchar(250), category varchar(250), author varchar(500), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))

select * from par_tests
ORDER BY id;

drop table par_tests

\COPY par_tests(id, title, category, abbrev, author, description,age_range,qual_level, comp_time, admin, forms, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/par_tests.csv' DELIMITER ',' CSV HEADER;


------------


--mhs_tests



Create table mhs_tests (id SERIAL, title varchar(250), abbrev varchar(150), category varchar(250), author varchar(500), description varchar(8000), short_description varchar(5000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))

select * from mhs_tests
ORDER BY category;
select * from mhs_tests where title = 'Adaptive Behavior Assessment System, Third Edition'

delete from mhs_tests where title = ''

drop table mhs_tests

\COPY mhs_tests(id, title, abbrev, category, author, description, short_description, age_range,qual_level, comp_time, admin, forms, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/mhs_tests.csv' DELIMITER ',' CSV HEADER;


--------------------------


---- WPS TESTS


SET CLIENT_ENCODING TO 'utf8';

Create table wps_tests(id SERIAL, abbrev varchar(150), title varchar(250) UNIQUE, category varchar(250), author varchar(500), description varchar(8000), benefits varchar(5000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores varchar(10000), link varchar(200), norms varchar(500), format varchar(500), publish_date varchar(100))


select * from wps_tests

drop table wps_tests

update wps_tests set description = 'The TGMD-2, a major revision of the Test of Gross Motor Development, is a norm-referenced measure of common gross motor skills that can be used by kinesiologists, general and special educators, psychologists, and physical therapists.' where id = 120;

\COPY wps_tests(id, abbrev, title, category, author, description, benefits, age_range,qual_level, comp_time,  admin, forms , scores , link, norms , format , publish_date) FROM 'C:/Users/Kathryn/Downloads/review_dbs/wps_tests.csv' DELIMITER ',' CSV HEADER;

---------------------------------------------

-------PROED

Create table pro_tests (id SERIAL, title varchar(750) UNIQUE, category varchar(500), author varchar(500), description varchar(10000), age_range varchar(500), qual_level varchar(100), comp_time varchar(500), admin varchar(500), link varchar(300))

select * from pro_tests
select * from pro_tests where category = 'Speech and Language'

delete from pro_tests where id = '17';

drop table pro_tests
ALTER TABLE pro_tests ADD CONSTRAINT title_unique UNIQUE (title);
SET CLIENT_ENCODING TO 'utf8';

\COPY pro_tests(id, title, category, author, description, age_range, qual_level, comp_time,  admin, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/pro_tests.csv' DELIMITER ',' CSV HEADER;

-------------------------


----------------------------HMH

Create table hmh_tests (id SERIAL, title varchar(750) UNIQUE, category varchar(500), author varchar(500), description varchar(10000), short_description varchar(500), age_range varchar(500), subject varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(500), link varchar(300))

select * from hmh_tests


\COPY hmh_tests(id, title, category, author, description, short_description, age_range, subject, qual_level, comp_time,  admin, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/hmh_tests.csv' DELIMITER ',' CSV HEADER;


delete from hmh_tests where id = '2';

drop table hmh_tests

select * from pearson_tests
select * from mhs_tests;

-------------------------


\COPY riverside_tests(id, title, author, description, age_range, qual_level, comp_time,  admin, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/riverside_tests.csv' DELIMITER ',' CSV HEADER;





ALTER TABLE wps_tests
add column uuid uuid;

update wps_tests
set uuid = uuid_generate_v4();



---------------------- 2/11

select * from pearson_tests

drop table pearson_tests


Create table pearson_tests (id SERIAL, category varchar(250), title varchar(250) UNIQUE, abbrev varchar(150), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))


select * from pearson_tests


Create table mhs_tests (id SERIAL, title varchar(250) UNIQUE, abbrev varchar(150), category varchar(250), author varchar(500), description varchar(8000), short_description varchar(5000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))
select * from mhs_tests
drop table mhs_tests


select * from hmh_tests
Create table riverside_tests (id SERIAL, title varchar(750) UNIQUE, author varchar(500), description varchar(10000), age_range varchar (250),
							  qual_level varchar(250), comp_time varchar(250), admin varchar (500), scores_interpretation varchar(250), link varchar(300))
\COPY riverside_tests(id, title, author, description, age_range, qual_level, comp_time,  admin, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/review_dbs/riverside_tests.csv' DELIMITER ',' CSV HEADER;
drop table riverside_tests

select * from riverside_tests


ALTER TABLE hmh_tests
add column uuid uuid;

update hmh_tests
set uuid = uuid_generate_v4();


ALTER TABLE wps_tests
add column provider varchar(250);
update wps_tests
set provider = 'wps';

update mhs_tests
set uuid = uuid_generate_v4();





ALTER TABLE par_tests
add column uuid uuid;

update par_tests
set uuid = uuid_generate_v4();


select * from pearson_tests
ALTER TABLE pearson_tests
add column author varchar(500);

update pro_tests
set uuid = uuid_generate_v4();


  DROP TABLE IF EXISTS all_tests; Create TABLE all_tests as
SELECT C.title,C.author, C.qual_level, C.comp_time, C.age_range, C.abbrev, C.category, C.description, C.uuid, C.link, C.provider
FROM   mhs_tests AS C
UNION ALL
SELECT P.title, P.author, P.qual_level, P.comp_time, P.age_range, P.abbrev, P.category,P.description, P.uuid, P.link, P.provider
FROM   par_tests AS P
UNION ALL
SELECT R.title, R.author, R.qual_level, R.comp_time, R.age_range, R.abbrev, R.category,R.description, R.uuid, R.link, R.provider
FROM   pearson_tests AS R
UNION ALL
SELECT E.title, E.author, E.qual_level, E.comp_time, E.age_range, E.abbrev, E.category,E.description, E.uuid, E.link, E.provider
FROM   pro_tests AS E
UNION ALL
SELECT W.title, W.author, W.qual_level, W.comp_time, W.age_range, W.abbrev, W.category,W.description, W.uuid, W.link, W.provider
FROM   wps_tests AS W
UNION ALL
SELECT H.title, H.author, H.qual_level, H.comp_time, H.age_range, H.abbrev, H.category,H.description, H.uuid, H.link, H.provider
FROM   hmh_tests AS H
UNION ALL
SELECT I.title, I.author, I.qual_level, I.comp_time, I.age_range, I.abbrev, I.category,I.description, I.uuid, I.link, I.provider
FROM   riverside_tests AS I;


update all_tests
set title = TRIM(title)

select * from all_tests

select * from panda_categories


ALTER TABLE panda_categories
add column panda_cat varchar(250);


select DISTINCT ON (title) * from all_tests




Create TABLE panda_categories as
select DISTINCT category from all_tests

select * from panda_categories


select * from pearson_tests
where title = 'Wechsler Intelligence Scale for Children | Fifth Edition '
where category = 'Gifted & Talented'

Wechsler Intelligence Scale for Children | Fifth Edition 


select * from all_tests where title = 'PITRW for Students with Disruptive, Defiant, or Difficult Behaviors (Grades 5-12) Manual --Second Edition'



alter table reviews
add column test_uuid uuid;
select * from reviews;

ALTER TABLE reviews
RENAME COLUMN review_id TO review_uuid;


DROP TABLE IF EXISTS reviews; Create TABLE reviews(id SERIAL, test_title varchar(500), email varchar(100), rating integer, description varchar(8000), review_uuid uuid, test_uuid uuid)




 select distinct on (email) * from reviews where test_uuid = '7de009d3-43ec-45ec-849b-1783b25409ab' and email = 'sally@gmail.com'



--UPDATE TABLE
      db('pearson_tests')
       .where('title' , title)
       .update('author', author)
     .then(res.send("POST request to the homepage"))
        .catch(err => console.log("err: ", err))

















        --- REVIEWS

        select * from reviews

delete from reviews
where id ='3'


update reviews
set description = 'hey!'
where review_uuid = '307c5aca-29b3-4a5e-a875-5388a3f0eaa4'

select * from user_profiles

SELECT *
FROM information_schema.columns

select * from user_profiles



alter table reviews
add column date_posted date;

select * from user_profiles

update user_profiles
set avatar = 'https://upload.wikimedia.org/wikipedia/en/0/01/Nathan_Drake_Uc4_full_body_shot.png'
where id = 3



alter table user_profiles
add column saved_tests text[][]

UPDATE user_profiles SET saved_tests[4]= 'yo mamma'
    WHERE email = 'rb054549@gmail.com';
	
UPDATE user_profiles SET saved = saved || '[{"weight": 55, "date": "1996-03-02"}]'' WHERE email = 'rb054549@gmail.com'
  set weitghtsovertime = weightsovertime||'[{"weight": 55, "date": "1996-03-02"}]

update dummy set list = list || ARRAY[2, 3] where id = 1;

alter table reviews
drop column saved_tests

select * from reviews

delete from reviews
where full_name = 'undefined undefined'

drop table sal_emp

CREATE TABLE sal_emp (
    name            text,
    pay_by_quarter  integer[],
    schedule        text[][]
);

select * from sal_emp


INSERT INTO sal_emp
    VALUES ('Bill',
    '{10000, 10000, 10000, 10000}',
    '{{"meeting", "lunch"}, {"training", "presentation"}}');



    ---- 3/1/21
    --- setting panda_cats

-- ended up using retool to set categories = to the panda_cat



-- 3/12
-- added a new column of review_count 
alter table all_tests
add column review_count integer