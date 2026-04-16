<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TypographySmall } from '@/components/ui/typography'
import {
  Download,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileText,
  Eye,
} from 'lucide-vue-next'
import { useDeniedApplications, getDaysAgo } from '../composables/useDeniedApplications'

const {
  filteredApplications,
  paginatedApplications,
  currentPage,
  totalPages,
  sortField,
  sortOrder,
  getRejectionReasonColor,
  formatSubmissionClass,
  formatRejectionReason,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage,
} = useDeniedApplications()
</script>

<template>
  <Card class="border border-border/50">
    <CardHeader class="border-b border-border/30">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle>Denied Applications</CardTitle>
          <TypographySmall class="text-muted-foreground mt-1">
            Showing {{ paginatedApplications.length }} of {{ filteredApplications.length }}
            applications
          </TypographySmall>
        </div>
        <div class="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" @click="toggleSortOrder" class="gap-1">
            <ArrowUp v-if="sortOrder === 'asc'" class="w-3.5 h-3.5" />
            <ArrowDown v-else class="w-3.5 h-3.5" />
            {{ sortOrder === 'asc' ? 'Oldest' : 'Newest' }}
          </Button>
          <select
            v-model="sortField"
            class="px-2 py-1 text-sm rounded border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="deniedDate">Denial Date</option>
            <option value="projectDescription">Project Name</option>
            <option value="applicantName">Applicant</option>
          </select>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-0">
      <div v-if="filteredApplications.length === 0" class="p-8 text-center">
        <AlertCircle class="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p class="text-muted-foreground font-medium">No denied applications found.</p>
        <p class="text-xs text-muted-foreground mt-1">
          All submissions appear to be in other categories
        </p>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden space-y-3 p-4">
        <div
          v-for="app in paginatedApplications"
          :key="app.id"
          class="group p-4 rounded-lg border border-red-500/20 hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all space-y-3"
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
                class="px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              >
                <AlertCircle class="w-3 h-3" />
                Denied
              </span>
            </div>
          </div>

          <!-- Rejection Reason Badge -->
          <div>
            <span
              :class="[
                'px-2.5 py-0.5 rounded-md text-xs font-medium inline-block',
                getRejectionReasonColor(app.rejectionReason),
              ]"
            >
              {{ formatRejectionReason(app.rejectionReason) }}
            </span>
          </div>

          <!-- Details -->
          <div class="space-y-1.5 text-xs text-muted-foreground">
            <div>
              <span class="font-medium text-foreground">Applicant:</span> {{ app.applicantName }}
            </div>
            <div><span class="font-medium text-foreground">Location:</span> {{ app.location }}</div>
            <div>
              <span class="font-medium text-foreground">Denied Date:</span>
              {{ new Date(app.deniedDate).toLocaleDateString() }}
            </div>
            <div
              v-if="app.rejectionReason"
              class="mt-2 p-2 bg-red-500/10 rounded border border-red-500/20"
            >
              <span class="font-medium text-red-600">Reason:</span>
              <p class="text-xs text-red-700 dark:text-red-400 mt-0.5">
                {{ app.rejectionDetails }}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-2 border-t border-border/20 gap-2">
            <span class="text-xs text-muted-foreground">{{ getDaysAgo(app.deniedDate) }}d ago</span>
            <div class="flex gap-2">
              <Button size="sm" variant="outline" class="h-8 px-2 text-xs font-medium">
                <Eye class="w-3.5 h-3.5" />
              </Button>
              <Button
                size="sm"
                class="h-8 px-3 text-xs font-medium bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-colors gap-1.5"
              >
                <Download class="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border/30 bg-red-50 dark:bg-red-950/20">
              <th class="px-4 py-3 text-left font-semibold text-foreground">Application</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Applicant</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Location</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Rejection Reason</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Denied Date</th>
              <th class="px-4 py-3 text-center font-semibold text-foreground">Status</th>
              <th class="px-4 py-3 text-center font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/30">
            <tr
              v-for="app in paginatedApplications"
              :key="app.id"
              class="hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors"
            >
              <!-- Application Info -->
              <td class="px-4 py-3">
                <div class="flex flex-col gap-0.5">
                  <p class="font-medium text-foreground">{{ app.projectDescription }}</p>
                  <p class="text-xs text-muted-foreground">{{ app.id }}</p>
                </div>
              </td>

              <!-- Applicant -->
              <td class="px-4 py-3">
                <p class="text-foreground">{{ app.applicantName }}</p>
              </td>

              <!-- Location -->
              <td class="px-4 py-3">
                <p class="text-muted-foreground">{{ app.location }}</p>
              </td>

              <!-- Rejection Reason -->
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap inline-block',
                    getRejectionReasonColor(app.rejectionReason),
                  ]"
                >
                  {{ formatRejectionReason(app.rejectionReason) }}
                </span>
              </td>

              <!-- Denied Date -->
              <td class="px-4 py-3">
                <div class="flex flex-col gap-0.5">
                  <p class="text-foreground">{{ new Date(app.deniedDate).toLocaleDateString() }}</p>
                  <p class="text-xs text-muted-foreground">{{ getDaysAgo(app.deniedDate) }}d ago</p>
                </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3">
                <div class="flex justify-center">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  >
                    <AlertCircle class="w-3 h-3" />
                    Denied
                  </span>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3">
                <div class="flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    class="h-8 px-2.5 text-xs font-medium bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-colors gap-1.5"
                  >
                    <Download class="w-3.5 h-3.5" />
                    Download
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between border-t border-border/30 px-4 py-4"
      v-if="totalPages > 1"
    >
      <TypographySmall class="text-muted-foreground">
        Page {{ currentPage }} of {{ totalPages }}
      </TypographySmall>

      <div class="flex gap-2">
        <Button variant="outline" size="sm" @click="prevPage" :disabled="currentPage === 1">
          <ChevronLeft class="w-4 h-4" />
        </Button>

        <div class="flex gap-1">
          <Button
            v-for="page in totalPages"
            :key="page"
            :variant="page === currentPage ? 'default' : 'outline'"
            size="sm"
            @click="goToPage(page)"
            class="w-8 h-8 p-0"
          >
            {{ page }}
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          <ChevronRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>
