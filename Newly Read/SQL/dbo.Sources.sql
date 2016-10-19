CREATE TABLE [dbo].[Sources]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [sourceID] NVARCHAR(MAX) NULL, 
    [name] NVARCHAR(MAX) NULL, 
    [description] NVARCHAR(MAX) NULL, 
    [url] NVARCHAR(MAX) NULL, 
    [category] NVARCHAR(MAX) NULL, 
    [language] NVARCHAR(MAX) NULL, 
    [country] NVARCHAR(MAX) NULL, 
    [urlsToLogos] NVARCHAR(MAX) NULL, 
    [sortBysAvailable] NVARCHAR(MAX) NULL
)
