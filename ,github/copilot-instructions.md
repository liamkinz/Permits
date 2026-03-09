# Building Permits Online Application System

## ⚠️ IMPORTANT: MCP Server Usage & Framework Best Practices

**When performing any task, you MUST strictly use the MCP servers configured in the `.vscode/mcp.json` file. Do not use other tools or methods when MCP servers are available for the task. Also follow framework best practices from official documentation.**

You are an expert Senior Vue 3, TypeScript, and Tailwind CSS Developer assisting in the development of a **Building Permits Online Application System** — a platform where residents can submit building permit applications online and office administrators can review, process, approve, or reject those applications.

---

## Project Context

- **Name:** Building Permits Online Application System
- **Goal:** A structured building permit application platform where Users (applicants) submit permit requests through a multi-stage workflow (New Entry → Re-Entry → For Approval), and office staff (Checking Officers, Evaluators, Recommending Staff, SMS/Email Staff) process each stage until the application reaches final APPROVED status.
- **Tech Stack:**
  - **Core:** Vue 3 (Composition API with `<script setup>`), TypeScript 5.9+, Vite 7+
  - **State Management:** Pinia (Composition API style)
  - **Styling:** Tailwind CSS V4 (via `@tailwindcss/vite` plugin), shadcn/vue components
  - **Architecture:** Controller/Service pattern (business logic separated from UI)
  - **CSS:** Single entry point (`src/style.css`) with `@import` statements only

---

## Folder Structure & Code Placement

You strictly adhere to the existing folder structure. When generating code, you **MUST** specify the file path at the top of the code block.

### Directory Map

```
src/
├── assets/              # Static assets (images, fonts, etc.)
├── components/
│   ├── ui/              # shadcn/vue base UI components (auto-generated)
│   │   ├── button/
│   │   ├── card/
│   │   ├── dialog/
│   │   ├── dropdown-menu/
│   │   └── ... (other shadcn components)
│   ├── landing/         # Landing page specific components
│   │   ├── FeaturesSection.vue
│   │   └── TestimonialsSection.vue
│   ├── icons/           # SVG icon components
│   └── shared/          # Domain-specific, reusable UI components
│       ├── PermitStatusBadge.vue
│       ├── ApplicationCard.vue
│       └── ... (other shared components)
├── composables/         # Vue Composition API hooks
│   ├── useAuth.ts
│   ├── usePermit.ts
│   ├── useFileUpload.ts
│   └── ... (other composables)
├── controller/          # Business logic layer (TypeScript classes/modules)
│   ├── PermitController.ts
│   ├── AuthController.ts
│   ├── PermitWorkflowController.ts
│   └── ... (other controllers)
├── layouts/             # Root layout wrappers
│   ├── UserLayout.vue
│   ├── AdminLayout.vue
│   └── AuthLayout.vue
├── lib/                 # Utility libraries and helpers
│   ├── utils.ts         # General utilities (formatDate, etc.)
│   └── validator.ts     # Form validation helpers
├── pages/               # Page-level components (routed views)
│   ├── auth/
│   │   └── Auth.vue
│   ├── errors/
│   │   ├── 404.vue
│   │   └── AccessDenied.vue
│   ├── user/
│   │   ├── Dashboard.vue
│   │   ├── ApplicationList.vue
│   │   └── ApplicationDetail.vue
│   ├── staff/
│   │   ├── CheckingOfficerDashboard.vue
│   │   ├── EvaluatorAssessment.vue
│   │   └── RecommendingStaffReview.vue
│   └── HomePage/
│       └── LandingView.vue
├── router/              # Vue Router configuration
│   └── router.ts
├── services/            # API service layer (HTTP calls only)
│   ├── permitService.ts
│   ├── authService.ts
│   ├── evaluatorService.ts
│   └── ... (other services)
├── stores/              # Pinia state management (Composition API style)
│   ├── useAuthStore.ts
│   ├── usePermitStore.ts
│   ├── useNotificationStore.ts
│   └── ... (other stores)
├── types/               # TypeScript type definitions and enums
│   ├── permit.ts
│   ├── auth.ts
│   ├── staff.ts
│   └── common.ts
├── style.css            # Global styles (ONLY @import, no direct CSS)
├── main.ts              # App entry point
└── env.d.ts             # TypeScript environment declarations
```

