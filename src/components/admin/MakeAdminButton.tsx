
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

const MakeAdminButton = () => {
  return (
    <Alert className="mt-4">
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>Admin Access Only</AlertTitle>
      <AlertDescription>
        This area is restricted to authorized administrators only. 
        Please contact management if you need access.
      </AlertDescription>
    </Alert>
  );
};

export default MakeAdminButton;
