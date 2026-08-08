import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, CircleDollarSign,
  Clock3, FileText, Gauge, LayoutDashboard, Menu, Pause, Play, Settings,
  Sparkles, Square, Timer, UsersRound, X, Zap,
} from 'lucide-react'
import './App.css'

const navItems = [['Features', 'features'], ['How It Works', 'how-it-works'], ['Pricing', 'pricing'], ['Resources', 'resources'], ['Blog', 'blog']]
const featureCards = [
  [Timer, 'Smart Time Tracking', "Start a timer or log time manually. It's simple, fast and accurate.", 'orange'],
  [BriefcaseBusiness, 'Project Management', 'Organize projects, tasks and clients in one beautiful workspace.', 'violet'],
  [BarChart3, 'Reports & Insights', 'See where your time goes and make smarter business decisions.', 'blue'],
  [FileText, 'Invoicing Made Easy', 'Generate invoices in seconds and get paid for your hard work.', 'green'],
]
const timeline = [
  ['Website Development', '3h 25m', 'orange'], ['Client Meeting', '1h 10m', 'violet'],
  ['Research & Planning', '2h 05m', 'blue'], ['Bug Fixing', '1h 02m', 'green'],
]
const sideItems = [[LayoutDashboard, 'Dashboard'], [Timer, 'Timer'], [BriefcaseBusiness, 'Projects'], [BarChart3, 'Reports'], [UsersRound, 'Clients'], [FileText, 'Invoices'], [Settings, 'Settings']]

