using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Configurations {
    public class EstoqueConfiguration :IEntityTypeConfiguration<Estoque> {
        public void Configure(EntityTypeBuilder<Estoque> builder) {

            builder.HasKey(s => s.ID);
           //builder.Property(p => p.ID).HasValueGenerator();

            builder.Property(s => s.NomeProduto)
                 .HasMaxLength(30)
                .IsRequired();

            builder.Property(r => r.Quantidade).HasDefaultValue(0);

            builder.Property(s => s.Valor)
                .IsRequired();
           
        }
    }
}
    