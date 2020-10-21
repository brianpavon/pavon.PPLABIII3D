let frmAnuncioAutos;
export default function crearTabla(lista)
{
    
    const tabla = document.createElement('table');    
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
    
}


function crearCabecera(item)
{
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const key in item) 
    {             
             
         const th = document.createElement('th');
         const texto = document.createTextNode(key);
         th.appendChild(texto);
         
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

//devolver tbody
function crearCuerpo(lista)
{
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) 
        {
            
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if(element.hasOwnProperty('id'))
        {
            tr.setAttribute('data-id',element['id']);
            
        }
        
        agregarManejadorTR(tr);
        tbody.appendChild(tr);
    });
    return tbody;
}

function agregarManejadorTR(tr)
{
    if(tr)
    {
        tr.addEventListener('click', function(e){
            
            /*listaAnunciosAutos = obtenerAnuncios();*/
            frmAnuncioAutos = document.forms[0];
            alert(e.target.parentNode.dataset.id);
            frmAnuncioAutos.titulo.value = e.target.parentNode.dataset.titulo;        
            frmAnuncioAutos.transaccion.value = e.target.parentNode.dataset.transaccion ;       
            frmAnuncioAutos.descripcion.value = e.target.parentNode.dataset.descripcion;
            frmAnuncioAutos.precio.value = e.target.parentNode.dataset.precio;
            frmAnuncioAutos.puertas.value = e.target.parentNode.dataset.puertas;
            frmAnuncioAutos.kms.value = e.target.parentNode.dataset.kms;
            frmAnuncioAutos.potencia.value = e.target.parentNode.dataset.potencia;
            
        });
    }
}

