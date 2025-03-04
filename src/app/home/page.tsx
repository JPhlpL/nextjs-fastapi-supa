"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Heart,
  Shield,
  Activity,
  Calendar,
  Award,
  HomeIcon,
  Gift,
  Users,
  Wallet,
  GraduationCap,
  HelpCircle,
  Building2,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import HomeModal from "@/app/components/modal/home-modal";
import BenefitLeaveModal from "@/app/components/modal/benefit-leave-modal";
import HealthBenefitsModal from "@/app/components/modal/health-benefits-modal";
import LifeInsuranceModal from "@/app/components/modal/life-insurance-modal";
import WellnessProgramModal from "@/app/components/modal/wellness-program-modal";
import CompanyEventsModal from "@/app/components/modal/company-events-modal";
import WorkLifeBalanceModal from "@/app/components/modal/work-life-balance-modal";
import AllowanceModal from "@/app/components/modal/allowance-modal";
import FlexibleWorkModal from "@/app/components/modal/flexible-work-modal";
import ReferralBonusModal from "@/app/components/modal/referral-bonus-modal";
import AnnualBonusModal from "@/app/components/modal/annual-bonus-modal";
import AnnualAppraisalModal from "@/app/components/modal/annual-appraisal-modal";
import AssistanceModal from "@/app/components/modal/assistance-modal";
import LoanProgramModal from "@/app/components/modal/loan-program-modal";
import SSSModal from "@/app/components/modal/sss-modal";
import PagIbigModal from "@/app/components/modal/pag-ibig-modal";
import PhilhealthModal from "@/app/components/modal/philhealth-modal";
import { getData } from "@/utils/helpers";
import { UserInfo, Employee } from "@/types/index";

interface BenefitIcon {
  icon: React.ReactNode;
  label: string;
  modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
  }>;
}

// Define the type for the API response
interface ApiResponse {
  user_info: UserInfo;
  employee_info: any; // You might want to define a more specific type for employee_info
}

const healthWellnessIcons: BenefitIcon[] = [
  {
    icon: <Heart className="w-6 h-6 text-blue-500" />,
    label: "HEALTH BENEFITS",
    modal: HealthBenefitsModal,
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    label: "LIFE INSURANCE",
    modal: LifeInsuranceModal,
  },
  {
    icon: <Activity className="w-6 h-6 text-blue-500" />,
    label: "WELLNESS PROGRAM",
    modal: WellnessProgramModal,
  },
];

const companyActivitiesIcons: BenefitIcon[] = [
  {
    icon: <Users className="w-6 h-6 text-pink-500" />,
    label: "COMPANY EVENTS",
    modal: CompanyEventsModal,
  },
  {
    icon: <Gift className="w-6 h-6 text-pink-500" />,
    label: "WORK LIFE BALANCE",
    modal: WorkLifeBalanceModal,
  },
];

const perksAndBonusesIcons: BenefitIcon[] = [
  {
    icon: <Calendar className="w-6 h-6 text-pink-500" />,
    label: "PAID LEAVE",
    modal: BenefitLeaveModal,
  },
  {
    icon: <HomeIcon className="w-6 h-6 text-pink-500" />,
    label: "FLEXIBLE WORK SCHEDULE",
    modal: FlexibleWorkModal,
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-pink-500" />,
    label: "ASSOCIATES ASSISTANCE",
    modal: AssistanceModal,
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-pink-500" />,
    label: "LOAN PROGRAM",
    modal: LoanProgramModal,
  },
  {
    icon: <Wallet className="w-6 h-6 text-pink-500" />,
    label: "ALLOWANCE",
    modal: AllowanceModal,
  },
  {
    icon: <Gift className="w-6 h-6 text-pink-500" />,
    label: "REFERRAL BONUS",
    modal: ReferralBonusModal,
  },
  {
    icon: <Award className="w-6 h-6 text-pink-500" />,
    label: "ANNUAL BONUS",
    modal: AnnualBonusModal,
  },
  {
    icon: <Building2 className="w-6 h-6 text-pink-500" />,
    label: "ANNUAL APPRAISAL",
    modal: AnnualAppraisalModal,
  },
];

const statutoryBenefitsIcons: BenefitIcon[] = [
  {
    icon: <Shield className="w-6 h-6 text-yellow-500" />,
    label: "SSS",
    modal: SSSModal,
  },
  {
    icon: <Building2 className="w-6 h-6 text-blue-500" />,
    label: "PAG-IBIG FUND",
    modal: PagIbigModal,
  },
  {
    icon: <Heart className="w-6 h-6 text-yellow-500" />,
    label: "PHILHEALTH",
    modal: PhilhealthModal,
  },
];

// Helper function moved from an export to an internal function
function capitalizeFirstLetter(txt: string): string {
  return txt
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and lowercase the rest
    .join(" "); // Join the array back into a string
}

