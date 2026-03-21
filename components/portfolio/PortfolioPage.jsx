'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Bug,
  Building2,
  Calendar,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Mic,
  Moon,
  Shield,
  Sun,
  Terminal,
  Users
} from 'lucide-react';

const GlobalStyles = ({ dark }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    a { text-decoration: none; color: inherit; }
    button { font-family: inherit; cursor: pointer; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${dark ? '#0f0f13' : '#f1f5f9'}; }
    ::-webkit-scrollbar-thumb { background: ${dark ? '#3730a3' : '#6366f1'}; border-radius: 3px; }
    ::selection { background: #6366f1; color: #fff; }

    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.5);opacity:0} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

    .float { animation: float 6s ease-in-out infinite; }
    .shimmer-text {
      background: linear-gradient(90deg, #6366f1 0%, #a5b4fc 40%, #6366f1 60%, #818cf8 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    .grad-border {
      position: relative;
      border-radius: 16px;
    }
    .grad-border::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 17px;
      background: linear-gradient(135deg, #6366f1, #a5b4fc, #6366f1);
      background-size: 200% 200%;
      animation: gradient-x 4s ease infinite;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .grad-border:hover::before { opacity: 1; }
  `}</style>
);

const PROFILE = {
  name: 'Donghyeon Jeong',
  nameKo: '정동현',
  title: 'Security Researcher',
  subtitle: 'Security Researcher',
  location: 'Seoul, Korea',
  email: 'dhje0ng@naver.com',
  blog: 'dhjeong.kr',
  github: 'github.com/dhje0ng',
  bio: 'test',
  skills: ['Security']
};

const EDUCATION = [
  {
    school: 'Yeungnam University College',
    degree: 'Cybersecurity department',
    period: '2018 – 2022',
  },
  {
    school: 'OO 아카데미',
    degree: 'Frontend Engineering Track',
    period: '2022',
  }
];

const CAREERS = [
  {
    company: 'ABC Tech',
    role: 'Frontend Developer',
    period: '2024.03 — Present',
    type: 'Full-time',
    location: 'Seoul',
    summary: '서비스 UI/UX 개선 및 사내 프론트엔드 아키텍처 고도화',
    stack: ['Next.js', 'TypeScript', 'Zustand', 'Storybook'],
    details: [
      { num: '01', text: 'Next.js 기반 서비스 전면 리뉴얼 — 페이지 로딩 속도 38% 개선' },
      { num: '02', text: '사내 디자인 시스템 & 공통 컴포넌트 라이브러리 구축' },
      { num: '03', text: 'Lighthouse Performance 점수 61 → 94 달성' },
      { num: '04', text: '보안 이슈 대응 대시보드 인터페이스 설계 및 실시간 시각화 구현' }
    ]
  },
  {
    company: 'Studio Sample',
    role: 'Web Publisher / Frontend',
    period: '2022.07 — 2024.02',
    type: 'Full-time',
    location: 'Seoul',
    summary: '브랜드/프로모션 페이지 제작과 인터랙션 중심 UI 개발',
    stack: ['React', 'GSAP', 'Scss', 'Webpack'],
    details: [
      { num: '01', text: '캠페인 랜딩 페이지 30+ 제작, 평균 전환율 22% 향상' },
      { num: '02', text: 'GSAP 기반 스크롤 인터랙션 및 마이크로 애니메이션 설계' },
      { num: '03', text: '반응형 퍼블리싱 표준화, 접근성 WCAG 2.1 AA 준수' },
      { num: '04', text: '기획-디자인-개발 협업 프로세스 문서화 및 온보딩 가이드 작성' }
    ]
  }
];

const ACTIVITIES = [
  {
    title: 'OO Frontend Conf 2025',
    type: 'Conference',
    role: 'Speaker',
    period: '2025.10',
    org: 'FEConf Korea',
    desc: '컴포넌트 설계 원칙과 인터랙션 중심 UI 구현 경험 발표. 참석자 800+',
    icon: <Mic size={16} />
  },
  {
    title: 'Web Performance Deep Dive',
    type: 'Seminar',
    role: 'Speaker',
    period: '2025.06',
    org: '토스 개발자 컨퍼런스',
    desc: 'Core Web Vitals 최적화 실전 사례 발표. LCP, CLS 개선 노하우 공유',
    icon: <Mic size={16} />
  },
  {
    title: 'FE Crew Seoul',
    type: 'Community',
    role: 'Organizer',
    period: '2024 — Present',
    org: '자체 운영',
    desc: '월간 세미나 기획, 발표자 섭외, 기술 콘텐츠 운영. 멤버 200+',
    icon: <Users size={16} />
  },
  {
    title: 'Kakao Tech Challenge',
    type: 'Award',
    role: '수상',
    period: '2023.12',
    org: 'Kakao',
    desc: '프론트엔드 최적화 부문 우수상 수상. 빌드 타임 56% 단축 구현',
    icon: <Award size={16} />
  }
];

const VULNS = [
  {
    id: 'CVE-2025-XXXXX',
    type: 'CVE',
    severity: 'High',
    target: 'OO 플랫폼',
    desc: '인증 토큰 검증 미흡으로 인한 계정 탈취 가능 취약점 분석 및 제보',
    status: 'Published',
    reward: null,
    date: '2025.08'
  },
  {
    id: 'BB-2025-001',
    type: 'Bug Bounty',
    severity: 'Critical',
    target: 'N사 서비스',
    desc: 'Stored XSS → Session Hijacking 체인 어택 재현 및 PoC 리포트 작성',
    status: 'Rewarded',
    reward: '$2,500',
    date: '2025.04'
  },
  {
    id: 'BB-2024-017',
    type: 'Bug Bounty',
    severity: 'Medium',
    target: 'K사 API',
    desc: '접근 제어 미흡(IDOR)으로 타 사용자 민감 정보 열람 가능 이슈 보고',
    status: 'Resolved',
    reward: '$800',
    date: '2024.11'
  },
  {
    id: 'PRIV-2024-03',
    type: 'Disclosure',
    severity: 'Low',
    target: '오픈소스 프로젝트',
    desc: 'npm 패키지 prototype pollution 가능성 분석 및 maintainer에 제보',
    status: 'Fixed',
    reward: null,
    date: '2024.07'
  }
];

const SEVERITY_COLOR = {
  Critical: { bg: '#fef2f2', text: '#dc2626', dark_bg: '#450a0a', dark_text: '#fca5a5' },
  High: { bg: '#fff7ed', text: '#ea580c', dark_bg: '#431407', dark_text: '#fdba74' },
  Medium: { bg: '#fefce8', text: '#ca8a04', dark_bg: '#422006', dark_text: '#fde047' },
  Low: { bg: '#f0fdf4', text: '#16a34a', dark_bg: '#052e16', dark_text: '#86efac' }
};

const STATUS_COLOR = {
  Published: { bg: '#eff6ff', text: '#2563eb', dark_bg: '#1e3a5f', dark_text: '#93c5fd' },
  Rewarded: { bg: '#f0fdf4', text: '#16a34a', dark_bg: '#052e16', dark_text: '#86efac' },
  Resolved: { bg: '#f5f3ff', text: '#7c3aed', dark_bg: '#2e1065', dark_text: '#c4b5fd' },
  Fixed: { bg: '#fdf4ff', text: '#9333ea', dark_bg: '#3b0764', dark_text: '#d8b4fe' }
};

function tk(dark) {
  return {
    bg: dark ? '#0f0f13' : '#ffffff',
    bg2: dark ? '#16161d' : '#f8fafc',
    bg3: dark ? '#1e1e28' : '#f1f5f9',
    border: dark ? 'rgba(99,102,241,.18)' : 'rgba(99,102,241,.15)',
    borderSub: dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.07)',
    fg: dark ? '#f1f5f9' : '#0f172a',
    fg2: dark ? '#94a3b8' : '#475569',
    fg3: dark ? '#475569' : '#94a3b8',
    indigo: '#6366f1',
    indigoLight: dark ? '#818cf8' : '#4f46e5',
    indigoBg: dark ? 'rgba(99,102,241,.12)' : 'rgba(99,102,241,.08)',
    card: dark ? '#1a1a24' : '#ffffff',
    cardBorder: dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)',
    shadow: dark ? '0 4px 24px rgba(0,0,0,.4)' : '0 4px 24px rgba(99,102,241,.08)',
    shadowHov: dark ? '0 8px 40px rgba(99,102,241,.2)' : '0 8px 40px rgba(99,102,241,.18)',
    navBg: dark ? 'rgba(15,15,19,.85)' : 'rgba(255,255,255,.85)'
  };
}

function Badge({ children, color = 'indigo', t }) {
  const palette = {
    indigo: { bg: t.indigoBg, text: t.indigoLight },
    ghost: { bg: t.bg3, text: t.fg2 }
  };
  const p = palette[color] || palette.indigo;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 99,
        background: p.bg,
        color: p.text,
        fontSize: '0.65rem',
        fontFamily: "'Fira Code', monospace",
        fontWeight: 500,
        letterSpacing: '0.04em',
        border: `1px solid ${p.text}22`,
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </span>
  );
}

function SeverityBadge({ severity, dark }) {
  const c = SEVERITY_COLOR[severity] || SEVERITY_COLOR.Low;
  return (
    <span
      style={{
        padding: '2px 9px',
        borderRadius: 99,
        background: dark ? c.dark_bg : c.bg,
        color: dark ? c.dark_text : c.text,
        fontSize: '0.62rem',
        fontFamily: "'Fira Code', monospace",
        fontWeight: 600,
        letterSpacing: '0.06em',
        border: `1px solid ${dark ? c.dark_text : c.text}44`
      }}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status, dark }) {
  const c = STATUS_COLOR[status] || STATUS_COLOR.Resolved;
  return (
    <span
      style={{
        padding: '3px 11px',
        borderRadius: 99,
        background: dark ? c.dark_bg : c.bg,
        color: dark ? c.dark_text : c.text,
        fontSize: '0.62rem',
        fontFamily: "'Fira Code', monospace",
        fontWeight: 600,
        letterSpacing: '0.06em'
      }}
    >
      {status}
    </span>
  );
}

function StackPill({ label, t }) {
  return (
    <span
      style={{
        padding: '3px 10px',
        borderRadius: 6,
        background: t.indigoBg,
        color: t.indigoLight,
        fontSize: '0.65rem',
        fontFamily: "'Fira Code', monospace",
        border: `1px solid ${t.border}`
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.7rem', color: t.indigo, letterSpacing: '0.2em' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.border}, transparent)` }} />
    </div>
  );
}

