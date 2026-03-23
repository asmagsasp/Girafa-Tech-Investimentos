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
  Mail,
  Phone,
  Lock,
  Loader2,
  Landmark,
  Bus,
  MessageSquare,
  Heart,
  HeartHandshake,
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
  Trophy
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

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-container min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <img src="/logo.png" className="w-24 h-auto mx-auto mb-8 shadow-2xl" alt="Girafa Tech" />
          <h1 className="outfit text-5xl md:text-7xl font-bold mb-6 gradient-text">Girafa Tech</h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Inovação, Tecnologia e Gestão Inteligente de Ativos Digitais.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={onGetStarted} className="primary-btn px-10 py-5 text-xl font-bold">
              Começar a Investir
            </button>
            <a href="#portfolio" className="btn-outline px-10 py-5 text-xl font-bold border-white/10 text-white flex items-center justify-center">
              Ver Projetos
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-20 text-muted opacity-30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <h2 className="section-title">Nosso Ecossistema</h2>
        <div className="project-grid">
          {SPONSOR_PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="landing-project-card"
            >
              <div className="project-icon-wrapper">
                {(() => {
                  const Icon = project.icon;
                  return <Icon size={30} />;
                })()}
              </div>
              <h4 className="outfit">{project.name}</h4>
              <p>{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="outfit text-4xl font-bold mb-8">Por que investir conosco?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-amber-500 font-bold text-4xl mb-2">12+</div>
              <p className="text-muted uppercase text-xs tracking-widest">Projetos Ativos</p>
            </div>
            <div>
              <div className="text-blue-500 font-bold text-4xl mb-2">100%</div>
              <p className="text-muted uppercase text-xs tracking-widest">Segurança Pix</p>
            </div>
            <div>
              <div className="text-green-500 font-bold text-4xl mb-2">24/7</div>
              <p className="text-muted uppercase text-xs tracking-widest">Gestão em Nuvem</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-lp">
        <p>© 2026 Girafa Tech | Investimentos & Tecnologia • Todos os direitos reservados</p>
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
  const [reels, setReels] = useState(['🦒', '🦒', '🦒']);
  const [spinning, setSpinning] = useState(false);
  
  const symbols = ['🦒', '💎', '🪙', '🦁', '🦓', '🎰'];
  const GIRAFFE_IMG = '/slots-giraffe.png';

  const spin = async () => {
    if (profile.balance < 50) {
      showNotification('Saldo insuficiente para girar (Mínimo R$ 50,00)', 'error');
      return;
    }
    
    setSpinning(true);
    
    // Deduct cost
    const newBalancePre = profile.balance - 50;
    const { error: dedErr } = await supabase.from('profiles').update({ balance: newBalancePre }).eq('id', profile.id);
    if (dedErr) {
      showNotification('Erro ao processar aposta.', 'error');
      setSpinning(false);
      return;
    }
    updateBalance(newBalancePre);

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

      if (finalResult.every(s => s === '🦒')) {
        const winningBalance = newBalancePre * 2;
        const { error: winErr } = await supabase.from('profiles').update({ balance: winningBalance }).eq('id', profile.id);
        if (!winErr) {
          updateBalance(winningBalance);
          showNotification('JACKPOT!!! SEU SALDO DOBROU!', 'success');
        }
      } else {
        showNotification('Não foi dessa vez! Tente novamente.');
      }
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      <div className="glass-card p-12 text-center border-purple-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        
        <h2 className="outfit text-5xl font-black mb-2 text-white italic tracking-tighter uppercase italic">GiraLucky 🎰</h2>
        <p className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em] mb-12">Dobre seu capital com o poder da Girafa!</p>

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
            {spinning ? 'Girando...' : 'GIRAR (R$ 50,00)'}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-muted text-xs">
            <Trophy size={14} className="text-amber-500" />
            <span>Acerte <strong>3 Girafas</strong> para dobrar todo seu saldo instantaneamente!</span>
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
            <p className="text-sm font-bold">R$ 50,00 fixos</p>
          </div>
        </div>
        <div className="glass-card p-6 border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">🦒</div>
          <div className="text-left">
            <p className="text-xs text-muted uppercase font-bold tracking-tighter">Prêmio Máximo</p>
            <p className="text-sm font-bold text-amber-500">Saldo 2X INFINITO</p>
          </div>
        </div>
      </div>
    </div>
  );
};