// export default function Home() {
//   const { user } = useAuth()
//   const [userData, setUserData] = useState<UserInfo | null>(null)
//   const username = user?.username;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user?.username) {
//         try {
//           const response = await getData<ApiResponse>({
//             url: `${process.env.NEXT_PUBLIC_API_URL}/user/get-user-info/${user.username}`,
//           })
//           setUserData(response.user_info)
//         } catch (error) {
//           console.error("Error fetching user data:", error)
//         }
//       }
//     }

//     fetchUserData()
//   }, [user?.username])

//   if (!userData) {
//     return <div>Loading...</div> // Or any other loading state representation
//   }

interface ModalContent {
  title: string;
  description: string;
  modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
  }>;
}

export default function Home() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const username = user?.username;

  const fetchUsers = async () => {
    try {
      const response = await getData<{
        user_info: UserInfo;
        employee_info: any;
      }>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/get-user-info/${username}`,
      });

      // Assuming response is an object with user_info and employee_info
      const userInfo = response.user_info;
      const employeeInfo = response.employee_info;

      // Combine userInfo and employeeInfo into a single object if needed
      const combinedUserData = {
        ...userInfo,
        employee_info: employeeInfo,
      };

      setUserData(combinedUserData); // Set the combined user data
      setEmployeeInfo(employeeInfo);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUsers();
    }
  }, [username]);

  const handleOpenModal = (label: string) => {
    const icon = [
      ...healthWellnessIcons,
      ...companyActivitiesIcons,
      ...perksAndBonusesIcons,
      ...statutoryBenefitsIcons,
    ].find((i) => i.label === label);
    if (icon) {
      setModalContent({
        title: icon.label,
        description: icon.label,
        modal: icon.modal,
      });
      setOpenModal(label);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  if (!user) {
    return null; // The useAuth hook will handle redirection
  }

  const firstname = capitalizeFirstLetter(employeeInfo?.firstName || "");

  return (
    <div className="flex gap-6">
      {/* Employee Info Card */}
      <Card className="bg-gradient-to-br from-green-100 to-blue-100 w-64 h-fit">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-full">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-bold">Hello {firstname}!</h3>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  ID Number:
                </label>
                <p className="text-sm">{employeeInfo?.employeeId || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Department:
                </label>
                <p className="text-sm">{employeeInfo?.department || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Section:
                </label>
                <p className="text-sm">{employeeInfo?.section || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Position:
                </label>
                <p className="text-sm">{employeeInfo?.position || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Job Level:
                </label>
                <p className="text-sm">{employeeInfo?.jobLevel || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Service Years:
                </label>
                <p className="text-sm">{employeeInfo?.serviceYears || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Date Hired:
                </label>
                <p className="text-sm">{employeeInfo?.dateHired || "N/A"}</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-bold mb-2">ASSOCIATES DNPH JOURNEY MAP</h4>
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 space-y-6">
        <Card className="bg-gradient-to-r from-green-100 to-blue-100">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
              ASSOCIATES BENEFITS PORTAL
            </h1>
            <p className="text-center text-gray-700">
              THIS PORTAL IS YOUR ONE-STOP DESTINATION FOR ALL THINGS RELATED TO
              YOUR BENEFITS.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-center mt-8 mb-6">
          YOUR BENEFITS OVERVIEW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Health & Wellness and Company Activities Section */}
          <Card className="bg-gradient-to-br from-green-100 to-blue-100">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">HEALTH & WELLNESS</h3>
              <div className="grid grid-cols-3 gap-4">
                {healthWellnessIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleOpenModal(icon.label)}
                  >
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {icon.icon}
                    </div>
                    <span className="text-xs mt-2 text-center">
                      {icon.label}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mt-6 mb-4">
                COMPANY ACTIVITIES
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {companyActivitiesIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleOpenModal(icon.label)}
                  >
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {icon.icon}
                    </div>
                    <span className="text-xs mt-2 text-center">
                      {icon.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Perks & Bonuses Section */}
          <Card className="bg-gradient-to-br from-green-100 to-blue-100">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">PERKS & BONUSES</h3>
              <div className="grid grid-cols-3 gap-4">
                {perksAndBonusesIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleOpenModal(icon.label)}
                  >
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {icon.icon}
                    </div>
                    <span className="text-xs mt-2 text-center">
                      {icon.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statutory Benefits Section */}
          <Card className="bg-gradient-to-br from-green-100 to-blue-100">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">STATUTORY BENEFITS</h3>
              <div className="grid grid-cols-3 gap-4">
                {statutoryBenefitsIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleOpenModal(icon.label)}
                  >
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {icon.icon}
                    </div>
                    <span className="text-xs mt-2 text-center">
                      {icon.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Render modals conditionally */}
      {openModal && modalContent && (
        <modalContent.modal
          isOpen={openModal === modalContent.title}
          onClose={handleCloseModal}
          title={modalContent.title}
          description={modalContent.description}
        />
      )}
    </div>
  );
}
