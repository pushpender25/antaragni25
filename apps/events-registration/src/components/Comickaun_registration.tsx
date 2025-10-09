"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@repo/store";
import { db } from "@repo/firebase"; // Keep if addDoc path uses db export
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@repo/ui/input";
import { Label, LabelInputContainer } from "@repo/ui/label";
import { Section } from "@repo/ui/section";
import { toast } from "react-hot-toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type FormShape = {
  "Name": string;
  "Email Id": string;
  "Contact": string;
  "City": string;
  "Alternate Number": string;
  "Past Performance video Drive Links": string;
  "Number of Open Mics": string;
};

const FIELDS: (keyof FormShape)[] = [
  "Name",
  "Email Id",
  "Contact",
  "City",
  "Alternate Number",
  "Past Performance video Drive Links",
  "Number of Open Mics",
];
const requiredFields = [
  "Name",
  "Email Id",
  "Contact",
  "City",
  "Past Performance video Drive Links",
  "Number of Open Mics",
];

export default function Comickaun_Registration() {
  const current = useStore((s: any) => s.user);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormShape>(() => {
    const obj: any = {};
    FIELDS.forEach((field) => (obj[field] = ""));
    return obj;
  });

  useEffect(() => {
    if (!current) return;
    const authUser = current.user ?? {};
    const details = current.details ?? {};
    const pick = (keys: string[], fallback: string) => {
      for (const k of keys) {
        const val = (details as any)[k];
        if (val !== undefined && val !== null && String(val).trim() !== "")
          return String(val);
      }
      return fallback;
    };
    setFormData((prev) => ({
      ...prev,
      "Name": pick(["Name"], prev["Name"]),
      "Email Id":
        pick(["Email Id", "emailId"], prev["Email Id"]) ||
        (authUser.email ?? prev["Email Id"]),
      "Contact":
        pick(["Contact", "contact", "phoneNumber"], prev.Contact) ||
        (authUser.phoneNumber ?? prev.Contact),
      "City": pick(["City", "city"], prev.City) || prev.City,
    }));
  }, [current]);
  
  useGSAP(() => {
    if (!formRef.current) return;
    
    gsap.from(".form-animate", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
    });

  }, { scope: formRef });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const collectionName = `comickaun25`;
      await addDoc(collection(db, collectionName), formData);
      toast.success("Registration successful!");
    } catch (error: any) {
      console.error("Error submitting data:", error);
      toast.error("Error: " + (error.message || error.toString()));
    }
  };

  return (
    <Section className="min-h-screen flex flex-col items-center justify-center gap-8 pt-24 pb-12">
      <div ref={formRef} className="text-center">
        <h1 className="font-title text-5xl md:text-7xl text-primary form-animate">
          Comickaun Registration
        </h1>
        <p className="text-lg text-secondary mt-2 form-animate">
          Step into the spotlight. Fill out the form to register.
        </p>
      </div>

      <div className="w-full md:max-w-2/3 bg-foreground/5 backdrop-blur-lg rounded-xl border border-primary/20 p-6 md:p-8 form-animate">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {FIELDS.map((field) => (
              <LabelInputContainer key={field} className="w-full md:w-[calc(50%-0.75rem)] form-animate">
                <Label htmlFor={field}>
                  {field}
                  {requiredFields.includes(field) && (
                    <span className="text-accent ml-1">*</span>
                  )}
                </Label>
                <Input
                  id={field}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={(formData as any)[field]}
                  required={requiredFields.includes(field)}
                  type={field === "Email Id" ? "email" : "text"}
                  onChange={handleChange}
                />
              </LabelInputContainer>
            ))}
          </div>

          <div className="w-full flex justify-center mt-10 form-animate">
            <button
              type="submit"
              className="bg-accent text-foreground font-bold text-lg px-12 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 shadow-lg shadow-accent/20"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}