function Brand({ dark = false, compact = false }) {
  return <Link to="/" className={`brand ${dark ? 'brand-dark' : ''}`} aria-label="myhourspay home">
    <span className="brand-mark"><Clock3 size={compact ? 17 : 20} strokeWidth={2.4} /></span>
    <span className="brand-name">myhours<span>pay</span></span>
  </Link>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="page-wrap nav-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="nav-actions"><Link to="/login" className="text-link">Log in</Link><Link to="/signup" className="button button-primary button-small">Start Tracking Free <ArrowRight size={15} /></Link></div>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    <div className={`mobile-nav ${open ? 'open' : ''}`}>
      {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
      <Link to="/signup" className="button button-primary" onClick={() => setOpen(false)}>Start Tracking Free <ArrowRight size={16} /></Link>
    </div>
  </header>
}

function DashboardPreview() {
  const [seconds, setSeconds] = useState(9992)
  const [running, setRunning] = useState(true)
  useEffect(() => {
    if (!running) return undefined
    const tick = window.setInterval(() => setSeconds(value => value + 1), 1000)
    return () => window.clearInterval(tick)
  }, [running])
  const display = new Date(seconds * 1000).toISOString().slice(11, 19)
  return <div className="dashboard-float" aria-label="myhourspay dashboard preview">
    <div className="dashboard-shell">
      <aside className="dash-sidebar">
        <Brand dark compact />
        <div className="sidebar-menu">{sideItems.map(([Icon, label], i) => <button key={label} className={i === 0 ? 'active' : ''}><Icon size={15} /><span>{label}</span></button>)}</div>
        <div className="sidebar-user"><span>A</span><div><b>Abdulqadir</b><small>Pro workspace</small></div></div>
      </aside>
      <div className="dash-main">
        <div className="dash-top"><div><small>FRIDAY, AUGUST 8</small><h3>Good morning, Abdulqadir <span>👋</span></h3></div><span className="status-pill"><i /> All systems ready</span></div>
        <div className="metric-grid">
          <div className="metric"><span><Clock3 size={15} /> Tracked Time</span><strong>08:42:16</strong><small>+12% from yesterday</small></div>
          <div className="metric"><span><CircleDollarSign size={15} /> Earnings</span><strong className="positive">$186.50</strong><small>At $22.40 average rate</small></div>
          <div className="metric productivity"><span><Gauge size={15} /> Productivity</span><strong>75%</strong><div className="metric-bar"><i /></div></div>
        </div>
        <div className="dash-content">
          <section className="session-card">
            <div className="card-label"><span>Current Session</span><i className={running ? 'recording' : ''}>{running ? 'Tracking' : 'Paused'}</i></div>
            <div className="session-title"><span className="session-icon"><Zap size={18} /></span><div><b>Website Development</b><small>myhourspay · Design system</small></div></div>
            <div className="live-time">{display}</div>
            <div className="timer-controls"><button onClick={() => setRunning(value => !value)} aria-label={running ? 'Pause timer' : 'Resume timer'}>{running ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button><button className="stop" onClick={() => { setRunning(false); setSeconds(0) }} aria-label="Stop timer"><Square size={14} fill="currentColor" /></button></div>
          </section>
          <section className="timeline-card"><div className="card-label"><span>Today’s Timeline</span><button>View report <ChevronRight size={13} /></button></div><div className="timeline-list">{timeline.map(([label, value, color]) => <div key={label}><i className={color} /><span>{label}</span><b>{value}</b></div>)}</div></section>
        </div>
        <div className="sync"><Check size={12} /> Synced — All devices</div>
      </div>
    </div>
  </div>
}

function Hero() {
  return <section className="hero">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="page-wrap hero-grid">
      <div className="hero-copy reveal visible"><span className="eyebrow"><Sparkles size={13} /> Simple time tracking for modern professionals</span><h1>Track your hours.<br />Know exactly what<br />your <span>time is worth.</span></h1><p>Time tracking that’s simple, powerful and built to help you get paid for every hour you work. Stay productive. Stay profitable.</p><div className="hero-actions"><Link to="/signup" className="button button-primary">Start Tracking Free <ArrowRight size={17} /></Link><a href="#how-it-works" className="button button-secondary"><span className="play-button"><Play size={12} fill="currentColor" /></span> See How It Works</a></div><div className="social-proof"><div className="avatar-stack"><span>AM</span><span>JL</span><span>SK</span><span>+</span></div><p>Built for professionals tracking time smarter</p></div></div>
      <DashboardPreview />
    </div>
  </section>
}

function TrustBar() {
  return <section className="trust-bar"><div className="page-wrap"><p>DESIGNED FOR FREELANCERS AND TEAMS WORLDWIDE</p><div className="logo-row"><span><i className="logo-orbit" /> Northstar</span><span><i className="logo-blocks" /> Stacked</span><span><i className="logo-wave" /> Modulo</span><span><i className="logo-diamond" /> Everwork</span><span><i className="logo-dot" /> Tandem</span></div></div></section>
}

function Features() {
  return <section id="features" className="section features"><div className="page-wrap"><div className="section-heading reveal"><span>POWERFUL BY DESIGN</span><h2>Everything you need to<br />track time and grow</h2><p>Simple tools that help you understand your time, improve your focus and run a healthier business.</p></div><div className="feature-grid">{featureCards.map(([Icon, title, text, color]) => <article key={title} className="feature-card reveal"><span className={`feature-icon ${color}`}><Icon size={22} /></span><h3>{title}</h3><p>{text}</p><a href="#how-it-works">Learn more <ArrowRight size={14} /></a></article>)}</div></div></section>
}

function Productivity() {
  const stats = [['Flexible', 'Ways to log time'], ['Clear', 'Project visibility'], ['Focused', 'Workday insights'], ['Private', 'Workspace by design']]
  return <section className="dark-band"><div className="dark-glow" /><div className="page-wrap dark-grid"><div className="dark-copy reveal"><span>BUILT FOR PRODUCTIVITY</span><h2>Focus on your work.<br />We’ll handle the rest.</h2><p>myhourspay is lightweight, powerful and designed with sensible privacy controls for modern work.</p><a href="#resources">Explore how it works <ArrowRight size={15} /></a></div><div className="stats-grid">{stats.map(([value, label]) => <div key={label} className="stat-box reveal"><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>
}

function HowItWorks() {
  const steps = [['01', 'Start Tracking', 'Start a timer or log time manually.'], ['02', 'Organize & Manage', 'Add projects, tasks and keep everything neat.'], ['03', 'Analyze & Grow', 'Get insights, create invoices and grow your business.']]
  return <section id="how-it-works" className="section how"><div className="page-wrap"><div className="section-heading reveal"><span>A BETTER WORKFLOW</span><h2>Track time in 3<br />simple steps</h2></div><div className="steps">{steps.map(([number, title, text], i) => <article key={number} className="step reveal"><div className="step-node"><span>{number}</span>{i < 2 && <i />}</div><div className="step-icon">{i === 0 ? <Timer /> : i === 1 ? <BriefcaseBusiness /> : <BarChart3 />}</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}

function FinalCTA() {
  return <section id="pricing" className="section cta-section"><div className="page-wrap"><div className="final-cta reveal"><div className="cta-orb" /><span className="eyebrow"><Sparkles size={13} /> Make every hour count</span><h2>Ready to take control<br />of your time?</h2><p>Create your workspace and see how much clarity a better time tracker can bring.</p><Link to="/signup" className="button button-primary">Start Tracking Free <ArrowRight size={17} /></Link><div className="cta-notes"><span><Check size={14} /> Quick setup</span><span><Check size={14} /> Start in your browser</span></div></div></div></section>
}

function Footer() {
  const columns = [['Product', ['Features', 'How It Works', 'Pricing', 'Changelog']], ['Company', ['About Us', 'Blog', 'Careers', 'Contact']], ['Resources', ['Help Center', 'Guides', 'Templates', 'API Docs']]]
  return <footer id="resources" className="footer"><div className="page-wrap"><div className="footer-grid"><div className="footer-brand"><Brand dark /><p>Simple time tracking for freelancers and teams who value productivity and transparency.</p></div>{columns.map(([heading, links]) => <div className="footer-column" key={heading}><h3>{heading}</h3>{links.map(link => <a href={link === 'Features' ? '#features' : link === 'How It Works' ? '#how-it-works' : '#'} key={link}>{link}</a>)}</div>)}<div className="newsletter"><h3>Stay in the loop</h3><p>Product news and practical time tips, occasionally.</p><form onSubmit={e => e.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight size={16} /></button></form></div></div><div className="footer-bottom"><span>© 2026 myhourspay</span><div><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div></div></div></footer>
}

function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.visible)')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: .12 })
    nodes.forEach(node => observer.observe(node)); return () => observer.disconnect()
  }, [])
  return null
}

export default function App() {
  return <><RevealObserver /><Navbar /><main><Hero /><TrustBar /><Features /><Productivity /><HowItWorks /><FinalCTA /></main><Footer /></>
}
