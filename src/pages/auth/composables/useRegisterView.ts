import { reactive, ref, computed } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/lib/validator'

export function useRegisterView() {
  const form = reactive({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const errors = reactive({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const touched = reactive({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const isLoading = ref(false)
  const agreedToTerms = ref(false)

  const passwordStrength = computed(() => {
    const p = form.password
    if (!p) return { score: 0, label: '', color: '' }
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++

    const levels = [
      { label: 'Weak', color: 'bg-destructive' },
      { label: 'Fair', color: 'bg-orange-400' },
      { label: 'Good', color: 'bg-yellow-400' },
      { label: 'Strong', color: 'bg-green-500' },
    ]
    const level = levels[score - 1] || levels[0]
    return { score, ...level }
  })

  function validateFullName() {
    const result = requiredValidator(form.fullName)
    errors.fullName = result === true ? '' : (result as string) || 'Full name is required'
  }

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
    if (required !== true) {
      errors.password = required as string
      return
    }
    const valid = passwordValidator(form.password)
    errors.password = valid === true ? '' : (valid as string)
  }

  function validateConfirmPassword() {
    const required = requiredValidator(form.confirmPassword)
    if (required !== true) {
      errors.confirmPassword = required as string
      return
    }
    const valid = confirmedValidator(form.confirmPassword, form.password)
    errors.confirmPassword = valid === true ? '' : (valid as string)
  }

  function onBlurFullName() {
    touched.fullName = true
    validateFullName()
  }

  function onBlurEmail() {
    touched.email = true
    validateEmail()
  }

  function onBlurPassword() {
    touched.password = true
    validatePassword()
  }

  function onBlurConfirmPassword() {
    touched.confirmPassword = true
    validateConfirmPassword()
  }

  function validateAll(): boolean {
    touched.fullName = true
    touched.email = true
    touched.password = true
    touched.confirmPassword = true
    validateFullName()
    validateEmail()
    validatePassword()
    validateConfirmPassword()
    return !errors.fullName && !errors.email && !errors.password && !errors.confirmPassword
  }

  function handleSubmit() {
    if (!validateAll() || !agreedToTerms.value) return
    isLoading.value = true
    // TODO: implement register logic
    setTimeout(() => {
      isLoading.value = false
    }, 1500)
  }

  return {
    form,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    isLoading,
    agreedToTerms,
    passwordStrength,
    onBlurFullName,
    onBlurEmail,
    onBlurPassword,
    onBlurConfirmPassword,
    handleSubmit,
  }
}
