const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mensaje_bienvenida = "Bienvenido";
let conta = 0;

app.use(express.static("src/client"));

server.listen(8085,()=>{
    console.log("Server Running");
    //alert("Server Running");
});

io.on("connection",(socket) => {
    let posicion = "0";
    conta = 0;
    console.log("Cliente conectado");
    socket.emit("message", mensaje_bienvenida);
    //socket.emit("turno",posicion,conta);

    socket.on("new-message",(pos) =>{
        posicion = pos;
        //console.log(posicion,conta);
        io.emit("turno",posicion,conta);
        if (conta == 0) {
            conta = 1;
        }else if (conta == 1) {
            conta = 0;
        }
    });
    socket.on("ganador",(ganador)=>{
        let mensaje = "";
        if (ganador[0][0] == true) {
            mensaje = "el ganador es: "+ganador[0][1];
            //console.log(mensaje);
            io.emit("message",mensaje);
            dormir(1000);
            io.emit("mensaje_ganador",mensaje);         
        }else if (ganador[1][0] == true) {
            mensaje = "el ganador es: "+ganador[1][1];
            //console.log(mensaje);
            io.emit("message",mensaje);
            dormir(1000);
            io.emit("mensaje_ganador",mensaje); 
        }else if (ganador[2][0] == true) {
            mensaje = "el ganador es: "+ganador[2][1];
            //console.log(mensaje);
            io.emit("message",mensaje);
            dormir(1000);
            io.emit("mensaje_ganador",mensaje); 
        }else if (ganador[3][0] == true) {
            mensaje = "el ganador es: "+ganador[3][1];
            //console.log(mensaje);
            io.emit("message",mensaje);
            dormir(1000);
            io.emit("mensaje_ganador",mensaje); 
        } else if (ganador[4][0] == true) {
            mensaje = ganador[4][1];
            //console.log(mensaje);
            io.emit("message",mensaje);
            dormir(1000);
            io.emit("mensaje_ganador",mensaje); 
        }
    });
});


function dormir(seg) {
    for (let index = 0; index < seg; index++) {
        console.log("esperando");
    }
}