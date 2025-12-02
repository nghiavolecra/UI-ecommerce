import { useState } from "react";
import { ArrowLeft, Calendar, Clock, CreditCard, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const timeSlots = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

const dates = [
  { date: "15", day: "Mon", available: true },
  { date: "16", day: "Tue", available: false },
  { date: "17", day: "Wed", available: true },
  { date: "18", day: "Thu", available: true },
  { date: "19", day: "Fri", available: true },
  { date: "20", day: "Sat", available: false },
  { date: "21", day: "Sun", available: false }
];

interface BookingFlowProps {
  onBack: () => void;
}

export function BookingFlow({ onBack }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("17");
  const [selectedTime, setSelectedTime] = useState("6:00 AM");
  const [bookingComplete, setBookingComplete] = useState(false);

  const handlePayment = () => {
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-8 bg-card border-border rounded-2xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-white mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-6">
            Your training session with Marcus Steel has been booked for Nov {selectedDate} at {selectedTime}
          </p>
          <Button onClick={onBack} className="w-full h-12 rounded-2xl bg-primary">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={onBack} size="icon" variant="ghost">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white">Book Session</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`flex-1 h-1 rounded-full ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Date */}
      {step === 1 && (
        <div className="p-6">
          <h2 className="text-white mb-2">Select Date</h2>
          <p className="text-muted-foreground mb-6">Choose your preferred training day</p>

          <div className="grid grid-cols-7 gap-2 mb-8">
            {dates.map((d) => (
              <button
                key={d.date}
                onClick={() => d.available && setSelectedDate(d.date)}
                disabled={!d.available}
                className={`p-3 rounded-2xl transition-all ${
                  selectedDate === d.date
                    ? "bg-primary text-white"
                    : d.available
                    ? "bg-card text-white border border-border hover:border-primary"
                    : "bg-muted/20 text-muted-foreground cursor-not-allowed"
                }`}
              >
                <div className="text-xs mb-1">{d.day}</div>
                <div>{d.date}</div>
              </button>
            ))}
          </div>

          <h3 className="text-white mb-4">Available Times</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {timeSlots.map((time) => (
              <Button
                key={time}
                onClick={() => setSelectedTime(time)}
                variant={selectedTime === time ? "default" : "secondary"}
                className="h-12 rounded-2xl"
              >
                <Clock className="w-4 h-4 mr-2" />
                {time}
              </Button>
            ))}
          </div>

          <Button onClick={() => setStep(2)} className="w-full h-12 rounded-2xl bg-primary">
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Review */}
      {step === 2 && (
        <div className="p-6">
          <h2 className="text-foreground mb-2">Confirm your session details</h2>
          <p className="text-muted-foreground mb-6">Review booking information</p>

          <Card className="p-5 bg-card border-border rounded-2xl mb-6">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground mb-1">Training Session</h3>
                <p className="text-muted-foreground">with Marcus Steel</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">Nov {selectedDate}, 2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground">60 minutes</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-primary">$80.00</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={() => setStep(1)} variant="secondary" className="flex-1 h-12 rounded-2xl">
              Back
            </Button>
            <Button onClick={() => setStep(3)} className="flex-1 h-12 rounded-2xl bg-primary">
              Continue to Payment
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div className="p-6">
          <h2 className="text-white mb-2">Payment</h2>
          <p className="text-muted-foreground mb-6">Enter your payment details</p>

          <Card className="p-5 bg-card border-border rounded-2xl mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="h-12 rounded-2xl mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="h-12 rounded-2xl mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    className="h-12 rounded-2xl mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="h-12 rounded-2xl mt-2"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/10 border-primary rounded-2xl mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-white">Amount to pay</span>
              </div>
              <span className="text-primary">$80.00</span>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={() => setStep(2)} variant="secondary" className="flex-1 h-12 rounded-2xl">
              Back
            </Button>
            <Button onClick={handlePayment} className="flex-1 h-12 rounded-2xl bg-primary">
              Pay Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}