<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, AlertCircle, CreditCard, Activity } from 'lucide-vue-next'
import { useInProgressApplications } from '../composables/useInProgressApplications'

const { progressStats } = useInProgressApplications()

const stats = [
  {
    title: 'Total In-Progress',
    value: progressStats.value.totalInProgress,
    icon: Activity,
    color: 'bg-blue-500/10 text-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Under Review',
    value: progressStats.value.underReview,
    icon: Clock,
    color: 'bg-orange-500/10 text-orange-600',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Deficiency Found',
    value: progressStats.value.deficiencyFound,
    icon: AlertCircle,
    color: 'bg-red-500/10 text-red-600',
    iconColor: 'text-red-600',
  },
  {
    title: 'Awaiting Payment',
    value: progressStats.value.forPayment,
    icon: CreditCard,
    color: 'bg-green-500/10 text-green-600',
    iconColor: 'text-green-600',
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
          {{ stat.value === 1 ? 'application' : 'applications' }}
        </p>
      </CardContent>
    </Card>
  </div>

  <!-- Average Days Card -->
  <Card class="border-0 shadow-sm mt-4 lg:col-span-4">
    <CardHeader class="pb-2">
      <CardTitle class="text-sm font-medium">Average Duration</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex items-baseline gap-2">
        <div class="text-2xl font-bold">{{ progressStats.averageDaysInProgress }}</div>
        <div class="text-sm text-muted-foreground">days in progress</div>
      </div>
    </CardContent>
  </Card>
</template>
