<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TypographySmall } from '@/components/ui/typography'
import {
  Eye,
  User,
  MapPin,
  FileText,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  CreditCard,
  TrendingUp,
} from 'lucide-vue-next'
import { useInProgressApplications, getDaysAgo } from '../composables/useInProgressApplications'

const {
  filteredApplications,
  paginatedApplications,
  currentPage,
  totalPages,
  sortField,
  sortOrder,
  getStatusColor,
  getPermitTypeColor,
  formatSubmissionClass,
  formatPermitType,
  getProgressColor,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage,
} = useInProgressApplications()

function getStatusIcon(status: string) {
  const iconClass = 'w-3.5 h-3.5'
  switch (status) {
    case 'under_review':
      return Clock
    case 'deficiency_found':
      return AlertCircle
    case 'for_payment':
      return CreditCard
    default:
      return TrendingUp
  }
}

function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    under_review: 'Under Review',
    deficiency_found: 'Deficiency Found',
    for_payment: 'Awaiting Payment',
  }
  return map[status] || status
}
</script>

<template>
  <Card class="border border-border/50">
    <CardHeader class="border-b border-border/30">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>In-Progress Applications</CardTitle>
          <TypographySmall class="text-muted-foreground mt-1">
            Showing {{ paginatedApplications.length }} of {{ filteredApplications.length }}
            applications
          </TypographySmall>
        </div>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" @click="toggleSortOrder" class="gap-1">
            <ArrowUp v-if="sortOrder === 'asc'" class="w-3.5 h-3.5" />
            <ArrowDown v-else class="w-3.5 h-3.5" />
            {{ sortOrder === 'asc' ? 'Oldest' : 'Newest' }}
          </Button>
          <select
            v-model="sortField"
            class="px-2 py-1 text-sm rounded border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="submittedAt">Submission Date</option>
            <option value="projectDescription">Project Name</option>
            <option value="applicantName">Applicant</option>
          </select>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-0">
      <div v-if="filteredApplications.length === 0" class="p-8 text-center">
        <p class="text-muted-foreground">No in-progress applications found.</p>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden space-y-3 p-4">
        <div
          v-for="app in paginatedApplications"
          :key="app.id"
          class="group p-4 rounded-lg border border-border/30 hover:border-border/60 hover:bg-muted/50 transition-all space-y-3"
        >
          <!-- Header with Status -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-foreground truncate">
                {{ app.projectDescription }}
              </h3>
              <p class="text-xs text-muted-foreground">{{ app.id }}</p>
            </div>
            <div class="flex flex-col gap-1 items-end">
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
                  getStatusColor(app.status),
                ]"
              >
                {{ getStatusLabel(app.status) }}
              </span>
            </div>
          </div>

          <!-- Permit Type Badge -->
          <div>
            <span
              :class="[
                'px-2.5 py-0.5 rounded-md text-xs font-medium inline-block',
                getPermitTypeColor(app.submitType),
              ]"
            >
              {{ formatPermitType(app.submitType) }}
            </span>
          </div>

          <!-- Details -->
          <div class="space-y-1.5 text-xs text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <User class="w-3.5 h-3.5 shrink-0" />
              <span>{{ app.applicantName }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 shrink-0" />
              <span>{{ app.location }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <FileText class="w-3.5 h-3.5 shrink-0" />
              <span>{{ formatSubmissionClass(app.submissionClass) }}</span>
            </div>
            <div class="flex items-center gap-1.5 pt-1">
              <Clock class="w-3.5 h-3.5 shrink-0" />
              <span>{{ app.daysInProgress }} days in progress</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="pt-2 border-t border-border/20">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-foreground">Progress</span>
              <span class="text-xs text-muted-foreground">{{ app.progressPercentage }}%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2">
              <div
                :class="[
                  'h-2 rounded-full transition-all',
                  getProgressColor(app.progressPercentage),
                ]"
                :style="{ width: `${app.progressPercentage}%` }"
              ></div>
            </div>
            <p class="text-xs text-muted-foreground mt-2">Next: {{ app.nextStep }}</p>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-2 border-t border-border/20">
            <span class="text-xs text-muted-foreground">{{ getDaysAgo(app.updatedAt) }}d ago</span>
            <Button
              size="sm"
              class="h-8 px-3 text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors gap-1.5"
            >
              <Eye class="w-3.5 h-3.5" />
              View Details
            </Button>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border/30 bg-muted/30">
              <th class="px-4 py-3 text-left font-semibold text-foreground">Application</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Applicant</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Type</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              <th class="px-4 py-3 text-center font-semibold text-foreground">Progress</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Next Step</th>
              <th class="px-4 py-3 text-center font-semibold text-foreground">Days in Progress</th>
              <th class="px-4 py-3 text-center font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            <tr
              v-for="app in paginatedApplications"
              :key="app.id"
              class="hover:bg-muted/30 transition-colors"
            >
              <!-- Application Info -->
              <td class="px-4 py-3">
                <div class="flex flex-col gap-0.5">
                  <p class="font-medium text-foreground">{{ app.projectDescription }}</p>
                  <p class="text-xs text-muted-foreground">{{ app.id }}</p>
                </div>
              </td>

              <!-- Applicant -->
              <td class="px-4 py-3 text-muted-foreground">{{ app.applicantName }}</td>

              <!-- Type -->
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-md text-xs font-medium',
                    getPermitTypeColor(app.submitType),
                  ]"
                >
                  {{ formatPermitType(app.submitType) }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-1.5">
                  <component :is="getStatusIcon(app.status)" class="w-3.5 h-3.5" />
                  <span
                    :class="[
                      'px-2.5 py-0.5 rounded-md text-xs font-medium',
                      getStatusColor(app.status),
                    ]"
                  >
                    {{ getStatusLabel(app.status) }}
                  </span>
                </div>
              </td>

              <!-- Progress -->
              <td class="px-4 py-3">
                <div class="flex items-center justify-center gap-2">
                  <div class="w-16 bg-muted rounded-full h-2">
                    <div
                      :class="[
                        'h-2 rounded-full transition-all',
                        getProgressColor(app.progressPercentage),
                      ]"
                      :style="{ width: `${app.progressPercentage}%` }"
                    ></div>
                  </div>
                  <span class="text-xs font-medium text-foreground w-8 text-right">
                    {{ app.progressPercentage }}%
                  </span>
                </div>
              </td>

              <!-- Next Step -->
              <td class="px-4 py-3 text-sm text-muted-foreground max-w-xs">
                {{ app.nextStep }}
              </td>

              <!-- Days in Progress -->
              <td class="px-4 py-3 text-center">
                <span class="px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground">
                  {{ app.daysInProgress }}d
                </span>
              </td>

              <!-- Action -->
              <td class="px-4 py-3 text-center">
                <Button size="sm" variant="ghost" class="h-8 px-2 gap-1">
                  <Eye class="w-3.5 h-3.5" />
                  <span class="hidden sm:inline">View</span>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="border-t border-border/30 px-4 py-4 flex items-center justify-between"
      >
        <TypographySmall class="text-muted-foreground">
          Page {{ currentPage }} of {{ totalPages }}
        </TypographySmall>
        <div class="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            @click="prevPage"
            :disabled="currentPage === 1"
            class="gap-1"
          >
            <ChevronLeft class="w-4 h-4" />
            Previous
          </Button>
          <div class="flex gap-1">
            <Button
              v-for="page in Math.min(3, totalPages)"
              :key="page"
              :variant="currentPage === page ? 'default' : 'outline'"
              size="sm"
              @click="goToPage(page)"
            >
              {{ page }}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="gap-1"
          >
            Next
            <ChevronRight class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
