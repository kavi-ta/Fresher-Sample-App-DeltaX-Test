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

INSERT INTO Songs(Name, CoverImage, ReleaseDate , Path )
VALUES ("Levitating","https://i.ytimg.com/vi/-Ileb6iOIag/mqdefault.jpg","2019-02-01","levitating.mp3"),
	   ("Holding Me Back","https://upload.wikimedia.org/wikipedia/en/d/d2/Illuminate_%28Official_Album_Cover%29_by_Shawn_Mendes.png","2020-04-02","holdingmeback.mp3"),
       ("I Don't Wanna Live Forever","https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png","2012-05-19","idontwannaliveforever.mp3"),
       ("Stitches","https://i.cbc.ca/1.4678126.1527269930!/fileImage/httpImage/image.jpg_gen/derivatives/original_1180/shawn-mendes.jpg","2015-08-01","stitces.mp3"),
       ("Bartender","https://w7.pngwing.com/pngs/91/16/png-transparent-t-pain-rapper-rappa-ternt-sanga-music-song-others-pain-glasses-moustache-thumbnail.png","1992-10-27","bartender.mp3"),
       ("Mercy","https://i.cbc.ca/1.4678126.1527269930!/fileImage/httpImage/image.jpg_gen/derivatives/original_1180/shawn-mendes.jpg","2003-09-08","mercy.m3"),
       ("Don't Start Now","https://upload.wikimedia.org/wikipedia/en/d/d2/Illuminate_%28Official_Album_Cover%29_by_Shawn_Mendes.png","2010-07-07","dontstartnow.mp3"),
	   ("Stitches Acoustic","https://i.cbc.ca/1.4678126.1527269930!/fileImage/httpImage/image.jpg_gen/derivatives/original_1180/shawn-mendes.jpg","2018-02-20","stitchesacoustic.mp3"),
       ("Lost in Japan","https://i.cbc.ca/1.4678126.1527269930!/fileImage/httpImage/image.jpg_gen/derivatives/original_1180/shawn-mendes.jpg","2019-03-19","lostinjapan.mp3") 
		,("Capital Letters","https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png","2016-09-09","capitalletters");
        
INSERT INTO Artists (Name,Dob,Bio)
VALUES ("Dua Lipa","1998-09-02","Singer, Songwriter , Model"),
		("Shawn Mendes","1997-10-05","Singer, Songwriter , Model"),
        ("Ed Sheeran","1987-07-06","Singer, Songwriter, Composer"),
        ("Hailey SteinFeld","2000-09-01","Singer, Songwriter , Model"),
        ("Lewis Capaldi","1991-09-14","Singer, Songwriter, Composer"),
        ("Taylor Swift","1986-10-06","Singer, Songwriter , Model , Artist , Composer, Grammy Winner"),
        ("Zayn Malik","1994-12-09","Singer, Songwriter , Model"),
        ("Halsey","1987-11-12","Singer, Songwriter, Model"),
        ("T-Pain","1981-12-07","Singer, Songwriter, Rapper, Composer"),
        ("Sean Paul","1980-09-06","Singer, Songwriter, Rapper");

 INSERT INTO ArtistSongMapping(ArtistId, SongId)
 VALUES (2,4),
		(1,1),
        (10,1),
        (2,2),
        (5,3),
        (6,3),
        (1,7),
        (2,7),
        (2,8),
        (4,8),
        (2,9),
        (9,5),
        (4,10),
        (2,6),
        (3,10)
ON DUPLICATE KEY UPDATE
 ArtistId = VALUES(ArtistId),
 SongId = VALUES(SongId);
 
 INSERT INTO UserSongRating(UserId, SongId, Rating)
 VALUES (1,1,4),
		(2,1,5),
        (3,1,3),
        (1,2,1),
		(2,2,2),
        (1,3,5),
		(2,3,1),
        (3,3,2),
        (1,4,1),
		(2,4,5),
        (3,4,2),
        (1,5,5),
		(2,5,5),
        (3,5,5),
        (1,6,1),
		(2,6,2),
        (3,6,3),
        (1,7,1),
		(2,7,5),
        (3,7,2),
        (1,8,4),
		(2,8,4),
        (3,8,2),
        (1,9,2),
		(2,9,2),
        (3,9,2),
        (1,10,4),
		(2,10,5),
        (3,10,2)
ON duplicate key update
UserId = VALUES(UserId),
SongId = VALUES(SongId),
Rating=VALUES(Rating);
        
        
INSERT INTO UserArtistRating(UserId, ArtistId, Rating)
VALUES (1,1,4),
		(2,1,5),
        (3,1,3),
        (1,2,1),
		(2,2,2),
        (1,3,5),
		(2,3,1),
        (3,4,2),
        (1,5,5),
		(2,5,5),
        (3,5,5),
        (1,6,1),
		(2,6,2),
        (3,6,3),
		(2,7,5),
        (3,7,2),
        (1,8,4),
		(2,8,5),
        (3,8,2),
        (1,9,2),
		(2,9,1),
        (3,9,2),
        (1,10,4),
		(2,10,2),
        (3,10,2)
ON DUPLICATE KEY UPDATE
UserId = VALUES(UserId),
ArtistId =VALUES(ArtistId),
Rating=VALUES(Rating);

