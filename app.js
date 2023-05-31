window.addEventListener("load", inicio);
function inicio(){
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


    }
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

