
module.exports = function(app){
    
    app.get('/noticias', function(req, res){
        var connection = app.config.db_connection();
        var modelNoticias = new app.app.models.NoticiasDAO(connection);
        
        modelNoticias.getNoticias(function (error, result) {
            res.render("noticias/noticias", {noticias : result});
        });
        
    });
};