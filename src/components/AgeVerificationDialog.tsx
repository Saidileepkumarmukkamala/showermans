
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const AgeVerificationDialog = () => {
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerifiedAge = localStorage.getItem('age-verified');
    if (!hasVerifiedAge) {
      setOpen(true);
    }
  }, []);

  const handleVerify = () => {
    if (!dob) {
      setError('Please select your date of birth');
      return;
    }

    // Calculate age
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 21) {
      setError('You must be 21 years or older to visit this site');
      return;
    }

    // Store verification in localStorage
    localStorage.setItem('age-verified', 'true');
    setOpen(false);
  };

  const handleExit = () => {
    // Redirect to a safe site
    window.location.href = 'https://www.google.com';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-xl">Age Verification Required</DialogTitle>
          <DialogDescription className="text-center">
            You must be 21 years or older to visit Showerman's Fine Wine & Liquor.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex flex-col items-center space-y-4">
          <div className="text-center mb-2">Please confirm your date of birth:</div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !dob && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, 'PPP') : <span>Select date of birth</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="sm:w-1/2" 
            onClick={handleExit}
          >
            Exit Site
          </Button>
          <Button 
            className="sm:w-1/2" 
            onClick={handleVerify}
          >
            Verify & Enter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationDialog;
