"use client"

import * as React from "react"
import { CalendarSelect } from "./calendar-select"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface SimpleCalendarProps {
  value?: Date
  onChange?: (date: Date) => void
}

export function SimpleCalendar({ value, onChange }: SimpleCalendarProps) {
  const [month, setMonth] = React.useState(value ? value.getMonth() : new Date().getMonth())
  const [year, setYear] = React.useState(value ? value.getFullYear() : new Date().getFullYear())

  const days = React.useMemo(() => {
    const getDaysInMonth = (month: number, year: number) => {
      return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (month: number, year: number) => {
      return new Date(year, month, 1).getDay()
    }

    const daysInMonth = getDaysInMonth(month, year)
    const firstDay = getFirstDayOfMonth(month, year)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }, [month, year]) // Removed the functions from dependencies

  const handleDateSelect = (day: number) => {
    if (onChange) {
      onChange(new Date(year, month, day))
    }
  }

  const isSelected = (day: number) => {
    return value?.getDate() === day && value?.getMonth() === month && value?.getFullYear() === year
  }

  return (
    <div className="w-[280px] bg-white rounded-md shadow-md">
      <CalendarSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
      <div className="p-2">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index}>
              {day ? (
                <Button
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 font-normal",
                    isSelected(day) &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </Button>
              ) : (
                <div className="h-8 w-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}