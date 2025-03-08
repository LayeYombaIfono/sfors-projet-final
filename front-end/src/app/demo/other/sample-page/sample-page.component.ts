// angular import
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { TblSearchingComponent } from '../../table/tbl-datatable/tbl-searching/tbl-searching.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagedData } from './PagedData';
import { Agent } from './Agent';
import { Page } from '../Page';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [CommonModule, DataTablesModule, TblSearchingComponent],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})

export default class SamplePageComponent implements OnInit {
  // agentList = this.tableService.getTable();
  isDG: boolean = false;
  isSRH: boolean = false;
  isCH: boolean = false;
  isAGENT: boolean = false;
  dataAgent = new PagedData();
  agentList = [];
  sortAgentList: Agent[] | null = null;
  filterAgent: Agent[] | null = null;
  cfilterAgent: Agent[] | null = null;
  // editAgent: FormGroup=Object.create(null);
  editAddLabel: string = "Edit";
  agentDetail: Agent | null = null;
  totalLengthOfCollection: number = 0;
  isFormationAcademique: boolean = true;
  isFormationSuivi: boolean = false;
  isDistinction: boolean = false;
  isAffectation: boolean = true;
  isEngagement: boolean = true;
  isGrade: boolean = false;
  isEvolutionStatuaire: boolean = false;
  isSanction: boolean = false;
  isContrat: boolean = false;
  isDotation: boolean = false;
  isMission: boolean = false;
  isConge: boolean = false;
  isExperience: boolean = false;
  isIndemnite: boolean = false;
  isPaiement: boolean = false;
  isLangue: boolean = true;
  isAgent: boolean = true;
  isButtonAjout: boolean = true;
  isButtonSupprimer: boolean = true;

  cpage: number = 0;
  cpageSize: number = 0;
  isInscrireFormation: boolean = false;
  isDemandeFormation: boolean = false;

  //acivated tab
  activeSelected = 1;
  disabled = false;
  //objet retourné du l'api via le service
  pag = new Page();
  rows = new Array<Agent>();

  //agent form
  parentProperty = new Agent();

  affectationProperty = new Agent();
  distinctionProperty = new Agent();
  engagementProperty = new Agent();
  agentMissionProperty = new Agent();
  agentExperienceProperty = new Agent();
  Property = new Agent();
  langueProperty = new Agent();
  // @ViewChild("agentEditor") child: AgentFormComponent;
  @ViewChild("content", { static: false }) el!: ElementRef;
  @ViewChild("contentAgentDetail", { static: false }) elem!: ElementRef;
  dataListeAgent: any;
  agentData = null;
  evolutionStatuaireData: any;
  affectationData: any;
  role: any;
  constructor(
    private modalService: NgbModal,
    // private agentService: AgentService,
    // private affectationService: AffectationService,
    // private tokenStorageService: TokenStorageService
  ) {
    this.filterAgent = this.agentList;
    this.cfilterAgent = this.agentList;
    this.sortAgentList = this.agentList;
    this.totalLengthOfCollection = this.cfilterAgent.length;
  }

  ngOnInit(): void {
    console.log(this.agentData);
    // this.role = this.tokenStorageService.getDecodedAccessToken(this.tokenStorageService.getToken()).aud;
    //this.onPageChange(1);
    this.isAuth();
    
    this.onPageChange(this.cpage)
  }

  isAuth() {
    if (this.role.indexOf("SRH") != -1) {
      this.isSRH = true;
    } if (this.role.indexOf("DG") != -1) {
      this.isDG = true;
    } if (this.role.indexOf("AGENT") != -1) {
      this.isAGENT = true;
    } if (this.role.indexOf("CH") != -1) {
      this.isCH = true;
    } else {
    }
  }

  refresh(page: number){
    console.log(page)
    this.onPageChange(page)
  }

  // getAgents() {
  //   this.agentService.getAgentNgPagination(0,4).subscribe((PagedData) => {
  //     //objet du pagination
  //     this.pag = PagedData.page;
  //     //objet du donné recupéré
  //     this.cfilterAgent = PagedData.data;
  //     this.totalLengthOfCollection = this.pag.totalElements;

