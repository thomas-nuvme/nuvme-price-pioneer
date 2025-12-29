import { useState } from 'react';
import { Customer, segmentoLabels, statusColors } from '@/utils/csData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Search, Plus, ChevronUp, ChevronDown } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

type SortField = 'name' | 'segmentoNuvme' | 'plano' | 'status' | 'mrrValor' | 'billingUSD' | 'healthScore';
type SortDirection = 'asc' | 'desc';

export function CustomerTable({ customers, onEdit, onDelete, onAdd }: CustomerTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [segmentoFilter, setSegmentoFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const filteredCustomers = customers
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.contato.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesSegmento = segmentoFilter === 'all' || c.segmentoNuvme === segmentoFilter;
      return matchesSearch && matchesStatus && matchesSegmento;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      'Saudável': 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
      'Atenção': 'bg-amber-500/20 text-amber-700 border-amber-500/30',
      'Crítico': 'bg-red-500/20 text-red-700 border-red-500/30',
    };
    return variants[status] || '';
  };

  const getSegmentoBadge = (segmento: string) => {
    const variants: Record<string, string> = {
      'AAA': 'bg-purple-500/20 text-purple-700 border-purple-500/30',
      'AA': 'bg-blue-500/20 text-blue-700 border-blue-500/30',
      'A': 'bg-teal-500/20 text-teal-700 border-teal-500/30',
      'B': 'bg-orange-500/20 text-orange-700 border-orange-500/30',
      'C': 'bg-gray-500/20 text-gray-700 border-gray-500/30',
    };
    return variants[segmento] || '';
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 60) return 'text-emerald-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente ou contato..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="Saudável">Saudável</SelectItem>
            <SelectItem value="Atenção">Atenção</SelectItem>
            <SelectItem value="Crítico">Crítico</SelectItem>
          </SelectContent>
        </Select>

        <Select value={segmentoFilter} onValueChange={setSegmentoFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Segmentos</SelectItem>
            <SelectItem value="AAA">AAA - Enterprise</SelectItem>
            <SelectItem value="AA">AA - Growth</SelectItem>
            <SelectItem value="A">A - Stable</SelectItem>
            <SelectItem value="B">B - At-risk</SelectItem>
            <SelectItem value="C">C - Dormant</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead 
                className="cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Cliente <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('segmentoNuvme')}
              >
                <div className="flex items-center gap-1">
                  Segmento <SortIcon field="segmentoNuvme" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('plano')}
              >
                <div className="flex items-center gap-1">
                  Plano <SortIcon field="plano" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/80"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status <SortIcon field="status" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/80 text-right"
                onClick={() => handleSort('mrrValor')}
              >
                <div className="flex items-center justify-end gap-1">
                  MRR (R$) <SortIcon field="mrrValor" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/80 text-right"
                onClick={() => handleSort('billingUSD')}
              >
                <div className="flex items-center justify-end gap-1">
                  Billing USD <SortIcon field="billingUSD" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/80 text-center"
                onClick={() => handleSort('healthScore')}
              >
                <div className="flex items-center justify-center gap-1">
                  Health <SortIcon field="healthScore" />
                </div>
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map(customer => (
              <TableRow key={customer.id} className="hover:bg-muted/30">
                <TableCell>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    {customer.contato && (
                      <p className="text-sm text-muted-foreground">{customer.contato}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getSegmentoBadge(customer.segmentoNuvme)}>
                    {customer.segmentoNuvme} - {segmentoLabels[customer.segmentoNuvme]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{customer.plano}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {customer.mrrValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${customer.billingUSD.toLocaleString('en-US')}
                </TableCell>
                <TableCell className="text-center">
                  <span className={`font-bold ${getHealthScoreColor(customer.healthScore)}`}>
                    {customer.healthScore.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(customer)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(customer.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        Mostrando {filteredCustomers.length} de {customers.length} clientes
      </p>
    </div>
  );
}
