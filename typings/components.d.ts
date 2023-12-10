import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ChForm: (typeof import('../packages/ch-vele'))['ChForm']
    ChTable: (typeof import('../packages/ch-vele'))['ChTable']
  }

  interface ComponentCustomProperties {}
}

export {}
