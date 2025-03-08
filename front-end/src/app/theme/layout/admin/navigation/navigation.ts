
export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}


export const NavigationAdmin: NavigationItem[] = [
  {
    id: 'acceuil',
    title: 'Acceuil',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'tableauBord',
        title: 'Tableau de Bord',
        type: 'collapse',
        icon: 'feather icon-home',
        url: '/acceuil/tableauBord',
        children: [
          {
            id: 'statistiques',
            title: 'Statistiques',
            type: 'item',
            icon: 'feather icon-activity',
            url: '/acceuil/tableauBord',
          }
        ]
      }
    ]
  },
  {
    id: 'administrative',
    title: 'administrative',
    type: 'group',
    icon: 'feather icon-user',
    children: [
      {
        id: 'formation',
        title: 'Gestion formation',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'formateur',
            title: 'formateur',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/formateur'
          },
          {
            id: 'affectation',
            title: 'Affectation',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/affectation'
          },
          {
            id: 'formation',
            title: 'Formation',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/formation'
          },
          {
            id: 'publication',
            title: 'Publication',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/publication'
          }
        ]
      },
      {
        id: 'inscription',
        title: 'Inscription',
        type: 'group',
        icon: 'feather icon-credit-card',
        children: [
          {
            id: 'inscription',
            title: 'Gestion inscription',
            type: 'collapse',
            icon: 'feather icon-credit-card',
            url: '/administrative/inscription',
            children: [
              {
                id: 'inscription',
                title: 'Inscription',
                type: 'item',
                icon: 'feather icon-credit-card',
                url: '/administrative/inscription'
              }
            ]
          }
        ]
      },

      {
        id: 'parametre',
        title: 'Utilisateur',
        type: 'group',
        icon: 'feather icon-edit',
        children: [
          {
            id: 'parametre',
            title: 'Gestion utilisateur',
            type: 'collapse',
            icon: 'feather icon-settings',
            children: [
              {
                id: 'utilisateur',
                title: 'Utilisateurs',
                type: 'item',
                icon: 'feather icon-user',
                url: '/parametre/utilisateurs'
              }
              
            ]
          }
        ]
      }
      
    ]
  }
];

/*export const NavigationSI: NavigationItem[] = [
  {
    id: 'transitaire',
    title: 'Transitaire',
    type: 'group',
    icon: 'feather icon-edit',
    children: [
      {
        id: 'transitaire',
        title: 'Transitaire',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'page-accueil',
            title: 'Transitaire',
            type: 'item',
            icon: 'feather icon-user',
            url: '/transitaire/page-accueil'
          }
          
        ]
      }
    ]
  }
];*/


export const NavigationSI: NavigationItem[] = [
  {
    id: 'parametre',
    title: 'Parametre',
    type: 'group',
    icon: 'feather icon-edit',
    children: [
      {
        id: 'parametre',
        title: 'Parametres',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'utilisateurs',
            title: 'Utilisateurs',
            type: 'item',
            icon: 'feather icon-user',
            url: '/parametre/utilisateurs'
          }
          
        ]
      }
    ]
  }
];

export const NavigationEnrolement: NavigationItem[] = [
 
  {
    id: 'acceuil',
    title: 'Acceuil',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'tableauBord',
        title: 'Tableau de Bord',
        type: 'collapse',
        icon: 'feather icon-home',
        url: '/acceuil/tableauBord',
        children: [
          {
            id: 'statistiques',
            title: 'Statistiques',
            type: 'item',
            icon: 'feather icon-activity',
            url: '/acceuil/tableauBord',
          }
        ]
      }
    ]
  },
 
  {
    id: 'administrative',
    title: 'administrative',
    type: 'group',
    icon: 'feather icon-user',
    children: [
      {
        id: 'formation',
        title: 'Gestion formation',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'formateur',
            title: 'formateur',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/formateur'
          },
          {
            id: 'affectation',
            title: 'Affectation',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/affectation'
          },
          {
            id: 'formation',
            title: 'Formation',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/formation'
          },
          {
            id: 'publication',
            title: 'Publication',
            type: 'item',
            icon: 'feather icon-users',
            url: '/administrative/publication'
          }
        ]
      },
    ]
  }
];

export const NavigationComptable: NavigationItem[] = [
  {
    id: 'acceuil',
    title: 'Acceuil',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'tableauBord',
        title: 'Tableau de Bord',
        type: 'collapse',
        icon: 'feather icon-home',
        url: '/acceuil/tableauBord',
        children: [
          {
            id: 'statistiques',
            title: 'Statistiques',
            type: 'item',
            icon: 'feather icon-activity',
            url: '/acceuil/tableauBord',
          }
        ]
      }
    ]
  },
  
  {
        id: 'inscription',
        title: 'Inscription',
        type: 'group',
        icon: 'feather icon-credit-card',
        children: [
          {
            id: 'inscription',
            title: 'Gestion inscription',
            type: 'collapse',
            icon: 'feather icon-credit-card',
            url: '/administrative/inscription',
            children: [
              {
                id: 'inscription',
                title: 'Inscription',
                type: 'item',
                icon: 'feather icon-credit-card',
                url: '/administrative/inscription'
              }
            ]
          }
        ]
  }
];
