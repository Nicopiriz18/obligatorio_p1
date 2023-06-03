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
    buscarReclamos(keyword){
        let resp = [];
        for(let i=0; i<this.reclamos.length; i++){
            const valorABuscarCoincidencias = this.reclamos[i].valoresReclamo();
            if(valorABuscarCoincidencias.includes(keyword.toUpperCase())){
                resp.push((i+1));
                //se pushea i+1 porque en los reclamos el primer reclamo tiene el nro 1 en lugar de 0
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
    valoresReclamo(){
        return (this.nombreUsuario + ": " + this.titulo + "  " + this.empresa  + this.descripcion).toUpperCase();
    }
}
class Empresa{
    constructor(nomb, dir, rubro){
        this.nombre = nomb;
        this.direccion = dir;
        this.rubro = rubro;
        this.cantidad = 0;
    }
}