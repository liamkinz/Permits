<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { User, Mail, Lock, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { useRegisterView } from '../composables/useRegisterView'

const emit = defineEmits<{ (e: 'switch-to-login'): void }>()
const {
  form,
  errors,
  touched,
  showPassword,
  showConfirmPassword,
  isLoading,
  agreedToTerms,
  passwordStrength,
  onBlurFullName,
  onBlurEmail,
  onBlurPassword,
  onBlurConfirmPassword,
  handleSubmit,
} = useRegisterView()

const BASE_INPUT =
  'flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors'
function inputCls(field: keyof typeof form, extra = '') {
  return [
    BASE_INPUT,
    extra,
    touched[field] && errors[field]
      ? 'border-destructive focus-visible:ring-destructive/40'
      : 'border-input focus-visible:ring-ring',
  ]
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <!-- Header -->
    <div class="text-center space-y-1.5 mb-1">
      <h2 class="text-2xl font-bold tracking-tight text-foreground montserrat-semibold">
        Create an account
      </h2>
      <p class="text-sm text-muted-foreground">Fill in your details to get started</p>
    </div>

    <!-- Full Name -->
    <div class="flex flex-col gap-2">
      <label for="register-name" class="text-sm font-medium text-foreground">Full Name</label>
      <div class="relative">
        <User class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          id="register-name"
          v-model="form.fullName"
          type="text"
          placeholder="John Doe"
          autocomplete="name"
          @blur="onBlurFullName"
          :class="inputCls('fullName')"
        />
      </div>
      <p v-if="touched.fullName && errors.fullName" class="text-xs text-destructive">
        {{ errors.fullName }}
      </p>
    </div>

    <!-- Email -->
    <div class="flex flex-col gap-2">
      <label for="register-email" class="text-sm font-medium text-foreground">Email</label>
      <div class="relative">
        <Mail class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          id="register-email"
          v-model="form.email"
          type="email"
          placeholder="name@example.com"
          autocomplete="email"
          @blur="onBlurEmail"
          :class="inputCls('email')"
        />
      </div>
      <p v-if="touched.email && errors.email" class="text-xs text-destructive">
        {{ errors.email }}
      </p>
    </div>

    <!-- Password -->
    <div class="flex flex-col gap-2">
      <label for="register-password" class="text-sm font-medium text-foreground">Password</label>
      <div class="relative">
        <Lock class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          id="register-password"
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          autocomplete="new-password"
          @blur="onBlurPassword"
          :class="inputCls('password', 'pr-10')"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Eye v-if="!showPassword" class="size-4" />
          <EyeOff v-else class="size-4" />
        </button>
      </div>
      <p v-if="touched.password && errors.password" class="text-xs text-destructive leading-snug">
        {{ errors.password }}
      </p>
      <!-- Password strength indicator -->
      <div v-if="form.password" class="flex items-center gap-2">
        <div class="flex-1 flex gap-1">
          <div
            v-for="i in 4"
            :key="i"
            class="h-1 flex-1 rounded-full transition-colors"
            :class="i <= passwordStrength.score ? passwordStrength.color : 'bg-border'"
          />
        </div>
        <span class="text-xs text-muted-foreground">{{ passwordStrength.label }}</span>
      </div>
    </div>

    <!-- Confirm Password -->
    <div class="flex flex-col gap-2">
      <label for="register-confirm-password" class="text-sm font-medium text-foreground"
        >Confirm Password</label
      >
      <div class="relative">
        <ShieldCheck
          class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
        />
        <input
          id="register-confirm-password"
          v-model="form.confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="••••••••"
          autocomplete="new-password"
          @blur="onBlurConfirmPassword"
          :class="inputCls('confirmPassword', 'pr-10')"
        />
        <button
          type="button"
          @click="showConfirmPassword = !showConfirmPassword"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Eye v-if="!showConfirmPassword" class="size-4" />
          <EyeOff v-else class="size-4" />
        </button>
      </div>
      <p v-if="touched.confirmPassword && errors.confirmPassword" class="text-xs text-destructive">
        {{ errors.confirmPassword }}
      </p>
    </div>

    <!-- Terms -->
    <div class="flex items-start gap-2">
      <input
        id="agree-terms"
        v-model="agreedToTerms"
        type="checkbox"
        class="mt-0.5 size-4 rounded border-input accent-primary cursor-pointer"
      />
      <label
        for="agree-terms"
        class="text-sm text-muted-foreground cursor-pointer select-none leading-tight"
      >
        I agree to the
        <button type="button" class="text-primary hover:underline font-medium">
          Terms of Service
        </button>
        and
        <button type="button" class="text-primary hover:underline font-medium">
          Privacy Policy
        </button>
      </label>
    </div>

    <!-- Submit -->
    <Button
      type="submit"
      :disabled="isLoading || !agreedToTerms"
      class="w-full h-10 btn-gradient-primary montserrat-semibold"
    >
      <Loader2 v-if="isLoading" class="size-4 animate-spin" />
      <span>{{ isLoading ? 'Creating account...' : 'Create Account' }}</span>
    </Button>

    <!-- Divider -->
    <div class="relative my-1">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-border" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">or continue with</span>
      </div>
    </div>

    <!-- Social buttons -->
    <div class="grid grid-cols-2 gap-3">
      <Button type="button" variant="outline" class="h-10">
        <svg class="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </Button>
      <Button type="button" variant="outline" class="h-10">
        <svg
          class="size-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
          />
        </svg>
        GitHub
      </Button>
    </div>

    <!-- Switch to login -->
    <p class="text-center text-sm text-muted-foreground">
      Already have an account?
      <button
        type="button"
        @click="emit('switch-to-login')"
        class="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
      >
        Sign in
      </button>
    </p>
  </form>
</template>
