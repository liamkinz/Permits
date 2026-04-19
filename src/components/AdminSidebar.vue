<script setup lang="ts">
import { LogOut, Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useAdminSidebar } from '@/types/admin-sidebar.types'
import { navigationItems, menuItems } from '@/utils/admin-sidebar-nav'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const { isOpen, isMobileOpen, toggleSidebar, closeMobileSidebar } = useAdminSidebar()
</script>

<template>
  <!-- Mobile Overlay -->
  <div
    v-if="isMobileOpen"
    class="fixed inset-0 z-40 bg-black/50 md:hidden"
    @click="closeMobileSidebar"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed left-0 top-0 h-screen transition-[transform,width] duration-300 ease-out z-50',
      'bg-sidebar border-r border-sidebar-border',
      'flex flex-col',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0',
      isOpen ? 'w-64' : 'w-64 md:w-20',
    ]"
  >
    <!-- Logo Section -->
    <div class="flex items-center justify-between p-4 border-b border-sidebar-border">
      <div v-if="isOpen || isMobileOpen" class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg btn-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm"
        >
          P
        </div>
        <span class="text-sidebar-foreground font-semibold text-lg">Permits</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        @click="toggleSidebar"
        class="hidden md:flex text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <Menu class="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        @click="closeMobileSidebar"
        class="md:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <X class="h-5 w-5" />
      </Button>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto px-3 py-6 space-y-2">
      <h3
        v-if="isOpen || isMobileOpen"
        class="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-2 mb-4"
      >
        Menu
      </h3>
      <a
        v-for="item in navigationItems"
        :key="item.label"
        :href="item.href"
        class="flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors group"
        :title="!(isOpen || isMobileOpen) ? item.label : ''"
        @click="closeMobileSidebar"
      >
        <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
        <span v-if="isOpen || isMobileOpen" class="text-sm font-medium">{{ item.label }}</span>
      </a>
    </nav>

    <!-- Divider -->
    <div class="border-t border-sidebar-border"></div>

    <!-- Additional Menu Items -->
    <nav class="px-3 py-4 space-y-2">
      <a
        v-for="item in menuItems"
        :key="item.label"
        :href="item.href"
        class="flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        :title="!(isOpen || isMobileOpen) ? item.label : ''"
        @click="closeMobileSidebar"
      >
        <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
        <span v-if="isOpen || isMobileOpen" class="text-sm font-medium">{{ item.label }}</span>
      </a>
    </nav>

    <!-- Divider -->
    <div class="border-t border-sidebar-border"></div>

    <!-- User Profile & Footer -->
    <div class="p-4 space-y-4 border-t border-sidebar-border">
      <!-- User Profile -->
      <div
        v-if="isOpen || isMobileOpen"
        class="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent"
      >
        <div
          class="w-10 h-10 rounded-full btn-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0"
        >
          {{ authStore.adminInitials }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-sidebar-foreground truncate">
            {{ authStore.user?.name }}
          </p>
          <p class="text-xs text-sidebar-foreground/50 truncate">{{ authStore.user?.email }}</p>
        </div>
      </div>

      <!-- Logout Button -->
      <Button
        variant="outline"
        class="w-full bg-sidebar-accent hover:bg-sidebar-accent/80 border-sidebar-border text-sidebar-foreground/70 hover:text-sidebar-foreground"
        @click="authStore.logout()"
      >
        <LogOut class="h-4 w-4 mr-2" />
        <span v-if="isOpen || isMobileOpen">Logout</span>
      </Button>
    </div>
  </aside>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--sidebar-ring);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--sidebar-foreground);
}
</style>
