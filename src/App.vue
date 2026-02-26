<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b border-border p-4">
      <nav class="container mx-auto flex gap-4">
        <RouterLink 
          to="/" 
          class="hover:text-primary transition-colors"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/about" 
          class="hover:text-primary transition-colors"
        >
          About
        </RouterLink>
      </nav>
    </header>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>