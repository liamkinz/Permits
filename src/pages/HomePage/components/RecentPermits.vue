<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'
import { useHomePage } from '../composables/useHomePage'
const { recentPermits } = useHomePage()
</script>

<template>
  <Card class="lg:col-span-2">
    <CardHeader class="pb-3">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle class="text-lg">Recent Permits</CardTitle>
          <CardDescription>Your latest permit applications and their status</CardDescription>
        </div>
        <Button variant="ghost" size="sm" class="gap-1 text-muted-foreground">
          View All
          <ArrowRight class="size-3.5" />
        </Button>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-y border-border bg-muted/50">
              <th class="text-left font-medium text-muted-foreground px-5 py-3">ID</th>
              <th class="text-left font-medium text-muted-foreground px-5 py-3">Type</th>
              <th class="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
              <th class="text-left font-medium text-muted-foreground px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="permit in recentPermits"
              :key="permit.id"
              class="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <td class="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                {{ permit.id }}
              </td>
              <td class="px-5 py-3.5 font-medium text-foreground">{{ permit.type }}</td>
              <td class="px-5 py-3.5">
                <span
                  :class="permit.statusColor"
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {{ permit.status }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-muted-foreground">{{ permit.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</template>
