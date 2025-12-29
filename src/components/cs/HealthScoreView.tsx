import { Customer, segmentoLabels } from '@/utils/csData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface HealthScoreViewProps {
  customers: Customer[];
}

export function HealthScoreView({ customers }: HealthScoreViewProps) {
  const sortedByHealth = [...customers].sort((a, b) => a.healthScore - b.healthScore);
  
  const criticalCustomers = sortedByHealth.filter(c => c.healthScore < 35);
  const warningCustomers = sortedByHealth.filter(c => c.healthScore >= 35 && c.healthScore < 50);
  const healthyCustomers = sortedByHealth.filter(c => c.healthScore >= 50);

  const getHealthColor = (score: number) => {
    if (score >= 60) return 'bg-emerald-500';
    if (score >= 50) return 'bg-teal-500';
    if (score >= 40) return 'bg-amber-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthTextColor = (score: number) => {
    if (score >= 60) return 'text-emerald-600';
    if (score >= 50) return 'text-teal-600';
    if (score >= 40) return 'text-amber-600';
    if (score >= 30) return 'text-orange-600';
    return 'text-red-600';
  };

  const CustomerHealthCard = ({ customer }: { customer: Customer }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold">{customer.name}</h4>
            <p className="text-sm text-muted-foreground">
              {customer.segmentoNuvme} - {segmentoLabels[customer.segmentoNuvme]}
            </p>
          </div>
          <div className={`text-2xl font-bold ${getHealthTextColor(customer.healthScore)}`}>
            {customer.healthScore.toFixed(0)}%
          </div>
        </div>
        
        <Progress 
          value={customer.healthScore} 
          className="h-2 mb-3"
        />
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tickets:</span>
            <span className="font-medium">{customer.numTickets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horas:</span>
            <span className="font-medium">{customer.horas2025}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Serviços:</span>
            <span className="font-medium">{customer.qtdServicos}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">MRR:</span>
            <span className="font-medium">R$ {customer.mrrValor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <Badge variant="outline" className={
            customer.status === 'Saudável' ? 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30' :
            customer.status === 'Atenção' ? 'bg-amber-500/20 text-amber-700 border-amber-500/30' :
            'bg-red-500/20 text-red-700 border-red-500/30'
          }>
            {customer.status}
          </Badge>
          <span className="text-xs text-muted-foreground">{customer.plano}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Críticos (&lt; 35%)</p>
                <p className="text-3xl font-bold text-red-600">{criticalCustomers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atenção (35-50%)</p>
                <p className="text-3xl font-bold text-amber-600">{warningCustomers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-full">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saudáveis (≥ 50%)</p>
                <p className="text-3xl font-bold text-emerald-600">{healthyCustomers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Customers */}
      {criticalCustomers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Clientes Críticos - Ação Imediata
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {criticalCustomers.map(customer => (
              <CustomerHealthCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>
      )}

      {/* Warning Customers */}
      {warningCustomers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-600">
            <Minus className="h-5 w-5" />
            Clientes em Atenção - Monitorar
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {warningCustomers.map(customer => (
              <CustomerHealthCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>
      )}

      {/* Healthy Customers */}
      {healthyCustomers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-600">
            <TrendingUp className="h-5 w-5" />
            Clientes Saudáveis
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {healthyCustomers.map(customer => (
              <CustomerHealthCard key={customer.id} customer={customer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
