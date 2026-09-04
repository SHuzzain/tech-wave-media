"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SeoAuditForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [service, setService] = useState<string>("Local SEO");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim() || "Not provided";
    const company = (formData.get("company") as string)?.trim() || "Not provided";
    const userMessage = (formData.get("message") as string)?.trim() || "";

    const fullMessage = `
--- Free SEO Audit & Consultation Request ---
Company: ${company}
Phone: ${phone}
Service Required: ${service}

Business Goals & Message:
${userMessage}
    `.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic: `SEO Audit Request: ${service}`,
          message: fullMessage,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Could not submit your request.");
        return;
      }

      setStatus("sent");
      setMessage(
        "Thank you! Your SEO audit request has been received. Our SEO experts will review your website and contact you shortly."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "Could not send the request right now. Please try again or email us directly."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="seo-name">Full Name*</Label>
          <Input
            id="seo-name"
            name="name"
            placeholder="Enter your full name"
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo-email">Email Address*</Label>
          <Input
            id="seo-email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="seo-phone">Phone Number*</Label>
          <Input
            id="seo-phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo-company">Company Name</Label>
          <Input
            id="seo-company"
            name="company"
            placeholder="Enter your company name"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo-service">Service Required*</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="seo-service" className="w-full">
            <SelectValue placeholder="Select an SEO service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Local SEO">Local SEO</SelectItem>
            <SelectItem value="On-Page SEO">On-Page SEO</SelectItem>
            <SelectItem value="Off-Page SEO">Off-Page SEO</SelectItem>
            <SelectItem value="Technical SEO">Technical SEO</SelectItem>
            <SelectItem value="Guest Post">Guest Post</SelectItem>
            <SelectItem value="Link Exchange">Link Exchange</SelectItem>
            <SelectItem value="Full SEO Package">Full SEO Package</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seo-message">Your Message*</Label>
        <textarea
          id="seo-message"
          name="message"
          required
          rows={4}
          placeholder="Tell us about your business goals"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-semibold"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Submitting..." : "Get a Free SEO Audit"}
      </Button>

      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            status === "error"
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-primary/10 text-primary border border-primary/20"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
