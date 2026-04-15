<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useHomePage } from '../composables/useHomePage'

const { stats } = useHomePage()
</script>

<template>
  <!-- Modern Stats Grid using Card Components -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Permits -->
      <Card
        class="group relative overflow-hidden border-blue-200/50 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 dark:from-blue-950/20 via-background to-background hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg p-6 !gap-0"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-100/20 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <CardHeader class="relative px-0 pt-0 pb-0">
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-blue-700 dark:text-blue-200">
              {{ stats[0]?.label }}
            </CardTitle>
            <div class="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-950/50">
              <component :is="stats[0]?.icon" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
          <div class="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
            {{ stats[0]?.value }}
          </div>
          <p class="text-xs text-blue-600/70 dark:text-blue-400/70">{{ stats[0]?.trend }}</p>
        </CardContent>
      </Card>

      <!-- Pending Review -->
      <Card
        class="group relative overflow-hidden border-amber-200/50 dark:border-amber-900/30 bg-gradient-to-br from-amber-50/50 dark:from-amber-950/20 via-background to-background hover:border-amber-300 dark:hover:border-amber-700 transition-all hover:shadow-lg p-6 !gap-0"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-amber-100/20 dark:from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <CardHeader class="relative px-0 pt-0 pb-0">
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-amber-700 dark:text-amber-200">
              {{ stats[1]?.label }}
            </CardTitle>
            <div class="p-2 rounded-lg bg-amber-100/50 dark:bg-amber-950/50">
              <component :is="stats[1]?.icon" class="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
          <div class="text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400">
            {{ stats[1]?.value }}
          </div>
          <p class="text-xs text-amber-600/70 dark:text-amber-400/70">{{ stats[1]?.trend }}</p>
        </CardContent>
      </Card>

      <!-- Approved -->
      <Card
        class="group relative overflow-hidden border-emerald-200/50 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 dark:from-emerald-950/20 via-background to-background hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-lg p-6 !gap-0"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-emerald-100/20 dark:from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <CardHeader class="relative px-0 pt-0 pb-0">
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-emerald-700 dark:text-emerald-200">
              {{ stats[2]?.label }}
            </CardTitle>
            <div class="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-950/50">
              <component
                :is="stats[2]?.icon"
                class="w-4 h-4 text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
          <div class="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ stats[2]?.value }}
          </div>
          <p class="text-xs text-emerald-600/70 dark:text-emerald-400/70">{{ stats[2]?.trend }}</p>
        </CardContent>
      </Card>

      <!-- Expiring Soon -->
      <Card
        class="group relative overflow-hidden border-red-200/50 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 dark:from-red-950/20 via-background to-background hover:border-red-300 dark:hover:border-red-700 transition-all hover:shadow-lg p-6 !gap-0"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-red-100/20 dark:from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <CardHeader class="relative px-0 pt-0 pb-0">
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm font-medium text-red-700 dark:text-red-200">
              {{ stats[3]?.label }}
            </CardTitle>
            <div class="p-2 rounded-lg bg-red-100/50 dark:bg-red-950/50">
              <component :is="stats[3]?.icon" class="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
          <div class="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400">
            {{ stats[3]?.value }}
          </div>
          <p class="text-xs text-red-600/70 dark:text-red-400/70">{{ stats[3]?.trend }}</p>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
