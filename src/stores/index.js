import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 数据存储
  const datasets = ref([])
  const currentDataset = ref(null)
  const schemes = ref([])
  const currentScheme = ref(null)
  const charts = ref([])
  const analysisResults = ref(null)

  // 获取所有数据集
  const getDatasets = computed(() => datasets.value)

  // 获取所有方案
  const getSchemes = computed(() => schemes.value)

  // 添加数据集
  const addDataset = (dataset) => {
    dataset.id = Date.now()
    dataset.createdAt = new Date().toISOString()
    datasets.value.push(dataset)
    saveToStorage()
    return dataset
  }

  // 更新数据集
  const updateDataset = (id, data) => {
    const index = datasets.value.findIndex(d => d.id === id)
    if (index !== -1) {
      datasets.value[index] = { ...datasets.value[index], ...data, updatedAt: new Date().toISOString() }
      saveToStorage()
    }
  }

  // 删除数据集
  const deleteDataset = (id) => {
    datasets.value = datasets.value.filter(d => d.id !== id)
    saveToStorage()
  }

  // 添加方案
  const addScheme = (scheme) => {
    scheme.id = Date.now()
    scheme.createdAt = new Date().toISOString()
    scheme.version = 1
    schemes.value.push(scheme)
    saveToStorage()
    return scheme
  }

  // 更新方案
  const updateScheme = (id, data) => {
    const index = schemes.value.findIndex(s => s.id === id)
    if (index !== -1) {
      schemes.value[index] = { ...schemes.value[index], ...data, updatedAt: new Date().toISOString() }
      saveToStorage()
    }
  }

  // 删除方案
  const deleteScheme = (id) => {
    schemes.value = schemes.value.filter(s => s.id !== id)
    saveToStorage()
  }

  // 设置当前数据集
  const setCurrentDataset = (dataset) => {
    currentDataset.value = dataset
  }

  // 设置当前方案
  const setCurrentScheme = (scheme) => {
    currentScheme.value = scheme
  }

  // 添加图表
  const addChart = (chart) => {
    chart.id = Date.now()
    chart.createdAt = new Date().toISOString()
    charts.value.push(chart)
    saveToStorage()
    return chart
  }

  // 删除图表
  const deleteChart = (id) => {
    charts.value = charts.value.filter(c => c.id !== id)
    saveToStorage()
  }

  // 保存分析结果
  const setAnalysisResults = (results) => {
    analysisResults.value = results
  }

  // 本地存储管理
  const saveToStorage = () => {
    const data = {
      datasets: datasets.value,
      schemes: schemes.value,
      charts: charts.value
    }
    localStorage.setItem('projectData', JSON.stringify(data))
  }

  // 从本地存储加载
  const loadFromStorage = () => {
    const data = localStorage.getItem('projectData')
    if (data) {
      const parsed = JSON.parse(data)
      datasets.value = parsed.datasets || []
      schemes.value = parsed.schemes || []
      charts.value = parsed.charts || []
    }
  }

  // 清空所有数据
  const clearAll = () => {
    datasets.value = []
    schemes.value = []
    charts.value = []
    analysisResults.value = null
    currentDataset.value = null
    currentScheme.value = null
    localStorage.removeItem('projectData')
  }

  // 导出数据
  const exportData = () => {
    const data = {
      datasets: datasets.value,
      schemes: schemes.value,
      charts: charts.value,
      exportTime: new Date().toISOString()
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `project-data-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // 导入数据
  const importData = (data) => {
    if (data.datasets) datasets.value = data.datasets
    if (data.schemes) schemes.value = data.schemes
    if (data.charts) charts.value = data.charts
    saveToStorage()
  }

  return {
    // State
    datasets,
    currentDataset,
    schemes,
    currentScheme,
    charts,
    analysisResults,
    // Getters
    getDatasets,
    getSchemes,
    // Actions
    addDataset,
    updateDataset,
    deleteDataset,
    addScheme,
    updateScheme,
    deleteScheme,
    setCurrentDataset,
    setCurrentScheme,
    addChart,
    deleteChart,
    setAnalysisResults,
    saveToStorage,
    loadFromStorage,
    clearAll,
    exportData,
    importData
  }
})
