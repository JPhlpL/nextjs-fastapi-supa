"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
}

interface AssistanceInfo {
  program: string
  purpose: string
  qualifier: string
  amount: string
  remarks: string[]
  formLink?: string
}

const privilegeAssistanceData: AssistanceInfo[] = [
  {
    program: "MARRIAGE ASSISTANCE PRIVILEGE",
    purpose: "The company shall provide Marriage Assistance to qualified regular associates as a sign of good wishes for the newly wed couples",
    qualifier: "Regular associate",
    amount: "1,500.00",
    remarks: [
      "Fill out the Marriage Assistance Form",
      "attach your marriage certificate",
      "Submit the form to BenCom for processing",
      "Can only be claimed until 4 months from the date of child's birth as stated in the Child's Birth Certificate",
      "Credited to your payroll account based on payroll schedule",
      "If not availed within the prescribed period, such privilege shall be forfeited."
    ],
    formLink: ""
  },
  {
    program: "CHILD'S BIRTH ASSISTANCE PRIVILEGE",
    purpose: "The Child's Birth Assistance Privilege is provided by the company to qualified regular associates to congratulate the couple for their newly born child.",
    qualifier: "female regular associate who has given birth or legally married male regular associate when his wife gave birth",
    amount: "200.00",
    remarks: [
      "Fill out the Birth Assistance Form",
      "attach your birth certificate",
      "Submit the form to BenCom for processing",
      "Can only be claimed until 3 months after the wedding day",
      "Credited to your payroll account based on payroll schedule",
      "If not availed within the prescribed period, such privilege shall be forfeited."
    ],
    formLink: ""
  },
  {
    program: "BEREAVEMENT ASSISTANCE PRIVILEGE",
    purpose: "The Bereavement Assistance Privilege is provided to qualified regular associates as a way of extending the company's condolences to the bereaved family.",
    qualifier: "Regular associate's Immediate family member (Single - Parents, Married - Parents/Spouse/Children, Single Parent - Parents/Children)",
    amount: "2,000.00",
    remarks: [
      "Fill out the Request for Bereavement Assistance Form",
      "attach your death certificate copy",
      "Submit the form to BenCom for processing",
      "Can only be claimed within three (3) months from the validity of document (Death Certificate)",
      "Credited to your payroll account based on payroll schedule",
      "If not availed within the prescribed period, such privilege shall be forfeited."
    ],
    formLink: ""
  }
]

const PrivilegeAssistanceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privilege Assistance</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border text-left">Program</th>
                  <th className="px-4 py-2 border text-left">Purpose</th>
                  <th className="px-4 py-2 border text-left">Qualifier</th>
                  <th className="px-4 py-2 border text-left">Amount</th>
                  <th className="px-4 py-2 border text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {privilegeAssistanceData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{item.program}</td>
                    <td className="px-4 py-2 border">{item.purpose}</td>
                    <td className="px-4 py-2 border">{item.qualifier}</td>
                    <td className="px-4 py-2 border">₱{item.amount}</td>
                    <td className="px-4 py-2 border">
                      <ul className="list-disc pl-5">
                        {item.remarks.map((remark, idx) => (
                          <li key={idx}>{remark}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const MealSubsidyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Regular Meal Subsidy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <p className="font-medium">Everyday when you report to work, you will receive a meal subsidy valued at:</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Probationary Associate</span>
              <span className="font-semibold">₱95.00</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Regular Associate</span>
              <span className="font-semibold">₱100.00</span>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Points to remember:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Meal Subsidy is credited to your payroll account</li>
              <li>Amount varies depending on payroll cutoff and your attendance</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const OTMealSubsidyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>OT Meal Subsidy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <p className="font-medium">For every 8 hrs. of Overtime, you will receive:</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Probationary Associate</span>
              <span className="font-semibold">₱95.00</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Regular Associate</span>
              <span className="font-semibold">₱100.00</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AppreciationGiftsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Appreciation Gifts</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <p className="text-gray-600">
            DNPH is grateful for your family's support to you, as you work here in our company. 
            Here are some gifts for your family.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">Holy Week Vacation Package</h4>
              <p>The family of a regular associate receives ₱3,000 credited to the associate's payroll account</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2">Christmas Gift</h4>
              <ul className="space-y-2">
                <li>Probationary Associates receive ₱1,100 (Sodexo GC)</li>
                <li>Regular Associates receive ₱1,500 (Sodexo GC)</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">*schedule of release will be announced thru internal memo*</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const BirthdayPrivilegeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Associate's Birthday Privilege</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-gray-600">
            The company grants "birthday privilege" to all regular associates upon celebrating their birthdays. 
            It consists of a Monthly Activity with the President (with free lunch) and a Birthday Gift (birthday cake). 
            This is one way of enhancing the associate-management communication system as well as the associate's motivation system.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const OBMModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>OBM (Official Business Meal)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <p className="text-gray-600">
            Associate is entitled to OB Meal Allowance on top of his regular meal subsidy when assigned 
            outside the company for an official business.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Rule</span>
              <span>OB Time must fall within 11:45 – 13:25</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Coverage</span>
              <span>AM and Below</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span>Amount</span>
              <span>₱60.00/day OB Meal</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AssistanceModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [showPrivilege, setShowPrivilege] = useState(false)
  const [showMealSubsidy, setShowMealSubsidy] = useState(false)
  const [showOTMeal, setShowOTMeal] = useState(false)
  const [showAppreciation, setShowAppreciation] = useState(false)
  const [showBirthday, setShowBirthday] = useState(false)
  const [showOBM, setShowOBM] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => setShowPrivilege(true)}
            className="w-full"
            variant="default"
          >
            Privilege Assistance
          </Button>
          <Button
            onClick={() => setShowMealSubsidy(true)}
            className="w-full"
            variant="default"
          >
            Regular Meal Subsidy
          </Button>
          <Button
            onClick={() => setShowOTMeal(true)}
            className="w-full"
            variant="default"
          >
            OT Meal Subsidy
          </Button>
          <Button
            onClick={() => setShowAppreciation(true)}
            className="w-full"
            variant="default"
          >
            Appreciation Gifts
          </Button>
          <Button
            onClick={() => setShowBirthday(true)}
            className="w-full"
            variant="default"
          >
            Associate's Birthday Privilege
          </Button>
          <Button
            onClick={() => setShowOBM(true)}
            className="w-full"
            variant="default"
          >
            OBM
          </Button>
        </div>
      </DialogContent>

      {showPrivilege && (
        <PrivilegeAssistanceModal
          isOpen={showPrivilege}
          onClose={() => setShowPrivilege(false)}
        />
      )}
      {showMealSubsidy && (
        <MealSubsidyModal
          isOpen={showMealSubsidy}
          onClose={() => setShowMealSubsidy(false)}
        />
      )}
      {showOTMeal && (
        <OTMealSubsidyModal
          isOpen={showOTMeal}
          onClose={() => setShowOTMeal(false)}
        />
      )}
      {showAppreciation && (
        <AppreciationGiftsModal
          isOpen={showAppreciation}
          onClose={() => setShowAppreciation(false)}
        />
      )}
      {showBirthday && (
        <BirthdayPrivilegeModal
          isOpen={showBirthday}
          onClose={() => setShowBirthday(false)}
        />
      )}
      {showOBM && (
        <OBMModal
          isOpen={showOBM}
          onClose={() => setShowOBM(false)}
        />
      )}
    </Dialog>
  )
}

export default AssistanceModal