function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(to / 40);
          const timer = setInterval(() => {
            start = Math.min(start + step, to);
            setCount(start);
            if (start >= to) {
              clearInterval(timer);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function CareerCard({ item, t, dark }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      style={{ borderRadius: 16, border: `1px solid ${t.cardBorder}`, background: t.card, overflow: 'hidden', boxShadow: t.shadow, transition: 'box-shadow .3s' }}
      whileHover={{ boxShadow: t.shadowHov }}
    >
      <div style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: t.indigoBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={20} color={t.indigo} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: t.fg }}>{item.company}</span>
                <Badge t={t} dark={dark}>{item.type}</Badge>
              </div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', color: t.indigo, marginTop: 3 }}>{item.role}</div>
              <div style={{ fontSize: '0.78rem', color: t.fg2, marginTop: 6 }}>{item.summary}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: t.fg3, justifyContent: 'flex-end' }}>
              <Calendar size={12} /> {item.period}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
          {item.stack.map((s) => (
            <StackPill key={s} label={s} t={t} />
          ))}
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: t.indigo, fontSize: '0.75rem', fontFamily: "'Fira Code', monospace", background: 'none', border: 'none', padding: 0, transition: 'opacity .2s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .3s' }} />
          {open ? '접기' : '상세 근무 이력 보기'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: `1px solid ${t.cardBorder}`, padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {item.details.map((d) => (
                <div key={d.num} style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.6rem', color: t.indigo, flexShrink: 0, opacity: 0.8 }}>{d.num}</span>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.7, color: t.fg2 }}>{d.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ActivityCard({ item, t, dark }) {
  const [hovered, setHovered] = useState(false);
  const typeColor = { Conference: '#6366f1', Seminar: '#0ea5e9', Community: '#10b981', Award: '#f59e0b' };
  const tc = typeColor[item.type] || '#6366f1';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 16, border: `1px solid ${hovered ? `${tc}66` : t.cardBorder}`, background: t.card, padding: '24px', overflow: 'hidden', position: 'relative', boxShadow: hovered ? `0 8px 32px ${tc}22` : t.shadow, transition: 'all .3s', cursor: 'default' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: tc, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform .3s ease' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${tc}18`, border: `1px solid ${tc}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tc, flexShrink: 0 }}>
          {item.icon}
        </div>
        <Badge t={t} dark={dark} color="ghost">{item.type}</Badge>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: t.fg, lineHeight: 1.35 }}>{item.title}</div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', color: tc, marginTop: 4 }}>
          {item.role} @ {item.org}
        </div>
      </div>

      <p style={{ marginTop: 10, fontSize: '0.8rem', lineHeight: 1.75, color: t.fg2 }}>{item.desc}</p>

      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', color: t.fg3 }}>
          <Calendar size={11} /> {item.period}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: tc, opacity: hovered ? 1 : 0, transition: 'opacity .3s', fontFamily: "'Fira Code', monospace" }}>
          VIEW <ArrowUpRight size={12} />
        </div>
      </div>
    </div>
  );
}

