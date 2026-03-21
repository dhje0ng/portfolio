import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b1020', color: '#e2e8f0' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Portfolio Home</h1>
        <Link
          href="/portfolio"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            border: '1px solid #6366f1',
            color: '#c7d2fe'
          }}
        >
          포트폴리오 페이지 보기
        </Link>
      </div>
    </main>
  );
}
