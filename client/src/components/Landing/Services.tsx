import { Calendar, Clock, Users2 } from "lucide-react"

const service = [
    {
        logo: <Calendar/>,
        title: "Easy Booking",
        description: "Browse available time slots and book appointments instantly with just a few clicks.",
        background: "bg-blue-200",
        text: "text-blue-700"
    },
    {
        logo: <Users2/>,
        title: "Easy Booking",
        description: "Browse available time slots and book appointments instantly with just a few clicks.",
        background: "bg-purple-200",
        text: "text-purple-700"
    },
    {
        logo: <Clock/>,
        title: "Easy Booking",
        description: "Browse available time slots and book appointments instantly with just a few clicks.",
        background: "bg-green-200",
        text: "text-green-700"
    },
]

const Services = () => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center flex-col mt-12 p-8">
        <h2 className="font-semibold text-2xl mb-6">Everything You Need</h2>
        <p className="text-gray-400 mb-6 text-lg">Powerful features to streamline your appointment scheduling experience</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
            {service.map((service, idx)=>{
              return (
                <div key={idx} className="flex flex-col gap-8 bg-white outline-[0.5px] outline-gray-100 rounded-2xl p-8">
                  <span className={`p-4 ${service.background} ${service.text} max-w-[max-content] rounded-2xl`}>{service.logo}</span>
                  <div className="text-lg font-semibold">{service.title}</div>
                  <div className="text-gray-400">{service.description}</div>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default Services