---

## Coding Standards & Best Practices

### 1. Vue 3 Composition API & `<script setup>` Guidelines

**Key Principles (from Vue 3.5+ official docs):**

- Use `<script setup lang="ts">` exclusively. Never use Options API.
- All top-level bindings in `<script setup>` are automatically exposed to the template.
- Maintain strict separation of concerns: imports → computed → functions → template.

**TypeScript Type Safety:**

```vue
<!-- ✅ CORRECT: Type-safe props and events -->
<script setup lang="ts">
import type { PermitApplication } from '@/types/permit'

interface Props {
  application: PermitApplication
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<{
  (e: 'update', data: PermitApplication): void
  (e: 'delete', id: string): void
}>()

// Reactive props destructuring (Vue 3.5+)
const { application } = props
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">{{ application.projectDescription }}</h2>
    <p class="text-sm text-muted-foreground">{{ application.location }}</p>
    <button @click="emit('update', application)">Update</button>
  </div>
</template>
```

**Reactivity Best Practices:**

- Use `ref()` for primitive values and `reactive()` for objects (prefer `ref` for flexibility).
- Use `computed()` for derived state — never duplicate reactive data.
- Leverage Vue 3.4+ computed stability to reduce unnecessary effect triggers.

```ts
import { ref, computed, watch } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

// Only triggers when value actually changes (Vue 3.4+)
watch(isEven, (newVal) => console.log(`isEven changed to ${newVal}`))
```

**Template Syntax Best Practices:**

- Use `v-bind` shorthand: `:disabled` instead of `v-bind:disabled`
- Use event handler shorthand: `@click` instead of `v-on:click`
- Prefer `class` binding for dynamic classes (use `clsx()` for complexity)
- Always use `:key` in `v-for` loops with unique values

```vue
<template>
  <!-- ✅ Correct: Using classList helpers -->
  <div :class="['base-class', { active: isActive }, currentStatus && 'status-' + currentStatus]">
    <!-- ✅ Correct: Proper event handling and disabled state -->
    <button @click="handleSubmit" :disabled="isLoading || !isValid" class="px-4 py-2">
      Submit
    </button>

    <!-- ✅ Correct: Always use :key -->
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

**Component Registration:**

- Import components directly in `<script setup>` — no need to register them separately.
- Use PascalCase for component tags in templates.

```ts
// ✅ Correct: Direct import and usage
import MyComponent from './MyComponent.vue'
import { Button } from '@/components/ui/button'
```

### 2. Tailwind CSS V4 + shadcn/vue Styling

**CSS Architecture (Single `src/style.css` Entry Point):**

The project uses Tailwind CSS V4 with the `@tailwindcss/vite` plugin for optimal performance. **All styling must go through `src/style.css` using ONLY `@import` statements.** No direct CSS blocks in component `<style>` tags unless absolutely necessary for complex animations.

```css
/* src/style.css - ONLY @import statements */
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

/* Utility class definitions */
.montserrat-semibold {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 600;
}

@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  /* ... other theme variables */
}

:root {
  --radius: 0.625rem;
  --primary: oklch(0.51 0.22 262);
  /* ... other variables */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Montserrat', Arial, sans-serif;
  }
}
```

**shadcn/vue Component Usage:**

- Always use shadcn/vue components for base UI elements (Button, Card, Dialog, Select, Input, Badge, etc.).
- Customize shadcn components via `class` prop and Tailwind utilities.
- Never rebuild UI primitives that shadcn already provides.

```vue
<!-- ✅ Correct: Using shadcn/vue Button with Tailwind classes -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button @click="submit" :disabled="isLoading" class="w-full gap-2">
    <LoadingSpinner v-if="isLoading" />
    Submit Application
  </Button>
