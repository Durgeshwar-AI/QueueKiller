import { Calendar, Clock, Users2 } from "lucide-react"

const service = [
    {
        logo: <Calendar/>,
        title: "Easy Booking",
        description: "Browse available time slots and book appointments instantly with just a few clicks.",
    },
    {
        logo: <Users2/>,
        title: "Easy Booking",
        description: "Browse available time slots and book appointments instantly with just a few clicks.",
    },
    {
        logo: <Clock/>,
        title: "Easy Booking",
        description: "Browse available time slots and book appointments instantly with just a few clicks.",
    },
]

const Services = () => {
  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center flex-col">
        <h2 className="font-bold text-2xl">Why Choose ScheduleBook?</h2>
        <div className="grid grid-cols-3 p-6 gap-4">
            {service.map((service)=>{
              return (
                <div className="flex flex-col gap-6 bg-white outline-[0.5px] outline-gray-100 rounded-2xl p-8">
                  <span className="p-4 bg-gray-200 max-w-[max-content] rounded-2xl">{service.logo}</span>
                  <div className="text-lg font-semibold">{service.title}</div>
                  <div>{service.description}</div>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default Services