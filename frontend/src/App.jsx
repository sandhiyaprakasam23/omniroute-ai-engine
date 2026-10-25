import React, { useState } from 'react';

export default function App() {
  const [destination, setDestination] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGlobalRouteQuery = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/route/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: "Current Location",
          destination: destination || "Global Terminal Hub",
          transport_mode: "car"
        })
      });
      const data = await response.json();
      setRouteData(data);
    } catch (err) {
      // Local fallback simulator if python server is reloading
      setRouteData({
        route_metadata: { estimated_time: "22 mins" },
        environmental_threats: { weather_alert: "Rainfront arriving in 10 mins 🌧️" },
        voice_agent_payload: { 
          localized_narration: "Accident detected 200 meters ahead with heavy vehicle queue buildup. Re-routing via common bypass corridor." 
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.phoneFrame}>
        
        {/* Universal Global Header */}
        <div style={styles.header}>
          <span style={styles.logo}>🌐 RouteSense AI</span>
          <span style={styles.badge}>GLOBAL ENGLISH</span>
        </div>

        {/* Spatial Map Window */}
        <div style={styles.mapCanvas}>
          <div style={styles.mapPlaceholder}>[ Global Map Spatial Overlay Layer ]</div>
          
          {/* Universal Meta AI Output Sheet */}
          {routeData && (
            <div style={styles.aiPanel}>
              <div style={styles.aiHeader}>
                <span style={styles.aiTitle}>META AI VOICE SYSTEM</span>
                <span style={styles.weatherBadge}>{routeData.environmental_threats.weather_alert}</span>
              </div>
              <div style={styles.etaRow}>
                <span>Transit Window: <strong style={{color:'#818cf8'}}>{routeData.route_metadata.estimated_time}</strong></span>
              </div>
              <div style={styles.alertBox}>
                <span style={styles.speakerIcon}>🔊 UNIVERSAL AUDIO BROADCAST:</span>
                <p style={styles.alertText}>"{routeData.voice_agent_payload.localized_narration}"</p>
              </div>
            </div>
          )}
        </div>

        {/* Global Input Panels */}
        <div style={styles.controlSheet}>
          <form onSubmit={handleGlobalRouteQuery} style={styles.form}>
            <input 
              type="text" 
              placeholder="Search destination anywhere in the world..." 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              style={styles.input}
              required
            />

            <div style={styles.globalIndicator}>
              <span style={{fontSize: '12px'}}>🌍</span>
              <span style={{fontSize: '11px', color: '#94a3b8', fontMono: 'monospace'}}>
                System Active: Common English Assistant Mode
              </span>
            </div>

            <button type="submit" style={styles.submitButton}>
              {loading ? 'Analyzing Transit Channels...' : 'Confirm Global Route Corridor'}
            </button>
          </form>

          {/* Core Interactive Mic Triggers */}
          <div style={styles.micSection}>
            <button 
              type="button"
              onClick={() => {
                const nextState = !isListening;
                setIsListening(nextState);
                if (nextState) {
                  setTimeout(() => { handleGlobalRouteQuery(); setIsListening(false); }, 2000);
                }
              }} 
              style={{
                ...styles.micButton,
                backgroundColor: isListening ? '#e11d48' : '#1e293b',
                boxShadow: isListening ? '0 0 15px #e11d48' : 'none'
              }}
            >
              🎙️
            </button>
            <div style={styles.micStatusBox}>
              <p style={styles.micStatusText}>
                {isListening ? `Processing audio speech query context...` : `Tap mic to talk to global voice assistant`}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'system-ui, sans-serif', color: '#ffffff', margin: 0, padding: '10px' },
  phoneFrame: { width: '100%', maxWidth: '360px', height: '760px', backgroundColor: '#020617', borderRadius: '36px', border: '4px solid #334155', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
  header: { padding: '15px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#090d16' },
  logo: { fontSize: '13px', fontWeight: 'bold', color: '#818cf8', letterSpacing: '0.5px' },
  badge: { fontSize: '9px', backgroundColor: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', padding: '2px 8px', borderRadius: '20px', fontWeight: 'bold' },
  mapCanvas: { flex: 1, backgroundColor: '#0b1329', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  mapPlaceholder: { fontSize: '11px', color: '#334155', fontFamily: 'monospace' },
  aiPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(2, 6, 23, 0.98)', borderTop: '1px solid #4f46e5', padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px' },
  aiHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  aiTitle: { fontSize: '10px', fontWeight: 'bold', color: '#818cf8', letterSpacing: '0.5px' },
  weatherBadge: { fontSize: '11px', color: '#f59e0b' },
  etaRow: { fontSize: '12px', color: '#e2e8f0' },
  alertBox: { backgroundColor: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #1e293b' },
  speakerIcon: { fontSize: '10px', color: '#34d399', display: 'block', fontWeight: 'bold', marginBottom: '2px' },
  alertText: { margin: 0, fontSize: '12px', fontStyle: 'italic', color: '#f1f5f9', lineHeight: '1.4' },
  controlSheet: { backgroundColor: '#020617', borderTop: '1px solid #1e293b', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', outline: 'none' },
  globalIndicator: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#090d16', padding: '8px', borderRadius: '8px', border: '1px solid #1e293b' },
  submitButton: { backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', padding: '11px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  micSection: { display: 'flex', alignItems: 'center', gap: '10px' },
  micButton: { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #334155', color: '#ffffff', fontSize: '16px', cursor: 'pointer', display: 'flex', justifycontent: 'center', alignItems: 'center', transition: 'all 0.2s' },
  micStatusBox: { flex: 1, backgroundColor: '#0f172a', height: '40px', borderRadius: '8px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', paddingLeft: '12px' },
  micStatusText: { margin: 0, fontSize: '11px', color: '#94a3b8' }
};
