<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft, ShieldAlert, LogIn, House } from 'lucide-vue-next'
import OuterLayout from '@/layout/OuterLayout.vue'
import { Button } from '@/components/ui/button'

const router = useRouter()

const goBack = () => {
  window.history.length > 1 ? window.history.back() : router.push('/')
}
</script>

<template>
  <OuterLayout>
    <template #content>
      <section
        class="relative flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center overflow-hidden"
      >
        <!-- Decorative blobs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            class="absolute -top-40 -right-40 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"
          />
          <div
            class="absolute -bottom-40 -left-40 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"
          />
        </div>

        <div class="relative z-10 flex flex-col items-center gap-6 max-w-lg">
          <!-- Icon bubble -->
          <div
            class="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center ring-1 ring-destructive/20 shadow-lg"
          >
            <ShieldAlert class="w-10 h-10 text-destructive" />
          </div>

          <!-- Code -->
          <p
            class="text-[7rem] sm:text-[9rem] leading-none font-extrabold text-foreground select-none tracking-tight"
          >
            <span class="text-destructive">4</span>0<span class="text-destructive">3</span>
          </p>

          <!-- Heading -->
          <div class="flex flex-col gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Access Denied</h1>
            <p class="text-muted-foreground text-sm sm:text-base leading-relaxed">
              You don't have permission to view this page. This area is restricted to authenticated
              accounts only.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-center gap-3 mt-2">
            <Button as-child size="lg">
              <RouterLink to="" @click="goBack">
                <ArrowLeft class="size-4" />
                Go Back
              </RouterLink>
            </Button>
            <Button as-child variant="outline" size="lg">
              <RouterLink to="/">
                <House class="size-4" />
                Back to Home
              </RouterLink>
            </Button>
          </div>
        </div>
      </section>
    </template>
  </OuterLayout>
</template>
