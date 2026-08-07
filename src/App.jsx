import { useState } from 'react'
import {
  Apple, ArrowRight, Bell, BriefcaseMedical, Calculator,
  Car, Check, CheckCircle2, ChevronDown, Clock3, FileText, HardHat,
  Home, LockKeyhole, Menu, MoreHorizontal, Play, PoundSterling,
  ShieldCheck, Star, Store, TrendingUp, Umbrella,
  WalletCards, Warehouse, X,
} from 'lucide-react'
import './App.css'

const navItems = ['Features', 'How It Works', 'Pricing', 'About', 'Blog', 'Contact']

const features = [
  [Clock3, 'Track Hours Easily', 'Clock in and out in seconds from anywhere.'],
  [PoundSterling, 'Calculate Overtime', 'Automatically calculate overtime, double time and shift premiums.'],
  [FileText, 'Know Your Earnings', 'See your gross pay, deductions and take-home pay instantly.'],
  [TrendingUp, 'Detailed Reports', 'Weekly, monthly and yearly reports that you can export and share.'],
  [LockKeyhole, 'Secure & Private', 'Your data is encrypted and your privacy is our priority.'],
]

const workers = [
  [Car, 'Drivers'], [Warehouse, 'Warehouse Staff'], [BriefcaseMedical, 'Nurses'],
  [Store, 'Retail Staff'], [HardHat, 'Construction Workers'], [ShieldCheck, 'Security Guards'],
  [MoreHorizontal, 'And more...'],
]

const checks = [
  'Track normal hours, overtime, double time & premiums',
  'Calculate gross pay, tax, NI and take-home pay',
  'Holiday pay tracker',
  'Export timesheets & share with employers',
  'Works across web, iOS and Android',
]

