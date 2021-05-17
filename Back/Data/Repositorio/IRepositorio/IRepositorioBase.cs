using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Repositorio.IRepositorio {
    public interface IRepositorioBase<T> where T : class {

        /// <summary>
        /// Busca todos registros de uma determinada entidade
        /// </summary>
        /// <returns>todos registros</returns>
        IQueryable<T> GetAll();

        /// <summary>
        /// Busca registro de acordo com as condições
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns>retorna registro entidade</returns>
        IList<T> Get(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Salva um registro no banco de dados
        /// </summary>
        /// <param name="entity"></param>
        void Save(T entity);

        /// <summary>
        /// Atualiza informações de um determinado registro
        /// </summary>
        /// <param name="entity"></param>
        void Update(T entity);

        /// <summary>
        /// Deleta um determinado registro de acordo com as condições
        /// </summary>
        /// <param name="predicate"></param>
        void Delete(Func<T, bool> predicate);

        /// <summary>
        /// Inicializa transação
        /// </summary>
        void BeginTrasaction();

        /// <summary>
        /// Sincroniza informações com banco de dados
        /// </summary>
        void SaveChanges();

        /// <summary>
        /// Comita informações ao banco de dados
        /// </summary>
        void Commit();

        /// <summary>
        /// Comita informações ao banco de dados
        /// </summary>
        void RollbackTransaction();

            /// <summary>
            /// Libera recursos
            /// </summary>
            void Dispose();



    }
}
