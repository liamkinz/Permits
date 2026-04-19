<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, Clock, AlertTriangle, AlertCircle } from 'lucide-vue-next'
import { TypographyH3 } from '@/components/ui/typography'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useAdminDashboard } from '../composables/useAdminDashboard'

// interface Application {
//   id: string
//   applicantName: string
//   permitType: string
//   submittedDate: string
//   dueDate: string
//   daysRemaining: number
// }

// const { applications } = useAdminDashboard()
const { applications, getStatusColorOngoing, getStatusLabel, getDaysElapsed, getStatusIcon } =
  useAdminDashboard()

// Determine status color based on days remaining
// const getStatusColor = (daysRemaining: number) => {
//   if (daysRemaining <= 2) {
//     return 'bg-destructive/20 text-destructive hover:bg-destructive/30'
//   } else if (daysRemaining <= 5) {
//     return 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
//   } else if (daysRemaining === 6) {
//     return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
//   } else {
//     return 'bg-destructive/20 text-destructive hover:bg-destructive/30'
//   }
// }

// const getStatusLabel = (daysRemaining: number) => {
//   if (daysRemaining <= 2) {
//     return '⚠️ Critical'
//   } else if (daysRemaining <= 5) {
//     return '✓ Safe'
//   } else if (daysRemaining === 6) {
//     return '⏰ Warning'
//   } else {
//     return '🔴 Overdue'
//   }
// }
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-2">
      <TypographyH3 class="text-xl font-bold text-foreground"> Ongoing Evaluations </TypographyH3>
      <p class="text-sm text-muted-foreground">
        Applications currently under evaluation with due date tracking
      </p>
    </div>

    <!-- Table -->
    <div class="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow class="bg-muted/50 hover:bg-muted/50">
            <TableHead class="w-20">App ID</TableHead>
            <TableHead class="w-32">Applicant Name</TableHead>
            <TableHead class="w-28">Permit Type</TableHead>
            <TableHead class="w-24">Submitted</TableHead>
            <TableHead class="w-24 text-center">Days Elapsed</TableHead>
            <TableHead class="w-28 text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="app in applications" :key="app.id" class="hover:bg-muted/50">
            <TableCell class="font-mono text-xs font-semibold text-primary">
              {{ app.id }}
            </TableCell>
            <TableCell class="font-medium">{{ app.applicantName }}</TableCell>
            <TableCell class="text-sm">{{ app.permitType }}</TableCell>
            <TableCell class="text-sm text-muted-foreground">
              {{ new Date(app.submittedDate).toLocaleDateString() }}
            </TableCell>
            <TableCell class="text-center font-semibold">
              {{ getDaysElapsed(app.submittedDate) }}
            </TableCell>
            <TableCell class="text-center">
              <Badge
                :class="getStatusColorOngoing(getDaysElapsed(app.submittedDate))"
                class="flex items-center mx-auto gap-1 justify-center"
              >
                <component :is="getStatusIcon(getDaysElapsed(app.submittedDate))" class="w-3 h-3" />
                {{ getStatusLabel(getDaysElapsed(app.submittedDate)) }}
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap gap-4 pt-4 text-xs">
      <div class="flex items-center gap-2">
        <CheckCircle class="w-4 h-4 text-green-500" />
        <span class="text-muted-foreground">Safe: 3-5 days elapsed</span>
      </div>
      <div class="flex items-center gap-2">
        <Clock class="w-4 h-4 text-yellow-500" />
        <span class="text-muted-foreground">Warning: 6 days elapsed</span>
      </div>
      <div class="flex items-center gap-2">
        <AlertCircle class="w-4 h-4 text-red-500" />
        <span class="text-muted-foreground">Overdue: 7+ days elapsed</span>
      </div>
      <div class="flex items-center gap-2">
        <AlertTriangle class="w-4 h-4 text-red-500" />
        <span class="text-muted-foreground">Critical: 10+ days elapsed</span>
      </div>
    </div>
  </div>
</template>
