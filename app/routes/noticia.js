module.exports = function(app){
    
    app.get('/noticia', function(req, res){
        var connection = app.config.db_connection();

        var modelNoticias = new app.app.models.NoticiasDAO(connection);

        modelNoticias.getNoticia(connection,function (error, result) {

            res.render("noticias/noticia", {noticia : result});
        });
    });
};