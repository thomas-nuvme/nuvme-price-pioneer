import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Customer, initialCustomers } from '@/utils/csData';
import { CSOverview } from '@/components/cs/CSOverview';
import { CustomerTable } from '@/components/cs/CustomerTable';
import { CustomerForm } from '@/components/cs/CustomerForm';
import { HealthScoreView } from '@/components/cs/HealthScoreView';
import { LayoutDashboard, Users, Activity, Settings } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const STORAGE_KEY = 'nuvme-cs-customers';

export default function DashboardCS() {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCustomers;
  });
  
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }, [customers]);

  const handleSaveCustomer = (customer: Customer) => {
    setCustomers(prev => {
      const existing = prev.find(c => c.id === customer.id);
      if (existing) {
        return prev.map(c => c.id === customer.id ? customer : c);
      }
      return [...prev, customer];
    });
    toast.success(editingCustomer ? 'Cliente atualizado!' : 'Cliente adicionado!');
    setEditingCustomer(undefined);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(undefined);
    setIsFormOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setCustomers(prev => prev.filter(c => c.id !== deleteId));
      toast.success('Cliente removido!');
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
          Dashboard CS
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerenciamento da carteira de clientes Nuvme
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-[600px] grid-cols-4 h-12">
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Health Score</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Configurações</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CSOverview customers={customers} />
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <CustomerTable
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            onAdd={handleAddCustomer}
          />
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <HealthScoreView customers={customers} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-4">Dados da Carteira</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Total de clientes</p>
                    <p className="text-sm text-muted-foreground">Clientes cadastrados no sistema</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">{customers.length}</span>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const data = JSON.stringify(customers, null, 2);
                      const blob = new Blob([data], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'carteira-nuvme.json';
                      a.click();
                      toast.success('Dados exportados!');
                    }}
                    className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Exportar Dados (JSON)
                  </button>
                  
                  <button
                    onClick={() => {
                      if (confirm('Isso irá resetar todos os dados para os valores iniciais. Continuar?')) {
                        setCustomers(initialCustomers);
                        toast.success('Dados resetados!');
                      }
                    }}
                    className="flex-1 px-4 py-3 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    Resetar Dados
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-4">Sobre o Health Score</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>O Health Score é calculado com base nos seguintes indicadores:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Segmento Nuvme (15%)</strong> - AAA a C</li>
                  <li><strong>MRR/Valor (10%)</strong> - Receita recorrente</li>
                  <li><strong>Qtd Serviços (20%)</strong> - Quantidade de serviços utilizados</li>
                  <li><strong>Nº Tickets (20%)</strong> - Engajamento via tickets</li>
                  <li><strong>Billing USD AWS (10%)</strong> - Volume de uso AWS</li>
                  <li><strong>Ingram (10%)</strong> - Parceria Ingram</li>
                  <li><strong>Horas 2025 (15%)</strong> - Horas de suporte consumidas</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Customer Form Modal */}
      <CustomerForm
        customer={editingCustomer}
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCustomer(undefined);
        }}
        onSave={handleSaveCustomer}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
