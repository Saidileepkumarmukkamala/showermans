
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const AgeVerification = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Check if user has already verified their age
    const hasVerified = localStorage.getItem('age-verified');
    
    if (!hasVerified) {
      // Show the dialog if the user hasn't verified
      setIsOpen(true);
    }
  }, []);
  
  const handleVerify = () => {
    // Save to localStorage to remember verification
    localStorage.setItem('age-verified', 'true');
    setIsOpen(false);
    toast.success("Age verified successfully. Welcome to Showerman's!");
  };
  
  const handleReject = () => {
    toast.error("You must be of legal drinking age to visit this site.");
    // Redirect to a safe page or show a message
    setTimeout(() => {
      window.location.href = 'https://www.responsibility.org/';
    }, 3000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-[#1A1F2C] border-[#D6BCFA] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white text-center">
            Age Verification
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#D6BCFA]/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D6BCFA]">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          
          <p className="text-lg">
            Are you of legal drinking age?
          </p>
          
          <p className="text-sm text-white/70">
            By entering this site, you confirm that you are of legal drinking age in your country of residence.
          </p>
        </div>
        
        <DialogFooter className="flex sm:justify-center gap-4">
          <Button
            variant="outline"
            onClick={handleReject}
            className="border-[#D6BCFA] text-white hover:bg-[#D6BCFA]/20 hover:text-white"
          >
            No, I'm Not
          </Button>
          
          <Button 
            onClick={handleVerify}
            className="bg-[#D6BCFA] text-[#1A1F2C] hover:bg-[#D6BCFA]/90"
          >
            Yes, I Am
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerification;
