import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loginError = ref('')

  // Restore session from localStorage
  const stored = localStorage.getItem('auth')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      user.value = parsed.user
      token.value = parsed.token
      console.log('Restored session from localStorage' + JSON.stringify(parsed)) // Debug log to verify restored session data
    } catch {
      localStorage.removeItem('auth')
    }
  }

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isUser = computed(() => user.value?.role === 'user')

  function persistSession() {
    localStorage.setItem('auth', JSON.stringify({ user: user.value, token: token.value }))
  }

  async function login(email: string, password: string) {
    loginError.value = ''
    try {
      const res = await fetch('/users.json')
      const datas = await res.json()
      const data = datas.users.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password,
      )

      if (!data) {
        loginError.value = 'Invalid email or password'
        return false
      }

      user.value = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      }
      token.value = data.token
      persistSession()

      // Redirect based on role
      if (data.role === 'admin') {
        router.push('/admin/dashboard')
        console.log('Admin logged in')
        console.log('ADMIN DATA' + JSON.stringify(data)) // Debug log to verify admin data
      } else {
        router.push('/home')
        console.log('User logged in')
      }

      return true
    } catch {
      loginError.value = 'Something went wrong. Please try again.'
      return false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    loginError.value = ''
    localStorage.removeItem('auth')
    router.push('/')
    console.log('User logged out')
  }

  return {
    user,
    token,
    loginError,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    logout,
  }
})
