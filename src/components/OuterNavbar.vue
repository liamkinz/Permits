<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ModeToggle from '@/components/ui/ModeToggle.vue'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-vue-next'
import Auth from '@/pages/auth/Auth.vue'

defineOptions({
  name: 'AppNavbar',
})

const authDialog = ref<InstanceType<typeof Auth> | null>(null)

function openAuthModal() {
  authDialog.value?.openDialog('login')
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <nav class="sticky top-0 z-50 border-b bg-card/70 backdrop-blur">
    <div class="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4">
      <RouterLink
        to="/"
        @click="scrollToTop"
        class="text-md text-foreground dark:text-primary inline-flex items-center gap-3 font-semibold tracking-wide"
      >
        <FileText class="w-5 h-5 text-primary" />
        <span class="text-xl font-bold text-foreground tracking-tight leading-none">
          Permits<span class="text-primary">Pro</span>
        </span>
      </RouterLink>

      <div class="flex items-center gap-4">
        <Button as-child variant="ghost" size="sm">
          <RouterLink to="/" @click="scrollToTop">Home</RouterLink>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <a href="#how-it-works">How It Works</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <RouterLink to="/about">About</RouterLink>
        </Button>
        <ModeToggle />
        <Button size="sm" @click="openAuthModal"> Get Started </Button>
      </div>
    </div>
  </nav>
  <Auth ref="authDialog" />
</template>
