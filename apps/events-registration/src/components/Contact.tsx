'use client';

import { ContactCard } from './contact-card'; 
import { contacts } from '../data/contact';

export function Contact() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 flex flex-col items-center justify-start gap-12">
                <div className="text-center">
                    <h2 className="font-title text-5xl md:!text-6xl text-primary border-b-2 border-accent inline-block pb-2">
                        Contact Us
                    </h2>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap gap-8">
                    {contacts.map((contact, index) => {
                        return (
                            <ContactCard className='' key={index} contact={contact}  />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
