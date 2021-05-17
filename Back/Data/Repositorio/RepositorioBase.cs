using Data.Repositorio.IRepositorio;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Repositorio {
    public class RepositorioBase<T> :IRepositorioBase<T>, IDisposable where T : class {
        protected ApiContexto Context;

        public RepositorioBase() {
            Context = new ApiContexto();
        }

        /// <summary>
        /// Busca todos registros de uma determinada entidade
        /// </summary>
        /// <returns>todos registros</returns>
        public IQueryable<T> GetAll() {
            return Context.Set<T>();
        }

        /// <summary>
        /// Busca registro de acordo com as condições
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns>retorna registro entidade</returns>
        public IList<T> Get(Expression<Func<T, bool>> predicate) {
            return Context.Set<T>().Where(predicate).ToList();
        }

        /// <summary>
        /// Salva um registro no banco de dados
        /// </summary>
        /// <param name="entity"></param>
        public void Save(T entity) {
            Context.Set<T>().Add(entity);
        }

        /// <summary>
        /// Atualiza informações de um determinado registro
        /// </summary>
        /// <param name="entity"></param>
        public void Update(T entity) {
            Context.Entry(entity).State = EntityState.Modified;
        }

        /// <summary>
        /// Deleta um determinado registro de acordo com as condições
        /// </summary>
        /// <param name="predicate"></param>
        public void Delete(Func<T, bool> predicate) {
            Context.Set<T>()
           .Where(predicate).ToList()
           .ForEach(del => Context.Set<T>().Remove(del));
        }

        /// <summary>
        /// Inicializa transação
        /// </summary>
        public void BeginTrasaction() {
            Context.Database.BeginTransaction();
        }

        /// <summary>
        /// Sincroniza informações com banco de dados
        /// </summary>
        public void SaveChanges() {
            Context.SaveChanges();
        }

        /// <summary>
        /// Comita informações ao banco de dados
        /// </summary>
        public void Commit() {
            Context.Database.CommitTransaction();
        }

        /// <summary>
        /// Comita informações ao banco de dados
        /// </summary>
        public void RollbackTransaction() {
            Context.Database.RollbackTransaction();
        }

        /// <summary>
        /// Libera recursos
        /// </summary>
        public void Dispose() {
            if (Context != null) {
                Context.Dispose();
            }
        }
    }
}