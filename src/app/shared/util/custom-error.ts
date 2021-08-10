const CustomError = {

    serviceError(_error) {

        if (_error.error && _error.error.data) {
            let error = _error.error;

            let mensagem = '';
            if (error.data && error.data.total > 0) {
                for (let index = 0; index < error.data.items.length; index++) {
                    const element = error.data.items[index];
                    mensagem += `${element}\r\n`;
                }
            }

            return `${error.msn} \r\n ${mensagem}`;
        } else {
            return 'Não é possível realizar essa ação!';
        }
    }

};

export {
    CustomError
};