"use strict"
let indicador=0;
document.querySelector(".flecha-izquierda").addEventListener("click",()=>{
    
    document.querySelector(`.img-presentacion${indicador.toString()}`).style.opacity="0";
    document.querySelector(`.circulo${indicador+1}`).style.opacity="0.5";
    console.log(indicador);
    if(indicador == 0){
        indicador=4;
    }else{
        indicador--;
    }
    document.querySelector(`.circulo${indicador+1}`).style.opacity="0.9";
    document.querySelector(`.img-presentacion${indicador.toString()}`).style.opacity="1";
    console.log(indicador);
});


document.querySelector(".flecha-derecha").addEventListener("click",()=>{
    
    document.querySelector(`.img-presentacion${indicador.toString()}`).style.opacity="0";
    console.log(indicador);
    document.querySelector(`.circulo${indicador+1}`).style.opacity="0.5";
    if(indicador == 4){
        indicador=0;
    }else{
        indicador++;
    }
    document.querySelector(`.circulo${indicador+1}`).style.opacity="0.9";
    document.querySelector(`.img-presentacion${indicador.toString()}`).style.opacity="1";
    console.log(indicador);
});