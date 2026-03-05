<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { TypographyH4, TypographyMuted } from '@/components/ui/typography'

const route = useRoute()
const open = ref(false)

// Module-level flag: persists for the lifetime of the tab (one session).
// TODO: replace with a Pinia store (e.g. useAppStore().devNoticeSeen) when
// state management is added — no other changes required here.
let noticeDismissed = false

watch(
  () => route.path,
  (path) => {
    if (path === '/' && !noticeDismissed) {
      open.value = true
    }
  },
  { immediate: true },
)

function handleClose() {
  noticeDismissed = true
  open.value = false
}

// TODO: replace with Pinia store (e.g. useAppStore().openDevNotice()) when
// state management is added — call this from any component via templateRef.
function openDialog() {
  open.value = true
}

defineExpose({ openDialog })

const lastUpdate = new Date('2026-2-12').toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <AlertDialog :open="open">
    <AlertDialogContent class="sm:max-w-lg max-h-[90vh] overflow-y-auto">
      <!-- Top accent bar -->
      <div
        class="h-1 w-full btn-gradient-primary rounded-t-lg -mt-6 -mx-6 mb-4"
        style="width: calc(100% + 3rem)"
      />

      <AlertDialogHeader class="items-center text-center sm:text-center">
        <!-- Icon -->
        <div class="flex justify-center mb-3">
          <div class="rounded-full bg-primary/10 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-10 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              />
            </svg>
          </div>
        </div>

        <AlertDialogTitle class="text-primary text-center">
          System Under Development
        </AlertDialogTitle>

        <AlertDialogDescription as-child>
          <TypographyMuted class="text-center">
            We're working hard to bring you a seamless permits management experience. Please check
            back soon.
          </TypographyMuted>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <!-- Last Update Badge -->
      <div class="flex justify-center my-3">
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 text-xs font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Last Updated: {{ lastUpdate }}
        </span>
      </div>

      <div class="border-t my-3" />

      <!-- Developer Invitation -->
      <div class="text-center space-y-3">
        <TypographyH4 class="text-primary">Join Our Development Team</TypographyH4>

        <TypographyMuted class="text-center">
          Are you a developer who wants to contribute to this project? We'd love to have you help
          build the Permits platform.
        </TypographyMuted>

        <div class="flex flex-col sm:flex-row gap-2 justify-center items-center pt-1">
          <a
            href="mailto:centmarde.campado@gmail.com?subject=Permits System Development Interest"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-primary hover:bg-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email Us
          </a>

          <a
            href="https://www.facebook.com/rageon121"
            target="_blank"
            class="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-primary hover:bg-accent transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Drop a Message
          </a>
        </div>
      </div>

      <div class="border-t my-3" />

      <AlertDialogFooter class="justify-center sm:justify-center mt-2">
        <AlertDialogAction class="btn-gradient-primary px-8" @click="handleClose"
          >Got it</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
