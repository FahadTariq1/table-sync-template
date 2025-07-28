import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order, OrderFormData } from '@/types/order';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialOrders: Order[] = [
  { id: 10248, customerName: 'VINET', freight: 32.38, shipName: 'Commodities', shipCountry: 'France' },
  { id: 10249, customerName: 'TOMSP', freight: 11.61, shipName: 'Toms Spezialitäten', shipCountry: 'Germany' },
  { id: 10250, customerName: 'HANAR', freight: 6.00, shipName: 'Hanari Carnes', shipCountry: 'Brazil' },
  { id: 10251, customerName: 'VICTE', freight: 41.34, shipName: 'Victuailles en stock', shipCountry: 'France' },
  { id: 10252, customerName: 'SUPRD', freight: 51.30, shipName: 'Suprêmes délices', shipCountry: 'Belgium' },
  { id: 10253, customerName: 'HANAR', freight: 58.17, shipName: 'Hanari Carnes', shipCountry: 'Brazil' },
  { id: 10254, customerName: 'CHOPS', freight: 22.98, shipName: 'Chop-suey Chinese', shipCountry: 'Switzerland' },
  { id: 10255, customerName: 'RICSU', freight: 148.33, shipName: 'Richter Supermarkt', shipCountry: 'Switzerland' },
  { id: 10256, customerName: 'WELLI', freight: 13.97, shipName: 'Wellington Importadora', shipCountry: 'Brazil' },
  { id: 10257, customerName: 'HILAA', freight: 81.91, shipName: 'HILARION-Abastos', shipCountry: 'Venezuela' },
];

const countries = ['France', 'Germany', 'Brazil', 'Belgium', 'Switzerland', 'Venezuela'];

export const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editForm, setEditForm] = useState<OrderFormData>({
    customerName: '',
    freight: '',
    shipName: '',
    shipCountry: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<OrderFormData>({
    customerName: '',
    freight: '',
    shipName: '',
    shipCountry: ''
  });
  
  const { toast } = useToast();

  const handleEdit = (order: Order) => {
    setEditingId(order.id);
    setEditForm({
      customerName: order.customerName,
      freight: order.freight.toString(),
      shipName: order.shipName,
      shipCountry: order.shipCountry
    });
  };

  const handleUpdate = () => {
    if (editingId) {
      setOrders(orders.map(order => 
        order.id === editingId 
          ? {
              ...order,
              customerName: editForm.customerName,
              freight: parseFloat(editForm.freight),
              shipName: editForm.shipName,
              shipCountry: editForm.shipCountry
            }
          : order
      ));
      setEditingId(null);
      toast({ title: "Order updated successfully" });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setAddForm({
      customerName: '',
      freight: '',
      shipName: '',
      shipCountry: ''
    });
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      setOrders(orders.filter(order => !selectedIds.includes(order.id)));
      setSelectedIds([]);
      toast({ title: `${selectedIds.length} order(s) deleted successfully` });
    }
  };

  const handleAdd = () => {
    if (addForm.customerName && addForm.freight && addForm.shipName && addForm.shipCountry) {
      const newOrder: Order = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        customerName: addForm.customerName,
        freight: parseFloat(addForm.freight),
        shipName: addForm.shipName,
        shipCountry: addForm.shipCountry
      };
      setOrders([...orders, newOrder]);
      setIsAdding(false);
      setAddForm({
        customerName: '',
        freight: '',
        shipName: '',
        shipCountry: ''
      });
      toast({ title: "Order added successfully" });
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-2 mb-4">
        <Button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2"
          disabled={isAdding || editingId !== null}
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => selectedIds.length === 1 && handleEdit(orders.find(o => o.id === selectedIds[0])!)}
          disabled={selectedIds.length !== 1 || editingId !== null}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleDelete}
          disabled={selectedIds.length === 0 || editingId !== null}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
        
        <Button 
          onClick={handleUpdate}
          disabled={editingId === null}
          className="flex items-center gap-2"
        >
          <Check className="h-4 w-4" />
          Update
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleCancel}
          disabled={editingId === null && !isAdding}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12"></TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Freight</TableHead>
              <TableHead>Ship Name</TableHead>
              <TableHead>Ship Country</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdding && (
              <TableRow className="bg-blue-50">
                <TableCell></TableCell>
                <TableCell className="text-muted-foreground">New</TableCell>
                <TableCell>
                  <Input
                    value={addForm.customerName}
                    onChange={(e) => setAddForm(prev => ({...prev, customerName: e.target.value}))}
                    placeholder="Customer Name"
                    className="h-8"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={addForm.freight}
                    onChange={(e) => setAddForm(prev => ({...prev, freight: e.target.value}))}
                    placeholder="0.00"
                    className="h-8"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={addForm.shipName}
                    onChange={(e) => setAddForm(prev => ({...prev, shipName: e.target.value}))}
                    placeholder="Ship Name"
                    className="h-8"
                  />
                </TableCell>
                <TableCell>
                  <Select value={addForm.shipCountry} onValueChange={(value) => setAddForm(prev => ({...prev, shipCountry: value}))}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            )}
            
            {orders.map((order) => (
              <TableRow 
                key={order.id}
                className={`${selectedIds.includes(order.id) ? 'bg-blue-50' : ''} ${editingId === order.id ? 'bg-yellow-50' : ''}`}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(order.id)}
                    onChange={() => toggleSelection(order.id)}
                    className="rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {editingId === order.id ? (
                    <Input
                      value={editForm.customerName}
                      onChange={(e) => setEditForm(prev => ({...prev, customerName: e.target.value}))}
                      className="h-8"
                    />
                  ) : (
                    order.customerName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === order.id ? (
                    <Input
                      type="number"
                      value={editForm.freight}
                      onChange={(e) => setEditForm(prev => ({...prev, freight: e.target.value}))}
                      className="h-8"
                    />
                  ) : (
                    `$${order.freight.toFixed(2)}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === order.id ? (
                    <Input
                      value={editForm.shipName}
                      onChange={(e) => setEditForm(prev => ({...prev, shipName: e.target.value}))}
                      className="h-8"
                    />
                  ) : (
                    order.shipName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === order.id ? (
                    <Select value={editForm.shipCountry} onValueChange={(value) => setEditForm(prev => ({...prev, shipCountry: value}))}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    order.shipCountry
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};