
module.exports = function(app){
    app.get('/add_noticia', function(req, res){
    res.render("admin/form_add_noticia", {validacao: {},noticia:{}});
    });

    app.post('/noticias/salvar', function(req, res){
        var noticia = req.body;
        
        req.assert('titulo',"Título é obrigatório").notEmpty();
        req.assert('resumo',"Resumo é obrigatório").notEmpty();
        req.assert('resumo',"Resumo deve conter entre 10 e 100 caracteres").len(10,100);
        req.assert('autor',"Autor é obrigatório").notEmpty();
        req.assert('data_noticia',"Data é obrigatória").notEmpty().isDate({format: 'YYYY-MM-DD'});
        req.assert('noticia',"Noticia é obrigatória").notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render("admin/form_add_noticia", {validacao: erros, noticia: noticia});
            return;
        }
        var connection = app.config.db_connection();
        var modelNoticias = new app.app.models.NoticiasDAO(connection);
        
        modelNoticias.setNoticia(noticia,  function (error, result) {
            res.redirect("/noticias");
        });
        });
};