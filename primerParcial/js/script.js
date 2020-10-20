import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio.js";

let listaAnunciosAutos;
let frmAnuncioAutos;
let proximoId;
let divTabla;
//localStorage.clear();
window.addEventListener('load',inicializarManejadores);

function inicializarManejadores()
{
    
    listaAnunciosAutos = obtenerAnuncios();
    proximoId = obtenerId();
    divTabla = document.getElementById("divTabla");
    actualizarLista();
    
    frmAnuncioAutos = document.forms[0];
    
    frmAnuncioAutos.addEventListener('submit',e=>{
        e.preventDefault();
        const nuevoAnuncio = obtenerAnuncio();
        if(nuevoAnuncio)
        {
            listaAnunciosAutos.push(nuevoAnuncio);
            proximoId++;
            guardarDatos();
            actualizarLista();
        }
    });
}


function obtenerAnuncios()
{
    
    return JSON.parse(localStorage.getItem('anuncio_autos')) || [];
}

function obtenerId()
{
    
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

function obtenerAnuncio()
{
    
    const nuevoAnuncio = new Anuncio_Auto(proximoId,
        
        frmAnuncioAutos.titulo.value,        
        frmAnuncioAutos.transaccion.value,       
        frmAnuncioAutos.descripcion.value,
        frmAnuncioAutos.precio.value,
        frmAnuncioAutos.puertas.value,
        frmAnuncioAutos.kms.value,
        frmAnuncioAutos.potencia.value
        );
    
    return nuevoAnuncio;
}

function guardarDatos()
{
    localStorage.setItem('anuncio_autos',JSON.stringify(listaAnunciosAutos));
    localStorage.setItem('nextId',proximoId);
}

function actualizarLista()
{
    divTabla.innerHTML = "";
    
    setTimeout(()=>{
        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(listaAnunciosAutos));
        /*<i class="fa fa-floppy-o fa-spin fa-1x" aria-hidden="true"></i>*/
    },3000);
    
}