const inquirer = require('inquirer');
require('colors');

/* Array menú */
const preguntes = [
    {
        type: "list",
        name: "opcio",
        message: "Què vols fer?",
        choices: [
            {
                value: "1",
                name: `${"1 ".green} Nou alumne`,
              },
              {
                value: "2",
                name: `${"2 ".green} Llistar alumnes`,
              },
              {
                value: "3",
                name: `${"3 ".green} Llistar alumnes i hores`,
              },
              {
                value: "4",
                name: `${"4 ".green} Introduir hores`,
              },
              {
                value: "5",
                name: `${"5 ".green} Eliminar alumne`,
              },
              {
                value: "0",
                name: `${"0 ".green} Sortir`,
              },
        ]
    }
];

/* Template titlo menú */
let title = `${'==========================='.magenta}
   ${'Selecciona una opcicó'.yellow}
${'==========================='.magenta}
`;

/* Ejecuta el menú */
const inquirerMenu = async () => {
    console.clear();
    console.log(title);
    const { opcio } = await inquirer.prompt(preguntes);
    return opcio;
}

/* Fincion de "PULSA ENTER PARA CONTINUAR" */
const pausa = async () => {
    const q = [
        {
            type: "input",
            name: "enter",
            message: `Pressiona ${'enter'.yellow} per a continuar \n`,
        }
    ];

    return await inquirer.prompt(q);
}

/* Prompt nuevo alumno */
const nouAlumne = async (message) => {
    const q = [
        {
            type: "input",
            name: "nom",
            message,
            validate(value){
                if(value.length === 0){
                    return "Si us plau, introdueix un nom";
                }
                return true;
            }
        }
    ];
    const { nom } = await inquirer.prompt(q);
    return nom;
}

/* choices menu para seleccionar alumno */
const alumneSelect = async(e = []) =>{
    const choices = e.map((e, i) => {
        const idx = `${i+1}.`.green;

        return {
            value: e.id,
            name: `${idx} ${e.nom}`
        }
    });

    choices.unshift({
        value: "0",
        name: "0.".green+" Cancelar"
    });

    const q = [
        {
            type: "list",
            name: "id",
            message: "Selecciona alumne",
            choices,
          },
    ];

    const { id } = await inquirer.prompt(q);
    return id;

}

/* Prompt introducir horas */
const introHores = async (message) => {
    const q = [
        {
            type:"question",
            name:"hores",
            message,
            validate(value){
                if(value.length === 0){
                    return "Si us plau, introdueix un número"
                }
                return true;
            }
        }
    ];
    const { hores } = await inquirer.prompt(q);
    return hores;
}

/* Prompt conmfirmas [y/n] */
const confirmar = async (message) => {
    const q = [{
        type: "confirm",
        name: "ok",
        message,
    }];

    const { ok } = await inquirer.prompt(q);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    nouAlumne,
    alumneSelect,
    introHores,
    confirmar
}