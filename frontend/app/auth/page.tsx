"use client"
import { useState } from 'react';
import { setTokens, logout as doLogout, clearTokens } from '../../lib/auth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Skeleton from '../../components/Skeleton';
import { Phone, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [code, setCode] = useState('');
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  async function requestOtp(e: any) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/v1/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone })
      });
      const data = await res.json();
      
      if (data.dev_otp) {
        setDevOtp(data.dev_otp);
        setOtpSent(true);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function verify(e: any) {
    e.preventDefault();
    setError('');
    setVerifying(true);
    
    try {
      const res = await fetch('/api/v1/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, code })
      });
      const data = await res.json();
      
      if (data.access_token) {
        setTokens(data.access_token, data.refresh_token);
        setTokenInfo(data);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  }

  async function logout(e: any) {
    e.preventDefault();
    await doLogout();
    clearTokens();
    setTokenInfo(null);
    setOtpSent(false);
    setPhone('');
    setCode('');
    setDevOtp('');
  }

  if (tokenInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Successfully Signed In
              </h2>
              <p className="text-gray-600 mb-6">
                Welcome back! You're now logged in.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <pre className="text-xs text-gray-700 overflow-auto">
                  {JSON.stringify(tokenInfo, null, 2)}
                </pre>
              </div>
              <Button variant="danger" fullWidth onClick={logout}>
                Sign Out
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign In
            </h1>
            <p className="text-gray-600">
              Enter your phone number to receive an OTP
            </p>
          </div>

          <Card>
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={requestOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" fullWidth loading={loading}>
                  Send OTP
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                {devOtp && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Development OTP:</strong> {devOtp}
                    </p>
                  </div>
                )}

                <form onSubmit={verify} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP Code
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" fullWidth loading={verifying}>
                    Verify & Sign In
                  </Button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Change phone number
                  </button>
                </form>
              </div>
            )}
          </Card>

          <p className="text-center text-sm text-gray-600 mt-6">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-gray-900 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-gray-900 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}