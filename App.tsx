
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Language, Difficulty, SessionConfig } from './types';
import { LANGUAGES, DIFFICULTIES, STUDY_TOPICS, SYSTEM_INSTRUCTION_TEMPLATE, TECHNICAL_CURRICULUM } from './constants';
import { encode, decode, decodeAudioData, createBlob } from './utils/audioUtils';

// Components
const Header = () => (
  <header className="py-6 px-8 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">P</span>
      </div>
      <h1 className="text-xl font-bold tracking-tight text-slate-800">PhysioClass</h1>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">System Ready</span>
    </div>
  </header>
);

const Orb = ({ active }: { active: boolean }) => (
  <div className="relative flex items-center justify-center w-64 h-64">
    <div className={`absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${active ? 'scale-150' : 'scale-100'}`} />
    <div className={`w-48 h-48 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full shadow-2xl flex items-center justify-center z-10 ${active ? 'orb-animation' : ''}`}>
      <div className="w-40 h-40 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) => (
  <h3 className={`text-lg font-bold ${color} mb-4 flex items-center gap-2 border-b border-slate-100 pb-2`}>
    {icon}
    {title}
  </h3>
);

const StudyModal = ({ topic, onClose }: { topic: string, onClose: () => void }) => {
  const content = TECHNICAL_CURRICULUM[topic];
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col h-[95vh]">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-3xl z-20">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{topic}</h2>
            <p className="text-slate-500">Biomedical Engineering & Service Documentation</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-12 bg-slate-50/30">
          {/* Overview Section */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <SectionHeader 
               color="text-indigo-600" 
               title="Equipment Overview & Architecture" 
               icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
             />
             <p className="text-slate-700 leading-relaxed mb-6">{content.overview}</p>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <h4 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Block Diagram Flow</h4>
                  <p className="text-indigo-900 font-mono text-sm">{content.blockDiagram}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Circuitry Notes</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{content.circuitDescription}</p>
                </div>
             </div>
          </section>

          {/* Working Principle & Parts */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <SectionHeader 
                color="text-blue-600" 
                title="Working Principle" 
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              />
              <p className="text-slate-600 text-sm leading-relaxed">{content.workingPrinciple}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <SectionHeader 
                color="text-orange-600" 
                title="Parts & Functions" 
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
              />
              <ul className="space-y-2">
                {content.partsAndFunctions.map((p, i) => (
                  <li key={i} className="text-sm border-b border-slate-50 last:border-0 pb-2">
                    <span className="font-bold text-slate-800">{p.part}:</span> <span className="text-slate-600">{p.function}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Fault Diagnosis & Calibration */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <SectionHeader 
               color="text-red-600" 
               title="Service: Diagnostics & Calibration" 
               icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
            />
            <div className="space-y-6">
              <div className="overflow-hidden border border-slate-100 rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Fault Observed</th>
                      <th className="p-3">Probable Cause</th>
                      <th className="p-3">Remedy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {content.faultDiagnosis.map((f, i) => (
                      <tr key={i}>
                        <td className="p-3 font-medium text-red-600">{f.fault}</td>
                        <td className="p-3 text-slate-600">{f.cause}</td>
                        <td className="p-3 text-green-700 font-medium">{f.remedy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <h4 className="text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Calibration Protocol</h4>
                <p className="text-yellow-900 text-sm leading-relaxed">{content.calibration}</p>
              </div>
            </div>
          </section>

          {/* Maintenance Checklist */}
          <section className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white">
            <SectionHeader 
               color="text-white" 
               title="Maintenance Checklist" 
               icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            />
            <ul className="grid md:grid-cols-2 gap-4">
              {content.maintenance.map((m, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">✓</span>
                  {m}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [config, setConfig] = useState<SessionConfig>({
    language: Language.English,
    difficulty: Difficulty.Advanced, // default advanced for engineers
    topic: STUDY_TOPICS[0]
  });
  const [isLive, setIsLive] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [transcripts, setTranscripts] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const audioContextsRef = useRef<{input: AudioContext, output: AudioContext} | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);
  const sessionRef = useRef<any>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (audioContextsRef.current) {
      try { audioContextsRef.current.input.close(); } catch(e) {}
      try { audioContextsRef.current.output.close(); } catch(e) {}
      audioContextsRef.current = null;
    }
    setIsLive(false);
    setIsModelSpeaking(false);
  }, []);

  const startSession = async () => {
    setErrorMessage(null);
    setIsLive(true);
    setTranscripts([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const inputAudioContext = new AudioContext({ sampleRate: 16000 });
      const outputAudioContext = new AudioContext({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputAudioContext, output: outputAudioContext };

      let currentInputTranscription = '';
      let currentOutputTranscription = '';

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: SYSTEM_INSTRUCTION_TEMPLATE(config.language, config.difficulty, config.topic),
        },
        callbacks: {
          onopen: async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              const source = inputAudioContext.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob })).catch(e => {
                  console.error("Failed to send audio input", e);
                });
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioContext.destination);
            } catch (err) {
              console.error("Mic access failed", err);
              setErrorMessage("Microphone access is required for real-time practice.");
              stopSession();
            }
          },
          onmessage: async (message) => {
            const audioBase64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioBase64) {
              setIsModelSpeaking(true);
              const ctx = outputAudioContext;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioBase64), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsModelSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsModelSpeaking(false);
            }

            if (message.serverContent?.inputTranscription) {
              currentInputTranscription += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscription += message.serverContent.outputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              if (currentInputTranscription) {
                setTranscripts(prev => [...prev.slice(-20), { role: 'user', text: currentInputTranscription }]);
                currentInputTranscription = '';
              }
              if (currentOutputTranscription) {
                setTranscripts(prev => [...prev.slice(-20), { role: 'ai', text: currentOutputTranscription }]);
                currentOutputTranscription = '';
              }
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: (e) => {
            setErrorMessage("The AI service is currently unavailable. Please try again.");
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      setErrorMessage("Could not connect to the AI service.");
      stopSession();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      {showStudyGuide && config.topic && TECHNICAL_CURRICULUM[config.topic] && (
        <StudyModal topic={config.topic} onClose={() => setShowStudyGuide(false)} />
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-7xl mx-auto w-full">
        {!isLive ? (
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Biomedical Engineering Academy</h2>
            <p className="text-slate-500 mb-8">Technical documentation, repair guides, and language practice for medical equipment professionals.</p>
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Practice Language</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={config.language}
                  onChange={(e) => setConfig({...config, language: e.target.value as Language})}
                >
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Engineering Depth</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={config.difficulty}
                  onChange={(e) => setConfig({...config, difficulty: e.target.value as Difficulty})}
                >
                  {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 flex justify-between">
                  <span>Selected Equipment Module</span>
                  {config.topic && TECHNICAL_CURRICULUM[config.topic] && (
                    <button 
                      onClick={() => setShowStudyGuide(true)}
                      className="text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Engineering Docs
                    </button>
                  )}
                </label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={config.topic}
                  onChange={(e) => setConfig({...config, topic: e.target.value})}
                >
                  {STUDY_TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={startSession}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>{errorMessage ? 'Retry Connection' : 'Enter Training Environment'}</span>
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row gap-8 items-stretch h-[85vh]">
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Engineering Session</span>
              </div>

              {config.topic && TECHNICAL_CURRICULUM[config.topic] && (
                <button 
                  onClick={() => setShowStudyGuide(true)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-2 text-xs font-bold text-slate-600"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Tech Specs
                </button>
              )}
              
              <Orb active={isModelSpeaking} />
              
              <div className="mt-8 text-center space-y-2">
                <p className="text-slate-400 font-medium">{isModelSpeaking ? 'Mentor is speaking...' : 'Listening to Engineer...'}</p>
                <div className="flex space-x-2 justify-center">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">{config.language}</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold">{config.difficulty}</span>
                </div>
                <div className="pt-2">
                   <span className="text-xs text-slate-400 font-medium italic">Current Task: {config.topic}</span>
                </div>
              </div>

              <button 
                onClick={stopSession}
                className="mt-12 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
              >
                End Session
              </button>
            </div>

            <div className="w-full md:w-[400px] flex flex-col bg-slate-900/5 backdrop-blur-sm rounded-3xl border border-white p-6 shadow-inner">
              <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest flex items-center justify-between">
                <span>Engineering Log</span>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-500">Real-time</span>
              </h3>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {transcripts.length === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-400 italic text-sm text-center px-4">
                    The conversation log will update as you discuss technical details with the mentor.
                  </div>
                )}
                {transcripts.map((t, idx) => (
                  <div key={idx} className={`animate-in slide-in-from-bottom-2 duration-300 ${t.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-[90%] p-3 rounded-2xl text-sm ${
                      t.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-tl-none'
                    }`}>
                      <p className="leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} PhysioClass • Professional Technical Mentorship
      </footer>
    </div>
  );
};

export default App;
