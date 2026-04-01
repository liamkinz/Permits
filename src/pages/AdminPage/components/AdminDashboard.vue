<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TypographyH1, TypographyH3 } from '@/components/ui/typography'
import { useAuthStore } from '@/stores/authStore'
import { useAdminDashboard } from '../composables/useAdminDashboard'

const authStore = useAuthStore()
const {
  recentApplications,
  dashboardStats,
  statusDistribution,
  approvalRate,
  avgProcessingTime,
  getStatusColor,
  formatStatus,
} = useAdminDashboard()

// Computed properties for display
const sortedApplications = computed(() => {
  return [...recentApplications.value]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 5)
})

const maxCount = computed(() => {
  return Math.max(...statusDistribution.value.map((s) => s.count), 1)
})

// Helper function to compute days ago from timestamp
const getDaysAgo = (timestamp: string): number => {
  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / (24 * 60 * 60 * 1000))
  return Math.max(days, 0)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <div
      class="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60"
    >
      <div class="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div class="flex flex-col gap-2 md:gap-4">
          <div class="flex flex-col gap-1">
            <TypographyH1 class="text-2xl md:text-3xl font-bold text-gradient-primary">
              Dashboard
            </TypographyH1>
            <p class="text-muted-foreground text-sm md:text-base">
              Welcome back,
              <span class="font-semibold text-foreground">{{
                authStore.user?.name || 'Admin'
              }}</span>
              👋
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <!-- Total Applications -->
        <Card
          class="overflow-hidden border border-border/50 hover:border-border/80 transition-colors"
        >
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-medium text-muted-foreground"
              >Total Applications</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="text-2xl sm:text-3xl font-bold text-foreground">
              {{ dashboardStats.totalApplications }}
            </div>
            <p class="text-xs text-muted-foreground">All submissions</p>
          </CardContent>
        </Card>

        <!-- Pending Review -->
        <Card
          class="overflow-hidden border border-yellow-200 dark:border-yellow-900/50 hover:border-yellow-300 dark:hover:border-yellow-800 transition-colors"
        >
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-medium text-yellow-700 dark:text-yellow-200"
              >Pending Review</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {{ dashboardStats.pendingReview }}
            </div>
            <p class="text-xs text-yellow-600/70 dark:text-yellow-400/70">
              Awaiting initial review
            </p>
          </CardContent>
        </Card>

        <!-- Under Review -->
        <Card
          class="overflow-hidden border border-blue-200 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
        >
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-medium text-blue-700 dark:text-blue-200"
              >Under Review</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {{ dashboardStats.underReview }}
            </div>
            <p class="text-xs text-blue-600/70 dark:text-blue-400/70">In evaluation</p>
          </CardContent>
        </Card>

        <!-- Deficiency Found -->
        <Card
          class="overflow-hidden border border-red-200 dark:border-red-900/50 hover:border-red-300 dark:hover:border-red-800 transition-colors"
        >
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-medium text-red-700 dark:text-red-200"
              >Deficiencies</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400">
              {{ dashboardStats.deficiencyFound }}
            </div>
            <p class="text-xs text-red-600/70 dark:text-red-400/70">Need resubmission</p>
          </CardContent>
        </Card>

        <!-- Approved -->
        <Card
          class="overflow-hidden border border-green-200 dark:border-green-900/50 hover:border-green-300 dark:hover:border-green-800 transition-colors"
        >
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-medium text-green-700 dark:text-green-200"
              >Approved</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
              {{ dashboardStats.approved }}
            </div>
            <p class="text-xs text-green-600/70 dark:text-green-400/70">Completed</p>
          </CardContent>
        </Card>
      </div>

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

      <!-- Quick Actions -->
      <Card class="border border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent class="pt-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" class="h-12 gap-2 justify-start">
              <span class="text-lg">📋</span>
              <span>Review Applications</span>
            </Button>
            <Button variant="outline" class="h-12 gap-2 justify-start">
              <span class="text-lg">👥</span>
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" class="h-12 gap-2 justify-start">
              <span class="text-lg">📊</span>
              <span>View Reports</span>
            </Button>
            <Button variant="outline" class="h-12 gap-2 justify-start">
              <span class="text-lg">⚙️</span>
              <span>Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

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
                    <p>📍 {{ app.location }}</p>
                    <p>👤 {{ app.applicantName }}</p>
                    <p v-if="app.remarks">💬 {{ app.remarks }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 self-start sm:self-center whitespace-nowrap">
                  <span class="text-xs text-muted-foreground"
                    >{{ getDaysAgo(app.updatedAt) }}d ago</span
                  >
                  <Button
                    variant="ghost"
                    size="sm"
                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
