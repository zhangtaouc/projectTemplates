//该文件主要是为了解决模块未定义导致的ts报错
//tsconfig.app.json指定编译src/下的ts文件,该文件位置不可移动

//定义所有的css
declare module '*.css'
//定义vuex
declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}
//定义所有的vue文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
