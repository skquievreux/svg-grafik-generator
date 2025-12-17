#!/usr/bin/env tsx

/**
 * Icon Coverage Report Generator
 *
 * This script analyzes the icon mapping coverage and identifies
 * which icons need AI generation.
 */

import { galleryIcons } from '../app/api/gallery/data';
import { IconMapper } from '../lib/icons/icon-mapper';
import * as fs from 'fs';
import * as path from 'path';

function generateReport() {
  console.log('🔍 Analyzing icon mappings...\n');

  // Map all icons
  const mappings = IconMapper.mapAllIcons(galleryIcons);

  // Generate coverage report
  const report = IconMapper.generateCoverageReport(mappings);

  console.log('📊 ICON COVERAGE REPORT');
  console.log('═'.repeat(50));
  console.log(`Total Icons:           ${report.total}`);
  console.log(`Primary Mapped:        ${report.primaryMapped} (${((report.primaryMapped / report.total) * 100).toFixed(1)}%)`);
  console.log(`Tag-Based Mapped:      ${report.tagBased} (${((report.tagBased / report.total) * 100).toFixed(1)}%)`);
  console.log(`Missing/Low Conf:      ${report.missing} (${((report.missing / report.total) * 100).toFixed(1)}%)`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`Overall Coverage:      ${report.coveragePercentage.toFixed(1)}%`);
  console.log('═'.repeat(50));

  // Category breakdown
  console.log('\n📁 COVERAGE BY CATEGORY');
  console.log('═'.repeat(50));

  const categories = new Set(galleryIcons.map(icon => icon.category));

  for (const category of Array.from(categories).sort()) {
    const categoryIcons = galleryIcons.filter(icon => icon.category === category);
    const categoryMappings = categoryIcons.map(icon => ({
      icon,
      mapping: mappings.get(icon.name)!
    }));

    const mapped = categoryMappings.filter(
      m => m.mapping.confidence >= 0.6 && m.mapping.lucideIcon !== null
    ).length;

    const coverage = (mapped / categoryIcons.length) * 100;
    const bar = '█'.repeat(Math.floor(coverage / 5)) + '░'.repeat(20 - Math.floor(coverage / 5));

    console.log(`${category.padEnd(15)} ${bar} ${mapped}/${categoryIcons.length} (${coverage.toFixed(0)}%)`);
  }

  // Missing icons details
  if (report.missingIcons.length > 0) {
    console.log('\n❌ ICONS REQUIRING AI GENERATION');
    console.log('═'.repeat(50));

    const missingByCategory = new Map<string, string[]>();

    for (const iconName of report.missingIcons) {
      const icon = galleryIcons.find(i => i.name === iconName);
      if (icon) {
        if (!missingByCategory.has(icon.category)) {
          missingByCategory.set(icon.category, []);
        }
        missingByCategory.get(icon.category)!.push(iconName);
      }
    }

    for (const [category, icons] of Array.from(missingByCategory.entries()).sort()) {
      console.log(`\n📂 ${category.toUpperCase()}`);
      icons.forEach(icon => console.log(`   • ${icon}`));
    }
  }

  // High confidence tag-based matches
  const tagBasedMatches = Array.from(mappings.entries())
    .filter(([_, m]) => m.source === 'tag-based' && m.confidence >= 0.6)
    .sort((a, b) => b[1].confidence - a[1].confidence);

  if (tagBasedMatches.length > 0) {
    console.log('\n✨ TAG-BASED MATCHES (High Confidence)');
    console.log('═'.repeat(50));
    tagBasedMatches.slice(0, 10).forEach(([name, mapping]) => {
      console.log(`${name.padEnd(30)} → ${mapping.lucideIcon} (${(mapping.confidence * 100).toFixed(0)}%)`);
    });
    if (tagBasedMatches.length > 10) {
      console.log(`... and ${tagBasedMatches.length - 10} more`);
    }
  }

  // Export JSON report
  const jsonReport = {
    timestamp: new Date().toISOString(),
    summary: report,
    mappings: Array.from(mappings.entries()).map(([name, mapping]) => ({
      name,
      ...mapping,
    })),
  };

  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportPath = path.join(reportsDir, 'icon-coverage-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(jsonReport, null, 2));

  console.log(`\n💾 Detailed report saved to: ${reportPath}`);

  // AI Generation estimate
  console.log('\n💰 AI GENERATION COST ESTIMATE');
  console.log('═'.repeat(50));
  console.log(`Icons to generate:     ${report.missing}`);
  console.log(`Estimated cost:        $${(report.missing * 0.013).toFixed(2)} (Replicate SD)`);
  console.log(`Estimated time:        ~${Math.ceil(report.missing * 1.5)} minutes`);
  console.log('═'.repeat(50));

  return report;
}

// Run if executed directly
if (require.main === module) {
  generateReport();
}

export { generateReport };
