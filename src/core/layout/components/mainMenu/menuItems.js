export default [
  {
    name: 'settings',
    headerText: 'Settings',
    link: '/settings',
    authRequired: true,
    display: false,
    externalLink: false,
    listPosition: 1,
    items: [
      {
        name: 'ui-configuration',
        title: 'UI Configuration',
        link: '/settings/ui-configuration',
        display: true,
        externalLink: false,
      },
      {
        name: 'user-access',
        title: 'User Access',
        link: '/settings/user-access',
        display: true,
        externalLink: false,
      }
    ]
  },
  {
    name: 'authentication',
    headerText: 'Authentication',
    link: '/login',
    authRequired: false,
    display: true,
    externalLink: false,
    listPosition: 2,
    items: [
      {
        name: 'login',
        title: 'Login',
        link: '/login',
        display: true,
        externalLink: false,
      }
    ]
  },
  {
    name: 'account',
    headerText: 'Account',
    link: '/account',
    authRequired: true,
    display: false,
    externalLink: false,
    listPosition: 3,
    items: [
      {
        name: 'profile',
        title: 'Profile',
        link: '/account/profile',
        display: true,
        externalLink: false,
      },
      {
        name: 'reset-password',
        title: 'Reset Password',
        link: '/reset-password',
        display: true,
        externalLink: false,
      }
    ]
  },
  {
    name: 'dashboard',
    headerText: 'Dashboard',
    link: '/dashboard',
    authRequired: true,
    display: false,
    externalLink: false,
    listPosition: 4,
    items: [
      {
        name: 'home',
        title: 'Home',
        link: '/dashboard/home',
        display: true,
        externalLink: false,
      },
      {
        name: 'dashboardItem2',
        title: 'Dashboard Item 2',
        link: '/dashboard/dashboardItem2',
        display: false,
        externalLink: false,
      },
      {
        name: 'dashboardItem3',
        title: 'Dashboard Item 3',
        link: '/dashboard/dashboardItem3',
        display: false,
        externalLink: false,
      }
    ]
  },
  {
    name: 'home',
    headerText: 'Home',
    link: '/home',
    authRequired: true,
    display: true,
    externalLink: false,
    listPosition: 5,
    items: [
      {
        name: 'pipeline-expression-tester',
        title: 'Pipeline Expression Test Environment',
        link: '/home',
        display: true,
        externalLink: false,
      }
    ]
  }
]
