import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  QrCode, 
  SendHorizontal, 
  PlusCircle, 
  TrendingUp, 
  History, 
  User, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Pencil,
  LogOut,
  File,
  Eye,
  Check,
  XCircle,
  Mail,
  Phone,
  Lock,
  Loader2,
  Landmark,
  Bus,
  MessageSquare,
  Heart,
  HeartHandshake,
  Handshake,
  Calculator,
  Home,
  Tag,
  Users,
  GraduationCap,
  Shield,
  BookOpen,
  Sparkles,
  ChevronDown,
  Coins,
  Gem,
  Dices,
  Trophy,
  RotateCcw,
  ArrowLeftRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';

const SPONSOR_PROJECTS = [
  { id: 1, name: 'Bus Alert', desc: 'Sistema de Alerta de Ônibus em Tempo Real', icon: Bus },
  { id: 2, name: 'Disparador Pro', desc: 'Automação Inteligente para WhatsApp', icon: MessageSquare },
  { id: 3, name: 'Cupido Católico', desc: 'Plataforma de Relacionamento Cristão', icon: Heart },
  { id: 4, name: 'Minha Novena', desc: 'App de Devocional e Orações', icon: HeartHandshake },
  { id: 5, name: 'Otimização Fiscal IA', desc: 'Gestão Tributária com Inteligência Artificial', icon: Calculator },
  { id: 6, name: 'Imob Tech Pro', desc: 'Plataforma para Mercado Imobiliário Elite', icon: Home },
  { id: 7, name: 'Oferta Aqui', desc: 'Marketplace de Ofertas Locais', icon: Tag },
  { id: 8, name: 'Comunidade Cívica', desc: 'Plataforma de Engajamento Social', icon: Users },
  { id: 9, name: 'EduTrack', desc: 'Gestão e Rastreamento Educacional', icon: GraduationCap },
  { id: 10, name: 'Terço dos Homens', desc: 'Aplicativo de Oração e Comunidade', icon: Shield },
  { id: 11, name: 'Bíblia Sagrada Católica', desc: 'O Caminho da Fé no seu smartphone', icon: BookOpen },
  { id: 12, name: 'GioNails', desc: 'Landing Page Premium para Nail Designers', icon: Sparkles }
];

