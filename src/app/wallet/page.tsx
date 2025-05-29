"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CreditCardIcon, 
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ShieldCheckIcon,
  PlusCircleIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import { useStore } from "@/store/useStore";
import Button from "@/components/Button";
import Card from "@/components/Card";

// Sample transaction data
const TRANSACTIONS = [
  {
    id: "tx-001",
    type: "deposit",
    amount: 500000,
    date: "2023-05-15",
    status: "completed",
    description: "Wallet top-up"
  },
  {
    id: "tx-002",
    type: "payment",
    amount: 150000,
    date: "2023-05-18",
    status: "completed",
    description: "Payment to Budi for House Cleaning"
  },
  {
    id: "tx-003",
    type: "deposit",
    amount: 300000,
    date: "2023-05-20",
    status: "completed",
    description: "Wallet top-up"
  },
  {
    id: "tx-004",
    type: "payment",
    amount: 200000,
    date: "2023-05-22",
    status: "pending",
    description: "Payment to Siti for Garden Maintenance"
  },
  {
    id: "tx-005",
    type: "withdrawal",
    amount: 300000,
    date: "2023-05-25",
    status: "completed",
    description: "Withdrawal to Bank Account"
  }
];

export default function WalletPage() {
  const { currentUser, deductFromWallet } = useStore();
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  
  const handleAddFunds = () => {
    // Logic to add funds would go here
    setShowAddFunds(false);
    setAmount("");
  };
  
  const handleWithdraw = () => {
    // Validate withdrawal amount
    const amountToWithdraw = Number(withdrawAmount);
    
    if (!amountToWithdraw || amountToWithdraw <= 0) {
      setWithdrawError("Please enter a valid amount");
      return;
    }
    
    if (currentUser && amountToWithdraw > currentUser.walletBalance) {
      setWithdrawError("Insufficient balance");
      return;
    }
    
    if (!bankAccount || !bankName || !accountName) {
      setWithdrawError("Please fill in all bank details");
      return;
    }
    
    // Process withdrawal
    const success = deductFromWallet(amountToWithdraw);
    
    if (success) {
      // Reset form and close
      setWithdrawAmount("");
      setBankAccount("");
      setBankName("");
      setAccountName("");
      setWithdrawError("");
      setShowWithdraw(false);
    } else {
      setWithdrawError("Withdrawal failed. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your <span className="text-primary">Wallet</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your funds, view transaction history, and make payments
          </p>
        </div>
        
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl overflow-hidden shadow-md mb-8">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Current Balance</p>
                <h2 className="text-4xl font-bold text-white">
                  Rp {currentUser?.walletBalance.toLocaleString() || 0}
                </h2>
              </div>
              <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCardIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <Button 
                onClick={() => setShowAddFunds(true)}
                className="bg-white text-primary hover:bg-white/90 flex-1"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add Funds
              </Button>
              <Button 
                onClick={() => setShowWithdraw(true)}
                className="bg-white text-primary hover:bg-white/90 flex-1 border border-white"
              >
                <ArrowDownIcon className="h-5 w-5 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </div>
        
        {/* Add Funds Form */}
        {showAddFunds && (
          <Card className="mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Add Funds to Your Wallet</h2>
            
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rp</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  className="block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-gray-200 rounded-lg p-3 flex items-center hover:border-primary cursor-pointer">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <CreditCardIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Credit Card</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 flex items-center hover:border-primary cursor-pointer">
                  <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <BanknotesIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Direct Transfer</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 flex items-center hover:border-primary cursor-pointer">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                    <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">E-Wallet</p>
                    <p className="text-xs text-gray-500">GoPay, OVO, DANA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleAddFunds}>
                Proceed to Payment
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddFunds(false)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}
        
        {/* Withdraw Form */}
        {showWithdraw && (
          <Card className="mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
            
            {withdrawError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center text-sm">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                {withdrawError}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Withdraw
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rp</span>
                </div>
                <input
                  type="number"
                  id="withdrawAmount"
                  className="block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={currentUser?.walletBalance || 0}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Available balance: Rp {currentUser?.walletBalance.toLocaleString() || 0}
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="e.g., BCA, Mandiri, BNI"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountName"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter the name on your bank account"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                id="bankAccount"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter your bank account number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleWithdraw}>
                Withdraw Funds
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowWithdraw(false);
                  setWithdrawError("");
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}
        
        {/* Transactions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {TRANSACTIONS.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`
                            h-8 w-8 rounded-full flex items-center justify-center mr-3 
                            ${transaction.type === 'deposit' ? 'bg-green-100' : 
                              transaction.type === 'withdrawal' ? 'bg-blue-100' : 'bg-gray-100'}
                          `}>
                            {transaction.type === 'deposit' ? (
                              <ArrowUpIcon className="h-4 w-4 text-green-600" />
                            ) : transaction.type === 'withdrawal' ? (
                              <ArrowDownIcon className="h-4 w-4 text-blue-600" />
                            ) : (
                              <CreditCardIcon className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{transaction.description}</div>
                            <div className="text-xs text-gray-500 capitalize">{transaction.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          transaction.type === 'deposit' ? 'text-green-600' : 
                          transaction.type === 'payment' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {transaction.type === 'deposit' ? '+ ' : '- '}
                          Rp {transaction.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h2>
          
          <Card>
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <CreditCardIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-primary">
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <Button variant="outline" className="w-full sm:w-auto">
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Security Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Security</h2>
          
          <Card className="bg-gray-50 p-6">
            <div className="flex items-start">
              <ShieldCheckIcon className="h-8 w-8 text-primary mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Your funds are secure</h3>
                <p className="text-gray-600 mb-4">
                  All transactions are encrypted and processed securely. Your payment information is never stored on our servers.
                </p>
                <Link href="/consul" className="text-primary hover:text-primary-dark font-medium">
                  Learn more about our security measures
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 