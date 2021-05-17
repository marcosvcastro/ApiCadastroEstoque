import React, { useState, useEffect } from 'react';
import { getErrosFromApi } from '../utils/errorsHelper';
import stockService from '../service/stockService';
import Paper from '@material-ui/core/Paper';
import RefreshIcon from '@material-ui/icons/Refresh';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Table, TableHead, TableRow, TableCell, Typography, withStyles, TableContainer, Snackbar, Button, TableBody, TextField } from '@material-ui/core';
import StockNewEdit from './StockNewEdit';

const styles = theme => ({
  Button: {
    margin: "1em"
},
});

function Index(props) {
  const [message, setMessage] = useState({
    messageOpen: false,
    variantMessage: '',
    messageText: ''
  });

  const [arrayData, setArrayData] = useState([{}]);
  const [arrayDataFiltered, setArrayDataFiltered] = useState([{}]);
  const [isEditOrNew, setIsEditOrNew] = useState(false);
  const [idStockEdit, setidStockEdit] = useState(null);
  const [nameStockFilter, setNameStockFilter] = useState('');
  const { classes } = props;

/**
 * Executado ao iniciar a tela
 */
  useEffect(() => {
    handlerListStock();
  }, []);

  /**
   * Executado ao alterar (change) o filtro de nome do produto
   */
  useEffect(() => {
    filterListStock();
  }, [nameStockFilter]);

  /**
   * Buscar lista de estoques no banco de dados
   */
  async function handlerListStock() {
    try {
      let data = await stockService.list();
      setArrayData(data.data);
      setArrayDataFiltered(data.data);

    } catch (e) {
      setMessage({
        messageOpen: true,
        messageText: getErrosFromApi(e),
        variantMessage: 'error'
      });
    }
  }

  /**
   * Evento ao clicar em deletar registro
   * @param {*} rowData objeto com a linha a ser editada
   */
  function handlerDelete(rowData) {
    try {
      stockService.exclude(rowData.id);
      handlerListStock();

      setMessage({
        messageOpen: true,
        messageText: 'Registro deletado sucesso!',
        variantMessage: 'success'
      });

    } catch (e) {
      setMessage({
        messageOpen: true,
        messageText: getErrosFromApi(e),
        variantMessage: 'error'
      });
    }
  }

  /**
   * Evento executado ao clicar em editar registro
   * @param {*} rowData objeto com a linha a ser editada
   */
  function handlerEdit(rowData) {
    setidStockEdit(rowData.id);
    setIsEditOrNew(true);
  }

  /**
   * Evento ao clicar no botão novo produto
   */
  function handlerNew() {
    setIsEditOrNew(true);
  }

  /**
   * Executa ao retornar do componente de cadastro de produto
   * @param {*} saveSuccess true se o registro foi salvo, false se clicou em retornar
   */
  function onReturnStockNewEdit(saveSuccess) {
    setIsEditOrNew(false);

    if (saveSuccess) {
      setMessage({ messageOpen: true, variantMessage: 'success', messageText: 'Registro salvo com sucesso!' })
    }

    setidStockEdit(null);
    handlerListStock();
  }

  /**
   * Filtra lista de produtos ao informa o filtro, nome do produto
   */
  function filterListStock() {
    var filtered = [];
    if (arrayData.length !== 0) {
      if (nameStockFilter !== '') {
        arrayData.forEach((stock) => {
          if (stock.nomeProduto.toLowerCase().includes(nameStockFilter.toLowerCase()))
            filtered.push(stock);
        });
        setArrayDataFiltered(filtered);
     
      }else{
        setArrayDataFiltered(arrayData);
      }
      
    }
  };

  /**
   * Componente de exibição de mensagem
   * @param {*} props 
   * @returns 
   */
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  return (
    <>
      {!isEditOrNew && (
        <>
          <Snackbar open={message.messageOpen} onClose={() => setMessage({ messageOpen: false, messageText: '', variantMessage: 'success' })}>
            <Alert severity={message.variantMessage}>
              {message.messageText}
            </Alert>
          </Snackbar>
          <Typography component="h1" variant="h5">
            Listagem de produtos
          </Typography>

          <br />
          <br />
          <br />

          <TextField label="Produto" value={nameStockFilter} autoFocus onChange={(event) => setNameStockFilter(event.target.value)} InputLabelProps={{ shrink: true }} />

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.Button}
            startIcon={<RefreshIcon />}
            onClick={handlerListStock}
          >
            Atualizar lista produtos
      </Button>

      <Button
            variant="contained"
            color="primary"
            size="large"
            className={styles.button}
            startIcon={<AddCircleIcon />}
            onClick={handlerNew}
          >
            Novo
      </Button>

          <br />
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table className={styles.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Nome produto</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arrayDataFiltered && (arrayDataFiltered.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.nomeProduto}</TableCell>
                    <TableCell align="right">{row.quantidade}</TableCell>
                    <TableCell align="right">{row.valor}</TableCell>
                    <TableCell align="right">

                      <IconButton color="primary" onClick={(event, rowData) => handlerEdit(row)}><EditIcon /></IconButton>
                      <IconButton color="secondary" onClick={(event, rowData) => handlerDelete(row)}><DeleteIcon /></IconButton>

                    </TableCell>
                  </TableRow>
                )))}
              </TableBody>
            </Table>
          </TableContainer>
          
        </>
      )}

      {isEditOrNew && (
        <StockNewEdit onReturnStockNewEdit={onReturnStockNewEdit} idStockEdit={idStockEdit} />
      )}
    </>
  );
}

export default withStyles(styles)(Index);

