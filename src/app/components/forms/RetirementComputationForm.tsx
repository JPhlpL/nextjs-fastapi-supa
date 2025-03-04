"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SimpleCalendar } from "@/components/ui/simple-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ResultFields {
  lengthOfService: number
  creditedService: number
  vestingRights: number
  monthlySalaryPercentage: number
  grossBenefitsDue: number
  total: number
}

const vestingRightsTable: { [key: number]: number } = {
  5: 20,
  6: 30,
  7: 40,
  8: 50,
  9: 70,
  10: 90,
  11: 90,
  12: 90,
  13: 90,
  14: 90,
  15: 90,
  16: 92.5,
  17: 92.5,
  18: 92.5,
  19: 92.5,
  20: 92.5,
}

export default function RetirementComputationForm() {
  const [separationDate, setSeparationDate] = useState<Date | undefined>(undefined)
  const [dateHired, setDateHired] = useState<Date | undefined>(undefined)
  const [monthlySalary, setMonthlySalary] = useState<number>(0)
  const [result, setResult] = useState<ResultFields>({
    lengthOfService: 0,
    creditedService: 0,
    vestingRights: 0,
    monthlySalaryPercentage: 0,
    grossBenefitsDue: 0,
    total: 0,
  })
  const [error, setError] = useState<string | null>(null)

  const getVestingRights = (creditedService: number): number => {
    if (creditedService < 5) return 0
    if (creditedService >= 21) return 92.5
    return vestingRightsTable[creditedService] || 92.5
  }

  const calculateDifference = () => {
    if (!separationDate || !dateHired) {
      setError("Please select both Separation Date and Date Hired")
      return
    }

    if (separationDate < dateHired) {
      setError("Separation Date must not be earlier than Date Hired")
      return
    }

    setError(null)

    const years = separationDate.getFullYear() - dateHired.getFullYear()
    const months = separationDate.getMonth() - dateHired.getMonth()
    const days = separationDate.getDate() - dateHired.getDate()

    let totalYears = years
    let totalMonths = months
    let totalDays = days

    if (totalDays < 0) {
      totalMonths -= 1
      totalDays += 30 // Assuming 30 days per month for simplicity
    }

    if (totalMonths < 0) {
      totalYears -= 1
      totalMonths += 12
    }

    const lengthOfService = totalYears + totalMonths / 12 + totalDays / 365
    const creditedService = lengthOfService % 1 < 0.5 ? Math.floor(lengthOfService) : Math.ceil(lengthOfService);
    const vestingRights = getVestingRights(creditedService)
    const monthlySalaryPercentage = monthlySalary * (vestingRights / 100)
    const grossBenefitsDue = lengthOfService * monthlySalaryPercentage

    setResult({
      lengthOfService,
      creditedService,
      vestingRights,
      monthlySalaryPercentage,
      grossBenefitsDue,
      total: grossBenefitsDue,
    })
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Retirement Computation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Separation Date</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !separationDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {separationDate ? format(separationDate, "MMMM d, yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <SimpleCalendar value={separationDate} onChange={setSeparationDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Date Hired</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dateHired && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateHired ? format(dateHired, "MMMM d, yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <SimpleCalendar value={dateHired} onChange={setDateHired} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Monthly Salary</h3>
            <div className="relative">
              <Input
                id="monthlySalary"
                type="number"
                value={monthlySalary || ""}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="pl-8"
                placeholder="Enter amount"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₱</span>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button onClick={calculateDifference}>Calculate</Button>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Years in Service</Label>
                <Input value={result.lengthOfService.toFixed(2)} readOnly />
              </div>
              <div>
                <Label>Credited Service</Label>
                <Input value={result.creditedService} readOnly />
              </div>
              <div>
                <Label>Vesting Rights (%)</Label>
                <Input value={result.vestingRights.toFixed(2) + "%"} readOnly />
              </div>
              <div>
                <Label>Monthly Salary x Percentage</Label>
                <Input value={`₱${result.monthlySalaryPercentage.toFixed(2)}`} readOnly />
              </div>
              <div>
                <Label>Gross Benefits Due</Label>
                <Input value={`₱${result.grossBenefitsDue.toFixed(2)}`} readOnly />
              </div>
              <div>
                <Label>Total</Label>
                <Input value={`₱${result.total.toFixed(2)}`} readOnly />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}