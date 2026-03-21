'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const containerStyle = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '2rem'
};

const cardStyle = {
  width: 'min(680px, 100%)',
  borderRadius: '1rem',
  border: '1px solid rgba(148, 163, 184, 0.3)',
  background: 'linear-gradient(150deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
  boxShadow: '0 20px 50px rgba(2, 6, 23, 0.45)',
  padding: '2rem'
};

export default function HomePage() {
  return (
    <main style={containerStyle}>
      <motion.section
        style={cardStyle}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Sparkles size={32} aria-hidden="true" />
        <h1 style={{ fontSize: '2rem', margin: '1rem 0 0.5rem' }}>Next + React 환경 준비 완료</h1>
        <p style={{ margin: 0, lineHeight: 1.6, color: '#cbd5e1' }}>
          최신 버전 의존성으로 기본 빌드 구조를 구성했습니다. 이제 컴포넌트와 페이지를 확장해 포트폴리오를 개발할 수 있습니다.
        </p>
      </motion.section>
    </main>
  );
}
