// creqte pokemons

class Pokemon {
    constructor (nom,attaque,vie,luck){
        this.nom = nom
        this.attaque = attaque
        this.vie = vie
        this.luck = luck
    }
}
let pokemons = [];
let zrabacho = new Pokemon("pikachu",10,100,80);
pokemons.push(zrabacho)
let frklo = new Pokemon("frklo",5,200,100);
pokemons.push(frklo);
let opImg = document.getElementById("opImg")
let userImg = document.getElementById("userImg")
// push the pokemons to the teams
let oponnentTeam = [];
let userTeam = [];
userTeam.push(pokemons[Math.floor(Math.random()*2 )])
console.log(userTeam);
oponnentTeam.push(pokemons[Math.floor(Math.random()*2 )])
console.log(oponnentTeam);

//combat
let op = oponnentTeam[0];
let user = userTeam[0];
console.log();
function opAttack() {
    user.vie -= op.attaque
    console.log(`${op.nom} attacked ${user.nom} for ${op.attaque}dmg, ${user.nom} has ${user.vie}hp left  `);
}
function userAttack() {
    op.vie -= user.attaque
}console.log(`${user.nom} attacked ${op.nom} for ${user.attaque}dmg, ${op.nom} has ${user.vie}hp left  `);
function userHeal() {
    user.vie += user.attaque
}

let opTurn = false;
    let userTurn = false;
    if (op.luck > user.luck) {
        opTurn= true;
    }
while (op.vie>0 || user.vie>0){
    document.getElementById("headbutt").addEventListener("click",userAttack);
    document.getElementById("heal").addEventListener("click",userHeal)
    //turns
    
     



}
if (op.vie>0){
    alert("you lost")
}else{
    alert("you win");
}

