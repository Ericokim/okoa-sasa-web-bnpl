import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

export function SpecificationsTable({ specifications }) {
  return (
    <Tabs
      defaultValue="specifications"
      className="flex w-full flex-col items-start gap-6 md:max-w-[730px] md:gap-10"
    >
      {/* Tabs Navigation */}
      <TabsList className="flex h-auto w-full items-center gap-0 rounded-none bg-transparent p-0 md:max-w-[630px]">
        <TabsTrigger
          value="specifications"
          className="group flex flex-1 flex-col items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:gap-3"
        >
          <div className="self-stretch text-center text-base font-normal capitalize leading-[140%]  group-data-[state=active]:font-bold group-data-[state=active]:text-[#252525] md:text-2xl">
            Specifications
          </div>
          <div className="h-[2px] self-stretch bg-[#E8ECF4] group-data-[state=active]:h-1 group-data-[state=active]:bg-[linear-gradient(180deg,#F8971D_0%,#EE3124_100%)]" />
        </TabsTrigger>

        <TabsTrigger
          value="description"
          className="group flex flex-1 flex-col items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:gap-3"
        >
          <div className="self-stretch text-center text-base font-normal capitalize leading-[140%]  group-data-[state=active]:font-bold group-data-[state=active]:text-[#252525] md:text-2xl">
            Description
          </div>
          <div className="h-[2px] self-stretch bg-[#E8ECF4] group-data-[state=active]:h-1 group-data-[state=active]:bg-[linear-gradient(180deg,#F8971D_0%,#EE3124_100%)]" />
        </TabsTrigger>

        <TabsTrigger
          value="benefits"
          className="group flex flex-1 flex-col items-center gap-2 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none md:gap-3"
        >
          <div className="self-stretch text-center text-base font-normal capitalize leading-[140%]  group-data-[state=active]:font-bold group-data-[state=active]:text-[#252525] md:text-2xl">
            Benefits
          </div>
          <div className="h-[2px] self-stretch bg-[#E8ECF4] group-data-[state=active]:h-1 group-data-[state=active]:bg-[linear-gradient(180deg,#F8971D_0%,#EE3124_100%)]" />
        </TabsTrigger>
      </TabsList>

      {/* Specifications Content */}
      <TabsContent value="specifications" className="mt-0 w-full">
        <Card className="flex flex-col items-start self-stretch gap-0 border-none p-0 shadow-none">
          {Object.entries(specifications).map(([key, value], index) => {
            const isFirst = index === 0
            const isLast = index === Object.entries(specifications).length - 1

            return (
              <div key={key} className="flex items-center self-stretch">
                <div
                  className={`flex w-28 items-center gap-2.5 border border-[#E8ECF4] bg-[#F9FAFB] p-3 md:w-[277px] md:p-4 ${
                    isFirst ? 'rounded-tl-xl md:rounded-tl-2xl' : ''
                  } ${isLast ? 'rounded-bl-xl md:rounded-bl-2xl' : ''}`}
                >
                  <div className="text-sm font-bold capitalize leading-[140%] text-[#252525] md:text-xl">
                    {key}
                  </div>
                </div>

                <div
                  className={`flex flex-1 items-center gap-2.5 self-stretch border border-[#E8ECF4] p-3 md:p-4 ${
                    isFirst ? 'rounded-tr-xl md:rounded-tr-2xl' : ''
                  } ${isLast ? 'rounded-br-xl md:rounded-br-2xl' : ''}`}
                >
                  <div className="text-sm font-normal capitalize leading-[140%] text-[#252525] md:text-lg">
                    {value}
                  </div>
                </div>
              </div>
            )
          })}
        </Card>
      </TabsContent>

      {/* Description Content */}
      <TabsContent value="description" className="mt-0 w-full">
        <div className="self-stretch py-4 text-center md:py-6">
          <p className="text-sm font-normal leading-[140%]  md:text-base">
            The iPhone 14 features a stunning 6.1-inch Super Retina XDR display,
            offering an immersive viewing experience with vibrant colors and
            deep blacks. Powered by the A15 Bionic chip, it delivers exceptional
            performance for all your tasks.
          </p>
        </div>
      </TabsContent>

      {/* Benefits Content */}
      <TabsContent value="benefits" className="mt-0 w-full">
        <div className="self-stretch py-4 md:py-6">
          <ul className="list-disc space-y-2 pl-5 md:pl-6">
            <li className="text-sm font-normal leading-[140%]  md:text-base">
              Advanced dual-camera system for stunning photos
            </li>
            <li className="text-sm font-normal leading-[140%]  md:text-base">
              All-day battery life
            </li>
            <li className="text-sm font-normal leading-[140%]  md:text-base">
              Durable design with Ceramic Shield
            </li>
            <li className="text-sm font-normal leading-[140%]  md:text-base">
              5G capable for super-fast downloads
            </li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  )
}
