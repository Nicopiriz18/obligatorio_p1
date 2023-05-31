window.addEventListener("load", inicio);
function inicio(){
    const sys = new Sistema();
    const lupa = document.getElementById("idLupa");
    const botonAgregar = document.getElementById("idBotonReclamo");
    const botonAgregarForm = document.getElementById("idBotonAgregar");
    const principal = document.getElementById("idLinksS1");
    const verReclamos = document.getElementById("idLinksS2");
    const estadisticas = document.getElementById("idLinksS3");
    const seccionAgregar = document.getElementById("idLinksS4");

    // lupa.addEventListener("click", buscar);
    // botonAgregar.addEventListener("click", nuevoReclamo);
    botonAgregarForm.addEventListener("click", agregarReclamo);
    // botonNuevaEmpresa.addEventListener("click", agregarEmp);
}

function agregarReclamo(){
    const formRec = document.getElementById("idNuevoForm");
    if(formRec.reportValidity()){
        const nombreUsuario = document.getElementById("idNombreUsuario").value;
        const empresa = document.getElementById("idEmpresa").value;
        const titulo = document.getElementById("idReclamo").value;
        const descripcion = document.getElementById("idDescripcion").value;
        const reclamo0 = new Reclamo(nombreUsuario, empresa, titulo, descripcion);
        sys.agregarReclamo(reclamo0);
        const numReclamo = sys.reclamos.indexOf(reclamo0) + 1;
        crearElementoReclamo(nombreUsuario, titulo, empresa, descripcion, "1")
    }
}
function crearElementoReclamo(nombre, titulo, empresa, descripcion, numero){
    const divReclamo = document.createElement("div", {
        class:"containerReclamo"
    })
    const contenido = document.createElement("div", {
        class:"contenidoReclamo"
    })
    const heading = document.createElement("h3");
    const t = document.createTextNode("Reclamo No. " + numero);
    titulo.appendChild(t);
    divReclamo.appendChild(heading);

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
    contenido.appendChild(pUsuario);
    contenido.appendChild(pEmpresa);
    contenido.appendChild(pDescripcion);
    contenido.appendChild(buttonTambien);
    contenido.appendChild(labelContador);
    divReclamo.appendChild(contenido);
    document.getElementById("idSection2").appendChild(divReclamo);
}

// function agregarEmp(){
//     const formEmp = document.getElementById("idFormNuevaEmp");
//     if(formEmp.reportValidity()){
//         const nombreEmpresa = document.getElementById("idNombreEmpresa").value;
//         const direccion = document.getElementById("idDireccion").value;
//         const rubro = document.getElementById("idRubro").value;
//         const empresa0 = new Empresa(nombreEmpresa, direccion, rubro);
//         sys.agregarEmpresa(empresa0);
//     }
// }


class Sistema{
    constructor(){
        this.empresas = [];
        this.reclamos = [];
    }
    agregarEmpresa(emp){
        this.empresas.push(emp);
    }
    agregarReclamo(rec){
        this.reclamos.push(rec);
    }
    buscarReclamo(keyword){
        let resp = [];
        for(let rec of this.reclamos){
            if(rec.toString().toUpperCase().includes(keyword.toUpperCase())){
                resp.push(rec);
            }
        }
    }
}

class Reclamo{
    constructor(nombreUSuaurio, empresa, titulo, descripcion){
        this.nombreUsuario = nombreUSuaurio;
        this.empresa = empresa;
        this.titulo = titulo;
        this.descripcion = descripcion;
        //el contador se incializa en 1 cuando se hace un reclamo
        this.contador = 1;
    }
    toString(){
        return(this.nombreUsuario + ": " + this.titulo + "\n" + "empresa: " + this.empresa + "\n" + this.descripcion);
    }
}


class Empresa{
    constructor(nomb, dir, rub){
        this.nombre = nomb;
        this.direccion = dir;
        this.rubro = rubro;
        this.cantidad = 0;
    }
}

