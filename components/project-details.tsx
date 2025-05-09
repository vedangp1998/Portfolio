export default function ProjectDetails({ responsibilities }: { responsibilities: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1">
      {responsibilities.map((resp, idx) => (
        <li key={idx} className="text-xs sm:text-sm text-foreground/70 font-light tracking-tight text-pretty">
          {resp}
        </li>
      ))}
    </ul>
  )
}
