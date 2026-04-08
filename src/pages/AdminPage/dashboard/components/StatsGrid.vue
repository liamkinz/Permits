<script setup lang="ts">
import { FileText, Clock, CheckCircle2, AlertCircle, Zap } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAdminDashboard } from '../composables/useAdminDashboard'

const { dashboardStats } = useAdminDashboard()
</script>

<template>
  <!-- Modern Stats Grid using Card Components -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    <!-- Total Applications -->
    <Card
      class="group relative overflow-hidden border-border/50 bg-gradient-to-br from-primary/5 via-background to-background hover:border-primary/30 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-muted-foreground"
            >Total Applications</CardTitle
          >
          <div class="p-2 rounded-lg bg-primary/10">
            <FileText class="w-4 h-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-foreground">
          {{ dashboardStats.totalApplications }}
        </div>
        <p class="text-xs text-muted-foreground">All submissions</p>
      </CardContent>
    </Card>

    <!-- Pending Review -->
    <Card
      class="group relative overflow-hidden border-yellow-200/50 dark:border-yellow-900/30 bg-gradient-to-br from-yellow-50/50 dark:from-yellow-950/20 via-background to-background hover:border-yellow-300 dark:hover:border-yellow-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-yellow-100/20 dark:from-yellow-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-yellow-700 dark:text-yellow-200"
            >Pending Review</CardTitle
          >
          <div class="p-2 rounded-lg bg-yellow-100/50 dark:bg-yellow-950/50">
            <Clock class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
          {{ dashboardStats.pendingReview }}
        </div>
        <p class="text-xs text-yellow-600/70 dark:text-yellow-400/70">Awaiting initial review</p>
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
          <CardTitle class="text-sm font-medium text-blue-700 dark:text-blue-200"
            >Under Review</CardTitle
          >
          <div class="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-950/50">
            <Zap class="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
          {{ dashboardStats.underReview }}
        </div>
        <p class="text-xs text-blue-600/70 dark:text-blue-400/70">In evaluation</p>
      </CardContent>
    </Card>

    <!-- Deficiency Found -->
    <Card
      class="group relative overflow-hidden border-red-200/50 dark:border-red-900/30 bg-gradient-to-br from-red-50/50 dark:from-red-950/20 via-background to-background hover:border-red-300 dark:hover:border-red-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-red-100/20 dark:from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-red-700 dark:text-red-200"
            >Deficiencies</CardTitle
          >
          <div class="p-2 rounded-lg bg-red-100/50 dark:bg-red-950/50">
            <AlertCircle class="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400">
          {{ dashboardStats.deficiencyFound }}
        </div>
        <p class="text-xs text-red-600/70 dark:text-red-400/70">Need resubmission</p>
      </CardContent>
    </Card>

    <!-- Approved -->
    <Card
      class="group relative overflow-hidden border-green-200/50 dark:border-green-900/30 bg-gradient-to-br from-green-50/50 dark:from-green-950/20 via-background to-background hover:border-green-300 dark:hover:border-green-700 transition-all hover:shadow-lg p-6 !gap-0"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-green-100/20 dark:from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader class="relative px-0 pt-0 pb-0">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-green-700 dark:text-green-200"
            >Approved</CardTitle
          >
          <div class="p-2 rounded-lg bg-green-100/50 dark:bg-green-950/50">
            <CheckCircle2 class="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </CardHeader>
      <CardContent class="relative space-y-1 px-0 pt-4 pb-0">
        <div class="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
          {{ dashboardStats.approved }}
        </div>
        <p class="text-xs text-green-600/70 dark:text-green-400/70">Completed</p>
      </CardContent>
    </Card>
  </div>
</template>
