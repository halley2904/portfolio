import type { Project } from '../content/site';

const dot = ['#3E6A50', '#C9A84E', '#C98B6B'];

export default function Flow({ d }: { d: Project['diagram'] }) {
  return (
    <figure className="rv overflow-hidden rounded-[28px] border border-txt/10 bg-white/50 p-6 md:p-10">
      <figcaption className="eyebrow text-txt-faint">{d.title}</figcaption>
      <ol className="mt-8 flex flex-col gap-0 md:flex-row md:items-stretch">
        {d.steps.map((s, i) => (
          <li key={s.label} className="flex flex-col md:flex-1 md:flex-row md:items-center">
            <div className="rv flex-1 rounded-[18px] border border-txt/10 bg-paper p-5 transition-transform duration-500 ease-soft hover:-translate-y-1" style={{ ['--d' as string]: `${i * 0.12}s` }}>
              <span className="font-mono text-[11px] text-sage-deep">0{i + 1}</span>
              <p className="mt-2 text-[15.5px] font-semibold leading-snug">{s.label}</p>
              <p className="mt-1 text-[13.5px] leading-snug text-txt-muted">{s.note}</p>
            </div>
            {i < d.steps.length - 1 && (
              <>
                <span className="flowline mx-2 hidden h-[2px] w-6 shrink-0 md:block" />
                <span className="flowline-v mx-auto my-2 block h-6 w-[2px] md:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      {d.outputs && (
        <div className="mt-6">
          <span className="flowline-v mx-auto block h-8 w-[2px]" />
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {d.outputs.map((o, i) => (
              <div key={o} className="rv flex items-center justify-center gap-2.5 rounded-full border border-txt/10 bg-paper px-4 py-3 text-[14.5px] font-semibold" style={{ ['--d' as string]: `${0.4 + i * 0.1}s` }}>
                <span className="h-2 w-2 rounded-full" style={{ background: dot[i] }} />
                {o}
              </div>
            ))}
          </div>
        </div>
      )}
    </figure>
  );
}
