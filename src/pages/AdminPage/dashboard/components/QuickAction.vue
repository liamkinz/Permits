<script setup lang="ts">
// import card components here
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ClipboardList, Users, BarChart3, Settings } from 'lucide-vue-next'
</script>

<template>
  <Card class="border border-border/50">
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent class="pt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button variant="outline" class="h-12 gap-2 justify-start">
          <ClipboardList class="w-4 h-4" />
          <span>Review Applications</span>
        </Button>
        <Button variant="outline" class="h-12 gap-2 justify-start">
          <Users class="w-4 h-4" />
          <span>Manage Users</span>
        </Button>
        <Button variant="outline" class="h-12 gap-2 justify-start">
          <BarChart3 class="w-4 h-4" />
          <span>View Reports</span>
        </Button>
        <Button variant="outline" class="h-12 gap-2 justify-start">
          <Settings class="w-4 h-4" />
          <span>Settings</span>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
