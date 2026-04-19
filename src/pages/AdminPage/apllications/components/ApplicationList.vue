<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TypographySmall } from '@/components/ui/typography'
import {
  Pencil,
  Eye,
  User,
  MapPin,
  FileText,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import { useAdminPermits, getDaysAgo } from '../composables/useAdminApps'

const {
  filteredPermits,
  paginatedPermits,
  currentPage,
  totalPages,
  sortField,
  sortOrder,
  getStatusColor,
  formatStatus,
  formatSubmissionClass,
  formatPermitType,
  getPermitTypeColor,
  toggleSortOrder,
  goToPage,
  nextPage,
  prevPage,
} = useAdminPermits()
</script>

<template>
  <Card class="border border-border/50">
    <CardHeader class="border-b border-border/30">
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>Applications</CardTitle>
          <TypographySmall class="text-muted-foreground mt-1">
            Showing {{ paginatedPermits.length }} of {{ filteredPermits.length }} permits
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
            <option value="submittedAt">Submitted Date</option>
            <option value="projectDescription">Project Name</option>
            <option value="applicantName">Applicant</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-0">
      <div v-if="filteredPermits.length === 0" class="p-8 text-center">
        <p class="text-muted-foreground">No permits found matching your filters.</p>
      </div>

      <!-- Permits Grid for Mobile, Table for Desktop -->
      <div class="divide-y divide-border">
        <!-- Mobile View -->
        <div class="md:hidden space-y-3 p-4">
          <div
            v-for="permit in paginatedPermits"
            :key="permit.id"
            class="group p-4 rounded-lg border border-border/30 hover:border-border/60 hover:bg-muted/50 transition-all space-y-3"
          >
            <!-- Header with Status and Type -->
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-foreground truncate">
                  {{ permit.projectDescription }}
                </h3>
                <p class="text-xs text-muted-foreground">
                  {{ permit.id }}
                </p>
              </div>
              <div class="flex flex-col gap-1 items-end">
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
                    getStatusColor(permit.status),
                  ]"
                >
                  {{ formatStatus(permit.status) }}
                </span>
              </div>
            </div>

            <!-- Permit Type Badge -->
            <div>
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-md text-xs font-medium inline-block',
                  getPermitTypeColor(permit.submitType),
                ]"
              >
                {{ formatPermitType(permit.submitType) }}
              </span>
            </div>

            <!-- Details -->
            <div class="space-y-1.5 text-xs text-muted-foreground">
              <div class="flex items-center gap-1.5">
                <User class="w-3.5 h-3.5 shrink-0" />
                <span>{{ permit.applicantName }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <MapPin class="w-3.5 h-3.5 shrink-0" />
                <span>{{ permit.location }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <FileText class="w-3.5 h-3.5 shrink-0" />
                <span>{{ formatSubmissionClass(permit.submissionClass) }}</span>
              </div>
            </div>

            <!-- Footer with Date and Action -->
            <div class="flex items-center justify-between pt-2 border-t border-border/20">
              <span class="text-xs text-muted-foreground"
                >{{ getDaysAgo(permit.updatedAt) }}d ago</span
              >
              <Button
                size="sm"
                class="h-8 px-3 text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors gap-1.5"
              >
                <Eye class="w-3.5 h-3.5" />
                View
              </Button>
            </div>
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border/30 bg-muted/30">
                <th class="px-6 py-3 text-left font-semibold text-foreground">Permit ID</th>
                <th class="px-6 py-3 text-left font-semibold text-foreground">Permit Type</th>
                <th class="px-6 py-3 text-left font-semibold text-foreground">Project</th>
                <th class="px-6 py-3 text-left font-semibold text-foreground">Applicant</th>
                <th class="px-6 py-3 text-left font-semibold text-foreground">Location</th>
                <th class="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                <th class="px-6 py-3 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="permit in paginatedPermits"
                :key="permit.id"
                class="border-b border-border/20 hover:bg-muted/50 transition-colors"
              >
                <td class="px-6 py-4">
                  <code class="text-xs bg-muted px-2 py-1 rounded text-foreground">
                    {{ permit.id }}
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
                      getPermitTypeColor(permit.submitType),
                    ]"
                  >
                    {{ formatPermitType(permit.submitType) }}
                  </span>
                </td>
                <td class="px-6 py-4 max-w-60">
                  <div>
                    <p class="font-medium text-foreground truncate">
                      {{ permit.projectDescription }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      {{ getDaysAgo(permit.updatedAt) }}d ago
                    </p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <p class="text-foreground">{{ permit.applicantName }}</p>
                </td>
                <td class="px-6 py-4 text-muted-foreground">
                  <p class="truncate max-w-40">{{ permit.location }}</p>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap',
                      getStatusColor(permit.status),
                    ]"
                  >
                    {{ formatStatus(permit.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      class="h-8 px-3 text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 hover:border-sky-300 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800 dark:hover:bg-sky-900/60 transition-colors gap-1.5"
                    >
                      <Pencil class="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      class="h-8 px-3 text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors gap-1.5"
                    >
                      <Eye class="w-3.5 h-3.5" />
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div
        v-if="filteredPermits.length > 0"
        class="border-t border-border/30 px-6 py-4 flex items-center justify-between bg-muted/30"
      >
        <div class="text-sm text-muted-foreground">
          Page {{ currentPage }} of {{ totalPages }} • Showing {{ paginatedPermits.length }} of
          {{ filteredPermits.length }} permits
        </div>
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
          <div class="flex items-center gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-2 py-1 text-sm rounded border',
                page === currentPage
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-border/60 text-foreground hover:bg-muted',
              ]"
            >
              {{ page }}
            </button>
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
