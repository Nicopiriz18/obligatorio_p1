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