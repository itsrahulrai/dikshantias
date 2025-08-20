'use client'
import { ReactElement, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FaqItem {
  id: number,
  title: string,
  content: ReactElement
}

const faqs: FaqItem[] = [
  {
    id: 1,
    title: 'PROGRAMME - 1: 60% Scholarship Programme for BPL Students',
    content: (
      <div className="text-md text-[#040c33] px-4 pb-4 text-left">
        <p className='text-blue-950'>
          Providing coaching to the students of <strong>BPL</strong> under this program, 60% scholarship is provided in the fees (Online/Offline) for people residing in India (100 students per Year). The following certificates are required to be submitted to take advantage of this program.
        </p>
        <ul className="list-disc pl-6 mt-2 text-blue-950">
          <li><em>Aadhar Card</em></li>
          <li><em>BPL Card</em></li>
          <li><em>4 Passport size photograph</em></li>
        </ul>
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Apply Now
        </button>
      </div>
    ),
  },
  {
    id: 2,
    title: 'PROGRAMME - 2: 50% Scholarship PROGRAMME FOR SC / ST / OBC / Minorities / Girls / EWS / Defence Wards Students.',
    content: (
      <div className="text-md text-[#040c33] px-4 pb-4 text-left">
        <p className='text-blue-950'>
          Under this program, 50% scholarship in fees is provided for coaching (online/offline) to unreserved category of <strong>SC/ST/OBC/Minorities/Girls/EWS/Defence Wards.</strong>  The following certificates are required to be submitted to take advantage of this program.

        </p>
        <ul className="list-disc pl-6 mt-2 text-blue-950">
          <li><em>Aadhar Card</em></li>
          <li><em>Caste Certificate / Minorities Certificate & Annual family income certificate of less than Rs. 8 lakhs</em></li>
            <li><em>Any Valid documents certifying Defence Personal.</em></li>
          <li><em>4 Passport size photograph</em></li>
        </ul>
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Apply Now
        </button>
      </div>
    ),
  },
  {
    id: 3,
    title: 'PROGRAMME - 3: 40% Scholarship Programme for Meritorious Students',
    content: (
      <div className="text-md text-[#040c33] px-4 pb-4 text-left">
        <p className='text-blue-950'>
         Under this program, 40% scholarship in fees is provided for coaching (online/offline) to Meritorious Students (only for 50 students per year). The following documents are required to be submitted to take advantage of this program. A simple aptitude test will be conducted online / Oflline

        </p>
        <ul className="list-disc pl-6 mt-2 text-blue-950">
          <li><em>Aadhar Card</em></li>
          <li><em>4 Passport size photograph</em></li>          
        </ul>
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Apply Now
        </button>
      </div>
    ),
  },
]

export default function ScholershipFaq() {
  const [active, setActive] = useState<number | null>(1)

  const toggleAccordion = (id: number) => {
    setActive(active === id ? null : id)
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:p-0">
      {faqs.map((faq) => (
        <div key={faq.id} className="mb-2 bg-[#ecf4fc] rounded-lg">
          <button
            onClick={() => toggleAccordion(faq.id)}
            className="w-full text-md flex justify-between items-center text-left px-4 py-3 font-semibold text-slate-900"
          >
            {faq.title}
            {active === faq.id ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              active === faq.id ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            {active === faq.id && faq.content}
          </div>
        </div>
      ))}
    </div>
  )
}
