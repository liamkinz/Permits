<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TypographyH3 } from '@/components/ui/typography'
import { useAdminDashboard } from '../composables/useAdminDashboard'
import { MapPin, User, MessageSquare, Eye } from 'lucide-vue-next'

const { sortedApplications, getDaysAgo, getStatusColor, formatStatus } = useAdminDashboard()
</script>

<template>
  <!-- Recent Applications -->
  <Card class="border border-border/50">
    <CardHeader class="pb-4">
      <div class="flex items-center justify-between">
        <CardTitle>Recent Applications</CardTitle>
        <Button variant="ghost" size="sm">View All →</Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="space-y-3">
        <div v-if="sortedApplications.length === 0" class="py-8 text-center">
          <p class="text-sm text-muted-foreground">No applications yet</p>
        </div>
        <div
          v-for="app in sortedApplications"
          :key="app.id"
          class="group p-4 rounded-lg border border-border/30 hover:border-border/60 hover:bg-muted/50 transition-all"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div class="flex-1 space-y-2 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <TypographyH3 class="text-sm font-semibold text-foreground truncate">
                  {{ app.projectDescription }}
                </TypographyH3>
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
                    getStatusColor(app.status),
                  ]"
                >
                  {{ formatStatus(app.status) }}
                </span>
              </div>
              <div class="flex flex-col gap-1 text-xs text-muted-foreground">
                <div class="flex items-center gap-2">
                  <MapPin class="w-3.5 h-3.5 shrink-0" />
                  <p>{{ app.location }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <User class="w-3.5 h-3.5 shrink-0" />
                  <p>{{ app.applicantName }}</p>
                </div>
                <div v-if="app.remarks" class="flex items-center gap-2">
                  <MessageSquare class="w-3.5 h-3.5 shrink-0" />
                  <p>{{ app.remarks }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 self-start sm:self-center whitespace-nowrap">
              <span class="text-xs text-muted-foreground"
                >{{ getDaysAgo(app.updatedAt) }}d ago</span
              >
              <Button
                variant="ghost"
                size="sm"
                class="opacity-0 group-hover:opacity-100 transition-opacity gap-1"
              >
                <Eye class="w-3.5 h-3.5" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
