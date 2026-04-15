<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <Card>
    <CardHeader class="pb-3">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-lg">Activity Overview</CardTitle>
          <CardDescription>Your permit application activity this month</CardDescription>
        </div>
        <div
          class="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
        >
          <TrendingUp class="size-4" />
          +12% from last month
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <!-- Simple bar chart visualization -->
      <div class="flex items-end gap-2 h-40">
        <div
          v-for="(height, i) in [35, 55, 40, 70, 50, 85, 60, 45, 75, 90, 65, 80]"
          :key="i"
          class="flex-1 rounded-t-md bg-primary/20 hover:bg-primary/40 transition-colors duration-200 relative group/bar"
          :style="{ height: height + '%' }"
        >
          <div
            class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground opacity-0 group-hover/bar:opacity-100 transition-opacity"
          >
            {{ height }}%
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-3 text-xs text-muted-foreground">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </CardContent>
  </Card>
</template>
