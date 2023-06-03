window.addEventListener("load", inicio);
const sys = new Sistema();
function inicio(){
    ocultarMenos([1,1,0,0,0,0]);
    const arrayLetras=[];
    const lupa = document.getElementById("idLupa");
    const botonAgregar = document.getElementById("idBotonReclamo");
    const botonAgregarForm = document.getElementById("idBotonAgregar");
    const linkPrincipal = document.getElementById("idLinkS1");
    const linkVerReclamos = document.getElementById("idLinkS2");
    const linkEstadisticas = document.getElementById("idLinkS3");
    const linkAgregar = document.getElementById("idLinkS4");
    const botonVolver=document.getElementById("idBotonVolver")
    botonVolver.addEventListener("click", verPrincipal)
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
    const contenido = document.createElement("div");
    const heading = document.createElement("h3");
    const t = document.createTextNode("Reclamo No. " + numero);
    const pUsuario = document.createElement("p");
    const spanTitulo = document.createElement("span"); 
    const pEmpresa = document.createElement("p"); 
    const spanEmpresa = document.createElement("span"); 
    const pDescripcion = document.createElement("p");
    const buttonTambien = document.createElement("button");
    const labelContador = document.createElement("label");
    const spanLabelContador = document.createElement("span");
    const article= document.getElementById("idArticle2_1");
    divReclamo.setAttribute("class", "containerReclamo");
    contenido.setAttribute("class", "reclamo");
    heading.appendChild(t);
    divReclamo.appendChild(heading); 
    pUsuario.innerText = nombre + ": ";
    spanTitulo.setAttribute("class", "comentUsuario");
    spanTitulo.innerText=titulo;
    pUsuario.appendChild(spanTitulo);
    pEmpresa.innerText="Empresa: ";
    spanEmpresa.setAttribute("class", "nombreEmpresa");
    spanEmpresa.innerText=empresa;
    pEmpresa.appendChild(spanEmpresa);
    pDescripcion.innerText=descripcion;
    buttonTambien.setAttribute("id", numero);
    buttonTambien.innerText="¡A mi también me pasó!"
    labelContador.setAttribute("for", numero);
    labelContador.innerText="Contador: ";
    spanLabelContador.setAttribute("id", "idSpanBoton"+numero);
    spanLabelContador.innerText="1";
    labelContador.appendChild(spanLabelContador);
    contenido.appendChild(pUsuario);
    contenido.appendChild(pEmpresa);
    contenido.appendChild(pDescripcion);
    contenido.appendChild(buttonTambien);
    contenido.appendChild(labelContador);
    divReclamo.appendChild(contenido);
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
const arrayLetras=[];
function agregarEmp(){
    const formEmp = document.getElementById("idFormNuevaEmp");
    const selectEmpresas=document.getElementById("idEmpresa");
    const nombreEmpresa = document.getElementById("idNombreEmpresa").value;
    const direccion = document.getElementById("idDireccion").value;
    let nombreNoEsta=true;
    let direccionNoEsta=true;
        for (const i in sys.empresas) {
            if(sys.empresas[i].nombre===nombreEmpresa){
                alert("Empresa ya ingresada")
                nombreNoEsta=false;
            }
        }
    for (const i in sys.empresas){
        if(sys.empresas[i].direccion===direccion){
            alert("Direccion ya ingresada");
            direccionNoEsta=false;
        }
    }
    if(formEmp.reportValidity() && nombreNoEsta&& direccionNoEsta){
        
        const rubro = document.getElementById("idRubro").value;
        const nuevaEmpresa = new Empresa(nombreEmpresa, direccion, rubro);
        sys.agregarEmpresa(nuevaEmpresa);
        const option = document.createElement("option");
       option.textContent = nombreEmpresa;
        selectEmpresas.appendChild(option);
        //selectEmpresas.add(option);
        formEmp.reset();
        //el siguiente codigo agrega un boton con la inicial de la empresa ingresada
        nom=nombreEmpresa.toUpperCase();
        const letra=nom.charAt(0);
        const botonAst=document.getElementById("*")
        if(!(arrayLetras.includes(letra))){
            arrayLetras.push(letra);
            arrayLetras.sort();
            const botonLetra=document.createElement("button");
            botonLetra.textContent = letra;
            const divPadre=document.getElementById("idContainerBotones");
            while (divPadre.firstChild){
                divPadre.removeChild(divPadre.firstChild);
            }
            for (let i=0; i<arrayLetras.length;i++){
                const letraActual = arrayLetras[i];
                const boton = document.createElement("button");
                boton.textContent=letraActual;
                divPadre.appendChild(boton);
                boton.addEventListener("click", function() {
                    filtroTabla(letraActual);
                  });
            }
            divPadre.appendChild(botonAst);
            botonAst.addEventListener("click", function(){
               filtroTabla("*");
            });
        }
    }
}
function filtroTabla(letraBoton){
    //esta funcion hará que se oculten las empresas en la tabla excepto las del boton clickedo
    console.log("se hizo click en:"+letraBoton)
}
function nuevoReclamo(){
    let contador=0;
    for (const i in sys.empresas){
        contador++;
    }
    if(contador!==0){
        ocultarMenos([1,0,1,0,0,0]);
    }else{
        alert("Debe ingresar empresas primero")
    }
    
}
function verPrincipal(){
    ocultarMenos([1,1,0,0,0,0]);
}
function verReclamos(){
    ocultarMenos([0,0,0,1,0,0]) ;
    let contador=0;
    for(const i in sys.reclamos){
        contador++
    }
    if(contador===0){
        const nuevoP=document.createElement("p");
        const textoAmostrar=document.createTextNode("Sin datos");
        nuevoP.appendChild(textoAmostrar);
        const parteReclamos=document.getElementById("idArticle2_1")
        parteReclamos.appendChild(nuevoP);
    }else{
        ocultarMenos([0,0,0,1,0,0]);
    }
}
function verEstadisticas(){
    ocultarMenos([0,0,0,0,1,0]);
}
function verAgregar(){
    const botonNuevaEmpresa = document.getElementById("idBotonEmpresa")
    ocultarMenos([0,0,0,0,0,1]);
    botonNuevaEmpresa.addEventListener("click", agregarEmp);
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