  //       //complete example................
  //     this.cpage = this.pag.pageNumber;
  //     this.cpageSize = this.pag.size;
  //   });
  // }

  onPageChange(page: number) {
    console.log(page)
    // this.agentService
    //   .getAgentNgPagination(page, environment.numberPage)
    //   .subscribe((PagedData) => {
    //     //objet du pagination
    //     this.pag = PagedData.page;
    //     //objet du donné recupéré
    //     this.cfilterAgent = PagedData.data;
    //     this.dataListeAgent = PagedData.data;
    //     this.totalLengthOfCollection = this.pag.totalElements;
  // });
    this.pag = PagedData.page;
        //objet du donné recupéré
        this.cfilterAgent = PagedData.data;
        this.dataListeAgent = PagedData.data;
        this.totalLengthOfCollection = this.pag.totalElements;
   console.log(this.cfilterAgent)
        //complete example................
        //this.cpage = this.pag.pageNumber + 1;
        this.cpageSize = this.pag.size;
      
  }

  _csearchTerm: string = "";
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    // this.cfilterAgent = this.cfilter(val);
    this.totalLengthOfCollection = 10;
  }

  cfilter(v: string) {
    console.log(v);
    // if (v != "") {
    //   return this.cfilterAgent.filter(
    //     (x) =>
    //       x.genre?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    //       x.contact?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    //       x.matricule?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    //       x.nom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    //       x.prenom?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
    //       x.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1
    //   );
    // } else {
    //   // this.agentService.getAgentNg().subscribe((PagedData) => {
    //   //   this.cfilterAgent = PagedData.data;
    //   //   this.totalLengthOfCollection = this.cfilterAgent.length;
    //   //   console.log("test ons: ", JSON.stringify(this.cfilterAgent));
    //   // });
    //   this.onPageChange(0)
    //   return this.cfilterAgent;
    // }
  }

  openMyModal(event: string) {
    document.querySelector('#' + event)?.classList.add('md-show');
  }
  closeMyModal(event: {
    target: { parentElement: { parentElement: { parentElement: { classList: { remove: (arg0: string) => void } } } } };
  }) {
    event.target.parentElement.parentElement.parentElement.classList.remove('md-show');
  }
fermerModal(){
  this.modalService.dismissAll();
}
  openModal(targetModal: NgbModal, agent: any) {
    console.log(agent)
  
    if (agent == null) {
      this.editAddLabel = "Formulaire Enregistrement";
      this.parentProperty = agent;
      this.disabled = true;
    }
    if (agent != null) {
      if (this.isAgent === true) {
        this.editAddLabel = "Formulaire Modification";
      }
      this.parentProperty = agent;
      this.affectationProperty = agent;
      this.distinctionProperty = agent;
      this.langueProperty = agent;
      this.engagementProperty = agent;
      this.agentMissionProperty = agent;
      this.agentExperienceProperty = agent;
      this.disabled = false;
      this.activeSelected = 1;
    }
    this.modalService.open(targetModal, {
      centered: true,
      size: "xl", // size:'sm' | 'md' | 'lg',
      backdrop: "static",
    });
  }

  openModalPrint(targetModal: NgbModal, agent: any) {
    this.modalService.open(targetModal, {
      centered: true,
      size: "xl", // size:'sm' | 'md' | 'lg',
      backdrop: "static",
    });
    this.editAddLabel = "Etat";
    this.parentProperty = agent;
  }

  openModalProfile(targetModal: NgbModal, agent: any) {
    this.parentProperty = agent;
    this.modalService.open(targetModal, {
      centered: true,
      size: "xl", // size:'sm' | 'md' | 'lg',
      backdrop: "static",
    });
    
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  delete(agent: Agent): void {
    Swal.fire({
      icon: "error",
      text: "Voulez vous supprimer ?",
      title: "Suppression",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "OUI",
      denyButtonText: `NON`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Suppression", "Suppression effectuer.", "success").then(
          (res) => {
            
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Suppression", "suppression annuler", "info");
      }
    });
  }

 
 
}