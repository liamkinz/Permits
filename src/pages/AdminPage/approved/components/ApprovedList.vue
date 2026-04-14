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
  CheckCircle2,
  AlertCircle,
  Calendar,
} from 'lucide-vue-next'
import {
  useApprovedApplications,
  getDaysAgo,
  getDaysUntil,
} from '../composables/useApprovedApplications'

const {
  filteredApplications,
  paginatedApplications,
  currentPage,
  totalPages,
  sortField,
  sortOrder,
  getPermitTypeColor,
  formatSubmissionClass,
  formatPermitType,
  getExpiryStatus,
  getExpiryColor,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage,
} = useApprovedApplications()

function getExpiryIcon(status: string) {
  switch (status) {
    case 'expired':
      return AlertCircle
    case 'expiring_soon':
      return Calendar
    default:
      return CheckCircle2
  }
}

function getExpiryLabel(status: string) {
  switch (status) {
    case 'expired':
      return 'Expired'
    case 'expiring_soon':
      return 'Expiring Soon'
    default:
      return 'Valid'
  }
}
</script>

<template>
  <Card class="border border-border/50">
    <CardHeader class="border-b border-border/30">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>Approved Applications</CardTitle>
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
            <option value="approvedDate">Approval Date</option>
            <option value="projectDescription">Project Name</option>
            <option value="applicantName">Applicant</option>
          </select>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-0">
      <div v-if="filteredApplications.length === 0" class="p-8 text-center">
        <p class="text-muted-foreground">No approved applications found.</p>
      </div>

      <!-- Mobile View -->
      <div class="md:hidden space-y-3 p-4">
        <div
          v-for="app in paginatedApplications"
          :key="app.id"
          class="group p-4 rounded-lg border border-border/30 hover:border-border/60 hover:bg-muted/50 transition-all space-y-3"
        >
          <!-- Header with Expiry Status -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-foreground truncate">
                {{ app.projectDescription }}
              </h3>
              <p class="text-xs text-muted-foreground">{{ app.id }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ app.approvalNumber }}</p>
            </div>
            <div class="flex flex-col gap-1 items-end">
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap flex items-center gap-1',
                  getExpiryStatus(app.expiresOn) === 'expired'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                    : getExpiryStatus(app.expiresOn) === 'expiring_soon'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                ]"
              >
                <component :is="getExpiryIcon(getExpiryStatus(app.expiresOn))" class="w-3 h-3" />
                {{ getExpiryLabel(getExpiryStatus(app.expiresOn)) }}
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
            <div>
              <span class="font-medium text-foreground">Applicant:</span> {{ app.applicantName }}
            </div>
            <div><span class="font-medium text-foreground">Location:</span> {{ app.location }}</div>
            <div>
              <span class="font-medium text-foreground">Approved Date:</span>
              {{ new Date(app.approvedDate).toLocaleDateString() }}
            </div>
            <div>
              <span class="font-medium text-foreground">Expires On:</span>
              {{ new Date(app.expiresOn).toLocaleDateString() }}
              ({{ getDaysUntil(app.expiresOn) }}d)
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-2 border-t border-border/20">
            <span class="text-xs text-muted-foreground"
              >{{ getDaysAgo(app.approvedDate) }}d ago</span
            >
            <Button
              size="sm"
              class="h-8 px-3 text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors gap-1.5"
            >
              <Download class="w-3.5 h-3.5" />
              Download
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
              <th class="px-4 py-3 text-left font-semibold text-foreground">Approval #</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Approved Date</th>
              <th class="px-4 py-3 text-left font-semibold text-foreground">Expires On</th>
              <th class="px-4 py-3 text-center font-semibold text-foreground">Status</th>
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

              <!-- Approval Number -->
              <td class="px-4 py-3 text-muted-foreground font-mono text-xs">
                {{ app.approvalNumber }}
              </td>

              <!-- Approved Date -->
              <td class="px-4 py-3 text-muted-foreground text-sm">
                {{ new Date(app.approvedDate).toLocaleDateString() }}
              </td>

              <!-- Expires On -->
              <td class="px-4 py-3 text-muted-foreground text-sm">
                <div class="flex flex-col gap-0.5">
                  <span>{{ new Date(app.expiresOn).toLocaleDateString() }}</span>
                  <span class="text-xs text-muted-foreground"
                    >{{ getDaysUntil(app.expiresOn) }}d</span
                  >
                </div>
              </td>

              <!-- Expiry Status -->
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <div :class="['w-2 h-2 rounded-full', getExpiryColor(app.expiresOn)]"></div>
                  <span
                    :class="[
                      'text-xs font-medium px-2 py-1 rounded',
                      getExpiryStatus(app.expiresOn) === 'expired'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        : getExpiryStatus(app.expiresOn) === 'expiring_soon'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                    ]"
                  >
                    {{ getExpiryLabel(getExpiryStatus(app.expiresOn)) }}
                  </span>
                </div>
              </td>

              <!-- Action -->
              <td class="px-4 py-3 text-center">
                <Button size="sm" variant="ghost" class="h-8 px-2 gap-1">
                  <Download class="w-3.5 h-3.5" />
                  <span class="hidden sm:inline">Download</span>
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
