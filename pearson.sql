
-- Pearson

Create table pearson_tests (id SERIAL, title varchar(250), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))


select * from pearson_tests 
ORDER by id;


drop table pearson_tests

delete from pearson_tests where title = ''

-- local

-----------------------------------------------------

-- elephant db

Create table pearson_tests (id SERIAL, title varchar(250), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))


select * from pearson_tests


drop table pearson_tests

delete from pearson_tests where id = 2


\COPY pearson_tests(id,title,description,age_range,qual_level, comp_time, admin, forms, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/pearsons_tests.csv' DELIMITER ',' CSV HEADER;




-- PAR INC

Create table par_tests (id SERIAL, title varchar(250), category varchar(250), author varchar(500), description varchar(10000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))

select * from par_tests
ORDER BY id;

drop table par_tests

\COPY par_tests(id, title, category, author, description,age_range,qual_level, comp_time, admin, forms, scores_interpretation, link) FROM 'C:/Users/Kathryn/Downloads/par_tests.csv' DELIMITER ',' CSV HEADER;


------------


--mhs_tests



Create table mhs_tests (id SERIAL, title varchar(250), category varchar(250), author varchar(500), description varchar(8000), short_description varchar(5000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))

select * from mhs_tests
ORDER BY category;
select * from mhs_tests where title = 'Adaptive Behavior Assessment System, Third Edition'

delete from mhs_tests where title = ''

drop table mhs_tests

--------------------------


---- WPS TESTS




Create table wps_tests(id SERIAL, title varchar(250) UNIQUE, category varchar(250), author varchar(500), description varchar(8000), benefits varchar(5000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores varchar(10000), link varchar(200), norms varchar(500), format varchar(500), publish_date varchar(100))


select * from wps_tests

drop table wps_tests

update wps_tests set description = 'The TGMD-2, a major revision of the Test of Gross Motor Development, is a norm-referenced measure of common gross motor skills that can be used by kinesiologists, general and special educators, psychologists, and physical therapists.' where id = 120;


---------------------------------------------