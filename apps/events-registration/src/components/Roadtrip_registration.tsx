"use client";
import { useEffect, useState } from "react";
import { useStore } from "@repo/store";
import { db } from "@repo/firebase"; // keep if addDoc path uses db export
import { collection, addDoc } from "firebase/firestore";
import { Input } from "@repo/ui/input";
import roadtripDetails from "../app/roadtrips/[slug]/roadtripDetails.json";
import { Label, LabelInputContainer } from "@repo/ui/label";

type FormShape = {
  Name: string;
  Email: string;
  Contact: string;
  City: string;
};

export default function RegistrationPage({ slug }: { slug: string }) {
  // read user object that InitialState() sets in the store:
  // expected shape: { user: FirebaseUser, details: { ...firestoreProfile } } | null
  const current = useStore((s: any) => s.user);

  const [formData, setFormData] = useState<FormShape>({
    Name: "",
    Email: "",
    Contact: "",
    City: "",
  });

  // Merge preference order:
  // 1) Firestore profile fields (current.details)
  // 2) Firebase Auth fields (current.user.displayName / email / phoneNumber)
  // 3) existing form default
  useEffect(() => {
    if (!current) return;

    const authUser = current.user ?? {};
    const details = current.details ?? {};

    // helper to pick first non-empty value (case-insensitive keys for details)
    const pick = (keys: string[], fallback: string) => {
      for (const k of keys) {
        const val = (details as any)[k];
        if (val !== undefined && val !== null && String(val).trim() !== "") return String(val);
      }
      return fallback;
    };

    setFormData((prev) => ({
      Name:
        pick(["Name", "name", "displayName"], prev.Name) ||
        (authUser.displayName ?? prev.Name),
      Email:
        pick(["Email", "email"], prev.Email) ||
        (authUser.email ?? prev.Email),
      Contact:
        pick(["Contact", "contact", "phoneNumber"], prev.Contact) ||
        (authUser.phoneNumber ?? prev.Contact),
      City: pick(["City", "city"], prev.City) || prev.City,
    }));
  }, [current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const collectionName = `${slug}25`;
      await addDoc(collection(db, collectionName), formData);
      alert("Registration successful");
    } catch (error: any) {
      console.error("Error submitting data:", error);
      alert("Error: " + (error.message || error.toString()));
    }
  };

  const detailInfo = roadtripDetails.find(
    (r) => r.slug.toLowerCase() === slug.toLowerCase()
  );

  useEffect(() => {
    console.log(detailInfo);
  }, []);

  return (
    <div className="container mx-auto mt-20 lg:w-[980px] xl:w-[1123px] bg-[#131328] py-5 lg:py-25 lg:px-25 rounded-[40px] border-2 border-[#313143]">
      <div
        className="flex justify-center items-center rounded-[16px] w-[90%] lg:w-[60%] mx-auto p-[1px]"
        style={{ background: "linear-gradient(rgb(68 34 128), rgba(0, 28, 189, 0.1))" }}
      >
        <form onSubmit={handleSubmit} className="bg-[#1C124E] rounded-[16px] w-[100%] p-5 sm:p-12">
          <h2 className="text-center text-4xl md:text-4xl lg:text-5xl">Registration Form</h2>

          <div className="mt-5 flex flex-wrap gap-4">
            {["Name", "Email", "Contact", "City"].map((field) => (
              <LabelInputContainer key={field} className="w-full md:!w-[calc(50%-1rem)]">
                <Label htmlFor={field}>{field}*</Label>
                <Input
                  id={field}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  value={(formData as any)[field]}
                  required
                  type="text"
                  className="bg-transparent border border-gray-400 px-2 py-1 rounded mb-4 text-white lg:ml-[10%] w-full"
                  onChange={handleChange}
                />
              </LabelInputContainer>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#131328] hover:bg-pink-500 w-[40%] mt-4 sm:w-[50%] lg:w-[20%] text-white font-bold"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
