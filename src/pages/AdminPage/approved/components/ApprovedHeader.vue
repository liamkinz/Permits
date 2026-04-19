<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography'
import { Search, X } from 'lucide-vue-next'
import { useApprovedApplications } from '../composables/useApprovedApplications'

const { searchQuery, hasActiveFilters, clearFilters } = useApprovedApplications()
</script>

<template>
  <div
    class="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60"
  >
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <TypographyH1 class="text-2xl md:text-3xl font-bold text-gradient-primary">
            Approved Applications
          </TypographyH1>
          <p class="text-muted-foreground text-sm md:text-base">
            View all approved and issued permits
          </p>
        </div>

        <!-- Search -->
        <div class="flex flex-col gap-3 my-5">
          <!-- Search Bar -->
          <div class="flex gap-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by project, applicant, location, approval number, or permit ID..."
              class="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button variant="outline" size="sm" class="px-3">
              <Search class="w-4 h-4" />
            </Button>
          </div>

          <!-- Clear Filters Button -->
          <Button
            v-if="hasActiveFilters"
            variant="ghost"
            size="sm"
            @click="clearFilters"
            class="w-fit text-xs gap-1"
          >
            <X class="w-3.5 h-3.5" />
            Clear Search
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