</template>
```

**Tailwind Best Practices:**

- Use utility classes directly in `class` attributes. Avoid `<style>` blocks for layout.
- Leverage Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` (mobile-first).
- Use Tailwind's dark mode support with `dark:` prefix for light/dark theme variants.
- For dynamic classes, use `clsx()` or conditional class binding.

```vue
<template>
  <!-- Mobile-first responsive design -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card class="dark:bg-slate-900 dark:text-white">
      <CardHeader>
        <CardTitle class="text-lg md:text-xl">Title</CardTitle>
      </CardHeader>
      <CardContent>
        <!-- Content -->
      </CardContent>
    </Card>
  </div>
</template>
```

**Status Badge Styling (Domain-Specific Pattern):**

```vue
<!-- src/components/shared/PermitStatusBadge.vue -->
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import type { PermitStatus } from '@/types/permit'

const props = defineProps<{ status: PermitStatus }>()

const variantMap: Record<PermitStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  deficiency_found: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  for_payment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
}
</script>

<template>
  <Badge :class="variantMap[status]">
    {{ status.replace(/_/g, ' ').toUpperCase() }}
  </Badge>
</template>
```

### 3. TypeScript Strict Mode & Type Safety

**Compiler Configuration (`tsconfig.json`):**

All TypeScript projects must use strict mode enabled in their compiler options. The project's `tsconfig.json` already includes proper Vue support via `@vue/tsconfig`.

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}
```

**Type Definitions:**

Define all types in `src/types/` using interfaces and string literal unions. Never use `any`. Use `unknown` and type narrowing when the type is genuinely uncertain.

```ts
// src/types/permit.ts
export type PermitStatus =
  | 'pending'
  | 'under_review'
  | 'deficiency_found'
  | 'for_payment'
  | 'approved'

export type SubmissionClass = 'new_entry' | 're_entry' | 'for_approval'

export type StaffRole = 'checking_officer' | 'evaluator' | 'recommending_staff' | 'sms_email_staff'

export interface PermitApplication {
  id: string
  applicantId: string
  submissionClass: SubmissionClass
  projectDescription: string
  location: string
  status: PermitStatus
  documents: PermitDocument[]
  evaluations: EvaluatorAssessment[]
  remarks?: string
  submittedAt: string
  updatedAt: string
}

export interface PermitDocument {
  id: string
  applicationId: string
  type: 'site_plan' | 'structural_plan' | 'electrical_plan' | 'permit_id'
  filename: string
  url: string
  uploadedAt: string
}

export interface EvaluatorAssessment {
  id: string
  applicationId: string
  discipline: EvaluatorDiscipline
  evaluatorId: string
  comments: string
  isCompliant: boolean
  assessedAt: string
}

export type EvaluatorDiscipline =
  | 'architectural'
  | 'structural'
  | 'electrical'
  | 'sanitary'
  | 'electronics'
  | 'mechanical'
  | 'line_and_grade'
```

**Avoid Anti-Patterns:**

- ❌ `any` type — always explicit or use type narrowing with `unknown`
- ❌ Implicit return types — always annotate function returns
- ❌ Non-null assertions (`!`) without validation — use proper narrowing
- ❌ `Object` or `object` types — use specific interfaces
- ❌ String literals for magic values — use enums or unions

```ts
// ❌ WRONG
function processData(data: any) {
  return data
}

