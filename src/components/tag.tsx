import { Building2, Calendar, MapPin } from 'lucide-react'

interface Props {
  children: string
}

export default function Tag ({ children }: Props) {
  const [type, tag] = children.split(/:/g)

  const getTagIcon = () => {
    switch (type) {
      case 'city': return <Building2 size={16} />
      case 'country': return <MapPin size={16} />
      case 'year': return <Calendar size={16} />
      default: return <></>
    }
  }

  return (
    <li className="rounded p-2 bg-[#5B8F21] text-[#E6F1E1] leading-none text-md flex items-center gap-1.5">
      {tag && getTagIcon()}
      {tag || type}
    </li>
  )
}
