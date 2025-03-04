"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface OvertimeCategory {
  name: string;
  rate: number;
  hours: number;
  otPerHour: number;
  amount: number;
  baseIndex?: number;
}

interface AllowanceCalculation {
  name: string;
  basis: string;
  value: number;
  rate: number;
  amount: number;
}

export default function OvertimeComputationForm() {
  const [monthly, setMonthly] = useState<number>(0);
  const [workingDaysCompany, setWorkingDaysCompany] = useState<number>(0);
  const [workingDaysBusinessTrip, setWorkingDaysBusinessTrip] =
    useState<number>(0);

  // Calculated rates
  const dailyRate = monthly / 23.75;
  const semiMonthly = monthly / 2;
  const hrRate = dailyRate / 8;

  const [overtimeCategories, setOvertimeCategories] = useState<
    OvertimeCategory[]
  >([
    { name: "Regular OT", rate: 1.25, hours: 0, otPerHour: 0, amount: 0 },
    { name: "Restday OT", rate: 1.69, hours: 0, otPerHour: 0, amount: 0 },
    {
      name: "Special Holiday (regular day)",
      rate: 1.3,
      hours: 0,
      otPerHour: 0,
      amount: 0,
    },
    {
      name: "Special Holiday (regular day excess 8hrs)",
      rate: 0,
      hours: 0,
      otPerHour: 0,
      amount: 0,
      baseIndex: 2,
    },
    {
      name: "Special Holiday (rest day)",
      rate: 1.5,
      hours: 0,
      otPerHour: 0,
      amount: 0,
    },
    {
      name: "Special Holiday (rest day excess 8hrs)",
      rate: 0,
      hours: 0,
      otPerHour: 0,
      amount: 0,
      baseIndex: 4,
    },
    {
      name: "Legal Holiday (regular day)",
      rate: 2.0,
      hours: 0,
      otPerHour: 0,
      amount: 0,
    },
    {
      name: "Legal Holiday (regular day excess 8hrs)",
      rate: 0,
      hours: 0,
      otPerHour: 0,
      amount: 0,
      baseIndex: 6,
    },
    {
      name: "Legal Holiday (rest day)",
      rate: 2.6,
      hours: 0,
      otPerHour: 0,
      amount: 0,
    },
    {
      name: "Legal Holiday (rest day excess 8hrs)",
      rate: 0,
      hours: 0,
      otPerHour: 0,
      amount: 0,
      baseIndex: 8,
    },
  ]);

  const updateOvertimeHours = (index: number, hours: number) => {
    const updatedCategories = overtimeCategories.map((category, i) => {
      if (i === index) {
        let otPerHour: number;
        let rate: number;

        if (category.baseIndex !== undefined) {
          // For excess hours categories
          const baseCategory = overtimeCategories[category.baseIndex];
          const baseOTPerHour = hrRate * baseCategory.rate;
          otPerHour = baseOTPerHour + baseOTPerHour * 0.3;
          rate = otPerHour / hrRate; // Calculate the effective rate
        } else {
          // For regular categories
          rate = category.rate;
          otPerHour = hrRate * rate;
        }

        return {
          ...category,
          hours,
          rate,
          otPerHour,
          amount: hours * otPerHour,
        };
      }
      return category;
    });
    setOvertimeCategories(updatedCategories);
  };

  // Calculate totals
  const totalOTHours = overtimeCategories.reduce(
    (sum, category) => sum + category.hours,
    0
  );
  const totalOTAmount = overtimeCategories.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  // Calculate allowances
  const allowances: AllowanceCalculation[] = [
    {
      name: "Meal Allowance (MA)",
      basis: "No. of working days (company)",
      value: workingDaysCompany,
      rate: 100,
      amount: workingDaysCompany * 100,
    },
    {
      name: "OT Meal Transpo Allowance (OTMA)",
      basis: "Total OT hours",
      value: totalOTHours,
      rate: 100,
      amount: (totalOTHours/8) * 100,
    },
    {
      name: "OT Transpo Allowance (OTTA)",
      basis: "Total OT hours",
      value: totalOTHours,
      rate: 10,
      amount: (totalOTHours/8) * 10,
    },
    {
      name: "OB Meal Allowance (OBM)",
      basis: "No. of working days (business trip)",
      value: workingDaysBusinessTrip,
      rate: 60,
      amount: workingDaysBusinessTrip * 60,
    },
  ];

  const finalTotal =
    semiMonthly +
    totalOTAmount +
    allowances.reduce((sum, allowance) => sum + allowance.amount, 0);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Computation of Overtime</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Basic Information */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthly">Monthly</Label>
                <div className="relative">
                  <Input
                    id="monthly"
                    type="number"
                    value={monthly || ""}
                    onChange={(e) => setMonthly(Number(e.target.value))}
                    className="pl-8"
                    placeholder="Enter amount"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    ₱
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workingDaysCompany">
                    Working Days (Company)
                  </Label>
                  <Input
                    id="workingDaysCompany"
                    type="number"
                    value={workingDaysCompany || ""}
                    onChange={(e) =>
                      setWorkingDaysCompany(Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="workingDaysBusinessTrip">
                    Working Days (Business Trip)
                  </Label>
                  <Input
                    id="workingDaysBusinessTrip"
                    type="number"
                    value={workingDaysBusinessTrip || ""}
                    onChange={(e) =>
                      setWorkingDaysBusinessTrip(Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Calculated Rates */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Daily Rate</Label>
                <Input value={`₱${dailyRate.toFixed(2)}`} readOnly />
              </div>
              <div>
                <Label>Semi-monthly</Label>
                <Input value={`₱${semiMonthly.toFixed(2)}`} readOnly />
              </div>
              <div>
                <Label>HR Rate</Label>
                <Input value={`₱${hrRate.toFixed(2)}`} readOnly />
              </div>
            </div>
          </div>

          {/* Overtime Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Overtime</TableHead>
                  <TableHead className="w-[100px]">OT Rate</TableHead>
                  <TableHead className="w-[120px]">OT per Hr</TableHead>
                  <TableHead className="w-[120px]">Ex. OT hrs</TableHead>
                  <TableHead className="w-[120px] text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overtimeCategories.map((category, index) => (
                  <TableRow key={category.name}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.baseIndex !== undefined
                        ? `${(
                            overtimeCategories[category.baseIndex].rate *
                            1.3 *
                            100
                          ).toFixed(0)}%`
                        : `${(category.rate * 100).toFixed(0)}%`}
                    </TableCell>
                    <TableCell>
                      ₱
                      {category.baseIndex !== undefined
                        ? (
                            hrRate *
                            overtimeCategories[category.baseIndex].rate *
                            1.3
                          ).toFixed(2)
                        : (hrRate * category.rate).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={category.hours || ""}
                        onChange={(e) =>
                          updateOvertimeHours(index, Number(e.target.value))
                        }
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      ₱{category.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell className="font-medium">Total OT hrs</TableCell>
                  <TableCell className="text-right font-medium">
                    {totalOTHours.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Allowances */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Basic</TableHead>
                  <TableHead>Basis</TableHead>
                  <TableHead className="w-[100px]">Value</TableHead>
                  <TableHead className="w-[100px]">Rate</TableHead>
                  <TableHead className="w-[120px] text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Basic</TableCell>
                  <TableCell>Semi-monthly</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right">
                    ₱{semiMonthly.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>OT</TableCell>
                  <TableCell>amount</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right">
                    ₱{totalOTAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
                {allowances.map((allowance) => (
                  <TableRow key={allowance.name}>
                    <TableCell>{allowance.name}</TableCell>
                    <TableCell>{allowance.basis}</TableCell>
                    <TableCell>{allowance.value.toFixed(2)}</TableCell>
                    <TableCell>₱{allowance.rate.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      ₱{allowance.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="font-medium">
                    TOTAL
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₱{finalTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
