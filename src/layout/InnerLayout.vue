<!-- <script setup lang="ts">
import AdminInnerNavbar from '@/components/AdminInnerNavbar.vue'
import { RouterView } from 'vue-router'
import AdminNewSidebar from '@/components/AdminNewSidebar.vue'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-far text-foreground">
    <AdminInnerNavbar />
    <SidebarProvider class="flex-1 ">
      <AdminNewSidebar />
      <SidebarInset class="p-4 md:p-6">
        <RouterView />
      </SidebarInset>
    </SidebarProvider>
  </div>
</template> -->

<script setup lang="ts">
import AdminSidebar from '@/components/AdminSidebar.vue'
import AdminInnerNavbar from '@/components/AdminInnerNavbar.vue'
import { useAdminSidebar } from '@/types/admin-sidebar.types'

const { isOpen } = useAdminSidebar()
</script>
<template>
  <div class="flex min-h-screen bg-muted">
    <AdminSidebar />
    <div
      :class="[
        'flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-out',
        isOpen ? 'md:ml-64' : 'md:ml-20',
      ]"
    >
      <AdminInnerNavbar />
      <main class="flex-1 overflow-auto bg-muted">
        <RouterView />
      </main>
    </div>
  </div>
</template>
