
import React, { useState, useEffect, useRef } from 'react';
import { CURRICULUM } from './constants';
import { UserStats, Lesson, Question } from './types';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Star, 
  Flame, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Award,
  GraduationCap,
  ShieldCheck,
  Lock,
  KeyRound,
  RotateCcw,
  AlertCircle,
  Medal,
  PartyPopper
} from 'lucide-react';

// Audio URLs (Public CDNs)
const SOUNDS = {
  success: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', // Triumph
  perfect: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Fanfare
  bronze: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3', // Small win
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
};

// Función para barajar arrays (Algoritmo Fisher-Yates) para que cada intento sea único
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PASS_THRESHOLD = 0.7; // 70% de aciertos necesarios para aprobar

const App: React.FC = () => {
  // Estado de autorización: siempre inicia en false para requerir el código en cada refresh
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [view, setView] = useState<'map' | 'lesson' | 'reward' | 'challenges' | 'goals' | 'profile'>('map');
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [challengeType, setChallengeType] = useState<'daily' | 'marathon' | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  
  const [stats, setStats] = useState<UserStats>(() => {
    // Las estadísticas (trofeos, estrellas) sí se guardan para no perder el progreso global
    const saved = localStorage.getItem('dentolingo_stats');
    const initialStats = saved ? JSON.parse(saved) : {
      name: 'Estudiante Cotrina',
      avatar: '🦷',
      stars: 0,
      trophies: 0,
      streak: 1,
      completedLessons: [],
      lastActive: new Date().toISOString(),
      goals: []
    };

    // Ensure name and avatar exist for old saves
    if (!initialStats.name) initialStats.name = 'Estudiante Cotrina';
    if (!initialStats.avatar) initialStats.avatar = '🦷';

    // Initialize goals if they don't exist or are empty
    if (!initialStats.goals || initialStats.goals.length === 0) {
      initialStats.goals = [
        { id: 'goal-1', title: 'Primeros Pasos', description: 'Completa 3 lecciones', target: 3, current: 0, reward: 100, completed: false, type: 'lessons' },
        { id: 'goal-2', title: 'Coleccionista', description: 'Gana 5 trofeos', target: 5, current: 0, reward: 250, completed: false, type: 'trophies' },
        { id: 'goal-3', title: 'Estrella Naciente', description: 'Consigue 1000 estrellas', target: 1000, current: 0, reward: 500, completed: false, type: 'stars' },
        { id: 'goal-4', title: 'Constancia', description: 'Mantén una racha de 7 días', target: 7, current: 1, reward: 1000, completed: false, type: 'streak' }
      ];
    }
    return initialStats;
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('dentolingo_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.05;
    return () => audioRef.current?.pause();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación del código secreto: COTRINA2026
    const normalizedInput = accessCode.trim().toUpperCase().replace(/\s/g, '');
    if (normalizedInput === 'COTRINA2026') {
      setIsAuthorized(true);
      // NO guardamos en localStorage para que al refresh pida el código de nuevo
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
      setIsMuted(!isMuted);
    }
  };

  const startLesson = (lesson: Lesson) => {
    // Aleatorizamos las preguntas y las opciones en cada inicio
    const randomizedQuestions = shuffleArray(lesson.questions).map(q => {
      const optionsWithIndices = q.options.map((opt, i) => ({ text: opt, originalIndex: i }));
      const shuffledOptions = shuffleArray(optionsWithIndices);
      const newCorrectIndex = shuffledOptions.findIndex(o => o.originalIndex === q.correctAnswerIndex);
      
      return {
        ...q,
        options: shuffledOptions.map(o => o.text),
        correctAnswerIndex: newCorrectIndex
      };
    });

    setCurrentLesson(lesson);
    setShuffledQuestions(randomizedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setView('lesson');
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === shuffledQuestions[currentQuestionIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      completeLesson();
    }
  };

  const startChallenge = (type: 'daily' | 'marathon') => {
    // Collect all questions from all modules
    const allQuestions = CURRICULUM.flatMap(mod => mod.lessons.flatMap(l => l.questions));
    let selectedQuestions: Question[] = [];

    if (type === 'daily') {
      selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
    } else if (type === 'marathon') {
      selectedQuestions = shuffleArray(allQuestions).slice(0, 50);
    }

    const randomizedQuestions = selectedQuestions.map(q => {
      const optionsWithIndices = q.options.map((opt, i) => ({ text: opt, originalIndex: i }));
      const shuffledOptions = shuffleArray(optionsWithIndices);
      const newCorrectIndex = shuffledOptions.findIndex(o => o.originalIndex === q.correctAnswerIndex);
      
      return {
        ...q,
        options: shuffledOptions.map(o => o.text),
        correctAnswerIndex: newCorrectIndex
      };
    });

    setCurrentLesson({
      id: `challenge-${type}`,
      title: type === 'daily' ? 'Desafío Diario' : 'Maratón de Grado',
      description: type === 'daily' ? '10 preguntas aleatorias' : '50 preguntas aleatorias',
      questions: randomizedQuestions,
      icon: type === 'daily' ? '📅' : '🏃',
      color: type === 'daily' ? 'bg-orange-500' : 'bg-purple-600'
    });
    setShuffledQuestions(randomizedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsChallengeMode(true);
    setChallengeType(type);
    setView('lesson');
  };

  const getRank = (stars: number) => {
    if (stars >= 5000) return { title: 'Maestro de Grado', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', theme: 'purple' };
    if (stars >= 2500) return { title: 'Especialista', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', theme: 'blue' };
    if (stars >= 1000) return { title: 'Interno Senior', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', theme: 'emerald' };
    if (stars >= 500) return { title: 'Interno', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', theme: 'orange' };
    return { title: 'Novato', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', theme: 'slate' };
  };

  const playSound = (type: keyof typeof SOUNDS) => {
    if (isMuted) return;
    const audio = new Audio(SOUNDS[type]);
    audio.play().catch(() => {});
  };

  const triggerCelebration = (accuracy: number) => {
    if (accuracy >= 0.91) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFFFFF']
      });
      playSound('perfect');
    } else if (accuracy >= 0.8) {
      confetti({
        particleCount: 80,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#C0C0C0', '#808080', '#FFFFFF']
      });
      playSound('success');
    } else {
      playSound('bronze');
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setStats(prev => ({ ...prev, name: tempName.trim() }));
      setIsEditingName(false);
    }
  };

  const resetProgress = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('dentolingo_stats');
      window.location.reload();
    }
  };
  const updateGoalProgress = (newStats: UserStats) => {
    const updatedGoals = newStats.goals.map(goal => {
      if (goal.completed) return goal;

      let current = goal.current;
      switch (goal.type) {
        case 'stars': current = newStats.stars; break;
        case 'lessons': current = newStats.completedLessons.length; break;
        case 'trophies': current = newStats.trophies; break;
        case 'streak': current = newStats.streak; break;
      }

      const completed = current >= goal.target;
      if (completed && !goal.completed) {
        // Add reward if just completed
        newStats.stars += goal.reward;
      }

      return { ...goal, current, completed };
    });

    return { ...newStats, goals: updatedGoals };
  };

  const completeLesson = () => {
    const accuracy = score / shuffledQuestions.length;
    const passed = accuracy >= PASS_THRESHOLD;

    if (passed) {
      const isNew = !stats.completedLessons.includes(currentLesson!.id);
      
      let bonusStars = score * 10;
      let bonusTrophies = isNew ? 1 : 0;

      if (isChallengeMode) {
        if (challengeType === 'daily') {
          bonusStars += 100; // Daily bonus
          setStats(prev => {
            const next = { ...prev, dailyChallengeCompletedAt: new Date().toISOString() };
            return updateGoalProgress(next);
          });
        } else if (challengeType === 'marathon') {
          bonusStars += 500; // Marathon bonus
          bonusTrophies += 1; // Extra trophy for marathon
        }
      }

      setStats(prev => {
        const next = {
          ...prev,
          stars: prev.stars + bonusStars,
          trophies: prev.trophies + bonusTrophies,
          completedLessons: isNew ? [...prev.completedLessons, currentLesson!.id] : prev.completedLessons,
        };
        return updateGoalProgress(next);
      });

      triggerCelebration(accuracy);
    }
    
    setView('reward');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-6 font-nunito text-white">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 animate-bounce-slow">
          <GraduationCap size={48} />
        </div>
        <h1 className="text-3xl font-black mb-2 text-center tracking-tight">AcademyCotrina</h1>
        <p className="text-slate-400 font-bold mb-8 text-center text-sm">Plataforma Exclusiva de Preparación de Grado</p>
        
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              placeholder="Ingrese el código de acceso"
              className={`w-full bg-slate-800 border-2 ${authError ? 'border-red-500 animate-shake' : 'border-slate-700'} rounded-2xl py-4 pl-12 pr-4 font-black text-center focus:border-blue-500 outline-none transition-all uppercase placeholder:text-slate-600 placeholder:normal-case`}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
          >
            VERIFICAR Y ENTRAR
          </button>
        </form>
        {authError && <p className="text-red-400 mt-4 font-black text-sm text-center">Código incorrecto. <br/>Solicítalo a tu docente.</p>}
        <div className="mt-12 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Seguridad Estudiantil AcademyCotrina</p>
        </div>
      </div>
    );
  }

  const currentRank = getRank(stats.stars);
  const currentAccuracy = shuffledQuestions.length > 0 ? (score / shuffledQuestions.length) : 0;
  const hasPassed = currentAccuracy >= PASS_THRESHOLD;

  const themeClasses = {
    purple: 'bg-purple-600 border-purple-800 text-purple-600',
    blue: 'bg-blue-600 border-blue-800 text-blue-600',
    emerald: 'bg-emerald-600 border-emerald-800 text-emerald-600',
    orange: 'bg-orange-500 border-orange-700 text-orange-500',
    slate: 'bg-slate-600 border-slate-800 text-slate-600'
  }[currentRank.theme as keyof typeof themeClasses];

  return (
    <div className={`min-h-screen flex flex-col max-w-md mx-auto bg-slate-50 shadow-2xl relative overflow-hidden font-nunito border-x border-slate-200 theme-${currentRank.theme}`}>
      <header className={`sticky top-0 z-30 bg-white border-b-2 ${currentRank.border} px-4 py-3 flex items-center gap-3 shadow-sm`}>
        {view !== 'map' && view !== 'lesson' && view !== 'reward' && (
          <button 
            onClick={() => setView('map')}
            className={`p-2 -ml-2 hover:${currentRank.bg} rounded-xl transition-colors ${currentRank.color}`}
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>
        )}
        <div className="flex flex-col flex-1">
          <span className={`text-[10px] font-black uppercase tracking-tighter leading-none ${currentRank.color}`}>MAESTRÍA ODONTOLÓGICA</span>
          <span className="text-lg font-black text-slate-900 leading-none">AcademyCotrina</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 font-bold ${currentRank.bg} px-2 py-1 rounded-lg border ${currentRank.border} ${currentRank.color}`}>
            <Flame size={16} fill="currentColor" />
            <span className="text-sm">{stats.streak}</span>
          </div>
          <button onClick={toggleMute} className={`p-2 ${currentRank.bg} rounded-lg border ${currentRank.border}`}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className={currentRank.color} />}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {view === 'challenges' && (
          <div className="p-6 animate-in fade-in duration-500">
            <div className="flex flex-col items-center mb-10 mt-4 text-center">
               <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center shadow-xl mb-4 border-b-4 border-orange-800">
                  <Flame size={40} className="text-white" />
               </div>
               <h1 className="text-2xl font-black text-slate-900 mb-1">Desafíos de Maestría</h1>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">Prueba tu Nivel</p>
            </div>

            <div className="space-y-6">
              {/* Daily Challenge */}
              <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-orange-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-12 -mt-12 -z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Desafío Diario</h3>
                      <p className="text-xs font-bold text-slate-500">10 preguntas aleatorias</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 font-bold leading-relaxed">
                    Completa este desafío cada 24 horas para ganar <span className="text-orange-600">+100 estrellas extra</span>.
                  </p>
                  
                  {stats.dailyChallengeCompletedAt && new Date(stats.dailyChallengeCompletedAt).toDateString() === new Date().toDateString() ? (
                    <div className="w-full py-4 bg-emerald-50 text-emerald-600 font-black text-center rounded-2xl border-2 border-emerald-100 flex items-center justify-center gap-2">
                      <CheckCircle size={20} /> COMPLETADO HOY
                    </div>
                  ) : (
                    <button 
                      onClick={() => startChallenge('daily')}
                      className="w-full py-4 bg-orange-600 text-white font-black rounded-2xl shadow-lg border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all"
                    >
                      COMENZAR DESAFÍO
                    </button>
                  )}
                </div>
              </div>

              {/* Marathon Challenge */}
              <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 -z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                      <Trophy size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Maratón de Grado</h3>
                      <p className="text-xs font-bold text-slate-500">50 preguntas sin parar</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 font-bold leading-relaxed">
                    El reto definitivo. Responde 50 preguntas de todos los temas. Recompensa: <span className="text-purple-600">+500 estrellas y Trofeo Especial</span>.
                  </p>
                  <button 
                    onClick={() => startChallenge('marathon')}
                    className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl shadow-lg border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 transition-all"
                  >
                    ACEPTAR EL RETO
                  </button>
                </div>
              </div>

              {/* Coming Soon */}
              <div className="bg-slate-100 p-6 rounded-3xl border-2 border-dashed border-slate-300 text-center">
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Próximamente: Contrarreloj</p>
              </div>
            </div>
          </div>
        )}

        {view === 'goals' && (
          <div className="p-6 animate-in fade-in duration-500">
            <div className="flex flex-col items-center mb-10 mt-4 text-center">
               <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-xl mb-4 border-b-4 border-emerald-800">
                  <Award size={40} className="text-white" />
               </div>
               <h1 className="text-2xl font-black text-slate-900 mb-1">Metas y Logros</h1>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Tu Camino al Éxito</p>
            </div>

            <div className="space-y-4">
              {stats.goals.map((goal) => (
                <div key={goal.id} className={`p-5 rounded-3xl border-2 transition-all ${goal.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 shadow-sm'}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-3 rounded-2xl ${goal.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {goal.completed ? <CheckCircle size={24} /> : <Star size={24} />}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-black text-base ${goal.completed ? 'text-emerald-900' : 'text-slate-900'}`}>{goal.title}</h3>
                      <p className="text-xs font-bold text-slate-500">{goal.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-black px-2 py-1 rounded-lg ${goal.completed ? 'bg-emerald-200 text-emerald-700' : 'bg-blue-100 text-blue-600'}`}>
                        +{goal.reward} ⭐
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className={`h-full transition-all duration-1000 ${goal.completed ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{goal.completed ? 'Completado' : 'En progreso'}</span>
                    <span className="text-[10px] font-black text-slate-600">{goal.current} / {goal.target}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-blue-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <h4 className="text-lg font-black mb-2">¿Por qué las metas?</h4>
                <p className="text-sm font-bold text-blue-100 leading-relaxed">
                  Las metas te ayudan a mantener el enfoque y la disciplina. Al cumplirlas, no solo ganas recompensas, sino que aseguras que tu preparación para el examen sea constante y completa.
                </p>
              </div>
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="p-6 animate-in fade-in duration-500">
            <div className="flex flex-col items-center mb-8 mt-4">
              <div className="relative group">
                <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl border-4 border-blue-100 mb-4">
                  {stats.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                  <Award size={16} />
                </div>
              </div>
              
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="text" 
                    className="bg-slate-100 border-2 border-blue-200 rounded-xl px-4 py-2 font-black text-center outline-none focus:border-blue-500"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="p-2 bg-emerald-500 text-white rounded-xl shadow-md">
                    <CheckCircle size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <h2 className="text-2xl font-black text-slate-900">{stats.name}</h2>
                  <button 
                    onClick={() => { setTempName(stats.name); setIsEditingName(true); }}
                    className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <BookOpen size={16} />
                  </button>
                </div>
              )}
              
              <div className={`mt-3 px-4 py-1.5 rounded-full border-2 font-black text-xs uppercase tracking-widest ${getRank(stats.stars).bg} ${getRank(stats.stars).color} border-current`}>
                {getRank(stats.stars).title}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-slate-50 flex flex-col items-center">
                <Star className="text-yellow-400 mb-1" fill="currentColor" size={24} />
                <span className="text-xl font-black text-slate-900">{stats.stars}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estrellas</span>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-slate-50 flex flex-col items-center">
                <Trophy className="text-blue-600 mb-1" fill="currentColor" size={24} />
                <span className="text-xl font-black text-slate-900">{stats.trophies}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trofeos</span>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-slate-50 flex flex-col items-center">
                <Flame className="text-orange-600 mb-1" fill="currentColor" size={24} />
                <span className="text-xl font-black text-slate-900">{stats.streak}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Racha</span>
              </div>
              <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-slate-50 flex flex-col items-center">
                <CheckCircle className="text-emerald-500 mb-1" size={24} />
                <span className="text-xl font-black text-slate-900">{stats.completedLessons.length}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lecciones</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Ajustes de Cuenta</h3>
              <button 
                onClick={resetProgress}
                className="w-full p-5 bg-red-50 text-red-600 font-black rounded-3xl border-2 border-red-100 flex items-center justify-between hover:bg-red-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <RotateCcw size={20} />
                  <span>Reiniciar Progreso</span>
                </div>
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">AcademyCotrina v2.0</p>
              <p className="text-[9px] text-slate-300 font-bold mt-1">Tu éxito es nuestra misión</p>
            </div>
          </div>
        )}

        {view === 'map' && (
          <div className="p-6">
            <div className="flex flex-col items-center mb-10 mt-4 text-center">
               <div className="w-20 h-20 bg-blue-800 rounded-3xl flex items-center justify-center shadow-xl mb-4 border-b-4 border-blue-950">
                  <GraduationCap size={40} className="text-white" />
               </div>
               <h1 className="text-2xl font-black text-slate-900 mb-1">Ruta de Grado 2026</h1>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Dominio por Repetición</p>
            </div>

            <div className="space-y-12 flex flex-col items-center">
              {CURRICULUM.map((module, moduleIndex) => {
                const prevModule = moduleIndex > 0 ? CURRICULUM[moduleIndex-1] : null;
                // Unlocked if it's the first module OR if all lessons of the previous module are completed
                const isModuleUnlocked = moduleIndex === 0 || (prevModule && prevModule.lessons.every(l => stats.completedLessons.includes(l.id)));

                return (
                  <div key={module.id} className="w-full flex flex-col items-center">
                    <div className={`mb-10 px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-lg border-b-4 transition-all ${isModuleUnlocked ? 'bg-slate-900 text-white border-slate-950' : 'bg-slate-200 text-slate-400 border-slate-300'}`}>
                      {module.title}
                    </div>

                    <div className="flex flex-col items-center gap-16 w-full relative">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const isCompleted = stats.completedLessons.includes(lesson.id);
                        // A lesson is unlocked if it's the first lesson of an unlocked module 
                        // OR if the previous lesson in the same module is completed
                        const isLessonUnlocked = isModuleUnlocked && (lessonIndex === 0 || stats.completedLessons.includes(module.lessons[lessonIndex-1].id));
                        
                        // Zigzag offset
                        const offsetClass = lessonIndex % 2 === 0 ? 'translate-x-4' : '-translate-x-4';

                        return (
                          <div key={lesson.id} className={`relative flex flex-col items-center transition-all duration-500 ${offsetClass}`}>
                            {/* Connector Line to next lesson */}
                            {(lessonIndex < module.lessons.length - 1 || moduleIndex < CURRICULUM.length - 1) && (
                              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-slate-200 -z-0 rounded-full overflow-hidden">
                                {isCompleted && <div className="h-full w-full bg-emerald-400 animate-in slide-in-from-top duration-1000"></div>}
                              </div>
                            )}

                            <button
                              disabled={!isLessonUnlocked}
                              onClick={() => startLesson(lesson)}
                              className={`
                                relative z-10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-xl transition-all transform hover:scale-110 active:scale-95 border-b-[10px]
                                ${isLessonUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                                ${isCompleted ? 'bg-emerald-500 border-emerald-700 text-white' : isLessonUnlocked ? `${lesson.color} border-black/20 text-white` : 'bg-slate-300 border-slate-400 text-slate-500'}
                                ${!isCompleted && isLessonUnlocked ? 'animate-bounce-slow ring-4 ring-blue-400/30' : ''}
                              `}
                            >
                              {!isLessonUnlocked ? <Lock size={32} /> : isCompleted ? <CheckCircle size={40} /> : <span className="drop-shadow-md">{lesson.icon}</span>}
                              
                              {/* Progress Ring for incomplete but unlocked lessons */}
                              {!isCompleted && isLessonUnlocked && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg animate-pulse">
                                  NUEVO
                                </div>
                              )}
                            </button>

                            <div className="mt-4 text-center max-w-[120px]">
                               <span className={`text-[10px] font-black uppercase leading-tight block px-2 py-1.5 rounded-xl shadow-sm border-2 transition-all ${isLessonUnlocked ? 'bg-white text-slate-800 border-slate-200' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                  {lesson.title}
                               </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'lesson' && currentLesson && (
          <div className="p-6 flex flex-col min-h-full bg-white animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setView('map')} className="text-slate-400 text-3xl font-bold hover:text-slate-600 transition-colors">✕</button>
              <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-100">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500 rounded-full shadow-inner" 
                  style={{ width: `${((currentQuestionIndex) / shuffledQuestions.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-black text-slate-500 font-inter">{currentQuestionIndex + 1}/{shuffledQuestions.length}</span>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {shuffledQuestions[currentQuestionIndex].text}
              </h2>
            </div>

            <div className="space-y-4 flex-1">
              {shuffledQuestions[currentQuestionIndex].options.map((option, idx) => {
                const question = shuffledQuestions[currentQuestionIndex];
                const isCorrect = idx === question.correctAnswerIndex;
                const isSelected = selectedOption === idx;
                
                let btnStyle = "border-2 border-slate-200 bg-white text-black ring-offset-2";
                
                if (isAnswered) {
                  if (isCorrect) btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 scale-[1.02] z-10";
                  else if (isSelected) btnStyle = "bg-red-100 border-red-500 text-red-900";
                  else btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                } else {
                  btnStyle += " hover:border-blue-400 hover:bg-blue-50 active:scale-95";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full min-h-[72px] p-4 rounded-2xl text-left font-black text-lg flex items-center gap-5 transition-all shadow-sm ${btnStyle}`}
                  >
                    <span className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-lg font-black border-2 ${isAnswered ? 'border-transparent bg-black/5' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`mt-8 p-6 rounded-3xl shadow-2xl border-4 animate-in slide-in-from-bottom-20 duration-300 ${
                selectedOption === shuffledQuestions[currentQuestionIndex].correctAnswerIndex ? 'bg-emerald-50 border-emerald-400' : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${selectedOption === shuffledQuestions[currentQuestionIndex].correctAnswerIndex ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {selectedOption === shuffledQuestions[currentQuestionIndex].correctAnswerIndex 
                      ? <CheckCircle className="text-white" size={24} />
                      : <XCircle className="text-white" size={24} />
                    }
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-lg mb-2 uppercase ${selectedOption === shuffledQuestions[currentQuestionIndex].correctAnswerIndex ? 'text-emerald-700' : 'text-red-700'}`}>
                       {selectedOption === shuffledQuestions[currentQuestionIndex].correctAnswerIndex ? '¡Correcto!' : 'Análisis del Dr. Cotrina:'}
                    </p>
                    <p className="text-sm text-slate-800 leading-relaxed font-bold font-inter bg-white/50 p-3 rounded-xl border border-black/5">
                      {shuffledQuestions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={nextQuestion}
                  className="w-full mt-6 py-5 bg-slate-900 text-white font-black text-xl rounded-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg border-b-4 border-slate-700"
                >
                  {currentQuestionIndex + 1 === shuffledQuestions.length ? 'VER RESULTADOS' : 'CONTINUAR'} <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'reward' && currentLesson && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in zoom-in duration-500 text-center">
            <div className="relative mb-8">
              {hasPassed ? (
                <div className="flex flex-col items-center">
                  {currentAccuracy >= 0.91 ? (
                    <div className="relative">
                      <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.5)] border-b-8 border-yellow-600 animate-bounce">
                        <div className="flex flex-col items-center">
                          <Trophy size={60} className="text-yellow-800" fill="currentColor" />
                          <span className="text-2xl mt-1">🦷</span>
                        </div>
                      </div>
                      <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg border-2 border-yellow-400">
                        <PartyPopper size={24} className="text-yellow-500" />
                      </div>
                      <h2 className="text-2xl font-black text-yellow-600 mt-6">¡COPA DE ORO!</h2>
                      <p className="text-slate-500 font-bold">Muelita Feliz: ¡Perfecto!</p>
                    </div>
                  ) : currentAccuracy >= 0.8 ? (
                    <div className="relative">
                      <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center shadow-xl border-b-8 border-slate-400 animate-pulse">
                        <Medal size={60} className="text-slate-500" fill="currentColor" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-600 mt-6">MEDALLA DE PLATA</h2>
                      <p className="text-slate-500 font-bold">¡Excelente desempeño!</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center shadow-lg border-b-8 border-orange-300">
                        <div className="flex flex-col items-center">
                          <span className="text-5xl">🦷</span>
                          <span className="text-xs font-black text-orange-800 mt-1">BRONCE</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-black text-orange-800 mt-6">DIENTE DE BRONCE</h2>
                      <p className="text-slate-500 font-bold">¡Buen intento!</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center shadow-2xl border-b-8 border-red-200">
                  <AlertCircle size={64} className="text-red-500" />
                </div>
              )}
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-2">
              {hasPassed ? '¡Lección Completada!' : '¡Casi lo logras!'}
            </h1>
            <p className="text-slate-500 font-bold mb-8 max-w-[250px] mx-auto">
              {hasPassed 
                ? `Has obtenido un ${Math.round(currentAccuracy * 100)}% de precisión en este tema.`
                : 'No has alcanzado el puntaje mínimo, pero no te rindas. ¡Vuelve a intentarlo!'}
            </p>

            <div className="grid grid-cols-2 gap-6 w-full mb-12">
               <div className={`border-2 p-6 rounded-3xl shadow-sm ${hasPassed ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                  <Star className={`${hasPassed ? 'text-blue-600' : 'text-slate-400'} mx-auto mb-2`} fill="currentColor" size={32} />
                  <p className={`text-2xl font-black ${hasPassed ? 'text-blue-800' : 'text-slate-800'}`}>+{hasPassed ? score * 10 : 0}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Puntos</p>
               </div>
               <div className={`border-2 p-6 rounded-3xl shadow-sm ${hasPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  <ShieldCheck className={`${hasPassed ? 'text-emerald-600' : 'text-red-500'} mx-auto mb-2`} size={32} />
                  <p className={`text-2xl font-black ${hasPassed ? 'text-emerald-800' : 'text-red-800'}`}>{Math.round(currentAccuracy * 100)}%</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precisión</p>
               </div>
            </div>

            {hasPassed ? (
              <button 
                onClick={() => setView('map')}
                className={`w-full py-6 text-white font-black text-xl rounded-3xl shadow-xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${currentRank.theme === 'slate' ? 'bg-blue-800 border-blue-950' : themeClasses.split(' ')[0] + ' ' + themeClasses.split(' ')[1]}`}
              >
                VOLVER AL MAPA
              </button>
            ) : (
              <button 
                onClick={() => startLesson(currentLesson)}
                className="w-full py-6 bg-slate-900 text-white font-black text-xl rounded-3xl shadow-xl border-b-8 border-slate-700 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3"
              >
                <RotateCcw size={24} /> REINTENTAR AHORA
              </button>
            )}
            
            {!hasPassed && (
               <button 
                onClick={() => setView('map')}
                className="mt-6 text-slate-400 font-black text-sm uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                SALIR POR AHORA
              </button>
            )}
          </div>
        )}
      </main>

      {(view === 'map' || view === 'challenges' || view === 'goals') && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-md bg-white border-t-2 border-slate-200 flex items-center justify-around py-4 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => { setView('map'); setIsChallengeMode(false); }}
            className={`flex flex-col items-center gap-1 ${view === 'map' ? 'text-blue-800' : 'text-slate-400'}`}
          >
            <BookOpen size={28} />
            <span className="text-[10px] font-black uppercase">Materias</span>
          </button>
          <button 
            onClick={() => { setView('challenges'); setIsChallengeMode(false); }}
            className={`flex flex-col items-center gap-1 ${view === 'challenges' ? 'text-orange-600' : 'text-slate-400'}`}
          >
            <Trophy size={28} />
            <span className="text-[10px] font-black uppercase">Desafíos</span>
          </button>
          <button 
            onClick={() => { setView('goals'); setIsChallengeMode(false); }}
            className={`flex flex-col items-center gap-1 ${view === 'goals' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <Award size={28} />
            <span className="text-[10px] font-black uppercase">Metas</span>
          </button>
          <button 
            onClick={() => { setView('profile'); setIsChallengeMode(false); }}
            className={`flex flex-col items-center gap-1 ${view === 'profile' ? 'text-blue-800' : 'text-slate-400'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all ${view === 'profile' ? 'bg-blue-100 border-blue-800' : 'bg-slate-200 border-slate-300'}`}>
              {stats.avatar}
            </div>
            <span className="text-[10px] font-black uppercase">Perfil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
