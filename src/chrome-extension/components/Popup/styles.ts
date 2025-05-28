export const popupStyles = {
  container: {
    width: '320px',
    padding: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '24px',
  },
  toggleButton: {
    width: '64px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '9999px',
    padding: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  toggleButtonEnabled: {
    background: 'linear-gradient(to right, #3b82f6, #6366f1)',
  },
  toggleButtonDisabled: {
    background: 'rgba(107, 114, 128, 0.4)',
  },
  circle: {
    width: '24px',
    height: '24px',
    borderRadius: '9999px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
  },
  activeText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#059669',
  },
  inactiveText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4B5563',
  },
  description: {
    fontSize: '12px',
    color: '#6B7280',
    marginTop: '8px',
    maxWidth: '240px',
    lineHeight: '1.4',
  },
}
