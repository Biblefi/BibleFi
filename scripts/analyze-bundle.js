#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔍 Analyzing bundle performance...\n')

// Build the project first
console.log('📦 Building project...')
try {
  execSync('npm run build', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}

// Analyze bundle sizes
const distPath = path.join(process.cwd(), 'dist')
const assetsPath = path.join(distPath, 'assets')

if (!fs.existsSync(assetsPath)) {
  console.error('❌ Assets directory not found')
  process.exit(1)
}

console.log('\n📊 Bundle Analysis:')
console.log('=' * 50)

const files = fs.readdirSync(assetsPath)
let totalSize = 0

const sizeCategories = {
  js: { files: [], totalSize: 0 },
  css: { files: [], totalSize: 0 },
  other: { files: [], totalSize: 0 }
}

files.forEach(file => {
  const filePath = path.join(assetsPath, file)
  const stats = fs.statSync(filePath)
  const size = stats.size
  const sizeKB = (size / 1024).toFixed(2)
  
  totalSize += size
  
  const ext = path.extname(file).slice(1)
  const category = ext === 'js' ? 'js' : ext === 'css' ? 'css' : 'other'
  
  sizeCategories[category].files.push({ file, size: sizeKB })
  sizeCategories[category].totalSize += size
})

// Display results
Object.entries(sizeCategories).forEach(([category, data]) => {
  if (data.files.length > 0) {
    console.log(`\n${category.toUpperCase()} Files:`)
    data.files
      .sort((a, b) => parseFloat(b.size) - parseFloat(a.size))
      .forEach(({ file, size }) => {
        const status = parseFloat(size) > 1000 ? '⚠️ ' : parseFloat(size) > 500 ? '🟡' : '✅'
        console.log(`  ${status} ${file}: ${size} KB`)
      })
    console.log(`  Total ${category}: ${(data.totalSize / 1024).toFixed(2)} KB`)
  }
})

console.log(`\n📏 Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`)

// Performance recommendations
console.log('\n💡 Performance Recommendations:')
const jsSize = sizeCategories.js.totalSize / 1024
const cssSize = sizeCategories.css.totalSize / 1024

if (jsSize > 1000) {
  console.log('⚠️  JavaScript bundle is large (>1MB). Consider code splitting.')
}
if (cssSize > 200) {
  console.log('⚠️  CSS bundle is large (>200KB). Consider critical CSS extraction.')
}
if (totalSize / 1024 > 1500) {
  console.log('⚠️  Total bundle size is large (>1.5MB). Optimize images and dependencies.')
} else if (totalSize / 1024 < 500) {
  console.log('✅ Bundle size is optimal!')
} else {
  console.log('🟡 Bundle size is acceptable but could be optimized.')
}

console.log('\n🚀 Performance Tips:')
console.log('• Use dynamic imports for large dependencies')
console.log('• Implement lazy loading for routes and components')
console.log('• Optimize images with modern formats (WebP, AVIF)')
console.log('• Enable gzip/brotli compression on your server')
console.log('• Use a CDN for static assets')

console.log('\n✨ Analysis complete!')