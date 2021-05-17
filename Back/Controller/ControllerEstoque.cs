using Data.Repositorio;
using Data.Repositorio.IRepositorio;
using Dominio.Entities;
using System;

namespace Controller {
    public  class ControllerEstoque : ControllerBase<Estoque, IRepositorioEstoque, RepositorioEstoque> {

        /// <summary>
        /// Salva ou atualiza registro de estoque
        /// </summary>
        /// <param name="estoque"></param>
        public void Salvar(Estoque estoque) {
            try {
                BeginTrasaction();

                if (estoque.ID == null || estoque.ID == Guid.Empty) {
                    Save(estoque);

                } else {
                    Update(estoque);
                }

                SaveChanges();
                Commit();
            } catch (Exception e){
                RollbackTransaction();
                throw e;
            }
        }

        /// <summary>
        /// Deleta registro de estoque
        /// </summary>
        /// <param name="id"></param>
        public void Deletar(Guid id) {
            BeginTrasaction();

            Delete(x => x.ID == id);

            SaveChanges();
            Commit();
        }
    }
}
