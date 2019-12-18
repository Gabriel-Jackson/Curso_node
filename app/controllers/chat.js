module.exports.inicia_chat = function (application, req, res) {

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou Apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou Apelido deve ter entre 3 e 15 caracteres').len(3, 15);

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros });
        return;
    }
    
    res.render("chat", {dadosForm: dadosForm});
}
