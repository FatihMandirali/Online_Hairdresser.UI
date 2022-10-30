<template>
  <v-app>
    <Header_Component v-if="!$route.path.includes('login')"></Header_Component>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Header_Component from "@/components/shared/Header_Component";
export default {
  name: 'App',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header_Component
  },

  data: () => ({
    //
  }),
};
</script>
