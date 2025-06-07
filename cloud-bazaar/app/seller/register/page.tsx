"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ArrowLeft, FileText, Upload, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function SellerRegistrationPage() {
  const { toast } = useToast()
  const { register } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [registrationError, setRegistrationError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
    description: "",
    phoneNumber: "",
    taxId: "",
    website: "",
    acceptTerms: false,
    acceptPrivacy: false,
  })
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
    phoneNumber: "",
    acceptTerms: "",
    acceptPrivacy: "",
  })

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }

    // Clear registration error when user makes changes
    if (registrationError) {
      setRegistrationError("")
    }
  }

  const validateStep1 = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
      isValid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep2 = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
      isValid = false
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required"
      isValid = false
    }

    if (!formData.businessType) {
      newErrors.businessType = "Business type is required"
      isValid = false
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep3 = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
      isValid = false
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = "You must accept the privacy policy"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return
    } else if (step === 2) {
      if (!validateStep2()) return
    }

    if (step < 3) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRegistrationError("")

    if (!validateStep3()) return

    setIsSubmitting(true)

    try {
      // Register the seller
      const fullName = `${formData.firstName} ${formData.lastName}`
      await register(fullName, formData.email, formData.password, "seller")
    } catch (error) {
      if (error instanceof Error) {
        setRegistrationError(error.message)
      } else {
        setRegistrationError("Registration failed. Please try again.")
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Become a Seller on Cloud Bazaar</h1>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <span className="text-sm mt-1">Account</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className="text-sm mt-1">Business</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <span className="text-sm mt-1">Verification</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Create your seller account with your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      required
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      required
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  <p className="text-xs text-muted-foreground">We'll send a verification link to this email</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      required
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      required
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Password requirements:</p>
                  <ul className="list-disc pl-4 space-y-1 mt-1">
                    <li>At least 8 characters long</li>
                    <li>Must include at least one uppercase letter</li>
                    <li>Must include at least one number</li>
                    <li>Must include at least one special character</li>
                  </ul>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Tell us about your business to set up your seller profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateFormData("businessName", e.target.value)}
                    required
                  />
                  {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">
                    Business Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => updateFormData("businessAddress", e.target.value)}
                    required
                  />
                  {errors.businessAddress && <p className="text-sm text-red-500">{errors.businessAddress}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">
                      Business Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => updateFormData("businessType", value)}
                    >
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                        <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && <p className="text-sm text-red-500">{errors.businessType}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                      required
                    />
                    {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell customers about your business, products, and services"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className="min-h-32"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Business Registration Number</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => updateFormData("taxId", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://"
                      value={formData.website}
                      onChange={(e) => updateFormData("website", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Verification & Documents</CardTitle>
                <CardDescription>Submit documents for verification and accept terms of service.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Business License or Registration</Label>
                  <div className="border border-dashed rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-sm font-medium mb-1">Upload business documents</h3>
                      <p className="text-xs text-muted-foreground mb-3">PDF, JPG, or PNG files up to 5MB</p>
                      <Button type="button" variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" /> Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ID Verification</Label>
                  <div className="border border-dashed rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-sm font-medium mb-1">Upload ID verification</h3>
                      <p className="text-xs text-muted-foreground mb-3">Passport, Driver's License, or ID Card</p>
                      <Button type="button" variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" /> Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2 border p-4 rounded-md">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => updateFormData("acceptTerms", checked === true)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept Terms and Conditions
                        </label>
                        <p className="text-xs text-muted-foreground">
                          I agree to the Cloud Bazaar{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link href="/seller/terms" className="text-primary hover:underline">
                            seller agreement
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    {errors.acceptTerms && <p className="text-sm text-red-500">{errors.acceptTerms}</p>}
                  </div>

                  <div className="space-y-2 border p-4 rounded-md">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) => updateFormData("acceptPrivacy", checked === true)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="privacy"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept Privacy Policy
                        </label>
                        <p className="text-xs text-muted-foreground">
                          I have read and agree to the{" "}
                          <Link href="/privacy" className="text-primary hover:underline">
                            privacy policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    {errors.acceptPrivacy && <p className="text-sm text-red-500">{errors.acceptPrivacy}</p>}
                  </div>
                </div>

                {registrationError && (
                  <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">{registrationError}</div>
                )}
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div>
                <p className="text-sm">
                  Already have a seller account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            )}

            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Reach Millions of Customers</h3>
          <p className="text-muted-foreground">
            Gain access to Cloud Bazaar's growing customer base from across the country.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Easy-to-Use Seller Tools</h3>
          <p className="text-muted-foreground">
            Manage orders, inventory, and analytics with our intuitive seller dashboard.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
          <p className="text-muted-foreground">
            Get paid securely and on time with our trusted payment processing system.
          </p>
        </div>
      </div>
    </div>
  )
}

