<template>
  <h1>Home</h1>
  <router-link
    v-for="link in routes"
    :key="link.name"
    :to="{ name: link.name }"
  >
    <p>{{ link.name }}</p>
  </router-link>
</template>
<script setup lang="ts">
import { routes } from "../infra/router";
</script>
