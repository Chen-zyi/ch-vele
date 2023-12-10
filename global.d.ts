declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ChForm: (typeof import('ch-vele'))['ChForm']
    ChTable: (typeof import('ch-vele'))['ChTable']
  }
}

export {}
