<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, FileSearch } from 'lucide-vue-next'
import OuterLayout from '@/layout/OuterLayout.vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <section
    class="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 text-center"
  >
    <!-- Decorative blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 flex flex-col items-center gap-6 max-w-lg">
      <!-- Icon bubble -->
      <div
        class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shadow-lg"
      >
        <FileSearch class="w-10 h-10 text-primary" />
      </div>

      <!-- 404 number -->
      <p
        class="text-[7rem] sm:text-[9rem] leading-none font-extrabold text-foreground select-none tracking-tight"
      >
        <span class="text-primary">4</span>0<span class="text-primary">4</span>
      </p>

      <!-- Heading -->
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Page Not Found</h1>
        <p class="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Oops — the page you're looking for doesn't exist or has been moved. Double-check the URL
          or head back to safety.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap items-center justify-center gap-3 mt-2">
        <Button as-child size="lg">
          <RouterLink to="/">
            <ArrowLeft class="size-4" />
            Back to Home
          </RouterLink>
        </Button>
        <Button as-child variant="outline" size="lg">
          <RouterLink to="/#contact"> Contact Support </RouterLink>
        </Button>
      </div>
    </div>
  </section>
</template>
