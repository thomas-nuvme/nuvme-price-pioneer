import { useState } from 'react';
import { Customer } from '@/utils/csData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CustomerFormProps {
  customer?: Customer;
  open: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

const defaultCustomer: Customer = {
  id: '',
  name: '',
  uf: 'SP',
  segmentoNuvme: 'A',
  plano: 'Essencial',
  segmentoMercado: '',
  fase: '',
  status: 'Saudável',
  missao: '',
  contato: '',
  billingUSD: 0,
  vigenciaContrato: '',
  mrrValor: 0,
  ingram: false,
  sre: false,
  dataDog: false,
  mongoAtlas: false,
  ec2: false,
  rds: false,
  sh: false,
  s3: false,
  ecs: false,
  eks: false,
  oci: false,
  codeBuild: false,
  cloudfront: false,
  lightSail: false,
  dr: false,
  lambda: false,
  bedRock: false,
  observ: false,
  contaCofre: false,
  qtdServicos: 0,
  numTickets: 0,
  horas2025: '0:00',
  csat: '',
  healthScore: 50
};

export function CustomerForm({ customer, open, onClose, onSave }: CustomerFormProps) {
  const [formData, setFormData] = useState<Customer>(customer || { ...defaultCustomer, id: Date.now().toString() });

  const handleChange = (field: keyof Customer, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {customer ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">Informações Básicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Cliente</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uf">UF</Label>
                  <Input
                    id="uf"
                    value={formData.uf}
                    onChange={e => handleChange('uf', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contato">Contato</Label>
                  <Input
                    id="contato"
                    value={formData.contato}
                    onChange={e => handleChange('contato', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segmentoMercado">Segmento de Mercado</Label>
                  <Input
                    id="segmentoMercado"
                    value={formData.segmentoMercado}
                    onChange={e => handleChange('segmentoMercado', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Nuvme Classification */}
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">Classificação Nuvme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Segmento Nuvme</Label>
                  <Select value={formData.segmentoNuvme} onValueChange={v => handleChange('segmentoNuvme', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AAA">AAA - Enterprise</SelectItem>
                      <SelectItem value="AA">AA - Growth</SelectItem>
                      <SelectItem value="A">A - Stable</SelectItem>
                      <SelectItem value="B">B - At-risk</SelectItem>
                      <SelectItem value="C">C - Dormant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Plano</Label>
                  <Select value={formData.plano} onValueChange={v => handleChange('plano', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Together">Together</SelectItem>
                      <SelectItem value="Essencial">Essencial</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Premier">Premier</SelectItem>
                      <SelectItem value="Apenas Setup">Apenas Setup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={v => handleChange('status', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Saudável">Saudável</SelectItem>
                      <SelectItem value="Atenção">Atenção</SelectItem>
                      <SelectItem value="Crítico">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fase">Fase</Label>
                  <Input
                    id="fase"
                    value={formData.fase}
                    onChange={e => handleChange('fase', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missao">Missão</Label>
                  <Input
                    id="missao"
                    value={formData.missao}
                    onChange={e => handleChange('missao', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Financial */}
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">Financeiro</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingUSD">Billing USD AWS</Label>
                  <Input
                    id="billingUSD"
                    type="number"
                    value={formData.billingUSD}
                    onChange={e => handleChange('billingUSD', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mrrValor">MRR (R$)</Label>
                  <Input
                    id="mrrValor"
                    type="number"
                    value={formData.mrrValor}
                    onChange={e => handleChange('mrrValor', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vigenciaContrato">Vigência Contrato</Label>
                  <Input
                    id="vigenciaContrato"
                    value={formData.vigenciaContrato}
                    onChange={e => handleChange('vigenciaContrato', e.target.value)}
                    placeholder="DD/MM/AAAA"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">Serviços AWS</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { key: 'ingram', label: 'Ingram' },
                  { key: 'sre', label: 'SRE' },
                  { key: 'dataDog', label: 'DataDog' },
                  { key: 'mongoAtlas', label: 'Mongo Atlas' },
                  { key: 'ec2', label: 'EC2' },
                  { key: 'rds', label: 'RDS' },
                  { key: 's3', label: 'S3' },
                  { key: 'ecs', label: 'ECS' },
                  { key: 'eks', label: 'EKS' },
                  { key: 'lambda', label: 'Lambda' },
                  { key: 'cloudfront', label: 'CloudFront' },
                  { key: 'codeBuild', label: 'CodeBuild' },
                  { key: 'bedRock', label: 'BedRock' },
                  { key: 'observ', label: 'Observabilidade' },
                  { key: 'dr', label: 'DR' },
                  { key: 'lightSail', label: 'LightSail' },
                ].map(service => (
                  <div key={service.key} className="flex items-center justify-between">
                    <Label htmlFor={service.key} className="text-sm">{service.label}</Label>
                    <Switch
                      id={service.key}
                      checked={formData[service.key as keyof Customer] as boolean}
                      onCheckedChange={v => handleChange(service.key as keyof Customer, v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">Métricas</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qtdServicos">Qtd Serviços</Label>
                  <Input
                    id="qtdServicos"
                    type="number"
                    value={formData.qtdServicos}
                    onChange={e => handleChange('qtdServicos', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numTickets">Nº Tickets</Label>
                  <Input
                    id="numTickets"
                    type="number"
                    value={formData.numTickets}
                    onChange={e => handleChange('numTickets', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horas2025">Horas 2025</Label>
                  <Input
                    id="horas2025"
                    value={formData.horas2025}
                    onChange={e => handleChange('horas2025', e.target.value)}
                    placeholder="HH:MM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthScore">Health Score (%)</Label>
                  <Input
                    id="healthScore"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.healthScore}
                    onChange={e => handleChange('healthScore', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary">
                Salvar
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
