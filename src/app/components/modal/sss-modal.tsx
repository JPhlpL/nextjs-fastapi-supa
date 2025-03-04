'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

// Sub-modal components
const SicknessBenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Qualified:
          <ul>
            <li> 3 Months Premium </li>
            <li> No Sick Leave </li>
            <li> 4 days illness </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> Medical Cert CTC </li>
            <li> Laboratories CTC </li>
            <li> Discharge(Confinement) </li>
            <li> ORR(Operation) </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const ECProgramModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
          Qualified:
          <ul>
            <li> 3 Months Premium </li>
            <li> Occured in DNPH </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> Medical Cert CTC </li>
            <li> Laboratories CTC </li>
            <li> Discharge(Confinement) </li>
            <li> Accident Report from clinic CTC </li>
            <li> EC Logbook CTC </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const DisabilityBenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
          Qualified:
          <ul>
            <li> filled 120days SSS Sickness </li>
            <li> 36months premium </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> Medical Cert </li>
            <li> Laboratories </li>
            <li> Discharge </li>
            <li> Physician or Company Doctor’s recommendation </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const MaternityBenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
    <p>
        Qualified:
        <ul>
          <li> 3months premium </li>
          <li> Conceived Woman </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> Medical Cert </li>
          <li> Laboratories </li>
        </ul>
      </p>
    </div>
  </DialogContent>
</Dialog>
);

const LoanModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
        Qualified:
        <ul>
          <li> 36months premium </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> 1st loan - Active online account with Disbursement </li>
          <li> Renewal - 12months of posted payments </li>
        </ul>
      </p>
      </div>
    </DialogContent>
  </Dialog>
);

const UnemploymentBenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
    <p>
        Qualified:
        <ul>
          <li> Not over 60 Years Old </li>
          <li> Unemployed due to company closure or layoff </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> ID </li>
          <li> DOLE Certification </li>
        </ul>
      </p>
    </div>
  </DialogContent>
  </Dialog>
);

const PESOFundModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
        Qualified:
        <ul>
          <li> All active members </li>
          <li> 55yrs below </li>
          <li> 6consecutive mo. premium within 1yr </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> Funds </li>
        </ul>
      </p>
      </div>
    </DialogContent>
  </Dialog>
);

const RetirementBenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
        Qualified:
        <ul>
          <li> 10yrs or 120months premium </li>
          <li> 60 years old </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> Active online account </li>
          <li> Disbursement account for pension </li>
        </ul>
      </p>
      </div>
    </DialogContent>
  </Dialog>
);

const DeathBenefitModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
        Qualified:
        <ul>
          <li> Dependents of SSS Member(Spouse and Child21 below) </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> Death Certificate </li>
          <li> Claimant’s form and ID </li>
          <li> Bank Account </li>
        </ul>
      </p>
      </div>
    </DialogContent>
  </Dialog>
);

const FuneralModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
      <p>
        Qualified:
        <ul>
          <li> Paid the funeral expense </li>
          <li> Deceased SSS Member </li>
        </ul>
      </p>
      <p>
        Requirements:
        <ul>
          <li> OR of funeral </li>
          <li> Active online account </li>
          <li> ID </li>
          <li> Notarized affidavit(if not family member) </li>
        </ul>
      </p>
      </div>
    </DialogContent>
  </Dialog>
);

const SSSModal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {
  const [showSicknessBenefit, setShowSicknessBenefit] = useState(false);
  const [showECProgram, setShowECProgram] = useState(false);
  const [showDisabilityBenefit, setShowDisabilityBenefit] = useState(false);
  const [showMaternityBenefit, setShowMaternityBenefit] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showUnemploymentBenefit, setShowUnemploymentBenefit] = useState(false);
  const [showPESOFund, setShowPESOFund] = useState(false);
  const [showRetirementBenefit, setShowRetirementBenefit] = useState(false);
  const [showDeathBenefit, setShowDeathBenefit] = useState(false);
  const [showFuneral, setShowFuneral] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            onClick={() => setShowSicknessBenefit(true)} 
            className="w-full"
          >
            SSS Sickness Benefit
          </Button>
          <Button 
            onClick={() => setShowECProgram(true)} 
            className="w-full"
          >
            SSS EC Program
          </Button>
          <Button 
            onClick={() => setShowDisabilityBenefit(true)} 
            className="w-full"
          >
            SSS Disability Benefit
          </Button>
          <Button 
            onClick={() => setShowMaternityBenefit(true)} 
            className="w-full"
          >
            SSS Maternity Benefit
          </Button>
          <Button 
            onClick={() => setShowLoan(true)} 
            className="w-full"
          >
            SSS Loan
          </Button>
          <Button 
            onClick={() => setShowUnemploymentBenefit(true)} 
            className="w-full"
          >
            SSS Unemployment Benefit
          </Button>
          <Button 
            onClick={() => setShowPESOFund(true)} 
            className="w-full"
          >
            SSS PESO Fund
          </Button>
          <Button 
            onClick={() => setShowRetirementBenefit(true)} 
            className="w-full"
          >
            SSS Retirement Benefit
          </Button>
          <Button 
            onClick={() => setShowDeathBenefit(true)} 
            className="w-full"
          >
            SSS Death Benefit
          </Button>
          <Button 
            onClick={() => setShowFuneral(true)} 
            className="w-full"
          >
            SSS Funeral
          </Button>
        </div>
      </DialogContent>
      {showSicknessBenefit && (
        <SicknessBenefitModal 
          isOpen={showSicknessBenefit} 
          onClose={() => setShowSicknessBenefit(false)} 
          title="SSS Sickness Benefit" 
        />
      )}
      {showECProgram && (
        <ECProgramModal 
          isOpen={showECProgram} 
          onClose={() => setShowECProgram(false)} 
          title="SSS EC Program" 
        />
      )}
      {showDisabilityBenefit && (
        <DisabilityBenefitModal 
          isOpen={showDisabilityBenefit} 
          onClose={() => setShowDisabilityBenefit(false)} 
          title="SSS Disability Benefit" 
        />
      )}
      {showMaternityBenefit && (
        <MaternityBenefitModal 
          isOpen={showMaternityBenefit} 
          onClose={() => setShowMaternityBenefit(false)} 
          title="SSS Maternity Benefit" 
        />
      )}
      {showLoan && (
        <LoanModal 
          isOpen={showLoan} 
          onClose={() => setShowLoan(false)} 
          title="SSS Loan" 
        />
      )}
      {showUnemploymentBenefit && (
        <UnemploymentBenefitModal 
          isOpen={showUnemploymentBenefit} 
          onClose={() => setShowUnemploymentBenefit(false)} 
          title="SSS Unemployment Benefit" 
        />
      )}
      {showPESOFund && (
        <PESOFundModal 
          isOpen={showPESOFund} 
          onClose={() => setShowPESOFund(false)} 
          title="SSS PESO Fund" 
        />
      )}
      {showRetirementBenefit && (
        <RetirementBenefitModal 
          isOpen={showRetirementBenefit} 
          onClose={() => setShowRetirementBenefit(false)} 
          title="SSS Retirement Benefit" 
        />
      )}
      {showDeathBenefit && (
        <DeathBenefitModal 
          isOpen={showDeathBenefit} 
          onClose={() => setShowDeathBenefit(false)} 
          title="SSS Death Benefit" 
        />
      )}
      {showFuneral && (
        <FuneralModal 
          isOpen={showFuneral} 
          onClose={() => setShowFuneral(false)} 
          title="SSS Funeral" 
        />
      )}
    </Dialog>
  );
}

export default SSSModal