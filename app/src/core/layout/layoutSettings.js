export default {
    minBrowserWidth: 700,
    displayTooSmallWatchBreakpoint: 750,
    pinMenuBreakpoint: 992,
    pinMenu: true,
    appName: 'Spinnaker Advanced User Lab',
    covers: {
        displayTooSmall: {
            mainMessage: "We're sorry, but your display is too small for our app...",
            subMessage: "To continue using the App, please change your browser width or use a larger screen resolution"
        },
        default: {
            mainMessage: "There was an issue",
            subMessage: "Contact an administrator."
        },
        missingBaseGateUrlEnvVariable: {
            mainMessage: "We're sorry, but it looks like you did not include the BASE_GATE_URL environment variable",
            subMessage: "Redeploy the container with the BASE_GATE_URL environment variable in your ConfigMap."
        },
        missingBaseDeckUrlEnvVariable: {
            mainMessage: "We're sorry, but it looks like you did not include the BASE_DECK_URL environment variable",
            subMessage: "Redeploy the container with the BASE_DECK_URL environment variable in your ConfigMap."
        },
        missingAppConfig: {
            mainMessage: "We're sorry, but it appears SAUL was unable to pull your APP CONFIG",
            subMessage: "Verify that your ingress in correct and handles requests to /saul-api as well as /saul"
        }
    },
}
