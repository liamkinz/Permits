<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useHomePage } from '../composables/useHomePage'

const { quickActions } = useHomePage()
</script>

<template>
  <Card>
    <CardHeader class="pb-3">
      <CardTitle class="text-lg">Quick Actions</CardTitle>
      <CardDescription>Common tasks at your fingertips</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-2">
      <button
        v-for="action in quickActions"
        :key="action.label"
        class="flex items-center gap-3.5 rounded-xl p-3 text-left hover:bg-muted transition-colors duration-150 group"
      >
        <div
          class="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors duration-150"
        >
          <component :is="action.icon" class="size-4 text-primary" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium text-foreground truncate">{{ action.label }}</p>
          <p class="text-xs text-muted-foreground truncate">{{ action.description }}</p>
        </div>
      </button>
    </CardContent>
  </Card>
</template>
