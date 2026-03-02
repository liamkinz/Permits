<script setup lang="ts">
import { Zap, Clock, ShieldCheck, Bell, BarChart3, FileSearch, ArrowRight } from 'lucide-vue-next'

const features = [
  {
    icon: Zap,
    title: 'Instant Application Submission',
    description:
      'Submit permit applications in under 5 minutes with our guided, form-based workflow. No more confusing paperwork.',
    color: 'bg-yellow-50 text-yellow-600',
    border: 'hover:border-yellow-200',
  },
  {
    icon: Clock,
    title: 'Real-Time Status Tracking',
    description:
      'Know exactly where your permit stands at every stage. Live updates and transparent timelines keep you in the loop.',
    color: 'bg-blue-50 text-blue-600',
    border: 'hover:border-blue-200',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Assurance',
    description:
      'Built-in rule validation checks against local regulations before you submit, minimizing rejections and revisions.',
    color: 'bg-green-50 text-green-600',
    border: 'hover:border-green-200',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Automated reminders for renewals, expirations, and document requests so nothing slips through the cracks.',
    color: 'bg-purple-50 text-purple-600',
    border: 'hover:border-purple-200',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track approval rates, processing times, and permit history with clear, actionable reports.',
    color: 'bg-rose-50 text-rose-600',
    border: 'hover:border-rose-200',
  },
  {
    icon: FileSearch,
    title: 'Document Management',
    description:
      'Centralized storage for all supporting documents. Attach, version, and retrieve files instantly.',
    color: 'bg-teal-50 text-teal-600',
    border: 'hover:border-teal-200',
  },
]
</script>

<template>
  <section id="features" class="py-24 bg-white">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Section header -->
      <div class="max-w-2xl mx-auto text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
        >
          Features
        </div>
        <h2 class="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          Everything you need, nothing you don't
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          PermitsPro brings the entire permit process into one clean, intuitive platform — from
          first application to final approval.
        </p>
      </div>

      <!-- Feature grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          :class="[
            'group relative p-6 rounded-2xl border border-border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default',
            feature.border,
          ]"
        >
          <div
            :class="[
              'inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform duration-200 group-hover:scale-110',
              feature.color,
            ]"
          >
            <component :is="feature.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-foreground mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Bottom CTA link -->
      <div class="text-center mt-12">
        <a
          href="#how-it-works"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
        >
          See how it works
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </section>
</template>
