<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { FileText, Menu, X, ArrowRight } from 'lucide-vue-next'
import ModeToggle from '@/components/ModeToggle.vue'
import Auth from '@/pages/auth/Auth.vue'

const authRef = ref<InstanceType<typeof Auth> | null>(null)
const isMobileMenuOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 16
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function openAuth(view: 'login' | 'register') {
  closeMobileMenu()
  authRef.value?.openDialog(view)
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 w-full transition-all duration-300',
      scrolled
        ? 'bg-background/85 backdrop-blur-lg border-b border-border shadow-sm'
        : 'bg-transparent border-b border-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- ── Logo ─────────────────────────────────────────── -->
        <RouterLink to="/" class="flex items-center gap-2.5 group shrink-0">
          <div
            class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200"
          >
            <FileText class="w-5 h-5 text-primary-foreground" />
          </div>
          <span class="text-xl font-bold text-foreground tracking-tight leading-none">
            Permits<span class="text-primary">Pro</span>
          </span>
        </RouterLink>

        <!-- ── Desktop nav links ──────────────────────────────── -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="px-3 py-1.5 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-150"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- ── Desktop right actions ─────────────────────────── -->
        <div class="hidden md:flex items-center gap-2">
          <ModeToggle />
          <div class="w-px h-5 bg-border mx-1" aria-hidden="true" />
          <button
            @click="openAuth('login')"
            class="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all duration-150"
          >
            Sign In
          </button>
          <button
            @click="openAuth('register')"
            class="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-150"
          >
            Get Started
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- ── Mobile hamburger ───────────────────────────────── -->
        <div class="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 rotate-90 scale-75"
              enter-to-class="opacity-100 rotate-0 scale-100"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 rotate-0 scale-100"
              leave-to-class="opacity-0 -rotate-90 scale-75"
              mode="out-in"
            >
              <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
              <X v-else class="w-5 h-5" />
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Mobile drawer ─────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-background border-t border-border shadow-lg">
        <!-- Nav links -->
        <nav class="px-4 pt-3 pb-2 space-y-0.5" aria-label="Mobile navigation">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- Divider + actions -->
        <div class="px-4 pt-3 pb-4 border-t border-border space-y-2 mt-1">
          <button
            @click="openAuth('login')"
            class="w-full px-4 py-2.5 text-sm font-medium text-foreground rounded-lg border border-border hover:bg-accent transition-colors text-center"
          >
            Sign In
          </button>
          <button
            @click="openAuth('register')"
            class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            Get Started
            <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Auth dialog (mounted here, opened programmatically via openAuth()) -->
  <Auth ref="authRef" />
</template>
