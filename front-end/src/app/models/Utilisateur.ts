export class Utilisateur {
  uuid: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  roles: string[] = [];
  online: boolean = false;
  nonExpired: boolean = false;
  nonLocked: boolean = false;
  enabled: boolean = false;

}