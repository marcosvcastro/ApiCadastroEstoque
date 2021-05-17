using Controller;
using Dominio.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class EstoqueController : ControllerBase {

        [HttpGet("list")]
        [Authorize]
        public ActionResult<IEnumerable<Estoque>> List() {
            try {
                ControllerEstoque controllerEstoque = new ControllerEstoque();
                var listaEstoque = controllerEstoque.GetAll();

                return listaEstoque.ToList();

            } catch (Exception) {
                return new ObjectResult(null) { StatusCode = (int)HttpStatusCode.InternalServerError, Value = "Falha ao buscar informações!" };
            }
        }

        [HttpPost("saveOrUpdate")]
        [Authorize]
        public virtual ActionResult SaveOrUpdate(Estoque estoque) {
            try {
                ControllerEstoque controllerEstoque = new ControllerEstoque();
                controllerEstoque.Salvar(estoque);

                return Ok();
            } catch (Exception) {
                return new ObjectResult(null) { StatusCode = (int)HttpStatusCode.InternalServerError, Value = "Falha ao salvar informações!" };
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public virtual ActionResult<Estoque> Delete(Guid id) {
            try {
                ControllerEstoque controllerEstoque = new ControllerEstoque();
                controllerEstoque.Deletar(id);

                return Ok("Deletado com sucesso!");

            } catch (Exception) {
                return new ObjectResult(null) { StatusCode = (int)HttpStatusCode.InternalServerError, Value = "Falha ao buscar estoque!" };
            }
        }

        [HttpGet("searchId/{id}")]
        [Authorize]
        public virtual ActionResult<Estoque> SearchId(Guid id) {
            try {
                ControllerEstoque controllerEstoque = new ControllerEstoque();
                return controllerEstoque.Get(x => x.ID == id).FirstOrDefault();

            } catch (Exception) {
                return new ObjectResult(null) { StatusCode = (int)HttpStatusCode.InternalServerError, Value = "Falha ao buscar estoque!" };
            }
        }
    }
}

