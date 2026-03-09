<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue'

type AuthView = 'login' | 'register'

const route = useRoute()
const isOpen = ref(false)
const currentView = ref<AuthView>('login')

// Auto-open when mounted as a route page (/login or /signup)
onMounted(() => {
  if (route.name === 'login') {
    currentView.value = 'login'
    isOpen.value = true
  } else if (route.name === 'register') {
    currentView.value = 'register'
    isOpen.value = true
  }
})

function switchToRegister() {
  currentView.value = 'register'
}

function switchToLogin() {
  currentView.value = 'login'
}

function openDialog(view: AuthView = 'login') {
  currentView.value = view
  isOpen.value = true
}

// Expose for parent components (e.g. OuterNavbar)
defineExpose({ openDialog })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <!-- Dialog content (opened programmatically via openDialog() or route mount) -->
    <DialogContent class="sm:max-w-md p-0 gap-0 overflow-hidden my-8" :show-close-button="true">
      <!-- Top accent bar -->
      <div class="h-1 w-full btn-gradient-primary" />

      <div class="p-6">
        <!-- <DialogHeader class="sr-only">
          <DialogTitle>
            {{ currentView === 'login' ? 'Sign In' : 'Create Account' }}
          </DialogTitle>
          <DialogDescription>
            {{
              currentView === 'login'
                ? 'Sign in to your account to continue'
                : 'Create a new account to get started'
            }}
          </DialogDescription>
        </DialogHeader> -->

        <!-- Tab-style switcher -->
        <div class="flex rounded-lg bg-muted p-1 mb-6">
          <button
            type="button"
            @click="currentView = 'login'"
            class="flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all montserrat-semibold"
            :class="
              currentView === 'login'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            Login
          </button>
          <button
            type="button"
            @click="currentView = 'register'"
            class="flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all montserrat-semibold"
            :class="
              currentView === 'register'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            Register
          </button>
        </div>

        <!-- Animated view switching -->
        <Transition name="auth-slide" mode="out-in">
          <LoginView
            v-if="currentView === 'login'"
            key="login"
            @switch-to-register="switchToRegister"
          />
          <RegisterView v-else key="register" @switch-to-login="switchToLogin" />
        </Transition>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.auth-slide-enter-active,
.auth-slide-leave-active {
  transition: all 0.25s ease;
}

.auth-slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.auth-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

/* Make dialog overlay scrollable */
:deep([role='dialog']) {
  max-height: none !important;
}

:deep(.fixed.inset-0) {
  overflow-y: auto !important;
}
</style>
