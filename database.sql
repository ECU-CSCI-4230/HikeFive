SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET default_with_oids = false;


CREATE TABLE id (
	id numeric (10,0) NOT NULL, /*Primary Key*/
	category numeric(1,0) NOT NULL /* 0 is person 1 is group*/
);

CREATE TABLE userID (
	id numeric (10,0) NOT NULL,
	email character varying(25) NOT NULL
);

CREATE TABLE user (
	fname character varying(15) NOT NULL,
	lname character varying(15) NOT NULL,
	gender character varying(5),
	age numeric (3,0),
	email character varying(25) NOT NULL, /*Primary Key*/
	sLevel numeric (1,0),
	priors character varying(100),
	location_zip character varying (10),
	location_country character varying(25),
	climber character varying(1),
	criminal character varying(1),
	travel character varying(1),
	gear character varying(1),
	night character varying(1),
	camper character varying(1),
	availability character varying(150),
	password character varying(20)
);

CREATE TABLE groupID (
	id numeric (10,0) NOT NULL, 
	name character varying(50) NOT NULL
);

CREATE TABLE groupCreator (
	groupID numeric (10, 0) NOT NULL,
	creatorID numeric (10, 0) NOT NULL,
	cdate date
);

CREATE TABLE group (
	name character varying(50) NOT NULL, /*Primary Key*/
	location_zip character varying(10),
	location_country character varying(25),
	experience numeric (1,0),
	private character varying(1),
	night character varying(1),
	gear character varying(1),
	climbing character varying(1),
	free_climber character varying(1),
	camping character varying(1)
);

CREATE TABLE post (
	poster numeric (10,0),
	postee numeric (10,0),
	text character varying(1000),
	pdate timestamp
);

CREATE TABLE message (
	sender numeric (10,0),
	receiver numeric (10,0),
	text character varying(1000),
	mdate timestamp
);

CREATE TABLE event (
	enum numeric (100,0) NOT NULL, /*Primary Key*/
	edate date,
	text character varying(1000),
	creatorID numeric (10, 0)
);

CREATE TABLE attending (
	enum numeric (100,0),
	id numeric(10,0)
);

	
	
	
	