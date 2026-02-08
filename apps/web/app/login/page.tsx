'use client'

import React from 'react'
import Logo from '@/components/ui/Logo'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className="min-h-screen gradient-bg dark:bg-dark bg-slate-50 flex flex-col items-center justify-center px-4 py-8">
            {/* Logo */}
            <div className="mb-8">
                <Logo />
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md">
                <div className="NavBG dark:NavBG bg-white/80 dark:bg-white/5 rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 dark:border-white/10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                            Sign in to your EduStream account
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all"
                                    placeholder="Enter your password"
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 text-main focus:ring-main focus:ring-offset-0"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                                >
                                    Remember me
                                </label>
                            </div>
                            <a
                                href="#"
                                className="text-sm text-main hover:text-main/80 transition-colors font-medium"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-main hover:bg-main/90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-main/30 hover:shadow-main/50"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-slate-300 dark:border-white/10"></div>
                        <span className="px-4 text-sm text-slate-500 dark:text-slate-400">or</span>
                        <div className="flex-1 border-t border-slate-300 dark:border-white/10"></div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-main hover:text-main/80 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="text-center text-slate-600 dark:text-slate-500 text-sm mt-6">
                    By signing in, you agree to our{' '}
                    <a href="#" className="text-main hover:text-main/80">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-main hover:text-main/80">Privacy Policy</a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage