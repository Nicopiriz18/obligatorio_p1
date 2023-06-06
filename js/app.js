window.addEventListener("load", inicio);
const sys = new Sistema();
function inicio(){
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
    lupa.addEventListener("click", buscar);
    botonAgregarForm.addEventListener("click", agregarReclamo);
    document.getElementById("idSection2").addEventListener("click", function(e) {
        contador(e);
      });
}
function agregarReclamo(){
	document.getElementById("idSinDatos").style.display="none";
    const formRec = document.getElementById("idNuevoForm");
    if(formRec.reportValidity()){
        const nombreUsuario = document.getElementById("idNombreUsuario").value;
        const empresa = document.getElementById("idEmpresa").value;
        const objetoEmpresa = sys.buscarEmpresaPorNombre(empresa);
        const titulo = document.getElementById("idReclamo").value;
        const descripcion = document.getElementById("idDescripcion").value;
        const reclamo0 = new Reclamo(nombreUsuario, objetoEmpresa, titulo, descripcion);
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
    divReclamo.setAttribute("id", "idDivReclamoNumero"+numero)
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
    if(formEmp.reportValidity()){
        const nombreEmpresa = document.getElementById("idNombreEmpresa").value;
        const direccion = document.getElementById("idDireccion").value;
        let nombreNoEsta=true;
        let direccionNoEsta=true;
        for(let i =0; i<sys.empresas.length; i++){
            if(sys.empresas[i].nombre===nombreEmpresa){
                nombreNoEsta=false;
            }
        }
        for(let i =0; i<sys.empresas.length; i++){
            if(sys.empresas[i].direccion===direccion){
                direccionNoEsta=false;
            }
        }
        if(nombreNoEsta&& direccionNoEsta){
            const rubro = document.getElementById("idRubro").value;
            const nuevaEmpresa = new Empresa(nombreEmpresa, direccion, rubro);
            sys.agregarEmpresa(nuevaEmpresa);
            const selectEmpresas=document.getElementById("idEmpresa");
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
                    boton.setAttribute("id", letraActual);
                }
                divPadre.appendChild(botonAst);
            }
        } else{
            if(!nombreNoEsta){
                alert("Nombre ya asignado");
            }
            if(!direccionNoEsta){
                alert("Direccion ya asignada");
            }
        }

    }
}
function filtroTabla(e){
    //esta funcion hará que se oculten las empresas en la tabla excepto las del boton clickedo
    if(e.target.tagName === 'BUTTON'){
        const letraPresionada=e.target.id;
        const botonPresionado=document.getElementById(letraPresionada);
		const divBotones=document.getElementById("idContainerBotones");
        const botones = divBotones.querySelectorAll("button");
        for (const boton of botones) {
            boton.classList.remove("botonSeleccionado");
        }
        console.log("se hizo click en: "+letraPresionada);
        botonPresionado.classList.add("botonSeleccionado")
    }
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
    ocultarMenos([0,0,0,1,0,0]);
}
function verEstadisticas(){
    ocultarMenos([0,0,0,0,1,0]);
    document.getElementById("idContainerBotones").addEventListener("click", function(e){
        filtroTabla(e);
    })
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

function buscar(){
    const inputBuscar = document.getElementById("idBuscar");
    const keyword = inputBuscar.value;
    const reclamos = document.getElementsByClassName("containerReclamo");
    const divsAMantener = sys.buscarReclamos(keyword);
    for(let rec of reclamos){
        const idDelBoton = parseInt(rec.children[1].children[3].getAttribute("id"));
        //hacemos parseInt porque al buscar los reclamos nos devuelve la posicion de los reclamos (entero)
        //y preferimos evitar hacer una comparacion no estricta
        if(divsAMantener.includes(idDelBoton)){
            rec.style.display="block";
        }else{
            rec.style.display="none";
        }
    }
    if(divsAMantener.length === 0){
        
    }
}