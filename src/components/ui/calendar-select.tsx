"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface CalendarSelectProps {
  month: number
  year: number
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function CalendarSelect({ month, year, onMonthChange, onYearChange }: CalendarSelectProps) {
  const years = React.useMemo(() => {
    const yearArray = []
    for (let i = 1900; i <= 2300; i++) {
      yearArray.push(i)
    }
    return yearArray
  }, [])

  const handleMonthChange = (value: string) => {
    onMonthChange(Number.parseInt(value, 10))
  }

  const handleYearChange = (value: string) => {
    onYearChange(Number.parseInt(value, 10))
  }

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-1">
        <Select value={month.toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className="h-8 w-[110px]">
            <SelectValue>{months[month]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((monthName, index) => (
              <SelectItem key={monthName} value={index.toString()}>
                {monthName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" className="h-7 w-7 p-0" onClick={() => onYearChange(year - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Select value={year.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="h-8 w-[80px]">
            <SelectValue>{year}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" className="h-7 w-7 p-0" onClick={() => onYearChange(year + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

