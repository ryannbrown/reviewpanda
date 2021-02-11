
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