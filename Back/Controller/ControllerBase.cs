using Data;
using Data.Repositorio.IRepositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Controller {
    public class ControllerBase<T, I, R>
        where T : class
        where I : IRepositorioBase<T>
        where R : IRepositorioBase<T> {

        protected ApiContexto contexto;
        protected I repositorio;

        public ControllerBase() {
            contexto = new ApiContexto();
            repositorio = (I)Activator.CreateInstance(typeof(R));
        }

        /// <summary>
        /// Busca todos registros de uma determinada entidade
        /// </summary>
        /// <returns>todos registros</returns>
        public IEnumerable<T> GetAll() {
            return repositorio.GetAll().ToList();
        }

        /// <summary>
        /// Busca registro de acordo com as condições
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns>retorna registro entidade</returns>
        public IList<T> Get(Expression<Func<T, bool>> predicate) {
            return repositorio.Get(predicate).ToList();
        }

        /// <summary>
        /// Salva um registro no banco de dados
        /// </summary>
        /// <param name="entity"></param>
        public void Save(T entity) {
            repositorio.Save(entity);
        }

        // <summary>
        /// Atualiza informações de um determinado registro
        /// </summary>
        /// <param name="entity"></param>
        public void Update(T entity) {
            repositorio.Update(entity);
        }

        /// <summary>
        /// Deleta um determinado registro de acordo com as condições
        /// </summary>
        /// <param name="predicate"></param>
        public void Delete(Func<T, bool> predicate) {
            repositorio.Delete(predicate);
        }

        /// <summary>
        /// Inicializa transação
        /// </summary>
        public void BeginTrasaction() {
            repositorio.BeginTrasaction();
        }

        /// <summary>
        /// Sincroniza informações com banco de dados
        /// </summary>
        public void SaveChanges() {
            repositorio.SaveChanges();
        }

        /// <summary>
        /// Comita informações ao banco de dados
        /// </summary>
        public void Commit() {
            repositorio.Commit();
        }

        /// <summary>
        /// Comita informações ao banco de dados
        /// </summary>
        public void RollbackTransaction() {
            repositorio.RollbackTransaction();
        }

            /// <summary>
            /// Libera recursos
            /// </summary>
            public void Dispose() {
            repositorio.Dispose();
        }
    }
}
