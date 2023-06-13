window.addEventListener("load", inicio);
const sys = new Sistema();
let letraFiltro = "*";
function inicio(){
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
    document.getElementById("idContainerBotones").addEventListener("click", function(e){
        filtroTabla(e);
    })
    document.getElementById("idCreciente").addEventListener("click", function(){
        radioButtons(true);
    });
    document.getElementById("idDecreciente").addEventListener("click", function(){
        radioButtons(false);
    })
    const botonNuevaEmpresa = document.getElementById("idBotonEmpresa");
    botonNuevaEmpresa.addEventListener("click", agregarEmp);
}

function verPrincipal(){
    ocultarMenos([1,1,0,0,0,0]);
}
function verReclamos(){
    ocultarMenos([0,0,0,1,0,0]);
}
function verEstadisticas(){
    ocultarMenos([0,0,0,0,1,0]);
    actualizarEstadisticas("*");
}
function sortEmpresas(arr, creciente){ 
    if(creciente){
        arr.sort(function(a, b){
            //localeCompare nos compara segun el valor de ascii de los caracteres. Si a<b (ASCII) retorna -1 si a>b retorna 1
            return a.children[0].innerText[0].toUpperCase().localeCompare(b.children[0].innerText[0].toUpperCase());
        })
    }else {
        arr.sort(function(a, b){
            return b.children[0].innerText[0].toUpperCase().localeCompare(a.children[0].innerText[0].toUpperCase());
        })
    }
    return arr;
}
function verAgregar(){
    ocultarMenos([0,0,0,0,0,1]);
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
function agregarReclamo(){
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
        //el siguiente codigo se encarga de sumarle 1 a la cantidad de reclamos para la empresa
        objetoEmpresa.cantidad++;
        document.getElementById("idSinDatos").style.display="none";
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
        sys.reclamos[idDelBoton - 1].empresa.cantidad++;
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
    if(e.target.tagName === 'BUTTON'){
        const letraPresionada=e.target.id;
        letraFiltro=letraPresionada;
        const botonPresionado=document.getElementById(letraPresionada);
		const divBotones=document.getElementById("idContainerBotones");
        const botones = divBotones.querySelectorAll("button");
        for (const boton of botones) {
            boton.classList.remove("botonSeleccionado");
        }
        botonPresionado.classList.add("botonSeleccionado");
        crearTabla();
    }
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
    //[a0,a1,a2,a3,a4,a5]
    //el elemento a0 corresponde a la seccion 1 
    //el elemento a1 corresponde a la parte de principal
    //el elemento a2 corresponde a la parte de agregar reclamo
    //el elemento a3 corresponde a los reclamos ingresados
    //el elemento a4 corresponde a las estadisticas
    //el elemento a5 corresponde a la parte de agregar empresa
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
        document.getElementById("idSinDatos").style.display="block";
    }
    ocultarMenos([0, 0, 0, 1, 0, 0])
}
//La siguiente funcion es una a ejecutarse cuandos se agrega una nueva empresa que se encarga de actualizar la parte de estadisticas
function actualizarEstadisticas(){
    const tablaEstadisticas = document.getElementById("idTablaEstadisticas");
    const tbody = tablaEstadisticas.querySelector("tbody");
    tbody.innerHTML = "";
    const listaSinReclamos = document.getElementById("idUlSinReclamos");
    const ulRubrosMax = document.getElementById("idUlRubrosMaximaCantidad");
    while(ulRubrosMax.firstChild){
        ulRubrosMax.firstChild.remove();
    }
    while(listaSinReclamos.firstChild){
        listaSinReclamos.firstChild.remove();
    }
    let arrEmpresasSinReclamo = [];
    //luego checkeamos si la empresa tiene 0 reclamos
    for(let empresa of sys.empresas){
        if(empresa.cantidad === 0){
            const nuevoLi = document.createElement("li");
            nuevoLi.innerText = empresa.toString();
            listaSinReclamos.appendChild(nuevoLi);
        }  
    }
    const spanPromedio = document.getElementById("idSpanPromedio");
    let cantidadTotal = 0;
    for(let rec of sys.reclamos){
        cantidadTotal+=rec.contador;
    }
    spanPromedio.innerText = Math.trunc(cantidadTotal/sys.reclamos.length);
    let rubrosMaximaCant = [];
    let maximaCantidadRubro = 0;
    for(let rub of ["Viajes", "Bancos", "Muebles", "Autos", "Servicios", "General"]){
        let cantidadActual = 0;
        for(let rec of sys.reclamos){
            if(rec.empresa.rubro === rub){
                cantidadActual += rec.contador;
            }
        }
        if(cantidadActual > maximaCantidadRubro){
            maximaCantidadRubro = cantidadActual;
            rubrosMaximaCant = [rub];
        } else if(cantidadActual === maximaCantidadRubro){
            rubrosMaximaCant.push(rub);
        }
    }
    for(let rubro of rubrosMaximaCant){
        const liRubro = document.createElement("li");
        liRubro.innerHTML = rubro + ": cantidad " + maximaCantidadRubro; 
        ulRubrosMax.appendChild(liRubro);
    }
    crearTabla();
    const spanTotalEmpresas = document.getElementById("idSpanTotalEmpresas");
    spanTotalEmpresas.innerText = sys.empresas.length;
}

