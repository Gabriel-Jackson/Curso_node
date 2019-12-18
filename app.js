var app = require ("./config/server");


var server = app.listen(80, function(){
    console.log("servidor ON")
})
var sockets = {};

var io = require('socket.io').listen(server);
app.set('io', io);
io.on('connection', function (socket) {

    socket.on("join", function(data){
        console.log("Joined: " + data.apelido);
        sockets[socket.id] = data.apelido;

        socket.emit(
            "msgParaClient",
            {
                apelido: "Você",
                mensagem: "acabou de entrar no chat",
                class: "info info"
            } 
        );
        socket.broadcast.emit(
            "msgParaClient", 
            {
                apelido: data.apelido,
                mensagem: "acabou de entrar no chat",
                class: "info info"
            }
        )

    });

    socket.on("disconnect", function(){
        console.log("Disconnect");
        io.emit(
            "msgParaClient", 
            {
                apelido: sockets[socket.id],
                mensagem: "deixou o chat",
                class: "info info"
            }
        );
        delete sockets[socket.id];
    });
    socket.on('msgParaServer', function (data){
        socket.emit(
            'msgParaClient',
            {
                apelido: "Você", 
                mensagem: data.mensagem,
                class: "success host"
            }
        )
        socket.broadcast.emit(
            'msgParaClient',
            {
                apelido: data.apelido, 
                mensagem: data.mensagem,
                class: "warning guest" 
            }
        )

        if(parseInt(data.participantes_atualizados) == 0){
            socket.emit(
                "participanteParaClient", 
                "Você"
                );
            socket.broadcast.emit(
            "participanteParaClient", 
            data.apelido
            );
        }
    })
})