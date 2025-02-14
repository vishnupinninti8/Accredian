import React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Gift, Users, Sparkles } from 'lucide-react';

const ReferAndEarnPage = () => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
    courseInterest: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.referrerName) newErrors.referrerName = 'Required';
    if (!formData.referrerEmail) {
      newErrors.referrerEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.referrerEmail)) {
      newErrors.referrerEmail = 'Invalid email';
    }
    if (!formData.refereeName) newErrors.refereeName = 'Required';
    if (!formData.refereeEmail) {
      newErrors.refereeEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.refereeEmail)) {
      newErrors.refereeEmail = 'Invalid email';
    }
    if (!formData.courseInterest) newErrors.courseInterest = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsOpen(false);
      setFormData({
        referrerName: '',
        referrerEmail: '',
        refereeName: '',
        refereeEmail: '',
        courseInterest: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
          Refer a Friend, Earn Rewards
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Share the gift of learning and get rewarded. Earn exciting rewards for every successful referral!
        </p>
        
        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <Gift className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Earn Rewards</CardTitle>
              <CardDescription>Get up to $100 in rewards for each successful referral</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Help Friends Learn</CardTitle>
              <CardDescription>Share valuable learning opportunities with your network</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur">
            <CardHeader>
              <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Unlock Benefits</CardTitle>
              <CardDescription>Both you and your friend get special course discounts</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Refer Now Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Refer Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Refer a Friend</DialogTitle>
              <DialogDescription>
                Fill in the details below to refer your friend to our courses.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referrerName">Your Name</Label>
                <Input
                  id="referrerName"
                  name="referrerName"
                  value={formData.referrerName}
                  onChange={handleChange}
                  className={errors.referrerName ? 'border-red-500' : ''}
                />
                {errors.referrerName && <p className="text-red-500 text-sm">{errors.referrerName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referrerEmail">Your Email</Label>
                <Input
                  id="referrerEmail"
                  name="referrerEmail"
                  type="email"
                  value={formData.referrerEmail}
                  onChange={handleChange}
                  className={errors.referrerEmail ? 'border-red-500' : ''}
                />
                {errors.referrerEmail && <p className="text-red-500 text-sm">{errors.referrerEmail}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refereeName">Friend's Name</Label>
                <Input
                  id="refereeName"
                  name="refereeName"
                  value={formData.refereeName}
                  onChange={handleChange}
                  className={errors.refereeName ? 'border-red-500' : ''}
                />
                {errors.refereeName && <p className="text-red-500 text-sm">{errors.refereeName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refereeEmail">Friend's Email</Label>
                <Input
                  id="refereeEmail"
                  name="refereeEmail"
                  type="email"
                  value={formData.refereeEmail}
                  onChange={handleChange}
                  className={errors.refereeEmail ? 'border-red-500' : ''}
                />
                {errors.refereeEmail && <p className="text-red-500 text-sm">{errors.refereeEmail}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="courseInterest">Course of Interest</Label>
                <Input
                  id="courseInterest"
                  name="courseInterest"
                  value={formData.courseInterest}
                  onChange={handleChange}
                  className={errors.courseInterest ? 'border-red-500' : ''}
                />
                {errors.courseInterest && <p className="text-red-500 text-sm">{errors.courseInterest}</p>}
              </div>
              
              <Button type="submit" className="w-full">
                Submit Referral
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReferAndEarnPage;