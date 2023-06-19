//* Création des class
class Heros {
    constructor(nom, attaque, soin, vie, objets, active) {
        this.nom = nom;
        this.attaque = attaque;
        this.soin = soin;
        this.vie = vie;
        this.objets = objets;
        this.active = active;
    }
}

class Vilains {
    constructor(nom, attaque, vie, objets, active) {
        this.nom = nom;
        this.attaque = attaque;
        this.vie = vie;
        this.objets = objets;
        this.active = active;
    }
}

class Objets {
    constructor(nom, nombre) {
        this.nom = nom;
        this.nombre = Math.ceil(Math.random() * 3);
    }
}

//* Création du Hero
let naruto = new Heros("naruto", 500, 250, 1000, [], "");

//* Création des objets 
let champignon = new Objets("champignon");
let fleur = new Objets("fleur");
let taser = new Objets("taser");
let etoile = new Objets("etoile");
let dent_vampirique = new Objets("dent vampirique");
let bombe = new Objets("bombe");

let list_objets = [champignon, fleur, taser, etoile, dent_vampirique, bombe];
console.log(list_objets);

//* Création des vilains 
let orochimaru = new Vilains("orochimaru", 100, 1000, [], "");
let pain = new Vilains("pain", 100, 1000, [], "");
let madara = new Vilains("madara", 100, 1000, [], "");

let list_vilains = [orochimaru, pain, madara];

//* Donnez des objets aléatoire aux vilains 
const objet_vilain_random = () => {
    for (let index = 0; index < list_vilains.length; index++) {
        let vilain = list_vilains[index];

        let objet1 = list_objets[Math.round(Math.random() * (list_objets.length - 1))];
        list_objets.splice(list_objets.indexOf(objet1), 1);

        let objet2 = list_objets[Math.round(Math.random() * (list_objets.length - 1))];
        list_objets.splice(list_objets.indexOf(objet2), 1);

        vilain.objets.push(objet1);
        vilain.objets.push(objet2);
    }
}
objet_vilain_random();

//* Fonction objet 
// Cet objet attaque
const champignon_fonction = (attaquant, victime) => {
    let att = attaquant.attaque * 1.25;
    victime.vie -= att;
}
// Cet objet attaque
const fleur_fonction = (victime) => {
    victime.vie *= 0.5;
}
// Taser et Etoile Sera dans la fonction de combat 

// Cet objet soigne 
const dent_vampirique_soin_fonction = (attaquant) => {
    let soin = attaquant.soin * 1.5;
    attaquant.vie += soin;
}

// Cet objet attaque
const dent_vampirique_attaque_fonction = (attaquant, victime) => {
    // Attaque la victime
    victime.vie -= attaquant.attaque;
    // Soigne l'attaquant par ses dégats d'attaque
    attaquant.vie += attaquant.attaque;
}

// Cet objet attaque
const bombe_fonction = (victime) => {
    victime.vie = 0
}

//* Fonction combat 

