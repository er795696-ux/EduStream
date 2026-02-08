'use client'

import React from 'react'
import Logo from '@/components/ui/Logo'
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import Link from 'next/link'

const SignupPage = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className="min-h-screen gradient-bg dark:bg-dark bg-slate-50 flex flex-col items-center justify-center px-4 py-8">
            {/* Logo */}
            <div className="mb-8">
                <Logo />
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-md">
                <div className="NavBG dark:NavBG bg-white/80 dark:bg-white/5 rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 dark:border-white/10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                            Join EduStream and start your learning journey
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="Create a password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="terms"
                                type="checkbox"
                                className="w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 text-main focus:ring-main focus:ring-offset-0 mt-1"
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                            >
                                I agree to the{' '}
                                <a href="#" className="text-main hover:text-main/80 font-medium">
                                    Terms of Service
                                </a>
                                {' '}and{' '}
                                <a href="#" className="text-main hover:text-main/80 font-medium">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full bg-main hover:bg-main/90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-main/30 hover:shadow-main/50"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-slate-300 dark:border-white/10"></div>
                        <span className="px-4 text-sm text-slate-500 dark:text-slate-400">or</span>
                        <div className="flex-1 border-t border-slate-300 dark:border-white/10"></div>
                    </div>

                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-main hover:text-main/80 font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage