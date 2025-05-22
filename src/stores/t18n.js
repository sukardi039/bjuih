import { defineStore } from 'pinia'

export const useT18nStore = defineStore('t18n', {
  state: () => ({
    language: 'CN',
    adminMode: false,
    initialised: false,
    languageText: {},
    currentPage: 'main',
    openMenu: false,
    overPage: null,
    overId: null,
    menuX: null,
    menuY: null,
    editor: false,
    originalText: null,
  }),
})
