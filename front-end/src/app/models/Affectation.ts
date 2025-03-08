import { Reponse } from "./Response";


export class Affectation extends Reponse{
    uuid!: string;
    dateAffectation!: Date;
    uuidFormateur!: string;
    nomFormateur!: string;
    prenomFormateur!: string;
    uuidFormation!: string;
    libelleFormation!: string;
    descriptionFormation!: string
}