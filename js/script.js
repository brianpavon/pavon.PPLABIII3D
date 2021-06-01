import { frm, limpiarFormulario, mostrarBotones } from "./formularios.js";
import { crearTabla, agregarSpinner,eliminarSpiner } from "./domDinamico.js";
import Anuncio_Auto from "./anuncio.js";
const listaAnuncios = obtenerListaAnuncios();
let proximoId;

window.addEventListener("DOMContentLoaded", () => {
  proximoId = obtenerId();
  frm.addEventListener("submit", manejadorSubmit);
  document.addEventListener("click", manejadorClick);
  if (listaAnuncios.length > 0) {
    manejadorTabla();
  }
});

function obtenerListaAnuncios() {
  return JSON.parse(localStorage.getItem("lista")) || [];
}

function obtenerId() {
  return JSON.parse(localStorage.getItem("siguienteId")) || 1;
}

function altaAnuncioAuto(p) {
  listaAnuncios.push(p);
  almacenarDatos(listaAnuncios);
  manejadorTabla();
}

//modifico persona
function modificarAnuncioAuto(p) {
  let indice = listaAnuncios.findIndex((el) => {
    return el.id == p.id;
  });
  listaAnuncios.splice(indice, 1, p);

  almacenarDatos(listaAnuncios);
  
}

//guardo en localstorage
function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  //creo nuevos ids
  localStorage.setItem("siguienteId", proximoId);
  manejadorTabla(data);
}

function manejadorSubmit(e) {
  e.preventDefault();
  const frm = e.target;

  if (frm.id.value) {
    const anuncioModificado = new Anuncio_Auto(
      parseInt(frm.id.value),
      frm.titulo.value,
      frm.transaccion.value,
      frm.descripcion.value,
      frm.precio.value,
      frm.puertas.value,
      frm.kms.value,
      frm.potencia.value
    );
    if (confirm("Esta por modificar el anuncio. Desea continuar?")) {
        modificarAnuncioAuto(anuncioModificado);        
      console.log("Anuncio modificado");
    }
  } else {
    const nuevoAnuncio = new Anuncio_Auto(
      proximoId,
      frm.titulo.value,
      frm.transaccion.value,
      frm.descripcion.value,
      frm.precio.value,
      frm.puertas.value,
      frm.kms.value,
      frm.potencia.value
      );
      proximoId++;
      console.log("Se dio de alta un anuncio");
      altaAnuncioAuto(nuevoAnuncio);
  }
  limpiarFormulario();
}

//le paso por parametro asi siempre manejo ese objeto event
function manejadorTabla() {
    agregarSpinner();
    setTimeout(() => {
        eliminarSpiner();
        renderizarUnDiv( crearTabla(listaAnuncios), document.getElementById("divTabla"));
    }, 3000);
}

function renderizarUnDiv(lista, contenedor) {
        while (contenedor.hasChildNodes()) {
          contenedor.removeChild(contenedor.firstChild);
        }
        if (lista) {
          contenedor.appendChild(lista);
        }        
}

function manejadorClick(e) {
  if (e.target.matches("td")) {
    let id = e.target.parentNode.dataset.id;
    console.log(id);
    cargarFormulario(id);
  } else if (e.target.matches("#btnCancelar")) {
    limpiarFormulario();
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);
    if (confirm("Esta por eliminar el anuncio. Desea continuar?")) {
      
        let indice = listaAnuncios.findIndex((el) => el.id == id);
        listaAnuncios.splice(indice, 1); 
        almacenarDatos(listaAnuncios);
        console.log("Se elimino el anuncio");        
    }
    limpiarFormulario();
  }
}

function cargarFormulario(id) {
    const { titulo, transaccion, descripcion, precio, puertas, kms, potencia } =
      listaAnuncios.filter((el) => el.id === parseInt(id))[0];
    
    frm.titulo.value = titulo;
    frm.transaccion.value = transaccion;
    frm.descripcion.value = descripcion;
    frm.precio.value = precio;
    frm.puertas.value = puertas;
    frm.potencia.value = potencia;
    frm.kms.value = kms;
    frm.id.value = id;
    document.getElementById("btnPrincipal").value = "Modificar";
    document.getElementById("btnPrincipal").classList.replace("imgFondo","boton");
    mostrarBotones();    
  }