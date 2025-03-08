import { Reponse } from "./Response";


export class Publication extends Reponse{
    uuid!: string;
    datePub!: string;
    dateDebut!: string;
    dateFin!: string;
    uuidFormation!: string;
    libelleFormation!: string;
    descriptionFormation!: string
}