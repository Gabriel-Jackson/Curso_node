module.exports.index = function(application, req, res){
	var connection = application.config.db_connection();

	var modelNoticias = new application.app.models.NoticiasDAO(connection);

	modelNoticias.getLast5(function(error, result){
		res.render("home/index", {noticias : result});
	})
	
}