import { reactive, ref } from 'vue'
import { emailValidator, requiredValidator } from '@/lib/validator'
import { useAuthStore } from '@/stores/authStore'

export function useLoginView() {
  const authStore = useAuthStore()

  const form = reactive({
    email: '',
    password: '',
  })

  const errors = reactive({
    email: '',
    password: '',
  })

  const touched = reactive({
    email: false,
    password: false,
  })

  const showPassword = ref(false)
  const isLoading = ref(false)

  function validateEmail() {
    const required = requiredValidator(form.email)
    if (required !== true) {
      errors.email = required as string
      return
    }
    const valid = emailValidator(form.email)
    errors.email = valid === true ? '' : (valid as string)
  }

  function validatePassword() {
    const required = requiredValidator(form.password)
    errors.password = required === true ? '' : (required as string)
  }

  function onBlurEmail() {
    touched.email = true
    validateEmail()
  }

  function onBlurPassword() {
    touched.password = true
    validatePassword()
  }

  function validateAll(): boolean {
    touched.email = true
    touched.password = true
    validateEmail()
    validatePassword()
    return !errors.email && !errors.password
  }

  async function handleSubmit() {
    if (!validateAll()) return
    isLoading.value = true
    errors.email = ''
    errors.password = ''
    const success = await authStore.login(form.email, form.password)
    if (!success) {
      errors.email = authStore.loginError
    }
    isLoading.value = false
  }

  return {
    form,
    errors,
    touched,
    showPassword,
    isLoading,
    onBlurEmail,
    onBlurPassword,
    handleSubmit,
  }
}
