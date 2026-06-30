import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [loc])
  const a = p => loc.pathname === p ? 'active' : ''
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link to="/"><img src="/assets/logo.png" alt="willTi" className="logo-img" loading="eager" decoding="async" /></Link>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><Link to="/how-it-works" className={a('/how-it-works')}>How It Works</Link></li>
          <li><Link to="/drive" className={a('/drive')}>Drive with Willti</Link></li>
          <li><Link to="/partner" className={a('/partner')}>Partner With Us</Link></li>
          <li><Link to="/support" className={a('/support')}>Support</Link></li>
        </ul>
        <div className="nav-right">
          <button className="lang-btn">🌐 EN</button>
          <Link to="/#download" className="dl-btn">Download App</Link>
          <button className="burger" onClick={() => setOpen(o => !o)}>
            <span/><span/><span/>
          </button>
        </div>
      </div>
      {open && (
        <div className="drawer">
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/drive">Drive with Willti</Link>
          <Link to="/partner">Partner With Us</Link>
          <Link to="/support">Support</Link>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  const cols = [
    { h: 'Products', links: ['Rides','E-tickets','Willti Food','Willtti Market','Willti for Business'] },
    { h: 'Earn', links: ['Willti Drivers','Registered Agencies','Exchange Ticket','Willti Fleets'] },
    { h: 'Company', links: ['About Willti','Mission','Careers','Accessibility','Urban Fund','Investor relations','Blog','Brand'] },
    { h: 'Support', links: ['Riders','Drivers','Willti Food','Fleets','Restaurants','Willti for Business'] },
    { h: 'Safety', links: ['Rider safety','Driver safety','Scooter safety','Safety lab'] },
    { h: 'Locations', links: ['Our cities','Our airports'] },
    { h: 'City solutions', links: ['Our mission','Charging docks'] },
  ]
  return (
    <footer>
      <div className="footer-top">
        {cols.map(c => (
          <div key={c.h} className="fcol">
            <h4>{c.h}</h4>
            <ul>{c.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="footer-bot">
        <div className="fbot-left">
          <button className="lang-btn">🌐 EN</button>
          <img src="/assets/logo.png" alt="willTi" className="flogo" loading="lazy" decoding="async" />
          <div className="fsocials">
            <a href="#">f</a><a href="#">ig</a><a href="#">tt</a>
          </div>
        </div>
        <div className="fbot-mid">
          {['Terms and Conditions','Privacy','Insurance','Cookies','Security','Community Guidelines'].map(l =>
            l === 'Privacy'
              ? <Link key={l} to="/privacy-policy">{l}</Link>
              : <a key={l} href="#">{l}</a>
          )}
        </div>
        <div className="fbot-right">
          <button className="get-btn">Get Willti</button>
          <span>© 2026 Crestlancing Ltd</span>
        </div>
      </div>
    </footer>
  )
}

function Faq({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <div key={i} className={`faq-item ${open === i ? 'faq-on' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span>
            <span className={`faq-circle ${open === i ? 'faq-circle-on' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          {open === i && <div className="faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  )
}

function HiwBlock() {
  const [activeStep, setActiveStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 3), 3000)
    return () => clearInterval(t)
  }, [])
  const images = [
    '/assets/hiw_choose_agencies.png',
    '/assets/hiw_pick_trip.png',
    '/assets/hiw_pay_methods.png',
  ]
  return (
    <div className="hiw-layout">
      <div className="hiw-left">
        <div className="hiw-img-wrap">
          <img src={images[activeStep]} alt="How it works" className="hiw-main-img" loading="lazy" decoding="async" />
        </div>
        <div className="hiw-arrows">
          <button onClick={() => setActiveStep(s => (s + 2) % 3)} className="arr-btn" aria-label="Previous step">
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button onClick={() => setActiveStep(s => (s + 1) % 3)} className="arr-btn" aria-label="Next step">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="hiw-dots">
          <span className={`hiw-dot ${activeStep === 0 ? 'hiw-dot-on' : ''}`}/>
          <span className={`hiw-dot ${activeStep === 1 ? 'hiw-dot-on' : ''}`}/>
          <span className={`hiw-dot ${activeStep === 2 ? 'hiw-dot-on' : ''}`}/>
        </div>
      </div>
      <div className="hiw-right">
        {[
          { title: 'Choose your service', desc: 'Ride around town or book an intercity bus seat.' },
          { title: 'Pick your trip', desc: 'Compare drivers or agencies, times, and prices.' },
          { title: 'Pay with mobile money', desc: 'MTN MoMo or Orange Money, fast and secure.' },
        ].map((s, i) => (
          <div key={i} className={`hiw-step ${i === activeStep ? 'hiw-step-on' : ''}`} onClick={() => setActiveStep(i)}>
            <div className="hiw-bar"/>
            <div><h3>{s.title}</h3><p>{s.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function Home() {
  const faqs = [
    { q: 'How do I pay for my ride or bus ticket?', a: 'Willti supports MTN Mobile Money and Orange Money. Simply link your mobile money account in the app and all payments are handled instantly and securely in-app.' },
    { q: "What if my driver doesn't show up?", a: "If your driver doesn't arrive within the expected time, you can cancel at no charge and request a new driver. Contact our 24/7 support team from the app." },
    { q: 'Can I schedule a ride or bus ticket in advance?', a: 'Yes. You can book bus tickets up to 7 days in advance. Scheduled rides can be set up to 24 hours ahead from the booking screen.' },
    { q: 'How does the ticket exchange work? Is it safe?', a: 'Ticket Exchange lets you resell an unused bus ticket to another Willti user at the original price. All exchanges are verified in-app.' },
  ]

  // Single source of truth for the two service cards — one image, one text
  // block per card, rendered exactly once. No duplicate markup anywhere.
  const services = [
    { img: '/assets/svc_ride_booking.jpg', title: 'Ride booking', desc: 'Hail a car in seconds. Transparent pricing, verified drivers, live tracking.' },
    { img: '/assets/svc_bus_booking.jpg', title: 'Bus tickets booking', desc: 'Book seats at Vatican, General Express, Touristique, and more, no queue, no stress.' },
  ]

  return (
    <>
      <div className="home-hero">
        <img src="/assets/rider_street_clean.jpg" alt="Move freely anywhere in Cameroon" loading="eager" decoding="async" />

        <div className="home-hero-content">
          <h1>Move freely, anywhere in Cameroon.</h1>
          <p>From your street to any city, just one app necessary. Book travel tickets and rides today.</p>
          <div className="hero-btns">
            <button className="btn-g" onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Book a Ride</button>
            <button className="btn-outline" onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}>Book Travel Ticket</button>
          </div>
        </div>
        <div className="hero-stats">
          <span>100+ Active Drivers</span>
          <span>6+ Functional Cities</span>
          <span>5+ Agencies Registered</span>
        </div>
      </div>

      <section className="s-white" id="services">
        <div className="wrap">
          <h2 className="h2d tc">Our services</h2>
          <p className="subd tc mx">Everything you need to move in Cameroon, from quick rides in the city to long-haul bus trips between regions. Willti has you covered.</p>
          <div className="svc-grid">
            {services.map(s => (
              <div className="svc-card" key={s.title}>
                <img src={s.img} alt={s.title} className="svc-img" loading="lazy" decoding="async" />
                <div className="svc-ov"/>
                <div className="svc-txt">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-dgreen">
        <div className="wrap">
          <div className="eyebrow">Simple Steps</div>
          <h2 className="h2w">How It Works</h2>
          <p className="subm">No confusion or delay, just fast and reliable booking.</p>
          <HiwBlock/>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap tc">
          <div className="eyebrow green">About us</div>
          <h2 className="h2d">Willti is made for Cameroon.</h2>
          <p className="about-p">Willti is a Cameroonian mobility platform built to make getting around simpler. Whether you need a quick ride across town or a bus ticket from Douala to Yaounde, Willti brings it all together in one app designed for the way Cameroonians move, and built right here at home.</p>
        </div>
      </section>

      <section className="s-pale">
        <div className="wrap mission-wrap">
          <div>
            <div className="eyebrow green">About us</div>
            <h2 className="h2d">Our Mission</h2>
            <p className="mission-p">To make movement across Cameroon effortless, affordable, and trustworthy by connecting people to rides, bus seats, and each other through technology that works for everyone, everywhere in the country.</p>
          </div>
          <div className="mission-phone">
            <img src="/assets/phone_map2.png" alt="App map" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap">
          <h2 className="h2d tc">Earn money with Willti</h2>
          <p className="subd tc mx">Join hundreds of partners nationwide that earn with Willti. Whether you own a car, manage a fleet, or run a travel agency, Willti gives you the tools to grow.</p>
          <div className="earn-row">
            <div className="earn-img"><img src="/assets/media09.png" alt="Become a driver" loading="lazy" decoding="async" /></div>
            <div className="earn-txt">
              <h3>Become a Driver</h3>
              <p>Turn your car into a source of income. Sign up as a Willti driver, set your own hours, and start earning from rides in your city. Fast registration, transparent earnings, and weekly payouts straight to your Mobile Money account.</p>
              <Link to="/drive" className="btn-g">Become a driver</Link>
            </div>
          </div>
          <div className="earn-row earn-rev">
            <div className="earn-txt">
              <h3>Register Your Car</h3>
              <p>Own a vehicle but don't want to drive? List your car on Willti and connect with verified, professional drivers who will operate it on your behalf. You earn, they drive, everyone wins.</p>
              <Link to="/drive" className="btn-g">Register your car</Link>
            </div>
            <div className="earn-img"><img src="/assets/media10.png" alt="Register car" loading="lazy" decoding="async" /></div>
          </div>
          <div className="earn-row">
            <div className="earn-img"><img src="/assets/media11.png" alt="Register agency" loading="lazy" decoding="async" /></div>
            <div className="earn-txt">
              <h3>Register Your Travel Agency</h3>
              <p>Bring your bus agency onto Willti and sell tickets directly to thousands of travellers across Cameroon. No more empty seats. Manage your routes, schedules, and bookings all in one place.</p>
              <Link to="/partner" className="btn-g">Register your agency</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="s-dgreen" id="download">
        <div className="wrap tc">
          <h2 className="h2w">Download Willti</h2>
          <img src="/assets/section4.png" alt="Download Willti" className="dl-img" loading="lazy" decoding="async" />
          <p className="subm" style={{marginBottom:'20px'}}>Available for iOS and Android devices.</p>
          <div className="store-row">
            <a href="#" className="store-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div><span>Download on the</span><strong>App Store</strong></div>
            </a>
            <a href="#" className="store-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.28.15.59.19.9.12L14.64 12 3.18.12c-.31-.07-.62-.03-.9.12C1.75.71 1.5 1.32 1.5 2v19.88c0 .68.25 1.29.68 1.88z"/></svg>
              <div><span>Get it on</span><strong>Google Play</strong></div>
            </a>
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap">
          <div className="news-hd">
            <h2 className="h2d">News and updates</h2>
            <button className="view-all-btn">View all ↗</button>
          </div>
          <div className="news-grid">
            <div className="news-main">
              <div className="news-main-img"><img src="/assets/news_scooter.png" alt="News" loading="lazy" decoding="async" /></div>
              <div className="news-body">
                <span className="news-date">May 15, 2026</span>
                <h3>Willti is now allowing ticket exchange! Changed travel plans? No problem.</h3>
                <p>Plans change, and losing money on a bus ticket you can no longer use is never a good feeling. That's why we've just launched Ticket Exchange on Willti...</p>
              </div>
            </div>
            <div className="news-side">
              {[
                {img:'/assets/news_bike.png', date:'Apr 29, 2026', title:'Finance ledger as a service: Rethinking aggregation...'},
                {img:'/assets/media09.png',   date:'Apr 24, 2026', title:'Bolt launches its most accessible shared e-bike...'},
                {img:'/assets/overlay2.png',  date:'Apr 23, 2026', title:"Improving route planning in Bolt with driver partners'..."},
              ].map((n,i) => (
                <div key={i} className="news-item">
                  <div className="news-item-img"><img src={n.img} alt={n.title} loading="lazy" decoding="async" /></div>
                  <div><h4>{n.title}</h4><span className="news-date">{n.date}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap">
          <h2 className="faq-title tc">Frequently Asked Questions</h2>
          <Faq items={faqs}/>
        </div>
      </section>
    </>
  )
}

// ── HOW IT WORKS PAGE ─────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <>
      <section className="s-dgreen hiw-page-start">
        <div className="wrap">
          <div className="eyebrow">Simple Steps</div>
          <h2 className="h2w">How It Works</h2>
          <p className="subm">No confusion or delay, just fast and reliable booking.</p>
          <HiwBlock/>
        </div>
      </section>
      <section className="s-dark">
        <div className="wrap">
          <div className="safety-grid">
            {[
              {title:'Verified agencies only', desc:'Every operator passes a strict onboarding review before appearing on Willti.'},
              {title:'Secure payments', desc:'All transactions are encrypted. Your financial details are never stored on our servers.'},
              {title:'24/7 customer support', desc:'Our team is available around the clock to resolve any issue fast.'},
              {title:'Real-time tracking', desc:'Know exactly where your bus is at any moment during your journey.'},
            ].map(c => (
              <div key={c.title} className="safety-card">
                <h3>{c.title}</h3><p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ── DRIVE ─────────────────────────────────────────────────────────────────────
function Drive() {
  const faqs = [
    {q:'How and when do I get paid?', a:'Earnings are paid out every week directly to your MTN Mobile Money or Orange Money account. You can track your balance and trip history anytime in the Willti driver app.'},
    {q:'What percentage of each trip do I keep?', a:'Drivers keep the majority of every fare. Our commission is transparent and competitive. Full details are available in the driver app after registration.'},
    {q:'What happens if a passenger cancels a trip?', a:'If a passenger cancels after you have accepted and are en route, you receive a cancellation fee. Full policy is in the driver app.'},
    {q:'My car broke down, what do I do?', a:'Contact our 24/7 driver support line directly from the app. We will help coordinate with your passenger and guide you through next steps.'},
  ]
  return (
    <>
      <div className="drive-hero">
        <img src="/assets/ride_booking.png" alt="Drive with Willti" loading="eager" decoding="async" />
        <div className="drive-txt">
          <h1>Drive More.<br/><span className="green">Earn More.</span></h1>
          <p>Join Willti and turn every trip into income.</p>
          <button className="btn-g" onClick={() => document.getElementById('get-started')?.scrollIntoView({behavior:'smooth'})}>Download App</button>
        </div>
      </div>

      <section className="s-white">
        <div className="wrap tc">
          <h2 className="h2d">Why You Should Use <span className="green">Willti</span></h2>
          <p className="subd mx">The platform designed to grow your business.</p>
          <div className="why-grid">
            {[
              {img:'/assets/cal0.png', title:'Your Hours, Your Money', desc:'Choose your available hours, stick with your schedule. Earn mornings, evenings, weekends, choose what works for you and stick.'},
              {img:'/assets/cal1.png', title:'Flexible Payouts', desc:'Cash out flexible either daily or weekly, payment method as fast or as convenient or as you like.'},
              {img:'/assets/cal2.png', title:'100% Secure', desc:'The best team filters and verifies every information, so you are always 100% safe.'},
            ].map(w => (
              <div key={w.title} className="why-card">
                <img src={w.img} alt={w.title} loading="lazy" decoding="async" /><h3>{w.title}</h3><p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-dgreen" id="get-started">
        <div className="wrap">
          <div className="eyebrow">4 Simple Steps</div>
          <h2 className="h2w">How To Get Started?</h2>
          <p className="subm">No confusion or delay, just a fast and reliable platform.</p>
          <div className="started-grid">
            {[
              {n:1,title:'Download the app',    desc:'Get Willti from the App Store or Google Play.'},
              {n:2,title:'Create your profile', desc:'Sign up and choose account type.'},
              {n:3,title:'Submit documents',    desc:'ID, licence, and vehicle registration, all in-app.'},
              {n:4,title:'Start earning',       desc:'Get approved and accept your first trip.'},
            ].map(s => (
              <div key={s.n} className="started-step">
                <div className="s-circle">{s.n}</div>
                <div className="s-line"/>
                <h3 className="green">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap tc mb56">
          <h2 className="h2d">Registration <span className="green">Requirements</span></h2>
        </div>
        <div className="wrap reqs-grid">
          {[
            {icon:<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="4" width="32" height="40" rx="4" stroke="#7EC709" strokeWidth="2.5"/><path d="M16 16h16M16 24h16M16 32h10" stroke="#7EC709" strokeWidth="2.5" strokeLinecap="round"/></svg>, title:'Valid national ID', desc:'CNI or passport must be current and valid.'},
            {icon:<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L6 14v10c0 10 8 18 18 20 10-2 18-10 18-20V14L24 4z" stroke="#7EC709" strokeWidth="2.5"/><path d="M16 24l6 6 10-12" stroke="#7EC709" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:"Driver's Licence", desc:'Required for drivers, category B minimum.'},
            {icon:<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="36" height="22" rx="3" stroke="#7EC709" strokeWidth="2.5"/><circle cx="18" cy="36" r="3" stroke="#7EC709" strokeWidth="2.5"/><circle cx="30" cy="36" r="3" stroke="#7EC709" strokeWidth="2.5"/></svg>, title:'Vehicle In Good Condition', desc:'Any car 2010 or newer, must pass a basic inspection and have all documents.'},
            {icon:<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="40" rx="4" stroke="#7EC709" strokeWidth="2.5"/><path d="M20 38h8" stroke="#7EC709" strokeWidth="2.5" strokeLinecap="round"/></svg>, title:'Good Smartphone', desc:'Either Android or iOS but should be performant and reliable.'},
          ].map(r => (
            <div key={r.title} className="req-card">
              <div className="req-head">
                <div className="req-icon">{r.icon}</div>
                <h3>{r.title}</h3>
              </div>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="s-white">
        <div className="wrap driver-row">
          <div className="driver-txt">
            <div className="eyebrow green">The driver app</div>
            <h2 className="h2d">How the Willti Driver app works</h2>
            <ul className="driver-list">
              {[
                'Login and get notified of all ride requests',
                'Accept a ride request',
                "Use the in-app navigation to reach the pickup location and pick up your passenger",
                "Drive to the passenger's destination, follow the app's directions",
                'Drop off the passenger and get paid',
                'Repeat and earn money',
              ].map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
          <div className="driver-phone"><img src="/assets/driver_phone.png" alt="Driver app" loading="lazy" decoding="async" /></div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap">
          <h2 className="faq-title tc">Frequently Asked Questions From Drivers</h2>
          <Faq items={faqs}/>
        </div>
      </section>
    </>
  )
}

// ── PARTNER ───────────────────────────────────────────────────────────────────
function Partner() {
  const [form, setForm] = useState({agency:'',contact:'',phone:'',email:'',city:'Douala',buses:'1-5',routes:''})
  const set = (k,v) => setForm(f=>({...f,[k]:v}))

  return (
    <>
      <div className="partner-hero">
        <img src="/assets/bus_fleet_clean.jpg" alt="Partner with Willti" loading="eager" decoding="async" />
        <div className="partner-txt">
          <h1>Fill every seat.<br/><span className="green">Grow your agency.</span></h1>
          <p>List your routes on Willti and sell tickets to thousands of travellers across Cameroon, no empty buses, no queues, no paperwork.</p>
        </div>
      </div>

      <section className="s-white">
        <div className="wrap">
          <h2 className="h2d">Everything your agency needs</h2>
          <p className="subd">From real-time bookings to instant payouts, Willti gives your agency the tools to sell smarter.</p>
          <div className="agency-grid">
            {[
              {title:'Reach more travelers', desc:'Get discovered by thousands of Willti users actively searching for your routes every day.'},
              {title:'Real-time ticket sales', desc:'Passengers book and pay instantly in-app. Seats updated in real time, no overbooking.'},
              {title:'Instant Mobile Money payouts', desc:'Earnings land in your MTN MoMo or Orange Money account automatically after each trip.'},
              {title:'Agency dashboard', desc:'Manage routes, schedules, seat availability, and revenue from one simple dashboard.'},
              {title:'Digital e-tickets', desc:'Passengers show a QR code at boarding, no printed tickets, no manual checking.'},
              {title:'Dedicated partner support', desc:'A dedicated Willti account manager helps your agency get set up and keep growing.'},
            ].map(c => (
              <div key={c.title} className="agency-card">
                <h3>{c.title}</h3><p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-pale stats-sec">
        <div className="wrap">
          <div className="stats-img"><img src="/assets/woman_bus.png" alt="Traveller" loading="lazy" decoding="async" /></div>
          <div className="stats-row">
            <div className="stat"><span className="stat-n">10K+</span><span className="stat-l">Active Drivers</span></div>
            <div className="stat-div"/>
            <div className="stat"><span className="stat-n">3+</span><span className="stat-l">Cities on Willti</span></div>
            <div className="stat-div"/>
            <div className="stat"><span className="stat-n">0 FCFA</span><span className="stat-l">Setup Fee</span></div>
          </div>
        </div>
      </section>

      <section className="s-dgreen">
        <div className="wrap">
          <div className="eyebrow">4 Simple Steps</div>
          <h2 className="h2w">How To Get Started?</h2>
          <p className="subm">No confusion or delay, just a fast and reliable platform.</p>
          <div className="started-grid">
            {[
              {n:1,title:'Fill the form',    desc:'Submit your agency details below.'},
              {n:2,title:'We verify you',    desc:'Our team reviews your registration documents.'},
              {n:3,title:'Set up routes',    desc:'Add your routes, schedules, and pricing.'},
              {n:4,title:'Go live',          desc:'Your agency goes live and tickets start selling.'},
            ].map(s => (
              <div key={s.n} className="started-step">
                <div className="s-circle">{s.n}</div>
                <div className="s-line"/>
                <h3 className="green">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap form-wrap">
          <h2 className="h2d tc">Partner With Willti Today</h2>
          <h3 className="form-sub">Agency registration form</h3>
          <p className="form-desc">Fill in your details and our team will get back to you within 24 hours.</p>
          <div className="form-grid">
            <div className="fg"><label>Agency Name</label><input value={form.agency} onChange={e=>set('agency',e.target.value)} placeholder="e.g. Vatican Express"/></div>
            <div className="fg"><label>Contact Person</label><input value={form.contact} onChange={e=>set('contact',e.target.value)} placeholder="Enter Full Names"/></div>
            <div className="fg"><label>PHONE NUMBER</label><input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+237 XXX XXX XXX"/></div>
            <div className="fg"><label>EMAIL ADDRESS</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="agency@example.com"/></div>
            <div className="fg"><label>MAIN CITY OF OPERATION</label>
              <select value={form.city} onChange={e=>set('city',e.target.value)}>
                {['Douala','Yaoundé','Bafoussam','Bamenda','Ngaoundéré'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="fg"><label>NUMBER OF BUSES</label>
              <select value={form.buses} onChange={e=>set('buses',e.target.value)}>
                {['1-5','6-15','16-30','30+'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="fg full"><label>MAIN ROUTES YOU OPERATE</label>
              <textarea rows={4} value={form.routes} onChange={e=>set('routes',e.target.value)} placeholder="e.g. Douala-Yaounde, Bafoussam-Yaounde..."/>
            </div>
            <div className="full"><button className="btn-submit">Submit</button></div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── SUPPORT ───────────────────────────────────────────────────────────────────
function Support() {
  const faqs = [
    {q:'How do I cancel or modify my booking?', a:'Go to My Trips in the app, select the booking, and tap Cancel or Modify. Changes are allowed up to 2 hours before departure.'},
    {q:'I paid but did not receive my e-ticket. What should I do?', a:'Check your SMS and email. If it has not arrived after 5 minutes, contact support with your transaction reference.'},
    {q:'How do I request a refund?', a:'Refunds are processed automatically for eligible cancellations within 24 hours to your original payment method.'},
    {q:'The app is not working. How do I fix it?', a:'Try clearing the app cache or reinstalling. If the problem persists, contact our technical support team.'},
    {q:'How do I report a safety incident?', a:'Use the Report button inside any trip in My Trips, or call our 24/7 safety line directly from the app.'},
  ]
  return (
    <>
      <section className="support-top">
        <div className="wrap support-wrap">
          <div className="support-txt">
            <h1>How can<br/>we <span className="green">help</span><br/><span className="green">you?</span></h1>
          </div>
          <div className="support-ill">
            <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="290" cy="220" rx="195" ry="165" fill="#e8f7d0" opacity="0.7"/>
              <ellipse cx="290" cy="220" rx="125" ry="105" fill="#d0f0a0" opacity="0.5"/>
              <rect x="175" y="300" width="230" height="13" rx="6" fill="#c8e89a"/>
              <rect x="200" y="313" width="180" height="52" rx="5" fill="#b8de8a"/>
              <rect x="215" y="240" width="155" height="98" rx="7" fill="#1a1a2e"/>
              <rect x="223" y="247" width="139" height="84" rx="4" fill="#0f172a"/>
              <rect x="227" y="252" width="131" height="75" rx="3" fill="#0a1a0a"/>
              <rect x="234" y="260" width="45" height="6" rx="3" fill="#7EC709"/>
              <rect x="234" y="272" width="75" height="4" rx="2" fill="#3a6a10" opacity="0.7"/>
              <rect x="234" y="282" width="60" height="4" rx="2" fill="#3a6a10" opacity="0.6"/>
              <rect x="234" y="292" width="38" height="13" rx="4" fill="#7EC709"/>
              <circle cx="290" cy="185" r="34" fill="#f5c88a"/>
              <path d="M256 185 Q256 148 290 145 Q324 148 324 185" fill="#1a1a1a"/>
              <circle cx="256" cy="188" r="7" fill="#f5c88a"/>
              <circle cx="324" cy="188" r="7" fill="#f5c88a"/>
              <circle cx="281" cy="188" r="3" fill="#c8956a"/>
              <circle cx="299" cy="188" r="3" fill="#c8956a"/>
              <path d="M283 199 Q290 205 297 199" stroke="#c8956a" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M258 180 Q258 154 290 152 Q322 154 322 180" stroke="#222" strokeWidth="4" fill="none"/>
              <rect x="252" y="177" width="9" height="17" rx="4.5" fill="#333"/>
              <rect x="319" y="177" width="9" height="17" rx="4.5" fill="#333"/>
              <path d="M328 185 Q344 185 344 172" stroke="#333" strokeWidth="3" fill="none"/>
              <rect x="340" y="166" width="15" height="10" rx="3" fill="#333"/>
              <path d="M258 219 Q258 210 272 206 L290 213 L308 206 Q322 210 322 219 L325 300 L255 300 Z" fill="#7EC709"/>
              <path d="M277 206 L290 218 L303 206" stroke="white" strokeWidth="2" fill="none"/>
              <rect x="32" y="82" width="148" height="88" rx="13" fill="#7EC709"/>
              <polygon points="57,170 37,196 82,170" fill="#7EC709"/>
              <text x="55" y="115" fontFamily="sans-serif" fontWeight="900" fontSize="19" fill="white">HELP!</text>
              <rect x="48" y="126" width="108" height="7" rx="3.5" fill="rgba(255,255,255,0.55)"/>
              <rect x="48" y="140" width="84" height="7" rx="3.5" fill="rgba(255,255,255,0.4)"/>
              <rect x="338" y="48" width="160" height="60" rx="13" fill="white" stroke="#e0e0e0" strokeWidth="1.5"/>
              <text x="352" y="88" fontFamily="sans-serif" fontSize="25" fill="#7EC709">★★★★★</text>
              <rect x="348" y="168" width="146" height="88" rx="13" fill="#7EC709"/>
              <polygon points="363,168 343,143 393,168" fill="#7EC709"/>
              <text x="368" y="204" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="white">THANKS!</text>
              <rect x="360" y="216" width="108" height="7" rx="3.5" fill="rgba(255,255,255,0.55)"/>
              <rect x="360" y="230" width="84" height="7" rx="3.5" fill="rgba(255,255,255,0.4)"/>
              <rect x="34" y="234" width="98" height="47" rx="23.5" fill="white" stroke="#e0e0e0" strokeWidth="1.5"/>
              <text x="56" y="265" fontFamily="sans-serif" fontWeight="900" fontSize="21" fill="#222">24/7</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="s-white" style={{borderTop:'1px solid #eee', paddingTop:'80px'}}>
        <div className="wrap">
          <h2 className="h2d">Contact Support team</h2>
          <p className="subd">Support hours: Monday to Saturday from 8:00 am – 5:00 pm.</p>
          <div className="contact-grid">
            {[
              {title:'WhatsApp',      desc:'Fastest way to reach us for basic inquiries.',      cta:'Chat on WhatsApp'},
              {title:'Email support', desc:'For detailed issues. We respond within 24 hours.',   cta:'Send an Email'},
              {title:'Call support',  desc:'For urgent matters only.',                           cta:'Call +237 XXX XXX XXX'},
            ].map(c => (
              <div key={c.title} className="contact-card">
                <h3 className="green">{c.title}</h3>
                <p>{c.desc}</p>
                <button className="btn-g btn-full">{c.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap">
          <h2 className="h2d">Your Safety Matters</h2>
          <div className="safety-m-grid">
            {[
              {title:'Verified drivers', desc:'Every driver is ID-checked and licence-verified before going live on Willti.'},
              {title:'Share your trip',  desc:'Send a live link of your trip to a trusted contact.'},
              {title:'Emergency contact',desc:'Tap the SOS button in-app to alert our team and your emergency contact.'},
            ].map(c => (
              <div key={c.title} className="safety-m-card">
                <h3 className="green">{c.title}</h3><p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-white">
        <div className="wrap">
          <h2 className="faq-title tc">Frequently Asked Questions From Drivers</h2>
          <Faq items={faqs}/>
        </div>
      </section>
    </>
  )
}

// ── PRIVACY POLICY ────────────────────────────────────────────────────────────
function PrivacyPolicy() {
  const sections = [
    {
      title: '1. Information We Collect',
      body: (
        <>
          <p>We may collect the following categories of information:</p>
          <h4>A. Personal Information</h4>
          <p>When you create an account or use our Services, we may collect:</p>
          <ul className="legal-list">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Profile picture</li>
            <li>Home and work addresses</li>
            <li>Payment details (processed securely through trusted third-party payment providers)</li>
            <li>Government-issued identification (where required for verification)</li>
          </ul>
          <h4>B. Location Information</h4>
          <p>To provide ride-hailing and bus-booking services effectively, we collect:</p>
          <ul className="legal-list">
            <li>Real-time GPS location</li>
            <li>Pickup and drop-off locations</li>
            <li>Route and trip history</li>
            <li>Background location data (when enabled and necessary for trip tracking)</li>
          </ul>
          <p>Location information is used for: matching passengers with drivers, navigating routes, tracking bus departures and arrivals, and enhancing safety and fraud prevention.</p>
          <h4>C. Device Information</h4>
          <p>We automatically collect: device model, operating system, unique device identifiers, IP address, mobile network information, app version, crash logs, and diagnostic information.</p>
          <h4>D. Payment and Transaction Information</h4>
          <p>We may collect payment confirmations, booking history, ride history, refund records, and transaction details.</p>
          <p><strong>Important:</strong> Willti does not store complete card or banking information.</p>
          <h4>E. Communications Data</h4>
          <p>We may collect communications between riders and drivers, passengers and transport operators, and users and customer support. This may include chats, emails, and masked call logs.</p>
        </>
      ),
    },
    {
      title: '2. How We Use Your Information',
      body: (
        <ul className="legal-list">
          <li>Create and manage user accounts</li>
          <li>Facilitate ride-hailing services</li>
          <li>Process bus ticket reservations</li>
          <li>Track rides and trips</li>
          <li>Process payments and refunds</li>
          <li>Improve platform performance</li>
          <li>Personalize user experiences</li>
          <li>Prevent fraud and unauthorized access</li>
          <li>Verify user identities</li>
          <li>Provide customer support</li>
          <li>Send service notifications and updates</li>
          <li>Comply with legal obligations</li>
        </ul>
      ),
    },
    {
      title: '3. Location Permissions',
      body: (
        <>
          <p>Willti requires location access to function properly.</p>
          <h4>Foreground Location</h4>
          <p>Used while the app is active for: booking rides, finding nearby drivers, and tracking buses.</p>
          <h4>Background Location</h4>
          <p>May be used for: live ride tracking, emergency safety services, trip monitoring, and route optimization.</p>
          <p>Disabling location access may limit certain features.</p>
        </>
      ),
    },
    {
      title: '4. How We Share Your Information',
      body: (
        <>
          <h4>Service Providers</h4>
          <p>Third-party companies that help us operate our platform, including payment processors, cloud service providers, analytics tools, navigation providers, and communication service providers.</p>
          <h4>Drivers and Transport Operators</h4>
          <p>To fulfill ride or bus bookings, we may share name, contact information, and pickup and destination details.</p>
          <h4>Legal Authorities</h4>
          <p>When required by law, regulation, or legal process.</p>
          <h4>Business Transfers</h4>
          <p>In the event of a merger, acquisition, or sale of business assets.</p>
          <p><strong>Willti does not sell your personal information.</strong></p>
        </>
      ),
    },
    {
      title: '5. Data Security',
      body: (
        <>
          <p>We encrypt data in transit (SSL/TLS), restrict access to systems that hold personal information, and run fraud monitoring on transactions and accounts.</p>
          <p>That said, no platform can guarantee perfect security, and we'd rather be upfront about that than make a promise we can't keep.</p>
        </>
      ),
    },
    {
      title: '6. Data Retention',
      body: (
        <p>We keep user data for as long as it's needed, to run the Services, meet legal requirements, resolve disputes, or prevent fraud, and delete or anonymize it once that need has passed.</p>
      ),
    },
    {
      title: '7. Your Rights',
      body: (
        <>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="legal-list">
            <li>Access your personal data</li>
            <li>Update inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Restrict data processing</li>
            <li>Withdraw consent</li>
            <li>Request data portability</li>
            <li>Object to data processing</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:willti@crestlancing.com" className="green">willti@crestlancing.com</a>.</p>
        </>
      ),
    },
    {
      title: "8. Children's Privacy",
      body: (
        <p>Willti does not knowingly collect personal information from children under 13 years old (or the applicable legal age in your country). If we discover such information has been collected, we will delete it immediately.</p>
      ),
    },
    {
      title: '9. Third-Party Services',
      body: (
        <p>Some parts of Willti run on third-party infrastructure, Google Maps for navigation, Stripe and PayPal for payments, Twilio for messaging, and Firebase for backend services. Each of these has its own privacy policy worth a look if you want the full picture.</p>
      ),
    },
    {
      title: '10. International Data Transfers',
      body: (
        <p>Some of our service providers operate outside Cameroon, so your data may be processed there too. Using Willti means you're okay with that, wherever it's legally permitted.</p>
      ),
    },
    {
      title: '11. Account Deletion',
      body: (
        <>
          <p>Want your account gone? You can do that from account settings in the app, by reaching customer support, or by emailing <a href="mailto:willti@crestlancing.com" className="green">willti@crestlancing.com</a> directly.</p>
          <p>A few records may stick around afterward if the law requires it, but everything else goes.</p>
        </>
      ),
    },
    {
      title: '12. Permissions We Request',
      body: (
        <p>Depending on how you use the app, Willti may ask for location, camera, microphone, storage, contacts, or notification access, each tied to a specific feature, never collected just to have it.</p>
      ),
    },
    {
      title: '13. Cookies and Tracking Technologies',
      body: (
        <>
          <p>We use cookies and a handful of SDKs to keep the app fast, catch bugs, spot fraud, and understand how people actually use Willti.</p>
          <p>Most of this can be limited or turned off from your device settings if you'd rather opt out.</p>
        </>
      ),
    },
    {
      title: '14. Changes to This Privacy Policy',
      body: (
        <p>We'll update this policy from time to time. For anything significant, we'll let you know, in-app, by email, or on the website, rather than quietly changing it. Sticking with Willti after an update means you're fine with the new version.</p>
      ),
    },
    {
      title: '15. Contact Us',
      body: (
        <p>
          If you have questions about this Privacy Policy, contact us:<br/>
          Willti<br/>
          Email: <a href="mailto:willti@crestlancing.com" className="green">willti@crestlancing.com</a><br/>
          Address: Yaoundé, Cameroon
        </p>
      ),
    },
    {
      title: '16. Compliance Statement',
      body: (
        <p>Willti complies with privacy and data protection requirements for mobile applications distributed through Google Play and the Apple App Store, including requirements for transparency, user consent, account deletion, and responsible handling of personal data.</p>
      ),
    },
  ]

  return (
    <section className="s-white legal-page">
      <div className="wrap legal-wrap">
        <h1 className="h2d">Privacy Policy</h1>
        <p className="legal-meta">Effective Date: June 25, 2026 &nbsp;·&nbsp; Last Updated: June 25, 2026</p>
        <p className="legal-intro">
          This Privacy Policy describes how Willti ("we," "our," "us") collects, uses, shares, and protects information when you use our apps and services, including ride-hailing and intercity bus booking, together referred to here as the "Services."
        </p>
        <p className="legal-intro">
          It's written to be readable, not just compliant. We've tried to keep the legal language to a minimum while still meeting the requirements of Google Play, the Apple App Store, GDPR, CCPA, and Cameroon's applicable data protection rules.
        </p>
        <p className="legal-intro">
          By using Willti, you're agreeing to what's described below.
        </p>

        {sections.map(s => (
          <div key={s.title} className="legal-section">
            <h3>{s.title}</h3>
            {s.body}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Nav/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/how-it-works" element={<HowItWorks/>}/>
          <Route path="/drive" element={<Drive/>}/>
          <Route path="/partner" element={<Partner/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}