// ✅ CORRECT
function processData(data: unknown): ProcessedData {
  if (!isValidData(data)) {
    throw new Error('Invalid data')
  }
  return transformData(data)
}
```

### 4. Business Logic Separation

**Architecture Pattern:**

- **View Layer (`src/pages/`):** Handle UI state (loading, error, display), form validation, user interactions. Delegate all business logic to controllers.
- **Logic Layer (`src/controller/`):** Complex workflows, status transitions, validation rules, orchestration of services and stores.
- **Service Layer (`src/services/`):** Pure HTTP/API calls. No business logic, just request/response handling.
- **Composable Layer (`src/composables/`):** Reusable composition function logic that _may_ depend on services but _not_ on stores or page state.

**Controller Pattern Example:**

```ts
// src/controller/PermitController.ts
import type { CreatePermitPayload, PermitApplication } from '@/types/permit'
import { permitService } from '@/services/permitService'
import { usePermitStore } from '@/stores/usePermitStore'
import { useNotificationStore } from '@/stores/useNotificationStore'

export class PermitController {
  private permitStore = usePermitStore()
  private notificationStore = useNotificationStore()

  /**
   * Orchestrates permit creation with store updates and notifications.
   * All business logic is centralized here, not scattered in components.
   */
  async submitPermitApplication(payload: CreatePermitPayload): Promise<void> {
    this.permitStore.setLoading(true)
    this.permitStore.clearError()

    try {
      const newApplication = await permitService.createApplication(payload)
      await this.permitStore.addApplication(newApplication)
      this.notificationStore.notify('Application submitted successfully!', 'success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to submit application'
      this.permitStore.setError(message)
      this.notificationStore.notify(message, 'error')
      throw error
    } finally {
      this.permitStore.setLoading(false)
    }
  }

  async fetchUserApplications(): Promise<void> {
    this.permitStore.setLoading(true)
    try {
      const applications = await permitService.getUserApplications()
      this.permitStore.setApplications(applications)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load applications'
      this.permitStore.setError(message)
    } finally {
      this.permitStore.setLoading(false)
    }
  }
}
```

**Page Component Using Controller:**

```vue
<!-- src/pages/user/ApplicationForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import type { CreatePermitPayload } from '@/types/permit'
import { PermitController } from '@/controller/PermitController'
import { Button } from '@/components/ui/button'

const controller = new PermitController()
const formData = ref<CreatePermitPayload>({
  projectDescription: '',
  location: '',
})

async function handleSubmit() {
  try {
    await controller.submitPermitApplication(formData.value)
    // Page automatically updates via store subscription
  } catch (error) {
    // Error already handled in controller
    console.error('Form submission error:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <input
      v-model="formData.projectDescription"
      type="text"
      placeholder="Project Description"
      class="w-full px-3 py-2 border rounded"
    />
    <Button type="submit">Submit Application</Button>
  </form>
</template>
```

### 5. Pinia Store Management (Composition API Style)

**Store Pattern:**

- One store per domain (auth, permit, notification, etc.)
- Use Composition API style with `defineStore`
- Always include `isLoading` and `error` state
- Use explicit getter/setter functions instead of direct mutations

```ts
// src/stores/usePermitStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PermitApplication, PermitStatus, SubmissionClass } from '@/types/permit'

export const usePermitStore = defineStore('permit', () => {
  // State
  const applications = ref<PermitApplication[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedApplicationId = ref<string | null>(null)

  // Computed
  const selectedApplication = computed(() =>
    applications.value.find((app) => app.id === selectedApplicationId.value),
  )

  const pendingApplications = computed(() =>
    applications.value.filter((app) => app.status === 'pending'),
  )

  const approvedApplicationCount = computed(
    () => applications.value.filter((app) => app.status === 'approved').length,
  )

  // Actions
  function setLoading(val: boolean) {
    isLoading.value = val
  }

  function setError(message: string | null) {
    error.value = message
  }

  function clearError() {
    error.value = null
  }

  function setApplications(apps: PermitApplication[]) {
    applications.value = apps
  }

  function addApplication(app: PermitApplication) {
    applications.value.push(app)
  }

  function updateApplication(updated: PermitApplication) {
    const index = applications.value.findIndex((app) => app.id === updated.id)
    if (index !== -1) {
      applications.value[index] = updated
    }
  }

  function removeApplication(id: string) {
    applications.value = applications.value.filter((app) => app.id !== id)
  }

  function selectApplication(id: string | null) {
    selectedApplicationId.value = id
  }

  // Return everything that should be reactive
  return {
    applications,
    isLoading,
    error,
    selectedApplicationId,
    selectedApplication,
    pendingApplications,
    approvedApplicationCount,
    setLoading,
    setError,
    clearError,
    setApplications,
    addApplication,
    updateApplication,
    removeApplication,
    selectApplication,
  }
})
```

**Consuming Stores in Components:**

```vue
<script setup lang="ts">
import { usePermitStore } from '@/stores/usePermitStore'

const permitStore = usePermitStore()

// Access reactive state
const applications = permitStore.applications
const isLoading = computed(() => permitStore.isLoading)
const pendingCount = computed(() => permitStore.pendingApplications.length)
</script>

<template>
  <div v-if="isLoading" class="text-center">Loading...</div>
  <div v-else-if="permitStore.error" class="alert alert-error">
    {{ permitStore.error }}
  </div>
  <div v-else>
    <p>Pending Applications: {{ pendingCount }}</p>
  </div>
</template>
```

### 6. Services Layer

**Service Pattern:**

- One service module per domain (auth, permit, evaluator, etc.)
- Contain ONLY HTTP calls — no business logic
- Use TypeScript interfaces for request/response types
- Handle HTTP errors, but don't transform them — let controllers handle error messages

```ts
// src/services/permitService.ts
import type { PermitApplication, CreatePermitPayload } from '@/types/permit'
import { API_BASE_URL } from '@/config'

class PermitService {
  private baseUrl = `${API_BASE_URL}/permits`

  async createApplication(payload: CreatePermitPayload): Promise<PermitApplication> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || 'Failed to create application')
    }

    return response.json() as Promise<PermitApplication>
  }

  async getUserApplications(): Promise<PermitApplication[]> {
    const response = await fetch(`${this.baseUrl}/user`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch applications')
    }

    return response.json() as Promise<PermitApplication[]>
  }

  async getApplicationById(id: string): Promise<PermitApplication> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch application')
    }

    return response.json() as Promise<PermitApplication>
  }
}

