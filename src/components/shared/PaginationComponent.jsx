import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'

export function PaginationComponent() {
  return (
    <div className="flex items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              disabled
              className="h-10 w-10 rounded-2xl border border-[#E8ECF4] bg-white opacity-30 cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 text-[#252525] md:h-6 md:w-6" />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-2xl border border-[#F8971D] bg-gradient-to-b from-[rgba(248,151,29,0.12)] to-[rgba(238,49,36,0.12)] hover:bg-gradient-to-b hover:from-[rgba(248,151,29,0.12)] hover:to-[rgba(238,49,36,0.12)]"
            >
              <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-center text-base font-semibold leading-normal text-transparent">
                1
              </span>
            </Button>
          </PaginationItem>

          {[2, 3].map((page) => (
            <PaginationItem key={page}>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-2xl border border-[#E8ECF4] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-center text-base font-semibold leading-normal text-[#252525]">
                  {page}
                </span>
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem className="hidden md:inline-flex">
            <PaginationEllipsis className="text-center text-base font-semibold leading-normal text-[#252525]" />
          </PaginationItem>

          <PaginationItem className="hidden md:flex">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-2xl border border-[#E8ECF4] bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-center text-base font-semibold leading-normal text-[#252525]">
                7
              </span>
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-2xl border border-[#E8ECF4] bg-white hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-[#252525] md:h-6 md:w-6" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}