const { v4: uuidv4 } = require("uuid");

class Alumne {
    id = '';
    nom = '';
    horesFetes = '';

    constructor(nom, hores){
        this.id = uuidv4();
        this.nom = nom;
        this.horesFetes = hores
    }
}

module.exports = Alumne;