function crearTabla(){
    const filasAEliminar=document.querySelectorAll(".fila");
    for(const fila of filasAEliminar){
        fila.style.display="none";
    }
    let filtro = letraFiltro;
    if(filtro === "*"){
        filtro = "";
        //Hacemos esto porque cuando se tiene clickeado asterisco queremos que todas las empresas pasen el filtro
        //al hacer startsWith("") con un string vacio todas las empresas cumpliran
    }
    let filasAAgregar = [];
    for(let empresa of sys.empresas){
        if(empresa.nombre.toUpperCase().startsWith(filtro)){
            const nuevaRow = document.createElement("tr");
            nuevaRow.setAttribute("id", "idRow"+empresa.nombre);
            nuevaRow.setAttribute("class", "fila");
            const tdNombreEmpresa = document.createElement("td");
            const tdDireccionEmpresa = document.createElement("td");
            const tdRubroEmpresa = document.createElement("td");
            const tdCantidadEmpresa = document.createElement("td");
            tdNombreEmpresa.innerText = empresa.nombre;
            tdDireccionEmpresa.innerText = empresa.direccion;
            tdRubroEmpresa.innerText = empresa.rubro;
            tdCantidadEmpresa.innerText = empresa.cantidad;
            nuevaRow.appendChild(tdNombreEmpresa);
            nuevaRow.appendChild(tdDireccionEmpresa);
            nuevaRow.appendChild(tdRubroEmpresa);
            nuevaRow.appendChild(tdCantidadEmpresa);
            //accedemos al tbody haciendo children[2] ya que el primer hijo es la caption, segundo thead y tercero el tbody
            filasAAgregar.push(nuevaRow);
        }
    }
    if(document.getElementById("idCreciente").checked){
        filasAAgregar = sortEmpresas(filasAAgregar, true);
    }else {
        filasAAgregar = sortEmpresas(filasAAgregar, false);
    }
    const tablaBody = document.getElementById("idTablaEstadisticas").children[2];
    for(let row of filasAAgregar){
        tablaBody.appendChild(row);
    }
}
function radioButtons(creciente){
    //creciente es un argumento booleano que indica si se quiere que se ordene de manera creciente o decreciente
    const tablaBody = document.getElementById("idTablaEstadisticas").children[2];
    const tRows = tablaBody.getElementsByTagName("tr");
    const tRowsArray = Array.from(tRows);
    //se ordenan las filas con la funcion sort empresas para luego hacer append al html
    const empresasOrdenadas = sortEmpresas(tRowsArray, creciente);
    while(tablaBody.firstChild){
        tablaBody.firstChild.remove();
    }
    for(let row of empresasOrdenadas){
        tablaBody.appendChild(row);
    }
}
