"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

interface PersonalCashLoanPrivilege {
  program: string;
  purpose: string[];
  qualifier: string;
  maximum_loan_amount: string;
  interest_per_month: string;
  payment_terms: string;
  remarks: string[];
  form_link: string;
}

interface CarHousingLoanInfo {
  program: string;
  position: string;
  criteria: string;
  maximumLoanAmount: string;
  interestPerMonth: string;
  paymentTerms: string;
  remarks: string;
  formsLink?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

const personalCashLoanPrivilegeData: PersonalCashLoanPrivilege[] = [
  {
    program: "Personal Cash Loan Privilege Or Company Loan",
    purpose: 
    [
      "The company provides financial assistance  with low interest rate to support the associate who is in need of cash for his personal needs."
    ],
    qualifier: "Regular associate",
    maximum_loan_amount: "half month of salary",
    interest_per_month: "2.5%",
    payment_terms: "1-3 months",
    remarks: [
      "1. No attachments needed",
      "2. No pre-termination of loan",
      "3. Deducted to salary every payday ( if with exisitng SPL, deduction starts when SPL was fully paid",
      "4. Can be availed once (1)",
      "5. May re-apply when fully paid"
    ],
    form_link: "",
  },
  {
    program: "Special Personal Loan Privilege",
    purpose: [
      "The company provides financial assistance  with low interest rate to support the associate who is in need of cash due to the following reason:",
      "1. Reasons are covered by the EL but currently availed the maximum number of loans (2 maximum loans at a time)",
      "2. Medical related expenses that do not require for hospitalization of associate or his qualified dependent/s such as purchase of medicine, laboratory exams, minor surgery (out-patient surgery)",
      "3. Education/School related expenses of associate or his qualified dependent/s"
    ],
    qualifier: "Regular associate",
    maximum_loan_amount: "Php 10,000",
    interest_per_month: "2.5%",
    payment_terms: "1-6 months",
    remarks: [
      "① Attachments are required",
      "a. Drug prescription valid for 1 month, laboratory referral not covered by  Medicard",
      "b. Estimated expense or actual expense related to education/schooling (OR for Tuition fee, books, school supplies, uniforms and other)",
      "c. Attachments related to Emergency Loan availment",
      "② No pre-termination of loan",
      "③ Deducted to salary every payday (If with existing PL deduction starts when PL was fully paid",
      "④ Can be availed once, more than one (1) is not allowed",
      "⑤ May re-apply when fully paid",
      "⑥ Qualified dependent (Parents, Spouse, child/children)"
     
    ],
    form_link: "",
  },
  {
    program: "Emergency Cash Loan Privilege",
    purpose: [
      "The company provides financial assistance  with Zero (0) interest rate to support the associates' and his family who is in need of cash due to emergency cases.",
      "1. Hospitalization or Confinement of Associate or His Qualified Dependent including Outpatient medical procedures that were being covered by the Philhealth Policy",
      "2. Medical Treatment for Tuberculosis (TB)",
      "4. Property Crime (Robbery)",
      "5. Fire",
      ""
    ],
    qualifier: "Regular associate",
    maximum_loan_amount: "Php 10,000",
    interest_per_month: "0%",
    payment_terms: "1-10 months",
    remarks: [
      "① Attachments are required",
      "a. Hospitalization Confinement certificate, hospital bill, statement of account, other related documents ",
      "b. Pregnancy related confinement (Normal, CS, Miscarriage)",
      "c. Doctor’s recommendation with prescription for Medical Treatment of TB",
      "d. Certification from barangay that the associate or his family is affected of natural calamity",
      "e.Police Report declaring the estimated amount of property loss for Property Crime",
      "f. Fire Certification from barangay that the family is affected by Fire",
      "② May be pre-terminated when half of the total loan is paid (remaining balance will be deduction to new loan amount) or",
      "③ May re-apply when fully paid",
      "④ Deducted to salary every payday (same timing deduction if with existing PL or SL)",
      "⑤ Can avail maximum of two (2) EL at the same time",
      "⑥ Qualified dependent (Parents, Spouse, child/children)",
      "Note: In case of natural calamities and fire, the Provincial/ City and present address of the associate registered and updated in his 201 File shall be the official basis to determine the associate’s official address."
    ],
    form_link: "",
  }
];

const carHousingLoanData: CarHousingLoanInfo[] = [
  {
    program: "CAR OR HOUSING LOAN PROGRAM",
    position: "Team Leader",
    criteria: "With Estimated Separation / Retirement Benefit pay Minimum of 100k",
    maximumLoanAmount: "Php 200,000 or the Borrower's Estimated Separation/ Retirement Benefit (whichever is LOWER)",
    interestPerMonth: "5% per annum diminishing balance",
    paymentTerms: "up to 5 years",
    remarks: "With Five (5) service years and up",
    formsLink: ""
  },
  {
    program: "CAR OR HOUSING LOAN PROGRAM",
    position: "Supervisor",
    criteria: "Php 300,000",
    maximumLoanAmount: "Php 300,000 or the Borrower's Estimated Separation/ Retirement Benefit (whichever is LOWER)",
    interestPerMonth: "5% per annum diminishing balance",
    paymentTerms: "up to 5 years",
    remarks: "All regular Supervisors and Assistant Managers who have rendered at least one (1) year of service in the company.",
    formsLink: ""
  },
  {
    program: "CAR OR HOUSING LOAN PROGRAM",
    position: "Asst. Manager",
    criteria: "Php 400,000",
    maximumLoanAmount: "Php 400,000 or the Borrower's Estimated Separation/ Retirement Benefit (whichever is LOWER)",
    interestPerMonth: "5% per annum diminishing balance",
    paymentTerms: "up to 5 years",
    remarks: "All regular Supervisors and Assistant Managers who have rendered at least one (1) year of service in the company.",
    formsLink: ""
  }
];

const LoanDetailsModal: React.FC<{ isOpen: boolean; onClose: () => void; loan: PersonalCashLoanPrivilege }> = ({
  isOpen,
  onClose,
  loan
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{loan.program}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-medium">Purpose</td>
                  <td className="px-4 py-2 border">{loan.purpose}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">Qualifier</td>
                  <td className="px-4 py-2 border">{loan.qualifier}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">Maximum Loan Amount</td>
                  <td className="px-4 py-2 border">{loan.maximum_loan_amount}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">Interest Per Month</td>
                  <td className="px-4 py-2 border">{loan.interest_per_month}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">Payment Terms</td>
                  <td className="px-4 py-2 border">{loan.payment_terms}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">Remarks</td>
                  <td className="px-4 py-2 border">
                    <ul className="list-disc pl-5">
                      {loan.remarks.map((remark, index) => (
                        <li key={index}>{remark}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-medium">Form Link</td>
                  <td className="px-4 py-2 border">{loan.form_link}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const SummaryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>All Loan Programs</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] w-full">
          <div className="overflow-x-auto p-1">
            <ScrollBar orientation="horizontal" />
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border text-left">Program</th>
                  <th className="px-4 py-2 border text-left">Purpose</th>
                  <th className="px-4 py-2 border text-left">Qualifier</th>
                  <th className="px-4 py-2 border text-left">Maximum Loan Amount</th>
                  <th className="px-4 py-2 border text-left">Interest Per Month</th>
                  <th className="px-4 py-2 border text-left">Payment Terms</th>
                  <th className="px-4 py-2 border text-left">Remarks</th>
                  <th className="px-4 py-2 border text-left">Form Link</th>
                </tr>
              </thead>
              <tbody>
                {personalCashLoanPrivilegeData.map((loan, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border font-medium">{loan.program}</td>
                    <td className="px-4 py-2 border">{loan.purpose}</td>
                    <td className="px-4 py-2 border">{loan.qualifier}</td>
                    <td className="px-4 py-2 border">{loan.maximum_loan_amount}</td>
                    <td className="px-4 py-2 border">{loan.interest_per_month}</td>
                    <td className="px-4 py-2 border">{loan.payment_terms}</td>
                    <td className="px-4 py-2 border">
                      <ul className="list-disc pl-5">
                        {loan.remarks.map((remark, index) => (
                          <li key={index}>{remark}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2 border">{loan.form_link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const PrivilegeModal: React.FC<{ title: string; isOpen: boolean; onClose: () => void }> = ({ title, isOpen, onClose }) => {
  const [selectedLoan, setSelectedLoan] = useState<PersonalCashLoanPrivilege | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {personalCashLoanPrivilegeData.map((loan, index) => (
            <Button 
              key={index} 
              onClick={() => setSelectedLoan(loan)} 
              className="w-full h-auto whitespace-normal py-3 px-4 text-sm"
              variant="default"
            >
              {loan.program}
            </Button>
          ))}
          <Button
            onClick={() => setShowSummary(true)}
            variant="default"
            className="w-full"
          >
            View All Loan Programs
          </Button>
        </div>
      </DialogContent>
      
      {selectedLoan && (
        <LoanDetailsModal
          isOpen={!!selectedLoan}
          onClose={() => setSelectedLoan(null)}
          loan={selectedLoan}
        />
      )}
      
      {showSummary && (
        <SummaryModal
          isOpen={showSummary}
          onClose={() => setShowSummary(false)}
        />
      )}
    </Dialog>
  );
};

const CarHousingLoanModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Car or Housing Loan Program</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] w-full">
          <div className="overflow-x-auto p-1">
            <ScrollBar orientation="horizontal" />
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border text-left font-semibold">Position</th>
                  <th className="px-4 py-2 border text-left font-semibold">Criteria</th>
                  <th className="px-4 py-2 border text-left font-semibold">Maximum Loan Amount</th>
                  <th className="px-4 py-2 border text-left font-semibold">Interest per month</th>
                  <th className="px-4 py-2 border text-left font-semibold">Payment Terms</th>
                  <th className="px-4 py-2 border text-left font-semibold">Remarks</th>
                  <th className="px-4 py-2 border text-left font-semibold">Forms Link</th>
                </tr>
              </thead>
              <tbody>
                {carHousingLoanData.map((loan, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{loan.position}</td>
                    <td className="px-4 py-2 border">{loan.criteria}</td>
                    <td className="px-4 py-2 border">{loan.maximumLoanAmount}</td>
                    <td className="px-4 py-2 border">{loan.interestPerMonth}</td>
                    <td className="px-4 py-2 border">{loan.paymentTerms}</td>
                    <td className="px-4 py-2 border">{loan.remarks}</td>
                    <td className="px-4 py-2 border">{loan.formsLink}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const LoanProgramModal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {

  const [showPrivilege, setShowPrivilege] = useState(false);
  const [showCarHouseLoan, setShowCarHouseLoan] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <Button onClick={() => setShowPrivilege(true)} className="w-full">
              Privilege
            </Button>
            <Button onClick={() => setShowCarHouseLoan(true)} className="w-full">
              Car or Housing Loan Program
            </Button>
          </div>
        </div>
      </DialogContent>
      {showPrivilege && <PrivilegeModal title="Loan Privileges" isOpen={showPrivilege} onClose={() => setShowPrivilege(false)} />}
      {showCarHouseLoan && <CarHousingLoanModal title="Car and House Loan" isOpen={showCarHouseLoan} onClose={() => setShowCarHouseLoan(false)} />}
    </Dialog>
  );
}


export default LoanProgramModal;