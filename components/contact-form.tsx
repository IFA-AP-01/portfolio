"use client";

import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { sendEmail } from "@/actions/sendEmail";
import React, { useState, useTransition, useRef } from "react";

const RECAPTCHA_ERROR = "reCAPTCHA is not ready. Please try again later.";
const SUBMISSION_ERROR = "An error occurred while sending the email.";
const SUBMISSION_SUCCESS = "Email sent successfully!";

const labelClasses = "mb-1.5 block text-[14px] font-medium text-ink";

const inputClasses =
  "w-full border border-transparent bg-mist px-3.5 py-3 text-[15px] text-ink placeholder:text-ink/40 outline-none transition-colors duration-300 ease-out focus:border-indigo disabled:opacity-60";

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isLoading = isPending || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    try {
      await verifyAndSendEmail(formData);
    } catch (error) {
      toast.error(SUBMISSION_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyAndSendEmail = async (formData: FormData) => {
    if (!executeRecaptcha) {
      toast.error(RECAPTCHA_ERROR);
      return;
    }
    const token = await executeRecaptcha();
    formData.append("recaptchaToken", token);
    startTransition(async () => {
      const { error } = await sendEmail(formData);
      if (error) {
        toast.error(error);
      } else {
        toast.success(SUBMISSION_SUCCESS);
        formRef.current?.reset();
      }
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={formRef}>
      <div>
        <label htmlFor="message" className={labelClasses}>
          Your message <span className="text-accent-coral">*</span>
        </label>
        <textarea
          id="message"
          className={`${inputClasses} h-40 resize-none`}
          name="message"
          placeholder="Tell us what you're building and how we can help."
          required
          maxLength={5000}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="senderEmail" className={labelClasses}>
          Your email <span className="text-accent-coral">*</span>
        </label>
        <input
          id="senderEmail"
          className={inputClasses}
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="name@company.com"
          disabled={isLoading}
        />
      </div>
      <SubmitBtn pending={isLoading} />
    </form>
  );
};

const ContactSection = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    >
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default ContactSection;
