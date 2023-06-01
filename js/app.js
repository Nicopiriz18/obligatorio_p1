window.addEventListener("load", inicio);
const sys = new Sistema();
function inicio(){
    ocultarMenos([1,1,0,0,0,0]);
    const lupa = document.getElementById("idLupa");
    const botonAgregar = document.getElementById("idBotonReclamo");
    const botonAgregarForm = document.getElementById("idBotonAgregar");
    const linkPrincipal = document.getElementById("idLinkS1");
    const linkVerReclamos = document.getElementById("idLinkS2");
    const linkEstadisticas = document.getElementById("idLinkS3");
    const linkAgregar = document.getElementById("idLinkS4");
    linkPrincipal.addEventListener("click", verPrincipal);
    linkVerReclamos.addEventListener("click", verReclamos);
    linkEstadisticas.addEventListener("click", verEstadisticas);
    linkAgregar.addEventListener("click", verAgregar);
    botonAgregar.addEventListener("click", nuevoReclamo)
    // lupa.addEventListener("click", buscar);
    botonAgregarForm.addEventListener("click", agregarReclamo);
    document.getElementById("idSection2").addEventListener("click", function(e) {
        contador(e);
      });
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
        formRec.reset();
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
    labelContador.innerText="Contador: ";
    const spanLabelContador = document.createElement("span");
    spanLabelContador.setAttribute("id", "idSpanBoton"+numero);
    spanLabelContador.innerText="1";
    labelContador.appendChild(spanLabelContador);
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

function contador(e){
    if(e.target.tagName === 'BUTTON'){
        const idDelBoton = e.target.id;
        sys.reclamos[idDelBoton - 1].contador++;
        const spanContador = document.getElementById("idSpanBoton"+idDelBoton);
        spanContador.innerText=sys.reclamos[idDelBoton-1].contador;
    }
}

function agregarEmp(){
    const formEmp = document.getElementById("idFormNuevaEmp");
    const selectEmpresas=document.getElementById("idEmpresa");
    if(formEmp.reportValidity()){
        const nombreEmpresa = document.getElementById("idNombreEmpresa").value;
        const direccion = document.getElementById("idDireccion").value;
        const rubro = document.getElementById("idRubro").value;
        const nuevaEmpresa = new Empresa(nombreEmpresa, direccion, rubro);
        sys.agregarEmpresa(nuevaEmpresa);
        const option = document.createElement('option');
        option.text = nombreEmpresa;
        selectEmpresas.add(option);
        formEmp.reset();
    }
}
function nuevoReclamo(){
    ocultarMenos([1,0,1,0,0,0])
}
function verPrincipal(){
    ocultarMenos([1,1,0,0,0,0]);
}
function verReclamos(){
    ocultarMenos([0,0,0,1,0,0]) ;
}
function verEstadisticas(){
    ocultarMenos([0,0,0,0,1,0]);
}
function verAgregar(){
    ocultarMenos([0,0,0,0,0,1]);
    //botonNuevaEmpresa.addEventListener("click", agregarEmp);
}
function ocultarMenos(arr){
    const sec1=document.getElementById("idSection1");
    const art1_1=document.getElementById("idArticle1_1");
    const art1_2=document.getElementById("idArticle1_2");
    const sec2=document.getElementById("idSection2");
    const sec3=document.getElementById("idSection3");
    const sec4=document.getElementById("idSection4");
    sec1.style.display="none";
    art1_1.style.display="none";
    art1_2.style.display="none";
    sec2.style.display="none";
    sec3.style.display="none";
    sec4.style.display="none";
    for(let i=0;i<arr.length;i++){
        if(arr[i]===1){
            switch(i){
                case 0:
                    sec1.style.display="block";
                    break;
                case 1:
                    art1_1.style.display="block";
                    break;
                case 2:
                    art1_2.style.display="block";
                    break;
                case 3:
                    sec2.style.display="block";
                    break;
                case 4:
                    sec3.style.display="block";
                    break;
                case 5:
                    sec4.style.display="block";
                    break;
             }
        }
    }
}
//[a0,a1,a2,a3,a4,a5]
//el elemento a0 corresponde a la seccion 1 
//el elemento a1 corresponde a la parte de principal
//el elemento a2 corresponde a la parte de agregar reclamo
//el elemento a3 corresponde a los reclamos ingresados
//el elemento a4 corresponde a las estadisticas
//el elemento a5 corresponde a la parte de agregar empresa