import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	ArrowDownToLine, BarChart3, Bell, CalendarDays, Check, ChevronDown, ChevronLeft,
	ChevronRight, Clock3, FileSpreadsheet, FileText, HelpCircle, LayoutDashboard,
	Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck, Timer,
	TrendingDown, TrendingUp, X,
} from 'lucide-react'
import './DashboardPage.css'

const navigation = [
	[LayoutDashboard, 'Overview', '/dashboard'],
	[CalendarDays, 'Hours calendar', '#calendar'],
	[BarChart3, 'Reports', '#reports'],
	[FileSpreadsheet, 'Exports', '#exports'],
]

const recentEntries = [
	['Mon, 10 Aug', '08:30', '17:00', '30 min', '8h 00m', 'complete'],
	['Fri, 7 Aug', '09:00', '17:30', '30 min', '8h 00m', 'complete'],
	['Thu, 6 Aug', '08:45', '16:45', '30 min', '7h 30m', 'complete'],
	['Wed, 5 Aug', '09:15', '18:00', '45 min', '8h 00m', 'complete'],
]

const calendarDays = [
	{ day: 27, muted: true }, { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true }, { day: 31, muted: true },
	{ day: 1 }, { day: 2 }, { day: 3, hours: '8h' }, { day: 4, hours: '8h' }, { day: 5, hours: '8h' },
	{ day: 6, hours: '7h 30m' }, { day: 7, hours: '8h' }, { day: 8 }, { day: 9 }, { day: 10, hours: '8h', today: true },
	{ day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 },
	{ day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
	{ day: 29 }, { day: 30 }, { day: 31 }, { day: 1, muted: true }, { day: 2, muted: true }, { day: 3, muted: true }, { day: 4, muted: true }, { day: 5, muted: true }, { day: 6, muted: true },
]

function DashboardBrand() {
	return <Link to="/" className="app-brand" aria-label="myhourspay home">
		<span className="app-brand-mark"><Clock3 size={19} strokeWidth={2.4} /></span>
		<span>myhours<b>pay</b></span>
	</Link>
}

export function DashboardSidebar({ open, onClose }) {
	return <>
		{open && <button className="app-sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
		<aside className={`app-sidebar ${open ? 'is-open' : ''}`}>
			<div className="app-sidebar-head"><DashboardBrand /><button onClick={onClose} aria-label="Close navigation"><X size={19} /></button></div>
			<div className="workspace-switcher"><span>A</span><div><small>WORKSPACE</small><strong>Abdulqadir</strong></div><ChevronDown size={15} /></div>
			<nav className="app-nav" aria-label="Dashboard navigation">
				<p>WORKSPACE</p>
				{navigation.map(([Icon, label, href], index) => <Link key={label} to={href} className={index === 0 ? 'active' : ''} onClick={onClose}><Icon size={18} /><span>{label}</span>{index === 0 && <i />}</Link>)}
				<p>ACCOUNT</p>
				<a href="#settings"><Settings size={18} /><span>Settings</span></a>
				<a href="#help"><HelpCircle size={18} /><span>Help & support</span></a>
			</nav>
			<div className="app-sidebar-foot"><div className="security-note"><ShieldCheck size={17} /><div><b>Private workspace</b><small>Your records are visible only to you.</small></div></div><div className="account-card"><span>AQ</span><div><b>Abdulqadir</b><small>abdulqadir@example.com</small></div><button aria-label="Account options"><MoreHorizontal size={18} /></button></div></div>
		</aside>
	</>
}

export function DashboardHeader({ onMenu, onAddEntry }) {
	return <header className="app-header">
		<div className="app-header-title"><button className="app-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button><div><span>WORKSPACE / OVERVIEW</span><h1>Dashboard</h1></div></div>
		<div className="app-header-actions"><label className="app-search"><Search size={16} /><span className="sr-only">Search records</span><input placeholder="Search records" /></label><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><button className="app-add-button" onClick={onAddEntry}><Plus size={17} /> Add hours</button></div>
	</header>
}

export function DashboardFooter() {
	return <footer className="app-footer"><span>© 2026 myhourspay</span><div><span><i /> All records saved</span><a href="#privacy">Privacy</a><a href="#support">Support</a></div></footer>
}

export function EmptyState({ icon: Icon = FileText, title = 'Nothing here yet', description = 'New records will appear here when they are added.', action, onAction }) {
	return <div className="app-empty"><span><Icon size={22} /></span><h3>{title}</h3><p>{description}</p>{action && <button onClick={onAction}><Plus size={15} /> {action}</button>}</div>
}

export function DashboardShell({ children, onAddEntry }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	return <div className="app-shell"><DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="app-workspace"><DashboardHeader onMenu={() => setSidebarOpen(true)} onAddEntry={onAddEntry} /><main className="app-content">{children}</main><DashboardFooter /></div></div>
}

function StatCard({ icon: Icon, label, value, note, tone = 'orange', trend }) {
	return <article className="summary-card"><div className={`summary-icon ${tone}`}><Icon size={19} /></div><div className="summary-heading"><span>{label}</span><button aria-label={`${label} options`}><MoreHorizontal size={17} /></button></div><strong>{value}</strong><small className={trend === 'down' ? 'negative' : ''}>{trend === 'up' && <TrendingUp size={13} />}{trend === 'down' && <TrendingDown size={13} />}{note}</small></article>
}

function WeeklyChart() {
	const values = [8, 8, 8, 7.5, 8, 0, 0]
	return <article className="panel weekly-panel"><div className="panel-head"><div><span>WEEKLY HOURS</span><h2>This week</h2></div><button>10–16 Aug <ChevronDown size={14} /></button></div><div className="weekly-total"><strong>39h 30m</strong><span className="target-short"><TrendingDown size={13} /> 30m below target</span></div><div className="bar-chart" aria-label="Weekly hours chart">{values.map((value, index) => <div key={index} className="bar-column"><span>{value ? `${value}h` : '—'}</span><div><i style={{ height: `${value / 8 * 100}%` }} /></div><b>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</b></div>)}</div><div className="chart-legend"><span><i className="actual" /> Recorded</span><span><i /> 8h daily guide</span></div></article>
}

function MonthCalendar({ onAddEntry }) {
	return <article id="calendar" className="panel calendar-panel"><div className="panel-head"><div><span>MONTHLY CALENDAR</span><h2>August 2026</h2></div><div className="calendar-controls"><button aria-label="Previous month"><ChevronLeft size={16} /></button><button>Today</button><button aria-label="Next month"><ChevronRight size={16} /></button></div></div><div className="calendar-weekdays">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{calendarDays.map((item, index) => <button key={`${item.day}-${index}`} className={`${item.muted ? 'muted' : ''} ${item.today ? 'today' : ''} ${item.hours ? 'worked' : ''}`} onClick={!item.muted ? onAddEntry : undefined}><span>{item.day}</span>{item.hours && <b>{item.hours}</b>}</button>)}</div><div className="calendar-key"><span><i /> Worked day</span><span><b /> Today</span><strong>5 days recorded · 39h 30m</strong></div></article>
}

function RecentEntries() {
	return <article className="panel entries-panel"><div className="panel-head"><div><span>RECENT RECORDS</span><h2>Hours entries</h2></div><a href="#reports">View all <ChevronRight size={14} /></a></div><div className="entries-table"><div className="entry-row entry-header"><span>Date</span><span>Start</span><span>End</span><span>Break</span><span>Net hours</span><span /></div>{recentEntries.map(entry => <div className="entry-row" key={entry[0]}><span data-label="Date"><i className="date-icon"><CalendarDays size={14} /></i><b>{entry[0]}</b></span><span data-label="Start">{entry[1]}</span><span data-label="End">{entry[2]}</span><span data-label="Break">{entry[3]}</span><span data-label="Net hours"><strong>{entry[4]}</strong></span><button aria-label={`Options for ${entry[0]}`}><MoreHorizontal size={17} /></button></div>)}</div></article>
}

function ReportsCard() {
	return <article id="reports" className="panel reports-panel"><div className="panel-head"><div><span>REPORTING</span><h2>Prepare a report</h2></div><span className="secure-pill"><ShieldCheck size={13} /> Private</span></div><p>Filter your hours by date, then download or print a clear record of your workdays.</p><div className="report-range"><div><small>FROM</small><b>01 Aug 2026</b></div><ChevronRight size={15} /><div><small>TO</small><b>31 Aug 2026</b></div></div><div id="exports" className="export-actions"><button><FileSpreadsheet size={16} /> Excel</button><button><FileText size={16} /> CSV</button><button><ArrowDownToLine size={16} /> Print</button></div></article>
}

function AddHoursModal({ onClose }) {
	return <div className="modal-layer" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="hours-modal" role="dialog" aria-modal="true" aria-labelledby="add-hours-title"><div className="modal-head"><div><span>NEW HOURS ENTRY</span><h2 id="add-hours-title">Record a workday</h2></div><button onClick={onClose} aria-label="Close"><X size={19} /></button></div><form onSubmit={event => { event.preventDefault(); onClose() }}><label>Work date<input type="date" defaultValue="2026-08-10" /></label><div className="modal-fields"><label>Start time<input type="time" defaultValue="09:00" /></label><label>End time<input type="time" defaultValue="17:30" /></label></div><label>Unpaid break<div className="input-suffix"><input type="number" defaultValue="30" min="0" /><span>minutes</span></div></label><div className="calculation-preview"><Clock3 size={17} /><span>Calculated net hours</span><strong>8h 00m</strong></div><div className="modal-actions"><button type="button" onClick={onClose}>Cancel</button><button type="submit"><Check size={16} /> Save hours</button></div></form></section></div>
}

export default function DashboardPage() {
	const [showEntry, setShowEntry] = useState(false)
	return <DashboardShell onAddEntry={() => setShowEntry(true)}>
		<section className="welcome-row"><div><span>MONDAY, AUGUST 10</span><h2>Good morning, Abdulqadir <span>👋</span></h2><p>Here’s a clear view of your hours for this week and month.</p></div><div className="period-select"><CalendarDays size={16} /><span><small>VIEWING PERIOD</small><b>August 2026</b></span><ChevronDown size={15} /></div></section>
		<section className="summary-grid" aria-label="Hours summary"><StatCard icon={Clock3} label="This week" value="39h 30m" note="30m below 40h target" trend="down" /><StatCard icon={CalendarDays} label="This month" value="39h 30m" note="5 worked days" tone="violet" /><StatCard icon={Timer} label="Daily average" value="7h 54m" note="Across worked days" tone="blue" /><StatCard icon={TrendingUp} label="Target variance" value="−0h 30m" note="Weekly difference" tone="green" trend="down" /></section>
		<section className="dashboard-primary"><WeeklyChart /><ReportsCard /></section>
		<MonthCalendar onAddEntry={() => setShowEntry(true)} />
		<RecentEntries />
		{showEntry && <AddHoursModal onClose={() => setShowEntry(false)} />}
	</DashboardShell>
}
