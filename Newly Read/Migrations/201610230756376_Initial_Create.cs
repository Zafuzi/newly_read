namespace Newly_Read.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial_Create : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Articles",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        author = c.String(),
                        description = c.String(),
                        publishedAt = c.String(),
                        title = c.String(),
                        url = c.String(),
                        urlToImage = c.String(),
                        category = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Sources",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        sourceID = c.String(),
                        name = c.String(),
                        description = c.String(),
                        url = c.String(),
                        category = c.String(),
                        language = c.String(),
                        country = c.String(),
                        urlsToLogos = c.String(),
                        sortBysAvailable = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Sources");
            DropTable("dbo.Articles");
        }
    }
}
