export const Options: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        padding: '16px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '12px',
          width: '80%',
          maxWidth: '500px',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '24px',
          }}
        >
          AI Extension Options
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: '#4B5563',
            marginBottom: '16px',
            lineHeight: '1.6',
          }}
        >
          This is your options page. Currently, it is a placeholder.
        </p>

        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            maxWidth: '400px',
            lineHeight: '1.4',
            margin: '0 auto',
          }}
        >
          More options will be added here soon. Stay tuned for upcoming updates.
        </p>
      </div>
    </div>
  )
}
