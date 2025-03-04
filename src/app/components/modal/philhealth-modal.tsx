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
const BusinessEmployersModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>Coming Soon...</p>
      </div>
    </DialogContent>
  </Dialog>
);

const HouseholdEmployersModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>Coming Soon...</p>
      </div>
    </DialogContent>
  </Dialog>
);

const SelfEmployedModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>Coming Soon...</p>
      </div>
    </DialogContent>
  </Dialog>
);

const VoluntaryMembersModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>Coming Soon...</p>
      </div>
    </DialogContent>
  </Dialog>
);

const OFWMembersModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>Coming Soon...</p>
      </div>
    </DialogContent>
  </Dialog>
);

const PhilHealthModal: React.FC<ModalProps> = ({ isOpen, onClose, title, description }) => {
  const [showBusinessEmployers, setShowBusinessEmployers] = useState(false);
  const [showHouseholdEmployers, setShowHouseholdEmployers] = useState(false);
  const [showSelfEmployed, setShowSelfEmployed] = useState(false);
  const [showVoluntaryMembers, setShowVoluntaryMembers] = useState(false);
  const [showOFWMembers, setShowOFWMembers] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            onClick={() => setShowBusinessEmployers(true)} 
            className="w-full"
          >
            Business Employers and Employees
          </Button>
          <Button 
            onClick={() => setShowHouseholdEmployers(true)} 
            className="w-full"
          >
            Household Employers and Kasambahay
          </Button>
          <Button 
            onClick={() => setShowSelfEmployed(true)} 
            className="w-full"
          >
            Self-Employed Members
          </Button>
          <Button 
            onClick={() => setShowVoluntaryMembers(true)} 
            className="w-full"
          >
            All Voluntary and Non-Working Spouse Members
          </Button>
          <Button 
            onClick={() => setShowOFWMembers(true)} 
            className="w-full"
          >
            Land-Based Overseas Filipino Worker Members
          </Button>
        </div>
      </DialogContent>
      {showBusinessEmployers && (
        <BusinessEmployersModal 
          isOpen={showBusinessEmployers} 
          onClose={() => setShowBusinessEmployers(false)} 
          title="Business Employers and Employees" 
        />
      )}
      {showHouseholdEmployers && (
        <HouseholdEmployersModal 
          isOpen={showHouseholdEmployers} 
          onClose={() => setShowHouseholdEmployers(false)} 
          title="Household Employers and Kasambahay" 
        />
      )}
      {showSelfEmployed && (
        <SelfEmployedModal 
          isOpen={showSelfEmployed} 
          onClose={() => setShowSelfEmployed(false)} 
          title="Self-Employed Members" 
        />
      )}
      {showVoluntaryMembers && (
        <VoluntaryMembersModal 
          isOpen={showVoluntaryMembers} 
          onClose={() => setShowVoluntaryMembers(false)} 
          title="All Voluntary and Non-Working Spouse Members" 
        />
      )}
      {showOFWMembers && (
        <OFWMembersModal 
          isOpen={showOFWMembers} 
          onClose={() => setShowOFWMembers(false)} 
          title="Land-Based Overseas Filipino Worker Members" 
        />
      )}
    </Dialog>
  );
}

export default PhilHealthModal