function VulnRow({ item, t, dark, isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.15 }}
      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderRadius: 12, border: `1px solid ${hovered ? t.border : t.cardBorder}`, background: hovered ? t.bg3 : t.card, transition: 'background .25s, border-color .25s', cursor: 'default', flexWrap: 'wrap' }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, background: t.indigoBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {item.type === 'CVE' ? <Shield size={16} color={t.indigo} /> : <Bug size={16} color={t.indigo} />}
      </div>

      <div style={{ flex: 1, minWidth: isMobile ? '100%' : 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Fira Code', monospace", fontWeight: 600, fontSize: '0.82rem', color: t.fg }}>{item.id}</span>
          <SeverityBadge severity={item.severity} dark={dark} />
        </div>
        <div style={{ fontSize: '0.8rem', color: t.fg2, marginTop: 4, lineHeight: 1.6 }}>{item.desc}</div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.63rem', color: t.fg3, marginTop: 4 }}>
          {item.target} · {item.date}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 6, flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
        <StatusBadge status={item.status} dark={dark} />
        {item.reward && <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: '#10b981', fontWeight: 600 }}>{item.reward}</span>}
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState('profile');
  const [viewportWidth, setViewportWidth] = useState(1200);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sections = ['profile', 'career', 'activities', 'security'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveNav(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = tk(dark);
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth < 1024;
  const NAV = [
    { id: 'profile', label: 'Profile' },
    { id: 'career', label: 'Career' },
    { id: 'activities', label: 'Activities' },
    { id: 'security', label: 'Security' }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ background: t.bg, color: t.fg, minHeight: '100vh', transition: 'background .4s, color .4s' }}>
      <GlobalStyles dark={dark} />

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: t.navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.borderSub}`, height: isMobile ? 56 : 60 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 12px' : '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 8 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: t.indigo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', color: t.indigo, letterSpacing: '0.05em' }}>portfolio.dev</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, overflowX: isMobile ? 'auto' : 'visible', maxWidth: isMobile ? '58vw' : 'none', scrollbarWidth: 'none' }}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                style={{ padding: isMobile ? '6px 10px' : '6px 14px', borderRadius: 8, fontSize: isMobile ? '0.72rem' : '0.82rem', fontWeight: 500, color: activeNav === n.id ? t.indigo : t.fg2, background: activeNav === n.id ? t.indigoBg : 'transparent', transition: 'all .2s', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => {
                  if (activeNav !== n.id) {
                    e.currentTarget.style.color = t.fg;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeNav !== n.id) {
                    e.currentTarget.style.color = t.fg2;
                  }
                }}
              >
                {n.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setDark((prev) => !prev)}
            style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${t.borderSub}`, background: t.bg3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.fg2, transition: 'all .2s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = t.indigoBg;
              e.currentTarget.style.color = t.indigo;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = t.bg3;
              e.currentTarget.style.color = t.fg2;
            }}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      <section id="profile" ref={heroRef} style={{ minHeight: isMobile ? 'auto' : '100vh', display: 'flex', alignItems: 'center', paddingTop: isMobile ? 56 : 60, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '15%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${t.indigo}18 0%, transparent 70%)`, animation: 'float 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: 250, height: 250, borderRadius: '50%', background: `radial-gradient(circle, ${t.indigo}10 0%, transparent 70%)`, animation: 'float 10s ease-in-out infinite reverse' }} />
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: dark ? 0.04 : 0.03 }}>
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={t.indigo} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: 1100, margin: '0 auto', padding: isMobile ? '56px 16px 40px' : '80px 24px', width: '100%', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 340px', gap: isMobile ? 28 : 64, alignItems: 'center' }}>
            <div>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 0 #10b981', animation: 'pulse-ring 2s ease-out infinite' }} />
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', color: t.fg2, letterSpacing: '0.08em' }}>Available for work</span>
                </div>

                <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: 8 }}>
                  <span className="shimmer-text">Frontend</span>
                  <br />
                  <span style={{ color: t.fg }}>Developer.</span>
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 24px', color: t.fg2, fontSize: '0.95rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem', color: t.fg }}>{PROFILE.name}</span>
                  <span style={{ color: t.fg3 }}>·</span>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', color: t.indigo }}>{PROFILE.title}</span>
                </div>

                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: t.fg2, maxWidth: 520, marginBottom: 32 }}>{PROFILE.bio}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                  {PROFILE.skills.map((s, i) => (
                    <motion.div key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}>
                      <Badge t={t}># {s}</Badge>
                    </motion.div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: t.indigo, color: '#fff', fontSize: '0.88rem', fontWeight: 600, transition: 'all .25s', boxShadow: `0 4px 20px ${t.indigo}44` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 8px 28px ${t.indigo}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 20px ${t.indigo}44`;
                    }}
                  >
                    <Mail size={15} /> Contact Me
                  </a>
                  <a
                    href={`https://${PROFILE.github}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: `1px solid ${t.border}`, color: t.fg, fontSize: '0.88rem', fontWeight: 600, background: t.bg3, transition: 'all .25s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = t.indigo;
                      e.currentTarget.style.color = t.indigo;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = t.border;
                      e.currentTarget.style.color = t.fg;
                    }}
                  >
                    <Github size={15} /> GitHub
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="float"
              style={{ borderRadius: 24, border: `1px solid ${t.border}`, background: t.card, boxShadow: t.shadowHov, overflow: 'hidden', maxWidth: isTablet ? 520 : 'none', width: '100%', justifySelf: isTablet ? 'center' : 'stretch' }}
            >
              <div style={{ background: `linear-gradient(135deg, ${t.indigo}22, ${t.indigo}08)`, padding: '32px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, borderBottom: `1px solid ${t.cardBorder}` }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 90, height: 90, borderRadius: '50%', background: `linear-gradient(135deg, ${t.indigo}, #818cf8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: '#fff', border: `3px solid ${dark ? t.bg : '#fff'}`, boxShadow: `0 4px 20px ${t.indigo}44` }}>
                    {PROFILE.name.charAt(0)}
                  </div>
                  <div style={{ position: 'absolute', bottom: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: '#10b981', border: `2px solid ${dark ? t.bg : '#fff'}` }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{PROFILE.name}</div>
                  <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: t.indigo, marginTop: 3 }}>{PROFILE.subtitle}</div>
                </div>
              </div>

              {[
                [<MapPin key="map" size={13} />, PROFILE.location],
                [<Mail key="mail" size={13} />, PROFILE.email],
                [<Globe key="globe" size={13} />, PROFILE.blog],
                [<Github key="github" size={13} />, PROFILE.github]
              ].map(([icon, val], i) => (
                <div
                  key={`info-${i}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', borderBottom: `1px solid ${t.cardBorder}`, color: t.fg2, fontSize: '0.78rem', fontFamily: "'Fira Code', monospace", transition: 'background .2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = t.bg3;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ color: t.indigo, flexShrink: 0 }}>{icon}</span> {val}
                </div>
              ))}

            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="career" style={{ padding: '100px 0', background: t.bg2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel t={t}>// 02. education & experience</SectionLabel>

          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: t.indigoBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={16} color={t.indigo} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: t.fg }}>학력</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr', gap: 16 }}>
              {EDUCATION.map((ed, i) => (
                <motion.div
                  key={ed.school}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="grad-border"
                  style={{ padding: 24, background: t.card, borderRadius: 16, border: `1px solid ${t.cardBorder}`, boxShadow: t.shadow, position: 'relative', zIndex: 0 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: t.fg }}>{ed.school}</div>
                      <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: t.indigo, marginTop: 3 }}>{ed.degree}</div>
                    </div>
                    <Badge t={t} color="ghost">{ed.period}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: t.indigoBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={16} color={t.indigo} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: t.fg }}>경력</span>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: t.fg3 }}>// 클릭하면 상세 이력을 볼 수 있어요</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CAREERS.map((c, i) => (
                <motion.div
                  key={c.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <CareerCard item={c} t={t} dark={dark} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="activities" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel t={t}>// 03. external activities</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
            {ACTIVITIES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ActivityCard item={a} t={t} dark={dark} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" style={{ padding: '100px 0', background: t.bg2 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionLabel t={t}>// 04. security research & disclosure</SectionLabel>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
            {[
              { label: 'Total Findings', val: <Counter to={VULNS.length} />, sub: '취약점 제보' },
              { label: 'CVE Published', val: <Counter to={1} />, sub: '공개 취약점' },
              { label: 'Bounty Earned', val: '$3.3K+', sub: '버그바운티 수익' },
              { label: 'Severity High+', val: <Counter to={2} />, sub: 'High 이상' }
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ borderRadius: 16, border: `1px solid ${t.border}`, background: t.card, padding: '20px', textAlign: 'center', boxShadow: t.shadow, transition: 'box-shadow .3s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = t.shadowHov;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = t.shadow;
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: t.indigo }}>{s.val}</div>
                <div style={{ fontWeight: 600, fontSize: '0.78rem', color: t.fg, marginTop: 6 }}>{s.label}</div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.62rem', color: t.fg3, marginTop: 3 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {VULNS.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <VulnRow item={v} t={t} dark={dark} isMobile={isMobile} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${t.borderSub}`, background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr auto 1fr', alignItems: 'center', gap: 24, textAlign: isTablet ? 'center' : 'left' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: t.indigo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Code2 size={13} color="#fff" />
                </div>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', color: t.indigo }}>portfolio.dev</span>
              </div>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', color: t.fg3, lineHeight: 1.7 }}>
                © 2026 {PROFILE.nameKo}. All rights reserved.
                <br />
                Built with Next.js & Framer Motion
              </p>
            </div>

            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', color: t.fg3, textAlign: 'center' }}>
              <Terminal size={20} color={t.fg3} style={{ margin: '0 auto 6px' }} />
              Made with ♥ in Seoul
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: isTablet ? 'center' : 'flex-end', flexWrap: 'wrap' }}>
              {[
                { label: 'Blog', href: `https://${PROFILE.blog}` },
                { label: 'GitHub', href: `https://${PROFILE.github}` },
                { label: 'LinkedIn', href: '#' },
                { label: 'Email', href: `mailto:${PROFILE.email}` }
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 8, border: `1px solid ${t.borderSub}`, fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: t.fg2, transition: 'all .2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = t.indigo;
                    e.currentTarget.style.color = t.indigo;
                    e.currentTarget.style.background = t.indigoBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = t.borderSub;
                    e.currentTarget.style.color = t.fg2;
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {l.label} <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
