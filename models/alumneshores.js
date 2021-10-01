const Alumne = require('./alumne')
class AlumnesHores{
    __llista = {};

    /* Devuelve Array  */
    get llistaArr(){
        const llistat = [];
        Object.keys(this.__llista).forEach((key) => {
            const alumne = this.__llista[key];
            llistat.push(alumne);
        })
        return llistat;
    }

    /* Constructor */
    constructor(){
        this.__llista = {};
    }

    /* Crea un nuevo alumno */
    crearAlumne(nom = "", hores = 0){
        const alumne = new Alumne(nom,hores);
        this.__llista[alumne.id] = alumne;
    };

    /* Muestra todos los alumnos */
    llistarAlumnes(){
        let conta = 0;
        this.llistaArr.forEach((alumne) => {
            conta += 1;
            console.log(`${(conta+'.').green} ${alumne.nom}`);
        });
    };

    /* Carga la base de datos */
    carregarAlumnesFromArray(e = []){
        e.forEach((n) => {
            this.__llista[n.id] = n;
        });
    }

    /* Muestra Alumne + Horas trabajadas */
    llistarAlumnesHores(){
        let conta = 0;
        this.llistaArr.forEach((e) => {
            const {nom, horesFetes} = e;
            const hores = horesFetes > 0 ? `${horesFetes}`.green : `${horesFetes}`.red;
            conta += 1;
            console.log(
                `Alumne: `.yellow+` ${nom.magenta} ${"::".cyan} ${'Hores'.yellow} ${hores}`
              );
        });
    }

    /* Introduce las horas */
    async introNumHores(id, hores){
        const alumne = this.__llista[id];
        alumne.horesFetes = hores;
        return alumne.nom;
    }

    /* Elimina alumno */
    async eliminarAlumne(id){
        delete this.__llista[id];
    }
}

module.exports = AlumnesHores;