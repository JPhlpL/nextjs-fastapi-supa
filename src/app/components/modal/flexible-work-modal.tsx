"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FlexibleWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

// Eligibility Types
interface EligibilityInfo {
  classification: string;
  evaln: string;
  criteria: string[];
}

interface RequirementInfo {
  item: string;
  criteria: string;
  remarks?: string;
}

const eligibilityData: EligibilityInfo[] = [
  {
    classification: "Direct Associates",
    evaln: "Not Qualified",
    criteria: ["-"],
  },
  {
    classification: "Indirect Associates",
    evaln: "Qualified",
    criteria: [
      "Indirect functions except for the following processes:",
      "1.1 Process involving hard copy documentation (i.e. filing, photo copying, document endorsements, etc)",
      "1.2 Process that needs to support manufacturing operations on-site daily (i.e. facilities & machine maintenance, janitorial, nurses, safety officers, etc)",
      "1.3 Probationary associates as they still need direct supervision during their probationary period",
      "Note: Follow matrix for the allowed no. of offsite work days per job level",
    ],
  },
];

// Requirements Types
const requirementsData: RequirementInfo[] = [
  {
    item: "1. Internet Connection",
    criteria: "Minimum speed: 10Mbps",
    remarks: "",
  },
  {
    item: "2. Personal laptop/desktop",
    criteria: "Minimum requirements: Windows 10",
    remarks:
      "If no Personal laptop/desktop, due to limited quantities, DNPH can provide based on priority\nPriority: ① Compliance (payroll, finance); ② Customer (Sales, PC); ③ Supplier (Procurement); ④ Others",
  },
];

// Job Level Types
interface JobLevelInfo {
  level: string;
  daysAllowed: string;
}

const jobLevelData: JobLevelInfo[] = [
  {
    level: "2 to 4",
    daysAllowed: "Max 2 days per week",
  },
  {
    level: "TL to AM",
    daysAllowed: "Max 1 day per week",
  },
  {
    level: "Manager and Above",
    daysAllowed: "Max 1 day per week except Wednesday & Thursday",
  },
];

// Welfare Types
interface WelfareInfo {
  no: number;
  item: string;
  onsite: string;
  offsite: string;
}

const welfareData: WelfareInfo[] = [
  {
    no: 1,
    item: "Salary",
    onsite: "Salary-based",
    offsite: "Same",
  },
  {
    no: 2,
    item: "Transportation Allowance",
    onsite: "Shuttle Service",
    offsite: "Not Applicable",
  },
  {
    no: 3,
    item: "Meal Allowance",
    onsite: "Yes",
    offsite: "Same",
  },
  {
    no: 4,
    item: "Perfect Attendance",
    onsite: "Yes",
    offsite: "Same",
  },
  {
    no: 5,
    item: "Other Benefits",
    onsite: "Yes",
    offsite: "Same",
  },
];

interface ResponsibilitiesInfo {
  title: string;
  body: string[];
}

const responsibilitiesData: ResponsibilitiesInfo[] = [
  {
    title: "Department Head / Division Head",
    body: [
      "* Identify Functions possible for Offsite Work",
      "* Reports status & problems encountered during Offsite Work to Unit Head",
      "* Clearly communicate work expectations and result timeline to the associate",
      "* Monitor and Evaluate work output during the associate’s Offsite Work"
    ],
  },
  {
    title: "Unit Head",
    body: [
      "* Finally approve application for Offsite Work",
      "* Suspend Offsite work anytime based on judgement of work result or needs of the organization",
      "* Clearly communicate work expectations and result timeline to the associate",
      "* Monitor and Evaluate work output during the associate’s Offsite Work"
    ],
  },
  {
    title: "Associate",
    body: [
      "* Fill out Offsite Work Application Form",
      "* Request for Remote Access Requisition Form from ISD",
      "* Sign DNPH Offsite Work Agreement and always follow IS Rule",
      "* Ensure the availability of personal hardware, software and required internet connection speed",
      "* Maintain Confidentiality on Company’s data and information",
      "* Ensures on-time communication with DNPH associates during working time",
      "* Reports abnormal condition to superior timely",
      "* Submit daily actual work output to Dept. Head / Division Head"
    ],
  },
  {
    title: "ISD",
    body: [
      "* Review and judge associate’s internet connection speed and Personal PC/Laptop OS requirement if meets Offsite Work requirements",
      "* Provide Laptop to associate without personal PC/Laptop based on priority functions",
      "* Set up remote access (Special VPN) of associate approved to work offsite",
      "* Provide assistance and technical support to associate during offsite work",
      "* Administer cyber security protocols on both company owned and associate’s personal IT equipment"
    ],
  },
  {
    title: "HRM",
    body: [
      "* Keeps and monitors the approved list of functions for allowed for offsite work",
      "* Keeps and monitors list of approved associates for offsite work as well as their schedule",
      "* Ensure that associate sign Offsite Work Agreement prior to scheduled offsite work",
      "* Encode and process offsite work data of the associate to system for payroll payment purposes",
      "* Maintain, review and update Hybrid Work Arrangement policy according to the prevailing business condition"
    ],
  },
];

const EligibilityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Eligibility for Offsite Work</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left font-bold">
                  CLASSIFICATION
                </th>
                <th className="px-4 py-2 border text-left font-bold">EVALN</th>
                <th className="px-4 py-2 border text-left font-bold">
                  CRITERIA
                </th>
              </tr>
            </thead>
            <tbody>
              {eligibilityData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{row.classification}</td>
                  <td className="px-4 py-2 border">{row.evaln}</td>
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

const RequirementsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Basic Requirements</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left font-bold">ITEM</th>
                <th className="px-4 py-2 border text-left font-bold">
                  CRITERIA
                </th>
                <th className="px-4 py-2 border text-left font-bold">
                  REMARKS
                </th>
              </tr>
            </thead>
            <tbody>
              {requirementsData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{row.item}</td>
                  <td className="px-4 py-2 border">{row.criteria}</td>
                  <td className="px-4 py-2 border whitespace-pre-line">
                    {row.remarks}
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

const JobLevelModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Offsite Work Days per Job Level</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left font-bold">
                  Job Level
                </th>
                <th className="px-4 py-2 border text-left font-bold">
                  No. of Days/Week Allowed
                </th>
              </tr>
            </thead>
            <tbody>
              {jobLevelData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{row.level}</td>
                  <td className="px-4 py-2 border">{row.daysAllowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const WelfareModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Welfare Treatment during Offsite Work</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left font-bold">No</th>
                <th className="px-4 py-2 border text-left font-bold">Item</th>
                <th className="px-4 py-2 border text-left font-bold">Onsite</th>
                <th className="px-4 py-2 border text-left font-bold">
                  Offsite
                </th>
              </tr>
            </thead>
            <tbody>
              {welfareData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{row.no}</td>
                  <td className="px-4 py-2 border">{row.item}</td>
                  <td className="px-4 py-2 border">{row.onsite}</td>
                  <td className="px-4 py-2 border">{row.offsite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Other modal components remain the same...
const WorkingHoursModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Working Hours</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Normal working time (7:00 am – 4:41 pm) and follow assigned
            breaktime
            <ul>
              <li> a. No overtime </li>
              <li> b. No flexi-time </li>
              <li>
                {" "}
                c. Attendance Check should be done every morning meeting (via
                TEAMs){" "}
              </li>
              <li>
                {" "}
                d. Should be online and accessible (Cellphone, TEAMS, e-mail)
                during working hours{" "}
              </li>
            </ul>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SecurityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Data Protection & Security</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Associate must sign Offsite Work Agreement from HR prior to
            scheduled offsite work and comply to IS regulations.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ResponsibilitiesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Responsibilities</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border text-left font-bold">
                  Title
                </th>
                <th className="px-4 py-2 border text-left font-bold">
                  Contents
                </th>
              </tr>
            </thead>
            <tbody>
              {responsibilitiesData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{row.title}</td>
                  <td className="px-4 py-2 border">
                    <ul className="list-none space-y-2">
                      {row.body.map((criterion, idx) => (
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

const FlowBeforeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Preparation Before Actual Offsite Work Process Flow
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-ratio-container">
            <Image
              src="/flowbefore.png"
              alt="Preparation Before Actual Offsite Work Process Flow"
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

const FlowDuringModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>During Actual Offsite Work Process Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-ratio-container">
            <Image
              src="/flowduring.png"
              alt="During Actual Offsite Work Process Flow"
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

const FlexibleWorkModal: React.FC<FlexibleWorkModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const [showEligibility, setShowEligibility] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [showJobLevel, setShowJobLevel] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showWelfare, setShowWelfare] = useState(false);
  const [showResponsibilities, setShowResponsibilities] = useState(false);
  const [showFlowBefore, setShowFlowBefore] = useState(false);
  const [showFlowDuring, setShowFlowDuring] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => setShowEligibility(true)} className="w-full">
            Eligibility for Offsite Work
          </Button>
          <Button onClick={() => setShowRequirements(true)} className="w-full">
            Basic Requirements
          </Button>
          <Button onClick={() => setShowHours(true)} className="w-full">
            Working Hours
          </Button>
          <Button onClick={() => setShowJobLevel(true)} className="w-full">
            Offsite Work Days per Job Level
          </Button>
          <Button onClick={() => setShowSecurity(true)} className="w-full">
            Data Protection & Security
          </Button>
          <Button onClick={() => setShowWelfare(true)} className="w-full">
            Welfare Treatment during Offsite Work
          </Button>
          <Button
            onClick={() => setShowResponsibilities(true)}
            className="w-full"
          >
            Responsibilities
          </Button>
          <Button onClick={() => setShowFlowBefore(true)} className="w-full">
            Flow: Before Actual
          </Button>
          <Button onClick={() => setShowFlowDuring(true)} className="w-full">
            Flow: During Actual
          </Button>
        </div>
      </DialogContent>
      {showEligibility && (
        <EligibilityModal
          isOpen={showEligibility}
          onClose={() => setShowEligibility(false)}
        />
      )}
      {showRequirements && (
        <RequirementsModal
          isOpen={showRequirements}
          onClose={() => setShowRequirements(false)}
        />
      )}
      {showHours && (
        <WorkingHoursModal
          isOpen={showHours}
          onClose={() => setShowHours(false)}
        />
      )}
      {showJobLevel && (
        <JobLevelModal
          isOpen={showJobLevel}
          onClose={() => setShowJobLevel(false)}
        />
      )}
      {showSecurity && (
        <SecurityModal
          isOpen={showSecurity}
          onClose={() => setShowSecurity(false)}
        />
      )}
      {showWelfare && (
        <WelfareModal
          isOpen={showWelfare}
          onClose={() => setShowWelfare(false)}
        />
      )}
      {showResponsibilities && (
        <ResponsibilitiesModal
          isOpen={showResponsibilities}
          onClose={() => setShowResponsibilities(false)}
        />
      )}
      {showFlowBefore && (
        <FlowBeforeModal
          isOpen={showFlowBefore}
          onClose={() => setShowFlowBefore(false)}
        />
      )}
      {showFlowDuring && (
        <FlowDuringModal
          isOpen={showFlowDuring}
          onClose={() => setShowFlowDuring(false)}
        />
      )}
    </Dialog>
  );
};

export default FlexibleWorkModal;
