
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



------------


--mhs_tests



Create table mhs_tests (id SERIAL, title varchar(250), category varchar(250), author varchar(500), description varchar(8000), short_description varchar(5000), age_range varchar(250), qual_level varchar(100), comp_time varchar(500), admin varchar(250), forms varchar(10000), scores_interpretation varchar(10000), link varchar(200))

select * from mhs_tests
ORDER BY category;
select * from mhs_tests where title = 'Adaptive Behavior Assessment System, Third Edition'

delete from mhs_tests where title = ''

drop table mhs_tests

--------------------------


