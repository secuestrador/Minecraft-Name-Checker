const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
var textAreaValue = document.querySelector(".t1-textarea");
textAreaValue.addEventListener("keypress", function (e){
    if (e.keyCode == 13 && !e.shiftKey) {
        textAreaValue = textAreaValue.value.split("\n");
        validar(textAreaValue)
    }
});

/* Text Area */

const names = {
    Validos:[
        
    ],

    Invalidos:[
        
    ],

    Error:[

    ]
}

/* Checked Names Array */

let consoleGroup = false;

async function obtenerLista() {
    let names = await fetch("names.json");
    var nameList = await names.json();
    validar(nameList);  
}

document.getElementById("saveIt").addEventListener("click",saveIt)

function saveIt(){
    var blob = new Blob([`${names.Validos.toString().replaceAll(",","\n")}`]);
    saveAs(blob, "dynamic.txt");
};

async function validar(nameList){
    for (let index = 0; index < nameList.length; index++) {
        let respuesta = await fetch(corsAnywhere + `https://api.mojang.com/users/profiles/minecraft/` + `${nameList[index]}`)
        if (respuesta.status == 204) {
            console.log(`%c${nameList[index]} esta di El nombre: sponible!`,`color:green`);
            names.Validos.push(nameList[index]);
            document.querySelector(".resultArea").innerHTML += `<div class="box-result__output">
            <div class="box-result__image" style="background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsteamrep.com%2Fsteamimage%2Favatars%2Ff8%2Ff8de58eb18a0cad87270ef1d1250c574498577fc_full.jpg&f=1&nofb=1&ipt=d02b2c62d60cc35414aaee1b55045f85ce2fdc0b24cd68334fb3757d47f6b7da&ipo=images');"></div>
                <div class="box-result__text">
                • Username: ${nameList[index]}<br>
            </div>
            <img class="box-result__icon" src="assets/checked.png">
            </div>`;
        }
        else if (respuesta.status == 200) {
            console.log(`%c El nombre: ${nameList[index]} no esta disponible!`,`color:red`)
            names.Invalidos.push(nameList[index])
        }
        else {
            console.log(`%c Error on name: ${nameList[index]}`,`color:red`)
            names.Error.push(nameList[index])
        }
    }
}
document.getElementById("checkThem").addEventListener("click",obtenerLista)
