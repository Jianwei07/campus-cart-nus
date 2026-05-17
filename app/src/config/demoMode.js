export const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false'

export function showDemoNotice(action = 'This action') {
  window.alert(`${action} is disabled in portfolio demo mode. This public build is read-only.`)
}
