<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdminDashboard } from '../composables/useAdminDashboard'

const { approvalRate, avgProcessingTime, statusDistribution, maxCount } = useAdminDashboard()
</script>

<template>
  <!-- Key Metrics & Charts -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Approval Rate -->
    <Card class="lg:col-span-1 border border-border/50">
      <CardHeader>
        <CardTitle class="text-base">Approval Rate</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col items-center justify-center space-y-4 py-8">
        <div class="relative flex items-center justify-center">
          <div class="text-4xl font-bold text-gradient-primary">{{ approvalRate }}%</div>
        </div>
        <div class="w-full bg-muted rounded-full h-2">
          <div
            class="bg-linear-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${approvalRate}%` }"
          />
        </div>
        <p class="text-sm text-muted-foreground">of applications approved</p>
      </CardContent>
    </Card>

    <!-- Avg Processing Time -->
    <Card class="lg:col-span-1 border border-border/50">
      <CardHeader>
        <CardTitle class="text-base">Avg Processing Time</CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col items-center justify-center space-y-4 py-8">
        <div class="text-4xl font-bold text-muted-foreground">{{ avgProcessingTime }}</div>
        <p class="text-sm text-muted-foreground">days</p>
        <div class="text-xs text-muted-foreground text-center">from submission to decision</div>
      </CardContent>
    </Card>

    <!-- Status Distribution Chart -->
    <Card class="lg:col-span-1 border border-border/50">
      <CardHeader>
        <CardTitle class="text-base">Status Distribution</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-for="dist in statusDistribution" :key="dist.status" class="space-y-1">
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">{{ dist.status }}</span>
            <span class="font-semibold text-foreground">{{ dist.count }}</span>
          </div>
          <div class="w-full bg-muted rounded-full h-2">
            <div
              :class="dist.color"
              class="h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(dist.count / maxCount) * 100}%` }"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
