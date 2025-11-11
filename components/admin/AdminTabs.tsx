'use client'

import { LucideIcon } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
  description: string
}

interface AdminTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminTabs({ tabs, activeTab, onTabChange }: AdminTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-3 px-6 py-4 border-b-2 transition-all min-w-fit
              ${isActive
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-text-secondary hover:text-text-dark hover:bg-gray-50'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs opacity-75">{tab.description}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