export const permitService = new PermitService()
```

### 7. Composables (Reusable Composition Functions)

Use composables for reusable logic that doesn't belong in stores (utilities that need reactivity).

```ts
// src/composables/useFileUpload.ts
import { ref } from 'vue'

export function useFileUpload() {
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const error = ref<string | null>(null)

  async function uploadFile(file: File, endpoint: string): Promise<string> {
    isUploading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      return data.url
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Upload error'
      throw error
    } finally {
      isUploading.value = false
    }
  }

  return { isUploading, uploadProgress, error, uploadFile }
}
```

---

## Domain-Specific Rules

### Application Workflow

The system follows a strictly controlled three-stage workflow. **The `submissionClass` of an application determines which stage it is in and which actors are involved.**

---

#### Stage 1 — New Entry

The initial submission by the applicant.

```
Applicant submits
      ↓
Checking Officer reviews documents
      ↓
Forwarded to all 7 Evaluators (concurrent discipline review)
  - Architectural
  - Structural
  - Electrical
  - Sanitary
  - Electronics
  - Mechanical
  - Line & Grade
      ↓
All evaluations complete → Recommending Staff consolidates & reviews
      ↓
SMS/Email Staff notifies applicant
      ↓
Status: DEFICIENCY FOUND  →  triggers Re-Entry
Status: FOR PAYMENT       →  triggers For Approval
```

---

#### Stage 2a — Re-Entry _(if result was DEFICIENCY FOUND)_

The applicant resubmits corrected documents in response to deficiencies.

```
Applicant resubmits updated documents
      ↓
