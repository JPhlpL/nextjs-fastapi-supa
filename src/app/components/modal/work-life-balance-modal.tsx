import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface LeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
interface OTLeaveInfo {
  item: string;
  criteria: string[];
}

// Add this new data array
const otLeaveData: OTLeaveInfo[] = [
  {
    item: "1. Eligibility",
    criteria: [
      "Employment Status : Regular Associates only",
      "Direct Associates : Not allowed (except SV and above from Production, IC and QAF)",
      "Indirect Associates: Allowed"
    ]
  },
  {
    item: "2. Minimum accumulated OT hours",
    criteria: ["9.02 hours within 1 payroll cut-off"]
  },
  {
    item: "3. Availment for Unpaid OT Leave",
    criteria: [
      "3.1 whole day only (half day not allowed)",
      "3.2 Any day within 2 succeeding payroll cut off",
      "3.3 Maximum of 2 days within the 2 payroll cut off only subject for approval of Dept. Head",
      "3.4 Optional not Mandatory"
    ]
  },
  {
    item: "4. Deduction of Regular Hours during Unpaid OT Leave",
    criteria: ["Deduct from regular hours during the covered payroll period, and will not be charged to Vacation Leave Credits"]
  },
  {
    item: "5. Treatment of absent days during Unpaid OT Leave",
    criteria: ["Excused Leave (no negative impact on Perfect Attendance, Performance Appraisal, etc. since considered as Associate's Privilege)"]
  },
  {
    item: "6. Filing of Unpaid OT Leave",
    criteria: [
      "Should be filed in advance for at least 1 day before the intended date [need to apply leave without pay under Work related – Unpaid OT Leave]",
      "Note: Associate need to attach screenshot of Daily Time Record in Employee Self Service) showing the accumulated hours"
    ]
  }
];

const otWorkflowData = [
  {
    role: "Associate",
    responsibilities: [
      "Fill out Leave Application Form 1 day before the intended date of availment of Unpaid OT Leave",
      "Print and attach Daily Time Record copy from Employee Self Service (ESS)",
      "Secure Approval of Department Head then submit to HR"
    ]
  },
  {
    role: "Department Head",
    responsibilities: [
      "Validates accumulated OT hours of associate if qualified to avail Unpaid OT Leave",
      "Monitor effectiveness together with HRM"
    ]
  },
  {
    role: "HRM",
    responsibilities: [
      "Check submitted Unpaid OT Leave vs applicable accumulated OT hours then input to system to proceed payroll processing",
      "Monitor effectiveness together with Department Head"
    ]
  }
];

const CriteriaModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Unpaid OT Leave Guidelines</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left font-bold w-1/4">ITEM</th>
                <th className="px-4 py-2 border text-left font-bold">CRITERIA</th>
              </tr>
            </thead>
            <tbody>
              {otLeaveData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border align-top">{row.item}</td>
                  <td className="px-4 py-2 border">
                    <ul className="list-none space-y-2">
                      {row.criteria.map((criterion, idx) => (
                        <li key={idx} className="text-sm">
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ResponsibilitiesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Responsibilities</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border text-left font-bold w-1/4">Role</th>
                  <th className="px-4 py-2 border text-left font-bold">Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                {otWorkflowData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border align-top font-medium">{row.role}</td>
                    <td className="px-4 py-2 border">
                      <ul className="list-none space-y-2">
                        {row.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-sm">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FlowModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Process Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-ratio-container">
            <Image 
              src="/UnpaidOTLeaveFlow.png"
              alt="Unpaid OT Leave Process Flow"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const WorkLifeBalanceModal: React.FC<LeaveModalProps> = ({ 
  isOpen, 
  onClose, 
  title
}) => {
  const [showCriteria, setShowCriteria] = useState(false);
  const [showReponsibilities, setShowResponsibilities] = useState(false);
  const [showFlow, setShowFlow] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => setShowCriteria(true)} className="w-full">
            Criteria
          </Button>
          <Button onClick={() => setShowResponsibilities(true)} className="w-full">
            Responsibilities
          </Button>
          <Button onClick={() => setShowFlow(true)} className="w-full">
            Flow
          </Button>
        </div>
      </DialogContent>
      {showCriteria && <CriteriaModal isOpen={showCriteria} onClose={() => setShowCriteria(false)} />}
      {showReponsibilities && <ResponsibilitiesModal isOpen={showReponsibilities} onClose={() => setShowResponsibilities(false)} />}
      {showFlow && <FlowModal isOpen={showFlow} onClose={() => setShowFlow(false)} />}
    </Dialog>
  );
}

export default WorkLifeBalanceModal