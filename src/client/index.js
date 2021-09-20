const address = "http://localhost:8085";
const socket = io.connect(address);
const aunucio  = document.getElementById("enunciado");
let ganador = [];
socket.on("message", (mensaje_bienvenida) => {
    //console.log(mensaje_bienvenida);
    bienvenida(mensaje_bienvenida);
});


socket.on("turno", (posicion,conta)=>{
    //console.log(turno, posicion);
    juego(posicion,conta);
    let matriz = pasar_matriz(llenar_arreglo());
    ganador = [triki_filas(matriz),
                triki_col(matriz),
                triki_diagonal([matriz[0][0],matriz[1][1],matriz[2][2]]),
                triki_diagonal([matriz[0][2],matriz[1][1],matriz[2][0]]),
                esEmpate(matriz)];
    socket.emit("ganador",ganador);
});

socket.on("mensaje_ganador",(mensaje)=>{
    alert(mensaje);
    location.reload();
});

const bienvenida = (mensaje_bienvenida) =>{
    aunucio.innerHTML = `${mensaje_bienvenida}`;
}

let juego = (posicion,conta)=>{
    if (conta == 0) {
        document.getElementById(posicion).innerHTML = "O";
        document.getElementById(posicion).value = "O";
    }else if (conta == 1) {
        document.getElementById(posicion).innerHTML = "X";
        document.getElementById(posicion).value = "X";
    }
};

const addFigure = (pos) =>{
    let variable = document.getElementById(pos);
   if (variable.value == undefined || variable.value == "") {
        socket.emit("new-message",pos);
    }
    return false;
};

function llenar_arreglo() {
    let arreglo = [];
    for (let index = 0; index < 9; index++) {
        arreglo.push(document.getElementById(index).value);
        
    }
    //console.log(arreglo);
    return arreglo;
}

function pasar_matriz(arreglo) {
    let aux = [];
    let matiz = [];
    let contador = 0;
    for (let index = 0; index < arreglo.length; index++) {
        aux.push(arreglo[index]);
        contador++;
        if (contador == 3) {
            matiz.push(aux);
            aux = [];
            contador = 0;
        }
    }
    //console.log(matiz);
    return matiz;
}

function triki_filas(matriz) {
    let conta_arr = 1;
    let arr = [];
    let ganador = "";
    for (let index = 0; index < matriz.length; index++) {
        arr = matriz[index]
        if (verificar_fila(arr)[0] == true) {
            return [verificar_fila(arr)[0],verificar_fila(arr)[1]]
        }
    }
    return [false,0];
}
function triki_col(matriz) {
    let arr = [];
    for (let index = 0; index < matriz.length; index++) {
        for (let x = 0; x < matriz.length; x++) {
            arr.push(matriz[x][index]);
        }
        //console.log(arr);
        if (verificar_fila(arr)[0] == true) {
            return [verificar_fila(arr)[0],verificar_fila(arr)[1]]
        }else{
            arr = [];
        }
    }
    return [false,0];
}

function triki_diagonal(arreglo) {
    if (verificar_fila(arreglo)[0] == true) {
        return [verificar_fila(arreglo)[0],verificar_fila(arreglo)[1]]
    }
    return [false,0];
}

function verificar_fila(arreglo) {
    let conta_arr = 1;
    for (let x = 0; x < (arreglo.length)-1; x++) {
        //console.log(conta_arr);
        if (arreglo[x] != undefined) {
            if (arreglo[x] == arreglo[x+1]) {
                conta_arr++;
            }
            if (conta_arr == 3) {
                return [true,arreglo[x]];
            }
        }
    }
    return [false,0];
}

function esEmpate(matriz) {
    let contador = 0;
    let aux = [];
    for (let index = 0; index < matriz.length; index++) {
        aux = matriz[index]
        for (let x = 0; x < aux.length; x++) {
            if (aux[x] != undefined) {
                contador++;
            }
        }
    }
    if (contador == llenar_arreglo().length) {
        return [true,"es un empate"];
    }

    return [false,0];
}