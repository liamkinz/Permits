<script setup lang="ts">
import OuterLayout from '@/layout/OuterLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  FileText,
  Clock,
  CheckCircle,
  Bell,
  BarChart3,
  FolderOpen,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-vue-next'

const stats = [
  {
    label: 'Total Permits',
    value: '24',
    icon: FileText,
    trend: '+3 this month',
    color: 'text-blue-500',
  },
  {
    label: 'Pending Review',
    value: '7',
    icon: Clock,
    trend: '2 need attention',
    color: 'text-amber-500',
  },
  {
    label: 'Approved',
    value: '15',
    icon: CheckCircle,
    trend: '+5 this week',
    color: 'text-emerald-500',
  },
  {
    label: 'Expiring Soon',
    value: '2',
    icon: AlertCircle,
    trend: 'Within 30 days',
    color: 'text-red-500',
  },
]

const recentPermits = [
  {
    id: 'PRM-2026-001',
    type: 'Business License',
    status: 'Approved',
    date: 'Mar 8, 2026',
    statusColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  },
  {
    id: 'PRM-2026-002',
    type: 'Building Permit',
    status: 'Pending',
    date: 'Mar 7, 2026',
    statusColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  },
  {
    id: 'PRM-2026-003',
    type: 'Fire Safety',
    status: 'In Review',
    date: 'Mar 5, 2026',
    statusColor: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
  },
  {
    id: 'PRM-2026-004',
    type: 'Zoning Permit',
    status: 'Approved',
    date: 'Mar 3, 2026',
    statusColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  },
  {
    id: 'PRM-2026-005',
    type: 'Health Permit',
    status: 'Rejected',
    date: 'Mar 1, 2026',
    statusColor: 'bg-red-500/15 text-red-700 dark:text-red-400',
  },
]

const quickActions = [
  { label: 'New Permit Application', icon: Plus, description: 'Start a new permit request' },
  { label: 'Track Application', icon: TrendingUp, description: 'Check your application status' },
  { label: 'View All Permits', icon: FolderOpen, description: 'Browse your permit history' },
  { label: 'Notifications', icon: Bell, description: 'View alerts and updates' },
]
</script>

<template>
  <OuterLayout>
    <template #content>
      <!-- Hero Section -->
      <section
        class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 sm:py-16"
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]"
        />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Welcome back! 👋
              </h1>
              <p class="mt-2 text-lg text-muted-foreground max-w-2xl">
                Manage your permits, track applications, and stay on top of deadlines — all in one
                place.
              </p>
            </div>
            <Button size="lg" class="shrink-0 gap-2">
              <Plus class="size-4" />
              New Application
            </Button>
          </div>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card
            v-for="stat in stats"
            :key="stat.label"
            class="relative overflow-hidden group hover:shadow-md transition-shadow duration-200"
          >
            <CardContent class="p-5">
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-muted-foreground">{{ stat.label }}</p>
                  <p class="text-3xl font-bold tracking-tight text-foreground">{{ stat.value }}</p>
                  <p class="text-xs text-muted-foreground">{{ stat.trend }}</p>
                </div>
                <div
                  class="rounded-xl bg-muted p-2.5 group-hover:bg-primary/10 transition-colors duration-200"
                >
                  <component :is="stat.icon" class="size-5" :class="stat.color" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- Main Content Grid -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Recent Permits Table -->
          <Card class="lg:col-span-2">
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-lg">Recent Permits</CardTitle>
                  <CardDescription
                    >Your latest permit applications and their status</CardDescription
                  >
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

          <!-- Quick Actions Sidebar -->
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
        </div>

        <!-- Activity Overview -->
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
      </section>
    </template>
  </OuterLayout>
</template>
