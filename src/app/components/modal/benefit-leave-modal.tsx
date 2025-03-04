import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface LeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

interface LeaveInfo {
  type: string
  qualified: string
  purpose: string
  reason: string
  days: string
  conditions: string
}

const govtLeaves: LeaveInfo[] = [
  {
    type: "Paternity Leave",
    qualified: "Male Associates",
    purpose: "To support spouse during childbirth",
    reason: "Childbirth of legitimate spouse",
    days: "7 calendar days",
    conditions: "Must be used within 60 days from date of delivery"
  },
  {
    type: "Maternity Leave",
    qualified: "Female Associates",
    purpose: "For delivery and recovery",
    reason: "Childbirth or miscarriage",
    days: "105 calendar days",
    conditions: "Additional 15 days for single mothers"
  },
  {
    type: "Solo Parent Leave",
    qualified: "Single Parents",
    purpose: "To perform parental duties",
    reason: "Parental responsibilities",
    days: "7 working days",
    conditions: "Must have Solo Parent ID"
  },
  {
    type: "Magna Carta",
    qualified: "Female Associates",
    purpose: "For gynecological concerns",
    reason: "Surgery due to gynecological disorders",
    days: "2 months",
    conditions: "Must be certified by healthcare provider"
  }
]

const VLSLModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [showLeaveCredits, setShowLeaveCredits] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>VL/SL</DialogTitle>
        </DialogHeader>
        <Button onClick={() => setShowLeaveCredits(true)}>Leave Credits</Button>
      </DialogContent>
      {showLeaveCredits && <LeaveCreditsModal isOpen={showLeaveCredits} onClose={() => setShowLeaveCredits(false)} />}
    </Dialog>
  );
};

const LeaveCreditsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedYears, setSelectedYears] = useState<string | null>(null)

  const yearRanges = [
    "1-4 years",
    "5-9 years",
    "10-14 years",
    "15-19 years",
    "20-24 years",
    "25-29 years",
    "30-34 years"
  ]

  const renderQuarterlyTable = (years: string) => {
    // Get credits based on years of service
    const getCredits = (years: string) => {
      const yearStart = parseInt(years.split('-')[0])
      if (yearStart < 5) return 1
      if (yearStart < 10) return 1.08
      if (yearStart < 15) return 1.17
      if (yearStart < 20) return 1.25
      if (yearStart < 25) return 1.33
      if (yearStart < 30) return 1.42
      if (yearStart < 35) return 1.50
      return 2.75
    }

    const monthlyCredit = getCredits(years)
    const quarterlyCredit = monthlyCredit * 3

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border text-left">Quarter</th>
              <th className="px-4 py-2 border text-left">Covered Months</th>
              <th colSpan={3} className="px-4 py-2 border text-center">
                VLWP & SLWP Credits<br />
                (based on {years})
              </th>
              <th className="px-4 py-2 border text-left">Crediting Every</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border"></th>
              <th className="px-4 py-2 border"></th>
              <th className="px-4 py-2 border text-center">Type</th>
              <th className="px-4 py-2 border text-center">Monthly</th>
              <th className="px-4 py-2 border text-center">Quarterly</th>
              <th className="px-4 py-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {[
              { quarter: "1st Quarter", months: "Jan-Mar", date: "1-Jan" },
              { quarter: "2nd Quarter", months: "Apr-Jun", date: "1-Apr" },
              { quarter: "3rd Quarter", months: "Jul-Sep", date: "1-Jul" },
              { quarter: "4th Quarter", months: "Oct-Dec", date: "1-Oct" }
            ].map((q) => (
              <React.Fragment key={q.quarter}>
                <tr>
                  <td rowSpan={2} className="px-4 py-2 border">
                    {q.quarter}
                  </td>
                  <td rowSpan={2} className="px-4 py-2 border">
                    {q.months}
                  </td>
                  <td className="px-4 py-2 border">VLWP</td>
                  <td className="px-4 py-2 border text-center">{monthlyCredit.toFixed(2)} day</td>
                  <td className="px-4 py-2 border text-center">{quarterlyCredit.toFixed(2)} days</td>
                  <td rowSpan={2} className="px-4 py-2 border">
                    {q.date}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">SLWP</td>
                  <td className="px-4 py-2 border text-center">{monthlyCredit.toFixed(2)} day</td>
                  <td className="px-4 py-2 border text-center">{quarterlyCredit.toFixed(2)} days</td>
                </tr>
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={2} className="px-4 py-2 border font-semibold">Total # of</td>
              <td className="px-4 py-2 border">VLWP</td>
              <td className="px-4 py-2 border text-center">{(quarterlyCredit * 4).toFixed(2)} days</td>
              <td className="px-4 py-2 border text-center">{(quarterlyCredit * 4).toFixed(2)} days</td>
            </tr>
            <tr>
              <td colSpan={2} className="px-4 py-2 border">VLWP/ SLWP</td>
              <td className="px-4 py-2 border">SLWP</td>
              <td className="px-4 py-2 border text-center">{(quarterlyCredit * 4).toFixed(2)} days</td>
              <td className="px-4 py-2 border text-center">{(quarterlyCredit * 4).toFixed(2)} days</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Leave Credits</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {yearRanges.map((years) => (
            <Button
              key={years}
              onClick={() => setSelectedYears(years)}
              variant={selectedYears === years ? "default" : "outline"}
            >
              {years}
            </Button>
          ))}
        </div>
        {selectedYears && renderQuarterlyTable(selectedYears)}
      </DialogContent>
    </Dialog>
  )
}

const GuidelinesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Guidelines</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          * Leave Credit Guidelines
          The following guidelines must be followed in relation to the VLWP and SLWP Privilege: (For more details, refer to the Policy on Vacation Leave, Sick Leave, and Emergency Leave):
          * Leave Credits (VLWP/ SLWP) shall not accrue/ earn during periods of suspension or long vacation leave without pay.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

const GovtLeavesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedLeave, setSelectedLeave] = useState<string | null>(null)

  const renderTable = (leaveType: string) => {
    if (leaveType === "Summary") {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left">Leave Type</th>
                <th className="px-4 py-2 border text-left">Qualified Associates</th>
                <th className="px-4 py-2 border text-left">Purpose</th>
                <th className="px-4 py-2 border text-left">Reason</th>
                <th className="px-4 py-2 border text-left">Days to Avail</th>
                <th className="px-4 py-2 border text-left">Conditions</th>
              </tr>
            </thead>
            <tbody>
              {govtLeaves.map((leave) => (
                <tr key={leave.type}>
                  <td className="px-4 py-2 border font-medium">{leave.type}</td>
                  <td className="px-4 py-2 border">{leave.qualified}</td>
                  <td className="px-4 py-2 border">{leave.purpose}</td>
                  <td className="px-4 py-2 border">{leave.reason}</td>
                  <td className="px-4 py-2 border">{leave.days}</td>
                  <td className="px-4 py-2 border">{leave.conditions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    const selectedLeaveInfo = govtLeaves.find(leave => leave.type === leaveType)
    if (!selectedLeaveInfo) return null

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <tbody>
            <tr>
              <th className="px-4 py-2 border text-left bg-gray-50 w-1/3">Leave Type</th>
              <td className="px-4 py-2 border font-medium">{selectedLeaveInfo.type}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border text-left bg-gray-50">Qualified Associates</th>
              <td className="px-4 py-2 border">{selectedLeaveInfo.qualified}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border text-left bg-gray-50">Purpose</th>
              <td className="px-4 py-2 border">{selectedLeaveInfo.purpose}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border text-left bg-gray-50">Reason</th>
              <td className="px-4 py-2 border">{selectedLeaveInfo.reason}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border text-left bg-gray-50">Days to Avail</th>
              <td className="px-4 py-2 border">{selectedLeaveInfo.days}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 border text-left bg-gray-50">Conditions</th>
              <td className="px-4 py-2 border">{selectedLeaveInfo.conditions}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Government Mandated Leaves</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {govtLeaves.map((leave) => (
            <Button
              key={leave.type}
              onClick={() => setSelectedLeave(leave.type)}
              variant={selectedLeave === leave.type ? "default" : "outline"}
            >
              {leave.type}
            </Button>
          ))}
          <Button
            onClick={() => setSelectedLeave("Summary")}
            variant={selectedLeave === "Summary" ? "default" : "outline"}
            className="col-span-full"
          >
            View All Leaves
          </Button>
        </div>
        {selectedLeave && renderTable(selectedLeave)}
      </DialogContent>
    </Dialog>
  )
}

const BenefitLeaveModal: React.FC<LeaveModalProps> = ({ 
  isOpen, 
  onClose, 
  title
}) => {
  const [showVLSL, setShowVLSL] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showGovtLeaves, setShowGovtLeaves] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Button onClick={() => setShowVLSL(true)} className="w-full">
              VL/SL
            </Button>
            <Button onClick={() => setShowGuidelines(true)} className="w-full">
              Guidelines
            </Button>
            <Button onClick={() => setShowGovtLeaves(true)} className="w-full">
              Govt. Leaves
            </Button>
          </div>
        </div>
      </DialogContent>
      {showVLSL && <VLSLModal isOpen={showVLSL} onClose={() => setShowVLSL(false)} />}
      {showGuidelines && <GuidelinesModal isOpen={showGuidelines} onClose={() => setShowGuidelines(false)} />}
      {showGovtLeaves && <GovtLeavesModal isOpen={showGovtLeaves} onClose={() => setShowGovtLeaves(false)} />}
    </Dialog>
  );
}

export default BenefitLeaveModal