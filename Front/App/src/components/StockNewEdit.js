import React, { useState, useEffect } from 'react';
import { getErrosFromApi } from '../utils/errorsHelper';
import stockService from '../service/stockService';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Typography, withStyles, Snackbar, Button, TextField } from '@material-ui/core';

const styles =  ({
    TextField: {
        margin: "1em"
    },

    Button: {
        margin: "1em"
    },
});

function StockNewEdit(props) {
    const [message, setMessage] = useState({
        messageOpen: false,
        variantMessage: '',
        messageText: ''
    });

    const [data, setData] = useState({});

    /**
     * Executado ao iniciar a tela
     */
    useEffect(() => {
        searchId(props.idStockEdit);
    }, []);

    /**
     * Busca estoque por id. Feito dessa forma devido a possibilidade de na tela de listagem nao serem exibidos todos os campos
     * e nao ser necessario trazer todos os campos, nesse ponto pode ser buscado todos campos a serem editados (futuramete)
     * @param {*} id codigo do estoque
     */
    function searchId(id) {
        try {
            stockService.searchId(id).then(res => {
                setData(res.data);
            })

        } catch (e) {
            setMessage({
                messageOpen: true,
                messageText: getErrosFromApi(e),
                variantMessage: 'error'
            });
        }
    }

    /**
     * Salva um novo ou atualiza estoque
     */
    function handleSaveOrUpdate() {
        let dataCopy = { ...data };
        const { onReturnStockNewEdit } = props;

        if (!validate(dataCopy)) {
            return;
        }

        stockService
            .saveOrUpdate(dataCopy).then(res => {
                onReturnStockNewEdit(true);
            }).catch(error => {
                setMessage({
                    messageOpen: true,
                    variantMessage: 'error',
                    messageText: getErrosFromApi(error)
                })
            });
    }

    /**
     * Retorna para listagem de estoque
     */
    function handlerReturn() {
        const { onReturnStockNewEdit } = props;
        onReturnStockNewEdit(false);
    }

    /**
       * Componente de exibição de mensagem
       * @param {*} props 
       * @returns 
       */
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    /**
     * Atualiza estado de dados do estoque ao alterar algum campo da tela
     * @param {*} name nome do campo
     */
    const handleChangeForm = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    /**
     * Valida campos ao salvar dados
     * @param {*} dataCopy objeto estoque
     * @returns true se valido, false nao valido
     */
    function validate(dataCopy) {
        if (!dataCopy || !dataCopy.nomeProduto || !dataCopy.nomeProduto.trim()) {
            setMessage({ messageOpen: true, variantMessage: 'error', messageText: `Obrigatório informar nome do produto` })
            return false;
        }

        return true;
    }

    const { classes } = props;
    return (
        <>
            <Snackbar open={message.messageOpen} onClose={() => setMessage({ messageOpen: false, messageText: '', variantMessage: 'success' })}>
                <Alert severity={message.variantMessage}>
                    {message.messageText}
                </Alert>
            </Snackbar>
            <Typography component="h1" variant="h5">
                Cadastro de produtos
          </Typography>

            <br />
            <br />
            <br />
            <form className={classes.root} autoComplete="off">
                <TextField required className={classes.TextField} label="Produto" value={data.nomeProduto} autoFocus onChange={handleChangeForm("nomeProduto")} InputLabelProps={{ shrink: true }} />
                <TextField required className={classes.TextField} label="Quantidade" type="number" value={data.quantidade} onChange={handleChangeForm("quantidade")} InputLabelProps={{ shrink: true }} />
                <TextField required className={classes.TextField} label="Valor" type="number" value={data.valor} onChange={handleChangeForm("valor")} InputLabelProps={{ shrink: true }} />

                <br />
                <br />
                <br />
                <br />

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.Button}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={handlerReturn}>
                    Voltar
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.Button}
                    startIcon={<AddCircleIcon />}
                    onClick={handleSaveOrUpdate} >
                    Salvar
                </Button>
            </form>
        </>

    );
}

export default withStyles(styles)(StockNewEdit);

