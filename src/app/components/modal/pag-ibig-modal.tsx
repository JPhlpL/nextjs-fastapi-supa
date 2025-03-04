"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

// Sub-modal components
const RegularSavingsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Qualified:
          <ul>
            <li> Employee (Private&Gov’t) </li>
            <li> Voluntary </li>
            <li> OFW </li>
            <li> Kasam-bahay </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> Online Registration </li>
            <li> Monthly Payment </li>
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
            <li> 24 months premium </li>
            <li> 6months active </li>
            <li> No gap </li>
            <li> Update Housing Loan payment </li>
          </ul>
        </p>
        <p>
          Requirements:
          <p>
            * F2F Filing
            <ul>
              <li> - Gov’t ID(VALID) </li>
              <li> - 1month payslip </li>
              <li> - Validated Form </li>
            </ul>
          </p>
          <p>
          * Online Filing
            <ul>
              <li> - Active Virtual account </li>
              <li> - Loyalty Card or ATM </li>
            </ul>
          </p>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const LoyaltyCardModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Qualified:
          <ul>
            <li> All members </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> Gov’t ID(VALID) </li>
            <li> Php125 </li>
            <li> Form </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const ProvidentClaimModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Requirements:
          <ul>
            <li> Gov’t ID(VALID) </li>
            <li> Form </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const MP2Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Qualified:
          <ul>
            <li> Active MP1 account </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> ID </li>
            <li> Form </li>
            <li> Proof of income(payment) </li>
            <li> Face to Face application </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const HousingLoanModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Qualified:
          <ul>
            <li> 24months premium </li>
            <li> Not over 65yo date of application or not over 70yo date of maturity </li>
            <li> Legal capacity </li>
            <li> No cancelled, bought back, foreclose or voluntary surrender </li>
            <li> Update MPL payment </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> Proof of income </li>
            <li> Housing loan form </li>
            <li> Valid ID </li>
            <li> Other documents </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const HealModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title} (Home Equity Appreciation Loan) </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          Qualified:
          <ul>
            <li> Same w/ housing </li>
            <li> 5yrs approved housing loan </li>
            <li> 12 months paid prior to application </li>
            <li> Pagibig CI </li>
          </ul>
        </p>
        <p>
          Requirements:
          <ul>
            <li> ID </li>
            <li> Proof of income </li>
            <li> Update real tax </li>
          </ul>
        </p>
      </div>
    </DialogContent>
  </Dialog>
);

const PagibigModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  const [showRegularSavings, setShowRegularSavings] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showLoyaltyCard, setShowLoyaltyCard] = useState(false);
  const [showProvidentClaim, setShowProvidentClaim] = useState(false);
  const [showMP2, setShowMP2] = useState(false);
  const [showHousingLoan, setShowHousingLoan] = useState(false);
  const [showHeal, setShowHeal] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => setShowRegularSavings(true)}
            className="w-full "
          >
            Pagibig Regular Savings
          </Button>
          <Button onClick={() => setShowLoan(true)} className="w-full ">
            Pagibig Loan
          </Button>
          <Button onClick={() => setShowLoyaltyCard(true)} className="w-full ">
            Pagibig Loyalty Card Plus
          </Button>
          <Button
            onClick={() => setShowProvidentClaim(true)}
            className="w-full "
          >
            Pagibig Provident Claim
          </Button>
          <Button onClick={() => setShowMP2(true)} className="w-full ">
            Pagibig MP2
          </Button>
          <Button onClick={() => setShowHousingLoan(true)} className="w-full ">
            Pagibig Housing Loan
          </Button>
          <Button onClick={() => setShowHeal(true)} className="w-full ">
            Pagibig Home Equity Appreciation Loan(Heal)
          </Button>
        </div>
      </DialogContent>
      {showRegularSavings && (
        <RegularSavingsModal
          isOpen={showRegularSavings}
          onClose={() => setShowRegularSavings(false)}
          title="Pagibig Regular Savings"
        />
      )}
      {showLoan && (
        <LoanModal
          isOpen={showLoan}
          onClose={() => setShowLoan(false)}
          title="Pagibig Loan"
        />
      )}
      {showLoyaltyCard && (
        <LoyaltyCardModal
          isOpen={showLoyaltyCard}
          onClose={() => setShowLoyaltyCard(false)}
          title="Pagibig Loyalty Card Plus"
        />
      )}
      {showProvidentClaim && (
        <ProvidentClaimModal
          isOpen={showProvidentClaim}
          onClose={() => setShowProvidentClaim(false)}
          title="Pagibig Provident Claim"
        />
      )}
      {showMP2 && (
        <MP2Modal
          isOpen={showMP2}
          onClose={() => setShowMP2(false)}
          title="Pagibig MP2"
        />
      )}
      {showHousingLoan && (
        <HousingLoanModal
          isOpen={showHousingLoan}
          onClose={() => setShowHousingLoan(false)}
          title="Pagibig Housing Loan"
        />
      )}
      {showHeal && (
        <HealModal
          isOpen={showHeal}
          onClose={() => setShowHeal(false)}
          title="Pagibig Home Equity Appreciation Loan (Heal)"
        />
      )}
    </Dialog>
  );
};

export default PagibigModal;
