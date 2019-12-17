function NoticiasDAO(connection){
    this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){

    this._connection.query("SELECT * FROM noticias", callback);

};
NoticiasDAO.prototype.getNoticia = function (id_noticia,callback) {
    this._connection.query("SELECT * FROM noticias where id_noticia = " + id_noticia.id_noticia, callback);
};
NoticiasDAO.prototype.setNoticia = function (noticia, callback){
    this._connection.query('insert into noticias set ?', noticia, callback);
};

NoticiasDAO.prototype.getLast5 = function (callback){
    this._connection.query("select * from noticias order by data_criacao desc limit 5", callback)
};

module.exports = function(){

    return NoticiasDAO;
}