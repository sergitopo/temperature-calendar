export { default as MainMenu } from '../..\\src\\components\\MainMenu.vue'
export { default as Modal } from '../..\\src\\components\\modal.vue'

export const LazyMainMenu = import('../..\\src\\components\\MainMenu.vue' /* webpackChunkName: "components_MainMenu" */).then(c => c.default || c)
export const LazyModal = import('../..\\src\\components\\modal.vue' /* webpackChunkName: "components_modal" */).then(c => c.default || c)
