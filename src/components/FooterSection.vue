<script setup lang="ts">
const currentYear = new Date().getFullYear()
import TypographyMuted from '@/components/ui/typography/TypographyMuted.vue'
</script>

<template>
  <footer class="w-full border-t bg-background py-6 md:py-0">
    <div
      class="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:h-24 md:flex-row md:px-8"
    >
      <div class="flex flex-col items-center gap-4 md:flex-row md:gap-2">
        <TypographyMuted>
          Built by
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            Permits
          </a>
          . &copy; {{ currentYear }} All rights reserved.
        </TypographyMuted>
      </div>
    </div>
  </footer>
</template>
