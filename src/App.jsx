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
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';

const App = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [availableInvestments, setAvailableInvestments] = useState([]);
  const [myInvestments, setMyInvestments] = useState([]);
  
  // Modal & Form States
  const [modalType, setModalType] = useState(null);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [pixAmount, setPixAmount] = useState('');
  const [pixRecipient, setPixRecipient] = useState('');
  const [pixStatus, setPixStatus] = useState('idle');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (sess) {
        setSession(sess);
        setUser(sess.user);
        setIsAdmin(sess.user.email === 'admin@girafatech.com' || sess.user.email === 'abel@girafatech.com');
        fetchUserData(sess.user.id);
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
        setLoading(false);
        return;
      }

      if (sess?.user?.id !== user?.id) {
        setSession(sess);
        setUser(sess?.user ?? null);
        if (sess) {
          setIsAdmin(sess.user.email === 'admin@girafatech.com' || sess.user.email === 'abel@girafatech.com');
          fetchUserData(sess.user.id);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    setLoading(true);
    try {
      // Fetch Profile
      const { data: prof, error: profErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profErr) throw profErr;
      setProfile(prof);

      // Fetch Investment Options
      const { data: opts, error: optsErr } = await supabase
        .from('investment_options')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (optsErr) throw optsErr;
      setAvailableInvestments(opts);

      // Fetch User Investments
      const { data: userInvs, error: userInvErr } = await supabase
        .from('user_investments')
        .select('*')
        .eq('user_id', userId);
      
      if (userInvErr) throw userInvErr;
      setMyInvestments(userInvs);

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
      full_name: formData.get('full_name'),
      pix_key: formData.get('pix_key'),
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) showNotification('Erro ao atualizar perfil.', 'error');
    else {
      setProfile({ ...profile, ...updates });
      showNotification('Perfil atualizado com sucesso!');
      setModalType(null);
    }
  };

  const handleCreateInvestment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const invData = {
      validity: Number(formData.get('validity')),
      cost: Number(formData.get('cost')),
      fee: 5,
      yield_percent: Number(formData.get('yieldPercent')),
      final_amount: Number(formData.get('finalAmount')),
      created_by: user.id
    };

    if (editingInvestment) {
      const { error } = await supabase
        .from('investment_options')
        .update(invData)
        .eq('id', editingInvestment.id);
      
      if (error) showNotification('Erro ao atualizar investimento.', 'error');
      else {
        setAvailableInvestments(availableInvestments.map(inv => inv.id === editingInvestment.id ? { ...inv, ...invData } : inv));
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
        setAvailableInvestments([data, ...availableInvestments]);
        showNotification('Investimento criado!');
      }
    }
    e.target.reset();
  };

  const handleDeleteInvestment = async (id) => {
    if (window.confirm('Remover este investimento disponível?')) {
      const { error } = await supabase.from('investment_options').delete().eq('id', id);
      if (error) showNotification('Erro ao remover.', 'error');
      else {
        setAvailableInvestments(availableInvestments.filter(inv => inv.id !== id));
        showNotification('Removido com sucesso.');
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
      if (accrued < 20) {
        showNotification('Atenção: O saque mínimo permitido é de R$ 20,00 de lucro.', 'error');
        alert('SAQUE NEGADO: Seu lucro atual de R$ ' + accrued.toFixed(2) + ' ainda é menor que o mínimo de R$ 20,00.');
        return;
      }

      setPixStatus('checking');
      
      setTimeout(async () => {
        try {
          const principal = Number(inv.invested_amount);
          const fee = (principal + accrued) * 0.05;
          const finalPayout = (principal + accrued) - fee;

          const newBal = Number(profile.balance) + finalPayout;

          const { error: balErr } = await supabase.from('profiles').update({ balance: newBal }).eq('id', user.id);
          const { error: delErr } = await supabase.from('user_investments').delete().eq('active_id', inv.active_id);

          if (balErr || delErr) {
            showNotification('Erro ao processar resgate em nuvem.', 'error');
            setPixStatus('idle');
          } else {
            setProfile({ ...profile, balance: newBal });
            setMyInvestments(myInvestments.filter(i => i.active_id !== inv.active_id));
            setPixStatus('confirmed');
            showNotification(`Resgate de R$ ${finalPayout.toFixed(2)} concluído!`);
            
            setTimeout(() => {
              setModalType(null);
              setPixStatus('idle');
            }, 2000);
          }
        } catch (innerErr) {
          console.error('Erro interno no processamento:', innerErr);
          setPixStatus('idle');
        }
      }, 2500);
    } catch (err) {
      console.error('Erro geral no handleSacar:', err);
      showNotification('Erro ao processar resgate.', 'error');
    }
  };

  const handleInvest = async () => {
    const amount = Number(investAmount);
    if (profile.balance < amount) {
      showNotification('Saldo insuficiente!', 'error');
      return;
    }
    
    const newBal = profile.balance - amount;
    const { error: balErr } = await supabase.from('profiles').update({ balance: newBal }).eq('id', user.id);
    if (balErr) return showNotification('Erro na transação.', 'error');

    const newActiveInv = {
      user_id: user.id,
      option_id: selectedInvestment.id,
      invested_amount: amount,
      validity: selectedInvestment.validity,
      yield_percent: selectedInvestment.yield_percent,
      final_amount: selectedInvestment.final_amount,
      status: 'Ativo'
    };

    const { data, error } = await supabase.from('user_investments').insert([newActiveInv]).select().single();
    if (error) showNotification('Erro ao registrar investimento.', 'error');
    else {
      setProfile({ ...profile, balance: newBal });
      setMyInvestments([data, ...myInvestments]);
      showNotification('Investimento realizado!');
      setModalType(null);
    }
  };

  const handleDeleteMyInvestment = async (activeId) => {
    if (window.confirm('Cancelar este investimento? O capital retornará ao saldo.')) {
      const inv = myInvestments.find(i => i.active_id === activeId);
      const newBal = profile.balance + Number(inv.invested_amount);
      
      const { error: balErr } = await supabase.from('profiles').update({ balance: newBal }).eq('id', user.id);
      const { error: delErr } = await supabase.from('user_investments').delete().eq('active_id', activeId);
      
      if (balErr || delErr) showNotification('Erro ao processar cancelamento.', 'error');
      else {
        setProfile({ ...profile, balance: newBal });
        setMyInvestments(myInvestments.filter(i => i.active_id !== activeId));
        showNotification('Investimento cancelado e saldo estornado!');
      }
    }
  };

  const handleReceivePix = async () => {
    setPixStatus('checking');
    setTimeout(async () => {
      const extra = Number(pixAmount) || 1000;
      const newBal = profile.balance + extra;
      const { error } = await supabase.from('profiles').update({ balance: newBal }).eq('id', user.id);
      
      if (error) {
        showNotification('Erro ao compensar Pix.', 'error');
        setPixStatus('idle');
      } else {
        setProfile({ ...profile, balance: newBal });
        setPixStatus('confirmed');
        showNotification(`Pix de R$ ${extra.toFixed(2)} compensado!`);
        setTimeout(() => { setModalType(null); setPixStatus('idle'); }, 2000);
      }
    }, 2000);
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

  const calculateProgress = (investedAt, validity) => {
    const start = new Date(investedAt).getTime();
    const now = new Date().getTime();
    const duration = Number(validity) * 24 * 60 * 60 * 1000;
    const progress = ((now - start) / duration) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(1);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
        <p className="text-muted font-medium outfit uppercase tracking-widest">Girafa Tech Iniciando...</p>
      </div>
    </div>
  );

  // Check for missing config
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="glass-card max-w-lg p-10 text-center border-red-500/50">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="outfit text-2xl mb-4">Configuração Pendente</h2>
          <p className="text-muted mb-6">As credenciais do Supabase não foram encontradas. Certifique-se de configurar o arquivo <strong>.env</strong> em seu projeto.</p>
          <div className="bg-white/5 p-4 rounded-xl text-left border border-white/10">
            <code className="text-xs text-amber-400">
              VITE_SUPABASE_URL=seu_url_aqui<br />
              VITE_SUPABASE_ANON_KEY=sua_key_aqui
            </code>
          </div>
        </div>
      </div>
    );
  }

  const calculateAccruedEarnings = (inv) => {
    const progress = Number(calculateProgress(inv.invested_at, inv.validity)) / 100;
    const totalPotentialProfit = Number(inv.final_amount) - Number(inv.invested_amount);
    return totalPotentialProfit * progress;
  };

  const totalEarnings = myInvestments.reduce((acc, inv) => acc + calculateAccruedEarnings(inv), 0);

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo.png" alt="Girafa Tech" className="w-12 h-12 rounded-xl object-cover border border-amber-500/30" />
          <h1 className="text-xl font-bold gradient-text outfit leading-tight">GIRAFA TECH<br /><span className="text-xs text-muted font-normal tracking-widest uppercase">Investimentos</span></h1>
        </div>

        <div className="flex-1">
          <button onClick={() => setActiveTab('dashboard')} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          
          {isAdmin && (
            <button onClick={() => setActiveTab('investments')} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'investments' ? 'active' : ''}`}>
              <PlusCircle size={20} /> Criar Investimento
            </button>
          )}

          <button onClick={() => setActiveTab('explore')} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'explore' ? 'active' : ''}`}>
            <TrendingUp size={20} /> Oportunidades
          </button>
          <button onClick={() => setActiveTab('my_investments')} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'my_investments' ? 'active' : ''}`}>
            <Wallet size={20} /> Meus Investimentos
          </button>
          <button onClick={() => setActiveTab('reports')} className={`nav-link w-full border-none cursor-pointer text-left ${activeTab === 'reports' ? 'active' : ''}`}>
            <History size={20} /> Relatórios
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
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 animate-in">
          <div>
            <h2 className="text-3xl font-bold outfit mb-1">Olá, {profile?.full_name?.split(' ')[0] || 'Investidor'}</h2>
            <p className="text-muted">Gestão inteligente do seu capital em nuvem.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0">
            <div className="glass-card px-6 py-4 flex flex-col min-w-[200px] border-amber-500/20">
              <span className="stat-label flex items-center gap-2"><Wallet size={14} className="text-amber-500" /> Disponível para Aplicação</span>
              <span className="stat-value text-amber-400">R$ {profile?.balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
                  <h3 className="outfit text-xl mb-1">Receber Pix</h3>
                  <p className="text-muted text-sm">Adicione saldo via nuvem instantaneamente.</p>
                </div>
                
                <div onClick={() => setModalType('pix_send')} className="glass-card stat-card cursor-pointer hover:border-blue-500/50 group">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <SendHorizontal className="text-blue-500" />
                  </div>
                  <h3 className="outfit text-xl mb-1">Enviar Pix</h3>
                  <p className="text-muted text-sm">Transferência segura entre carteiras Girafa.</p>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="outfit text-2xl mb-6">Investimentos Disponíveis</h3>
                <div className="grid-cards">
                  {availableInvestments.slice(0, 4).map(inv => (
                    <InvestmentCard 
                      key={inv.id} 
                      investment={inv} 
                      onEdit={() => { setEditingInvestment(inv); setActiveTab('investments'); }}
                      onDelete={() => handleDeleteInvestment(inv.id)}
                    />
                  ))}
                </div>
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
                      <label className="text-sm text-muted">Custo do Investimento (R$)</label>
                      <input type="number" name="cost" defaultValue={editingInvestment?.cost || ''} required placeholder="Ex: 500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Taxa de Saque (%)</label>
                      <input type="text" value="5%" disabled className="bg-white/5 opacity-50" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-muted">Rendimento no Período (%)</label>
                      <input type="number" name="yieldPercent" defaultValue={editingInvestment?.yield_percent || ''} required placeholder="Ex: 15" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted">Montante Final (R$)</label>
                    <input type="number" name="finalAmount" defaultValue={editingInvestment?.final_amount || ''} required placeholder="Ex: 650" />
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
                    onInvest={() => { setSelectedInvestment(inv); setInvestAmount(inv.cost); setModalType('investir'); }} 
                    onEdit={() => { setEditingInvestment(inv); setActiveTab('investments'); }}
                    onDelete={() => handleDeleteInvestment(inv.id)}
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

          {activeTab === 'reports' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="glass-card p-8">
                  <h3 className="outfit text-2xl mb-8">Relatório Consolidado (Cloud)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-muted text-sm uppercase">
                          <th className="py-4 px-4 font-medium">Aplicação</th>
                          <th className="py-4 px-4 font-medium">Resgate</th>
                          <th className="py-4 px-4 font-medium">Investido</th>
                          <th className="py-4 px-4 font-medium">Rendimento</th>
                          <th className="py-4 px-4 font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myInvestments.map(inv => (
                          <tr key={inv.active_id} className="border-b border-white/5">
                            <td className="py-4 px-4">{new Date(inv.invested_at).toLocaleDateString()}</td>
                            <td className="py-4 px-4">
                              {(() => {
                                const d = new Date(inv.invested_at);
                                d.setDate(d.getDate() + inv.validity);
                                return d.toLocaleDateString();
                              })()}
                            </td>
                            <td className="py-4 px-4">R$ {inv.invested_amount.toLocaleString()}</td>
                            <td className="py-4 px-4 text-green-400">+{inv.yield_percent}%</td>
                            <td className="py-4 px-4 font-bold">R$ {inv.final_amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals - Perfil, Pix, Investir */}
      <AnimatePresence>
        {modalType && (
          <div className="modal-backdrop">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-content relative">
              <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-muted hover:text-white border-none bg-transparent cursor-pointer"><X size={24} /></button>
              
              {modalType === 'profile' && (
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
              )}

              {modalType === 'pix_receive' && (
                <div className="text-center space-y-6">
                  <h3 className="outfit text-2xl">Depositar via Pix</h3>
                  {pixStatus === 'idle' ? (
                    <>
                      <input type="number" value={pixAmount} onChange={(e) => setPixAmount(e.target.value)} placeholder="Valor (R$)" autoFocus />
                      <div className="bg-white p-4 rounded-2xl mx-auto w-48 h-48"><img src="/qr.png" className="w-full h-full object-contain" /></div>
                      <button onClick={handleReceivePix} className="primary-btn w-full justify-center">Confirmar Pagamento</button>
                    </>
                  ) : <div className="py-12"><Loader2 className="animate-spin mx-auto text-amber-500 mb-4" /> Verificando nuvem...</div>}
                </div>
              )}

              {modalType === 'investir' && (
                <div className="space-y-6">
                  <h3 className="outfit text-2xl text-center">Confirmar Aplicação</h3>
                  <div className="bg-white/5 p-4 rounded-xl text-center">
                    <p className="text-sm text-muted">Custo do Título</p>
                    <p className="text-2xl font-bold text-amber-500">R$ {Number(investAmount).toLocaleString()}</p>
                    <p className="text-xs text-muted mt-2">Saldo Disponível: R$ {profile?.balance?.toLocaleString()}</p>
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
                  <h3 className="outfit text-2xl text-center">Confirmação de Resgate de Ativo</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm"><span className="text-muted">Valor Principal</span><span>R$ {Number(selectedInvestment.invested_amount).toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted">Rendimento Acumulado</span><span className="text-green-400">+ R$ {calculateAccruedEarnings(selectedInvestment).toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm text-red-400"><span className="opacity-70">Taxa de Saque (5%)</span><span>- R$ {((Number(selectedInvestment.invested_amount) + calculateAccruedEarnings(selectedInvestment)) * 0.05).toFixed(2)}</span></div>
                    
                    <div className="bg-white/5 p-6 rounded-2xl text-center border border-amber-500/20 mt-6">
                      <p className="text-xs text-muted mb-1 opacity-60 uppercase tracking-widest">Valor Líquido a Receber</p>
                      <p className="text-3xl font-bold text-amber-500 outfit">
                        R$ {((Number(selectedInvestment.invested_amount) + calculateAccruedEarnings(selectedInvestment)) * 0.95).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 p-4 rounded-xl flex items-center gap-4 text-xs text-blue-200 border border-blue-500/20">
                    <CheckCircle2 size={24} className="text-blue-500 shrink-0" />
                    O valor será enviado instantaneamente para sua chave Pix: <br />
                    <strong className="text-white">{profile?.pix_key}</strong>
                  </div>

                  {Number(calculateAccruedEarnings(selectedInvestment)) < 20 && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-4 text-xs text-red-200">
                      <AlertCircle size={24} className="text-red-500 shrink-0" />
                      O saque só é permitido após atingir o lucro mínimo de R$ 20,00. Seu lucro atual é de R$ {Number(calculateAccruedEarnings(selectedInvestment)).toFixed(2)}.
                    </div>
                  )}

                  {pixStatus === 'idle' ? (
                    <button 
                      onClick={() => handleSacar(selectedInvestment)} 
                      disabled={Number(calculateAccruedEarnings(selectedInvestment)) < 20}
                      className="primary-btn w-full justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {Number(calculateAccruedEarnings(selectedInvestment)) < 20 ? 'Lucro Mínimo não atingido' : 'Confirmar Saque na Nuvem'}
                    </button>
                  ) : (
                    <div className="text-center py-6">
                      <Loader2 className="animate-spin mx-auto text-amber-500 mb-4" size={32} />
                      <p className="text-muted outfit uppercase tracking-widest text-xs">Aguarde... Comunicando com a Nuvem</p>
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

const AuthView = ({ onNotify }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('FORM SUBMITTED', { isLogin, email, phone, fullName, passwordLength: password.length });
    setLoading(true);
    try {
      if (!email || !password || (!isLogin && (!fullName || !phone))) {
        throw new Error('Todos os campos são obrigatórios!');
      }
      if (isLogin) {
        console.log('Tentando Login...');
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.error('Erro de Login:', error);
          const msg = error.message.toLowerCase();
          if (msg.includes('confirm') || (error.status === 400 && msg.includes('not confirmed'))) {
             throw new Error('STATUS_UNCONFIRMED: Verifique seu e-mail para confirmar a conta.');
          }
          throw error;
        }
        console.log('Login OK!', data);
      } else {
        console.log('Tentando Cadastro...');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, phone_number: phone } }
        });
        if (error) {
          console.error('Erro de Cadastro:', error);
          throw error;
        }
        console.log('Cadastro OK!', data);
        onNotify('Verifique seu e-mail para confirmar o cadastro!');
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card w-full max-w-md p-10 relative z-10">
        <div className="text-center mb-10">
          <img src="/logo.png" className="w-20 h-20 mx-auto rounded-3xl mb-6 shadow-2xl" />
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
          <button type="submit" disabled={loading} className="primary-btn w-full justify-center py-4 text-lg">
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted">
          {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}
          <button onClick={() => setIsLogin(!isLogin)} className="text-amber-500 font-bold ml-2 bg-transparent border-none cursor-pointer">
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

const InvestmentCard = ({ investment, onInvest, onSacar, onDelete, onEdit }) => {
  return (
    <div className="glass-card p-6 flex flex-col h-full hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-2">
          <div className="bg-amber-500/10 p-3 rounded-2xl">
            <TrendingUp className="text-amber-500" />
          </div>
          {onEdit && (
            <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 border-none cursor-pointer hover:bg-amber-500/30">
              <Pencil size={20} />
            </button>
          )}
          {onDelete && (
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="bg-red-500/10 p-3 rounded-2xl text-red-400 border-none cursor-pointer hover:bg-red-500/30">
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-6 flex-1">
        <h4 className="outfit text-xl mb-4">Investimento Ouro</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm"><span className="text-muted">Custo</span><span className="font-bold">R$ {investment.cost.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Validade</span><span className="font-bold">{investment.validity} dias</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted">Rendimento</span><span className="text-green-400 font-bold">+{investment.yield_percent}%</span></div>
          <div className="flex justify-between text-lg mt-4 pt-4 border-t border-white/5"><span className="font-semibold outfit">Retorno</span><span className="text-amber-400 font-bold">R$ {investment.final_amount.toLocaleString()}</span></div>
        </div>
      </div>
      
      {onInvest && (
        <button onClick={() => onInvest(investment)} className="primary-btn w-full justify-center text-base py-3 font-bold mt-4">
          Investir agora
        </button>
      )}
    </div>
  );
};

export default App;
