import { createFileRoute } from '@tanstack/react-router'
import { useAccountStore } from '@/data/accountStore'
import { EditIcon } from '@/assets/icons'

export function RouteComponent() {
  const { personalInfo } = useAccountStore()

  return (
    <div className="border rounded-xl p-6 bg-white">
      <div className="flex items-center justify-end mb-4 ">
        <button className="flex items-center gap-1 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-full px-3 py-1 text-sm transition-colors">
          <EditIcon />
          Edit
        </button>
      </div>

      <div className="flex items-center gap-4 -mt-12">
        <div className="w-20 h-20 rounded-full border-2 border-orange-100 overflow-hidden">
          <img
            src="/avator.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-sans text-[28px] font-semibold leading-[39px] capitalize text-[#252525] flex-none order-0 flex-grow-0">
            {personalInfo.firstName}
          </h1>
          <h3 className="text-2xl font-bold text-gray-900"></h3>
          <p className="font-sans text-base font-normal leading-[22px] text-[#252525] flex-none order-1 flex-grow-0">
            {personalInfo.role}
          </p>
          <p className="font-sans text-base font-normal leading-[22px] text-[#252525] flex-none order-2 flex-grow-0">
            {personalInfo.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_protected/profile/AccountProfileCard')({
  component: RouteComponent,
})

export const component = RouteComponent
export const AccountProfileCard = RouteComponent
