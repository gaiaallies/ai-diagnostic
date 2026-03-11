import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Ready Diagnostic | Gaia Allies</title>
        <meta name="description" content="Bespoke AI Ready Diagnostics for law firms. Built by Gaia Allies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{
        minHeight: '100vh',
        background: '#f5f3ee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px',
          background: '#2D5041',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '1rem', fontWeight: 700,
          marginBottom: '1.2rem',
          boxShadow: '0 2px 12px rgba(45,80,65,0.15)',
        }}>GA</div>

        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: '2.2rem', fontWeight: 400, color: '#1a2420',
          textAlign: 'center', marginBottom: '0.5rem',
        }}>
          AI Ready Diagnostic
        </h1>

        <p style={{
          fontSize: '0.95rem', color: '#7a7770', textAlign: 'center',
          maxWidth: '440px', lineHeight: 1.6, marginBottom: '2rem',
        }}>
          Bespoke assessments built around your firm's people, process, and technology.
        </p>

        <div style={{
          display: 'flex', gap: '6px', marginBottom: '2.5rem',
        }}>
          {[
            { label: 'People', color: '#6B4C9A', bg: 'rgba(107,76,154,0.08)' },
            { label: 'Process', color: '#2D5041', bg: 'rgba(45,80,65,0.08)' },
            { label: 'Data', color: '#B8860B', bg: 'rgba(184,134,11,0.08)' },
          ].map((p, i) => (
            <span key={i} style={{
              padding: '4px 12px', borderRadius: '12px',
              fontSize: '0.72rem', fontWeight: 500,
              color: p.color, background: p.bg,
            }}>{p.label}</span>
          ))}
        </div>

        <div style={{
          background: '#fff', border: '1px solid #e4e2dc',
          borderRadius: '10px', padding: '1.2rem 1.5rem',
          maxWidth: '400px', width: '100%',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8rem', color: '#7a7770', lineHeight: 1.6 }}>
            This diagnostic was prepared specifically for your firm.
            If you received a link, it will take you directly to your assessment.
          </p>
        </div>

        <div style={{
          marginTop: '3rem', paddingTop: '1rem',
          borderTop: '1px solid #e4e2dc',
          textAlign: 'center', width: '100%', maxWidth: '400px',
        }}>
          <p style={{ fontSize: '0.72rem', color: '#2D5041', fontWeight: 500 }}>
            Gaia Allies · AI Strategy & Training for Law Firms
          </p>
          <p style={{ fontSize: '0.65rem', color: '#a09d94', marginTop: '2px' }}>
            amy@gaiaallies.com · gaiaallies.com/aiready
          </p>
        </div>
      </div>
    </>
  )
}
