import { Customer, segmentoLabels, statusColors, segmentoColors } from '@/utils/csData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, AlertTriangle, TrendingUp, Building2, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface CSOverviewProps {
  customers: Customer[];
}

export function CSOverview({ customers }: CSOverviewProps) {
  // Calculate metrics
  const totalCustomers = customers.length;
  const totalMRR = customers.reduce((sum, c) => sum + c.mrrValor, 0);
  const totalBillingUSD = customers.reduce((sum, c) => sum + c.billingUSD, 0);
  const avgHealthScore = customers.reduce((sum, c) => sum + c.healthScore, 0) / totalCustomers;
  
  const statusCounts = {
    'Saudável': customers.filter(c => c.status === 'Saudável').length,
    'Atenção': customers.filter(c => c.status === 'Atenção').length,
    'Crítico': customers.filter(c => c.status === 'Crítico').length,
  };

  const segmentoCounts = {
    'AAA': customers.filter(c => c.segmentoNuvme === 'AAA').length,
    'AA': customers.filter(c => c.segmentoNuvme === 'AA').length,
    'A': customers.filter(c => c.segmentoNuvme === 'A').length,
    'B': customers.filter(c => c.segmentoNuvme === 'B').length,
    'C': customers.filter(c => c.segmentoNuvme === 'C').length,
  };

  const planoCounts: Record<string, number> = {};
  customers.forEach(c => {
    planoCounts[c.plano] = (planoCounts[c.plano] || 0) + 1;
  });

  const ingramCount = customers.filter(c => c.ingram).length;

  const statusData = [
    { name: 'Saudável', value: statusCounts['Saudável'], color: '#10b981' },
    { name: 'Atenção', value: statusCounts['Atenção'], color: '#f59e0b' },
    { name: 'Crítico', value: statusCounts['Crítico'], color: '#ef4444' },
  ];

  const segmentoData = Object.entries(segmentoCounts).map(([key, value]) => ({
    name: `${key} - ${segmentoLabels[key]}`,
    value,
    color: key === 'AAA' ? '#8b5cf6' : key === 'AA' ? '#3b82f6' : key === 'A' ? '#14b8a6' : key === 'B' ? '#f97316' : '#6b7280'
  }));

  const planoData = Object.entries(planoCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Clientes</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">MRR Total</p>
                <p className="text-xl font-bold">R$ {totalMRR.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Billing AWS</p>
                <p className="text-xl font-bold">$ {totalBillingUSD.toLocaleString('en-US', { minimumFractionDigits: 0 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Em Atenção</p>
                <p className="text-2xl font-bold">{statusCounts['Atenção']}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Críticos</p>
                <p className="text-2xl font-bold">{statusCounts['Crítico']}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 border-teal-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <Activity className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Health Score Médio</p>
                <p className="text-2xl font-bold">{avgHealthScore.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status dos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Segmento Nuvme</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={segmentoData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {segmentoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={planoData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parceria Ingram</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Clientes Ingram</span>
                  <span className="font-medium">{ingramCount} de {totalCustomers}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-teal-500 rounded-full transition-all"
                    style={{ width: `${(ingramCount / totalCustomers) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">
                {((ingramCount / totalCustomers) * 100).toFixed(0)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumo por UF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(
                customers.reduce((acc, c) => {
                  acc[c.uf] = (acc[c.uf] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).sort((a, b) => b[1] - a[1]).map(([uf, count]) => (
                <div key={uf} className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
                  <span className="font-medium">{uf}</span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
