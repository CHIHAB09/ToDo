// Dans l'array toDo un valeur true signifie que cette action est accomplie,
// une valeur false signifie qu'elle est à faire
 let notesJSON = `[
	{
		"titre": "Notes Javascript",
		"texte": "Une méthode est une fonction appartenant à un objet",
		"date": "15/01/2021",
		"couleur": "rouge",
		"dateRappel": "null"
	},
	{
		"titre": "Notes Javascript",
		"toDo": [
			{"Faire les courses": true},
			{"Payer le loyer": false}
		],
		"date": "18/01/2021",
		"couleur": "rouge",
		"dateRappel": "null"
	}
]`

/*_______________________________________________________________________________________________________________________*/

// on converti le tab NoteJson en chaine de caractere
let TabJSON= JSON.parse(notesJSON);

// initier le tableau vide
notesArray =[];
/*_____________________________________________________________________________________________________________________________*/

//classe parent

class Notes 
{
	//methode static qui veut dire que la propriete est fixe a la classe mais peut etre utiliser dans les classe filles
	static couleur=["rouge","orange","jaune","vert"];


	//constructeur avec les parametre qu on a besoin
	constructor(titre,dateCreation= new Date(),couleur,dateRappel=undefined){

		if (typeof titre == "string") {
				this._titre=titre;
		}
	

		if(typeof dateCreation == "string" || dateCreation instanceof Date){
			this._dateCreation=dateCreation;
		} 


		//verification que la couleur equivaut a une des couleur du tableau et que c est un string
		if(typeof couleur == "string" && Notes.couleur.includes(couleur.toLowerCase())){
				this._couleur=couleur.toLocaleLowerCase();
		}else{
			console.log("Cette couleur n'est pas autorise ici !!");
		}

		if (typeof dateRappel == "string" || dateRappel instanceof Date) {
				this._dateRappel=dateRappel;
		}
	}

	//methode Getter

	get titre(){
		return this._titre;
	}
	
	get dateCreation(){
		return this._dateCreation;
	}
	get couleur(){
		return this._couleur;
	}
	get dateRappel(){
		return this._dateRappel;
	}


	//methode setter
	set titre(titre){
		//verification du type 
		if (typeof titre == "string") {
			console.log(this.titre)
				this._titre=titre;
		}
	}

	set dateCreation(dateCreation){
		if (typeof dateCreation == "string" || dateCreation instanceof Date) {
			console.log(this.dateCreation)
				this._dateCreation=dateCreation;
		}
	}

	set couleur(couleur){
		if(typeof couleur == "string" && Notes.couleur.includes(couleur.toLowerCase())){
				this._couleur=couleur.toLocaleLowerCase();
		}else{
			console.log("Cette couleur n'est pas autorise ici !!");
		}
			}
				
	

	set dateRappel(dateRappel){
		if (typeof dateRappel == "string" || dateRappel instanceof Date) {
			console.log(this.dateRappel)
				this._dateRappel=dateRappel;
		}
	}
	// methode qui affiche et insert le html recu
	static displayNotes(notesArray,idcontainer){
		container= document.querySelector(`#${idcontainer}`);
		container.innerHTML="";
		//on boucle sur le tableau des instances , on cree une variable instance pour stoker les valeur recu
		notesArray.forEach(instance =>{
			// on insert le html recu et on choisi l endroit 
			container.insertAdjacentElement('beforeend',instance.render());

		})
	}

		static WhichClass(TabParseJson,TabStokageInstance){

			//cree boucle avec tabJSON mais le param(TabParseJson)
			//pour savoir qu elle instance (if())
			//assimiler le tableau au nouvelle instance methode .unshift
		
			// for (of) affiche les valeur tour a tour
			//for (in) affiche les nom des proprieté pas avec un tableau!!!!!!
			for(let note of TabParseJson) {
				if(note.texte){
					note.unshift( new TextNote(note.titre,note.dateCreation,note.couleur,note.dateRappel,note.texte));
				}else if(note.toDo){
					note.unshift( new ChecklistNote(note.titre,note.dateCreation,note.couleur,note.dateRappel,note.toDo));
			}
			//ajoute au tableau
			TabStokageInstance.unshift(note);
			
		}
			
			//retourne le tableau inverser
			return TabStokageInstance;
		}
		
	}
		
	/*________________________________________________________________________________________________________________________________________________*/

	//on cree une classe fille de Notes
	class TextNote extends Notes
	{
		//on ecrase le constructor parent
		constructor(titre,dateCreation,couleur,dateRappel,texte){
				//on complete les donner du constructor parent avec la methode super()
				super(titre,dateCreation,couleur,dateRappel);
					if (typeof texte == "string") {
						this._texte=texte;
			}
		}

	//methode

	get texte(){
		return this._texte;
	}

	set texte(texte){
		if (typeof texte == "string") {
				this._texte=texte;
		}
	}
	//methode qui creee le html
	render(){

		let monBlok = document.createElement('div');
		
		//creation de lien entre l instance et le HTML!!!!!
		//Notereference est unn nom choisi
		monBlok._NoteReference_= this;
		//creation d'un objet qui contient les couleur en francais et la valeur en anglais pour pouvoir mettre la  bonne couleur
		//avec le css
		let colorsMapping = {
			rouge: "red",
			orange: "orange",
			jaune: "yellow",
			vert: "green"
		}
		//creation du html
		monBlok.innerHTML= `

				<h3>Titre:</h3> <p>${this.titre}</p>
				<h3>Date de création:</h3> <p>${this.dateCreation}</p>
				<h3>Date de rappel:</h3> <p>${this.dateRappel}</p>
				<h3>Texte:</h3> <p>${this.texte}</p>
		`
			//attribuer la couleur du background avec la couleur de l'instance.
			monBlok.style.background = colorsMapping[this.couleur];
		return monBlok;

	}
}

