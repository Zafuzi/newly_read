namespace Newly_Read.Models {
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class ArticlesModel : DbContext {
        public ArticlesModel()
            : base("name=ArticlesModel.cs") {
        }

        public virtual DbSet<ArticleEntity> MyEntities { get; set; }
    }

    public class ArticleEntity {
        public object Articles { get; internal set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}