//Material elaborado por: Nicolás Píriz(310896) y Manuel Stapff(303636)
class Sistema{
    constructor(){
        this.empresas = [];
        this.reclamos = [];
    }
    agregarEmpresa(emp){
        this.empresas.push(emp);
    }
    darEmpresasOrdenadas(creciente){
        if(creciente){
            this.empresas.sort(
                function(a,b){
                    return a.nombre.localeCompare(b.nombre);
                }
            )
            return this.empresas;
        }
        else{
            this.empresas.sort(
                function(a,b){
                    return b.nombre.localeCompare(a.nombre);
                }
            )
            return this.empresas;
        }
    }
    agregarReclamo(rec){
        this.reclamos.push(rec);
    }
    buscarReclamos(keyword){
        let resp = [];
        const keywordMayus = keyword.toUpperCase();
        for(let i=0; i<this.reclamos.length; i++){
            const reclamoActual = this.reclamos[i];
            if(reclamoActual.nombreUsuario.toUpperCase().includes(keywordMayus) || reclamoActual.empresa.nombre.toUpperCase().includes(keywordMayus) || reclamoActual.titulo.toUpperCase().includes(keywordMayus) || reclamoActual.descripcion.toUpperCase().includes(keywordMayus)){
                resp.push((i+1));
                //se pushea i+1 porque en los reclamos el primer reclamo tiene el nro 1 en lugar de 0
            }
        }
        return resp;
    }
    buscarEmpresaPorNombre(nombre){
        for(let emp of this.empresas){
            if(nombre === emp.nombre){
                return emp; 
            }
        }
    }
}
class Reclamo{
    constructor(nombreUsuario, empresa, titulo, descripcion){
        this.nombreUsuario = nombreUsuario;
        this.empresa = empresa;
        this.titulo = titulo;
        this.descripcion = descripcion;
        //el contador se incializa en 1 cuando se hace un reclamo
        this.contador = 1;
    }
}
class Empresa{
    constructor(nomb, dir, rubro){
        this.nombre = nomb;
        this.direccion = dir;
        this.rubro = rubro;
        this.cantidad = 0;
    }
    toString(){
        return (this.nombre + " ("  + this.direccion + ") Rubro: " + this.rubro);
    }
}