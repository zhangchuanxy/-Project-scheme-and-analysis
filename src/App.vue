<template>
  <div class="app-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="sidebar">
        <div class="logo">
          <h2>📊 方案分析系统</h2>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          @select="handleMenuSelect"
        >
          <el-menu-item index="1" @click="goTo('/dashboard')">📈 仪表板</el-menu-item>
          <el-menu-item index="2" @click="goTo('/file-import')">📁 文件导入</el-menu-item>
          <el-menu-item index="3" @click="goTo('/data-manager')">📋 数据管理</el-menu-item>
          <el-menu-item index="4" @click="goTo('/data-analysis')">📊 数据分析</el-menu-item>
          <el-menu-item index="5" @click="goTo('/chart-manager')">📈 图表管理</el-menu-item>
          <el-menu-item index="6" @click="goTo('/scheme-manager')">🔧 方案管理</el-menu-item>
          <el-menu-item index="7" @click="goTo('/comparison')">🔄 数据对比</el-menu-item>
          <el-menu-item index="8" @click="goTo('/settings')">⚙️ 系统设置</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header class="app-header">
          <div class="header-content">
            <div class="title">{{ pageTitle }}</div>
            <div class="actions">
              <el-tooltip content="刷新数据">
                <el-button type="primary" size="small" @click="refreshData">
                  🔄 刷新
                </el-button>
              </el-tooltip>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  👤 {{ currentUser }}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                    <el-dropdown-item command="settings">设置</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>

        <!-- 主内容区 -->
        <el-main class="app-main">
          <RouterView v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" :key="$route.path" />
            </transition>
          </RouterView>
        </el-main>

        <!-- 页脚 -->
        <el-footer class="app-footer">
          <p>&copy; 2024 项目方案管理和数据分析系统 | 版本: 1.0.0</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('1')
const currentUser = ref('用户')

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': '仪表板',
    '/file-import': '文件导入',
    '/data-manager': '数据管理',
    '/data-analysis': '数据分析',
    '/chart-manager': '图表管理',
    '/scheme-manager': '方案管理',
    '/comparison': '数据对比分析',
    '/settings': '系统设置'
  }
  return titles[route.path] || '项目方案管理和数据分析系统'
})

const goTo = (path) => {
  router.push(path)
}

const handleMenuSelect = (index) => {
  activeMenu.value = index
}

const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessage.success('已退出登录')
    localStorage.removeItem('currentUser')
  } else {
    ElMessage.info(`跳转到${command}`)
  }
}

const refreshData = () => {
  ElMessage.success('数据已刷新')
}

onMounted(() => {
  const user = localStorage.getItem('currentUser') || '张川'
  currentUser.value = user
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
}

.sidebar {
  background-color: #263238;
  color: #fff;
  padding: 20px 0;
  overflow-y: auto;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #455a64;
  margin-bottom: 20px;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
}

.el-menu-vertical {
  border-right: none;
  background-color: #263238;
}

:deep(.el-menu-vertical .el-menu-item) {
  background-color: #263238;
  color: #eceff1;
}

:deep(.el-menu-vertical .el-menu-item:hover) {
  background-color: #455a64 !important;
}

:deep(.el-menu-vertical .el-menu-item.is-active) {
  background-color: #00bcd4 !important;
  color: #fff !important;
}

.app-header {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e0e6ed;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  display: flex;
  align-items: center;
  gap: 5px;
}

.app-main {
  background-color: #f0f2f5;
  overflow-y: auto;
  padding: 20px;
}

.app-footer {
  background-color: #263238;
  color: #eceff1;
  text-align: center;
  font-size: 12px;
  padding: 10px 0;
}

.app-footer p {
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
