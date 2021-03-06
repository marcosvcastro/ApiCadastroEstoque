// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Data.Migrations
{
    [DbContext(typeof(ApiContexto))]
    partial class ApiContextoModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085");

            modelBuilder.Entity("Dominio.Entities.Estoque", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("NomeProduto")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<float>("Quantidade")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0f);

                    b.Property<float>("Valor");

                    b.HasKey("ID");

                    b.ToTable("Estoques");
                });
#pragma warning restore 612, 618
        }
    }
}
