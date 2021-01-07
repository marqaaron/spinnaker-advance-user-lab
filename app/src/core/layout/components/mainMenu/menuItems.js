export default [
  {
    name: 'authentication',
    headerText: 'Authentication',
    link: '/login',
    authRequired: false,
    rbacRequired: false,
    display: true,
    hideAfterAuth: true,
    externalLink: false,
    listPosition: 1,
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
    name: 'tools',
    headerText: 'Tools',
    link: '/tools',
    authRequired: true,
    rbacRequired: false,
    display: true,
    hideAfterAuth: false,
    externalLink: false,
    listPosition: 2,
    items: [
      {
        name: 'pipeline-expression-tester',
        title: 'Pipeline Expression Test Environment',
        link: '/tools/pipeline-expression-tester',
        display: true,
        externalLink: false,
      }
    ]
  },
  {
    name: 'references',
    headerText: 'References',
    link: '/references',
    authRequired: true,
    rbacRequired: false,
    display: true,
    hideAfterAuth: false,
    externalLink: false,
    listPosition: 3,
    items: [
      {
        name: 'documentation',
        title: 'Documentation & Help Guides',
        link: '/references/documentation',
        display: true,
        externalLink: true,
      }
    ]
  },
  {
    name: 'admin',
    headerText: 'Administration',
    link: '/admin',
    authRequired: true,
    rbacRequired: true,
    display: true,
    hideAfterAuth: false,
    externalLink: false,
    listPosition: 4,
    items: [
      {
        name: 'releases',
        title: 'SAUL Releases',
        link: '/admin/releases',
        display: true,
        externalLink: true,
      }
    ]
  }
]
