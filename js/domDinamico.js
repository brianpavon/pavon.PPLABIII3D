
//cargar el spiner
export function agregarSpinner() {
    eliminarSpiner();
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "image spinner");
  document.getElementById("divTabla").appendChild(spinner);
}

export function eliminarSpiner() {
  document.getElementById("divTabla").innerHTML = "";
}

//FUNCIONES CREAR TABLA

export function crearTabla(items) {
  const tabla = document.createElement("table");

  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));
  return tabla;
}

function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  //tr.style.backgroundColor = "red";
  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function crearTbody(items) {
  const tbody = document.createElement("tbody");

  items.forEach((item) => {
    const tr = document.createElement("tr");

    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        td.textContent = item[key];
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });
  return tbody;
}

//CREAR LISTA
function crearLista(items) {
    const lista = document.createElement("ul");
    items.forEach((element) => {
      //creo li para apendear a ul
      const li = document.createElement("li");
      //creao el contenido a agregar a li
      const contenido = document.createTextNode(element.marca);
      li.appendChild(contenido);
      lista.appendChild(li);
    });
    return lista;
  }