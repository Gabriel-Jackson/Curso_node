module.exports = function(application){
	application.get('/add_noticia', function(req, res){
		application.app.controllers.admin.add_noticia(application, req, res);
	});

	application.post('/noticias/salvar', function(req, res){
		application.app.controllers.admin.noticias_salvar(application, req, res);
	});
}