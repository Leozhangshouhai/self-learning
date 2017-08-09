<template>
    <mu-tabs :value="theme" @change="changeTheme">
        <mu-tab title="LIGHT (DEFAULT)" value="light"/>
        <mu-tab title="DARK" value="dark"/>
        <mu-tab title="CARBON" value="carbon"/>
        <mu-tab title="TEAL" value="teal"/>
    </mu-tabs>

</template>

<script>
  import Vue from 'vue'
  import MuseUI from 'muse-ui'
  import 'muse-ui/dist/muse-ui.css'
  import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
  Vue.use(MuseUI)
//
  import light from '!raw-loader!muse-ui/dist/theme-default.css'
  import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
  import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
  import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
  export default {
    data () {
      return {
        theme: 'light',
        themes: {
          light,
          dark,
          carbon,
          teal
        }
      }
    },
    methods: {
      changeTheme (theme) {
        this.theme = theme
        const styleEl = this.getThemeStyle()
        styleEl.innerHTML = this.themes[theme] || ''
      },
      getThemeStyle () {
        const themeId = 'muse-theme'
        let styleEl = document.getElementById(themeId)
        if (styleEl) return styleEl
        styleEl = document.createElement('style')
        styleEl.id = themeId
        document.body.appendChild(styleEl)
        return styleEl
      }
    }
  }
</script>

<style scoped>

</style>
