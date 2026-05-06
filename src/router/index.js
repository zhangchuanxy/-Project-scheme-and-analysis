import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import FileImport from '@/views/FileImport.vue'
import DataManager from '@/views/DataManager.vue'
import DataAnalysis from '@/views/DataAnalysis.vue'
import ChartManager from '@/views/ChartManager.vue'
import SchemeManager from '@/views/SchemeManager.vue'
import ComparisonAnalysis from '@/views/ComparisonAnalysis.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/file-import',
    name: 'FileImport',
    component: FileImport
  },
  {
    path: '/data-manager',
    name: 'DataManager',
    component: DataManager
  },
  {
    path: '/data-analysis',
    name: 'DataAnalysis',
    component: DataAnalysis
  },
  {
    path: '/chart-manager',
    name: 'ChartManager',
    component: ChartManager
  },
  {
    path: '/scheme-manager',
    name: 'SchemeManager',
    component: SchemeManager
  },
  {
    path: '/comparison',
    name: 'ComparisonAnalysis',
    component: ComparisonAnalysis
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