const combat = () => {
    //^ Choisir les vilains de façon aléatoire
    let vilain1 = list_vilains[Math.round(Math.random() * (list_vilains.length - 1))];
    list_vilains.splice(list_vilains.indexOf(vilain1), 1);
    console.log(vilain1);

    let vilain2 = list_vilains[Math.round(Math.random() * (list_vilains.length - 1))];
    list_vilains.splice(list_vilains.indexOf(vilain2), 1);
    console.log(vilain2);

    let vilain3 = list_vilains[Math.round(Math.random() * (list_vilains.length - 1))];
    list_vilains.splice(list_vilains.indexOf(vilain3), 1);
    console.log(vilain3);

    //? Tant que la vie du hero et du 1er vilain dépasse 0
    while (naruto.vie > 0 && vilain1.vie > 0) {
        //? On vérifie si il y a des objets chez le hero
        if (naruto.objets.length != 0) {
            //? On demande au hero s'il a envie d'utiliser un objet
            let wantObjet = confirm(`Veux-tu utiliser un objet`);

            //? Si c'est vrai :
            if (wantObjet) {
                //? On demande au hero quel objet il veut utiliser
                let askObjet = prompt(`Quel objet de ce tableau : ${naruto.objets} , veux tu utiliser ?`);

                //? Tant que le hero n'écrit pas un objet qui existe dans son tableau , redemande le prompt
                while (!naruto.objets.includes(askObjet)) {
                    askObjet = prompt(`Quel objet de ce tableau : ${naruto.objets} , veux tu utiliser ?`);
                }
                //? Mettre le nom de l'objet en active chez le Hero et lui enlever une utilisation
                for (let index = 0; index < naruto.objets.length; index++) {
                    let element = naruto.objets[index];
                    if (element.nom == askObjet && element.nombre > 0) {
                        element.nombre--
                        // On vérifie si l'element égal à 0 , alors on l'enleve du tableau
                        if (element.nombre == 0) {
                            naruto.objets.splice(index, 1);
                        }
                    }
                }
                naruto.active = askObjet;

                //^ On vérifie si il y a des objets chez le vilain
                if (vilain1.objets.length != 0) {
                    //^ Tableau des chances d'utilisation des objets
                    let tableau_random = [true, false, false];
                    //^ Valeur du round 
                    let valeurRandom = tableau_random[Math.round(Math.random() * (tableau_random.length - 1))];

                    //^ Si la valeur tombe sur true , alors le vilain attaque avec l'objet 
                    if (valeurRandom == true) {
                        //^ Le random choisis un objet du tableau 
                        let randomObjetVilain1 = vilain1.objets[Math.round(Math.random() * (vilain1.objets.length - 1))];

                        for (let index = 0; index < vilain1.objets.length; index++) {
                            let element = vilain1.objets[index];
                            //^ On vérifie que l'élement a le même nom que l'objet choisis en random
                            if (element.nom == randomObjetVilain1.nom) {
                                element.nombre--;
                                if (element.nombre == 0) {
                                    vilain1.objets.splice(index, 1);
                                }
                            }
                        }
                        vilain1.active = randomObjetVilain1.nom;
                    }
                }
                //* Début du combat
                //? Vérifier si le hero à envie d'attaquer ou de se soigner 
                let askHeroState = prompt(`Voulez vous utiliser quoi comme state : attaque / soin`);
                while (askHeroState != "attaque" && askHeroState != "soin") {
                    askHeroState = prompt(`Voulez vous utiliser quoi comme state : attaque / soin`);
                }

                //? Vérifier si le vilain a utilisé l'objet Taser
                if (vilain1.active == "taser") {
                    alert(`le hero ne peut pas attaquer ni se soigner à cause de l'objet "taser"`);

                    //? On vérifie si l'objet du Hero est taser / etoile
                    if (naruto.active == "taser" || naruto.active == "etoile") {
                        alert(`le vilain ne peut pas attaquer à cause de l'objet "${naruto.active}"`)
                    } else {
                        //^ Attaque du vilain 
                        naruto.vie -= vilain1.attaque;
                    }
                } else if (vilain1.active == "etoile") {
                    if (askHeroState == "attaque") {
                        //? L'attaque du hero est annulé
                        alert(`l'attaque est inutile car le vilain à utiliser son objet "etoile`)

                        //? On vérifie si l'objet du Hero est taser / etoile
                        if (naruto.active == "taser" || naruto.active == "etoile") {
                            alert(`le vilain ne peut pas attaquer à cause de l'objet "${naruto.active}"`)
                        } else {
                            //^ Attaque du vilain 
                            naruto.vie -= vilain1.attaque;
                        }
                    } else {
                        //? Soin du hero
                        naruto.vie += naruto.soin;

                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;
                    }
                }
                if (askHeroState == "attaque") {
                    switch (naruto.active) {
                        case "champignon":
                            champignon_fonction(naruto, vilain1);
                            switch (vilain1.active) {
                                case "champignon":
                                    champignon_fonction(vilain1, naruto);
                                    break;
                                case "fleur":
                                    fleur_fonction(naruto);
                                    break;
                                case "dent vampirique":
                                    dent_vampirique_attaque_fonction(vilain1, naruto);
                                    break;
                                case "bombe":
                                    bombe_fonction(naruto);
                                    break;
                                default:
                                    naruto.vie -= vilain1.attaque;
                                    break;
                            }
                            break;
                        case "fleur":
                            fleur_fonction(vilain1);
                            switch (vilain1.active) {
                                case "champignon":
                                    champignon_fonction(vilain1, naruto);
                                    break;
                                case "fleur":
                                    fleur_fonction(naruto);
                                    break;
                                case "dent vampirique":
                                    dent_vampirique_attaque_fonction(vilain1, naruto);
                                    break;
                                case "bombe":
                                    bombe_fonction(naruto);
                                    break;
                                default:
                                    naruto.vie -= vilain1.attaque;
                                    break;
                            }
                            break;
                        case "dent vampirique":
                            dent_vampirique_attaque_fonction(naruto, vilain1);
                            switch (vilain1.active) {
                                case "champignon":
                                    champignon_fonction(vilain1, naruto);
                                    break;
                                case "fleur":
                                    fleur_fonction(naruto);
                                    break;
                                case "dent vampirique":
                                    dent_vampirique_attaque_fonction(vilain1, naruto);
                                    break;
                                case "bombe":
                                    bombe_fonction(naruto);
                                    break;
                                default:
                                    naruto.vie -= vilain1.attaque;
                                    break;
                            }
                            break;
                        case "bombe":
                            bombe_fonction(vilain1);
                            switch (vilain1.active) {
                                case "champignon":
                                    champignon_fonction(vilain1, naruto);
                                    break;
                                case "fleur":
                                    fleur_fonction(naruto);
                                    break;
                                case "dent vampirique":
                                    dent_vampirique_attaque_fonction(vilain1, naruto);
                                    break;
                                case "bombe":
                                    bombe_fonction(naruto);
                                    break;
                                default:
                                    naruto.vie -= vilain1.attaque;
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
                } else { //? Si le hero décide de se soigner et il a utilisé l'objet dent vampirique
                    if (naruto.active == "dent vampirique") {
                        dent_vampirique_soin_fonction(naruto);
                        switch (vilain1.active) {
                            case "champignon":
                                champignon_fonction(vilain1, naruto);
                                break;
                            case "fleur":
                                fleur_fonction(naruto);
                                break;
                            case "dent vampirique":
                                dent_vampirique_attaque_fonction(vilain1, naruto);
                                break;
                            case "bombe":
                                bombe_fonction(naruto);
                                break;
                            default:
                                naruto.vie -= vilain1.attaque;
                                break;
                        }
                        console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
                    } else { //? Sans la dent vampirique
                        naruto.vie += naruto.soin;

                        switch (vilain1.active) {
                            case "champignon":
                                champignon_fonction(vilain1, naruto);
                                break;
                            case "fleur":
                                fleur_fonction(naruto);
                                break;
                            case "dent vampirique":
                                dent_vampirique_attaque_fonction(vilain1, naruto);
                                break;
                            case "bombe":
                                bombe_fonction(naruto);
                                break;
                            default:
                                naruto.vie -= vilain1.attaque;
                                break;
                        }
                    }
                }
                console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
            } else { //? Si le confirm du hero est false
                alert(`Tu n'utilise aucun objet`);

                //^ On vérifie si il y a des objets chez le vilain
                if (vilain1.objets.length != 0) {
                    //^ Tableau des chances d'utilisation des objets
                    let tableau_random = [true, false, false];
                    //^ Valeur du round 
                    let valeurRandom = tableau_random[Math.round(Math.random() * (tableau_random.length - 1))];

                    //^ Si la valeur tombe sur true , alors le vilain attaque avec l'objet 
                    if (valeurRandom == true) {
                        //^ Le random choisis un objet du tableau 
                        let randomObjetVilain1 = vilain1.objets[Math.round(Math.random() * (vilain1.objets.length - 1))];

                        for (let index = 0; index < vilain1.objets.length; index++) {
                            let element = vilain1.objets[index];
                            //^ On vérifie que l'élement a le même nom que l'objet choisis en random
                            if (element.nom == randomObjetVilain1.nom) {
                                element.nombre--;
                                if (element.nombre == 0) {
                                    vilain1.objets.splice(index, 1);
                                }
                            }
                        }
                        vilain1.active = randomObjetVilain1.nom;
                    }
                }

                //* Début du combat
                //? Vérifier si le hero à envie d'attaquer ou de se soigner 
                let askHeroState = prompt(`Voulez vous utiliser quoi comme state : attaque / soin`);
                while (askHeroState != "attaque" && askHeroState != "soin") {
                    askHeroState = prompt(`Voulez vous utiliser quoi comme state : attaque / soin`);
                }

                if (askHeroState == "attaque") {
                    switch (vilain1.active) {
                        case "taser":
                            //? Le hero ne peut pas attaquer
                            alert(`Le hero ne peut ni attaquer ni se soigner`);

                            //^ Attaque du vilain
                            naruto.vie -= vilain1.attaque;
                            break;
                        case "etoile":
                            //? Le hero ne peut pas attaquer
                            alert(`Le hero ne peut pas attaquer`);

                            //^ Attaque du vilain
                            naruto.vie -= vilain1.attaque;
                            break;
                        case "champignon":
                            //^ Attaque du vilain
                            champignon_fonction(vilain1, naruto);

                            //? Attaque du hero
                            vilain1.vie -= naruto.attaque;
                            break;
                        case "fleur":
                            //^ Attaque du vilain
                            fleur_fonction(naruto);

                            //? Attaque du hero
                            vilain1.vie -= naruto.attaque;
                            break;
                        case "dent vampirique":
                            //^ Attaque du vilain
                            dent_vampirique_attaque_fonction(vilain1, naruto);

                            //? Attaque du hero
                            vilain1.vie -= naruto.attaque;
                            break;
                        case "bombe":
                            //^ Attaque du vilain
                            bombe_fonction(naruto);

                            //? Attaque du hero 
                            vilain1.vie -= naruto.attaque;
                            break;
                        default:
                            naruto.vie -= vilain1.attaque;
                            break;
                    } 
                    console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
                } else {
                    switch (vilain1.active) {
                        case "taser":
                            //? Le hero ne peut pas attaquer
                            alert(`Le hero ne peut ni attaquer ni se soigner`);

                            //^ Attaque du vilain
                            naruto.vie -= vilain1.attaque;
                            break;
                        case "etoile":
                            //? Le hero ne peut pas attaquer mais peut se soigner
                            naruto.vie += naruto.soin;
                            alert(`Le hero ne peut pas attaquer mais peut se soigner`);

                            //^ Attaque du vilain
                            naruto.vie -= vilain1.attaque;
                            break;
                        case "champignon":
                            //^ Attaque du vilain
                            champignon_fonction(vilain1, naruto);

                            //? Soin du Hero
                            naruto.vie += naruto.soin;
                            break;
                        case "fleur":
                            //^ Attaque du vilain
                            fleur_fonction(naruto);

                            //? Soin du Hero
                            naruto.vie += naruto.soin;
                            break;
                        case "dent vampirique":
                            //^ Attaque du vilain
                            dent_vampirique_attaque_fonction(vilain1, naruto);

                            //? Soin du Hero
                            naruto.vie += naruto.soin;
                            break;
                        case "bombe":
                            //^ Attaque du vilain
                            bombe_fonction(naruto);

                            //? Soin du Hero 
                            naruto.vie += naruto.soin;
                            break;
                        default:
                            naruto.vie -= vilain1.attaque;
                            break;
                    }
                }
                console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
            }
        } else { //? Le hero n'a aucun objet 
            alert(`Tu n'as aucun objet'`);

            //^ On vérifie si il y a des objets chez le vilain
            if (vilain1.objets.length != 0) {
                //^ Tableau des chances d'utilisation des objets
                let tableau_random = [true, false, false];
                //^ Valeur du round 
                let valeurRandom = tableau_random[Math.round(Math.random() * (tableau_random.length - 1))];

                //^ Si la valeur tombe sur true , alors le vilain attaque avec l'objet 
                if (valeurRandom == true) {
                    //^ Le random choisis un objet du tableau 
                    let randomObjetVilain1 = vilain1.objets[Math.round(Math.random() * (vilain1.objets.length - 1))];

                    for (let index = 0; index < vilain1.objets.length; index++) {
                        let element = vilain1.objets[index];
                        //^ On vérifie que l'élement a le même nom que l'objet choisis en random
                        if (element.nom == randomObjetVilain1.nom) {
                            element.nombre--;
                            if (element.nombre == 0) {
                                vilain1.objets.splice(index, 1);
                            }
                        }
                    }
                    vilain1.active = randomObjetVilain1.nom;
                }
            }

            //* Début du combat
            //? Vérifier si le hero à envie d'attaquer ou de se soigner 
            let askHeroState = prompt(`Voulez vous utiliser quoi comme state : attaque / soin`);
            while (askHeroState != "attaque" && askHeroState != "soin") {
                askHeroState = prompt(`Voulez vous utiliser quoi comme state : attaque / soin`);
            }

            if (askHeroState == "attaque") {
                switch (vilain1.active) {
                    case "taser":
                        //? Le hero ne peut pas attaquer
                        alert(`Le hero ne peut ni attaquer ni se soigner`);

                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;
                        break;
                    case "etoile":
                        //? Le hero ne peut pas attaquer
                        alert(`Le hero ne peut pas attaquer`);

                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;
                        break;
                    case "champignon":
                        //^ Attaque du vilain
                        champignon_fonction(vilain1, naruto);

                        //? Attaque du hero
                        vilain1.vie -= naruto.attaque;
                        break;
                    case "fleur":
                        //^ Attaque du vilain
                        fleur_fonction(naruto);

                        //? Attaque du hero
                        vilain1.vie -= naruto.attaque;
                        break;
                    case "dent vampirique":
                        //^ Attaque du vilain
                        dent_vampirique_attaque_fonction(vilain1, naruto);

                        //? Attaque du hero
                        vilain1.vie -= naruto.attaque;
                        break;
                    case "bombe":
                        //^ Attaque du vilain
                        bombe_fonction(naruto);

                        //? Attaque du hero 
                        vilain1.vie -= naruto.attaque;
                        break;
                    default:
                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;

                        //? Attaque du hero
                        vilain1.vie -= naruto.attaque;
                        break;
                }
                console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
            } else {
                switch (vilain1.active) {
                    case "taser":
                        //? Le hero ne peut pas attaquer ni se soigner
                        alert(`Le hero ne peut ni attaquer ni se soigner`);

                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;
                        break;
                    case "etoile":
                        //? Le hero ne peut pas attaquer mais peut se soigner
                        naruto.vie += naruto.soin;
                        alert(`Le hero ne peut pas attaquer mais peut se soigner`);

                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;
                        break;
                    case "champignon":
                        //^ Attaque du vilain
                        champignon_fonction(vilain1, naruto);

                        //? Soin du Hero
                        naruto.vie += naruto.soin;
                        break;
                    case "fleur":
                        //^ Attaque du vilain
                        fleur_fonction(naruto);

                        //? Soin du Hero
                        naruto.vie += naruto.soin;
                        break;
                    case "dent vampirique":
                        //^ Attaque du vilain
                        dent_vampirique_attaque_fonction(vilain1, naruto);

                        //? Soin du Hero
                        naruto.vie += naruto.soin;
                        break;
                    case "bombe":
                        //^ Attaque du vilain
                        bombe_fonction(naruto);

                        //? Soin du Hero 
                        naruto.vie += naruto.soin;
                        break;
                    default:
                        //? Soin du Hero 
                        naruto.vie += naruto.soin;

                        //^ Attaque du vilain
                        naruto.vie -= vilain1.attaque;
                        break;
                }
            }
            console.log(`la vie du Hero est : ${naruto.vie} , la vie du Vilain est : ${vilain1.vie}`);
        }
    }
}
combat();


