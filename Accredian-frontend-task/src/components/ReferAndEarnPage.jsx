import React from 'react';
import { useState } from 'react';
import axios from 'axios';
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
    friendName: '',
    friendEmail: '',
    courseName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.referrerName) newErrors.referrerName = 'Required';
    if (!formData.referrerEmail) {
      newErrors.referrerEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.referrerEmail)) {
      newErrors.referrerEmail = 'Invalid email';
    }
    if (!formData.friendName) newErrors.friendName = 'Required';
    if (!formData.friendEmail) {
      newErrors.friendEmail = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.friendEmail)) {
      newErrors.friendEmail = 'Invalid email';
    }
    if (!formData.courseName) newErrors.courseName = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus({ loading: true, error: null });
      try {
        const response = await axios.post('/api/refer', {
          referrerName: formData.referrerName,
          referrerEmail: formData.referrerEmail,
          friendName: formData.friendName,
          friendEmail: formData.friendEmail,
          courseName: formData.courseName
        });
        console.log('Referral submitted successfully:', response.data);
        setIsOpen(false);
        setFormData({
          referrerName: '',
          referrerEmail: '',
          friendName: '',
          friendEmail: '',
          courseName: ''
        });
      } catch (error) {
        console.error('Error submitting referral:', error);
        setSubmitStatus({ 
          loading: false, 
          error: error.response?.data?.message || 'Failed to submit referral. Please try again.' 
        });
      }
      setSubmitStatus({ loading: false, error: null });
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
                <Label htmlFor="friendName">Friend's Name</Label>
                <Input
                  id="friendName"
                  name="friendName"
                  value={formData.friendName}
                  onChange={handleChange}
                  className={errors.friendName ? 'border-red-500' : ''}
                />
                {errors.friendName && <p className="text-red-500 text-sm">{errors.friendName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="friendEmail">Friend's Email</Label>
                <Input
                  id="friendEmail"
                  name="friendEmail"
                  type="email"
                  value={formData.friendEmail}
                  onChange={handleChange}
                  className={errors.friendEmail ? 'border-red-500' : ''}
                />
                {errors.friendEmail && <p className="text-red-500 text-sm">{errors.friendEmail}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className={errors.courseName ? 'border-red-500' : ''}
                />
                {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
              </div>
              
              {submitStatus.error && (
                <p className="text-red-500 text-sm">{submitStatus.error}</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? 'Submitting...' : 'Submit Referral'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReferAndEarnPage;