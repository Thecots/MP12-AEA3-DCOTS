const {inquirerMenu, pausa, nouAlumne, alumneSelect, introHores, confirmar} = require('./helpers/inquirer');
const {guardarDB, readDB} = require('./helpers/guardarFitxer');
const AlumnesHores = require("./models/alumneshores");
require('colors');

/* Función main */
const main = async () => {
    let opt = '';
    const alumnes = new AlumnesHores();
    const alumnesDB = readDB();

    /* Si existen alumnos en el .josn los carga */
    if(alumnesDB){
        alumnes.carregarAlumnesFromArray(alumnesDB);
    }

    do{
        /* Propmt menú */
        opt = await inquirerMenu();
        
            switch (opt){
            case "1":
                /* Crea un nuevo alumno */
                const nomAlumne = await nouAlumne("Nom alumne:");
                alumnes.crearAlumne(nomAlumne,0);
                console.log('Alumne registrar correctament'.green);
                break;
            case "2":
                /* Muestra solo los alumnos */
                alumnes.llistarAlumnes();
                break;
            case "3":
                /* Muestra los alumnos + horas */
                alumnes.llistarAlumnesHores();
                break;
            case "4":
                /* Selecionar alumno para sobrescribr horas */
                const id1 = await alumneSelect(alumnes.llistaArr);
                if(id1 !== "0"){
                    const hores = await introHores("Hores fetes:");
                    const nomAlumne = await alumnes.introNumHores(id1, hores);
                    console.log(
                        `Hores guardades!`.green
                      );
                }
                break;
            case "5":
                /* Elimina un alumno */
                const id2 = await alumneSelect(alumnes.llistaArr);
                if(id2 !== "0"){
                    if(await confirmar('Deseas Borrar este usuario?')){
                        alumnes.eliminarAlumne(id2);
                        console.log('Alumno borrado correctamente'.red);
                    }
                }
                break;
        }
        
        guardarDB(alumnes.llistaArr);
        await pausa();
    }while(opt != "0");
}

main();
