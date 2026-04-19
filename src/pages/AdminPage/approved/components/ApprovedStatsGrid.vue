<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, TrendingUp, AlertCircle, Calendar } from 'lucide-vue-next'
import { useApprovedApplications, getDaysAgo } from '../composables/useApprovedApplications'

const { approvedStats } = useApprovedApplications()

const stats = [
  {
    title: 'Total Approved',
    value: approvedStats.value.totalApproved,
    icon: CheckCircle2,
    color: 'bg-green-500/10 text-green-600',
    iconColor: 'text-green-600',
  },
  {
    title: 'Approved This Month',
    value: approvedStats.value.approvedThisMonth,
    icon: TrendingUp,
    color: 'bg-blue-500/10 text-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Expiring Soon',
    value: approvedStats.value.expiringSoon,
    icon: AlertCircle,
    color: 'bg-yellow-500/10 text-yellow-600',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'Expired',
    value: approvedStats.value.expired,
    icon: Calendar,
    color: 'bg-red-500/10 text-red-600',
    iconColor: 'text-red-600',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card v-for="stat in stats" :key="stat.title" class="border-0 shadow-sm">
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
        <div class="text-2xl font-bold">{{ stat.value }}</div>
        <p class="text-xs text-muted-foreground mt-1">
          {{ stat.value === 1 ? 'permit' : 'permits' }}
        </p>
      </CardContent>
    </Card>
  </div>

  <!-- Average Processing Days Card -->
  <Card class="border-0 shadow-sm mt-4 lg:col-span-4">
    <CardHeader class="pb-2">
      <CardTitle class="text-sm font-medium">Average Processing Time</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex items-baseline gap-2">
        <div class="text-2xl font-bold">{{ approvedStats.averageProcessingDays }}</div>
        <div class="text-sm text-muted-foreground">days from submission to approval</div>
      </div>
    </CardContent>
  </Card>
</template>
