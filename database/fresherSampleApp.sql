-- CREATE DATABASE FresherSampleApp;
use freshersampleapp;
DROP TABLE 
IF EXISTS Artists,ArtistSongMapping, Users,Songs,
 UserSongRating, UserArtistRating;


 CREATE TABLE Users (
 Id INT PRIMARY KEY auto_increment,
 Name VARCHAR(200) NOT NULL,
 Email VARCHAR(200) unique NOT NULL)
 ;
 
 CREATE TABLE Songs (
 Id INT PRIMARY KEY auto_increment,
 Name VARCHAR(200) NOT NULL ,
 CoverImage VARCHAR(512) NOT NULL,
 ReleaseDate date,
 Path varchar(512) NOT NULL
 );

 CREATE TABLE Artists(
 Id INT PRIMARY KEY auto_increment,
 Name VARCHAR(200) NOT NULL ,
 Dob date,
 Bio VARCHAR(200));
 
 CREATE TABLE ArtistSongMapping(
 Id INT PRIMARY KEY auto_increment,
 ArtistId Int references Artists(Id),
 SongId Int references Songs(Id),
 CONSTRAINT Song_Artist_Unique UNIQUE (ArtistId , SongId)
 );

 CREATE TABLE UserSongRating(
 Id INT PRIMARY KEY auto_increment,
 UserId Int references Users(Id),
 SongId Int references Songs(Id),
 Rating Int,
 CONSTRAINT User_Song_Unique UNIQUE (UserId , SongId)
 );
 
 CREATE TABLE UserArtistRating(
 Id INT PRIMARY KEY auto_increment,
 UserId Int references Users(Id),
 ArtistId Int references Artists(Id),
 Rating Int,
 CONSTRAINT User_Artist_Unique UNIQUE (UserId , ArtistId)
 );
 
 
INSERT INTO Users(Name,Email)
VALUES("Shilpa Kumari", "shilpa@gmail.com"),
		("Gitika Sunam", "gitikas@gmail.com"),
        ("Ganesh","ganesh@gmail.com");


 
 INSERT INTO ArtistSongMapping(ArtistId, SongId)
 VALUES (1,1),
		(1,2);
 
 INSERT INTO UserSongRating(UserId, SongId, Rating)
 VALUES (1,1,4),
		(2,1,5),
        (3,1,3);
        
INSERT INTO UserArtistRating(UserId, ArtistId, Rating)
VALUES (1,1,4),
(2,1,3),
(3,1,5);