const LandingPage = ({ onGetStarted, user }) => {
  const [budgetForm, setBudgetForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    type: 'App Móvel',
    desc: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('budgets').insert([{
        user_id: user?.id || null,
        full_name: budgetForm.name,
        email: budgetForm.email,
        whatsapp: budgetForm.whatsapp,
        project_type: budgetForm.type,
        description: budgetForm.desc
      }]);
      
      if (error) throw error;
      alert('🚀 Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
      setBudgetForm({ name: '', email: '', whatsapp: '', type: 'App Móvel', desc: '' });
    } catch (err) {
      console.error('Budget error:', err);
      alert('Ops! Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="landing-container min-h-screen bg-black text-white selection:bg-amber-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500 rounded-full blur-[150px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6">
        <div className="max-w-6xl w-full text-center space-y-12 z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-block p-4 bg-white/5 rounded-3xl border border-white/10 mb-8 backdrop-blur-xl">
               <img src="/logo.png" className="w-20 h-auto" alt="Girafa Tech" />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="outfit text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none uppercase">
               Girafa <span className="text-amber-500">Tech</span> <br/>
               <span className="text-muted-foreground opacity-50 text-6xl">Investimentos</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed font-light opacity-80">
              Gestão inteligente de capital e rendimentos em nuvem. <br/>
              A Girafa Tech é a sua nova conta de investimentos exponenciais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={onGetStarted} className="primary-btn px-12 py-5 text-xl font-black shadow-[0_0_40px_rgba(251,191,36,0.4)] uppercase tracking-tighter">
                 Abrir Minha Conta
              </button>
              <button onClick={onGetStarted} className="btn-outline px-12 py-5 text-lg font-bold border-white/20 hover:bg-white/5 backdrop-blur-md opacity-70 hover:opacity-100">
                 Já sou cliente (Login)
              </button>
            </div>

             {/* Stats Bar */}
             <section className="relative z-10 py-12 mb-12 border-y border-white/5 bg-white/[0.01] backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                   {[
                     { val: '1.2k+', label: 'Clientes Ativos' },
                     { val: 'R$ 2M+', label: 'Volume Transacionado' },
                     { val: 'R$ 680k+', label: 'Rendimentos Pagos' },
                     { val: '24h', label: 'Liquidez Garantida' }
                   ].map((s, i) => (
                     <div key={i} className="space-y-1">
                        <h4 className="text-3xl font-black outfit text-amber-500">{s.val}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-60">{s.label}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Prominent Business Info Board */}
             <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-3xl mx-auto"
             >
                <div className="ornamental-frame text-center shadow-[0_0_100px_rgba(251,191,36,0.1)]">
                   <h3 className="handwritten text-3xl md:text-5xl text-amber-500 mb-8 border-b border-amber-500/20 pb-4 inline-block">Principais Diretrizes Girafa Tech</h3>
                   
                   <div className="handwritten space-y-6 text-xl md:text-3xl text-white/90 leading-relaxed italic">
                      <p>📅 Inauguração Oficial: <span className="text-amber-400 font-bold">12/04/2026</span></p>
                      <p>💸 Taxa de Saque Operacional: <span className="text-amber-400 font-bold">5%</span></p>
                      <p>⏰ Horários: Seg-Sex 06h às 23:59h</p>
                      <p>💰 Aporte Mínimo: R$ 10,00</p>
                      <p>🔑 Chave Pix: Necessário Envio de Documentação</p>
                      <p>🦒 Girafa Bank: Empréstimos com Juros Atrativos</p>
                      <p>🏦 Gateway de Pagamento: Recarga Pay</p>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted opacity-20">
          <ChevronDown size={40} />
        </motion.div>
      </section>


      <footer className="relative z-10 py-16 px-6 border-t border-white/5 text-center">
        <p className="text-muted-foreground text-sm font-light opacity-50 tracking-widest uppercase">© 2026 Girafa Tech • Elite Software Development • Girafa Bank Division</p>
      </footer>
    </div>
  );
};

const generatePixPayload = (valor) => {
  const chave = "09551040848";
  const formatStr = (id, value) => {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
  };
  
  let payload = "000201010212";
  const gui = formatStr("00", "br.gov.bcb.pix");
  const key = formatStr("01", chave);
  payload += formatStr("26", gui + key);
  payload += "520400005303986";
  
  if (valor && Number(valor) > 0) {
    payload += formatStr("54", Number(valor).toFixed(2));
  }
  
  payload += "5802BR" + formatStr("59", "Girafa Tech") + formatStr("60", "SAO PAULO");
  const txId = formatStr("05", "***");
  payload += formatStr("62", txId);
  payload += "6304";
  
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
};

const GiraluckySection = ({ profile, updateBalance, showNotification }) => {
  const [reels, setReels] = useState(['🦒', '7', '💎']);
  const [spinning, setSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const symbols = ['🦒', '💎', '7', '🪙', '🦁', '🎰'];
  const GIRAFFE_IMG = '/slots-giraffe.png';

  const ConfettiBurst = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.2, 0.8, 0], 
            x: (Math.random() - 0.5) * 1200, 
            y: (Math.random() - 0.5) * 800,
            rotate: Math.random() * 720
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className={`absolute w-3 h-3 rounded-sm ${i % 2 === 0 ? 'bg-amber-400' : 'bg-blue-500'} shadow-[0_0_10px_rgba(251,191,36,0.6)]`}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`coins-${i}`}
          initial={{ y: 50, x: 0, scale: 0 }}
          animate={{ 
            y: [-100, 300], 
            x: (Math.random() - 0.5) * 800,
            scale: [0, 1.5, 1],
            rotateY: [0, 720]
          }}
          transition={{ duration: 3, ease: "anticipate" }}
          className="absolute text-3xl"
        >
          🪙
        </motion.div>
      ))}
    </div>
  );

  const spin = async () => {
    if (profile.balance < 5) {
      showNotification('Saldo insuficiente para girar (Mínimo R$ 5,00)', 'error');
      return;
    }
    
    setSpinning(true);
    setShowConfetti(false);
    
    // Deduct cost (R$ 5,00)
    const { data: newBal, error: dedErr } = await supabase.rpc('handle_balance_change', { 
      user_id_param: profile.id, 
      amount_param: -5,
      type_param: 'Investimento',
      desc_param: 'Aposta no GiraLucky'
    });
    
    if (dedErr) {
      showNotification('Erro ao processar aposta.', 'error');
      setSpinning(false);
      return;
    }
    updateBalance(newBal);

    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(async () => {
      clearInterval(spinInterval);
      const finalResult = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      setReels(finalResult);
      setSpinning(false);

      let prize = 0;
      let winMsg = '';

      if (finalResult.every(s => s === '7')) {
        prize = 7;
        winMsg = 'SORTE! Você ganhou R$ 7,00!';
      } else if (finalResult.every(s => s === '💎')) {
        prize = 20;
        winMsg = 'MUITO BOM! Diamantes são eternos! Ganhou R$ 20,00!';
      } else if (finalResult.every(s => s === '🦒')) {
        prize = 100;
        winMsg = 'JACKPOT!!! Você ganhou R$ 100,00!';
      }

      if (prize > 0) {
        setShowConfetti(true);
        const { data: updatedBal, error: winErr } = await supabase.rpc('handle_balance_change', { 
          user_id_param: profile.id, 
          amount_param: prize,
          type_param: 'Lucro',
          desc_param: `Prêmio GiraLucky: ${winMsg}`
        });
        
        if (!winErr) {
          updateBalance(updatedBal);
          showNotification(winMsg, 'success');
        }
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        showNotification('Não foi dessa vez! Tente novamente.');
      }
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in relative">
      {showConfetti && <ConfettiBurst />}

      <div className="glass-card p-12 text-center border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        
        <h2 className="outfit text-5xl font-black mb-2 text-white italic tracking-tighter uppercase italic">GiraLucky 🎰</h2>
        <p className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em] mb-12">Teste sua sorte e ganhe prêmios instantâneos!</p>

        <div className="flex justify-center gap-6 mb-12">
          {reels.map((symbol, i) => (
            <motion.div 
              key={i}
              animate={spinning ? { y: [0, -20, 0], scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="w-32 h-48 bg-black/40 border-4 border-purple-500/50 rounded-3xl flex items-center justify-center text-7xl shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              {symbol === '🦒' ? (
                <img src={GIRAFFE_IMG} className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" alt="Girafa" />
              ) : symbol}
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <button 
            onClick={spin}
            disabled={spinning}
            className={`w-full max-w-sm mx-auto py-6 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all ${
              spinning ? 'bg-purple-900/50 text-purple-700 cursor-not-allowed' : 'secondary-btn hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(168,85,247,0.4)]'
            }`}
          >
            {spinning ? 'Girando...' : 'GIRAR (R$ 5,00)'}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-muted text-xs">
            <Trophy size={14} className="text-amber-500" />
            <span>Tabela de Prêmios: <strong>3x 🦒 = R$ 100</strong> | <strong>3x 💎 = R$ 20</strong> | <strong>3x 7 = R$ 7</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">🍀</div>
          <div className="text-left">
            <p className="text-xs text-muted uppercase font-bold tracking-tighter">Probabilidade</p>
            <p className="text-sm font-bold">Justa e Aleatória</p>
          </div>
        </div>
        <div className="glass-card p-6 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">💰</div>
          <div className="text-left">
            <p className="text-xs text-muted uppercase font-bold tracking-tighter">Custo por Giro</p>
            <p className="text-sm font-bold">R$ 5,00 fixos</p>
          </div>
        </div>
        <div className="glass-card p-6 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">🦒</div>
          <div className="text-left">
            <p className="text-xs text-muted uppercase font-bold tracking-tighter">Prêmio Máximo</p>
            <p className="text-sm font-bold text-amber-500">R$ 100,00 Instantâneos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reportsSubTab, setReportsSubTab] = useState('all'); // all, deposits, withdrawals
  
  // Data States
  const [availableInvestments, setAvailableInvestments] = useState([]);
  const [myInvestments, setMyInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [adminData, setAdminData] = useState({ profiles: [], loans: [], allInvestments: [], allTransactions: [], allInstallments: [], allDocuments: [] });
  const [userDocuments, setUserDocuments] = useState([]);
  const [referralLink, setReferralLink] = useState('');
  
  // Modal & Form States
  const [modalType, setModalType] = useState(null);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [pixAmount, setPixAmount] = useState('');
  const [pixRecipient, setPixRecipient] = useState('');
  const [pixStatus, setPixStatus] = useState('idle');
  const [installments, setInstallments] = useState([]);

  // Hooks de Cálculo
  const calculateProgress = React.useCallback((investedAt, validity) => {
    if (!investedAt) return 0;
    const start = new Date(investedAt).getTime();
    const now = new Date().getTime();
    const duration = Number(validity) * 24 * 60 * 60 * 1000;
    const progress = ((now - start) / duration) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(1);
  }, []);

  const calculateAccruedEarnings = React.useCallback((inv) => {
    if (!inv) return 0;
    const progress = Number(calculateProgress(inv.invested_at, inv.validity)) / 100;
    const totalPotentialProfit = Number(inv.final_amount ?? 0) - Number(inv.invested_amount ?? 0);
    return totalPotentialProfit * progress;
  }, [calculateProgress]);

  const totalEarnings = React.useMemo(() => {
    if (!myInvestments) return 0;
    return myInvestments.reduce((acc, inv) => acc + calculateAccruedEarnings(inv), 0);
  }, [myInvestments, calculateAccruedEarnings]);

  useEffect(() => {
    console.log('>>> GIRAFA TECH V2.1.0-INVEST-ONLY LOADED <<<');
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (sess) {
        setSession(sess);
        setUser(sess.user);
        if (sess?.user?.email) {
          const userMail = sess.user.email.toLowerCase();
          console.log('Login Detectado:', userMail);
          const isUserAdmin = ['admin@girafatech.com', 'abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com'].includes(userMail);
          console.log('Is Admin:', isUserAdmin);
          setIsAdmin(isUserAdmin);
          fetchUserData(sess.user.id, sess.user);
          
          // Trigger lazy auto-liquidation of loans if admin or user loads
          supabase.rpc('process_loan_liquidation').then(({data, error}) => {
             if (data?.processed > 0) console.log('Liquidação Automática Realizada:', data);
          });
        }
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
      console.log('Auth Event:', event, sess?.user?.id);
      
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        setAvailableInvestments([]);
        setMyInvestments([]);
        setUserDocuments([]);
        setLoading(false);
        return;
      }

      if (sess?.user?.id !== user?.id) {
        setSession(sess);
        setUser(sess?.user ?? null);
        if (sess) {
          const email = sess.user.email?.toLowerCase();
          setIsAdmin(
            email === 'admin@girafatech.com' || 
            email === 'abel@girafatech.com' || 
            email === 'abel.souza.magalhaes@hotmail.com'
          );
          fetchUserData(sess.user.id, sess.user);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    });

    // Catch Referral
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) localStorage.setItem('girafa_ref', ref);

    return () => subscription.unsubscribe();
  }, []);

  const handleAdminLiquidateInstallment = async (instId, userId, instAmount) => {
    try {
      // 1. Get current balance from profile directly (fresher than adminData)
      let { data: prof, error: profErr } = await supabase.from('profiles').select('balance').eq('id', userId).single();
      if (profErr) throw new Error('Erro ao buscar saldo: ' + profErr.message);
      
      let currentBalance = Number(prof.balance || 0);

      // 2. If balance < installment amount, liquidate investments
      if (currentBalance < instAmount) {
        // Find user's active investments
        const { data: userInvs } = await supabase.from('user_investments').select('*').eq('user_id', userId);
        
        if (userInvs && userInvs.length > 0) {
          for (const inv of userInvs) {
            if (currentBalance >= instAmount) break;
            
            const progress = calculateProgress(inv.invested_at, inv.validity);
            const accrued = calculateAccruedEarnings(inv);
            const principal = Number(inv.invested_amount);
            const valToLiq = principal + accrued;
            
            // Liquidate via RPC
            const { data: nBal, error: liqErr } = await supabase.rpc('handle_balance_change', {
              user_id_param: userId,
              amount_param: valToLiq,
              type_param: 'Lucro',
              desc_param: `Liquidação Forçada p/ Quitação (#${inv.active_id.slice(0,8)})`
            });
            
            if (!liqErr) {
              currentBalance = Number(nBal);
              await supabase.from('user_investments').delete().eq('active_id', inv.active_id);
            }
          }
        }
      }

      // 3. Try to pay the installment
      if (currentBalance >= instAmount) {
        const { data: finalBal, error: payErr } = await supabase.rpc('handle_balance_change', {
          user_id_param: userId,
          amount_param: -instAmount,
          type_param: 'Pagamento',
          desc_param: `Quitação Admin Carnê #${String(instId).slice(0,8)}`
        });
        
        if (!payErr) {
          await supabase.from('loan_installments').update({ status: 'Pago', paid_at: new Date().toISOString() }).eq('id', instId);
          showNotification('Parcela liquidada com sucesso!');
        } else {
          showNotification(`Erro no pagamento: ${payErr.message}`, 'error');
        }
      } else {
        showNotification(`Saldo insuficiente (R$ ${currentBalance}) mesmo após tentativas.`, 'error');
      }
      
      fetchUserData(user.id);
    } catch (err) {
      console.error('Liquidation error:', err);
      showNotification(err.message || 'Erro interno na liquidação.', 'error');
    }
  };

  const fetchUserData = async (userId, currentUser) => {
    setLoading(true);
    try {
      // Fetch Profile (Tolerant to missing profile from bugged registrations)
      let { data: prof, error: profErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (!prof && !profErr) {
        console.log('Perfil não encontrado. Realizando auto-cura...');
        const { data: newProf, error: upsertErr } = await supabase
          .from('profiles')
          .upsert({ 
            id: userId, 
            full_name: user?.user_metadata?.full_name || 'Investidor Girafa'
            // O balance não é passado aqui para não resetar o saldo existente (usa o DEFAULT do BD se for novo)
          })
          .select()
          .single();
        if (!upsertErr) prof = newProf;
      }

      if (profErr) console.warn('Aviso: Erro ao buscar perfil.', profErr);
      setProfile(prof || { full_name: user?.user_metadata?.full_name || 'Investidor Girafa', balance: 0 });

      // Fetch Investment Options
      const { data: opts, error: optsErr } = await supabase
        .from('investment_options')
        .select('*')
        .order('is_active', { ascending: false });
      
      if (optsErr) throw optsErr;
      
      // Filtra e ordena: Daily Deals primeiro, depois por prazo
      const sortedInvs = opts
        .filter(o => o.is_active !== false)
        .sort((a, b) => {
          if (Boolean(a.is_daily_deal) && !Boolean(b.is_daily_deal)) return -1;
          if (!Boolean(a.is_daily_deal) && Boolean(b.is_daily_deal)) return 1;
          return Number(a.validity) - Number(b.validity);
        });
      
      setAvailableInvestments(sortedInvs);

      // Fetch User Investments
      const { data: userInvs, error: userInvErr } = await supabase
        .from('user_investments')
        .select('*')
        .eq('user_id', userId);
      
      if (userInvErr) throw userInvErr;
      setMyInvestments(userInvs);

      // Fetch User Transactions
      const { data: userTrans } = await supabase.from('transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setTransactions(userTrans || []);

      setReferralLink(`${window.location.origin}/?ref=${userId}`);

      // Fetch User Installments (Carnê)
      const { data: instData } = await supabase
        .from('loan_installments')
        .select('*')
        .eq('user_id', userId)
        .order('due_date', { ascending: true });
      setInstallments(instData || []);

      // Fetch User Documents
      const { data: userDocs } = await supabase.from('user_documents').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      setUserDocuments(userDocs || []);

      // Fetch Global Admin Data
      const adminEmails = ['admin@girafatech.com', 'abel@girafatech.com', 'abel.souza.magalhaes@hotmail.com', 'asmagsasp@gmail.com'];
      const userToVerify = currentUser || user;
      const userMailStr = userToVerify?.email?.toLowerCase() || '';
      const isUserAdmin = adminEmails.includes(userMailStr);

      if (isUserAdmin) {
        const { data: allP } = await supabase.from('profiles').select('*');
        const { data: allL } = await supabase.from('loans').select('*').order('created_at', { ascending: false });
        const { data: allI } = await supabase.from('investment_options').select('*');
        const { data: allT } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
        const { data: allInst } = await supabase.from('loan_installments').select('*').order('due_date', { ascending: true });
        const { data: allD } = await supabase.from('user_documents').select('*').order('created_at', { ascending: false });
        
        setAdminData({ 
          profiles: allP || [], 
          loans: allL || [], 
          allInvestments: allI || [], 
          allTransactions: allT || [],
          allInstallments: allInst || [],
          allDocuments: allD || []
        });
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      showNotification('Erro ao carregar dados do servidor.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      id: user.id,
      full_name: String(formData.get('full_name')),
      pix_key: String(formData.get('pix_key'))
    };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', String(user.id));
    
    if (error) {
      console.error('CRITICAL PROFILE ERROR:', error);
      showNotification('Erro ao atualizar perfil.', 'error');
    } else {
      setProfile({ ...profile, ...updates });
      showNotification('Perfil atualizado com sucesso!');
      setModalType(null);
    }
  };

  const handleUploadDocument = async (docType, file) => {
    if (!docType || !file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showNotification('Tipo de arquivo não suportado. Use PDF, JPEG ou PNG.', 'error');
      return;
    }

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${docType}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('user-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('user-documents')
        .getPublicUrl(filePath);

      // Insert or Update the document record
      const { error: dbError } = await supabase
        .from('user_documents')
        .insert([{
          user_id: user.id,
          doc_type: docType,
          file_url: publicUrl,
          status: 'Pendente'
        }]);

      if (dbError) throw dbError;

      showNotification('Documento enviado com sucesso! Aguarde a verificação.');
      fetchUserData(user.id);
    } catch (err) {
      console.error('Upload Error:', err);
      showNotification('Erro ao enviar documento.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentAction = async (docId, status, reason = '') => {
    try {
      const { error } = await supabase
        .from('user_documents')
        .update({ status, rejection_reason: reason, updated_at: new Date().toISOString() })
        .eq('id', docId);

      if (error) throw error;
      showNotification(`Documento ${status === 'Aprovado' ? 'aprovado' : 'rejeitado'}!`);
      // Update global admin data
      fetchUserData(user.id);
    } catch (err) {
      console.error('Doc Action Error:', err);
      showNotification('Erro ao atualizar documento.', 'error');
    }
  };

  const handleCreateInvestment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const minVal = Number(formData.get('minAmount'));
    const maxVal = Number(formData.get('maxAmount'));
    
    const isDaily = formData.get('isDailyDeal') === 'on';
    const invData = {
      validity: Number(formData.get('validity')),
      cost: minVal, 
      min_amount: minVal,
      max_amount: maxVal,
      fee: 5,
      yield_percent: Number(formData.get('yieldPercent')),
      final_amount: 0, 
      is_active: true,
      created_by: user.id,
      is_daily_deal: isDaily,
      deal_start_at: isDaily ? formData.get('dealStart') : null,
      deal_end_at: isDaily ? formData.get('dealEnd') : null
    };

    if (editingInvestment) {
      const { error } = await supabase
        .from('investment_options')
        .update(invData)
        .eq('id', editingInvestment.id);
      
      if (error) showNotification('Erro ao atualizar investimento.', 'error');
      else {
        const updatedArr = availableInvestments.map(inv => inv.id === editingInvestment.id ? { ...inv, ...invData } : inv);
        setAvailableInvestments(updatedArr.sort((a, b) => a.validity - b.validity));
        showNotification('Investimento atualizado!');
        setEditingInvestment(null);
      }
    } else {
      const { data, error } = await supabase
        .from('investment_options')
        .insert([invData])
        .select()
        .single();
      
      if (error) showNotification('Erro ao criar investimento.', 'error');
      else {
        const newArr = [data, ...availableInvestments];
        setAvailableInvestments(newArr.sort((a, b) => a.validity - b.validity));
        showNotification('Investimento criado!');
      }
    }
    e.target.reset();
  };

  const handleDeleteInvestment = async (id) => {
    if (window.confirm('Arquivar este plano de investimento? Ele não será mais exibido para novos aportes.')) {
      const { error } = await supabase.from('investment_options').update({ is_active: false }).eq('id', id);
      if (error) {
        showNotification('Erro ao remover: ' + error.message, 'error');
      } else {
        setAvailableInvestments(prev => prev.filter(inv => inv.id !== id));
        showNotification('Investimento removido com sucesso.');
      }
    }
  };

  const handleSacar = async (inv) => {
    if (!profile?.pix_key) {
      showNotification('Por favor, cadastre uma chave Pix no perfil para sacar!', 'error');
      setModalType('profile');
      return;
    }

    try {
      const accrued = Number(calculateAccruedEarnings(inv));
      const progress = Number(calculateProgress(inv.invested_at, inv.validity));
      const isEndReached = progress >= 100;

      setPixStatus('checking');

      // Decide payout based on progress
      const principal = Number(inv.invested_amount) || 0;
      const amountToWithdraw = isEndReached ? (principal + accrued) : accrued;

      // 1.5 Liquidar investimento para o saldo (Tornar o saldo disponível internamente)
      const { data: newBalAfterLiq, error: liqErr } = await supabase.rpc('handle_balance_change', {
        user_id_param: user.id,
        amount_param: amountToWithdraw,
        type_param: 'Lucro',
        desc_param: `Liquidação de Ativo #${inv.active_id.slice(0, 8)}`
      });

      if (liqErr) {
        console.error('Erro na liquidação:', liqErr);
        showNotification('Erro ao liquidar lucro para o saldo.', 'error');
        setPixStatus('idle');
        return;
      }

      // Calculate 5% fee for the manual payout record
      const fee = amountToWithdraw * 0.05;
      const finalPayout = amountToWithdraw - fee;

      // 2. Registrar o Saque no Relatório (Sem chamada RecargaPay agora)
      const { data: finalBal, error: withdrawErr } = await supabase.rpc('handle_balance_change', {
        user_id_param: user.id,
        amount_param: -finalPayout,
        type_param: 'Saque',
        desc_param: `Saque Manual (RecargaPay: 09551040848) para: ${profile.pix_key || 'Chave não cadastrada'}`
      });

      if (withdrawErr) {
        console.error('Erro no registro do saque:', withdrawErr);
        showNotification('Erro ao registrar solicitação de saque.', 'error');
        setPixStatus('idle');
        setProfile(prev => ({ ...prev, balance: Number(newBalAfterLiq) }));
      } else {
        // Sucesso no Registro!
        if (isEndReached) {
          await supabase.from('user_investments').delete().eq('active_id', inv.active_id);
          setMyInvestments(prev => prev.filter(i => i.active_id !== inv.active_id));
        }
        
        setProfile(prev => ({ ...prev, balance: Number(finalBal) }));
        setPixStatus('confirmed');
        showNotification(`Solicitação de saque de R$ ${finalPayout.toFixed(2)} registrado! Nossa equipe realizará o Pix em breve.`);
        
        setTimeout(() => {
          setModalType(null);
          setPixStatus('idle');
        }, 3000);
      }
    } catch (err) {
      console.error('Erro fatal no saque:', err);
      showNotification('Conexão instável. Tente novamente em instantes.', 'error');
      setPixStatus('idle');
    }
  };

  const handleWithdrawBalance = async () => {
    if (!profile?.pix_key) {
      showNotification('Cadastre uma chave Pix no perfil para sacar!', 'error');
      setModalType('profile');
      return;
    }

    const amount = Number(pixAmount);
    if (!amount || amount <= 0) {
      showNotification('Digite um valor válido para saque.', 'error');
      return;
    }

    if (amount > profile.balance) {
      showNotification('Saldo insuficiente!', 'error');
      return;
    }

    setPixStatus('checking');
    try {
      // 1. Registro Manual via RPC
      const { data: newBal, error: rpcErr } = await supabase.rpc('handle_balance_change', {
        user_id_param: user.id,
        amount_param: -amount,
        type_param: 'Saque',
        desc_param: `Saque Balance (RecargaPay: 09551040848) para: ${profile.pix_key}`
      });

      if (rpcErr) {
        showNotification('Erro ao registrar saque: ' + rpcErr.message, 'error');
        setPixStatus('idle');
      } else {
        setProfile(prev => ({ ...prev, balance: Number(newBal) }));
        setPixStatus('confirmed');
        showNotification(`Saque de R$ ${amount.toFixed(2)} enviado para processamento manual!`);
        setTimeout(() => {
          setModalType(null);
          setPixStatus('idle');
          setPixAmount('');
        }, 3000);
      }
    } catch (err) {
      console.error('Withdraw balance error:', err);
      showNotification('Erro interno no saque.', 'error');
      setPixStatus('idle');
    }
  };

  const handleInvest = async () => {
    const amount = Number(investAmount);
    
    const min = selectedInvestment.min_amount || selectedInvestment.cost || 0;
    const max = selectedInvestment.max_amount || 999999;
    
    if (!amount || amount < min) {
      showNotification(`O valor mínimo é R$ ${min.toLocaleString()}`, 'error');
      return;
    }
    if (amount > max) {
      showNotification(`O valor máximo permitido é R$ ${max.toLocaleString()}`, 'error');
      return;
    }
    if (profile.balance < amount) {
      showNotification('Saldo insuficiente!', 'error');
      return;
    }
    
    const { data: newBal, error: balErr } = await supabase.rpc('handle_balance_change', { 
      user_id_param: user.id, 
      amount_param: -amount,
      type_param: 'Investimento',
      desc_param: `Aporte no ${selectedInvestment.is_daily_deal ? 'Oportunidade do Dia' : 'Projeto'}`
    });
    
    if (balErr) return showNotification('Erro na transação: ' + balErr.message, 'error');

    const newActiveInv = {
      user_id: user.id,
      option_id: selectedInvestment.id,
      invested_amount: amount,
      validity: selectedInvestment.validity,
      yield_percent: selectedInvestment.yield_percent,
      final_amount: amount * (1 + (selectedInvestment.yield_percent / 100)),
      status: 'Ativo'
    };

    const { data, error } = await supabase.from('user_investments').insert([newActiveInv]).select().single();
    if (error) {
      // Reverter saldo em caso de erro no registro do investimento (opcional, mas seguro)
      await supabase.rpc('handle_balance_change', { 
        user_id_param: user.id, 
        amount_param: amount,
        type_param: 'Refundo',
        desc_param: 'Erro ao registrar investimento'
      });
      showNotification('Erro ao registrar investimento.', 'error');
    } else {
      setProfile(prev => ({ ...prev, balance: Number(newBal) }));
      setMyInvestments(prev => [data, ...prev]);
      showNotification('Investimento realizado!');
      setModalType(null);
    }
  };

  const handleDeleteMyInvestment = async (activeId) => {
    if (window.confirm('Cancelar este investimento? O capital retornará ao saldo.')) {
      const inv = myInvestments.find(i => i.active_id === activeId);
      const { data: newBal, error: rpcErr } = await supabase.rpc('handle_balance_change', { 
        user_id_param: user.id, 
        amount_param: Number(inv.invested_amount),
        type_param: 'Estorno',
        desc_param: 'Cancelamento de Investimento'
      });
      const { error: delErr } = await supabase.from('user_investments').delete().eq('active_id', activeId);
      
      if (rpcErr || delErr) showNotification('Erro ao processar cancelamento.', 'error');
      else {
        setProfile(prev => ({ ...prev, balance: Number(newBal) }));
        setMyInvestments(prev => prev.filter(i => i.active_id !== activeId));
        showNotification('Investimento cancelado e saldo estornado!');
      }
    }
  };

  const handleReceivePix = async () => {
    if (!user) return showNotification('Sessão expirada. Refaça o login.', 'error');
    setPixStatus('checking');
    
    try {
      const extra = Number(pixAmount) || 0;
      if (extra <= 0) {
        showNotification('Digite um valor válido para depositar.', 'error');
        setPixStatus('idle');
        return;
      }

      // Pequeno delay para simular a verificação da rede Pix
      setTimeout(async () => {
        try {
          const { data: newBal, error: rpcErr } = await supabase
            .rpc('handle_balance_change', { 
              user_id_param: user.id, 
              amount_param: extra,
              type_param: 'Depósito',
              desc_param: 'Depósito PIX Cloud'
            });
          
          if (rpcErr) {
            console.error('ERRO FATAL DE PERSISTÊNCIA:', rpcErr);
            alert('ERRO DE BANCO DE DADOS: O saldo não pôde ser salvo permanentemente.');
            showNotification('Erro ao salvar no banco!', 'error');
            setPixStatus('idle');
          } else {
            setProfile(prev => ({ ...prev, balance: Number(newBal) }));
            
            // Garantir que os dados mais recentes do servidor sejam carregados (Consistencia Total)
            fetchUserData(user.id);
            
            // Affiliate Bonus (5% deposit matches)
            if (profile?.referred_by) {
               try {
                 const bonus = extra * 0.05;
                  await supabase.rpc('handle_balance_change', {
                    user_id_param: profile.referred_by,
                    amount_param: bonus,
                    type_param: 'Bônus',
                    desc_param: 'Comissão de Afiliado'
                  });
               } catch(e) { console.error('Error adding referral bonus', e); }
            }

            setPixStatus('confirmed');
            showNotification(`Pix de R$ ${extra.toFixed(2)} compensado!`);
            setTimeout(() => { 
              setModalType(null); 
              setPixStatus('idle');
              setPixAmount(''); 
            }, 2000);
          }
        } catch (inner) {
          console.error('CRITICAL PIX ERROR:', inner);
          setPixStatus('idle');
        }
      }, 2000);
    } catch (err) {
      console.error('Error in handleReceivePix:', err);
      setPixStatus('idle');
    }
  };

  const handleRequestLoan = async (amount, installments) => {
    if (!amount || amount <= 0) return showNotification('Valor inválido', 'error');
    const monthly = (amount * Math.pow(1.05, installments)) / installments;
    const total = monthly * installments;
    
    if (amount > 100000) return showNotification('O valor excede seu limite de crédito atual.', 'error');
    
    const { error } = await supabase.from('loans').insert([{
      user_id: user.id,
      amount,
      installments,
      monthly_payment: monthly,
      total_payment: total,
      status: 'Análise'
    }]);
    
    if (error) {
      console.error('Erro Empréstimo', error);
      showNotification('Erro ao solicitar empréstimo!', 'error');
    } else {
      showNotification('Empréstimo solicitado! Nossa equipe analisará em breve.');
      fetchUserData(user.id);
    }
  };

  const handleAdminLoanAction = async (loanId, action, userId, amount) => {
    try {
      if (action === 'Aprovado') {
        await supabase.rpc('handle_balance_change', { 
          user_id_param: userId, 
          amount_param: Number(amount),
          type_param: 'Depósito',
          desc_param: 'Empréstimo Girafa Bank Aprovado'
        });
      }
      await supabase.from('loans').update({ status: action }).eq('id', loanId);
      showNotification(`Empréstimo ${action}!`);
      fetchUserData(user.id);
    } catch(err) {
      console.error('Admin Erro:', err);
      showNotification('Erro interno.', 'error');
    }
  };


  const handlePayInstallment = async (instId) => {
    if (!window.confirm('Deseja liquidar esta parcela usando seu saldo disponível?')) return;
    
    try {
      const { data, error } = await supabase.rpc('pay_loan_installment', {
         installment_id_param: instId
      });
      
      if (error) throw error;
      
      if (data?.success) {
         showNotification(data.message, 'success');
         fetchUserData(user.id);
      } else {
         showNotification(data?.message || 'Erro ao processar pagamento.', 'error');
      }
    } catch (err) {
      console.error('Pay installment error:', err);
      showNotification('Falha na comunicação com o banco.', 'error');
    }
  };
  
  const handleConferTransaction = async (tId) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({ 
          is_conferred: true, 
          conferred_at: new Date().toISOString() 
        })
        .eq('id', tId);
      
      if (error) throw error;
      showNotification('Transação marcada como conferida!', 'success');
      
      // Recarregar dados para refletir o selo de conferência
      if (user) fetchUserData(user.id, user);
    } catch (err) {
      console.error('Erro ao conferir:', err);
      showNotification('Erro ao carimbar transação.', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      setAvailableInvestments([]);
      setMyInvestments([]);
      showNotification('Sessão encerrada com sucesso.');
    } catch (err) {
      console.error('Erro ao sair:', err);
      showNotification('Erro ao encerrar sessão.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLoanAdmin = async (targetUserId, amount, installments, description) => {
    try {
      const monthly = (amount * Math.pow(1.05, installments)) / installments;
      const total = monthly * installments;

      // 1. Create the Loan record
      const { data: loan, error: loanErr } = await supabase.from('loans').insert([{
        user_id: targetUserId,
        amount: Number(amount),
        installments: Number(installments),
        monthly_payment: monthly,
        total_payment: total,
        status: 'Aprovado',
        description: description,
        approved_at: new Date().toISOString()
      }]).select().single();

      if (loanErr) throw loanErr;

      // 2. Generate Installments (Carnê)
      const installmentRecords = [];
      for (let i = 1; i <= installments; i++) {
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + i);
        
        installmentRecords.push({
          loan_id: loan.id,
          user_id: targetUserId,
          installment_number: i,
          amount: monthly,
          due_date: dueDate.toISOString().split('T')[0],
          status: 'Pendente'
        });
      }

      const { error: instErr } = await supabase.from('loan_installments').insert(installmentRecords);
      if (instErr) throw instErr;

      // 3. Add Balance to User (The loan payout)
      await supabase.rpc('handle_balance_change', {
        user_id_param: targetUserId,
        amount_param: Number(amount),
        type_param: 'Depósito',
        desc_param: `Empréstimo Liberado: ${description}`
      });

      showNotification('Empréstimo e Carnê gerados com sucesso!');
      fetchUserData(user.id);
    } catch (err) {
      console.error('Erro ao gerar empréstimo:', err);
      showNotification('Erro ao processar empréstimo admin.', 'error');
    }
  };


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
        <p className="text-muted font-medium outfit uppercase tracking-widest">Girafa Tech Iniciando...</p>
      </div>
    </div>
  );

  // Se o usuário quer ver a landing (ou não está logado e showLanding é true)
  if (showLanding && !session) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} user={user} />;
  }
  
  // Removido o bloco de retorno antecipado da Landing Page para session.
  // Agora a lógica de showLanding será tratada dentro do return principal.

  if (!supabase || !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="max-w-md w-full glass-card p-10 text-center space-y-6 border-red-500/20">
          <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut size={40} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-bold outfit text-white">Configuração Pendente</h1>
          <p className="text-muted leading-relaxed">As credenciais do <strong>Supabase</strong> não foram encontradas no ambiente de execução.</p>
          <div className="text-left bg-white/5 p-4 rounded-xl text-xs space-y-2 opacity-80">
            <p>1. Acesse <strong>Settings &gt; Environment Variables</strong> no seu Vercel.</p>
            <p>2. Adicione <code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code>.</p>
            <p>3. Faça um <strong>Redeploy</strong> para aplicar as mudanças.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) return <AuthView onNotify={showNotification} />;

  if (!session) return <AuthView onNotify={showNotification} />;

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-[10px] font-black uppercase text-center py-1 z-[999] tracking-widest animate-pulse border-b border-black">
         🦒 GIRAFA TECH - SISTEMA OFICIAL [V2.1.0-INVEST-ONLY]
      </div>
      {/* Sidebar */}
      <nav className="sidebar mt-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo.png" alt="Girafa Tech" className="w-12 h-12 rounded-xl object-contain border border-amber-500/30" />
          <div>
            <h1 className="text-xl font-bold gradient-text outfit leading-tight">GIRAFA TECH</h1>
            <span className="text-[10px] text-amber-500 font-bold tracking-widest uppercase opacity-50">v2.1.0-INVEST-ONLY</span>
          </div>
        </div>

        <div className="flex-1">

          <button onClick={() => { setActiveTab('dashboard'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'dashboard' && !showLanding ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Tela Inicial
          </button>
          
          {installments && installments.length > 0 && (
            <button 
              onClick={() => { 
                setActiveTab('dashboard'); 
                setShowLanding(false); 
                setTimeout(() => document.getElementById('meu-carne-section')?.scrollIntoView({ behavior: 'smooth' }), 100); 
              }} 
              className="nav-link w-full border-none cursor-pointer text-left border-blue-500/20 bg-blue-500/5 hover:bg-blue-600 hover:text-white mb-2 text-blue-400 font-bold"
            >
              <Calendar size={20} /> Meu Carnê Girafa
            </button>
          )}

          <button onClick={() => { setActiveTab('reports'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'reports' ? 'active' : ''}`}>
            <RotateCcw size={20} className="text-green-500" /> 
            <span className="flex-1 font-black">Relatórios</span>
            <span className="bg-green-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full">ATIVO</span>
          </button>
          
          {isAdmin && (
            <>
              <button onClick={() => { setActiveTab('admin_dash'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'admin_dash' ? 'active' : ''}`}>
                <Shield size={20} /> Painel Admin
              </button>
              <button onClick={() => { setActiveTab('investments'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'investments' ? 'active' : ''}`}>
                <PlusCircle size={20} /> Criar Investimento
              </button>
            </>
          )}

          {isAdmin && (
            <button onClick={() => { setActiveTab('girafa_bank'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'girafa_bank' ? 'active' : ''}`}>
              <Landmark size={20} /> Gestão de Crédito
            </button>
          )}

          <button onClick={() => { setActiveTab('explore'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'explore' ? 'active' : ''}`}>
            <TrendingUp size={20} /> Oportunidades
          </button>
          <button onClick={() => { setActiveTab('giralucky'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'giralucky' ? 'active' : ''} text-amber-500`}>
            <Dices size={20} /> GiraLucky
          </button>
          <button onClick={() => { setActiveTab('my_investments'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'my_investments' ? 'active' : ''}`}>
            <Wallet size={20} /> Meus Investimentos
          </button>

          <button onClick={() => { setActiveTab('documentacao'); setShowLanding(false); }} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'documentacao' ? 'active' : ''}`}>
            <File size={20} /> Documentacao
          </button>
        </div>

        <div className="space-y-2">
          <button onClick={() => setModalType('profile')} className="nav-link w-full border-none cursor-pointer text-left">
            <User size={20} /> Perfil
          </button>
          <button onClick={handleLogout} className="nav-link w-full border-none cursor-pointer text-left text-red-500 hover:bg-red-500 hover:text-white">
            <LogOut size={20} /> Sair
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/5 text-[8px] text-muted/20 font-mono text-center uppercase tracking-widest">
           v2.1.0-INVEST-ONLY
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {showLanding ? (
           <div className="animate-in -mt-10 -ml-10 -mr-10 h-full" key="landing">
              <LandingPage onGetStarted={() => setShowLanding(false)} user={user} />
           </div>
        ) : (
          <div key="dashboard-shell" className="animate-in">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 animate-in">
          <div>
            <h2 className="text-3xl font-bold outfit mb-1 text-white">
              Olá, {(() => {
                const nameFromDb = profile?.full_name;
                const nameFromMeta = user?.user_metadata?.full_name || user?.user_metadata?.fullName;
                const nameFromEmail = user?.email?.split('@')[0];
                
                // Se o nome do banco for o padrão "Investidor Girafa" ou "Usuário Girafa", tentamos o meta ou email
                const finalName = (nameFromDb && !nameFromDb.includes('Girafa')) 
                  ? nameFromDb 
                  : (nameFromMeta || nameFromEmail || 'Investidor');
                  
                return finalName.split(' ')[0].trim();
              })()}!
            </h2>
            <p className="text-muted">Gestão inteligente do seu capital em nuvem.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0">
            <button onClick={() => { setActiveTab('reports'); setShowLanding(false); }} className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-xs font-bold hover:bg-green-500/20 transition-all flex items-center gap-2">
               <History size={14} /> Ver Extrato
            </button>
            <div className="glass-card px-6 py-4 flex flex-col min-w-[200px] border-amber-500/20">
              <span className="stat-label flex items-center gap-2"><Wallet size={14} className="text-amber-500" /> Disponível para Aplicação</span>
              <span className="stat-value text-amber-400">R$ {(Number(profile?.balance) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="glass-card px-6 py-4 flex flex-col min-w-[200px] border-green-500/20">
              <span className="stat-label flex items-center gap-2"><TrendingUp size={14} className="text-green-500" /> Rendimentos Ativos</span>
              <span className="stat-value text-green-400">R$ {totalEarnings?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div onClick={() => setModalType('pix_receive')} className="glass-card stat-card cursor-pointer border-amber-500/20 hover:border-amber-500/50 group">
                  <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ArrowDownLeft className="text-amber-500" />
                  </div>
                  <h3 className="outfit text-xl mb-1">Depositar</h3>
                  <p className="text-muted text-sm">Adicione saldo na sua carteira Girafa Cloud.</p>
                </div>
                
                <div onClick={() => { setActiveTab('giralucky'); setShowLanding(false); }} className="glass-card stat-card cursor-pointer border-purple-500/20 hover:border-purple-500/50 group">
                  <div className="bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Dices className="text-purple-500" />
                  </div>
                  <h3 className="outfit text-xl mb-1">GiraLucky</h3>
                  <p className="text-muted text-sm">Tente a sorte e dobre seu capital agora!</p>
                </div>

                <div onClick={() => { setModalType('pix_withdraw'); setPixAmount(''); }} className="glass-card stat-card cursor-pointer border-blue-500/20 hover:border-blue-500/50 group">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ArrowLeftRight className="text-blue-500" />
                  </div>
                  <h3 className="outfit text-xl mb-1">Sacar Saldo</h3>
                  <p className="text-muted text-sm">Resgate seu saldo disponível para sua chave Pix.</p>
                </div>

                <div onClick={() => { setActiveTab('reports'); setShowLanding(false); }} className="glass-card stat-card cursor-pointer border-green-500/20 hover:border-green-500/50 group">
                  <div className="bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <History className="text-green-500" />
                  </div>
                  <h3 className="outfit text-xl mb-1">Relatórios</h3>
                  <p className="text-muted text-sm">Acesse seu extrato detalhado de ganhos.</p>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="outfit text-2xl mb-6">Investimentos Disponíveis</h3>
                <div className="grid-cards">
                  {availableInvestments.slice(0, 4).map(inv => (
                    <InvestmentCard 
                      key={inv.id} 
                      investment={inv} 
                      isAdmin={isAdmin}
                      onInvest={() => { setSelectedInvestment(inv); setInvestAmount(inv.min_amount || inv.cost); setModalType('investir'); }} 
                      onEdit={isAdmin ? (() => { setEditingInvestment(inv); setActiveTab('investments'); }) : undefined}
                      onDelete={isAdmin ? (() => handleDeleteInvestment(inv.id)) : undefined}
                    />
                  ))}
                </div>

                {/* Se tiver parcelas, mostrar o Carnê no Dashboard (qualquer usuário, inclusive Admin) */}
                {installments && installments.length > 0 && (
                  <div id="meu-carne-section" className="mt-12 space-y-6 scroll-mt-20">
                     <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                        <h4 className="outfit text-xl">Meu Carnê Girafa Bank</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {installments.map(inst => (
                          <div key={inst.id} className={`p-5 rounded-2xl border ${inst.status === 'Pago' ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/10'}`}>
                             <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] uppercase font-bold text-muted">Parcela {inst.installment_number}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${inst.status === 'Pago' ? 'bg-green-500 text-black' : (new Date(inst.due_date) < new Date() ? 'bg-red-500 text-white' : 'bg-amber-500 text-black')}`}>
                                   {inst.status === 'Pago' ? 'Paga' : (new Date(inst.due_date) < new Date() ? 'Atrasada' : 'Pendente')}
                                </span>
                             </div>
                             <p className="text-xl font-bold mb-1">R$ {Number(inst.amount).toFixed(2)}</p>
                             <p className="text-[10px] text-muted flex items-center gap-1"><Calendar size={10}/> Vence em: {new Date(inst.due_date).toLocaleDateString()}</p>
                             
                             {inst.status !== 'Pago' && (
                               <button 
                                 onClick={() => handlePayInstallment(inst.id)} 
                                 className="mt-4 w-full bg-blue-600/20 text-blue-400 border border-blue-500/30 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white cursor-pointer transition-all"
                               >
                                 Pagar com Saldo
                               </button>
                             )}
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'investments' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
              <div className="glass-card p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="outfit text-2xl flex items-center gap-3">
                    {editingInvestment ? <Pencil className="text-amber-500" /> : <PlusCircle className="text-amber-500" />}
                    {editingInvestment ? 'Editar Investimento' : 'Cadastrar Novo Investimento'}
                  </h3>
                  {editingInvestment && (
                    <button onClick={() => setEditingInvestment(null)} className="btn-outline text-xs py-1">Cancelar Edição</button>
                  )}
                </div>
                <form onSubmit={handleCreateInvestment} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Validade (Dias)</label>
                      <input type="number" name="validity" defaultValue={editingInvestment?.validity || ''} required placeholder="Ex: 30" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm text-muted">Rendimento no Período (%)</label>
                       <input type="number" name="yieldPercent" defaultValue={editingInvestment?.yield_percent || ''} required placeholder="Ex: 15" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Valor Mínimo (R$)</label>
                      <input type="number" name="minAmount" defaultValue={editingInvestment?.min_amount || editingInvestment?.cost || ''} required placeholder="Ex: 50" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Valor Máximo (R$)</label>
                      <input type="number" name="maxAmount" defaultValue={editingInvestment?.max_amount || ''} required placeholder="Ex: 5000" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <input type="checkbox" id="isDailyDeal" name="isDailyDeal" defaultChecked={editingInvestment?.is_daily_deal} className="w-5 h-5 accent-amber-500" />
                    <label htmlFor="isDailyDeal" className="font-bold cursor-pointer">Oportunidade do Dia (Ativar Agendamento)</label>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-sm text-muted">Início da Oferta</label>
                       <input type="datetime-local" name="dealStart" defaultValue={editingInvestment?.deal_start_at ? new Date(editingInvestment.deal_start_at).toISOString().slice(0, 16) : ''} />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-sm text-muted">Fim da Oferta</label>
                       <input type="datetime-local" name="dealEnd" defaultValue={editingInvestment?.deal_end_at ? new Date(editingInvestment.deal_end_at).toISOString().slice(0, 16) : ''} />
                    </div>
                  </div>

                  <button type="submit" className="primary-btn w-full justify-center text-lg mt-4">
                    {editingInvestment ? 'Salvar Alterações' : 'Salvar Investimento'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'explore' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h3 className="outfit text-2xl mb-8">Oportunidades Atuais</h3>
              <div className="grid-cards">
                {availableInvestments.map(inv => (
                  <InvestmentCard 
                    key={inv.id} 
                    investment={inv} 
                    isAdmin={isAdmin}
                    onInvest={() => { setSelectedInvestment(inv); setInvestAmount(inv.min_amount || inv.cost); setModalType('investir'); }} 
                    onEdit={isAdmin ? (() => { setEditingInvestment(inv); setActiveTab('investments'); }) : undefined}
                    onDelete={isAdmin ? (() => handleDeleteInvestment(inv.id)) : undefined}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'my_investments' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h3 className="outfit text-2xl mb-8">Meus Ativos em Nuvem</h3>
              {myInvestments.length === 0 ? (
                <div className="glass-card p-20 text-center">
                  <Wallet className="mx-auto text-muted mb-4" size={48} />
                  <p className="text-muted">Você ainda não possui investimentos ativos.</p>
                  <button onClick={() => setActiveTab('explore')} className="btn-outline mt-6">Explorar Oportunidades</button>
                </div>
              ) : (
                <div className="grid-cards">
                  {myInvestments.map(inv => {
                    const progress = calculateProgress(inv.invested_at, inv.validity);
                    return (
                      <div key={inv.active_id} className="glass-card p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 bg-green-500/20 text-green-400 text-xs font-bold rounded-bl-xl uppercase tracking-tighter">Ativo</div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="bg-amber-500/20 p-3 rounded-lg"><TrendingUp className="text-amber-500" /></div>
                          <button onClick={() => handleDeleteMyInvestment(inv.active_id)} className="bg-red-500/10 p-2 rounded-lg text-red-500 hover:bg-red-500/20 border-none cursor-pointer">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="space-y-3 mb-8">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted">Aplicação</span>
                            <span className="font-bold">{new Date(inv.invested_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted">Resgate</span>
                            <span className="text-amber-400 font-bold">
                              {(() => {
                                const d = new Date(inv.invested_at);
                                d.setDate(d.getDate() + inv.validity);
                                return d.toLocaleDateString();
                              })()}
                            </span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
                            <div className="bg-amber-500 h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="text-[10px] text-muted text-right">Progresso: {progress}%</p>
                        </div>
                        <button onClick={() => { setSelectedInvestment(inv); setModalType('sacar'); }} className="btn-outline w-full hover:bg-amber-500 hover:text-black">Sacar agora</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'documentacao' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="outfit text-3xl font-bold mb-2">Central de Verificação e KYC</h3>
                  <p className="text-muted text-sm max-w-xl">Mantenha seus documentos atualizados para garantir a segurança da sua conta e agilizar seus saques.</p>
                </div>
                {isAdmin && (
                  <div className="flex gap-2 bg-amber-500/10 p-1 rounded-xl border border-amber-500/20">
                    <span className="flex items-center gap-2 px-4 py-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
                      <Shield size={16} /> Modo Administrador
                    </span>
                  </div>
                )}
              </header>

              {isAdmin ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 border-amber-500/20">
                      <p className="text-[10px] text-muted uppercase font-bold mb-1 tracking-widest text-amber-400">Pendentes</p>
                      <p className="text-3xl font-bold">{adminData.allDocuments.filter(d => d.status === 'Pendente').length}</p>
                    </div>
                    <div className="glass-card p-6 border-green-500/10">
                      <p className="text-[10px] text-muted uppercase font-bold mb-1 tracking-widest text-green-400">Aprovados</p>
                      <p className="text-3xl font-bold">{adminData.allDocuments.filter(d => d.status === 'Aprovado').length}</p>
                    </div>
                    <div className="glass-card p-6 border-red-500/10">
                      <p className="text-[10px] text-muted uppercase font-bold mb-1 tracking-widest text-red-500">Rejeitados</p>
                      <p className="text-3xl font-bold">{adminData.allDocuments.filter(d => d.status === 'Rejeitado').length}</p>
                    </div>
                  </div>

                  <div className="glass-card overflow-hidden">
                    <table className="w-full text-left border-separate border-spacing-0">
                      <thead className="bg-white/[0.03] text-muted uppercase text-[10px] font-bold tracking-widest">
                        <tr>
                          <th className="py-4 px-6 border-b border-white/5">Data</th>
                          <th className="py-4 px-6 border-b border-white/5">Cliente</th>
                          <th className="py-4 px-6 border-b border-white/5">Tipo</th>
                          <th className="py-4 px-6 border-b border-white/5">Status</th>
                          <th className="py-4 px-6 border-b border-white/5 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {adminData.allDocuments.length === 0 ? (
                          <tr><td colSpan="5" className="py-20 text-center text-muted italic">Nenhum documento encontrado.</td></tr>
                        ) : (
                          adminData.allDocuments.map(doc => {
                            const u = adminData.profiles.find(p => p.id === doc.user_id);
                            return (
                              <tr key={doc.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 px-6">{new Date(doc.created_at).toLocaleDateString()}</td>
                                <td className="py-4 px-6">
                                  <div className="font-bold text-white">{u?.full_name || 'Desconhecido'}</div>
                                  <div className="text-[10px] text-muted italic opacity-50">{doc.user_id.slice(0,8)}</div>
                                </td>
                                <td className="py-4 px-6">
                                  <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[9px] font-black uppercase text-blue-400 italic font-mono">
                                    {doc.doc_type.replace('_',' ')}
                                  </span>
                                </td>
                                <td className="py-4 px-6">
                                  <span className={`px-2 py-1 rounded text-[9px] font-black uppercase border ${
                                    doc.status === 'Aprovado' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                    doc.status === 'Rejeitado' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                  }`}>
                                    {doc.status}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-right space-x-2">
                                  <a href={doc.file_url} target="_blank" rel="noreferrer" className="bg-blue-500/10 text-blue-400 p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all inline-block">
                                    <Eye size={16} />
                                  </a>
                                  {doc.status === 'Pendente' && (
                                    <>
                                      <button onClick={() => handleDocumentAction(doc.id, 'Aprovado')} className="bg-green-500/10 text-green-400 p-2 rounded-lg hover:bg-green-500 hover:text-white transition-all border-none cursor-pointer">
                                        <CheckCircle2 size={16} />
                                      </button>
                                      <button onClick={() => {
                                        const reason = window.prompt("Motivo da rejeição:");
                                        if (reason) handleDocumentAction(doc.id, 'Rejeitado', reason);
                                      }} className="bg-red-500/10 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all border-none cursor-pointer">
                                        <X size={16} />
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { key: 'RG_FRENTE', label: 'RG / CNH (Frente)', desc: 'Foto nítida da parte frontal do seu documento de identidade.' },
                    { key: 'RG_VERSO', label: 'RG (Verso)', desc: 'Foto nítida da parte traseira do seu RG (ou verso da CNH se separado).' },
                    { key: 'SELFIE', label: 'Selfie com Documento', desc: 'Uma foto sua segurando o documento ao lado do rosto.' },
                    { key: 'COMPROVANTE_ENDERECO', label: 'Comprovante de Endereço', desc: 'Conta de luz, água ou banco com no máximo 90 dias.' },
                  ].map(type => {
                    const doc = userDocuments.find(d => d.doc_type === type.key);
                    return (
                      <div key={type.key} className={`glass-card p-6 flex flex-col justify-between border-dashed border-2 ${
                        doc?.status === 'Aprovado' ? 'border-green-500/30 bg-green-500/[0.02]' :
                        doc?.status === 'Rejeitado' ? 'border-red-500/30 bg-red-500/[0.02]' :
                        'border-white/10'
                      }`}>
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${
                              doc?.status === 'Aprovado' ? 'bg-green-500/20 text-green-400' :
                              doc?.status === 'Rejeitado' ? 'bg-red-500/20 text-red-400' :
                              'bg-white/5 text-muted'
                            }`}>
                              <File size={24} />
                            </div>
                            {doc && (
                              <span className={`text-[9px] font-black uppercase px-2 py-1 rounded border ${
                                doc.status === 'Aprovado' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                doc.status === 'Rejeitado' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              }`}>
                                {doc.status}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-lg mb-2">{type.label}</h4>
                          <p className="text-xs text-muted leading-relaxed mb-6">{type.desc}</p>
                          {doc?.status === 'Rejeitado' && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                              <p className="text-[10px] text-red-400 font-bold uppercase mb-1">Motivo da Rejeição:</p>
                              <p className="text-xs italic text-white/80">{doc.rejection_reason}</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5">
                          {doc?.status === 'Aprovado' ? (
                            <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase bg-green-500/10 p-4 rounded-xl justify-center border border-green-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                              <CheckCircle2 size={16} /> Verificado
                            </div>
                          ) : (
                            <div className="relative group/btn w-full overflow-hidden rounded-xl">
                              <input 
                                type="file" 
                                accept="image/*,application/pdf"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                onChange={(e) => handleUploadDocument(type.key, e.target.files[0])}
                              />
                              <button className={`w-full font-black text-[10px] uppercase py-4 px-2 rounded-xl flex items-center justify-center gap-2 transition-all relative z-10 ${
                                doc?.status === 'Pendente' ? 'bg-amber-500/20 text-amber-500 pointer-events-none' : 'bg-primary text-black hover:scale-[1.02] shadow-[0_4px_15px_rgba(251,191,36,0.2)]'
                              }`}>
                                {doc?.status === 'Pendente' ? (
                                  <> <Clock size={16} className="animate-pulse" /> Em Análise... </>
                                ) : (
                                  <> <ArrowUpRight size={16} /> {doc?.status === 'Rejeitado' ? 'REENVIAR AGORA' : 'ESCOLHER ARQUIVO'} </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              {(() => {
                const targetTransactions = isAdmin ? adminData.allTransactions : transactions;
                return (
                  <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 border-amber-500/10">
                   <p className="text-[10px] text-muted uppercase font-bold mb-1">Total Depositado</p>
                   <p className="text-xl font-bold text-amber-500">R$ {targetTransactions.filter(t => t.type === 'Depósito').reduce((acc, t) => acc + Number(t.amount), 0).toFixed(2)}</p>
                </div>
                <div className="glass-card p-4 border-red-500/10">
                   <p className="text-[10px] text-muted uppercase font-bold mb-1">Total Sacado</p>
                   <p className="text-xl font-bold text-red-400">R$ {targetTransactions.filter(t => t.type === 'Saque').reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0).toFixed(2)}</p>
                </div>
                <div className="glass-card p-4 border-green-500/10">
                   <p className="text-[10px] text-muted uppercase font-bold mb-1">Total Lucros</p>
                   <p className="text-xl font-bold text-green-400">R$ {targetTransactions.filter(t => t.type === 'Lucro' || t.type === 'Bônus').reduce((acc, t) => acc + Number(t.amount), 0).toFixed(2)}</p>
                </div>
                <div className="glass-card p-4 border-blue-500/10">
                   <p className="text-[10px] text-muted uppercase font-bold mb-1">Movimentações</p>
                   <p className="text-xl font-bold text-blue-400">{targetTransactions.length}</p>
                </div>
              </div>

              <div className="glass-card p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="space-y-1">
                      <h3 className="outfit text-2xl">Gestão de Inteligência Financeira</h3>
                      <p className="text-[10px] text-muted uppercase tracking-[0.2em]">Conciliação Bancária / Contrapartida Girafa vs RecargaPay</p>
                   </div>
                   <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                      <button onClick={() => setReportsSubTab('all')} className={`text-[10px] py-2 px-4 rounded-lg font-bold uppercase tracking-tighter transition-all ${reportsSubTab === 'all' ? 'bg-amber-500 text-black' : 'text-muted hover:text-white'}`}>Tudo</button>
                      <button onClick={() => setReportsSubTab('deposits')} className={`text-[10px] py-2 px-4 rounded-lg font-bold uppercase tracking-tighter transition-all ${reportsSubTab === 'deposits' ? 'bg-green-500/20 text-green-400' : 'text-muted hover:text-white'}`}>Depósitos (Entrada)</button>
                      <button onClick={() => setReportsSubTab('withdrawals')} className={`text-[10px] py-2 px-4 rounded-lg font-bold uppercase tracking-tighter transition-all ${reportsSubTab === 'withdrawals' ? 'bg-red-500/20 text-red-400' : 'text-muted hover:text-white'}`}>Saques (Saída)</button>
                   </div>
                </header>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-muted text-[10px] uppercase bg-white/[0.02]">
                        <th className="py-4 px-4 font-medium">Data & Hora</th>
                        {isAdmin && <th className="py-4 px-4 font-black text-amber-500">Dono (Cliente)</th>}
                        {isAdmin && <th className="py-4 px-4 font-black text-blue-400">Chave Pix de Destino</th>}
                        <th className="py-4 px-4 font-medium">Tipo</th>
                        <th className="py-4 px-4 font-medium">Descrição / Origem-Destino</th>
                        <th className="py-4 px-4 font-medium text-right">Valor (R$)</th>
                        {isAdmin && <th className="py-4 px-4 font-medium text-center">Ação</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        let filtered = targetTransactions;
                        if (reportsSubTab === 'deposits') filtered = filtered.filter(t => t.type === 'Depósito');
                        if (reportsSubTab === 'withdrawals') filtered = filtered.filter(t => t.type === 'Saque');

                        if (filtered.length === 0) {
                          return <tr><td colSpan={isAdmin ? "7" : "4"} className="py-12 text-center text-muted">Nenhum registro encontrado nesta categoria.</td></tr>;
                        }

                        return filtered.map(t => {
                        const tUser = isAdmin ? adminData.profiles.find(p => p.id === t.user_id) : null;
                        const isConferred = t.is_conferred;

                        return (
                        <tr key={t.id} className={`border-b border-white/5 hover:bg-white/[0.01] transition-colors group ${isConferred ? 'opacity-40 grayscale-[0.5]' : ''}`}>
                          <td className="py-5 px-4 text-xs text-muted group-hover:text-white transition-colors">
                             <div className="flex items-center gap-2">
                                <Clock size={12} className="opacity-50" />
                                {new Date(t.created_at).toLocaleString('pt-BR')}
                             </div>
                             {isConferred && <p className="text-[8px] text-green-500 font-bold uppercase mt-1">✓ Conferido</p>}
                          </td>
                          {isAdmin && (
                            <td className="py-5 px-4 text-xs font-bold text-amber-500">
                               {tUser?.full_name || 'Desconhecido'}
                            </td>
                          )}
                          {isAdmin && (
                            <td className="py-5 px-4 text-[10px] font-mono opacity-50">
                               {tUser?.pix_key || '-'}
                               <p className="text-[8px] text-muted italic">Origem: RecargaPay/Girafa</p>
                            </td>
                          )}
                          <td className="py-5 px-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] uppercase font-black tracking-widest ${
                              t.type === 'Depósito' ? 'bg-amber-500/10 text-amber-500' : 
                              t.type === 'Saque' ? 'bg-red-500/10 text-red-500' : 
                              t.type === 'Lucro' ? 'bg-green-500/10 text-green-500' :
                              t.type === 'Bônus' ? 'bg-purple-500/10 text-purple-500' : 
                              'bg-white/10 text-muted'
                            }`}>
                              {t.type}
                            </span>
                          </td>
                          <td className="py-5 px-4 text-sm font-light italic opacity-60 group-hover:opacity-100 transition-opacity">
                             {t.description || '-'}
                          </td>
                          <td className={`py-5 px-4 font-bold text-right ${Number(t.amount) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {Number(t.amount) >= 0 ? '+' : ''} {Number(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          {isAdmin && (
                            <td className="py-5 px-4 text-center">
                               {!isConferred ? (
                                 <button 
                                   onClick={() => handleConferTransaction(t.id)}
                                   className="bg-amber-500 text-black text-[9px] font-black px-3 py-2 rounded-lg hover:scale-105 transition-all border-none cursor-pointer uppercase shadow-[0_4px_10px_rgba(251,191,36,0.3)]"
                                 >
                                    Carimbar
                                 </button>
                               ) : (
                                 <div className="flex items-center justify-center text-green-500 gap-1 opacity-50">
                                    <CheckCircle2 size={14} />
                                    <span className="text-[9px] font-bold">OK</span>
                                 </div>
                               )}
                            </td>
                          )}
                        </tr>
                      );
                      });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
                  </>
                );
              })()}
            </motion.div>
          )}

          {activeTab === 'girafa_bank' && isAdmin && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <h3 className="outfit text-3xl font-bold mb-2">Gestão de Crédito <span className="text-amber-500 text-lg font-normal">| Girafa Bank</span></h3>
                  <p className="text-muted">Gestão Administrativa de Crédito e Liquidez.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Admin: Create Loan Form */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="glass-card p-8 border-amber-500/30">
                      <h4 className="outfit text-xl mb-6 text-amber-500 flex items-center gap-2"><PlusCircle size={20}/> Conceder Crédito</h4>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        handleCreateLoanAdmin(fd.get('target_user'), fd.get('amount'), fd.get('installments'), fd.get('desc'));
                        e.target.reset();
                      }} className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-muted uppercase font-bold">Selecionar Cliente</label>
                            <select name="target_user" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white">
                              <option value="">Escolha um usuário...</option>
                              {adminData.profiles.map(p => (
                                <option key={p.id} value={p.id}>{p.full_name} (R$ {Number(p.balance).toFixed(2)})</option>
                              ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-muted uppercase font-bold">Valor do Empréstimo (R$)</label>
                            <input type="number" name="amount" required placeholder="Ex: 1000" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-muted uppercase font-bold">Quantidade de Parcelas</label>
                            <select name="installments" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white">
                              {[3, 5, 10, 12, 18, 24].map(n => <option key={n} value={n}>{n}x Meses (Taxa 5% am)</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-muted uppercase font-bold">Descrição/Motivo</label>
                            <input type="text" name="desc" placeholder="Ex: Expansão de banca" />
                        </div>
                        <button type="submit" className="primary-btn w-full justify-center py-4 mt-2">Liberar Crédito Agora</button>
                      </form>
                  </div>
                </div>

                {/* Admin: Global Loan View */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass-card p-8">
                      <h4 className="outfit text-xl mb-6">Contratos Ativos</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="border-b border-white/10 text-muted uppercase text-[10px]">
                                  <th className="py-3">Cliente</th>
                                  <th className="py-3">Total</th>
                                  <th className="py-3">Parcelamento</th>
                                  <th className="py-3">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {adminData.loans.length === 0 && <tr><td colSpan="4" className="py-8 text-center text-muted">Nenhum contrato gerado.</td></tr>}
                              {adminData.loans.map(loan => {
                                const u = adminData.profiles.find(p => p.id === loan.user_id);
                                return (
                                  <tr key={loan.id} className="border-b border-white/5 hover:bg-white/[0.01]">
                                      <td className="py-4">
                                        <p className="font-bold">{u?.full_name || 'Desconhecido'}</p>
                                        <p className="text-[10px] text-muted">{loan.description}</p>
                                      </td>
                                      <td className="py-4 text-amber-500 font-bold">R$ {Number(loan.total_payment).toFixed(2)}</td>
                                      <td className="py-4">{loan.installments}x de R$ {Number(loan.monthly_payment).toFixed(2)}</td>
                                      <td className="py-4">
                                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase">{loan.status}</span>
                                      </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                        </table>
                      </div>
                  </div>
                </div>

                {/* Admin: Global Installments Monitor (Carnês) */}
                <div className="mt-12 space-y-6">
                  <div className="glass-card p-8 border-blue-500/20">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="outfit text-xl text-blue-400 flex items-center gap-2">
                          <Calendar size={20}/> Monitoramento de Parcelas (Carnê Global)
                        </h4>
                        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                          Total: {adminData.allInstallments.length} parcelas
                        </span>
                      </div>
                      
                      <div className="max-h-[600px] overflow-y-auto overflow-x-auto custom-scrollbar pr-2">
                        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                            <thead>
                              <tr className="text-muted uppercase text-[10px] tracking-widest sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-20">
                                  <th className="py-4 px-4 font-black">Cliente</th>
                                  <th className="py-4 px-4 font-black">Parcela</th>
                                  <th className="py-4 px-4 font-black">Valor</th>
                                  <th className="py-4 px-4 font-black">Vencimento</th>
                                  <th className="py-4 px-4 font-black text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="before:block before:h-4">
                              {adminData.allInstallments.length === 0 && (
                                <tr>
                                  <td colSpan="5" className="py-20 text-center text-muted opacity-50 italic">
                                    Nenhum carnê gerado no sistema até o momento.
                                  </td>
                                </tr>
                              )}
                              {adminData.allInstallments.map(inst => {
                                const u = adminData.profiles.find(p => p.id === inst.user_id);
                                const isOverdue = new Date(inst.due_date) < new Date() && inst.status !== 'Pago';
                                return (
                                  <tr key={inst.id} className="group hover:bg-white/[0.03] transition-colors rounded-xl overflow-hidden">
                                      <td className="py-4 px-4 bg-white/5 rounded-l-xl border-y border-l border-white/5">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-bold text-blue-400">
                                            {u?.full_name?.charAt(0) || '?'}
                                          </div>
                                          <div>
                                            <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{u?.full_name || 'Desconhecido'}</p>
                                            <p className="text-[10px] text-muted opacity-50">{u?.email || 'Sem e-mail'}</p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4 bg-white/5 border-y border-white/5">
                                        <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                                          PARCELA {inst.installment_number}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 bg-white/5 border-y border-white/5 font-mono text-white font-bold">
                                        R$ {Number(inst.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                      </td>
                                      <td className="py-4 px-4 bg-white/5 border-y border-white/5">
                                        <div className="flex items-center gap-2 text-muted text-xs">
                                          <Clock size={12} className={isOverdue ? "text-red-500" : "text-muted"} />
                                          <span className={isOverdue ? "text-red-400 font-bold" : ""}>
                                            {new Date(inst.due_date).toLocaleDateString()}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-4 bg-white/5 rounded-r-xl border-y border-r border-white/5 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                                            inst.status === 'Pago' 
                                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                              : (isOverdue 
                                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' 
                                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30')
                                          }`}>
                                            {inst.status === 'Pago' ? 'Liquidada' : (isOverdue ? 'Em Atraso' : 'Aguardando')}
                                          </span>
                                          
                                          {inst.status !== 'Pago' && (
                                            <button 
                                              type="button"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleAdminLiquidateInstallment(inst.id, inst.user_id, Number(inst.amount));
                                              }}
                                              className="bg-amber-500 text-black text-[10px] font-black px-4 py-3 rounded-xl hover:scale-105 transition-all uppercase shadow-[0_4px_15px_rgba(251,191,36,0.3)] cursor-pointer border-none"
                                            >
                                              LIQUIDAR AGORA
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                        </table>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin_dash' && isAdmin && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <header className="mb-8">
                <h3 className="outfit text-3xl font-bold gradient-text">Visão Geral Executiva</h3>
                <p className="text-muted">Desempenho da plataforma e gestão de liquidez.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-blue-500/20">
                  <h4 className="text-muted text-sm uppercase tracking-widest mb-2 font-bold opacity-70">Total Captado</h4>
                  <div className="text-3xl font-bold outfit text-blue-400">
                    R$ {adminData.allInvestments.reduce((acc, inv) => acc + Number(inv.invested_amount), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted mt-2">{adminData.allInvestments.length} ativos em nuvem</p>
                </div>
                <div className="glass-card p-6 border-amber-500/20">
                  <h4 className="text-muted text-sm uppercase tracking-widest mb-2 font-bold opacity-70">Crédito Concedido</h4>
                  <div className="text-3xl font-bold outfit text-amber-500">
                    R$ {adminData.loans.filter(l => l.status === 'Aprovado').reduce((acc, l) => acc + Number(l.amount), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted mt-2">{adminData.loans.filter(l => l.status === 'Aprovado').length} empréstimos ativos</p>
                </div>
                <div className="glass-card p-6 border-purple-500/20">
                  <h4 className="text-muted text-sm uppercase tracking-widest mb-2 font-bold opacity-70">Total Pago (Saques)</h4>
                  <div className="text-3xl font-bold outfit text-red-400">
                    R$ {adminData.allTransactions.filter(t => t.type === 'Saque').reduce((acc, t) => acc + Math.abs(Number(t.amount)), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted mt-2">{adminData.allTransactions.filter(t => t.type === 'Saque').length} resgates PIX</p>
                 </div>
              </div>

              {/* Budget Requests Table */}
              <div className="glass-card p-8 border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                  <h4 className="outfit text-2xl font-bold">Solicitações de Orçamentos (Ecossistema)</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-muted-foreground uppercase text-[10px] tracking-widest border-b border-white/10">
                            <tr>
                                <th className="pb-4">Cliente / Contato</th>
                                <th className="pb-4">Projeto</th>
                                <th className="pb-4">Descrição</th>
                                <th className="pb-4 text-right">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                          {adminData.budgets?.length === 0 && <tr><td colSpan="4" className="py-8 text-center text-muted">Nenhum orçamento solicitado ainda.</td></tr>}
                          {adminData.budgets?.map(b => (
                            <tr key={b.id} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                              <td className="py-4">
                                <p className="font-bold">{b.full_name}</p>
                                <p className="text-[10px] text-blue-400">{b.email}</p>
                                <p className="text-[10px] text-green-500">{b.whatsapp}</p>
                              </td>
                              <td className="py-4 font-bold">{b.project_type}</td>
                              <td className="py-4 max-w-[300px] text-muted text-xs leading-relaxed italic opacity-80 group-hover:opacity-100">{b.description}</td>
                              <td className="py-4 text-right text-[10px] font-mono opacity-50">{new Date(b.created_at).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
              </div>

              {/* Operational Log & Statistics (Original content follows) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Transactions (Universal Log) */}
                <div className="glass-card p-6 border-white/5">
                   <h4 className="outfit text-xl mb-4 text-green-400">Log de Operações Global</h4>
                   <div className="overflow-y-auto max-h-[400px] pr-2 space-y-3">
                      {adminData.allTransactions.map(t => {
                         const user = adminData.profiles.find(p => p.id === t.user_id);
                         return (
                           <div key={t.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                              <div>
                                 <p className="text-[10px] text-muted uppercase font-bold">{new Date(t.created_at).toLocaleString()}</p>
                                 <p className="text-sm font-bold">{user?.full_name || 'Usuário'} <span className="text-xs font-normal opacity-50 px-2">| {t.type}</span></p>
                                 <p className="text-[10px] italic opacity-40">{t.description}</p>
                              </div>
                              <div className={`text-right font-bold ${Number(t.amount) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                 {Number(t.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </div>
                           </div>
                         );
                      })}
                   </div>
                </div>
                {/* Pending Loans Table */}
                <div className="glass-card p-6">
                  <h4 className="outfit text-xl mb-4 text-amber-500">Análise de Crédito</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-muted uppercase text-[10px]">
                          <th className="py-2">Cliente</th>
                          <th className="py-2">Valor</th>
                          <th className="py-2 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminData.loans.filter(l => l.status === 'Análise').length === 0 && (
                          <tr><td colSpan="3" className="py-4 text-center text-muted">Nenhum pedido pendente</td></tr>
                        )}
                        {adminData.loans.filter(l => l.status === 'Análise').map(loan => {
                          const user = adminData.profiles.find(p => p.id === loan.user_id);
                          return (
                            <tr key={loan.id} className="border-b border-white/5">
                              <td className="py-3">{user?.full_name?.split(' ')[0] || 'Desconhecido'}</td>
                              <td className="py-3 font-bold text-amber-500">R$ {Number(loan.amount).toLocaleString()}</td>
                              <td className="py-3 text-right space-x-2 flex justify-end">
                                <button onClick={() => handleAdminLoanAction(loan.id, 'Aprovado', loan.user_id, loan.amount)} className="bg-green-500/20 text-green-400 p-2 rounded-lg hover:bg-green-500/50 transition-colors"><CheckCircle2 size={16} /></button>
                                <button onClick={() => handleAdminLoanAction(loan.id, 'Rejeitado', loan.user_id, loan.amount)} className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/50 transition-colors"><X size={16} /></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Users List */}
                <div className="glass-card p-6">
                  <h4 className="outfit text-xl mb-4 text-blue-400">Diretório de Investidores</h4>
                  <div className="overflow-y-auto max-h-[300px] pr-2">
                    {adminData.profiles.map(p => (
                      <div key={p.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="font-bold">{p.full_name || 'Sem Nome'}</p>
                          <p className="text-xs text-muted font-mono">{p.pix_key || 'Sem Pix'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-500 font-bold">R$ {Number(p.balance).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'giralucky' && <GiraluckySection profile={profile} updateBalance={(nb) => setProfile(prev => ({...prev, balance: nb}))} showNotification={showNotification} />}
        </AnimatePresence>
          </div>
        )}
      </main>

      {/* Modals - Perfil, Pix, Investir */}
      <AnimatePresence>
        {modalType && (
          <div className="modal-backdrop">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-content relative">
              <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-muted hover:text-white border-none bg-transparent cursor-pointer"><X size={24} /></button>
              
              {modalType === 'profile' && (
                <div className="space-y-6">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <h3 className="outfit text-2xl">Meu Cadastro Cloud</h3>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Nome Completo</label>
                      <input type="text" name="full_name" defaultValue={profile?.full_name || ''} required />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Chave Pix</label>
                      <input type="text" name="pix_key" defaultValue={profile?.pix_key || ''} required />
                    </div>
                    <button type="submit" className="primary-btn w-full justify-center">Salvar Perfil</button>
                  </form>
                  
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="outfit text-lg mb-2 text-amber-500 flex items-center gap-2"><Sparkles size={18}/> Girafa Afiliados</h4>
                    <p className="text-xs text-muted mb-4">Ganhe 5% instantâneo sempre que um amigo se cadastrar com seu link e fizer um Pix para a plataforma!</p>
                    <div className="flex gap-2">
                      <input type="url" readOnly value={referralLink} className="w-full text-xs font-mono bg-black/50 overflow-hidden text-ellipsis" />
                      <button onClick={() => {
                        navigator.clipboard.writeText(referralLink);
                        showNotification('Link copiado!');
                      }} className="btn-outline px-4 flex-shrink-0">Copiar</button>
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'pix_receive' && (
                <div className="text-center space-y-6">
                  <h3 className="outfit text-2xl">Depositar via Pix</h3>
                  {pixStatus === 'idle' ? (
                    <>
                      <input type="number" value={pixAmount} onChange={(e) => setPixAmount(e.target.value)} placeholder="Valor do Depósito (R$)" autoFocus />
                      
                      {pixAmount > 0 ? (
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48 relative overflow-hidden">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatePixPayload(pixAmount))}`} className="w-full h-full object-contain" />
                          </div>
                          <div className="bg-white/5 p-4 rounded-xl">
                            <p className="text-xs text-muted mb-2">Pix Copia e Cola (Chave: 09551040848)</p>
                            <input type="text" readOnly value={generatePixPayload(pixAmount)} className="w-full text-[10px] font-mono bg-black/50 overflow-hidden text-ellipsis mb-2 p-2 rounded" />
                            <button onClick={() => {
                              navigator.clipboard.writeText(generatePixPayload(pixAmount));
                              showNotification('Pix Copia e Cola copiado!');
                            }} className="btn-outline w-full py-2 text-xs font-bold border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black mt-2">
                              Copiar Código Pix
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 text-muted text-sm my-6">
                          Digite o valor acima para gerar seu QR Code de pagamento.
                        </div>
                      )}

                      <button onClick={handleReceivePix} disabled={!pixAmount || pixAmount <= 0} className="primary-btn w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">Já realizei o Pagamento</button>
                    </>
                  ) : <div className="py-12"><Loader2 className="animate-spin mx-auto text-amber-500 mb-4" /> Verificando compensação no sistema...</div>}
                </div>
              )}

              {modalType === 'investir' && selectedInvestment && (
                <div className="space-y-6">
                  <h3 className="outfit text-2xl text-center">Confirmar Aplicação</h3>
                  <div className="bg-white/5 p-6 rounded-xl text-center shadow-[0_0_20px_rgba(251,191,36,0.1)] border border-amber-500/10">
                    <p className="text-sm text-muted mb-2">Qual valor você deseja aportar? (R$)</p>
                    <input 
                      type="number" 
                      value={investAmount} 
                      onChange={(e) => setInvestAmount(e.target.value)}
                      className="text-4xl font-bold outfit text-amber-500 text-center bg-transparent border-b-2 border-amber-500/30 focus:border-amber-500 focus:outline-none w-full pb-2 transition-colors"
                      placeholder={`Min: ${selectedInvestment.min_amount || selectedInvestment.cost}`}
                      autoFocus
                    />
                    <div className="flex justify-between items-center text-xs text-muted mt-3">
                      <span>Min: R$ {(selectedInvestment.min_amount || selectedInvestment.cost || 0).toLocaleString()}</span>
                      <span>Max: R$ {(selectedInvestment.max_amount || 999999).toLocaleString()}</span>
                    </div>
                    
                    <div className="mt-8 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <p className="text-green-500/60 uppercase tracking-widest text-[10px] font-bold mb-1">Previsão Matemática de Retorno</p>
                      <p className="text-2xl font-bold text-green-400">R$ {(Number(investAmount) * (1 + (selectedInvestment.yield_percent/100))).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    </div>
                    
                    <p className="text-xs text-muted mt-6">Saldo em Nuvem: R$ {profile?.balance?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                  </div>
                  
                  {profile?.balance < Number(investAmount) && (
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-center gap-3 text-red-200 text-sm">
                      <AlertCircle size={18} className="text-red-500 shrink-0" />
                      Você não possui saldo suficiente para esta aplicação.
                    </div>
                  )}

                  <button 
                    onClick={handleInvest} 
                    disabled={profile?.balance < Number(investAmount)}
                    className="primary-btn w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {profile?.balance < Number(investAmount) ? 'Saldo Insuficiente' : 'Efetuar Investimento'}
                  </button>
                </div>
              )}

              {modalType === 'sacar' && selectedInvestment && (
                <div className="space-y-6">
                  {(() => {
                    const progress = Number(calculateProgress(selectedInvestment.invested_at, selectedInvestment.validity));
                    const isEndReached = progress >= 100;
                    const accrued = calculateAccruedEarnings(selectedInvestment);
                    const principal = Number(selectedInvestment.invested_amount);
                    const isWithdrawBlocked = accrued <= 0 && !isEndReached;

                    return (
                      <>
                        <h3 className="outfit text-2xl text-center">Resgatar Rendimentos</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted">Capital Principal</span>
                            <span className={isEndReached ? "text-green-500 font-bold" : "text-amber-500/50"}>
                              R$ {principal.toFixed(2)} {isEndReached ? "(Liberado)" : "(Bloqueado)"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted">Lucro Acruado</span>
                            <span className="text-green-400 font-bold">+ R$ {accrued.toFixed(2)}</span>
                          </div>
                          
                          <div className="bg-white/5 p-6 rounded-2xl text-center border border-amber-500/20 mt-6">
                            <p className="text-xs text-muted mb-1 opacity-60 uppercase tracking-widest">
                              {isEndReached ? "Valor Total para Saque" : "Lucro Disponível para Saque"}
                            </p>
                            <p className="text-3xl font-bold text-amber-500 outfit">
                              R$ {(isEndReached ? (principal + accrued) : accrued).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                            </p>
                            <p className="text-[10px] text-muted mt-2 uppercase">Taxa de serviço 5% não inclusa</p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                  
                  <div className="bg-blue-500/10 p-4 rounded-xl flex items-center gap-4 text-xs text-blue-200 border border-blue-500/20">
                    <CheckCircle2 size={24} className="text-blue-500 shrink-0" />
                    O valor será enviado instantaneamente para sua chave Pix: <br />
                    <strong className="text-white">{profile?.pix_key}</strong>
                  </div>

                  {(() => {
                    const accrued = calculateAccruedEarnings(selectedInvestment);
                    const progress = Number(calculateProgress(selectedInvestment.invested_at, selectedInvestment.validity));
                    const isEndReached = progress >= 100;
                    const canWithdraw = accrued > 0 || isEndReached;

                    return pixStatus === 'idle' ? (
                      <button 
                        onClick={() => handleSacar(selectedInvestment)} 
                        disabled={!canWithdraw}
                        className="primary-btn w-full justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isEndReached ? 'Resgatar Capital + Lucro' : (accrued > 0 ? 'Resgatar Apenas Lucro' : 'Aguardando Rendimento')}
                      </button>
                    ) : (
                      <div className="text-center py-6">
                        <Loader2 className="animate-spin mx-auto text-amber-500 mb-4" size={32} />
                        <p className="text-muted outfit uppercase tracking-widest text-xs">Aguarde... Salvando registro de saque</p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {modalType === 'pix_withdraw' && (
                <div className="text-center space-y-6">
                  <h3 className="outfit text-2xl">Sacar para sua Conta</h3>
                  {pixStatus === 'idle' ? (
                    <>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-6">
                         <p className="text-[10px] text-muted uppercase font-bold mb-2">Seu Saldo Disponível</p>
                         <p className="text-3xl font-black text-amber-500">R$ {(Number(profile?.balance) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                         <label className="text-left text-xs text-muted">Quanto você deseja sacar? (R$)</label>
                         <input type="number" value={pixAmount} onChange={(e) => setPixAmount(e.target.value)} placeholder="0,00" autoFocus />
                         <p className="text-[10px] text-muted text-left mt-1">O valor será debitado e processado manualmente pela nossa equipe.</p>
                      </div>
                      
                      <div className="bg-blue-500/10 p-4 rounded-xl flex items-center gap-4 text-xs text-blue-200 border border-blue-500/20 text-left">
                        <CheckCircle2 size={24} className="text-blue-500 shrink-0" />
                        <div>
                           Destino: <strong>{profile?.pix_key || 'Chave não cadastrada'}</strong><br/>
                           <span className="opacity-60 italic">Se a chave estiver errada, altere no seu perfil antes de sacar.</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleWithdrawBalance} 
                        disabled={!pixAmount || Number(pixAmount) <= 0 || Number(pixAmount) > profile?.balance} 
                        className="secondary-btn w-full justify-center py-4 text-lg font-bold disabled:opacity-50 disabled:grayscale"
                      >
                         {Number(pixAmount) > profile?.balance ? 'Saldo Insuficiente' : 'Solicitar Saque via Pix'}
                      </button>
                    </>
                  ) : (
                    <div className="py-12">
                       <Loader2 className="animate-spin mx-auto text-amber-500 mb-4" size={40} />
                       <p className="outfit font-bold text-amber-500 animate-pulse">REGISTRANDO SOLICITAÇÃO...</p>
                       <p className="text-xs text-muted mt-2">Sua solicitação de saque manual está sendo salva no sistema.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl z-[100] border ${notification.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-200' : 'bg-green-500/20 border-green-500/50 text-green-200'} backdrop-blur-md`}>
            {notification.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AuthView = ({ onNotify, initialMode = false }) => {
  const [isLogin, setIsLogin] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const handleResendEmail = async () => {
    if (!email) return onNotify('Digite seu e-mail para reenviar!', 'error');
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: window.location.origin }
      });
      if (error) throw error;
      onNotify('E-mail de confirmação reenviado com sucesso!');
      setShowResend(false);
    } catch (err) {
      onNotify('Erro ao reenviar e-mail: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim();
    if (!cleanEmail) return onNotify('Digite seu e-mail para recuperar a senha!', 'error');
    setLoading(true);
    try {
      // 1. Acionar o Supabase para gerar o link interno
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: window.location.origin
      });
      if (error) throw error;

      // 2. Notificação (O Supabase lida com o e-mail oficial de redefinição)
      onNotify('Instruções de recuperação enviadas!');
      alert('SUCESSO: Enviamos as instruções para o seu e-mail e WhatsApp!');
    } catch (err) {
      onNotify('Erro ao solicitar recuperação: ' + err.message, 'error');
      alert('ERRO NA RECUPERAÇÃO: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordWhatsApp = async () => {
    const cleanEmail = email.trim();
    if (!cleanEmail) return onNotify('Digite seu e-mail para recuperar!', 'error');
    setLoading(true);
    console.log('--- DIAGNÓSTICO WHATSAPP ---');
    console.log('Email:', cleanEmail);
    console.log('Redirecionamento:', window.location.origin);

    try {
      console.log('Chamando Edge Function: send-recovery-whatsapp...');
      alert('🦒 INICIANDO RECUPERAÇÃO AUTOMÁTICA...\n\nAguarde o Zap chegar!');
      
      const { data, error } = await supabase.functions.invoke('send-recovery-whatsapp', {
        body: { email: cleanEmail }
      });
      
      if (error) {
        console.error('ERRO RETORNADO PELA FUNÇÃO:', error);
        throw error;
      }
      
      console.log('RESPOSTA SUCESSO:', data);
      onNotify('Link de recuperação enviado para o seu WhatsApp!');
      alert('SUCESSO: Link enviado via Evolution API! 🚀');
    } catch (err) {
      console.error('ERRO CRÍTICO NO INVOKE:', err);
      const errorMsg = err.message || JSON.stringify(err);
      onNotify('Erro ao enviar link para WhatsApp: ' + errorMsg, 'error');
      alert('ERRO TÉCNICO DETALHADO:\n' + errorMsg + '\n\nVerifique os Logs no Supabase Dashboard!');
    } finally {
      setLoading(false);
      console.log('--- FIM DIAGNÓSTICO ---');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password || (!isLogin && (!fullName || !phone))) {
        throw new Error('Todos os campos são obrigatórios!');
      }
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          const msg = error.message.toLowerCase();
          if (msg.includes('confirm') || (error.status === 400 && msg.includes('not confirmed'))) {
             setShowResend(true);
             throw new Error('STATUS_UNCONFIRMED: Verifique seu e-mail para confirmar a conta.');
          }
          throw error;
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            data: { full_name: fullName, phone_number: phone },
            emailRedirectTo: window.location.origin
          }
        });
        if (error) {
          const msg = error.message.toLowerCase();
          if (msg.includes('rate limit')) alert('🚨 Limite de tentativas atingido.');
          else if (msg.includes('already registered')) alert('⚠️ E-mail já cadastrado.');
          else if (error.status === 401) alert('🔑 ERRO 401.');
          else alert('ERRO NO CADASTRO: ' + error.message);
          throw error;
        }
        
        // --- NOVO: Lógica de Afiliados (Bônus de Indicação com Validação UUID) ---
        const savedRef = localStorage.getItem('girafa_ref');
        const isUUID = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

        if (savedRef && isUUID(savedRef) && data?.user?.id) {
           try {
             await supabase.from('profiles').update({ referred_by: savedRef }).eq('id', data.user.id);
             localStorage.removeItem('girafa_ref');
           } catch(e) { console.error('Afiliado Err (UUID Inválido ou Erro DB)', e); }
        } else if (savedRef) {
           console.warn('Indicação ignorada: O código não é um UUID válido.');
           localStorage.removeItem('girafa_ref');
        }

        onNotify('Verifique seu e-mail para confirmar!');
        alert('SUCESSO! Link de ativação enviado para: ' + email);
      }
    } catch (err) {
      console.error('CRITICAL AUTH ERROR:', err);
      
      let finalMsg = err.message;
      
      // Tradução de Erros Comuns do Supabase
      if (finalMsg.includes('Password should be at least 6 characters')) {
        finalMsg = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (finalMsg.includes('Invalid login credentials')) {
        finalMsg = 'E-mail ou senha incorretos.';
      } else if (finalMsg.includes('User already registered')) {
        finalMsg = 'Este e-mail já está cadastrado em nossa plataforma.';
      } else if (finalMsg.includes('email_not_confirmed')) {
        finalMsg = 'Sua conta ainda não foi confirmada. Verifique o link no e-mail!';
      } else if (finalMsg.includes('STATUS_UNCONFIRMED')) {
        finalMsg = 'Verifique seu e-mail para confirmar a conta antes de entrar.';
      }

      onNotify(finalMsg, 'error');
      alert('Atenção: ' + finalMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSupportWhatsApp = () => {
    const text = `Olá! Preciso de ajuda para ativar minha conta na Girafa Tech (E-mail: ${email || 'não informado'})`;
    const url = `https://wa.me/551934585300?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md p-10 relative z-10">
        <div className="text-center mb-10">
          <img src="/logo.png" className="w-32 h-auto mx-auto mb-6 shadow-2xl object-contain p-2" />
          <h2 className="outfit text-3xl font-bold gradient-text">Girafa Tech</h2>
          <p className="text-muted text-sm mt-2">{isLogin ? 'Bem-vindo de volta à elite' : 'Comece sua jornada hoje'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input type="text" placeholder="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-12" required />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input type="email" placeholder="Endereço de Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12" required />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input type="tel" placeholder="Número do Celular" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-12" required={!isLogin} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12" required />
          </div>
          
          {isLogin && (
            <div className="flex flex-col gap-3 px-1 mt-2">
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="text-xs text-amber-500/80 hover:text-amber-500 uppercase tracking-tighter cursor-pointer border-none bg-transparent text-right font-bold"
              >
                Esqueci a senha (receber por E-mail)
              </button>
              
              <button 
                type="button"
                onClick={handleForgotPasswordWhatsApp}
                className="w-full py-3 rounded-xl bg-amber-500 text-black text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)]"
              >
                🔐 RECUPERAR POR WHATSAPP (INSTANTÂNEO)
              </button>
            </div>
          )}

          <button type="submit" disabled={loading} className="primary-btn w-full justify-center py-6 text-xl font-black shadow-[0_10px_40px_rgba(251,191,36,0.3)] hover:scale-[1.02] transition-all">
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'ENTRAR NA CONTA' : 'ABRIR MINHA CONTA AGORA (GRÁTIS)')}
          </button>
        </form>

        {showResend && (
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
            <p className="text-xs text-amber-200 mb-3">Não recebeu o e-mail ou o link expirou?</p>
            <button 
              onClick={handleResendEmail} 
              disabled={loading}
              className="btn-outline w-full text-xs py-2 uppercase tracking-widest font-bold"
            >
              🚀 Reenviar e-mail de ativação
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] text-muted text-center mb-3 uppercase tracking-widest">Problemas técnicos?</p>
          <button 
            type="button"
            onClick={handleSupportWhatsApp}
            className="w-full py-3 rounded-xl bg-white/5 text-muted text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/10"
          >
            💬 CONTATO MANUAL COM SUPORTE
          </button>
        </div>

        <p className="text-center mt-8 text-sm text-muted">
          {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}
          <button onClick={() => setIsLogin(!isLogin)} className="text-amber-500 font-bold ml-2 bg-transparent border-none cursor-pointer">
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </button>
        </p>

        {/* Debug Info para o Abel verificar a Chave */}
        <div className="mt-10 pt-4 border-t border-white/5 text-[8px] text-muted/30 font-mono text-center uppercase tracking-widest">
           v2.1.0-INVEST-ONLY
        </div>
      </motion.div>
    </div>
  );
};

const InvestmentCard = ({ investment, onInvest, onEdit, onDelete, isAdmin }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const isUpcoming = Boolean(investment.is_daily_deal) && (new Date() < new Date(investment.deal_start_at));
  const isExpired = Boolean(investment.is_daily_deal) && new Date() > new Date(investment.deal_end_at);
  const isActiveDeal = Boolean(investment.is_daily_deal) && !isExpired && !isUpcoming;
  
  // Debug para você ver no console (F12) se o sistema está detectando a oferta
  useEffect(() => {
    if (investment.is_daily_deal) {
      console.log(`[Deal Monitor] ID: ${investment.id} | Upcoming: ${isUpcoming} | Active: ${isActiveDeal}`);
    }
  }, [investment, isUpcoming, isActiveDeal]);

  useEffect(() => {
    if (!investment.is_daily_deal) return;
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(investment.deal_end_at).getTime();
      const dist = end - now;

      if (dist < 0) {
        setTimeLeft('EXPIRADO');
        clearInterval(timer);
      } else {
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [investment]);

  const getPlanName = (validity) => {
    if (investment.is_daily_deal) return '🔥 Oportunidade do Dia';
    switch (Number(validity)) {
      case 3: return '🥉 Projeto Bronze';
      case 7: return '🥈 Projeto Prata';
      case 15: return '🥇 Projeto Ouro';
      case 30: return '💎 Projeto Diamante';
      default: return `📈 Projeto de ${validity} Dias`;
    }
  };

  const getTierColor = (validity) => {
    if (investment.is_daily_deal) return 'text-amber-500';
    switch (Number(validity)) {
      case 3: return 'text-orange-400';
      case 7: return 'text-slate-300';
      case 15: return 'text-amber-400';
      case 30: return 'text-cyan-400';
      default: return 'text-emerald-400';
    }
  };

  const TierIcon = investment.is_daily_deal ? Sparkles : (Number(investment.validity) === 30 ? Gem : (Number(investment.validity) === 3 || Number(investment.validity) === 7 || Number(investment.validity) === 15 ? Coins : TrendingUp));

  return (
    <div 
      className={`glass-card p-6 flex flex-col h-full relative overflow-hidden transition-all duration-700 ${isActiveDeal ? 'border-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.3)]' : 'border-2 border-white/5'}`}
      style={{ background: !isActiveDeal && !isUpcoming ? 'rgba(23, 23, 26, 0.7)' : undefined }}
    >
      
      {/* Playing Card Teaser for Upcoming Deals */}
      <AnimatePresence>
        {isUpcoming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="investment-card-teaser p-6 text-center"
            style={{ background: 'linear-gradient(180deg, #0a0a0c 0%, #17171a 100%)' }}
          >
             <div className="absolute top-0 right-0 p-4">
                <div className="bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Lançamento em breve</div>
             </div>
             
             {/* Back-up Dourado se a imagem demorar a carregar */}
             <div className="playing-card-visual" style={{ background: 'linear-gradient(45deg, #fbbf24, #f59e0b)', backgroundImage: "url('/playing-card.png')", backgroundSize: 'cover' }} />
             
             <div className="countdown-overlay space-y-2 mt-8">
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Início da Rodada em:</p>
                <div className="flex gap-2 justify-center">
                   {(() => {
                      const now = new Date().getTime();
                      const start = new Date(investment.deal_start_at).getTime();
                      const d = start - now;
                      if (d < 0) return <span className="text-amber-500 font-bold">ABRINDO...</span>;
                      const h = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      const m = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
                      const s = Math.floor((d % (1000 * 60)) / 1000);
                      return (
                        <>
                          <div className="bg-white/10 px-3 py-2 rounded-xl text-2xl font-black outfit" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>{h.toString().padStart(2, '0')}</div>
                          <span className="text-xl font-bold self-center opacity-30">:</span>
                          <div className="bg-white/10 px-3 py-2 rounded-xl text-2xl font-black outfit" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>{m.toString().padStart(2, '0')}</div>
                          <span className="text-xl font-bold self-center opacity-30">:</span>
                          <div className="bg-white/10 px-3 py-2 rounded-xl text-2xl font-black outfit text-amber-500" style={{ border: '1px solid rgba(251,191,36,0.1)' }}>{s.toString().padStart(2, '0')}</div>
                        </>
                      );
                   })()}
                </div>
                <p className="text-[11px] font-bold text-amber-500/80 animate-pulse mt-4">💎 Exclusivo Girafa Tech Elite</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isActiveDeal && (
        <div className="absolute top-0 left-0 w-full bg-amber-500 text-black text-[10px] font-black uppercase text-center py-1 tracking-widest flex items-center justify-center gap-2 z-10">
           <Clock size={12} /> Expira em: {timeLeft}
        </div>
      )}
      
      {isExpired && (
        <div className="absolute top-0 left-0 w-full bg-red-600/50 text-white text-[10px] font-black uppercase text-center py-1 tracking-widest z-10">
           Oferta Encerrada
        </div>
      )}

      <div className={`flex flex-col gap-4 mb-6 ${isActiveDeal || isUpcoming || isExpired ? 'mt-4' : ''}`}>
        <div className="flex gap-2">
          <div className={`p-3 rounded-2xl ${isActiveDeal ? 'bg-amber-500/20' : 'bg-white/10'}`}>
            <TierIcon className={getTierColor(investment.validity)} />
          </div>
          {isAdmin && onEdit && (
            <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 border-none cursor-pointer hover:bg-amber-500/30">
              <Pencil size={20} />
            </button>
          )}
          {isAdmin && onDelete && (
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="bg-red-500/10 p-3 rounded-2xl text-red-400 border-none cursor-pointer hover:bg-red-500/30">
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-6 flex-1">
        <h4 className={`outfit text-xl mb-4 font-bold ${getTierColor(investment.validity)}`}>{getPlanName(investment.validity)}</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm"><span className="text-muted">Aporte</span><span className="font-bold">{(investment.min_amount || investment.cost || 0).toLocaleString()} a {(investment.max_amount || 99999).toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Validade</span><span className="font-bold">{investment.validity} dias</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Rendimento Líquido</span><span className="text-green-400 font-bold">+{investment.yield_percent}%</span></div>
          <div className="flex justify-between text-lg mt-4 pt-4 border-t border-white/5 items-center"><span className="font-semibold outfit text-sm text-muted">Retorno Mínimo</span><span className="text-amber-400 font-bold text-sm">R$ {((investment.min_amount || investment.cost || 0) * (1 + investment.yield_percent/100)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
        </div>
      </div>
      
      {onInvest && (
        <button 
          onClick={() => onInvest(investment)} 
          disabled={isUpcoming || isExpired}
          className={`primary-btn w-full justify-center text-base py-3 font-bold mt-4 ${isActiveDeal ? 'animate-pulse' : ''}`}>
          {isUpcoming ? 'Aguardando Início' : isExpired ? 'Oferta Encerrada' : 'Investir agora'}
        </button>
      )}
    </div>
  );
};


export default App;
