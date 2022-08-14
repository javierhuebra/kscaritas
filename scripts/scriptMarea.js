"use strict"
let date = new Date();
console.log(date);

fetch("../archives/fuente.json")
    .then((response) => response.json())
    .then((data) => showData(data));


function showData(archivoJson) {
    let horas1;
    let horas2;
    let horaActualFloat=parseFloat(`${date.getHours()}.${date.getMinutes()}`);
    let resulA;
    let resulB;
    let porcentaje;   

    let i = 0;

    let arregloJson = archivoJson.map((element) => { return element });

    archivoJson.map((element) => {

        if (element.day == date.getDate()) {
            console.log("entre al dia", element.day);
            let horaActual =`${date.getHours().toString().length < 2 ? '0'+ date.getHours().toString() : date.getHours().toString()}:${date.getMinutes().toString().length < 2 ?'0'+date.getMinutes().toString():date.getMinutes().toString()}`; //agregarle el cero adelante porque me compara mal revisar esto siempre
            let horaSola = date.getHours();
            let minutoSolo = date.getMinutes();
            
            console.log(horaActual, element.segundoCiclo.primeraHora[0]);
            console.log(horaActual > element.segundoCiclo.primeraHora[0]);

            console.log("el i vale" + i);
            console.log(arregloJson[i]);

            console.log(horaActual-"14:25")
            

            if (horaActual < element.primerCiclo.primeraHora[0]) {
                console.log("%cPRIMER IF","color: blue; font-family:serif; font-size: 20px");

                console.log(`La hora es ${horaActual}, tas antes de la primer hora del json`);

                console.log(`Esta en el rango ${arregloJson[i-1].segundoCiclo.segundaHora[0]} del dia de ayer - ${element.primerCiclo.primeraHora[0]} `);
                console.log(`La marea a las ${arregloJson[i-1].segundoCiclo.segundaHora[0]} del dia de ayer estaba ${arregloJson[i-1].segundoCiclo.segundaHora[1]} y a las ${element.primerCiclo.primeraHora[0]} de hoy estaba ${element.primerCiclo.primeraHora[1]} `)

                document.querySelector(".rango").style.marginLeft=`${arregloJson[i-1].segundoCiclo.bajo+5}%`;

                document.querySelector(".rango").style.marginRight=`${element.primerCiclo.alto+5}%`;

                document.querySelector(".min").innerHTML=`min: ${arregloJson[i-1].segundoCiclo.bajo}`;

                document.querySelector(".max").innerHTML=`max: ${element.primerCiclo.alto}`;

                horas1=parseFloat(`${arregloJson[i-1].segundoCiclo.segundaHora[0][0]}${arregloJson[i-1].segundoCiclo.segundaHora[0][1]}.${arregloJson[i-1].segundoCiclo.segundaHora[0][3]}${arregloJson[i-1].segundoCiclo.segundaHora[0][4]}`);
                horas2=parseFloat(`${element.primerCiclo.primeraHora[0][0]}${element.primerCiclo.primeraHora[0][1]}.${element.primerCiclo.primeraHora[0][3]}${element.primerCiclo.primeraHora[0][4]}`);
                horaActualFloat=parseFloat(`${date.getHours()}.${date.getMinutes().toString().length < 2 ?'0'+date.getMinutes().toString():date.getMinutes().toString()}`);
                horas1=horas1-24;
                resulA=horas2-horas1;
                resulB= horaActualFloat-horas1;
                console.log(horas1,horas2,horaActualFloat);
                porcentaje = ((resulB*100)/resulA).toFixed(2);
                
                console.log("Porcentaje:",porcentaje,"%");

                if(element.primerCiclo.primeraHora[1]=="Baja"){
                    
                    document.querySelector(".agua").style.right=`${porcentaje}%`;
                    console.log("marea bajando");
                }else{
        
                    document.querySelector(".agua").style.right=`${100-porcentaje}%`;
                    console.log("marea subiendo");
                }
            } else if (horaActual > element.primerCiclo.primeraHora[0] && horaActual < element.primerCiclo.segundaHora[0]) {
                console.log("%cSEGUNDO IF","color: blue; font-family:serif; font-size: 20px");

                console.log(`Son las ${horaActual} y esta dentro del rango ${element.primerCiclo.primeraHora[0]} - ${element.primerCiclo.segundaHora[0]} del primer ciclo`);

            } else if (horaActual > element.primerCiclo.segundaHora[0] && horaActual < element.segundoCiclo.primeraHora[0]) {
                console.log("%cTERCER IF","color: blue; font-family:serif; font-size: 20px");

                console.log(`Son las ${horaActual} y esta entre el primer ciclo y el segundo ${element.primerCiclo.segundaHora[0]}-${element.segundoCiclo.primeraHora[0]}`);
                console.log(`La marea a las ${element.primerCiclo.segundaHora[0]} estaba  ${element.primerCiclo.segundaHora[1]} con ${element.primerCiclo.segundaHora[1] === "Baja" ? element.primerCiclo.bajo : element.primerCiclo.alto} y a las ${element.segundoCiclo.primeraHora[0]} va a estar ${element.segundoCiclo.primeraHora[1]} con ${element.segundoCiclo.segundaHora[1] === "Alta" ? element.segundoCiclo.bajo : element.segundoCiclo.alto} `)

                document.querySelector(".rango").style.marginLeft=`${element.primerCiclo.bajo+5}%`;

                document.querySelector(".rango").style.marginRight=`${15-(element.segundoCiclo.alto)}%`;

                document.querySelector(".min").innerHTML=`min: ${element.primerCiclo.bajo}`;

                document.querySelector(".max").innerHTML=`max: ${element.segundoCiclo.alto}`;

                horas1=parseFloat(`${element.primerCiclo.segundaHora[0][0]}${element.primerCiclo.segundaHora[0][1]}.${element.primerCiclo.segundaHora[0][3]}${element.primerCiclo.segundaHora[0][4]}`);
                horas2=parseFloat(`${element.segundoCiclo.primeraHora[0][0]}${element.segundoCiclo.primeraHora[0][1]}.${element.segundoCiclo.primeraHora[0][3]}${element.segundoCiclo.primeraHora[0][4]}`);
                horaActualFloat=parseFloat(`${date.getHours()}.${date.getMinutes().toString().length < 2 ?'0'+date.getMinutes().toString():date.getMinutes().toString()}`);
                
                console.log(horas1,horas2,horaActualFloat);
                
                resulA=horas2-horas1;
                resulB= horaActualFloat-horas1;

                console.log(resulA,resulB,resulB*100/resulA);

                porcentaje = ((resulB*100)/resulA).toFixed(2);
                
                console.log("Porcentaje:",porcentaje,"%");

                if(element.segundoCiclo.primeraHora[1]=="Baja"){
                    
                    document.querySelector(".agua").style.right=`${porcentaje}%`;
                    console.log("marea bajando");
                }else{
        
                    document.querySelector(".agua").style.right=`${100-porcentaje}%`;
                    console.log("marea subiendo");
                }


                

            } else if (horaActual > element.segundoCiclo.primeraHora[0] && horaActual < element.segundoCiclo.segundaHora[0]) {
                console.log("%cCUARTO IF","color: blue; font-family:serif; font-size: 20px");

                console.log(`Son las ${horaActual} y esta en el segundo ciclo  ${element.segundoCiclo.primeraHora[0]} - ${element.segundoCiclo.segundaHora[0]}`);
                console.log(`La marea a las ${element.segundoCiclo.primeraHora[0]} estaba  ${element.segundoCiclo.primeraHora[1]} con ${element.segundoCiclo.primeraHora[1]==="Baja" ? element.segundoCiclo.bajo : element.segundoCiclo.alto} y a las ${element.segundoCiclo.segundaHora[0]} va a estar ${element.segundoCiclo.segundaHora[1]} con ${element.segundoCiclo.segundaHora[1]==="Alta" ? element.segundoCiclo.alto : element.segundoCiclo.bajo} `)
            
                document.querySelector(".rango").style.marginLeft=`${element.segundoCiclo.bajo+5}%`;

                document.querySelector(".rango").style.marginRight=`${15-(element.segundoCiclo.alto)}%`;

                document.querySelector(".min").innerHTML=`min: ${element.segundoCiclo.bajo}`;

                document.querySelector(".max").innerHTML=`max: ${element.segundoCiclo.alto}`;



                horas1=parseFloat(`${element.segundoCiclo.primeraHora[0][0]}${element.segundoCiclo.primeraHora[0][1]}.${element.segundoCiclo.primeraHora[0][3]}${element.segundoCiclo.primeraHora[0][4]}`);
                horas2=parseFloat(`${element.segundoCiclo.segundaHora[0][0]}${element.segundoCiclo.segundaHora[0][1]}.${element.segundoCiclo.segundaHora[0][3]}${element.segundoCiclo.segundaHora[0][4]}`);
                horaActualFloat=parseFloat(`${date.getHours()}.${date.getMinutes().toString().length < 2 ?'0'+date.getMinutes().toString():date.getMinutes().toString()}`);
                
                console.log(horas1,horas2,horaActualFloat);
                
                resulA=horas2-horas1;
                resulB= horaActualFloat-horas1;
                console.log("resultados a y b:",resulA,resulB);
                porcentaje = ((resulB*100)/resulA).toFixed(2);
                
                console.log("Porcentaje:",porcentaje,"%");

                if(element.segundoCiclo.segundaHora[1]=="Baja"){
                    
                    document.querySelector(".agua").style.right=`${porcentaje}%`;
                    console.log("marea bajando");
                }else{
                    
                    document.querySelector(".agua").style.right=`${100-porcentaje}%`;
                    console.log("marea subiendo");
                }
                

            } else if (horaActual > element.segundoCiclo.segundaHora[0]) {
                console.log("%cQUINTO IF","color: blue; font-family:serif; font-size: 20px");
                
                console.log(`Son las ${horaActual} y esta en el segundo ciclo  ${element.segundoCiclo.segundaHora[0]} - ${arregloJson[i+1].primerCiclo.primeraHora[0]} del dia de mañana`);
                console.log(`La marea a las  ${element.segundoCiclo.segundaHora[0]} estaba ${element.segundoCiclo.segundaHora[1]} con ${element.segundoCiclo.segundaHora[1]==="Baja" ? element.segundoCiclo.bajo : element.segundoCiclo.alto} y a las ${arregloJson[i+1].primerCiclo.primeraHora[0]} de mañana va a estar ${arregloJson[i+1].primerCiclo.primeraHora[1]} con ${arregloJson[i+1].primerCiclo.primeraHora[1]==="Alta" ? arregloJson[i+1].primerCiclo.alto : arregloJson[i+1].primerCiclo.bajo} `)
            
                document.querySelector(".rango").style.marginLeft=`${element.segundoCiclo.bajo+5}%`;

                document.querySelector(".rango").style.marginRight=`${15-(arregloJson[i+1].primerCiclo.alto)}%`;

                document.querySelector(".min").innerHTML=`min: ${element.segundoCiclo.bajo}`;

                document.querySelector(".max").innerHTML=`max: ${arregloJson[i+1].primerCiclo.alto}`;
                //falta agregar las horas para mostrar el agua
                
                horas1=parseFloat(`${element.segundoCiclo.segundaHora[0][0]}${element.segundoCiclo.segundaHora[0][1]}.${element.segundoCiclo.segundaHora[0][3]}${element.segundoCiclo.segundaHora[0][4]}`);
                horas2=parseFloat(`${arregloJson[i+1].primerCiclo.primeraHora[0][0]}${arregloJson[i+1].primerCiclo.primeraHora[0][1]}.${arregloJson[i+1].primerCiclo.primeraHora[0][3]}${arregloJson[i+1].primerCiclo.primeraHora[0][4]}`);
                horaActualFloat=parseFloat(`${date.getHours()}.${date.getMinutes().toString().length < 2 ?'0'+date.getMinutes().toString():date.getMinutes().toString()}`);
                
                console.log(horas1,horas2,horaActualFloat);
                horas2=horas2+12; //atento aca, revisar todo
                resulA=horas1-horas2;
                resulB= horaActualFloat-horas1;
                console.log("resultados a y b:",resulA,resulB);
                porcentaje = ((resulB*100)/resulA).toFixed(2);
                
                console.log("Porcentaje:",porcentaje,"%");

                if(arregloJson[i+1].primerCiclo.primeraHora[1]=="Baja"){
                    
                    document.querySelector(".agua").style.right=`${porcentaje}%`;
                    console.log("marea bajando");
                }else{
                    
                    document.querySelector(".agua").style.right=`${100-porcentaje}%`;
                    console.log("marea subiendo");
                }

            }

        }
        
        i++;
    });
}

//pruebas