/*_______________________________________________________________________________________________________________________________*/


//class fille de NOtes
	class ChecklistNote extends Notes
	{
		constructor(titre,dateCreation,couleur,dateRappel,toDo){
			super(titre,dateCreation,couleur,dateRappel);
			if(Array.isArray(toDo)){
				this._toDo=toDo;
			}

		}

		//methode

		get toDo(){
			return this._toDo;
		}
		// on verifie que toDo est un tableau avec la methode isArray.
		set toDo(toDo){
			if(Array.isArray(toDo)){
				this._toDo=this.toDo;
			}
		}
	//methode qui cree le html
	render(){
		let monBlokChecklist = document.createElement('div');
		//creation de lien entre l instance et le HTML!!!!!
		monBlokChecklist._NoteReference_ = this;
			let colorsMapping = {
			rouge: "red",
			orange: "orange",
			jaune: "yellow",
			vert: "green"
		}


// choisir la maniere d afficher les taches a faire en les chequant si fait ou pas
		monBlokChecklist.innerHTML = 
					`
					<h3>Titre:</h3> <p>${this.titre}</p>
					<h3>Date de création:</h3> <p>${this.dateCreation}</p>
					<h3>Date de rappel:</h3> <p>${this.dateRappel}</p>
					
					`
					this.toDo.forEach(tache =>{
						//monBlokChecklist.innerHTML += valeur;
						for(let propriete in tache){
							monBlokChecklist.innerHTML += `<h3>${propriete}</h3>
							<p>${tache[propriete]}</p>`
							//console.log(propriete,tache[propriete]);
						}
					})
				monBlokChecklist.style.background = colorsMapping[this.couleur];
		return monBlokChecklist;
	}

}
/*_________________________________________________________________________________________________________________________*/


notesArray.unshift(checkliste1=new ChecklistNote("exercice1",new Date(),"rouge","",[{"fait":true},{"pas fait":false}]));

notesArray.unshift(note2=new TextNote("text1",new Date,"vert",undefined,"testext1t"));

// appel du noteArray pour afficher ce qu'il possede deja 
Notes.displayNotes(notesArray,"container");

 // initiation du localStorage converti en chaine de caracter (JSON.stringify)
localStorage.setItem("nouvelleNote",JSON.stringify(notesArray));

// recupere et convertie en objet avec JSON.parse
storage = JSON.parse(localStorage.getItem("nouvelleNote")); 

/*_________________________________________________________________________________________________________________________*/

 /*______________________________________________________________________________________________________________*/
/* 
 function createChecklistNote(){
	//empeche que le form de s envoier et pas etre recharger.
	event.preventDefault()
	//pointe sur l id du titre
	let titreChecklist=document.querySelector("#titreCheckliste");
	//pointe la valeur du titre
	let valeurtitreChecklist= titreChecklist.value;

	let toDoChecklist=document.querySelector("#toDoChecklist");
	let valeurtoDoChecklist= toDoChecklist.value;

	let dateCreationChecklist=document.querySelector("#dateCreationChecklist");
	let valeurdateCreationChecklist= dateCreationChecklist.value;

	let dateRappelChecklist=document.querySelector("#dateRappelChecklist");
	let valeurDateRappelChecklist= dateRappelChecklist.value;

	let colorChecklist=document.querySelector("#colorChecklist");
	let valeurcolorChecklist= colorChecklist.value;

	//console.log(valeurTitreTextNote,valeurTexteTextNote,valeurdateCreationTextNote,valeurDateRappelTextNote,valeurcolorTextNote)
	
	//instanciation
	let nouvelleChecklist= new ChecklistNote(valeurtitreChecklist,valeurtoDoChecklist,valeurdateCreationChecklist,valeurDateRappelChecklist,valeurcolorChecklist)
	// stock l instance ds mon tableau notesArray
	nouvelleChecklist = notesArray.unshift(nouvelleChecklist);

}; */