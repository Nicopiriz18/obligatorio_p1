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
        for(let i=0; i<this.reclamos.length; i++){
            if(rec.toString().toUpperCase().includes(keyword.toUpperCase())){
                resp.push(i);
            }
        }
        return resp;
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


window.addEventListener("load", inicio);
const sys = new Sistema();
function inicio(){
    const lupa = document.getElementById("idLupa");
    const botonAgregar = document.getElementById("idBotonReclamo");
    const botonAgregarForm = document.getElementById("idBotonAgregar");
    const principal = document.getElementById("idLinkS1");
    const verReclamos = document.getElementById("idLinkS2");
    const estadisticas = document.getElementById("idLinkS3");
    const seccionAgregar = document.getElementById("idLinkS4");
    
    // lupa.addEventListener("click", buscar);
    // botonAgregar.addEventListener("click", nuevoReclamo);
    botonAgregarForm.addEventListener("click", agregarReclamo);
    principal.addEventListener("click", principal);
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
        crearElementoReclamo(nombreUsuario, titulo, empresa, descripcion, numReclamo);
    }
}
function crearElementoReclamo(nombre, titulo, empresa, descripcion, numero){
    const divReclamo = document.createElement("div");
    divReclamo.setAttribute("class", "containerReclamo");
    const contenido = document.createElement("div");
    contenido.setAttribute("class", "reclamo");
    const heading = document.createElement("h3");
    const t = document.createTextNode("Reclamo No. " + numero);
    heading.appendChild(t);
    divReclamo.appendChild(heading);
    const pUsuario = document.createElement("p");
    pUsuario.innerText = nombre + ": ";
    const spanTitulo = document.createElement("span");
    spanTitulo.setAttribute("class", "comentUsuario");
    spanTitulo.innerText=titulo;
    pUsuario.appendChild(spanTitulo);
    const pEmpresa = document.createElement("p");
    pEmpresa.innerText="Empresa: ";
    const spanEmpresa = document.createElement("span");
    spanEmpresa.setAttribute("class", "nombreEmpresa");
    spanEmpresa.innerText=empresa;
    pEmpresa.appendChild(spanEmpresa);
    const pDescripcion = document.createElement("p");
    pDescripcion.innerText=descripcion;
    const buttonTambien = document.createElement("button");
    buttonTambien.setAttribute("id", numero);
    buttonTambien.innerText="¡A mi también me pasó!"
    const labelContador = document.createElement("label");
    labelContador.setAttribute("for", numero);
    labelContador.innerText="Contador: 1";
    contenido.appendChild(pUsuario);
    contenido.appendChild(pEmpresa);
    contenido.appendChild(pDescripcion);
    contenido.appendChild(buttonTambien);
    contenido.appendChild(labelContador);
    divReclamo.appendChild(contenido);
    const article= document.getElementById("idArticle2_1");
    //El siguiente codigo permite insertar el reclamo al principio del article
    article.insertBefore(divReclamo, article.children[0]);
}
function principal(e){
    e.preventDefault();
    console.log("sape");
}
// function contador(){
//     if()
// }


function agregarEmp(){
    const formEmp = document.getElementById("idFormNuevaEmp");
    if(formEmp.reportValidity()){
        const nombreEmpresa = document.getElementById("idNombreEmpresa").value;
        const direccion = document.getElementById("idDireccion").value;
        const rubro = document.getElementById("idRubro").value;
        const empresa0 = new Empresa(nombreEmpresa, direccion, rubro);
        sys.agregarEmpresa(empresa0);
    }
}


