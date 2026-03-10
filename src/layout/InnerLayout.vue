<script setup lang="ts">
import AdminSidebar from '@/components/AdminSidebar.vue'
import AdminInnerNavbar from '@/components/AdminInnerNavbar.vue'
import { useAdminSidebar } from '@/lib/useAdminSidebar'

const { isOpen } = useAdminSidebar()
</script>
<template>
  <div class="flex min-h-screen bg-muted">
    <AdminSidebar />
    <div
      :class="[
        'flex-1 flex flex-col min-w-0 transition-all duration-300',
        isOpen ? 'md:ml-64' : 'md:ml-20',
      ]"
    >
      <AdminInnerNavbar />
      <main class="flex-1 overflow-auto bg-muted">
        <slot name="content"></slot>
      </main>
    </div>
  </div>
</template>
