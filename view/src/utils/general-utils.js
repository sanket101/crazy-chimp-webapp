export const checkEnvironment = () => {
    return {
        isLocal: (window.location.hostname).includes('localhost'),
        // isLocal: false,
        isProduction: (window.location.hostname).includes('crazychimp.org')
        // isProduction: true
    }
};