function Brand() {
  return <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="HourHabor home">
    <span className="brand-mark"><Clock3 size={24} strokeWidth={2.5}/></span>
    <span>
      <span className="block text-xl font-extrabold leading-none tracking-tight text-slate-900">Hour<span className="text-green-600">Habor</span></span>
      <span className="mt-1 block text-[8px] font-bold uppercase tracking-[.12em] text-slate-400">Your working hours, all in one place.</span>
    </span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div className="page-wrap flex h-[76px] items-center justify-between gap-7">
      <Brand />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {navItems.map((item, i) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="flex items-center gap-1 text-[13px] font-semibold text-slate-700 transition-colors hover:text-green-600">{item}{i === 0 && <ChevronDown size={14}/>}</a>)}
      </nav>
      <div className="hidden shrink-0 items-center gap-3 lg:flex">
        <button className="btn-outline !px-5 !py-2.5">Log In</button>
        <button className="btn-primary !px-5 !py-2.5">Sign Up Free</button>
      </div>
      <button className="grid size-10 place-items-center rounded-lg border border-slate-200 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
      {navItems.map(item => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 font-semibold text-slate-700">{item}</a>)}
      <div className="mt-4 flex gap-3"><button className="btn-outline flex-1">Log In</button><button className="btn-primary flex-1">Sign Up Free</button></div>
    </nav>}
  </header>
}

function MiniLogo() {
  return <div className="flex items-center gap-1.5 font-extrabold text-slate-900"><span className="grid size-6 place-items-center rounded-full bg-green-600 text-white"><Clock3 size={14}/></span>Hour<span className="-ml-1.5 text-green-600">Habor</span></div>
}

function FrontPhone() {
  return <div className="phone front-phone">
    <div className="phone-notch" />
    <div className="phone-screen">
      <div className="flex items-center justify-between"><Menu size={17}/><MiniLogo/><Bell size={17}/></div>
      <div className="earnings-card mt-4">
        <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-green-100"><span>THIS WEEK</span><span className="rounded-full bg-white/20 px-2 py-1 tracking-normal">↑ 12.5%</span></div>
        <div className="mt-2 text-[28px] font-extrabold tracking-tight">£586.40</div>
        <div className="flex justify-between text-[9px] text-green-50"><span>Total Earnings</span><span>vs last week</span></div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Stat label="Normal Hours" value="32.00 hrs" />
        <Stat label="Overtime Hours" value="8.50 hrs" accent />
      </div>
      <div className="mt-4 flex items-center justify-between"><b className="text-[11px]">Earnings Breakdown</b><span className="text-[9px] font-semibold text-green-600">View all</span></div>
      <div className="mt-1.5 divide-y divide-slate-100">
        <PayRow label="Normal Pay" value="£480.00" />
        <PayRow label="Overtime (1.5x)" value="£96.00" />
        <PayRow label="Overtime (2x)" value="£10.40" />
      </div>
      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-[10px] font-bold text-white"><Clock3 size={13}/>Clock In</button>
      <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-[10px] font-bold text-slate-700"><Play size={12}/>View Timesheet</button>
      <PhoneTabs />
    </div>
  </div>
}

function Stat({ label, value, accent }) {
  return <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5"><div className="text-[8px] text-slate-400">{label}</div><div className={`mt-1 text-[12px] font-extrabold ${accent ? 'text-green-600' : 'text-slate-800'}`}>{value}</div></div>
}

function PayRow({label, value}) {
  return <div className="flex items-center gap-2 py-2"><span className="grid size-6 place-items-center rounded-lg bg-green-50 text-green-600"><PoundSterling size={12}/></span><span className="flex-1 text-[9px] text-slate-500">{label}</span><b className="text-[10px] text-slate-800">{value}</b></div>
}

function PhoneTabs() {
  return <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-slate-100 bg-white px-2 py-2">
    {[[Home,'Home'],[Clock3,'Timesheet'],[TrendingUp,'Reports'],[MoreHorizontal,'More']].map(([Icon,label], i) => <div key={label} className={`grid justify-items-center gap-0.5 text-[7px] ${i === 0 ? 'text-green-600' : 'text-slate-400'}`}><Icon size={13}/><span>{label}</span></div>)}
  </div>
}

function BackPhone() {
  return <div className="phone back-phone">
    <div className="phone-notch" />
    <div className="phone-screen !pt-8">
      <div className="flex items-center justify-between"><b className="text-[11px]">Monthly Overview</b><Bell size={14}/></div>
      <div className="mt-5 flex items-center justify-between text-[9px] font-semibold"><span>May 2024</span><ChevronDown size={12}/></div>
      <div className="mt-3 text-[23px] font-extrabold tracking-tight">£2,347.80</div><div className="text-[8px] text-slate-400">Total Earnings</div>
      <div className="mt-5 flex h-20 items-end gap-2 border-b border-slate-200 px-1">{[35,48,43,62,55,74,91].map((h,i)=><span key={i} className="flex-1 rounded-t bg-green-500" style={{height:`${h}%`, opacity:.55+i*.06}} />)}</div>
      <div className="mt-4 divide-y divide-slate-100">{[['Regular Pay','£1,920.00'],['Overtime (1.5x)','£320.00'],['Overtime (2x)','£107.80'],['Deductions','-£0.00']].map(([l,v])=><div key={l} className="flex justify-between py-2.5 text-[9px]"><span className="text-slate-500">{l}</span><b>{v}</b></div>)}</div>
    </div>
  </div>
}

function Phones() {
  return <div className="phone-stage" aria-label="HourHabor mobile app previews"><div className="phone-glow"/><BackPhone/><FrontPhone/><div className="float-chip chip-top"><span className="grid size-7 place-items-center rounded-full bg-green-100 text-green-600"><TrendingUp size={14}/></span><span><b>+12.5%</b><small>this week</small></span></div><div className="float-chip chip-bottom"><CheckCircle2 className="text-green-600" size={22}/><span><b>Hours saved</b><small>Automatically</small></span></div></div>
}

function Hero() {
  return <section id="top" className="overflow-hidden bg-white py-14 md:py-20">
    <div className="page-wrap grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-6">
      <div className="relative z-10 max-w-xl">
        <span className="eyebrow">For hourly workers, by people who get it</span>
        <h1 className="mt-6 text-[44px] font-extrabold leading-[1.04] tracking-[-.04em] text-slate-900 sm:text-6xl lg:text-[68px]">Track Your Hours.<br/><span className="text-green-600">Know Your Worth.</span></h1>
        <p className="mt-6 max-w-lg text-[17px] leading-8 text-slate-600">HourHabor helps you track your hours, calculate overtime, and see exactly what you’ll earn – before payday. Simple, accurate and built for real life.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button className="btn-primary">Get Started Free <ArrowRight size={18}/></button><button className="btn-outline"><Play className="fill-green-600 text-green-600" size={17}/>See How It Works</button></div>
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="text-green-600" size={17}/><span>Free to start</span><i className="size-1 rounded-full bg-slate-300"/><span>No credit card required</span></div>
      </div>
      <Phones />
    </div>
  </section>
}

function FeatureStrip() {
  return <section id="features" className="border-y border-slate-100 bg-slate-50 py-12"><div className="page-wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">{features.map(([Icon,title,text])=><article key={title} className="text-center"><span className="mx-auto grid size-12 place-items-center rounded-xl bg-green-100 text-green-600"><Icon size={23}/></span><h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3><p className="mx-auto mt-2 max-w-[210px] text-xs leading-5 text-slate-500">{text}</p></article>)}</div></section>
}

function WorkerSection() {
  return <section className="py-16 md:py-20"><div className="page-wrap grid items-center gap-10 lg:grid-cols-[300px_1fr]"><h2 className="section-title">Built for every kind<br/>of hourly worker</h2><div className="grid grid-cols-2 gap-7 sm:grid-cols-4 lg:grid-cols-7">{workers.map(([Icon,label])=><div key={label} className="text-center text-green-600"><Icon className="mx-auto" size={30} strokeWidth={1.7}/><span className="mt-3 block text-xs font-semibold leading-4 text-slate-600">{label}</span></div>)}</div></div></section>
}

function DonutCard() {
  return <article className="dashboard-card col-span-2 sm:col-span-1 sm:row-span-2"><h3>Hours Summary</h3><div className="mt-5 flex flex-col items-center gap-5 sm:flex-row"><div className="donut"><div><b>40.50</b><small>Total hrs</small></div></div><div className="w-full space-y-3">{[['Normal','32.00','bg-green-500'],['Overtime (1.5x)','6.50','bg-blue-400'],['Overtime (2x)','2.00','bg-amber-400']].map(([l,v,c])=><div key={l} className="flex items-center gap-2 text-[10px]"><i className={`size-2 rounded-full ${c}`}/><span className="flex-1 text-slate-500">{l}</span><b>{v}</b></div>)}</div></div></article>
}

function MetricCard({Icon,title,value,caption,color}) {
  return <article className="dashboard-card relative overflow-hidden"><span className={`absolute right-4 top-4 grid size-10 place-items-center rounded-xl ${color}`}><Icon size={19}/></span><h3>{title}</h3><div className="mt-6 text-[22px] font-extrabold tracking-tight text-slate-900">{value}</div><p className="mt-1 text-[10px] text-slate-400">{caption}</p></article>
}

function PowerfulFeatures() {
  return <section className="bg-slate-50 py-16 md:py-24"><div className="page-wrap grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr]">
    <div><span className="text-xs font-extrabold uppercase tracking-[.2em] text-green-600">Powerful features</span><h2 className="section-title mt-4 !text-4xl md:!text-[46px]">Everything you need,<br/>in one simple app.</h2><ul className="mt-7 space-y-4">{checks.map(item=><li key={item} className="flex gap-3 text-[14px] font-medium text-slate-700"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-600"><Check size={13} strokeWidth={3}/></span>{item}</li>)}</ul><button className="btn-primary mt-8">Explore All Features <ArrowRight size={18}/></button></div>
    <div className="rounded-[28px] border border-slate-200 bg-slate-100/80 p-4 shadow-sm sm:p-7"><div className="grid grid-cols-2 gap-4 sm:grid-cols-[1.25fr_1fr]"><DonutCard/><MetricCard Icon={WalletCards} title="Take Home Pay" value="£452.30" caption="Estimated" color="bg-green-100 text-green-600"/><MetricCard Icon={Calculator} title="Tax & NI (Est.)" value="£134.10" caption="Total Deductions" color="bg-blue-100 text-blue-500"/><MetricCard Icon={Umbrella} title="Holiday Pay Accrued" value="£276.85" caption="This Year" color="bg-amber-100 text-amber-500"/></div></div>
  </div></section>
}

function StoreBadge({apple}) {
  return <a href="#" className="flex min-w-[164px] items-center gap-3 rounded-xl bg-slate-950 px-4 py-2.5 text-white transition hover:bg-slate-800">{apple ? <Apple size={28} fill="white"/> : <span className="play-triangle"/>}<span className="text-left"><small className="block text-[8px] uppercase leading-none">{apple ? 'Download on the' : 'Get it on'}</small><b className="mt-1 block text-sm leading-none">{apple ? 'App Store' : 'Google Play'}</b></span></a>
}

function TrustBar() {
  return <footer className="border-t border-slate-200 bg-white py-10"><div className="page-wrap flex flex-col items-center justify-between gap-7 md:flex-row"><div className="text-center md:text-left"><p className="text-xs font-medium text-slate-500">Trusted by workers across the UK</p><div className="mt-2 flex items-center justify-center gap-1 md:justify-start">{Array.from({length:5}).map((_,i)=><Star key={i} size={17} className="fill-amber-400 text-amber-400"/>)}</div><p className="mt-2 text-sm font-bold text-slate-800">4.8/5 from 1,200+ reviews</p></div><div className="flex flex-col gap-3 sm:flex-row"><StoreBadge apple/><StoreBadge/></div></div></footer>
}

export default function App() {
  return <><Header/><main><Hero/><FeatureStrip/><WorkerSection/><PowerfulFeatures/></main><TrustBar/></>
}
