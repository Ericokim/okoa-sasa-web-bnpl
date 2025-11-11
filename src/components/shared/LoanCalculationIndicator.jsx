import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LoanCalculationIndicator({ className }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#F8971D]/40 bg-[#FFF7F0] px-4 py-2 text-sm font-medium text-[#C75A0B]',
        className,
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin text-[#F47120]" />
      <span>Calculating your loan limit…</span>
    </div>
  )
}

export default LoanCalculationIndicator
