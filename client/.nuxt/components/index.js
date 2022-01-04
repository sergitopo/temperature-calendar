export { default as CurrentYear } from '../..\\src\\components\\CurrentYear.vue'
export { default as Modal } from '../..\\src\\components\\modal.vue'

export const LazyCurrentYear = import('../..\\src\\components\\CurrentYear.vue' /* webpackChunkName: "components_CurrentYear" */).then(c => c.default || c)
export const LazyModal = import('../..\\src\\components\\modal.vue' /* webpackChunkName: "components_modal" */).then(c => c.default || c)
