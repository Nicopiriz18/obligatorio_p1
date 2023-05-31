window.addEventListener("load", inicio);
function inicio(){
    alert("la conch de tu madre html")
    const sys = new Sistema;
    const lupa = document.findElementById("idLupa");
    const botonAgregar = document.findElementById("idBotonReclamo");
    const botonAgregarForm = document.findElementById("idBotonAgregar");
    const principal = document.findElementById("idLinksS1");
    const verReclamos = document.findElementById("idLinksS2");
    const estadisticas = document.findElementById("idLinksS3");
    const seccionAgregar = document.findElementById("idLinksS4");

    lupa.addEventListener("click", buscar);
    botonAgregar.addEventListener("click", nuevoReclamo);
    botonAgregarForm.addEventListener("click", agregarReclamo);
    botonNuevaEmpresa.addEventListener("click", agregarEmp);

}

function agregarRelcamo(){
    const formRec = document.findElementById("idNuevoForm");
    if(formRec.reportValidity()){
        const nombreUsuario = document.findElementById("idNombreUsuario").values;
        const empresa = document.findElementById("idEmpresa").values;
        const titulo = document.findElementById("idReclamo").values;
        const descripcion = document.findElementById("idDescripcion").values;
        const reclamo0 = new Reclamo(nombreUsuario, empresa, titulo, descripcion);
        sys.agregarReclamo(reclamo0);
        const numReclamo = sys.reclamos.indexOf(reclamo0) + 1;
        crearElementoReclamo(nombreUsuario, titulo, empresa, descripcion, numReclamo)
    }
}
function crearElementoReclamo(nombre, titulo, empresa, descripcion, numero){
    const divReclamo = document.createElement("div", {
        class:"containerReclamo"
    })
    const titulo = document.createElement("h3");
    const t = document.createTextNode("Reclamo No. " + numero);
    titulo.appendChild(t);
    divReclamo.appendChild(titulo);
    const contenido = document.createElement("div", {
        class:"contenidoReclamo"
    })
    const pUsuario = document.createElement("p");
    pUsuario.innerText = nombre + ": ";
    const spanTitulo = document.createElement("span", {
        class:"comentUsuario"
    })
    spanTitulo.innerText=titulo;
    pUsuario.appendChild(spanTitulo);
    const pEmpresa = document.createElement("p");
    pEmpresa.innerText="Empresa: ";
    const spanEmpresa = document.createElement("span", {
        class:nombreEmpresa
    })
    spanEmpresa.innerText=empresa;
    pEmpresa.appendChild(spanEmpresa);
    const pDescripcion = document.createElement("p");
    pDescripcion.innerText=descripcion;
    const buttonTambien = document.createElement("button", {
        id:numero
    })
    const labelContador = document.createElement("label", {
        for:numero
    })
    contenido.appendChild(pUsuario, pEmpresa, pDescripcion, buttonTambien, labelContador);
    divReclamo.appendChild(contenido);
}

function agregarEmp(){
    const formEmp = document.findElementById("idFormNuevaEmp");
    if(formEmp.reportValidity()){
        const nombreEmpresa = document.findElementById("idNombreEmpresa").values;
        const direccion = document.findElementById("idDireccion").values;
        const rubro = document.findElementById("idRubro").values;
        const empresa0 = new Empresa(nombreEmpresa, direccion, rubro);
        sys.agregarEmpresa(empresa0);
    }
}

