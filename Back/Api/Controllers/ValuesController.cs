using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace Api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController :ControllerBase {
        // GET api/values
        [HttpGet]
        public ActionResult<string> Get() {
            return "Pagina de teste api";
        }

        [HttpGet("getToken")]
        public ActionResult<string> GetToken() {
            using (HttpClient client = new HttpClient()) {
                client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

                var body = "{\"client_id\":\"NhMbxTsQmCov76MColTYZFyzaYFQZNRI\",\"client_secret\":\"TpkhtfU1lqjUQrPRwd-lCmA3-PGi2VbO_ekUwZqZ9k0r4UajmIyMq3Np3wSixEQl\",\"audience\":\"https://dev-i0hrodnn.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}";

                var httpContent = new StringContent(body, Encoding.UTF8, "application/json");
                var response = client.PostAsync("https://dev-i0hrodnn.us.auth0.com/oauth/token", httpContent).Result;

                //var response = client.PostAsync("oauth/token").Result;
                if (response.IsSuccessStatusCode) {
                    return Ok(response.Content.ReadAsStringAsync().Result);
                }
            }

            return BadRequest("Falha ao buscar token.");
        }
    }
}
