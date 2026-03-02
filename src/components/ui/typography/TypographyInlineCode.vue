<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <code
    :class="
      cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        props.class,
      )
    "
  >
    <slot />
  </code>
</template>
