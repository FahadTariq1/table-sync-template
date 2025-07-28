// Update this page (the content is just a fallback if you fail to update the page)

import { OrderTable } from '@/components/OrderTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Order Management</h1>
        <OrderTable />
      </div>
    </div>
  );
};

export default Index;
