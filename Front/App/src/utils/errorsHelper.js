export const getErrosFromApi = error => {
  if (error) {  
  
    if (error.message) {
      if (error.message === 'Network Error')
        return `Falha de conexão com o servidor: <br/>${error.config.baseURL} <br/><br/>Verifique sua conexão e tente novamente.`;
      else return error.response.data;
    } else return JSON.stringify(error);
  } else
    return 'Erro ao executar operação!';
};