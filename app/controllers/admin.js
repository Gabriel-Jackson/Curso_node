module.exports.add_noticia = function(application, req, res){
	res.render("admin/form_add_noticia", {validacao : {}, noticia : {}});
}

module.exports.noticias_salvar = function(application, req, res){
	var noticia = req.body;

	req.assert('titulo','Título é obrigatório').notEmpty();
	req.assert('resumo','Resumo é obrigatório').notEmpty();
	req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
	req.assert('autor','Autor é obrigatório').notEmpty();
	req.assert('autor','Autor deve até 30 caracteres').len(0,30);
	req.assert('data_noticia','Data é obrigatório').notEmpty();
	req.assert('data_noticia','Informe uma data válida').isDate({format: 'YYYY-MM-DD'});
	req.assert('noticia','Noticia é obrigatório').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render("admin/form_add_noticia", {validacao : erros, noticia : noticia});
		return;
	}

	var connection = application.config.db_connection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);

	noticiasModel.setNoticia(noticia, function(error, result){
		res.redirect('/noticias');
	});	
}