import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	ArrowRight, Check, CheckCircle2, Clock3, Eye, EyeOff,
	LockKeyhole, Mail, ShieldCheck, Sparkles, UserRound,
} from 'lucide-react'

const benefits = [
	['Track every hour', 'Clock in, add shifts and keep accurate records.'],
	['Know your pay', 'See overtime and estimated earnings before payday.'],
	['Your data, protected', 'Private, secure and always under your control.'],
]

function AuthBrand({ light = false }) {
	return <Link to="/" className="flex items-center gap-3" aria-label="HourHabor home">
		<span className={`grid size-11 place-items-center rounded-full ${light ? 'bg-white text-green-600' : 'bg-green-600 text-white'}`}><Clock3 size={25} strokeWidth={2.5} /></span>
		<span>
			<span className={`block text-xl font-extrabold leading-none tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>Hour<span className={light ? 'text-green-200' : 'text-green-600'}>Habor</span></span>
			<span className={`mt-1 block text-[8px] font-bold uppercase tracking-[.12em] ${light ? 'text-green-100' : 'text-slate-400'}`}>Your working hours, all in one place.</span>
		</span>
	</Link>
}

function InputField({ id, label, type = 'text', icon: Icon, placeholder, value, onChange, error, autoComplete }) {
	const [visible, setVisible] = useState(false)
	const password = type === 'password'
	return <div>
		<label htmlFor={id} className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
		<div className="relative">
			<Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
			<input id={id} name={id} type={password && visible ? 'text' : type} placeholder={placeholder} value={value} onChange={onChange} autoComplete={autoComplete} className={`auth-input ${error ? '!border-red-400 focus:!border-red-400 focus:!ring-red-100' : ''}`} />
			{password && <button type="button" onClick={() => setVisible(!visible)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700" aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
		</div>
		{error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
	</div>
}

function AuthAside({ signup }) {
	return <aside className="auth-aside">
		<div className="relative z-10 flex h-full max-w-xl flex-col justify-between">
			<AuthBrand light />
			<div className="py-14">
				<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-green-50 ring-1 ring-white/15"><Sparkles size={14} />Built for real working life</span>
				<h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-[-.04em] text-white lg:text-5xl">Your hours deserve<br />to add up.</h2>
				<p className="mt-5 max-w-md text-base leading-7 text-green-50/80">{signup ? 'Join thousands of hourly workers taking control of their time, overtime and earnings.' : 'Welcome back. Your shifts, earnings and timesheets are ready when you are.'}</p>
				<div className="mt-10 space-y-6">{benefits.map(([title, text], i) => <div key={title} className="flex gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white">{i === 2 ? <ShieldCheck size={20} /> : <Check size={19} />}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-5 text-green-50/70">{text}</p></div></div>)}</div>
			</div>
			<p className="text-xs text-green-100/70">© 2026 HourHabor. Made for hourly workers across the UK.</p>
		</div>
		<div className="auth-orb auth-orb-one" /><div className="auth-orb auth-orb-two" />
	</aside>
}

export default function AuthPage({ mode }) {
	const signup = mode === 'signup'
	const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', remember: false, terms: false })
	const [errors, setErrors] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const update = key => event => setValues(current => ({ ...current, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }))

	function handleSubmit(event) {
		event.preventDefault()
		const next = {}
		if (signup && values.name.trim().length < 2) next.name = 'Please enter your full name.'
		if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address.'
		if (values.password.length < 8) next.password = 'Password must be at least 8 characters.'
		if (signup && values.confirm !== values.password) next.confirm = 'Passwords do not match.'
		if (signup && !values.terms) next.terms = 'Please accept the Terms and Privacy Policy.'
		setErrors(next)
		setSubmitted(Object.keys(next).length === 0)
	}

	return <main className="min-h-screen bg-white lg:grid lg:grid-cols-[.9fr_1.1fr]">
		<AuthAside signup={signup} />
		<section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
			<div className="absolute left-5 top-6 lg:hidden"><AuthBrand /></div>
			<div className="w-full max-w-[470px] pt-20 lg:pt-0">
				<div className="mb-8"><span className="text-xs font-extrabold uppercase tracking-[.18em] text-green-600">{signup ? 'Start for free' : 'Welcome back'}</span><h1 className="mt-3 text-3xl font-extrabold tracking-[-.035em] text-slate-900 sm:text-[40px]">{signup ? 'Create your account' : 'Log in to HourHabor'}</h1><p className="mt-3 text-sm leading-6 text-slate-500">{signup ? 'Start tracking your hours and earnings in just a minute.' : 'Enter your details to access your hours and earnings.'}</p></div>

				{submitted ? <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"><CheckCircle2 className="mx-auto text-green-600" size={36} /><h2 className="mt-3 text-lg font-extrabold text-slate-900">{signup ? 'Account details look good!' : 'Login details submitted!'}</h2><p className="mt-2 text-sm leading-6 text-slate-600">This frontend is ready to connect to your authentication API.</p><button onClick={() => setSubmitted(false)} className="btn-primary mt-5">Back to form</button></div> : <form onSubmit={handleSubmit} noValidate className="space-y-5">
					{signup && <InputField id="name" label="Full name" icon={UserRound} placeholder="Alex Morgan" value={values.name} onChange={update('name')} error={errors.name} autoComplete="name" />}
					<InputField id="email" label="Email address" type="email" icon={Mail} placeholder="you@example.com" value={values.email} onChange={update('email')} error={errors.email} autoComplete="email" />
					<InputField id="password" label="Password" type="password" icon={LockKeyhole} placeholder={signup ? 'At least 8 characters' : 'Enter your password'} value={values.password} onChange={update('password')} error={errors.password} autoComplete={signup ? 'new-password' : 'current-password'} />
					{signup && <InputField id="confirm" label="Confirm password" type="password" icon={LockKeyhole} placeholder="Repeat your password" value={values.confirm} onChange={update('confirm')} error={errors.confirm} autoComplete="new-password" />}

					{signup ? <div><label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-slate-500"><input type="checkbox" checked={values.terms} onChange={update('terms')} className="mt-0.5 size-4 rounded border-slate-300 accent-green-600" /><span>I agree to the <a href="#terms" className="font-semibold text-green-600 hover:text-green-700">Terms of Service</a> and <a href="#privacy" className="font-semibold text-green-600 hover:text-green-700">Privacy Policy</a>.</span></label>{errors.terms && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.terms}</p>}</div> : <div className="flex items-center justify-between text-sm"><label className="flex cursor-pointer items-center gap-2 text-slate-500"><input type="checkbox" checked={values.remember} onChange={update('remember')} className="size-4 rounded border-slate-300 accent-green-600" />Remember me</label><a href="#forgot" className="font-bold text-green-600 hover:text-green-700">Forgot password?</a></div>}

					<button type="submit" className="btn-primary w-full !py-4">{signup ? 'Create Free Account' : 'Log In'}<ArrowRight size={18} /></button>
				</form>}

				<div className="my-7 flex items-center gap-4"><span className="h-px flex-1 bg-slate-200" /><span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">or continue with</span><span className="h-px flex-1 bg-slate-200" /></div>
				<button className="btn-outline w-full !py-3.5"><span className="grid size-5 place-items-center rounded-full bg-white text-sm font-extrabold text-blue-500 shadow-sm ring-1 ring-slate-200">G</span>Continue with Google</button>
				<p className="mt-7 text-center text-sm text-slate-500">{signup ? 'Already have an account?' : 'New to HourHabor?'} <Link to={signup ? '/login' : '/signup'} className="font-extrabold text-green-600 hover:text-green-700">{signup ? 'Log in' : 'Create a free account'}</Link></p>
			</div>
		</section>
	</main>
}