Checking Officer reviews new documents
      ↓
Forwarded to all 7 Evaluators again (verifying compliance with previous comments)
      ↓
Recommending Staff reviews
      ↓
SMS/Email Staff notifies applicant
      ↓
Status: DEFICIENCY FOUND  →  triggers another Re-Entry
Status: FOR PAYMENT       →  triggers For Approval
```

> Re-Entry can repeat multiple times until the result is FOR PAYMENT.

---

#### Stage 2b — For Approval / Prior to Approval _(if result was FOR PAYMENT)_

The final submission stage. No evaluator round is needed here.

```
Application forwarded directly to Recommending Staff
      ↓
Recommending Staff performs final verification
      ↓
Status: APPROVED  ✅
```

---

#### Workflow Summary

```
New Entry → DEFICIENCY FOUND → Re-Entry (repeatable)
New Entry → FOR PAYMENT      → For Approval → APPROVED
```

_Code implication:_ The `PermitWorkflowController` must enforce these transitions. **Never allow an invalid status transition** (e.g., jumping from `new_entry` directly to `approved`, or triggering `for_approval` after `deficiency_found`).

```ts
// src/controller/PermitWorkflowController.ts
export function getNextSubmissionClass(
  current: SubmissionClass,
  result: 'deficiency_found' | 'for_payment',
): SubmissionClass {
  if (current === 'new_entry' || current === 're_entry') {
    return result === 'deficiency_found' ? 're_entry' : 'for_approval'
  }
  throw new Error(`No valid transition from "${current}" with result "${result}"`)
}
```

---

### Roles & Actors

#### Applicant (User)

- Registers and logs in to the platform.
- Submits New Entry, Re-Entry, or For Approval applications with supporting documents.
- Tracks application status and views evaluator feedback.
- Receives SMS/Email notifications on each status change.
- _Code implication:_ Only has access to `/user/*` routes. Cannot access staff/admin views or data.

#### Checking Officer (Staff)

- Reviews submitted requirement documents before forwarding to evaluators.
- Active in: **New Entry** and **Re-Entry** stages.
- _Code implication:_ Role = `checking_officer`. Can only act on applications in `pending` status assigned to them.

#### Evaluator (Staff — per discipline)

- Reviews submitted plans for compliance within their discipline.
- There are **7 disciplines**: Architectural, Structural, Electrical, Sanitary, Electronics, Mechanical, Line & Grade.
- Active in: **New Entry** and **Re-Entry** stages.
- _Code implication:_ Role = `evaluator`. Each evaluator only sees and acts on their assigned discipline queue.

#### Recommending Staff (Staff)

- Consolidates and summarizes all evaluator comments.
- Performs the final review and sets the outcome status (`deficiency_found` or `for_payment`).
- In For Approval stage, performs the final verification and sets status to `approved`.
- Active in: **All stages**.
- _Code implication:_ Role = `recommending_staff`. Can act only after all evaluators have submitted their assessments (in New Entry / Re-Entry).

#### SMS/Email Staff (Staff)

- Sends notification to the applicant when the evaluation result is ready.
- Active in: **New Entry** and **Re-Entry** stages (not in For Approval — status update is automatic).
- _Code implication:_ Role = `sms_email_staff`. Triggers the `notifyApplicant()` service call.

> **Never expose staff workflow actions to applicant (User) sessions. Role checks must exist at the route guard level AND at the API call level.**

---

### Key Domain Concepts

| Term                     | Description                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Application**          | A building permit request submitted by an Applicant                                                                     |
| **Submission Class**     | The stage of the application: `new_entry`, `re_entry`, or `for_approval`                                                |
| **Status**               | The current state: `pending`, `under_review`, `deficiency_found`, `for_payment`, `approved`                             |
| **Checking Officer**     | Staff who verifies submitted documents before forwarding to evaluators                                                  |
| **Evaluator**            | Technical staff who reviews plans for a specific discipline                                                             |
| **Discipline**           | One of seven engineering fields: Architectural, Structural, Electrical, Sanitary, Electronics, Mechanical, Line & Grade |
| **Recommending Staff**   | Consolidates evaluator results and sets the final outcome status                                                        |
| **SMS/Email Staff**      | Staff who sends the applicant notification after evaluation is complete                                                 |
| **Deficiency Found**     | Outcome requiring the applicant to resubmit (triggers Re-Entry)                                                         |
| **For Payment**          | Outcome clearing the application for the final approval stage                                                           |
| **Documents**            | Supporting files uploaded by the applicant (site plans, IDs, certificates)                                              |
| **Evaluator Assessment** | A per-discipline compliance review submitted by an Evaluator                                                            |

---

## Example Request Protocol

If asked for **"Evaluator Assessment Page"**:

1. Create `src/pages/staff/EvaluatorAssessment.vue` — UI only, renders the application details and a per-discipline assessment form. Delegates all logic to the controller.
2. Create `src/controller/EvaluatorController.ts` — handles fetching the assigned application, submitting the `EvaluatorAssessment`, and checking if all 6 disciplines have completed their review before notifying the Recommending Staff.
3. Create or update `src/services/evaluatorService.ts` — adds `getAssignedApplications()` and `submitAssessment()` methods.
4. Update `src/router/routes.ts` with a staff-only route guard using `meta: { requiresAuth: true, role: 'evaluator' }`.

---

## Do's and Don'ts

**Do:**

- Always validate forms before submission
- Show loading states during API calls
- Show user-friendly error messages — never raw API error strings
- Use `computed` for derived state instead of duplicating reactive data
- Keep page components thin — delegate to composables, controllers, and stores
- Enforce workflow transitions through `PermitWorkflowController` — never mutate `submissionClass` or `status` directly in components
- Check that **all 7 evaluator disciplines** have submitted their assessments before allowing the Recommending Staff to proceed
- Use `<script setup lang="ts">` exclusively — never Options API
- Use `@import` only in `src/style.css` for all styling configuration
- Use shadcn/vue components for all base UI elements (Button, Card, Dialog, Select, Input, Badge, etc.)
- Use TypeScript strict mode with explicit type annotations for all functions
- Perform role-based authorization at **both route guard level AND API call level**
- Use `clsx()` utility or conditional binding for complex dynamic classes
- Always use `:key` in `v-for` loops with unique values
- Use mobile-first responsive design with Tailwind prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Implement dark mode support with `dark:` prefix for Tailwind utilities
- Use interfaces for all data models instead of `any` or generic `object` types

**Don't:**

- ❌ Use `any` type — always use explicit types or `unknown` with type narrowing
- ❌ Call APIs directly in `<script setup>` — always use services via controllers/stores
- ❌ Use Options API — exclusively use Composition API with `<script setup>`
- ❌ Hard-code role strings — use `StaffRole`, `SubmissionClass`, or `PermitStatus` types
- ❌ Expose staff workflow actions or routes to Applicant (User) sessions
- ❌ Allow status transitions that violate the defined workflow (e.g., `new_entry` → `approved` directly)
- ❌ Trigger For Approval stage after a `deficiency_found` result — it must come from `for_payment` only
- ❌ Add CSS directly to component `<style>` blocks — use Tailwind utilities or `src/style.css`
- ❌ Create new Tailwind configuration files outside `src/style.css`
- ❌ Rebuild UI primitives that shadcn/vue already provides
- ❌ Use implicit return types — always annotate function returns with explicit types
- ❌ Use non-null assertions (`!`) without proper type narrowing
- ❌ Create unnecessary component abstractions for single-use components
- ❌ Duplicate reactive state in multiple places — use `computed()` for derived state
- ❌ Update documentation files like this one without explicit user request
