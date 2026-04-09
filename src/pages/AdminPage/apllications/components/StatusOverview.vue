<script lang="ts" setup>
import { Clock, Search, AlertCircle, CreditCard, CheckCircle2 } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAdminPermits } from '../composables/useAdminApps'

const { statusStats, formatStatus } = useAdminPermits()
</script>

<template>
  <!-- Modern Status Overview Grid using Card Components -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    <!-- Pending -->
    <Card
      class="group relative overflow-hidden border-amber-200/50 dark:border-amber-900/30 bg-gradient-to-br from-amber-50/50 dark:from-amber-950/20 via-background to-background hover:border-amber-300 dark:hover:border-amber-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-amber-100/20 dark:from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-amber-700 dark:text-amber-200">
            {{ formatStatus('pending') }}
          </CardTitle>
          <div class="p-2 rounded-lg bg-amber-100/50 dark:bg-amber-950/50">
            <Clock class="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400">
          {{ statusStats.pending }}
        </div>
        <p class="text-xs text-amber-600/70 dark:text-amber-400/70">Pending approval</p>
      </CardContent>
    </Card>

    <!-- Under Review -->
    <Card
      class="group relative overflow-hidden border-blue-200/50 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 dark:from-blue-950/20 via-background to-background hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-100/20 dark:from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-blue-700 dark:text-blue-200">
            {{ formatStatus('under_review') }}
          </CardTitle>
          <div class="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-950/50">
            <Search class="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
          {{ statusStats.under_review }}
        </div>
        <p class="text-xs text-blue-600/70 dark:text-blue-400/70">In evaluation</p>
      </CardContent>
    </Card>

    <!-- Deficiency Found -->
    <Card
      class="group relative overflow-hidden border-rose-200/50 dark:border-rose-900/30 bg-gradient-to-br from-rose-50/50 dark:from-rose-950/20 via-background to-background hover:border-rose-300 dark:hover:border-rose-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-rose-100/20 dark:from-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-rose-700 dark:text-rose-200">
            {{ formatStatus('deficiency_found') }}
          </CardTitle>
          <div class="p-2 rounded-lg bg-rose-100/50 dark:bg-rose-950/50">
            <AlertCircle class="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-rose-600 dark:text-rose-400">
          {{ statusStats.deficiency_found }}
        </div>
        <p class="text-xs text-rose-600/70 dark:text-rose-400/70">Need resubmission</p>
      </CardContent>
    </Card>

    <!-- For Payment -->
    <Card
      class="group relative overflow-hidden border-violet-200/50 dark:border-violet-900/30 bg-gradient-to-br from-violet-50/50 dark:from-violet-950/20 via-background to-background hover:border-violet-300 dark:hover:border-violet-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-violet-100/20 dark:from-violet-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-violet-700 dark:text-violet-200">
            {{ formatStatus('for_payment') }}
          </CardTitle>
          <div class="p-2 rounded-lg bg-violet-100/50 dark:bg-violet-950/50">
            <CreditCard class="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-violet-600 dark:text-violet-400">
          {{ statusStats.for_payment }}
        </div>
        <p class="text-xs text-violet-600/70 dark:text-violet-400/70">Awaiting payment</p>
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
            {{ formatStatus('approved') }}
          </CardTitle>
          <div class="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-950/50">
            <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
          {{ statusStats.approved }}
        </div>
        <p class="text-xs text-emerald-600/70 dark:text-emerald-400/70">Completed</p>
      </CardContent>
    </Card>
  </div>
</template>
