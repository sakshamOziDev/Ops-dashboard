import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
import './App.css'
import SideDrawer from './component/SideDrawer' // import drawer
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useFetchData } from './hooks/useFetchData';
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter , setFilter] = useState({});
  const {data, loading, error } = useFetchData("/api/reports/order-performance",filter );
  console.log(data,loading,error);

 const  onFilterTab = (filterValue)=>{
    var data = {"filter" : filterValue};
    setFilter(data);

  } 
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Top Bar: Hamburger + Title in a row */}
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                zIndex: 1100,
                height: 64,
                padding: '0 24px',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Open menu"
                >
                  <svg width="30" height="30" viewBox="0 0 30 30">
                    <rect y="7" width="30" height="3" rx="1.5" fill="#fff" />
                    <rect y="14" width="30" height="3" rx="1.5" fill="#fff" />
                    <rect y="21" width="30" height="3" rx="1.5" fill="#fff" />
                  </svg>
                </button>
                <h2 style={{
                  margin: 0,
                  fontWeight: 'bold',
                  fontSize: '2rem',
                  letterSpacing: '2px',
                  flex: 1,
                  textAlign: 'left',
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}>OPS-Dashboard</h2>
              </div>

              <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

              {/* Dropdown on top right above grid */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 80, marginBottom: 20, paddingRight: 24 , }}>
                <select
                  style={{ 
                    padding: '12px 20px', 
                    borderRadius: 12, 
                    border: 'none', 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    minWidth: 180, 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#000000',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onChange={e => onFilterTab(e.target.value)}
                  defaultValue="all"
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.color = '#fff';
                    e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                  }}
                >
                  <option value="hour"  style={{ color: '#000000' }}>last hour</option>
                  <option value="today"  style={{ color: '#000000' }}>today</option>
                  <option value="day"  style={{ color: '#000000' }}>last day</option>
                  <option value="week"  style={{ color: '#000000' }}>last week</option>
                  <option value="month" style={{ color: '#000000' }}>Last Month</option>
                  <option value="year" style={{ color: '#000000' }}>Last year</option>
                  <option value="all" style={{ color: '#000000' }}>All</option>
                   
                </select>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 24,
                padding: '24px',
              }}>
                {data && (Object.entries(data.summary)
                    .filter(([key]) => key !== "filter") // filter skip
                    .map(([key, value], idx) => {
                      const gradients = [
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                      ];
                      const gradient = gradients[idx % gradients.length];
                      
                      return (
                      <div
                        key={idx}
                        style={{
                            background: gradient,
                            borderRadius: 16,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                            padding: '24px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                            minHeight: 140,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-8px) scale(1.02)';
                            e.target.style.boxShadow = '0 16px 48px rgba(0,0,0,0.25)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                          }}
                        >
                          <div style={{ 
                            fontSize: '2rem', 
                            fontWeight: 'bold', 
                            color: '#fff',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            marginBottom: '8px',
                          }}>
                          {value}
                        </div>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: 'rgba(255,255,255,0.9)', 
                            textAlign: 'center',
                            fontWeight: '500',
                            letterSpacing: '0.5px',
                          }}>
                          {key.replace(/_/g, " ").toUpperCase()}
                        </div>
                      </div>
                      );
                    }))}

              </div>

              {/* Dashboard Table */}
              <div style={{ padding: '0 24px', marginTop: 24 }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'separate', 
                  borderSpacing: '0',
                  background: 'rgba(255,255,255,0.95)', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                }}>
                  <thead>
                    <tr style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Date</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Total Orders Delivered</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>AVG Promised SLA</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Avg Actual SLA (mins)</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Avg Breach Time</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Orders Within SLA</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Orders Breaching SLA</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>% Orders within SLA</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Clubbed Orders</th>
                      <th style={{ 
                        padding: '16px 12px', 
                        border: 'none',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      }}>Avg Handoff time</th>
                    </tr>
                  </thead>
                <tbody>
                    {data?.reportList?.length > 0 ? (
                      data.reportList.map((row, idx) => (
                        <tr 
                          key={idx}
                          style={{
                            background: idx % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(248,250,252,0.8)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)';
                            e.target.style.transform = 'scale(1.01)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = idx % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(248,250,252,0.8)';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.date}</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.total_orders_delivered}</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.avg_promised_sla} mins</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.avg_actual_sla} mins</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.avg_breach_time} mins</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.orders_within_sla}</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.orders_breaching_sla}</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.percent_orders_within_sla}</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.clubbed_orders}</td>
                          <td style={{ 
                            padding: '14px 12px', 
                            border: 'none', 
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#374151',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>{row.avg_handoff_time}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ 
                          padding: '40px', 
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.8)',
                          color: '#6b7280',
                          fontSize: '1.1rem',
                          fontWeight: '500',
                        }}>
                          {loading ? (
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              gap: '12px',
                            }}>
                              <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid #667eea',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                              }}></div>
                              Loading...
                            </div>
                          ) : "No data available"}
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App


 
