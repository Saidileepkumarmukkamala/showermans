
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MakeAdminButton = () => {
  return (
    <div className="space-y-4 mt-4">
      <Alert>
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Admin Access Only</AlertTitle>
        <AlertDescription>
          This area is restricted to authorized administrators only.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardContent className="pt-6">
          <p className="mb-2 font-medium">Use these credentials to login as admin:</p>
          <div className="bg-muted p-2 rounded-md font-mono text-sm">
            <p>Username: adminnn</p>
            <p>Password: adminshower</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MakeAdminButton;
