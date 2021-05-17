using Data.Configurations;
using Dominio.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data {
    public class ApiContexto :DbContext {


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //optionsBuilder.UseMySql("Database=api;Data Source=localhost;UserId=root;Password=123456;SslMode=None");
            optionsBuilder.UseSqlite(@"Data Source=api.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.ApplyConfiguration(new EstoqueConfiguration());
            base.OnModelCreating(modelBuilder);
        }

       // public DbSet<ResultConsumeApiExternal> ResultConsumeApiExternals { get; set; }
        public DbSet<Estoque> Estoques { get; set; }

        /*COMANDO MIGRATION
         * 
         * Add-Migration InitialCreate
         * Update-Database
         */
    }
}
