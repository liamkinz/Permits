<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle, TrendingDown, Calendar, AlertTriangle } from 'lucide-vue-next'
import { useDeniedApplications } from '../composables/useDeniedApplications'

const { deniedStats } = useDeniedApplications()

const stats = computed(() => [
  {
    title: 'Total Denied',
    value: deniedStats.value.totalDenied,
    icon: XCircle,
    color: 'bg-red-500/10 text-red-600',
    iconColor: 'text-red-600',
  },
  {
    title: 'Denied This Month',
    value: deniedStats.value.deniedThisMonth,
    icon: TrendingDown,
    color: 'bg-orange-500/10 text-orange-600',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Pending Appeal',
    value: deniedStats.value.pendingAppeal,
    icon: AlertTriangle,
    color: 'bg-yellow-500/10 text-yellow-600',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'Appeal Approved',
    value: deniedStats.value.appealApproved,
    icon: Calendar,
    color: 'bg-blue-500/10 text-blue-600',
    iconColor: 'text-blue-600',
  },
])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card
      v-for="stat in stats"
      :key="stat.title"
      class="border-0 shadow-sm hover:shadow-md transition-shadow"
    >
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm font-medium text-muted-foreground">
            {{ stat.title }}
          </CardTitle>
          <div :class="['p-2 rounded-lg', stat.color]">
            <component :is="stat.icon" class="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-red-600">{{ stat.value }}</div>
        <p class="text-xs text-muted-foreground mt-1">
          {{ stat.value === 1 ? 'application' : 'applications' }}
        </p>
      </CardContent>
    </Card>
  </div>

  <!-- Key Rejection Reasons Card -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
    <Card class="border-0 shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-sm font-medium">Top Rejection Reasons</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-2 text-sm">
          <div class="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span class="text-muted-foreground">Incomplete Documentation</span>
            <span class="font-semibold text-foreground">{{
              deniedStats.rejectionReasons?.incomplete || 0
            }}</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span class="text-muted-foreground">Non-Compliance Issues</span>
            <span class="font-semibold text-foreground">{{
              deniedStats.rejectionReasons?.noncompliance || 0
            }}</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span class="text-muted-foreground">Zoning Violations</span>
            <span class="font-semibold text-foreground">{{
              deniedStats.rejectionReasons?.zoning || 0
            }}</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-muted/50">
            <span class="text-muted-foreground">Other Reasons</span>
            <span class="font-semibold text-foreground">{{
              deniedStats.rejectionReasons?.other || 0
            }}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Average Processing Days Card -->
    <Card class="border-0 shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-sm font-medium">Processing Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div class="p-3 rounded-lg bg-muted/30 border border-border/30">
            <div class="text-xs text-muted-foreground mb-1">Average Processing Time</div>
            <div class="flex items-baseline gap-2">
              <div class="text-2xl font-bold">{{ deniedStats.averageProcessingDays }}</div>
              <div class="text-xs text-muted-foreground">days until denial</div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div class="text-xs text-red-600 font-medium mb-1">Denial Rate</div>
            <div class="flex items-baseline gap-2">
              <div class="text-2xl font-bold text-red-600">{{ deniedStats.denialRate }}%</div>
              <div class="text-xs text-red-600">of all submissions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
