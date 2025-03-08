import { Reponse } from "./Response";


export class Inscription extends Reponse{
   uuid!:string;
   entrepriseName!:string;
   codeNif!:string;
   codeRccm!:string;
   codeDeclarant!:string;
   email!:string;
   nom!:string;
   prenoms!:string;
   telephone!:string;
   sexe!:string;
   adress!:string;
   status!:string;
   dateInscription!:string;
   uuidPublication!:string;
   datePublication!:string;
   dateDebut!:string;
   dateFin!:string;
   lebelleFormation!:string;
   descriptionFormation!:string;

}