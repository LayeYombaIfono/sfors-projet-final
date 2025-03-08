import { Reponse } from "./Response";

export class Formateur extends Reponse{
  uuid!: string;
  nom!: string;
  prenoms!: string;
  sexe!: string;
  phone!: string;
  email!: string;
  profession!: string;
  adress!: string
}