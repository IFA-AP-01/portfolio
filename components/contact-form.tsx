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

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-subtle outline-none transition-colors duration-200 focus:border-white/30 disabled:opacity-60";

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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} ref={formRef}>
      <input
        className={inputClasses}
        name="senderEmail"
        type="email"
        required
        maxLength={500}
        placeholder="Your email"
        disabled={isLoading}
      />
      <textarea
        className={`${inputClasses} h-48 resize-none`}
        name="message"
        placeholder="Your message"
        required
        maxLength={5000}
        disabled={isLoading}
      />
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
